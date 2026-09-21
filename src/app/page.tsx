'use client';

import React, { useState } from 'react';
import { useExamReview } from '../hooks/useExamReview';
import { TopNavbar } from '../components/TopNavbar';
import { StudyGuideView } from '../components/StudyGuideView';
import { PracticeExamView } from '../components/PracticeExamView';
import { ExamGateModal } from '../components/ExamGateModal';
import { Footer } from '../components/Footer';

export default function Home() {
  const {
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
    lessonModules,
    categoryCounts,
    statusCounts,
    expandedLessonIds,
    toggleExpandLesson,
    expandAll,
    collapseAll,
    progress,
    toggleSaved,
    toggleMastered,
    resetProgress,
    metrics,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    activeStatusFilter,
    setActiveStatusFilter,
  } = useExamReview();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  const handleSelectTag = (tag: string) => {
    setSearchQuery(tag);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveCategory('ALL');
    setActiveStatusFilter('ALL');
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-slate-200 border-t-[#FF5722] animate-spin" />
          <span className="font-mono text-xs font-bold text-slate-500 uppercase tracking-wider">
            Loading Curriculum...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 antialiased selection:bg-[#FF5722] selection:text-white relative font-sans">
      {/* Sticky Top Navbar */}
      <TopNavbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeMode={activeMode}
        onSelectMode={handleSelectMode}
        completedCount={metrics.completed}
        totalCount={metrics.total}
        savedCount={metrics.saved}
        reviewCount={metrics.review}
        onExpandAll={expandAll}
        onCollapseAll={collapseAll}
        onResetProgress={resetProgress}
        activeStatusFilter={activeStatusFilter}
        onStatusFilterChange={setActiveStatusFilter}
      />

      {/* Main Content — offset for fixed navbar */}
      <main className="flex-1 pt-16">
        {activeMode === 'study' ? (
          <StudyGuideView
            modules={lessonModules}
            selectedCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            categoryCounts={categoryCounts}
            expandedIds={expandedLessonIds}
            masteredIds={progress.mastered}
            savedIds={progress.saved}
            onToggleExpand={toggleExpandLesson}
            onToggleSaved={toggleSaved}
            onToggleMastered={toggleMastered}
            onSelectTag={handleSelectTag}
            onResetFilters={handleResetFilters}
            activeStatusFilter={activeStatusFilter === 'REVIEW' ? 'ALL' : activeStatusFilter}
            onStatusFilterChange={(status) => setActiveStatusFilter(status)}
            statusCounts={statusCounts}
            isSidebarCollapsed={isSidebarCollapsed}
            onToggleSidebar={toggleSidebar}
          />
        ) : (
          <PracticeExamView
            key={examSessionId}
            questions={shuffledQuestions}
            selectedType={selectedQuestionType}
            onSelectType={setSelectedQuestionType}
            typeCounts={questionTypeCounts}
            onExitExam={handleExitExam}
            timeRemaining={examTimeRemaining}
            onResetExam={handleResetExam}
          />
        )}
      </main>

      {/* Exam Gate Modal */}
      <ExamGateModal
        isOpen={isExamModalOpen}
        onClose={handleCancelExam}
        onConfirm={handleConfirmStartExam}
        questionCount={shuffledQuestions.length}
      />

      {/* Footer */}
      <Footer isSidebarCollapsed={isSidebarCollapsed} />
    </div>
  );
}
