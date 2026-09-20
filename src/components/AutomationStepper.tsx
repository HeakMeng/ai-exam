'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  Link as LinkIcon,
  Cpu,
  Network,
  ArrowRight,
  ArrowDown,
  Sparkles,
} from 'lucide-react';

interface AutomationStep {
  level: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  bgGradient: string;
  borderColor: string;
  iconBg: string;
  textColor: string;
}

const STEPS: AutomationStep[] = [
  {
    level: 'L1',
    badge: 'LEVEL 1',
    title: 'Level 1: Single Q&A',
    subtitle: 'Prompting / One-off',
    description: 'Direct zero-shot or few-shot inference with single input-output turnaround.',
    icon: MessageSquare,
    bgGradient: 'from-slate-50 to-slate-100/60',
    borderColor: 'border-slate-200/90',
    iconBg: 'bg-slate-100 text-slate-700 border-slate-200',
    textColor: 'text-slate-900',
  },
  {
    level: 'L2',
    badge: 'LEVEL 2',
    title: 'Level 2: Chaining',
    subtitle: 'Fixed Pipelines',
    description: 'Deterministic sequential workflows where Output A feeds directly into Input B.',
    icon: LinkIcon,
    bgGradient: 'from-blue-50/40 to-blue-50/20',
    borderColor: 'border-blue-200/70',
    iconBg: 'bg-blue-50 text-[#2563EB] border-blue-200',
    textColor: 'text-slate-900',
  },
  {
    level: 'L3',
    badge: 'LEVEL 3',
    title: 'Level 3: Agents',
    subtitle: 'Dynamic Loops',
    description: 'Autonomous reasoning loops selecting tools, checking feedback, and self-correcting.',
    icon: Cpu,
    bgGradient: 'from-orange-50/40 to-orange-50/20',
    borderColor: 'border-orange-200/70',
    iconBg: 'bg-orange-50 text-[#FF5722] border-orange-200',
    textColor: 'text-slate-900',
  },
  {
    level: 'L4',
    badge: 'LEVEL 4',
    title: 'Level 4: AI Systems',
    subtitle: 'Multi-Agent Teams',
    description: 'Scaled enterprise ecosystems with multi-agent orchestration, shared memory, and HITL.',
    icon: Network,
    bgGradient: 'from-emerald-50/40 to-teal-50/20',
    borderColor: 'border-emerald-200/70',
    iconBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    textColor: 'text-slate-900',
  },
];

export const AutomationStepper: React.FC = () => {
  return (
    <div className="my-6 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#0F172A] text-white flex items-center justify-center shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#FF5722]" />
          </div>
          <div>
            <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-900">
              The 4 Levels of AI Automation
            </h4>
            <p className="text-[11px] text-slate-500 font-medium">
              From raw prompts to autonomous multi-agent networks
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full bg-orange-50 text-[#FF5722] border border-orange-200 font-mono text-[10px] font-bold uppercase tracking-wider">
          INFOGRAPHIC
        </span>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative">
        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isLast = idx === STEPS.length - 1;

          return (
            <div key={step.level} className="relative flex flex-col">
              <motion.div
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className={`h-full p-4 rounded-xl border bg-gradient-to-br ${step.bgGradient} ${step.borderColor} shadow-sm hover:shadow-md transition-shadow relative z-10 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-extrabold tracking-wider uppercase bg-white border border-slate-200/80 text-slate-700 shadow-sm">
                      {step.badge}
                    </span>
                    <div className={`w-8 h-8 rounded-lg border flex items-center justify-center ${step.iconBg} shadow-sm`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="mb-2">
                    <h5 className={`text-sm sm:text-base font-extrabold tracking-tight ${step.textColor}`}>
                      {step.title}
                    </h5>
                    <p className="text-xs font-semibold text-slate-500 mt-0.5">
                      {step.subtitle}
                    </p>
                  </div>

                  <p className="text-[11px] leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>Complexity</span>
                  <span className="font-bold text-slate-700">{'\u25cf'.repeat(idx + 1)}{'\u25cb'.repeat(3 - idx)}</span>
                </div>
              </motion.div>

              {!isLast && (
                <div className="hidden lg:flex absolute -right-2 top-1/2 -translate-y-1/2 z-20 w-4 h-4 rounded-full bg-white border border-slate-300 items-center justify-center shadow-sm text-slate-400">
                  <ArrowRight className="w-2.5 h-2.5 stroke-[2.5]" />
                </div>
              )}

              {!isLast && (
                <div className="flex lg:hidden justify-center my-1 text-slate-300">
                  <ArrowDown className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
