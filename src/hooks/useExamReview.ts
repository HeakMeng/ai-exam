import { useState, useEffect, useMemo, useCallback } from 'react';
import { lessonModules, testQuestions, Category } from '../data/examData';
import type {
  LessonModule,
  TestQuestion,
  QuestionTypeFilter,
  ActiveMode,
  UserExamProgress,
} from '../types/examData';
import confetti from 'canvas-confetti';

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

// Generate balanced exam: exactly 10 MCQ, 10 True/False, 10 Fill in Blank, 10 Direct, 3 Code Written (43 total)
function generateBalancedExam(pool: TestQuestion[]): TestQuestion[] {
  const mcqs = shuffleArray(pool.filter((q) => q.type === 'mcq')).slice(0, 10);
  const tf = shuffleArray(pool.filter((q) => q.type === 'true_false')).slice(0, 10);
  const fitb = shuffleArray(pool.filter((q) => q.type === 'fill_in_the_blank')).slice(0, 10);
  const direct = shuffleArray(pool.filter((q) => q.type === 'direct')).slice(0, 10);
  const codeWrite = shuffleArray(pool.filter((q) => q.type === 'code_write')).slice(0, 3);

  return [...mcqs, ...tf, ...fitb, ...direct, ...codeWrite];
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

  // Question Type filter in Exam Mode
  const [selectedQuestionType, setSelectedQuestionType] = useState<QuestionTypeFilter>('all');

  // User Progress: mastered, saved, review
  const [progress, setProgress] = useState<UserExamProgress>({
    mastered: [],
    saved: [],
    review: [],
  });

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
    setProgress((prev) => {
      const isSaved = prev.saved.includes(id);
      return {
        ...prev,
        saved: isSaved ? prev.saved.filter((x) => x !== id) : [...prev.saved, id],
      };
    });
  }, []);

  // Toggle Mastered (Completed)
  const toggleMastered = useCallback((id: string) => {
    setProgress((prev) => {
      const isMastered = prev.mastered.includes(id);
      const newMastered = isMastered
        ? prev.mastered.filter((x) => x !== id)
        : [...prev.mastered, id];

      // Trigger celebration if marking complete
      if (!isMastered && typeof window !== 'undefined') {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#FF5722', '#2563EB', '#10B981'],
        });
      }

      return {
        ...prev,
        mastered: newMastered,
      };
    });
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
    if (typeof window !== 'undefined' && window.confirm('Reset your progress and bookmarked items?')) {
      setProgress({
        mastered: [],
        saved: [],
        review: [],
      });
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // Exam Mode Handlers
  const handleRequestExamMode = useCallback(() => {
    setIsExamModalOpen(true);
  }, []);

  const handleConfirmStartExam = useCallback(() => {
    setShuffledQuestions(generateBalancedExam(testQuestions));
    setExamTimeRemaining(7200); // 2 hours
    setActiveMode('exam');
    setIsExamModalOpen(false);
  }, []);

  const handleCancelExam = useCallback(() => {
    setIsExamModalOpen(false);
  }, []);

  const handleExitExam = useCallback(() => {
    setActiveMode('study');
  }, []);

  const handleResetExam = useCallback(() => {
    if (typeof window !== 'undefined' && window.confirm('Restart exam simulation with newly shuffled questions?')) {
      setShuffledQuestions(generateBalancedExam(testQuestions));
      setExamTimeRemaining(7200);
    }
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
