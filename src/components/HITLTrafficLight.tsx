'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  XOctagon,
  RotateCcw,
  Eye,
  Lock,
} from 'lucide-react';

interface GatingTier {
  id: 'green' | 'yellow' | 'red';
  label: string;
  badge: string;
  riskLevel: string;
  color: string;
  bgColor: string;
  borderColor: string;
  iconBg: string;
  description: string;
  actionPolicy: string;
  examples: string[];
  reversibility: string;
  blastRadius: string;
}

const TIERS: GatingTier[] = [
  {
    id: 'green',
    label: 'Green Tier',
    badge: 'LOW RISK // AUTONOMOUS',
    riskLevel: 'Low Risk',
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-50/50',
    borderColor: 'border-emerald-200',
    iconBg: 'bg-emerald-100 text-emerald-700',
    description: 'Read-only queries, calculations, and local lookups that mutate zero state.',
    actionPolicy: 'Execute autonomously with standard background logging. No human approval needed.',
    examples: ['check_stock(sku)', 'search_knowledge_base(query)', 'get_shipping_rates(zip)'],
    reversibility: 'High (No state changes)',
    blastRadius: 'Zero (Read-only)',
  },
  {
    id: 'yellow',
    label: 'Yellow Tier',
    badge: 'MODERATE RISK // MONITORED',
    riskLevel: 'Moderate Risk',
    color: 'text-amber-700',
    bgColor: 'bg-amber-50/50',
    borderColor: 'border-amber-200',
    iconBg: 'bg-amber-100 text-amber-700',
    description: 'Reversible mutations, draft creation, and non-destructive intermediate actions.',
    actionPolicy: 'Execute automatically, but emit real-time audit notifications with a compensating rollback action.',
    examples: ['update_cart_quantity(qty)', 'archive_draft_report(id)', 'send_internal_slack_alert(msg)'],
    reversibility: 'Moderate (Can be undone)',
    blastRadius: 'Contained to single user',
  },
  {
    id: 'red',
    label: 'Red Tier',
    badge: 'HIGH RISK // GATED',
    riskLevel: 'High Risk / Critical',
    color: 'text-red-700',
    bgColor: 'bg-red-50/50',
    borderColor: 'border-red-200',
    iconBg: 'bg-red-100 text-red-700',
    description: 'Financial transactions, irreversible data deletion, infrastructure mutation, and privilege escalation.',
    actionPolicy: 'STRICT STOP: Pause graph state, persist to checkpointer, and require authorized human approval.',
    examples: ['execute_wire_transfer(amount, to)', 'delete_customer_database()', 'publish_public_blog_post()'],
    reversibility: 'Zero (Irreversible)',
    blastRadius: 'Catastrophic if wrong',
  },
];

export const HITLTrafficLight: React.FC = () => {
  const [selectedTierId, setSelectedTierId] = useState<'green' | 'yellow' | 'red'>('red');
  const activeTier = TIERS.find((t) => t.id === selectedTierId) || TIERS[2];

  return (
    <div className="my-8 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm not-prose">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100 flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#0F172A] text-white flex items-center justify-center shadow-sm">
            <ShieldAlert className="w-4 h-4 text-[#FF5722]" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold font-mono uppercase tracking-wider text-slate-900">
              Action Gating: The Traffic Light Model
            </h4>
            <p className="text-xs text-slate-500 font-medium">
              Categorizing agent actions by Reversibility × Impact
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 font-mono text-[11px] font-bold uppercase tracking-wider">
          GOVERNANCE MATRIX
        </span>
      </div>

      {/* Traffic Light Selection Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        {TIERS.map((t) => {
          const isSelected = t.id === selectedTierId;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setSelectedTierId(t.id)}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                isSelected
                  ? `${t.bgColor} ${t.borderColor} ring-2 ring-[#FF5722]/30 shadow-xs`
                  : 'bg-slate-50/60 border-slate-200/70 hover:bg-slate-100/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-3.5 h-3.5 rounded-full shrink-0 ${
                    t.id === 'green'
                      ? 'bg-emerald-500 shadow-xs shadow-emerald-500/50'
                      : t.id === 'yellow'
                      ? 'bg-amber-500 shadow-xs shadow-amber-500/50'
                      : 'bg-red-500 shadow-xs shadow-red-500/50 animate-pulse'
                  }`}
                />
                <div>
                  <h5 className="text-xs font-black text-slate-900 uppercase font-mono">
                    {t.label}
                  </h5>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {t.riskLevel}
                  </p>
                </div>
              </div>
              <span className={`text-xs font-mono font-bold ${t.color}`}>
                {isSelected ? '● ACTIVE' : '○ VIEW'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tier Details Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTier.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.16 }}
          className={`p-5 rounded-xl border ${activeTier.bgColor} ${activeTier.borderColor}`}
        >
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <span className={`px-2.5 py-0.5 rounded-full font-mono text-xs font-bold uppercase ${
              activeTier.id === 'green'
                ? 'bg-emerald-600 text-white'
                : activeTier.id === 'yellow'
                ? 'bg-amber-600 text-white'
                : 'bg-red-600 text-white'
            }`}>
              {activeTier.badge}
            </span>
            <div className="flex items-center gap-3 text-xs font-mono text-slate-600 font-semibold">
              <span>Reversibility: <strong>{activeTier.reversibility}</strong></span>
              <span>•</span>
              <span>Blast Radius: <strong>{activeTier.blastRadius}</strong></span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 font-medium mb-3 leading-relaxed">
            {activeTier.description}
          </p>

          <div className="p-3 rounded-lg bg-white/90 border border-slate-200/80 mb-3">
            <span className="text-[11px] font-mono font-bold uppercase text-slate-500 block mb-1">
              Execution Policy
            </span>
            <p className="text-xs font-bold text-slate-900 leading-snug">
              {activeTier.actionPolicy}
            </p>
          </div>

          <div>
            <span className="text-[11px] font-mono font-bold uppercase text-slate-500 block mb-1.5">
              Production Examples
            </span>
            <div className="flex flex-wrap gap-2">
              {activeTier.examples.map((ex, i) => (
                <code
                  key={i}
                  className="px-2.5 py-1 rounded-md bg-white text-slate-800 font-mono text-xs font-semibold border border-slate-200 shadow-xs"
                >
                  {ex}
                </code>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
