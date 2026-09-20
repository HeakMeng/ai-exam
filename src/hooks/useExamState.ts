import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Question, StatusFilter, MetricCounts, UserProgress } from '../types/exam';
import { INITIAL_QUESTIONS } from '../data/questions';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'ai_eng_exam_review_progress_v1';

export function useExamState() {
  const [isHydrated, setIsHydrated] = useState(false);

  // Initialize with empty defaults to avoid Next.js SSR hydration mismatches
  const [progress, setProgress] = useState<UserProgress>({
    mastered: [],
    review: [],
    saved: [],
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
            review: Array.isArray(parsed.review) ? parsed.review : [],
            saved: Array.isArray(parsed.saved) ? parsed.saved : [],
          });
        }
      }
    } catch (e) {
      console.error('Failed to load progress from localStorage', e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save progress changes to localStorage only after hydration is complete
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

  // Accordion expanded state (by default keep first 1 open)
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(['q01']));

  // Filtering states
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [activeStatusFilter, setActiveStatusFilter] = useState<StatusFilter>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Question order (supports shuffle)
  const [questionsOrder, setQuestionsOrder] = useState<Question[]>(INITIAL_QUESTIONS);
  const [isShuffled, setIsShuffled] = useState<boolean>(false);

  // Toggle question expanded
  const toggleExpanded = useCallback((id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  // Expand all visible questions
  const expandAll = useCallback((idsToExpand?: string[]) => {
    if (idsToExpand) {
      setExpandedIds(new Set(idsToExpand));
    } else {
      setExpandedIds(new Set(INITIAL_QUESTIONS.map(q => q.id)));
    }
  }, []);

  // Collapse all
  const collapseAll = useCallback(() => {
    setExpandedIds(new Set());
  }, []);

  // Toggle Mastered
  const toggleMastered = useCallback((id: string) => {
    setProgress(prev => {
      const isMastered = prev.mastered.includes(id);
      const newMastered = isMastered
        ? prev.mastered.filter(qId => qId !== id)
        : [...prev.mastered, id];

      // If user marks as mastered, remove from review list if present
      const newReview = isMastered ? prev.review : prev.review.filter(qId => qId !== id);

      // Trigger confetti celebration if just reached 100%
      if (!isMastered && newMastered.length === INITIAL_QUESTIONS.length) {
        try {
          confetti({
            particleCount: 120,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch (_) {}
      }

      return {
        ...prev,
        mastered: newMastered,
        review: newReview,
      };
    });
  }, []);

  // Toggle Review
  const toggleReview = useCallback((id: string) => {
    setProgress(prev => {
      const isReview = prev.review.includes(id);
      const newReview = isReview
        ? prev.review.filter(qId => qId !== id)
        : [...prev.review, id];

      // If marked for review, remove from mastered
      const newMastered = isReview ? prev.mastered : prev.mastered.filter(qId => qId !== id);

      return {
        ...prev,
        review: newReview,
        mastered: newMastered,
      };
    });
  }, []);

  // Toggle Saved / Bookmark
  const toggleSaved = useCallback((id: string) => {
    setProgress(prev => {
      const isSaved = prev.saved.includes(id);
      return {
        ...prev,
        saved: isSaved
          ? prev.saved.filter(qId => qId !== id)
          : [...prev.saved, id],
      };
    });
  }, []);

  // Shuffle questions
  const shuffleQuestions = useCallback(() => {
    const shuffled = [...INITIAL_QUESTIONS].sort(() => Math.random() - 0.5);
    setQuestionsOrder(shuffled);
    setIsShuffled(true);
  }, []);

  // Reset shuffle to default order
  const resetShuffle = useCallback(() => {
    setQuestionsOrder(INITIAL_QUESTIONS);
    setIsShuffled(false);
  }, []);

  // Reset all progress
  const resetAllProgress = useCallback(() => {
    if (typeof window !== 'undefined' && window.confirm('Reset all your review, mastered, and saved progress?')) {
      setProgress({
        mastered: [],
        review: [],
        saved: [],
      });
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // Metric counts
  const metrics: MetricCounts = useMemo(() => {
    const all = INITIAL_QUESTIONS.length;
    const mastered = progress.mastered.length;
    const review = progress.review.length;
    const saved = progress.saved.length;

    // Readiness formula: Mastered provides full weight (100%), Review provides partial familiarity (30%)
    const rawScore = all > 0 ? (mastered + review * 0.3) / all * 100 : 0;
    const readinessPercentage = Math.min(100, Math.round(rawScore));

    return {
      all,
      mastered,
      review,
      saved,
      readinessPercentage,
    };
  }, [progress]);

  // Filter questions according to Category, Status Filter, and Search Query
  const filteredQuestions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return questionsOrder.filter(q => {
      // 1. Category filter
      if (activeCategory !== 'ALL' && q.category !== activeCategory) {
        return false;
      }

      // 2. Status filter
      if (activeStatusFilter === 'MASTERED' && !progress.mastered.includes(q.id)) {
        return false;
      }
      if (activeStatusFilter === 'REVIEW' && !progress.review.includes(q.id)) {
        return false;
      }
      if (activeStatusFilter === 'SAVED' && !progress.saved.includes(q.id)) {
        return false;
      }

      // 3. Search query matching question text, answer text, or tags
      if (query) {
        const matchesQuestion = q.question.toLowerCase().includes(query);
        const matchesAnswer = q.answer.toLowerCase().includes(query);
        const matchesCategory = q.category.toLowerCase().includes(query);
        const matchesTags = q.tags.some(t => t.toLowerCase().includes(query));
        if (!matchesQuestion && !matchesAnswer && !matchesCategory && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }, [questionsOrder, activeCategory, activeStatusFilter, searchQuery, progress]);

  return {
    questions: filteredQuestions,
    allQuestions: INITIAL_QUESTIONS,
    progress,
    metrics,
    isHydrated,
    expandedIds,
    activeCategory,
    activeStatusFilter,
    searchQuery,
    isShuffled,
    setActiveCategory,
    setActiveStatusFilter,
    setSearchQuery,
    toggleExpanded,
    expandAll,
    collapseAll,
    toggleMastered,
    toggleReview,
    toggleSaved,
    shuffleQuestions,
    resetShuffle,
    resetAllProgress,
  };
}
