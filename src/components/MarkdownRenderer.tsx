'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { CodeBlock } from './CodeBlock';
import { AutomationStepper } from './AutomationStepper';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const segments = content.split(/(\<AutomationStepper\s*\/?\>)/gi);

  return (
    <div className="prose prose-slate max-w-none text-slate-700 text-base sm:text-[17px] leading-relaxed">
      {segments.map((segment, index) => {
        if (/\<AutomationStepper\s*\/?\>/i.test(segment)) {
          return <AutomationStepper key={`stepper-${index}`} />;
        }
        if (!segment.trim()) {
          return null;
        }
        return (
          <ReactMarkdown
            key={`md-${index}`}
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
            components={{
              pre({ children }) {
                return <>{children}</>;
              },
              code({ className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                const rawCode = String(children);
                const isMultiline = rawCode.includes('\n');
                const isBlock = Boolean(match || isMultiline);

                if (isBlock) {
                  const lang = match ? match[1] : 'text';
                  return (
                    <CodeBlock
                      code={rawCode.replace(/\n$/, '')}
                      language={lang}
                    />
                  );
                }

                return (
                  <code
                    className="px-2 py-0.5 mx-0.5 rounded-md bg-slate-100 text-[#0F172A] font-mono text-sm sm:text-[14.5px] font-semibold border border-slate-200/90"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              h1({ children }) {
                return (
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-8 mb-4 tracking-tight">
                    {children}
                  </h1>
                );
              },
              h2({ children }) {
                return (
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 mt-8 mb-4 tracking-tight flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-[#FF5722] inline-block shrink-0" />
                    <span>{children}</span>
                  </h2>
                );
              },
              h3({ children }) {
                return (
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 mt-6 mb-3 tracking-tight flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5722]/80 inline-block shrink-0" />
                    <span>{children}</span>
                  </h3>
                );
              },
              h4({ children }) {
                return (
                  <h4 className="text-base sm:text-lg lg:text-xl font-bold text-slate-800 mt-5 mb-2.5 tracking-tight">
                    {children}
                  </h4>
                );
              },
              p({ children }) {
                return <p className="mb-4 text-slate-700 leading-relaxed">{children}</p>;
              },
              ul({ children }) {
                return <ul className="list-disc list-outside pl-6 mb-4 space-y-2 text-slate-700">{children}</ul>;
              },
              ol({ children }) {
                return <ol className="list-decimal list-outside pl-6 mb-4 space-y-2 text-slate-700">{children}</ol>;
              },
              li({ children }) {
                return <li className="leading-relaxed">{children}</li>;
              },
              blockquote({ children }) {
                return (
                  <blockquote className="my-5 pl-5 py-3.5 border-l-4 border-[#FF5722] bg-orange-50/40 rounded-r-2xl text-slate-800 text-base sm:text-[17px] font-medium italic">
                    {children}
                  </blockquote>
                );
              },
              table({ children }) {
                return (
                  <div className="overflow-x-auto my-6 rounded-2xl border border-slate-200 shadow-xs bg-white">
                    <table className="w-full text-sm sm:text-base text-left text-slate-700 border-collapse">
                      {children}
                    </table>
                  </div>
                );
              },
              thead({ children }) {
                return <thead className="bg-[#0F172A] text-white">{children}</thead>;
              },
              th({ children }) {
                return (
                  <th className="px-5 py-3.5 font-bold font-mono text-xs sm:text-sm text-white uppercase tracking-wider">
                    {children}
                  </th>
                );
              },
              tbody({ children }) {
                return <tbody className="divide-y divide-slate-100 bg-white">{children}</tbody>;
              },
              td({ children }) {
                return <td className="px-5 py-3.5 text-slate-700">{children}</td>;
              },
              hr() {
                return <hr className="my-6 border-slate-200" />;
              },
              strong({ children }) {
                return <strong className="font-bold text-slate-900">{children}</strong>;
              },
            }}
          >
            {segment}
          </ReactMarkdown>
        );
      })}
    </div>
  );
};
