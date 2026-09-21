'use client';

import React, { useState, useMemo } from 'react';
import type { TestQuestion, QuestionTypeFilter } from '../types/examData';
import { ExamSidebar } from './ExamSidebar';
import { CodeBlock } from './CodeBlock';
import {
  Timer,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronDown,
  Bookmark,
  RotateCcw,
  Sparkles,
  Award,
  Send,
  AlertTriangle,
  Clock,
  CheckCheck,
  Trophy,
  BarChart3,
  FileCode,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { sileo } from 'sileo';
import {
  evaluateExam,
  getQuestionMaxPoints,
  type ExamResult,
} from '../utils/examGrading';

interface PracticeExamViewProps {
  questions: TestQuestion[];
  selectedType: QuestionTypeFilter;
  onSelectType: (type: QuestionTypeFilter) => void;
  typeCounts: Record<QuestionTypeFilter, number>;
  onExitExam: () => void;
  timeRemaining: number; // in seconds
  onResetExam: () => void;
}

type SubmissionFilter = 'all' | 'incorrect' | 'correct' | 'marked';

export const PracticeExamView: React.FC<PracticeExamViewProps> = ({
  questions,
  selectedType,
  onSelectType,
  typeCounts,
  onExitExam,
  timeRemaining,
  onResetExam,
}) => {
  // Answers state (auto-updated as student types or selects)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string | number>>({});
  const [textInputs, setTextInputs] = useState<Record<string, string>>({});
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());
  const [markedForReview, setMarkedForReview] = useState<Set<string>>(new Set());

  // Exam submission & grading lifecycle
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [examResult, setExamResult] = useState<ExamResult | null>(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submissionFilter, setSubmissionFilter] = useState<SubmissionFilter>('all');

  // Time tracking
  const initialTime = 7200;
  const timeTakenSeconds = initialTime - timeRemaining;

  // Format time (HH:MM:SS)
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const isLowTime = timeRemaining < 900 && !isSubmitted; // < 15 mins

  // Select option for MCQ / True-False (can change anytime)
  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  // Text change for Fill-in, Direct, Code (automatically records answer in real-time)
  const handleTextChange = (questionId: string, val: string) => {
    if (isSubmitted) return;
    setTextInputs((prev) => ({ ...prev, [questionId]: val }));
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: val }));
  };

  const toggleReveal = (questionId: string) => {
    setRevealedIds((prev) => {
      const next = new Set(prev);
      if (next.has(questionId)) next.delete(questionId);
      else next.add(questionId);
      return next;
    });
  };

  const toggleReview = (questionId: string) => {
    setMarkedForReview((prev) => {
      const next = new Set(prev);
      if (next.has(questionId)) next.delete(questionId);
      else next.add(questionId);
      return next;
    });
  };

  // Total questions answered
  const answeredCount = useMemo(() => {
    return Object.keys(selectedAnswers).filter(
      (k) => selectedAnswers[k] !== undefined && String(selectedAnswers[k]).trim() !== ''
    ).length;
  }, [selectedAnswers]);

  // Global Submit Exam Handler (Submits all 43 questions together)
  const handleConfirmSubmit = () => {
    setShowSubmitModal(false);
    const result = evaluateExam(questions, selectedAnswers, timeTakenSeconds);
    setExamResult(result);
    setIsSubmitted(true);

    if (result.passed && typeof window !== 'undefined') {
      try {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#FF5722', '#10B981', '#2563EB', '#F59E0B'],
        });
      } catch (_) {}
    }

    sileo.success({
      title: 'Exam Submitted!',
      description: `Final Grade: ${result.letterGrade} · ${result.totalScore}/100 Points.`,
    });

    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Filter questions for display
  const displayQuestions = useMemo(() => {
    let list =
      selectedType === 'all'
        ? questions
        : questions.filter((q) => q.type === selectedType);

    if (isSubmitted && examResult) {
      if (submissionFilter === 'incorrect') {
        list = list.filter((q) => {
          const g = examResult.questionGradings[q.id];
          return g && (g.status === 'incorrect' || g.status === 'unanswered');
        });
      } else if (submissionFilter === 'correct') {
        list = list.filter((q) => {
          const g = examResult.questionGradings[q.id];
          return g && g.status === 'correct';
        });
      } else if (submissionFilter === 'marked') {
        list = list.filter((q) => markedForReview.has(q.id));
      }
    }

    return list;
  }, [questions, selectedType, isSubmitted, examResult, submissionFilter, markedForReview]);

  const gradeBadgeStyles = {
    A: 'bg-emerald-500 text-white border-emerald-400 shadow-emerald-500/30',
    B: 'bg-blue-600 text-white border-blue-500 shadow-blue-600/30',
    C: 'bg-amber-500 text-white border-amber-400 shadow-amber-500/30',
    D: 'bg-orange-500 text-white border-orange-400 shadow-orange-500/30',
    F: 'bg-red-600 text-white border-red-500 shadow-red-600/30',
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] relative">
      {/* Left Column: Fixed Exam Sidebar */}
      <aside
        className="hidden md:block fixed top-16 left-0 bottom-0 w-64 lg:w-72 z-30 bg-white border-r border-slate-200/80 overflow-y-auto"
        aria-label="Question Types"
      >
        <ExamSidebar
          selectedType={selectedType}
          onSelectType={onSelectType}
          typeCounts={typeCounts}
          onExitExam={onExitExam}
        />
      </aside>

      {/* Right Column: Main Exam Content */}
      <div className="w-full transition-all duration-200 md:pl-64 lg:pl-72">
        <div className="w-full px-4 sm:px-8 lg:px-12 py-8 max-w-[1600px] mx-auto">
          {/* Sticky Header Banner: Timer, Live Progress, Single Global Submit Exam Button */}
          <div className="sticky top-16 z-20 -mx-4 sm:-mx-8 lg:-mx-12 px-4 sm:px-8 lg:px-12 py-3.5 mb-8 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-4">
            {/* Left: Timer or Submitted Status */}
            <div className="flex items-center gap-3">
              {isSubmitted ? (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
                  <CheckCheck className="w-4 h-4 text-emerald-600" />
                  <span>EXAM SUBMITTED · COMPLETED</span>
                </div>
              ) : (
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-sm font-bold shadow-xs border transition-all ${
                    isLowTime
                      ? 'bg-red-50 text-red-700 border-red-300 animate-pulse'
                      : 'bg-[#0F172A] text-white border-[#0F172A]'
                  }`}
                >
                  <Timer className="w-4 h-4 text-[#FF5722]" />
                  <span>{formatTime(timeRemaining)}</span>
                </div>
              )}

              <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                {isSubmitted ? `Completed in ${formatTime(timeTakenSeconds)}` : '2-Hour Official Simulation'}
              </span>
            </div>

            {/* Right: Progress Tracker & Global Submit Exam Button */}
            <div className="flex items-center gap-3">
              {isSubmitted && examResult ? (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono font-bold text-slate-800">
                  <Trophy className="w-4 h-4 text-[#FF5722]" />
                  <span>
                    Final: <strong className="text-[#FF5722] text-sm">{examResult.totalScore}</strong> / 100 PTS ({examResult.letterGrade})
                  </span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono font-bold text-slate-700">
                  <Clock className="w-4 h-4 text-[#FF5722]" />
                  <span>
                    Answered: <strong className="text-slate-900">{answeredCount}</strong>/{questions.length}
                  </span>
                </div>
              )}

              {/* SINGLE GLOBAL SUBMIT EXAM BUTTON (Submits all answers at once) */}
              {!isSubmitted && (
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(true)}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#FF5722] hover:bg-[#E64A19] text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-orange-500/20 hover:shadow-lg transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Exam</span>
                </button>
              )}

              <button
                type="button"
                onClick={onResetExam}
                className="p-2 rounded-full border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                title="Restart simulation with newly shuffled questions"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* =========================================================================
              POST-SUBMISSION HERO SCOREBOARD (100-POINT SYSTEM - LIGHT MODE)
             ========================================================================= */}
          {isSubmitted && examResult && (
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-10 rounded-2xl bg-white text-slate-900 p-6 sm:p-8 shadow-sm border border-slate-200"
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-200">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-[#FF5722] border border-orange-200/80 font-mono text-xs font-bold uppercase tracking-wider mb-2">
                    <Award className="w-3.5 h-3.5" />
                    <span>Official Exam Evaluation · 100-Point Standard</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-900">
                    {examResult.passed ? 'Exam Completed · Congratulations!' : 'Exam Completed · Review Required'}
                  </h2>
                  <p className="text-slate-600 text-sm mt-1">
                    {examResult.gradeDescription}
                  </p>
                </div>

                {/* Big Score Badge */}
                <div className="flex items-center gap-4 shrink-0 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center font-mono font-black text-3xl shadow-sm ${
                      gradeBadgeStyles[examResult.letterGrade]
                    }`}
                  >
                    {examResult.letterGrade}
                  </div>
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-widest text-slate-500 font-semibold">
                      Total Points
                    </div>
                    <div className="text-3xl sm:text-4xl font-black font-mono text-slate-900">
                      <span className="text-[#FF5722]">{examResult.totalScore}</span>
                      <span className="text-slate-400 text-xl font-normal"> / 100</span>
                    </div>
                    <div className="text-xs font-mono font-bold text-slate-500">
                      Passing Threshold: 70 / 100
                    </div>
                  </div>
                </div>
              </div>

              {/* Statistics Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 my-6">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="text-[11px] font-mono text-slate-500 uppercase font-semibold">Correct</div>
                  <div className="text-xl font-mono font-black text-emerald-600 mt-0.5">
                    {examResult.correctCount} <span className="text-xs text-slate-400 font-normal">/ {questions.length}</span>
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="text-[11px] font-mono text-slate-500 uppercase font-semibold">Partial Credit</div>
                  <div className="text-xl font-mono font-black text-amber-600 mt-0.5">
                    {examResult.partialCount}
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="text-[11px] font-mono text-slate-500 uppercase font-semibold">Incorrect</div>
                  <div className="text-xl font-mono font-black text-red-600 mt-0.5">
                    {examResult.incorrectCount}
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="text-[11px] font-mono text-slate-500 uppercase font-semibold">Time Elapsed</div>
                  <div className="text-xl font-mono font-black text-blue-600 mt-0.5">
                    {formatTime(timeTakenSeconds)}
                  </div>
                </div>
              </div>

              {/* 6-Section Point Breakdown Bar */}
              <div className="mb-6 pt-4 border-t border-slate-200">
                <div className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#FF5722]" />
                  <span>6-Section Scores Breakdown (Total: 100.0 Pts)</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {examResult.sections.map((sec) => (
                    <div
                      key={sec.type}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between"
                    >
                      <div className="text-[11px] font-semibold text-slate-700 truncate">{sec.label}</div>
                      <div className="mt-2 flex items-baseline justify-between">
                        <span className="text-base font-mono font-black text-slate-900">
                          {sec.earned} <span className="text-xs text-slate-500 font-normal">/ {sec.max} pts</span>
                        </span>
                        <span className="text-[11px] font-mono font-medium text-slate-500">
                          {sec.correctCount}/{sec.totalCount}
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 rounded-full mt-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#FF5722] to-emerald-500 rounded-full transition-all duration-500"
                          style={{
                            width: `${sec.max > 0 ? Math.min(100, Math.round((sec.earned / sec.max) * 100)) : 0}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Post-submission Review Filter Tabs */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs font-mono text-slate-500 font-semibold mr-1 uppercase">Filter Review:</span>
                  <button
                    type="button"
                    onClick={() => setSubmissionFilter('all')}
                    className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer border ${
                      submissionFilter === 'all'
                        ? 'bg-[#FF5722] text-white border-transparent shadow-xs'
                        : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    All ({questions.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setSubmissionFilter('incorrect')}
                    className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                      submissionFilter === 'incorrect'
                        ? 'bg-red-600 text-white border-transparent shadow-xs'
                        : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-red-50 hover:text-red-700 hover:border-red-200'
                    }`}
                  >
                    <XCircle className={`w-3.5 h-3.5 ${submissionFilter === 'incorrect' ? 'text-white' : 'text-red-500'}`} />
                    <span>Incorrect / Blank ({examResult.incorrectCount + examResult.unansweredCount})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSubmissionFilter('correct')}
                    className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                      submissionFilter === 'correct'
                        ? 'bg-emerald-600 text-white border-transparent shadow-xs'
                        : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200'
                    }`}
                  >
                    <CheckCircle2 className={`w-3.5 h-3.5 ${submissionFilter === 'correct' ? 'text-white' : 'text-emerald-500'}`} />
                    <span>Correct ({examResult.correctCount})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSubmissionFilter('marked')}
                    className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                      submissionFilter === 'marked'
                        ? 'bg-amber-500 text-white border-transparent shadow-xs'
                        : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${submissionFilter === 'marked' ? 'text-white' : 'text-amber-500'}`} />
                    <span>Review Marked ({markedForReview.size})</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={onResetExam}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-slate-800 text-xs font-bold uppercase tracking-wider hover:bg-slate-50 border border-slate-200 shadow-xs transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#FF5722]" />
                  <span>Retake Exam</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* Section Sub-Title */}
          <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] font-mono text-xs font-bold tracking-wide uppercase mb-3">
                [ {isSubmitted ? 'RESULTS REVIEW' : 'EXAM IN PROGRESS'} // {selectedType.toUpperCase().replace(/_/g, ' ')} ]
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
                {isSubmitted ? 'Detailed Answer Breakdown & Solutions' : 'Interactive Test Simulation'}
              </h2>
              <p className="text-slate-600 text-sm mt-1.5 font-medium">
                {isSubmitted
                  ? `Showing ${displayQuestions.length} questions in current review filter`
                  : `Answer all ${questions.length} questions across the exam. You can change your answers anytime before clicking Submit Exam.`}
              </p>
            </div>
          </div>

          {/* Question Cards */}
          <div className="space-y-6">
            {displayQuestions.map((q, qIndex) => {
              const userAnswer = selectedAnswers[q.id];
              const isAnswered = userAnswer !== undefined && String(userAnswer).trim() !== '';
              const isRevealed = revealedIds.has(q.id);
              const isMarked = markedForReview.has(q.id);
              const grading = examResult?.questionGradings[q.id];

              const maxPoints = getQuestionMaxPoints(q);

              // Post-submission card borders
              let cardBorder = 'border-slate-200/90';
              if (isSubmitted && grading) {
                if (grading.status === 'correct') {
                  cardBorder = 'border-emerald-300 bg-emerald-50/15';
                } else if (grading.status === 'partial') {
                  cardBorder = 'border-amber-300 bg-amber-50/15';
                } else if (grading.status === 'incorrect') {
                  cardBorder = 'border-red-300 bg-red-50/15';
                } else {
                  cardBorder = 'border-slate-300 bg-slate-50/40';
                }
              } else if (isAnswered) {
                cardBorder = 'border-slate-300 shadow-xs';
              }

              return (
                <div
                  key={q.id}
                  className={`rounded-2xl border bg-white p-6 sm:p-8 transition-all duration-300 shadow-sm ${cardBorder}`}
                >
                  {/* Top Header: Number, Category, Type, Score Points, Review */}
                  <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-3 py-0.5 rounded-full bg-slate-100 text-slate-900 font-mono text-xs font-bold border border-slate-200/80">
                        Q{qIndex + 1}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2563EB] font-mono text-[11px] font-bold uppercase tracking-wider border border-blue-100">
                        {q.category}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#FF5722] text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                        {q.type.replace(/_/g, ' ')}
                      </span>

                      {/* Difficulty Level Badge */}
                      {q.difficultyLevel ? (
                        <span
                          className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider border ${
                            q.difficultyLevel === 'Level 1'
                              ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                              : 'bg-purple-50 text-purple-700 border-purple-200'
                          }`}
                        >
                          {q.difficultyLevel} · {q.difficultyLevel === 'Level 1' ? 'Single-Line Code / Command' : 'Full Implementation'}
                        </span>
                      ) : q.difficulty === 'simple' ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-mono text-[10px] font-bold uppercase tracking-wider border border-emerald-200">
                          Standard · Core Concept
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono text-[10px] font-bold uppercase tracking-wider border border-slate-200">
                          Advanced · Scenario
                        </span>
                      )}

                      {/* Weight Badge (Out of 100) */}
                      <span className="px-2 py-0.5 rounded-full bg-slate-50 text-slate-600 font-mono text-[10px] font-bold border border-slate-200">
                        {maxPoints.toFixed(1)} PTS
                      </span>

                      {/* In-progress Answered indicator */}
                      {!isSubmitted && (
                        <span
                          className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider ${
                            isAnswered
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-slate-100 text-slate-400'
                          }`}
                        >
                          {isAnswered ? 'Answered' : 'Unanswered'}
                        </span>
                      )}
                    </div>

                    {/* Right side: Grading tag if submitted, or Mark Review toggle */}
                    <div className="flex items-center gap-2">
                      {isSubmitted && grading && (
                        <div
                          className={`px-3 py-1 rounded-full font-mono text-xs font-bold flex items-center gap-1.5 ${
                            grading.status === 'correct'
                              ? 'bg-emerald-100 text-emerald-800'
                              : grading.status === 'partial'
                              ? 'bg-amber-100 text-amber-800'
                              : grading.status === 'incorrect'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {grading.status === 'correct' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                          {grading.status === 'partial' && <HelpCircle className="w-3.5 h-3.5 text-amber-600" />}
                          {grading.status === 'incorrect' && <XCircle className="w-3.5 h-3.5 text-red-600" />}
                          {grading.status === 'unanswered' && <AlertTriangle className="w-3.5 h-3.5 text-slate-500" />}
                          <span>
                            {grading.pointsEarned.toFixed(1)} / {grading.maxPoints.toFixed(1)} PTS
                          </span>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => toggleReview(q.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border transition-all cursor-pointer ${
                          isMarked
                            ? 'bg-amber-50 text-amber-700 border-amber-300 shadow-xs'
                            : 'bg-white text-slate-400 border-slate-200 hover:text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isMarked ? 'fill-amber-500 text-amber-500' : ''}`} />
                        <span>{isMarked ? 'Review Marked' : 'Mark Review'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Question Text */}
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug tracking-tight mb-4">
                    {q.question}
                  </h3>

                  {/* Code Snippet context if present */}
                  {q.codeSnippet && q.type !== 'code_write' && (
                    <div className="mb-5">
                      <CodeBlock
                        code={q.codeSnippet}
                        language="python"
                        filename={q.type === 'code_analysis' ? "CODE_ANALYSIS_EXERCISE.PY" : "QUESTION_CONTEXT.PY"}
                      />
                    </div>
                  )}

                  {/* Options for MCQ / True False */}
                  {q.options && q.options.length > 0 && (
                    <div className="space-y-2.5 mb-6">
                      {q.options.map((option, optIdx) => {
                        const isSelected = userAnswer === optIdx;
                        const isOptionCorrect = q.correctAnswer === optIdx;

                        let btnStyle = 'border-slate-200 hover:border-slate-300 text-slate-700';

                        if (isSubmitted) {
                          if (isOptionCorrect) {
                            btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                          } else if (isSelected && !isOptionCorrect) {
                            btnStyle = 'border-red-400 bg-red-50 text-red-900 font-bold';
                          } else {
                            btnStyle = 'border-slate-200 opacity-60';
                          }
                        } else {
                          if (isSelected) {
                            btnStyle = 'border-[#FF5722] bg-orange-50/50 text-slate-900 font-semibold ring-1 ring-[#FF5722]';
                          } else {
                            btnStyle = 'border-slate-200 hover:bg-slate-50 text-slate-700';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            type="button"
                            disabled={isSubmitted}
                            onClick={() => handleSelectOption(q.id, optIdx)}
                            className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 cursor-pointer text-sm sm:text-base leading-relaxed ${btnStyle}`}
                          >
                            <span
                              className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 ${
                                isSubmitted
                                  ? isOptionCorrect
                                    ? 'bg-emerald-600 text-white'
                                    : isSelected
                                    ? 'bg-red-500 text-white'
                                    : 'bg-slate-100 text-slate-500'
                                  : isSelected
                                  ? 'bg-[#FF5722] text-white'
                                  : 'bg-slate-100 text-slate-500'
                              }`}
                            >
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="flex-1">{option}</span>

                            {isSubmitted && (
                              <span className="shrink-0 mt-0.5">
                                {isOptionCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                                {isSelected && !isOptionCorrect && <XCircle className="w-5 h-5 text-red-500" />}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Text / Code Input for Fill in the Blank / Direct Answer / Code Analysis / Code Write */}
                  {(!q.options || q.options.length === 0) && (
                    <div className="mb-6">
                      {q.type === 'code_write' ? (
                        <div className="space-y-2">
                          {q.difficultyLevel === 'Level 1' ? (
                            <div>
                              <div className="relative">
                                <span className="absolute left-3.5 top-3.5 font-mono text-slate-400 select-none text-sm">$</span>
                                <input
                                  type="text"
                                  disabled={isSubmitted}
                                  placeholder="Type single-line code or command (e.g. ollama pull nomic-embed-text or client = chromadb...)"
                                  value={textInputs[q.id] !== undefined ? textInputs[q.id] : (String(userAnswer || ''))}
                                  onChange={(e) => handleTextChange(q.id, e.target.value)}
                                  className={`w-full pl-8 pr-4 py-3 rounded-xl font-mono text-sm border transition-all ${
                                    isSubmitted
                                      ? 'bg-slate-900 text-slate-200 border-slate-700'
                                      : 'bg-slate-900 text-emerald-400 border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#FF5722]/50 focus:border-[#FF5722]'
                                  }`}
                                />
                              </div>
                              {!isSubmitted && (
                                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-1 mt-1.5">
                                  <span>Single-Line Code / Command</span>
                                  <span>{isAnswered ? '✓ Recorded' : 'Empty'}</span>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div>
                              <textarea
                                rows={7}
                                disabled={isSubmitted}
                                placeholder="# Write your full Python implementation here... (Auto-saved, change anytime)"
                                value={textInputs[q.id] !== undefined ? textInputs[q.id] : (String(userAnswer || ''))}
                                onChange={(e) => handleTextChange(q.id, e.target.value)}
                                className={`w-full p-4 rounded-xl font-mono text-sm leading-relaxed border transition-all ${
                                  isSubmitted
                                    ? 'bg-slate-900 text-slate-200 border-slate-700'
                                    : 'bg-slate-900 text-emerald-400 border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#FF5722]/50 focus:border-[#FF5722]'
                                }`}
                              />
                              {!isSubmitted && (
                                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-1 mt-1.5">
                                  <span>Python 3.11 · Full Implementation</span>
                                  <span>{isAnswered ? '✓ Implementation recorded' : 'Empty'}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ) : q.type === 'code_analysis' ? (
                        <div className="space-y-2">
                          <textarea
                            rows={4}
                            disabled={isSubmitted}
                            placeholder="Explain why this code is written this way, the pattern rationale, or failure guard (auto-saved)..."
                            value={textInputs[q.id] !== undefined ? textInputs[q.id] : (String(userAnswer || ''))}
                            onChange={(e) => handleTextChange(q.id, e.target.value)}
                            className="w-full p-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF5722]/30 focus:border-[#FF5722] text-sm font-sans leading-relaxed transition-all"
                          />
                          {!isSubmitted && (
                            <div className="flex justify-end text-[11px] font-mono text-slate-400 px-1">
                              {isAnswered ? '✓ Analysis recorded' : 'Empty'}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <input
                            type="text"
                            disabled={isSubmitted}
                            placeholder={
                              q.type === 'fill_in_the_blank'
                                ? 'Type single-word or short phrase answer (auto-saved)...'
                                : 'Type your technical answer (auto-saved)...'
                            }
                            value={textInputs[q.id] !== undefined ? textInputs[q.id] : (String(userAnswer || ''))}
                            onChange={(e) => handleTextChange(q.id, e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF5722]/30 focus:border-[#FF5722] text-sm sm:text-base font-mono transition-all"
                          />
                          {!isSubmitted && (
                            <div className="flex justify-end text-[11px] font-mono text-slate-400 px-1">
                              {isAnswered ? '✓ Answer recorded' : 'Empty'}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Post-submission: Feedback Banner */}
                      {isSubmitted && grading && (
                        <div
                          className={`mt-4 p-4 rounded-xl text-xs sm:text-sm font-medium flex items-start gap-3 ${
                            grading.status === 'correct'
                              ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                              : grading.status === 'partial'
                              ? 'bg-amber-50 border border-amber-200 text-amber-900'
                              : 'bg-red-50 border border-red-200 text-red-900'
                          }`}
                        >
                          <div className="mt-0.5 shrink-0">
                            {grading.status === 'correct' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                            {grading.status === 'partial' && <HelpCircle className="w-4 h-4 text-amber-600" />}
                            {grading.status === 'incorrect' && <XCircle className="w-4 h-4 text-red-600" />}
                            {grading.status === 'unanswered' && <AlertTriangle className="w-4 h-4 text-slate-500" />}
                          </div>
                          <div className="space-y-1">
                            <div className="font-bold">
                              {grading.status === 'correct'
                                ? 'Answer Accepted (Full Credit)'
                                : grading.status === 'partial'
                                ? 'Partial Credit Awarded'
                                : grading.status === 'unanswered'
                                ? 'Question Left Blank'
                                : 'Incorrect Answer'}
                            </div>
                            <div className="text-xs opacity-90">{grading.feedback}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Reveal Answer & Technical Explanation Accordion */}
                  <div className="pt-4 border-t border-slate-100">
                    {isSubmitted ? (
                      <div>
                        <button
                          type="button"
                          onClick={() => toggleReveal(q.id)}
                          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#2563EB] hover:text-blue-700 transition-colors cursor-pointer uppercase tracking-wider"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-[#FF5722]" />
                          <span>{isRevealed ? 'Hide Solution & Explanation' : 'View Full Solution & Explanation'}</span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${isRevealed ? 'rotate-180' : ''}`}
                          />
                        </button>

                        <AnimatePresence>
                          {isRevealed && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 1 }}
                              transition={{ duration: 0.2, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <div className="mt-4 p-5 rounded-xl bg-slate-50 border border-slate-200/90 text-sm text-slate-700 space-y-3 leading-relaxed">
                                <div>
                                  <span className="font-mono text-xs font-bold text-slate-900 uppercase">
                                    Official Answer:{' '}
                                  </span>
                                  <span className="font-mono font-bold text-emerald-700 ml-1">
                                    {typeof q.correctAnswer === 'number' && q.options
                                      ? `${String.fromCharCode(65 + q.correctAnswer)}. ${q.options[q.correctAnswer]}`
                                      : String(q.correctAnswer)}
                                  </span>
                                </div>

                                {q.type === 'code_write' && q.codeSnippet && (
                                  <div className="pt-2">
                                    <div className="font-mono text-xs font-bold text-slate-900 uppercase mb-2 flex items-center gap-1.5">
                                      <FileCode className="w-3.5 h-3.5 text-[#FF5722]" />
                                      <span>Reference Solution:</span>
                                    </div>
                                    <CodeBlock code={q.codeSnippet} language="python" filename="SOLUTION.PY" />
                                  </div>
                                )}

                                <div className="text-slate-600 text-xs sm:text-[14px]">
                                  <strong className="text-slate-900">Technical Breakdown: </strong>
                                  {q.explanation}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
                        <span>🔒 Solutions and technical explanations unlock after submitting the exam.</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Submit Action Bar (Before Submission) */}
          {!isSubmitted && (
            <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-base font-extrabold text-slate-900">Ready to complete your examination?</h4>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  You have answered <strong className="text-slate-900">{answeredCount}</strong> of{' '}
                  <strong className="text-slate-900">{questions.length}</strong> questions. Click submit below when ready to submit all answers together and calculate your final score out of 100.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowSubmitModal(true)}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#FF5722] hover:bg-[#E64A19] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-orange-500/25 transition-all cursor-pointer shrink-0 text-center"
              >
                Submit Exam ({answeredCount}/{questions.length} answered)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Submission Modal */}
      <AnimatePresence>
        {showSubmitModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-md rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200"
            >
              <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 text-[#FF5722] flex items-center justify-center mb-4">
                <Send className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                Submit Examination?
              </h3>

              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                You have answered <strong className="text-slate-900">{answeredCount}</strong> out of{' '}
                <strong className="text-slate-900">{questions.length}</strong> questions.
                {answeredCount < questions.length && (
                  <span className="block mt-2 font-medium text-amber-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200 text-xs">
                    ⚠️ You have {questions.length - answeredCount} unanswered questions which will receive 0 points.
                  </span>
                )}
              </p>

              <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2.5 rounded-full border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all cursor-pointer uppercase tracking-wider"
                >
                  Keep Working
                </button>

                <button
                  type="button"
                  onClick={handleConfirmSubmit}
                  className="px-6 py-2.5 rounded-full bg-[#FF5722] hover:bg-[#E64A19] text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-orange-500/25 transition-all cursor-pointer"
                >
                  Submit All Answers
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
