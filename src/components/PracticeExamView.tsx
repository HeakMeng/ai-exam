'use client';

import React, { useState } from 'react';
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
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PracticeExamViewProps {
  questions: TestQuestion[];
  selectedType: QuestionTypeFilter;
  onSelectType: (type: QuestionTypeFilter) => void;
  typeCounts: Record<QuestionTypeFilter, number>;
  onExitExam: () => void;
  timeRemaining: number; // in seconds
  onResetExam: () => void;
}

export const PracticeExamView: React.FC<PracticeExamViewProps> = ({
  questions,
  selectedType,
  onSelectType,
  typeCounts,
  onExitExam,
  timeRemaining,
  onResetExam,
}) => {
  // Local state for answers and revealed explanations
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string | number>>({});
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());
  const [markedForReview, setMarkedForReview] = useState<Set<string>>(new Set());
  const [textInputs, setTextInputs] = useState<Record<string, string>>({});

  // Filter questions by type
  const filteredQuestions =
    selectedType === 'all'
      ? questions
      : questions.filter((q) => q.type === selectedType);

  // Format time (HH:MM:SS)
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const isLowTime = timeRemaining < 900; // < 15 mins

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleTextSubmit = (questionId: string) => {
    const val = textInputs[questionId]?.trim() || '';
    if (val) {
      setSelectedAnswers((prev) => ({ ...prev, [questionId]: val }));
    }
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

  // Calculate score
  const totalAnswered = Object.keys(selectedAnswers).length;
  let correctCount = 0;
  questions.forEach((q) => {
    const userAns = selectedAnswers[q.id];
    if (userAns !== undefined) {
      if (typeof q.correctAnswer === 'number' && userAns === q.correctAnswer) {
        correctCount++;
      } else if (
        typeof q.correctAnswer === 'string' &&
        String(userAns).trim().toLowerCase() === q.correctAnswer.trim().toLowerCase()
      ) {
        correctCount++;
      }
    }
  });

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
          {/* Exam Header Banner with Sticky Countdown Timer & Live Score */}
          <div className="sticky top-16 z-20 -mx-4 sm:-mx-8 lg:-mx-12 px-4 sm:px-8 lg:px-12 py-4 mb-8 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-4">
            {/* Left: Timer Badge */}
            <div className="flex items-center gap-3">
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
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                2-Hour Exam Simulation
              </span>
            </div>

            {/* Right: Score & Reset */}
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono font-bold text-slate-700">
                <Award className="w-4 h-4 text-[#FF5722]" />
                <span>
                  Score: {correctCount}/{totalAnswered} answered ({questions.length} total)
                </span>
              </div>

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

          {/* Section Title */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] font-mono text-xs font-bold tracking-wide uppercase mb-3">
              [ EXAM IN PROGRESS // {selectedType.toUpperCase().replace(/_/g, ' ')} ]
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
              Interactive Test Simulation
            </h2>
            <p className="text-slate-600 text-sm mt-1.5 font-medium">
              Showing {filteredQuestions.length} {filteredQuestions.length === 1 ? 'question' : 'questions'}
            </p>
          </div>

          {/* Question Cards */}
          <div className="space-y-6">
            {filteredQuestions.map((q, qIndex) => {
              const userAnswer = selectedAnswers[q.id];
              const isAnswered = userAnswer !== undefined;
              const isRevealed = revealedIds.has(q.id);
              const isMarked = markedForReview.has(q.id);

              const isCorrect =
                typeof q.correctAnswer === 'number'
                  ? userAnswer === q.correctAnswer
                  : String(userAnswer).trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();

              return (
                <div
                  key={q.id}
                  className={`rounded-2xl border bg-white p-6 sm:p-8 transition-all duration-300 shadow-sm ${
                    isAnswered
                      ? isCorrect
                        ? 'border-emerald-200'
                        : 'border-orange-200'
                      : 'border-slate-200/90'
                  }`}
                >
                  {/* Top Header: Number, Category, Type, Review */}
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
                    </div>

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

                  {/* Question Text */}
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug tracking-tight mb-4">
                    {q.question}
                  </h3>

                  {/* Code Snippet if present (for context questions) */}
                  {q.codeSnippet && q.type !== 'code_write' && (
                    <div className="mb-5">
                      <CodeBlock code={q.codeSnippet} language="python" filename="QUESTION_CONTEXT.PY" />
                    </div>
                  )}

                  {/* Options for MCQ / True False */}
                  {q.options && q.options.length > 0 && (
                    <div className="space-y-2.5 mb-6">
                      {q.options.map((option, optIdx) => {
                        const isSelected = userAnswer === optIdx;
                        const isOptionCorrect = q.correctAnswer === optIdx;

                        let btnStyle = 'border-slate-200 hover:bg-slate-50 text-slate-700';
                        if (isAnswered) {
                          if (isSelected && isOptionCorrect) {
                            btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold shadow-xs';
                          } else if (isSelected && !isOptionCorrect) {
                            btnStyle = 'border-red-400 bg-red-50 text-red-900 font-bold';
                          } else if (isRevealed && isOptionCorrect) {
                            btnStyle = 'border-emerald-300 bg-emerald-50/70 text-emerald-900 font-semibold';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            type="button"
                            onClick={() => handleSelectOption(q.id, optIdx)}
                            className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 cursor-pointer text-sm sm:text-base leading-relaxed ${btnStyle}`}
                          >
                            <span
                              className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 ${
                                isSelected
                                  ? isCorrect
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-red-500 text-white'
                                  : 'bg-slate-100 text-slate-500'
                              }`}
                            >
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="flex-1">{option}</span>
                            {isAnswered && isSelected && (
                              <span className="shrink-0 mt-0.5">
                                {isCorrect ? (
                                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                ) : (
                                  <XCircle className="w-5 h-5 text-red-500" />
                                )}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Text / Code Input for Fill in the Blank / Direct Answer / Code Write */}
                  {(!q.options || q.options.length === 0) && (
                    <div className="mb-6">
                      {q.type === 'code_write' ? (
                        <div className="space-y-3">
                          <textarea
                            rows={6}
                            placeholder="# Write your Python implementation here..."
                            value={textInputs[q.id] || ''}
                            onChange={(e) =>
                              setTextInputs((prev) => ({ ...prev, [q.id]: e.target.value }))
                            }
                            className="w-full p-4 rounded-xl border border-slate-700 bg-slate-900 text-emerald-400 font-mono text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#FF5722]/50 focus:border-[#FF5722]"
                          />
                          <button
                            type="button"
                            onClick={() => handleTextSubmit(q.id)}
                            className="px-6 py-2.5 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider cursor-pointer transition-all"
                          >
                            Submit Code
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-3">
                          <input
                            type="text"
                            placeholder={
                              q.type === 'fill_in_the_blank'
                                ? 'Type single-word or short phrase answer...'
                                : 'Type your technical answer...'
                            }
                            value={textInputs[q.id] || ''}
                            onChange={(e) =>
                              setTextInputs((prev) => ({ ...prev, [q.id]: e.target.value }))
                            }
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleTextSubmit(q.id);
                            }}
                            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF5722]/30 focus:border-[#FF5722] text-sm sm:text-base font-mono"
                          />
                          <button
                            type="button"
                            onClick={() => handleTextSubmit(q.id)}
                            className="px-6 py-3 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider cursor-pointer transition-all"
                          >
                            Submit
                          </button>
                        </div>
                      )}

                      {isAnswered && (
                        <div
                          className={`mt-3 p-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 ${
                            isCorrect ? 'bg-emerald-50 text-emerald-800' : 'bg-orange-50 text-[#FF5722]'
                          }`}
                        >
                          {isCorrect ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          ) : (
                            <HelpCircle className="w-4 h-4 text-[#FF5722] shrink-0" />
                          )}
                          <span>
                            {isCorrect
                              ? 'Correct Answer!'
                              : `Answer submitted (${String(userAnswer).slice(0, 60)}...). Click below to verify.`}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Reveal Answer & Technical Explanation Accordion */}
                  <div className="pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => toggleReveal(q.id)}
                      className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#2563EB] hover:text-blue-700 transition-colors cursor-pointer uppercase tracking-wider"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#FF5722]" />
                      <span>{isRevealed ? 'Hide Technical Explanation' : 'Reveal Answer & Technical Explanation'}</span>
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
                                Correct Answer:{' '}
                              </span>
                              <span className="font-mono font-bold text-emerald-700 ml-1">
                                {typeof q.correctAnswer === 'number' && q.options
                                  ? `${String.fromCharCode(65 + q.correctAnswer)}. ${q.options[q.correctAnswer]}`
                                  : String(q.correctAnswer)}
                              </span>
                            </div>

                            {q.type === 'code_write' && q.codeSnippet && (
                              <div className="pt-2">
                                <div className="font-mono text-xs font-bold text-slate-900 uppercase mb-2">
                                  Reference Implementation:
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
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
