'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Binary,
  Search,
  FileCode,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Database,
} from 'lucide-react';

interface StageInfo {
  id: string;
  stepNumber: string;
  title: string;
  shortDesc: string;
  phase: 'Offline Indexing' | 'Online Inference';
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  borderColor: string;
  details: {
    whatItDoes: string;
    keyTools: string;
    examAxiom: string;
  };
}

const STAGES: StageInfo[] = [
  {
    id: 'ingest',
    stepNumber: '01',
    title: 'Document Ingestion',
    shortDesc: 'Parse heterogeneous PDFs, HTML, & Markdown',
    phase: 'Offline Indexing',
    icon: FileText,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50/60',
    borderColor: 'border-blue-200',
    details: {
      whatItDoes: 'Loads raw enterprise files, cleans noise, extracts text, and preserves structural metadata (source, page, author).',
      keyTools: 'pdfplumber, PyPDF, Unstructured, trafilatura',
      examAxiom: 'Content Hash Verification (SHA-256) skips 95%+ of unchanged documents, saving massive compute costs.',
    },
  },
  {
    id: 'index',
    stepNumber: '02',
    title: 'Chunk & Embed',
    shortDesc: 'Split into passages & vectorize',
    phase: 'Offline Indexing',
    icon: Binary,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50/60',
    borderColor: 'border-indigo-200',
    details: {
      whatItDoes: 'Splits text into 300–500 token chunks with 10–20% overlap, passes chunks through a bi-encoder embedding model, and indexes vectors.',
      keyTools: 'RecursiveCharacterTextSplitter, BGE, Sentence Transformers, Qdrant HNSW',
      examAxiom: 'Chunk overlap preserves semantic meaning for sentences bisected across cut boundaries.',
    },
  },
  {
    id: 'search',
    stepNumber: '03',
    title: 'Vector Search',
    shortDesc: 'Query similarity search for Top-k chunks',
    phase: 'Online Inference',
    icon: Search,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50/60',
    borderColor: 'border-amber-200',
    details: {
      whatItDoes: 'Embeds the user query, traverses the vector index using Approximate Nearest Neighbor (ANN), and retrieves Top-k candidate chunks.',
      keyTools: 'Cosine Similarity, Dot Product, HNSW Graph Search',
      examAxiom: 'Fixed Top-k without a similarity threshold cutoff forces irrelevant documents into prompts on off-topic questions.',
    },
  },
  {
    id: 'augment',
    stepNumber: '04',
    title: 'Prompt Augmentation',
    shortDesc: 'Inject evidence inside XML safety tags',
    phase: 'Online Inference',
    icon: FileCode,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50/60',
    borderColor: 'border-orange-200',
    details: {
      whatItDoes: 'Formats retrieved passages and places them into the prompt enclosed by explicit boundary tags like <context>...</context>.',
      keyTools: 'Prompt Templates, XML Delimiters, Lost-in-the-Middle Placement',
      examAxiom: 'Place the most critical reference facts at the extreme beginning or end of context to avoid the Lost-in-the-Middle dip.',
    },
  },
  {
    id: 'generate',
    stepNumber: '05',
    title: 'Grounded Generation',
    shortDesc: 'LLM synthesizes answer with source citations',
    phase: 'Online Inference',
    icon: Sparkles,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50/60',
    borderColor: 'border-emerald-200',
    details: {
      whatItDoes: 'The model reads injected context and synthesizes a concise, truthful answer strictly backed by the cited document sources.',
      keyTools: 'GPT-4o, Claude 3.5 Sonnet, Llama 3, RAGAS Evaluation',
      examAxiom: 'Enforce strict refusal: if evidence is missing, state "I do not have enough information" rather than guessing.',
    },
  },
];

export const RAGPipelineFlow: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<string>('ingest');
  const activeStage = STAGES.find((s) => s.id === activeStageId) || STAGES[0];

  return (
    <div className="my-8 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm not-prose">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100 flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#0F172A] text-white flex items-center justify-center shadow-sm">
            <Database className="w-4 h-4 text-[#FF5722]" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold font-mono uppercase tracking-wider text-slate-900">
              Interactive RAG Pipeline Flow
            </h4>
            <p className="text-xs text-slate-500 font-medium">
              Click any stage below to inspect its operational role and exam rules
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200 font-mono text-[11px] font-bold uppercase tracking-wider">
          5-STAGE LIFECYCLE
        </span>
      </div>

      {/* Stage Flow Stepper Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 mb-5">
        {STAGES.map((s) => {
          const isSelected = s.id === activeStageId;
          const Icon = s.icon;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveStageId(s.id)}
              className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? `${s.bgColor} ${s.borderColor} shadow-xs ring-2 ring-[#FF5722]/30`
                  : 'bg-slate-50/60 border-slate-200/70 hover:bg-slate-100/70'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[11px] font-bold text-slate-400">
                  {s.stepNumber}
                </span>
                <span
                  className={`text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded ${
                    s.phase === 'Offline Indexing'
                      ? 'bg-slate-200/80 text-slate-700'
                      : 'bg-orange-100 text-[#FF5722]'
                  }`}
                >
                  {s.phase === 'Offline Indexing' ? 'Offline' : 'Online'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-md flex items-center justify-center ${
                    isSelected ? 'bg-white shadow-xs' : 'bg-slate-200/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${s.color}`} />
                </div>
                <span className="text-xs font-bold text-slate-900 leading-tight">
                  {s.title}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Stage Detail Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStage.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          className={`p-4 sm:p-5 rounded-xl border ${activeStage.bgColor} ${activeStage.borderColor}`}
        >
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#0F172A] text-white font-mono text-xs font-bold">
                STAGE {activeStage.stepNumber}
              </span>
              <h5 className="text-base font-bold text-slate-900">
                {activeStage.title}
              </h5>
            </div>
            <span className="text-xs font-mono font-bold text-slate-600 bg-white/80 px-2.5 py-1 rounded-md border border-slate-200">
              Phase: {activeStage.phase}
            </span>
          </div>

          <p className="text-sm text-slate-700 font-medium mb-4 leading-relaxed">
            {activeStage.details.whatItDoes}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-slate-200/60">
            <div className="bg-white/90 p-3 rounded-lg border border-slate-200/80">
              <div className="flex items-center gap-1.5 mb-1 text-slate-500 font-mono text-[11px] font-bold uppercase">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Primary Tools & Standards</span>
              </div>
              <p className="text-xs font-mono font-semibold text-slate-800">
                {activeStage.details.keyTools}
              </p>
            </div>

            <div className="bg-white/90 p-3 rounded-lg border border-slate-200/80">
              <div className="flex items-center gap-1.5 mb-1 text-[#FF5722] font-mono text-[11px] font-bold uppercase">
                <AlertCircle className="w-3.5 h-3.5 text-[#FF5722]" />
                <span>Critical Exam Rule</span>
              </div>
              <p className="text-xs font-medium text-slate-800 leading-snug">
                {activeStage.details.examAxiom}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
