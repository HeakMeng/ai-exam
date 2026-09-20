import React from 'react';
import { Timer, AlertTriangle, Play, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExamGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  questionCount: number;
}

export const ExamGateModal: React.FC<ExamGateModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  questionCount,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-lg rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200/90 z-10"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Icon Badge */}
          <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center mb-5 text-[#FF5722]">
            <Timer className="w-6 h-6" />
          </div>

          {/* Section Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] font-mono text-[11px] font-bold tracking-wide uppercase mb-3">
            [ EXAM SIMULATION // 02:00:00 ]
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Start 2-Hour Exam Simulation?
          </h2>

          <p className="text-slate-600 text-sm mt-2 leading-relaxed">
            You are about to start a timed simulation under strict exam conditions.
          </p>

          {/* Features Box */}
          <div className="my-5 p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5 text-xs text-slate-700">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF5722]" />
              <span><strong>Duration:</strong> Exactly 2 Hours (120 minutes countdown).</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
              <span><strong>Questions Composition:</strong> 43 Questions (10 Multiple Choice, 10 True/False, 10 Fill in Blank, 10 Direct Questions, 3 Code Written).</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span><strong>Interactive Feedback:</strong> Instant evaluation with technical explanations.</span>
            </div>
          </div>

          {/* Warning notice */}
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-800 text-xs mb-6">
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
            <span>The timer will start counting down immediately once you begin. You can exit anytime.</span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all cursor-pointer uppercase tracking-wider"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onConfirm}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FF5722] hover:bg-[#FF6B2C] text-white text-xs font-bold shadow-md shadow-orange-500/25 hover:shadow-lg transition-all cursor-pointer uppercase tracking-wider"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              Start Exam
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
