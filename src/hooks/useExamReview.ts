import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { lessonModules, testQuestions, Category } from '../data/examData';
import type {
  LessonModule,
  TestQuestion,
  QuestionType,
  QuestionTypeFilter,
  ActiveMode,
  UserExamProgress,
} from '../types/examData';
import confetti from 'canvas-confetti';
import { sileo } from 'sileo';

const STORAGE_KEY = 'ai_eng_study_platform_v3';

export type StatusFilter = 'ALL' | 'MASTERED' | 'SAVED' | 'REVIEW';

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Helper to shuffle options and re-map correctAnswer index for MCQ questions
function shuffleQuestionOptions(q: TestQuestion): TestQuestion {
  if (q.type !== 'mcq' || !q.options || typeof q.correctAnswer !== 'number') {
    return { ...q };
  }

  const originalOptions = q.options;
  const correctOptionText = originalOptions[q.correctAnswer];
  const shuffledOptions = shuffleArray(originalOptions);
  const newCorrectIndex = shuffledOptions.indexOf(correctOptionText);

  return {
    ...q,
    options: shuffledOptions,
    correctAnswer: newCorrectIndex,
  };
}

// Helper to select a controlled difficulty mix (e.g. 3-4 simple questions + 6-7 hard questions)
function selectDifficultyMixed(
  pool: TestQuestion[],
  type: QuestionType,
  simpleTarget: number,
  hardTarget: number
): TestQuestion[] {
  const allOfType = pool.filter((q) => q.type === type);
  const simplePool = shuffleArray(allOfType.filter((q) => q.difficulty === 'simple'));
  const hardPool = shuffleArray(allOfType.filter((q) => q.difficulty !== 'simple'));

  const chosenSimple = simplePool.slice(0, simpleTarget);
  const neededHard = simpleTarget + hardTarget - chosenSimple.length;
  const chosenHard = hardPool.slice(0, neededHard);

  const combined = [...chosenSimple, ...chosenHard];
  if (combined.length < simpleTarget + hardTarget) {
    const chosenIds = new Set(combined.map((q) => q.id));
    const remaining = shuffleArray(allOfType.filter((q) => !chosenIds.has(q.id)));
    combined.push(...remaining.slice(0, simpleTarget + hardTarget - combined.length));
  }

  return shuffleArray(combined);
}

// Generate balanced exam: 10 MCQ (4 simple, 6 hard), 10 T/F (4 simple, 6 hard), 
// 10 Fill (4 simple, 6 hard), 10 Direct (4 simple, 6 hard), 2 Code Analysis (1 simple, 1 hard), 
// 5 Code Written (3 Level 1, 2 Level 2) = 47 total questions (100.0 pts)
function generateBalancedExam(pool: TestQuestion[]): TestQuestion[] {
  const mcqs = selectDifficultyMixed(pool, 'mcq', 4, 6).map(shuffleQuestionOptions);
  const tf = selectDifficultyMixed(pool, 'true_false', 4, 6);
  const fitb = selectDifficultyMixed(pool, 'fill_in_the_blank', 4, 6);
  const direct = selectDifficultyMixed(pool, 'direct', 4, 6);
  const codeAnalysis = selectDifficultyMixed(pool, 'code_analysis', 1, 1);

  // 5 Code Written questions: 3 Level 1 (Foundation) + 2 Level 2 (Advanced Pipelines)
  const l1 = shuffleArray(
    pool.filter((q) => q.type === 'code_write' && q.difficultyLevel === 'Level 1')
  ).slice(0, 3);
  const l2 = shuffleArray(
    pool.filter((q) => q.type === 'code_write' && q.difficultyLevel === 'Level 2')
  ).slice(0, 2);

  const fallbackCode = pool.filter((q) => q.type === 'code_write' && !q.difficultyLevel);
  const codeWrite = [...l1, ...l2];
  if (codeWrite.length < 5) {
    codeWrite.push(...shuffleArray(fallbackCode).slice(0, 5 - codeWrite.length));
  }

  return [...mcqs, ...tf, ...fitb, ...direct, ...codeAnalysis, ...codeWrite];
}

export function useExamReview() {
  const [isHydrated, setIsHydrated] = useState(false);

  // Active Mode: 'study' vs 'exam'
  const [activeMode, setActiveMode] = useState<ActiveMode>('study');
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);

  // Exam Timer (2 Hours = 7200 seconds)
  const [examTimeRemaining, setExamTimeRemaining] = useState(7200);

  // Shuffled exam questions on load (Always 10 MCQ, 10 T/F, 10 Fill, 10 Direct, 3 Code)
  const [shuffledQuestions, setShuffledQuestions] = useState<TestQuestion[]>(() =>
    generateBalancedExam(testQuestions)
  );

  // Session ID to force re-render/reset of exam state on new exam runs
  const [examSessionId, setExamSessionId] = useState(1);

  // Question Type filter in Exam Mode
  const [selectedQuestionType, setSelectedQuestionType] = useState<QuestionTypeFilter>('all');

  // User Progress: mastered, saved, review
  const [progress, setProgress] = useState<UserExamProgress>({
    mastered: [],
    saved: [],
    review: [],
  });

  const progressRef = useRef(progress);
  progressRef.current = progress;

  // Client-side hydration from localStorage
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          setProgress({
            mastered: Array.isArray(parsed.mastered) ? parsed.mastered : [],
            saved: Array.isArray(parsed.saved) ? parsed.saved : [],
            review: Array.isArray(parsed.review) ? parsed.review : [],
          });
        }
      }
    } catch (e) {
      console.error('Failed to load progress from localStorage', e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save changes to localStorage only after hydration
  useEffect(() => {
    if (!isHydrated) return;
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      }
    } catch (e) {
      console.error('Failed to save progress to localStorage', e);
    }
  }, [progress, isHydrated]);

  // Exam Countdown Timer interval
  useEffect(() => {
    if (activeMode !== 'exam') return;

    const interval = setInterval(() => {
      setExamTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeMode]);

  // Accordion expansion states in Study Mode (first module open by default)
  const [expandedLessonIds, setExpandedLessonIds] = useState<Set<string>>(new Set(['WE-01']));

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('ALL');
  const [activeStatusFilter, setActiveStatusFilter] = useState<StatusFilter>('ALL');

  // Toggle Lesson Accordion
  const toggleExpandLesson = useCallback((id: string) => {
    setExpandedLessonIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  // Toggle Saved (Bookmark)
  const toggleSaved = useCallback((id: string) => {
    const isSaved = progressRef.current.saved.includes(id);
    setProgress((prev) => ({
      ...prev,
      saved: isSaved ? prev.saved.filter((x) => x !== id) : [...prev.saved, id],
    }));

    if (isSaved) {
      sileo.info({
        title: 'Bookmark Removed',
        description: 'Lesson removed from saved bookmarks.',
      });
    } else {
      sileo.success({
        title: 'Bookmark Saved',
        description: 'Lesson added to saved bookmarks.',
      });
    }
  }, []);

  // Toggle Mastered (Completed)
  const toggleMastered = useCallback((id: string) => {
    const isMastered = progressRef.current.mastered.includes(id);
    setProgress((prev) => ({
      ...prev,
      mastered: isMastered
        ? prev.mastered.filter((x) => x !== id)
        : [...prev.mastered, id],
    }));

    // Trigger celebration and toast outside of setState updater
    if (!isMastered) {
      if (typeof window !== 'undefined') {
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.8 },
            colors: ['#FF5722', '#2563EB', '#10B981'],
          });
        } catch (_) {}
      }
      sileo.success({
        title: 'Mastered! 🎉',
        description: 'Lesson marked as Mastered. Great work!',
      });
    } else {
      sileo.info({
        title: 'Unmarked',
        description: 'Lesson removed from Mastered list.',
      });
    }
  }, []);

  // Toggle Review
  const toggleReview = useCallback((id: string) => {
    setProgress((prev) => {
      const isReview = prev.review.includes(id);
      return {
        ...prev,
        review: isReview ? prev.review.filter((x) => x !== id) : [...prev.review, id],
      };
    });
  }, []);

  // Expand / Collapse All
  const expandAll = useCallback((currentIds?: unknown) => {
    const ids = Array.isArray(currentIds) ? currentIds : lessonModules.map((m) => m.id);
    setExpandedLessonIds(new Set(ids));
  }, []);

  const collapseAll = useCallback(() => {
    setExpandedLessonIds(new Set());
  }, []);

  // Reset Progress
  const resetProgress = useCallback(() => {
    sileo.action({
      title: 'Reset All Progress?',
      description: 'This will reset all your review, mastered, and saved progress.',
      button: {
        title: 'Confirm Reset',
        onClick: () => {
          setProgress({
            mastered: [],
            saved: [],
            review: [],
          });
          localStorage.removeItem(STORAGE_KEY);
          sileo.success({
            title: 'Progress Reset',
            description: 'All progress and bookmarks have been reset.',
          });
        },
      },
      duration: 8000,
    });
  }, []);

  // Exam Mode Handlers
  const handleRequestExamMode = useCallback(() => {
    setIsExamModalOpen(true);
  }, []);

  const handleConfirmStartExam = useCallback(() => {
    setShuffledQuestions(generateBalancedExam(testQuestions));
    setExamTimeRemaining(7200); // 2 hours
    setExamSessionId((prev) => prev + 1);
    setActiveMode('exam');
    setIsExamModalOpen(false);
    sileo.success({
      title: 'Exam Started',
      description: 'Exam simulation started. Good luck!',
    });
  }, []);

  const handleCancelExam = useCallback(() => {
    setIsExamModalOpen(false);
  }, []);

  const handleExitExam = useCallback(() => {
    setActiveMode('study');
    sileo.info({
      title: 'Study Mode',
      description: 'Exited exam mode and returned to Study Guide.',
    });
  }, []);

  const handleResetExam = useCallback(() => {
    sileo.action({
      title: 'Restart Exam?',
      description: 'All questions will be reshuffled and the timer will reset to 2 hours.',
      button: {
        title: 'Restart',
        onClick: () => {
          setShuffledQuestions(generateBalancedExam(testQuestions));
          setExamTimeRemaining(7200);
          setExamSessionId((prev) => prev + 1);
          sileo.success({
            title: 'Exam Restarted',
            description: 'Newly shuffled questions ready.',
          });
        },
      },
      duration: 8000,
    });
  }, []);

  // Mode Selection router
  const handleSelectMode = useCallback(
    (mode: ActiveMode) => {
      if (mode === 'exam') {
        handleRequestExamMode();
      } else {
        setActiveMode('study');
      }
    },
    [handleRequestExamMode]
  );

  // Metrics
  const metrics = useMemo(() => {
    const total = activeMode === 'study' ? lessonModules.length : shuffledQuestions.length;
    const completed = progress.mastered.length;
    const saved = progress.saved.length;
    const review = progress.review.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, saved, review, percentage };
  }, [activeMode, progress, shuffledQuestions.length]);

  // Filtered Study Modules
  const filteredModules = useMemo(() => {
    return lessonModules.filter((module) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = module.title.toLowerCase().includes(query);
        const matchesSummary = module.summary.toLowerCase().includes(query);
        const matchesContent = module.content.toLowerCase().includes(query);
        const matchesTags = module.tags.some((t) => t.toLowerCase().includes(query));
        const matchesCategory = module.category.toLowerCase().includes(query);

        if (!matchesTitle && !matchesSummary && !matchesContent && !matchesTags && !matchesCategory) {
          return false;
        }
      }

      // 2. Category Filter
      if (activeCategory !== 'ALL' && module.category !== activeCategory) {
        return false;
      }

      // 3. Status Filter
      if (activeStatusFilter === 'MASTERED' && !progress.mastered.includes(module.id)) {
        return false;
      }
      if (activeStatusFilter === 'SAVED' && !progress.saved.includes(module.id)) {
        return false;
      }
      if (activeStatusFilter === 'REVIEW' && !progress.review.includes(module.id)) {
        return false;
      }

      return true;
    });
  }, [searchQuery, activeCategory, activeStatusFilter, progress]);

  // Category counts for Study Guide Sidebar
  const categoryCounts = useMemo(() => {
    const counts = {
      ALL: lessonModules.length,
      'Workflow Engineering': 0,
      'RAG Fundamentals': 0,
      'Advanced RAG': 0,
      'Autonomous Agents': 0,
    };
    lessonModules.forEach((m) => {
      if (m.category in counts) {
        counts[m.category as keyof typeof counts]++;
      }
    });
    return counts;
  }, []);

  // Status Counts for Study Guide Sidebar
  const statusCounts = useMemo(() => {
    return {
      all: lessonModules.length,
      mastered: progress.mastered.length,
      saved: progress.saved.length,
      review: progress.review.length,
    };
  }, [progress]);

  // Question Type counts for Exam Mode Sidebar
  const questionTypeCounts = useMemo(() => {
    const counts: Record<QuestionTypeFilter, number> = {
      all: shuffledQuestions.length,
      mcq: 0,
      true_false: 0,
      fill_in_the_blank: 0,
      direct: 0,
      code_analysis: 0,
      code_write: 0,
    };
    shuffledQuestions.forEach((q) => {
      if (q.type in counts) {
        counts[q.type]++;
      }
    });
    return counts;
  }, [shuffledQuestions]);

  return {
    isHydrated,
    activeMode,
    handleSelectMode,
    isExamModalOpen,
    handleConfirmStartExam,
    handleCancelExam,
    handleExitExam,
    handleResetExam,
    examTimeRemaining,
    shuffledQuestions,
    examSessionId,
    selectedQuestionType,
    setSelectedQuestionType,
    questionTypeCounts,
    lessonModules: filteredModules,
    allModulesCount: lessonModules.length,
    categoryCounts,
    statusCounts,
    expandedLessonIds,
    toggleExpandLesson,
    expandAll,
    collapseAll,
    progress,
    toggleSaved,
    toggleMastered,
    toggleReview,
    resetProgress,
    metrics,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    activeStatusFilter,
    setActiveStatusFilter,
  };
}
