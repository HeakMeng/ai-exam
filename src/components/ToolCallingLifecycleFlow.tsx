'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  Server,
  Code2,
  CheckCircle2,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Terminal,
} from 'lucide-react';

interface StepInfo {
  step: number;
  owner: 'Inside the Model' | 'Inside the Host Application';
  title: string;
  summary: string;
  wirePayload: string;
  examTakeaway: string;
}

const LIFECYCLE_STEPS: StepInfo[] = [
  {
    step: 1,
    owner: 'Inside the Model',
    title: 'Step 1: User Request Ingestion',
    summary: 'The user prompt arrives at the model along with tool definitions formatted as JSON Schema contracts.',
    wirePayload: 'User: "What is the inventory for SKU-409 in Tokyo?"\nTools Provided: [check_inventory(sku, warehouse)]',
    examTakeaway: 'The model receives tool schemas as part of system prompt context before generating any tokens.',
  },
  {
    step: 2,
    owner: 'Inside the Model',
    title: 'Step 2: Model Evaluates & Decides',
    summary: 'The model determines it cannot fulfill the request using frozen weights alone and decides to call an external tool.',
    wirePayload: 'Model Thought: "I do not have live stock data in my weights. check_inventory is required."',
    examTakeaway: 'The model decides whether to call a tool, but it never executes the tool directly.',
  },
  {
    step: 3,
    owner: 'Inside the Model',
    title: 'Step 3: Structured Tool Call Emitted',
    summary: 'The model halts conversational text generation and emits a structured function call payload with role="assistant".',
    wirePayload: '{\n  "role": "assistant",\n  "content": null,\n  "tool_calls": [{\n    "id": "call_123",\n    "function": {\n      "name": "check_inventory",\n      "arguments": "{\\"sku\\": \\"SKU-409\\", \\"warehouse\\": \\"Tokyo\\"}"\n    }\n  }]\n}',
    examTakeaway: 'Wire format: content is null/empty, role is assistant, and arguments is a serialized JSON string.',
  },
  {
    step: 4,
    owner: 'Inside the Host Application',
    title: 'Step 4: Intercept & Validate',
    summary: 'The host application intercepts the payload before execution, validating against the allowlist and Pydantic schema.',
    wirePayload: '1. Check Allowlist: "check_inventory" in TOOL_ALLOWLIST -> PASS\n2. Schema Validation: Pydantic validate(sku="SKU-409", warehouse="Tokyo") -> PASS',
    examTakeaway: 'Schema validation verifies structural types; business validation verifies domain rules before code runs.',
  },
  {
    step: 5,
    owner: 'Inside the Host Application',
    title: 'Step 5: Native Code Execution',
    summary: 'The application executes the underlying native code (SQL query, REST API call, or local Python function).',
    wirePayload: 'Executing: db.execute("SELECT stock FROM inventory WHERE sku=\\"SKU-409\\" AND warehouse=\\"Tokyo\\"")\\nResult: 14 units available',
    examTakeaway: 'The Cardinal Rule: The model requests the action; the application executes it.',
  },
  {
    step: 6,
    owner: 'Inside the Host Application',
    title: 'Step 6: Return ToolMessage',
    summary: 'The application packages the result into a ToolMessage matching tool_call_id and injects it back to the model.',
    wirePayload: '{\n  "role": "tool",\n  "tool_call_id": "call_123",\n  "content": "{\\"sku\\": \\"SKU-409\\", \\"stock\\": 14, \\"status\\": \\"in_stock\\"}"\n}',
    examTakeaway: 'The model consumes this ToolMessage to synthesize the final grounded answer with live factual data.',
  },
];

export const ToolCallingLifecycleFlow: React.FC = () => {
  const [activeStepNum, setActiveStepNum] = useState<number>(3);
  const activeStep = LIFECYCLE_STEPS.find((s) => s.step === activeStepNum) || LIFECYCLE_STEPS[2];

  return (
    <div className="my-8 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm not-prose">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100 flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#0F172A] text-white flex items-center justify-center shadow-sm">
            <Code2 className="w-4 h-4 text-[#FF5722]" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold font-mono uppercase tracking-wider text-slate-900">
              Tool Calling Lifecycle & Ownership
            </h4>
            <p className="text-xs text-slate-500 font-medium">
              The 6 steps split between the Model and the Host Application
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2563EB] font-mono text-[10px] font-bold">
            <Cpu className="w-3 h-3" /> Model (Steps 1-3)
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-50 text-[#FF5722] font-mono text-[10px] font-bold">
            <Server className="w-3 h-3" /> App (Steps 4-6)
          </span>
        </div>
      </div>

      {/* Step Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 mb-5">
        {LIFECYCLE_STEPS.map((s) => {
          const isSelected = s.step === activeStepNum;
          const isModelOwner = s.owner === 'Inside the Model';
          return (
            <button
              key={s.step}
              type="button"
              onClick={() => setActiveStepNum(s.step)}
              className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                isSelected
                  ? isModelOwner
                    ? 'bg-blue-50/90 border-blue-300 ring-2 ring-blue-500/20 shadow-xs'
                    : 'bg-orange-50/90 border-orange-300 ring-2 ring-[#FF5722]/20 shadow-xs'
                  : 'bg-slate-50/60 border-slate-200/70 hover:bg-slate-100/60'
              }`}
            >
              <span className="font-mono text-xs font-black text-slate-800">
                Step {s.step}
              </span>
              <span
                className={`text-[9px] font-mono font-bold uppercase mt-0.5 ${
                  isModelOwner ? 'text-blue-600' : 'text-[#FF5722]'
                }`}
              >
                {isModelOwner ? 'Model' : 'Application'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detail Inspector Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep.step}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.16 }}
          className={`p-5 rounded-xl border ${
            activeStep.owner === 'Inside the Model'
              ? 'bg-blue-50/40 border-blue-200/80'
              : 'bg-orange-50/40 border-orange-200/80'
          }`}
        >
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span
                className={`px-2.5 py-0.5 rounded-full text-white font-mono text-xs font-bold ${
                  activeStep.owner === 'Inside the Model' ? 'bg-blue-600' : 'bg-[#0F172A]'
                }`}
              >
                STEP {activeStep.step}
              </span>
              <h5 className="text-sm sm:text-base font-bold text-slate-900">
                {activeStep.title}
              </h5>
            </div>
            <span
              className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded border bg-white ${
                activeStep.owner === 'Inside the Model'
                  ? 'text-blue-700 border-blue-200'
                  : 'text-orange-700 border-orange-200'
              }`}
            >
              Owner: {activeStep.owner}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 font-medium mb-3 leading-relaxed">
            {activeStep.summary}
          </p>

          {/* Wire Payload Visualizer */}
          <div className="mb-3">
            <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase text-slate-500 mb-1">
              <Terminal className="w-3.5 h-3.5" />
              <span>Under-the-Hood Payload / Execution State</span>
            </div>
            <pre className="p-3 rounded-lg bg-[#0F172A] text-emerald-400 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
              <code>{activeStep.wirePayload}</code>
            </pre>
          </div>

          {/* Exam Takeaway */}
          <div className="p-2.5 rounded-lg bg-white/90 border border-slate-200/80 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">
                Exam Key Concept
              </span>
              <span className="text-xs font-medium text-slate-800">
                {activeStep.examTakeaway}
              </span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
