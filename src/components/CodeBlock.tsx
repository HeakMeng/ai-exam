import { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';
import { toast } from 'sonner';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

function highlightLine(line: string, lang: string): React.ReactNode {
  if (!line.trim()) return ' ';

  const pythonKw = /\b(def|class|import|from|return|if|elif|else|for|while|try|except|finally|with|as|yield|lambda|pass|break|continue|raise|in|not|and|or|is|None|True|False|self|async|await|print)\b/g;
  const jsKw = /\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|new|this|class|extends|import|export|from|default|async|await|typeof|instanceof|null|undefined|true|false|void|yield|of|in)\b/g;
  const sqlKw = /\b(SELECT|FROM|WHERE|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER|TABLE|INTO|VALUES|SET|JOIN|LEFT|RIGHT|INNER|OUTER|ON|AND|OR|NOT|NULL|AS|ORDER|BY|GROUP|HAVING|LIMIT|OFFSET|DISTINCT|UNION|INDEX|PRIMARY|KEY|FOREIGN|REFERENCES|CASCADE|EXISTS|IN|LIKE|BETWEEN|COUNT|SUM|AVG|MAX|MIN)\b/gi;

  const kwPattern = ['python', 'py'].includes(lang) ? pythonKw
    : ['javascript', 'js', 'jsx', 'typescript', 'ts', 'tsx'].includes(lang) ? jsKw
    : ['sql'].includes(lang) ? sqlKw
    : null;

  const tokens: { type: 'keyword' | 'string' | 'comment' | 'number' | 'decorator' | 'plain'; text: string }[] = [];
  let remaining = line;

  while (remaining.length > 0) {
    const commentMatch = remaining.match(/^(#.*|(\/\/.*)$)/);
    if (commentMatch) {
      tokens.push({ type: 'comment', text: commentMatch[0] });
      remaining = remaining.slice(commentMatch[0].length);
      continue;
    }

    const stringMatch = remaining.match(/^("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/);
    if (stringMatch) {
      tokens.push({ type: 'string', text: stringMatch[0] });
      remaining = remaining.slice(stringMatch[0].length);
      continue;
    }

    const decoratorMatch = remaining.match(/^@\w+/);
    if (decoratorMatch && ['python', 'py'].includes(lang)) {
      tokens.push({ type: 'decorator', text: decoratorMatch[0] });
      remaining = remaining.slice(decoratorMatch[0].length);
      continue;
    }

    const numberMatch = remaining.match(/^\b\d+(\.\d+)?\b/);
    if (numberMatch) {
      tokens.push({ type: 'number', text: numberMatch[0] });
      remaining = remaining.slice(numberMatch[0].length);
      continue;
    }

    if (kwPattern) {
      kwPattern.lastIndex = 0;
      const kwMatch = remaining.match(new RegExp(`^(${kwPattern.source})(?![\\w])`, kwPattern.flags.replace('g', '')));
      if (kwMatch) {
        tokens.push({ type: 'keyword', text: kwMatch[0] });
        remaining = remaining.slice(kwMatch[0].length);
        continue;
      }
    }

    tokens.push({ type: 'plain', text: remaining[0] });
    remaining = remaining.slice(1);
  }

  const merged: typeof tokens = [];
  for (const t of tokens) {
    if (t.type === 'plain' && merged.length > 0 && merged[merged.length - 1].type === 'plain') {
      merged[merged.length - 1].text += t.text;
    } else {
      merged.push({ ...t });
    }
  }

  const colorMap: Record<string, string> = {
    keyword: 'text-[#0F172A] font-bold',
    string: 'text-[#FF5722]',
    comment: 'text-slate-400 italic',
    number: 'text-[#c2410c] font-medium',
    decorator: 'text-[#FF5722] font-semibold',
    plain: 'text-slate-800',
  };

  return (
    <>
      {merged.map((tok, i) => (
        <span key={i} className={colorMap[tok.type]}>{tok.text}</span>
      ))}
    </>
  );
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'python', filename }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success('Code copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split('\n');

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-200/90 bg-[#F8FAFC] text-slate-800 shadow-sm my-4 font-mono text-[14px] sm:text-[15px]">
      {/* Header — Dark Navy */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0F172A] text-white">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/90" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/90" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/90" />
          </div>
          <span className="text-xs sm:text-[13px] font-semibold text-white/80 ml-1.5 flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-[#FF5722]" />
            {filename || language.toUpperCase()}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white transition-colors text-xs font-semibold cursor-pointer"
          title="Copy code"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {/* Code Body — Light */}
      <div className="p-4 sm:p-5 overflow-x-auto leading-relaxed">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-slate-100/60">
                <td className="pr-4 text-right select-none text-slate-400 text-xs sm:text-[13px] w-10 align-top py-0.5">
                  {idx + 1}
                </td>
                <td className="whitespace-pre py-0.5">
                  {highlightLine(line, language)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
