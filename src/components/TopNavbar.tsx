import React from 'react';
import {
  Search,
  X,
  CheckCircle2,
  Bookmark,
  RotateCcw,
  BookOpen,
  GraduationCap,
  Flag,
} from 'lucide-react';
import type { ActiveMode } from '../types/examData';

interface TopNavbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeMode: ActiveMode;
  onSelectMode: (mode: ActiveMode) => void;
  completedCount: number;
  totalCount: number;
  savedCount: number;
  reviewCount: number;
  onExpandAll: () => void;
  onCollapseAll: () => void;
  onResetProgress: () => void;
  activeStatusFilter: 'ALL' | 'MASTERED' | 'SAVED' | 'REVIEW';
  onStatusFilterChange: (status: 'ALL' | 'MASTERED' | 'SAVED' | 'REVIEW') => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  searchQuery,
  onSearchChange,
  activeMode,
  onSelectMode,
  completedCount,
  totalCount,
  savedCount,
  reviewCount,
  onExpandAll,
  onCollapseAll,
  onResetProgress,
  activeStatusFilter,
  onStatusFilterChange,
}) => {
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        {/* Left Brand — Minimalist Tech Badge */}
        <div className="flex items-center gap-3 shrink-0">
          <a href="#" className="flex items-center gap-2.5 group select-none">
            <span className="text-slate-400 text-xs font-mono tracking-tighter">··</span>
            <div className="w-7 h-7 border border-slate-900 flex items-center justify-center text-[11px] font-bold text-slate-900 tracking-tight group-hover:bg-slate-900 group-hover:text-white transition-colors">
              AI
            </div>
            <span className="font-bold text-xs tracking-widest text-slate-900 uppercase ml-1 group-hover:text-[#2563EB] transition-colors hidden sm:inline">
              AI ENGINEERING
            </span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-orange-50 text-[#FF5722] border border-orange-200/70 hidden md:inline">
              EXAM PREP
            </span>
          </a>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center rounded-full border border-slate-200 bg-slate-50/90 p-1 text-[11px] font-bold tracking-wider uppercase ml-2 sm:ml-4">
            <button
              type="button"
              onClick={() => onSelectMode('study')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
                activeMode === 'study'
                  ? 'bg-[#0F172A] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Study Guide</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectMode('exam')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
                activeMode === 'exam'
                  ? 'bg-[#FF5722] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Practice Exam</span>
            </button>
          </div>
        </div>

        {/* Center Search Input */}
        <div className="flex-1 max-w-sm mx-3 sm:mx-4 hidden lg:block">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search concepts, architecture, code..."
              className="w-full pl-9 pr-8 py-1.5 rounded-full border border-slate-200 bg-slate-50/60 hover:bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF5722]/20 focus:border-[#FF5722]/50 focus:bg-white text-xs transition-all"
            />
            {searchQuery ? (
              <button
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : null}
          </div>
        </div>

        {/* Right Action Controls: 4 Metric Cards + Expand/Collapse */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Expand / Collapse (Only in Study Mode) */}
          {activeMode === 'study' && (
            <div className="hidden xl:flex items-center rounded-full border border-slate-200 bg-slate-50/80 p-0.5 text-xs font-bold tracking-wider uppercase text-slate-600 mr-1">
              <button
                onClick={() => onExpandAll()}
                className="px-2.5 py-1 rounded-full hover:bg-white hover:text-slate-900 hover:shadow-xs transition-all cursor-pointer"
                title="Expand all modules"
              >
                Expand
              </button>
              <button
                onClick={() => onCollapseAll()}
                className="px-2.5 py-1 rounded-full hover:bg-white hover:text-slate-900 hover:shadow-xs transition-all cursor-pointer"
                title="Collapse all modules"
              >
                Collapse
              </button>
            </div>
          )}

          {/* Metric 1: ALL */}
          <button
            onClick={() => onStatusFilterChange('ALL')}
            className={`px-2.5 py-1 sm:px-3 sm:py-1 rounded-full border text-[11px] font-bold font-mono transition-all cursor-pointer ${
              activeStatusFilter === 'ALL'
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
            title="All items"
          >
            <span className="hidden sm:inline">ALL: </span>
            <span>{totalCount}</span>
          </button>

          {/* Metric 2: MASTERED */}
          <button
            onClick={() => onStatusFilterChange(activeStatusFilter === 'MASTERED' ? 'ALL' : 'MASTERED')}
            className={`px-2.5 py-1 sm:px-3 sm:py-1 rounded-full border text-[11px] font-bold font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
              activeStatusFilter === 'MASTERED'
                ? 'bg-[#FF5722] text-white border-[#FF5722] shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
            title="Mastered / Completed items"
          >
            <CheckCircle2 className={`w-3.5 h-3.5 ${activeStatusFilter === 'MASTERED' ? 'text-white' : 'text-emerald-600'}`} />
            <span className="hidden sm:inline">MASTERED: </span>
            <span>{completedCount}</span>
            <span className={`text-[10px] font-mono ${activeStatusFilter === 'MASTERED' ? 'text-white/80' : 'text-[#FF5722]'}`}>
              ({percentage}%)
            </span>
          </button>

          {/* Metric 3: REVIEW */}
          <button
            onClick={() => onStatusFilterChange(activeStatusFilter === 'REVIEW' ? 'ALL' : 'REVIEW')}
            className={`p-1.5 sm:px-2.5 sm:py-1 rounded-full border text-[11px] font-bold font-mono flex items-center gap-1 transition-all cursor-pointer ${
              activeStatusFilter === 'REVIEW'
                ? 'bg-amber-50 text-amber-800 border-amber-300 shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
            title="Marked for Review"
          >
            <Flag className={`w-3.5 h-3.5 ${activeStatusFilter === 'REVIEW' ? 'text-amber-600 fill-amber-500' : 'text-slate-400'}`} />
            <span className="hidden sm:inline">REVIEW: </span>
            <span>{reviewCount}</span>
          </button>

          {/* Metric 4: SAVED */}
          <button
            onClick={() => onStatusFilterChange(activeStatusFilter === 'SAVED' ? 'ALL' : 'SAVED')}
            className={`p-1.5 sm:px-2.5 sm:py-1 rounded-full border text-[11px] font-bold font-mono flex items-center gap-1 transition-all cursor-pointer ${
              activeStatusFilter === 'SAVED'
                ? 'bg-orange-50 text-[#FF5722] border-orange-300 shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
            title="Bookmarked / Saved items"
          >
            <Bookmark className={`w-3.5 h-3.5 ${activeStatusFilter === 'SAVED' ? 'fill-[#FF5722] text-[#FF5722]' : 'text-slate-400'}`} />
            <span className="hidden sm:inline">SAVED: </span>
            <span>{savedCount}</span>
          </button>

          {/* Reset */}
          <button
            onClick={() => onResetProgress()}
            className="p-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer ml-1"
            title="Reset progress"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Bottom Readiness Progress Bar */}
      <div className="w-full h-[3px] bg-slate-100 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#0F172A] via-[#FF5722] to-[#FF6B2C] transition-all duration-500"
          style={{ width: `${Math.max(1, percentage)}%` }}
        />
      </div>
    </header>
  );
};
