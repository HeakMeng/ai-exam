import React from 'react';
import type { QuestionTypeFilter } from '../types/examData';
import {
  ListFilter,
  CheckSquare,
  HelpCircle,
  Code2,
  PenTool,
  ArrowLeft,
  SlidersHorizontal,
} from 'lucide-react';

interface ExamSidebarProps {
  selectedType: QuestionTypeFilter;
  onSelectType: (type: QuestionTypeFilter) => void;
  typeCounts: Record<QuestionTypeFilter, number>;
  onExitExam: () => void;
}

interface QuestionTypeOption {
  id: QuestionTypeFilter;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const QUESTION_TYPE_OPTIONS: QuestionTypeOption[] = [
  { id: 'all', label: 'All Types', icon: SlidersHorizontal },
  { id: 'mcq', label: 'Multiple Choice', icon: ListFilter },
  { id: 'true_false', label: 'True / False', icon: CheckSquare },
  { id: 'fill_in_the_blank', label: 'Fill in the Blank', icon: PenTool },
  { id: 'direct', label: 'Direct Questions', icon: HelpCircle },
  { id: 'code_write', label: 'Code Written', icon: Code2 },
];

export const ExamSidebar: React.FC<ExamSidebarProps> = ({
  selectedType,
  onSelectType,
  typeCounts,
  onExitExam,
}) => {
  return (
    <div className="p-4 sm:p-5 flex flex-col justify-between min-h-full">
      <div>
        {/* Section Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] font-mono text-[11px] font-bold tracking-wide uppercase">
            [ 01 // QUESTION TYPES ]
          </span>
        </div>

        {/* Question Type Filter Options */}
        <nav className="space-y-1.5" aria-label="Question Type Filters">
          {QUESTION_TYPE_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const isSelected = selectedType === opt.id;
            const count = typeCounts[opt.id] ?? 0;

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onSelectType(opt.id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-[13px] transition-all flex items-center justify-between gap-2 cursor-pointer group ${
                  isSelected
                    ? 'bg-[#0F172A] text-white font-bold shadow-sm'
                    : 'hover:bg-slate-50 hover:text-slate-900 text-slate-700 font-medium'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isSelected ? 'text-[#FF5722]' : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  />
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
      </div>

      {/* Exit Exam Button at the bottom */}
      <div className="pt-6 border-t border-slate-100 mt-8">
        <button
          type="button"
          onClick={onExitExam}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all cursor-pointer uppercase tracking-wider"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit Exam Mode</span>
        </button>
      </div>
    </div>
  );
};
