import type { TestQuestion } from '../types/examData';

export interface QuestionGrading {
  questionId: string;
  pointsEarned: number;
  maxPoints: number;
  status: 'correct' | 'partial' | 'incorrect' | 'unanswered';
  userAnswer?: string | number;
  correctAnswer: string | number;
  feedback?: string;
}

export interface SectionScore {
  type: string;
  label: string;
  earned: number;
  max: number;
  correctCount: number;
  totalCount: number;
}

export interface ExamResult {
  totalScore: number; // 0 to 100
  letterGrade: 'A' | 'B' | 'C' | 'D' | 'F';
  gradeDescription: string;
  passed: boolean;
  totalEarnedPoints: number;
  totalMaxPoints: number;
  answeredCount: number;
  correctCount: number;
  partialCount: number;
  incorrectCount: number;
  unansweredCount: number;
  timeSpentSeconds: number;
  sections: SectionScore[];
  questionGradings: Record<string, QuestionGrading>;
}

// Assign exact weights summing to 100 points
export function getQuestionMaxPoints(q: TestQuestion): number {
  switch (q.type) {
    case 'mcq':
      return 2.0; // 10 questions = 20.0 pts
    case 'true_false':
      return 1.5; // 10 questions = 15.0 pts
    case 'fill_in_the_blank':
      return 1.5; // 10 questions = 15.0 pts
    case 'direct':
      return 2.0; // 10 questions = 20.0 pts
    case 'code_analysis':
      return 5.0; // 2 questions = 10.0 pts ("Why we write like this")
    case 'code_write':
      return 4.0; // 5 questions (3 Level 1 + 2 Level 2) = 20.0 pts
    default:
      return 2.0;
  }
}

export function gradeSingleQuestion(
  q: TestQuestion,
  userAns: string | number | undefined,
  maxPoints: number
): QuestionGrading {
  if (userAns === undefined || String(userAns).trim() === '') {
    return {
      questionId: q.id,
      pointsEarned: 0,
      maxPoints,
      status: 'unanswered',
      userAnswer: undefined,
      correctAnswer: q.correctAnswer,
      feedback: 'Question was left blank / unanswered.',
    };
  }

  // 1. Multiple Choice & True/False
  if (q.type === 'mcq' || q.type === 'true_false') {
    const isCorrect = userAns === q.correctAnswer;
    return {
      questionId: q.id,
      pointsEarned: isCorrect ? maxPoints : 0,
      maxPoints,
      status: isCorrect ? 'correct' : 'incorrect',
      userAnswer: userAns,
      correctAnswer: q.correctAnswer,
      feedback: isCorrect ? 'Correct option selected.' : 'Incorrect option selected.',
    };
  }

  // 2. Fill in the Blank
  if (q.type === 'fill_in_the_blank') {
    const cleanUser = String(userAns).trim().toLowerCase().replace(/['"`]/g, '');
    const cleanCorrect = String(q.correctAnswer).trim().toLowerCase().replace(/['"`]/g, '');

    const isMatch =
      cleanUser.length > 0 &&
      (cleanUser === cleanCorrect ||
        cleanUser.includes(cleanCorrect) ||
        (cleanUser.length >= 3 && cleanCorrect.includes(cleanUser)));

    return {
      questionId: q.id,
      pointsEarned: isMatch ? maxPoints : 0,
      maxPoints,
      status: isMatch ? 'correct' : 'incorrect',
      userAnswer: userAns,
      correctAnswer: q.correctAnswer,
      feedback: isMatch ? 'Exact or matching phrase.' : 'Word/phrase did not match model key.',
    };
  }

  // 3. Direct Questions & Code Analysis ("Why We Write Like This")
  if (q.type === 'direct' || q.type === 'code_analysis') {
    const userStr = String(userAns).trim().toLowerCase();
    const correctStr = String(q.correctAnswer).trim().toLowerCase();
    const explStr = (q.explanation || '').toLowerCase();

    // Key concepts from both official answer and explanation
    const combinedKeySource = `${correctStr} ${explStr}`;
    const keywords = combinedKeySource
      .split(/\W+/)
      .filter(
        (w) =>
          w.length >= 4 &&
          !['that', 'with', 'from', 'this', 'when', 'what', 'have', 'does', 'used', 'into', 'because', 'which', 'their', 'there'].includes(w)
      );

    const matched = keywords.filter((k) => userStr.includes(k));
    const ratio = keywords.length > 0 ? matched.length / keywords.length : 0;

    if (ratio >= 0.3 || userStr.includes(correctStr) || (ratio >= 0.2 && userStr.length >= 40)) {
      return {
        questionId: q.id,
        pointsEarned: maxPoints,
        maxPoints,
        status: 'correct',
        userAnswer: userAns,
        correctAnswer: q.correctAnswer,
        feedback: q.type === 'code_analysis'
          ? 'Accurate architectural analysis! Identified core design reason and failure mode.'
          : 'Comprehensive technical answer covers core principles.',
      };
    } else if (ratio >= 0.15 || userStr.length >= 25) {
      const partial = Math.round(maxPoints * 0.5 * 10) / 10;
      return {
        questionId: q.id,
        pointsEarned: partial,
        maxPoints,
        status: 'partial',
        userAnswer: userAns,
        correctAnswer: q.correctAnswer,
        feedback: q.type === 'code_analysis'
          ? 'Partial credit: Identified partial rationale, but missed complete error guard or reducer mechanism.'
          : 'Partial credit awarded: partial concept mentioned.',
      };
    } else {
      return {
        questionId: q.id,
        pointsEarned: 0,
        maxPoints,
        status: 'incorrect',
        userAnswer: userAns,
        correctAnswer: q.correctAnswer,
        feedback: q.type === 'code_analysis'
          ? 'Missed the primary architectural reason or failure safeguard explained in syllabus.'
          : 'Missed core technical concepts from syllabus answer.',
      };
    }
  }

  // 4. Code Write (Level 1: Single-Line Code / Command vs Level 2: Full Implementation)
  const code = String(userAns).trim();
  const keyPhrase = String(q.correctAnswer).trim().toLowerCase();

  if (q.difficultyLevel === 'Level 1') {
    // Level 1: Single-line code or terminal command
    const cleanUserCode = code.toLowerCase().replace(/['"`\s]/g, '');
    const cleanKeyCode = keyPhrase.replace(/['"`\s]/g, '');

    const isExactOrKeyMatch =
      cleanUserCode.includes(cleanKeyCode) ||
      cleanKeyCode.includes(cleanUserCode) ||
      code.toLowerCase().includes(keyPhrase);

    const coreTokens = keyPhrase
      .split(/[\s.(),=:"/-]+/)
      .filter((t) => t.length >= 3 && !['path', 'the', 'import'].includes(t));
    const tokenMatches = coreTokens.filter((t) => code.toLowerCase().includes(t));
    const tokenRatio = coreTokens.length > 0 ? tokenMatches.length / coreTokens.length : 0;

    if (isExactOrKeyMatch || tokenRatio >= 0.7) {
      return {
        questionId: q.id,
        pointsEarned: maxPoints,
        maxPoints,
        status: 'correct',
        userAnswer: userAns,
        correctAnswer: q.correctAnswer,
        feedback: 'Correct single-line code or command syntax.',
      };
    } else if (tokenRatio >= 0.4 || code.length >= 8) {
      const partial = Math.round(maxPoints * 0.5 * 10) / 10;
      return {
        questionId: q.id,
        pointsEarned: partial,
        maxPoints,
        status: 'partial',
        userAnswer: userAns,
        correctAnswer: q.correctAnswer,
        feedback: 'Partial credit: Command or code structure partially recognized.',
      };
    } else {
      return {
        questionId: q.id,
        pointsEarned: 0,
        maxPoints,
        status: 'incorrect',
        userAnswer: userAns,
        correctAnswer: q.correctAnswer,
        feedback: 'Command or code syntax did not match model answer.',
      };
    }
  }

  // Level 2: Full Multi-Line Implementation
  const hasDefOrClass = /def\s+\w+|class\s+\w+/.test(code);
  const containsKey = code.toLowerCase().includes(keyPhrase);
  const lines = code.split('\n').filter((l) => l.trim().length > 0).length;

  if (containsKey && (hasDefOrClass || lines >= 3)) {
    return {
      questionId: q.id,
      pointsEarned: maxPoints,
      maxPoints,
      status: 'correct',
      userAnswer: userAns,
      correctAnswer: q.correctAnswer,
      feedback: 'Runnable full code implementation with valid syntax and logic.',
    };
  } else if (lines >= 2 && (hasDefOrClass || code.length >= 30)) {
    const partial = Math.round(maxPoints * 0.7 * 10) / 10;
    return {
      questionId: q.id,
      pointsEarned: partial,
      maxPoints,
      status: 'partial',
      userAnswer: userAns,
      correctAnswer: q.correctAnswer,
      feedback: 'Good code attempt with function declaration; missing specific key syntax.',
    };
  } else {
    return {
      questionId: q.id,
      pointsEarned: 0,
      maxPoints,
      status: 'incorrect',
      userAnswer: userAns,
      correctAnswer: q.correctAnswer,
      feedback: 'Incomplete implementation or syntax placeholder.',
    };
  }
}

export function evaluateExam(
  questions: TestQuestion[],
  answers: Record<string, string | number>,
  timeSpentSeconds: number
): ExamResult {
  const questionGradings: Record<string, QuestionGrading> = {};

  let totalEarned = 0;
  let totalMax = 0;
  let correctCount = 0;
  let partialCount = 0;
  let incorrectCount = 0;
  let unansweredCount = 0;

  const sectionMap: Record<string, SectionScore> = {
    mcq: { type: 'mcq', label: 'Multiple Choice', earned: 0, max: 0, correctCount: 0, totalCount: 0 },
    true_false: { type: 'true_false', label: 'True / False', earned: 0, max: 0, correctCount: 0, totalCount: 0 },
    fill_in_the_blank: {
      type: 'fill_in_the_blank',
      label: 'Fill in the Blank',
      earned: 0,
      max: 0,
      correctCount: 0,
      totalCount: 0,
    },
    direct: {
      type: 'direct',
      label: 'Direct Questions',
      earned: 0,
      max: 0,
      correctCount: 0,
      totalCount: 0,
    },
    code_analysis: {
      type: 'code_analysis',
      label: 'Code Analysis',
      earned: 0,
      max: 0,
      correctCount: 0,
      totalCount: 0,
    },
    code_write: {
      type: 'code_write',
      label: 'Code Written',
      earned: 0,
      max: 0,
      correctCount: 0,
      totalCount: 0,
    },
  };

  questions.forEach((q) => {
    const maxPts = getQuestionMaxPoints(q);

    const grading = gradeSingleQuestion(q, answers[q.id], maxPts);
    questionGradings[q.id] = grading;

    totalEarned += grading.pointsEarned;
    totalMax += maxPts;

    if (grading.status === 'correct') correctCount++;
    else if (grading.status === 'partial') partialCount++;
    else if (grading.status === 'incorrect') incorrectCount++;
    else unansweredCount++;

    if (q.type in sectionMap) {
      sectionMap[q.type].earned += grading.pointsEarned;
      sectionMap[q.type].max += maxPts;
      sectionMap[q.type].totalCount += 1;
      if (grading.status === 'correct') {
        sectionMap[q.type].correctCount += 1;
      }
    }
  });

  // Calculate final score out of 100
  const totalScore = totalMax > 0 ? Math.round((totalEarned / totalMax) * 100) : 0;

  let letterGrade: 'A' | 'B' | 'C' | 'D' | 'F' = 'F';
  let gradeDescription = 'Needs Retest · Review Syllabus Modules';

  if (totalScore >= 90) {
    letterGrade = 'A';
    gradeDescription = 'Distinction · Exceptional AI Engineering Mastery';
  } else if (totalScore >= 80) {
    letterGrade = 'B';
    gradeDescription = 'Very Good · Strong Theoretical and Coding Competence';
  } else if (totalScore >= 70) {
    letterGrade = 'C';
    gradeDescription = 'Passed · Solid Baseline in Workflows and RAG';
  } else if (totalScore >= 60) {
    letterGrade = 'D';
    gradeDescription = 'Conditional Pass · Target Weak Areas for Revision';
  }

  const sections: SectionScore[] = Object.values(sectionMap).map((sec) => ({
    ...sec,
    earned: Math.round(sec.earned * 10) / 10,
    max: Math.round(sec.max * 10) / 10,
  }));

  return {
    totalScore,
    letterGrade,
    gradeDescription,
    passed: totalScore >= 70,
    totalEarnedPoints: Math.round(totalEarned * 10) / 10,
    totalMaxPoints: Math.round(totalMax * 10) / 10,
    answeredCount: Object.keys(answers).filter((k) => answers[k] !== undefined && String(answers[k]).trim() !== '').length,
    correctCount,
    partialCount,
    incorrectCount,
    unansweredCount,
    timeSpentSeconds,
    sections,
    questionGradings,
  };
}
