import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono, Kantumruy_Pro } from 'next/font/google';
import 'katex/dist/katex.min.css';
import 'sileo/styles.css';
import './globals.css';
import { Toaster } from 'sileo';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const kantumruyPro = Kantumruy_Pro({
  subsets: ['khmer', 'latin'],
  variable: '--font-kantumruy-pro',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AI Engineering — Exam Prep Portal',
  description: 'Master RAG Architecture, Autonomous Agents, Workflow Engineering, and Advanced Retrieval Systems.',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${kantumruyPro.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <body className="bg-[#F8FAFC] text-slate-900 font-sans antialiased selection:bg-[#FF5722] selection:text-white">
        <Toaster
          position="top-right"
          offset={{ top: 76, right: 24 }}
          options={{
            fill: '#0F172A',
            roundness: 18,
          }}
        />
        {children}
      </body>
    </html>
  );
}
