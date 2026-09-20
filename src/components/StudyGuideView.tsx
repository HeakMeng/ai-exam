import React from 'react';
import type { LessonModule } from '../types/examData';
import type { Category } from '../data/examData';
import { LessonModuleCard } from './LessonModuleCard';
import { CourseSidebar } from './CourseSidebar';
import { SearchX, RotateCcw, PanelLeftOpen } from 'lucide-react';

interface StudyGuideViewProps {
  modules: LessonModule[];
  selectedCategory: Category;
  onSelectCategory: (cat: Category) => void;
  categoryCounts: {
    ALL: number;
    'Workflow Engineering': number;
    'RAG Fundamentals': number;
    'Advanced RAG': number;
    'Autonomous Agents': number;
  };
  expandedIds: Set<string>;
  masteredIds: string[];
  savedIds: string[];
  onToggleExpand: (id: string) => void;
  onToggleSaved: (id: string) => void;
  onToggleMastered: (id: string) => void;
  onSelectTag: (tag: string) => void;
  onResetFilters: () => void;
  activeStatusFilter: 'ALL' | 'MASTERED' | 'SAVED';
  onStatusFilterChange: (status: 'ALL' | 'MASTERED' | 'SAVED') => void;
  statusCounts: {
    all: number;
    mastered: number;
    saved: number;
  };
  isSidebarCollapsed?: boolean;
  onToggleSidebar?: () => void;
}

export const StudyGuideView: React.FC<StudyGuideViewProps> = ({
  modules,
  selectedCategory,
  onSelectCategory,
  categoryCounts,
  expandedIds,
  masteredIds,
  savedIds,
  onToggleExpand,
  onToggleSaved,
  onToggleMastered,
  onSelectTag,
  onResetFilters,
  activeStatusFilter,
  onStatusFilterChange,
  statusCounts,
  isSidebarCollapsed = false,
  onToggleSidebar,
}) => {
  // Map category to section number
  const categoryIndex: Record<string, string> = {
    'ALL': '00',
    'Workflow Engineering': '01',
    'RAG Fundamentals': '02',
    'Advanced RAG': '03',
    'Autonomous Agents': '04',
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] relative">
      {/* Left Column: Fixed Left Sidebar (permanently pinned to left viewport edge) */}
      {!isSidebarCollapsed && (
        <aside
          className="hidden md:block fixed top-16 left-0 bottom-0 w-64 lg:w-72 z-30 bg-white border-r border-slate-200/80 overflow-y-auto"
          aria-label="Course Tracks"
        >
          <CourseSidebar
            selectedCategory={selectedCategory}
            onSelectCategory={onSelectCategory}
            counts={categoryCounts}
            modules={modules}
            expandedIds={expandedIds}
            onSelectModule={onToggleExpand}
            activeStatusFilter={activeStatusFilter}
            onStatusFilterChange={onStatusFilterChange}
            statusCounts={statusCounts}
            onToggleCollapse={onToggleSidebar}
          />
        </aside>
      )}

      {/* Right Column: Main Content Area (expanded horizontally with generous width) */}
      <div
        className={`w-full transition-all duration-200 ${
          !isSidebarCollapsed ? 'md:pl-64 lg:pl-72' : 'md:pl-0'
        }`}
      >
        <div className="w-full px-4 sm:px-8 lg:px-12 py-8 max-w-[1600px] mx-auto">
          {/* If sidebar is collapsed, show expand button */}
          {isSidebarCollapsed && onToggleSidebar && (
            <div className="mb-6">
              <button
                onClick={onToggleSidebar}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/90 text-xs font-bold text-slate-700 hover:text-[#2563EB] hover:border-blue-300 shadow-sm transition-all cursor-pointer uppercase tracking-wider"
              >
                <PanelLeftOpen className="w-4 h-4 text-[#2563EB]" />
                <span>Show Tracks ({selectedCategory === 'ALL' ? 'All Modules' : selectedCategory})</span>
              </button>
            </div>
          )}

          {/* Section Header — Portfolio style */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] font-mono text-xs font-bold tracking-wide uppercase mb-3">
              [ {categoryIndex[selectedCategory] || '00'} // {selectedCategory === 'ALL' ? 'ALL MODULES' : selectedCategory.toUpperCase()} ]
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 uppercase tracking-tight">
              {selectedCategory === 'ALL' ? 'All Syllabus Modules' : selectedCategory}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 font-medium">
              Showing {modules.length} {modules.length === 1 ? 'module' : 'modules'}
            </p>
          </div>

          {modules.length === 0 ? (
            <div className="text-center py-20 px-6 bg-white rounded-2xl border border-slate-200/90 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
                <SearchX className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">No modules matched your search</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto mt-2 mb-6 font-medium leading-relaxed">
                Try clearing your search query or selecting a different category track.
              </p>
              <button
                onClick={onResetFilters}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold bg-[#FF5722] hover:bg-[#FF6B2C] text-white shadow-md shadow-orange-500/25 hover:shadow-lg transition-all cursor-pointer uppercase tracking-wider"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {modules.map((mod, idx) => (
                <LessonModuleCard
                  key={mod.id}
                  module={mod}
                  index={idx}
                  isExpanded={expandedIds.has(mod.id)}
                  isSaved={savedIds.includes(mod.id)}
                  isMastered={masteredIds.includes(mod.id)}
                  onToggleExpand={() => onToggleExpand(mod.id)}
                  onToggleSaved={() => onToggleSaved(mod.id)}
                  onToggleMastered={() => onToggleMastered(mod.id)}
                  onSelectTag={onSelectTag}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
