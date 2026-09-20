import React from 'react';
import type { Category } from '../data/examData';
import type { LessonModule } from '../types/examData';
import {
  Layers,
  Network,
  Database,
  Brain,
  Bot,
  PanelLeftClose,
  Bookmark,
  CheckCircle2,
} from 'lucide-react';

interface CourseSidebarProps {
  selectedCategory: Category;
  onSelectCategory: (cat: Category) => void;
  counts: {
    ALL: number;
    'Workflow Engineering': number;
    'RAG Fundamentals': number;
    'Advanced RAG': number;
    'Autonomous Agents': number;
  };
  modules: LessonModule[];
  expandedIds: Set<string>;
  onSelectModule: (id: string) => void;
  activeStatusFilter: 'ALL' | 'MASTERED' | 'SAVED';
  onStatusFilterChange: (status: 'ALL' | 'MASTERED' | 'SAVED') => void;
  statusCounts: {
    all: number;
    mastered: number;
    saved: number;
  };
  onToggleCollapse?: () => void;
}

interface CategoryOption {
  id: Category;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CATEGORY_OPTIONS: CategoryOption[] = [
  { id: 'ALL', label: 'All Modules', icon: Layers },
  { id: 'Workflow Engineering', label: 'Workflow Engineering', icon: Network },
  { id: 'RAG Fundamentals', label: 'RAG Fundamentals', icon: Database },
  { id: 'Advanced RAG', label: 'Advanced RAG', icon: Brain },
  { id: 'Autonomous Agents', label: 'Autonomous Agents', icon: Bot },
];

export const CourseSidebar: React.FC<CourseSidebarProps> = ({
  selectedCategory,
  onSelectCategory,
  counts,
  activeStatusFilter,
  onStatusFilterChange,
  statusCounts,
  onToggleCollapse,
}) => {
  return (
    <div className="p-4 sm:p-5 flex flex-col min-h-full">
      {/* Section Label — Portfolio pill style */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] font-mono text-[11px] font-bold tracking-wide uppercase">
          [ 01 // TRACKS ]
        </span>
        {onToggleCollapse && (
          <button
            type="button"
            onClick={onToggleCollapse}
            title="Collapse sidebar"
            className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Track Navigation */}
      <nav className="space-y-1.5 mb-6" aria-label="Course Tracks">
        {CATEGORY_OPTIONS.map((opt) => {
          const Icon = opt.icon;
          const isSelected = selectedCategory === opt.id;
          const count = counts[opt.id] ?? 0;

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelectCategory(opt.id)}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-[13px] transition-all flex items-center justify-between gap-2 cursor-pointer group ${
                isSelected
                  ? 'bg-[#0F172A] text-white font-bold shadow-sm'
                  : 'hover:bg-slate-50 hover:text-slate-900 text-slate-700 font-medium'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#FF5722]' : 'text-slate-400 group-hover:text-slate-600'}`} />
                <span className="truncate">{opt.label}</span>
              </div>
              <span
                className={`shrink-0 ml-auto w-6 h-6 rounded-full flex items-center justify-center font-mono text-[11px] font-bold ${
                  isSelected ? 'bg-[#FF5722] text-white' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Filter Section */}
      <div className="pt-4 border-t border-slate-100">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] font-mono text-[11px] font-bold tracking-wide uppercase mb-3">
          [ 02 // FILTER ]
        </span>
        <div className="space-y-1.5 mt-3">
          <button
            onClick={() => onStatusFilterChange('ALL')}
            className={`w-full text-left px-3.5 py-2 rounded-xl text-[13px] flex items-center justify-between cursor-pointer transition-all ${
              activeStatusFilter === 'ALL'
                ? 'bg-slate-100/90 text-slate-900 font-bold'
                : 'text-slate-600 hover:bg-slate-50 font-medium'
            }`}
          >
            <span>All Lessons</span>
            <span className="font-mono text-[11px] text-slate-400">{statusCounts.all}</span>
          </button>

          <button
            onClick={() => onStatusFilterChange(activeStatusFilter === 'MASTERED' ? 'ALL' : 'MASTERED')}
            className={`w-full text-left px-3.5 py-2 rounded-xl text-[13px] flex items-center justify-between cursor-pointer transition-all ${
              activeStatusFilter === 'MASTERED'
                ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200/80'
                : 'text-slate-600 hover:bg-slate-50 font-medium'
            }`}
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Completed</span>
            </div>
            <span className="font-mono text-[11px] text-slate-400">{statusCounts.mastered}</span>
          </button>

          <button
            onClick={() => onStatusFilterChange(activeStatusFilter === 'SAVED' ? 'ALL' : 'SAVED')}
            className={`w-full text-left px-3.5 py-2 rounded-xl text-[13px] flex items-center justify-between cursor-pointer transition-all ${
              activeStatusFilter === 'SAVED'
                ? 'bg-orange-50 text-[#FF5722] font-bold border border-orange-200/80'
                : 'text-slate-600 hover:bg-slate-50 font-medium'
            }`}
          >
            <div className="flex items-center gap-2">
              <Bookmark className="w-3.5 h-3.5 text-[#FF5722]" />
              <span>Saved Bookmarks</span>
            </div>
            <span className="font-mono text-[11px] text-slate-400">{statusCounts.saved}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
