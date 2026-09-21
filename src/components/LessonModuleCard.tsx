import React from 'react';
import { Bookmark, ChevronDown, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { LessonModule } from '../types/examData';
import { MarkdownRenderer } from './MarkdownRenderer';

interface LessonModuleCardProps {
  module: LessonModule;
  index: number;
  isExpanded: boolean;
  isSaved: boolean;
  isMastered: boolean;
  onToggleExpand: () => void;
  onToggleSaved: () => void;
  onToggleMastered: () => void;
  onSelectTag?: (tag: string) => void;
}

export const LessonModuleCard: React.FC<LessonModuleCardProps> = ({
  module,
  index,
  isExpanded,
  isSaved,
  isMastered,
  onToggleExpand,
  onToggleSaved,
  onToggleMastered,
  onSelectTag,
}) => {
  // Map category to short label
  const categoryShort: Record<string, string> = {
    'Workflow Engineering': 'WORKFLOW',
    'RAG Fundamentals': 'RAG',
    'Advanced RAG': 'ADV RAG',
    'Autonomous Agents': 'AGENTS',
  };
  const shortCat = categoryShort[module.category] || module.category.toUpperCase();

  return (
    <article
      id={module.id}
      className={`rounded-2xl border transition-all duration-200 bg-white overflow-hidden group ${
        isMastered
          ? 'border-emerald-200/90 shadow-sm'
          : isSaved
          ? 'border-orange-200/90 shadow-sm'
          : 'border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300'
      }`}
    >
      {/* Clickable Card Header */}
      <div
        onClick={onToggleExpand}
        className="p-6 sm:p-7 cursor-pointer select-none transition-colors"
      >
        {/* Row 1: Numbered badge + Category pill + Status */}
        <div className="flex items-center justify-between gap-3 mb-3.5">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Numbered badge */}
            <span className="px-3 py-0.5 rounded-full bg-white text-slate-900 font-mono text-xs font-bold shadow-xs border border-slate-200/90">
              {module.id}
            </span>
            {/* Category CTA pill */}
            <span className="px-3 py-0.5 rounded-full bg-[#FF5722] text-white font-mono text-[11px] font-bold uppercase tracking-wider shadow-xs">
              {shortCat}
            </span>
            {isMastered && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5" /> DONE
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={onToggleSaved}
              title={isSaved ? 'Remove Bookmark' : 'Bookmark Module'}
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                isSaved
                  ? 'bg-[#FF5722] text-white border-[#FF5722] hover:bg-[#FF6B2C] shadow-sm shadow-orange-500/25'
                  : 'bg-white text-slate-400 border-slate-200 hover:text-slate-600 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-white text-white' : ''}`} />
            </button>

            <button
              type="button"
              onClick={onToggleMastered}
              title={isMastered ? 'Mark as Incomplete' : 'Mark as Completed'}
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                isMastered
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                  : 'bg-white text-slate-400 border-slate-200 hover:text-emerald-600 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <CheckCircle2 className={`w-4 h-4 ${isMastered ? 'text-emerald-600' : ''}`} />
            </button>

            <div
              onClick={onToggleExpand}
              className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-[#FF5722]' : ''}`}
              />
            </div>
          </div>
        </div>

        {/* Row 2: Module label */}
        <div className="font-mono text-xs sm:text-[13px] text-[#2563EB] font-bold uppercase tracking-wider mb-2">
          {String(index + 1).padStart(2, '0')} / {module.category.toUpperCase()}
        </div>

        {/* Row 3: Title (Larger & clearer typography) */}
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-2.5 group-hover:text-[#2563EB] transition-colors leading-snug">
          {module.title}
        </h3>

        {/* Row 4: Summary (Larger & clearer text) */}
        <p className="text-[15px] sm:text-base text-slate-600 leading-relaxed mb-4">
          {module.summary}
        </p>

        {/* Row 5: Tags */}
        {module.tags && module.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2" onClick={(e) => e.stopPropagation()}>
            {module.tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => onSelectTag && onSelectTag(tag)}
                className="px-3 py-1 rounded-lg bg-slate-100 border border-slate-200/80 font-mono text-xs text-slate-700 font-medium hover:bg-blue-50 hover:text-[#2563EB] hover:border-blue-200 transition-colors cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <div className="border-t border-slate-100 bg-[#FBFBFA] p-6 sm:p-8">
              <MarkdownRenderer content={module.content} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
};
