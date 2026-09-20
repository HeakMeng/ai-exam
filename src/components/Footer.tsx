import React from 'react';
import { ArrowUp, Terminal } from 'lucide-react';

interface FooterProps {
  isSidebarCollapsed?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isSidebarCollapsed = false }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className={`mt-16 border-t border-slate-200/80 bg-white py-6 px-4 sm:px-8 lg:px-12 transition-all duration-200 ${
        !isSidebarCollapsed ? 'md:pl-72 lg:pl-80' : 'md:pl-8'
      }`}
    >
      <div className="w-full max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-500">
        <div className="flex items-center gap-2.5 flex-wrap">
          <Terminal className="w-4 h-4 text-[#FF5722]" />
          <span className="font-bold text-slate-900 tracking-wider uppercase">AI Engineering Knowledge Base</span>
          <span className="text-slate-300">•</span>
          <span className="font-medium text-slate-600">Complete Curriculum & Architecture</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-slate-400 font-medium hidden sm:inline">
            Interactive Technical Documentation
          </span>
          <button
            onClick={scrollToTop}
            className="w-9 h-9 rounded-full border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 transition-all flex items-center justify-center cursor-pointer shadow-2xs"
            title="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
