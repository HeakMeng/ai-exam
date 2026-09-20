/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'var(--font-space-grotesk)',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Kantumruy Pro"',
          'sans-serif',
        ],
        mono: [
          'var(--font-jetbrains-mono)',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
      colors: {
        brand: {
          orange: '#FF5722',
          'orange-hover': '#FF6B2C',
          blue: '#2563EB',
          dark: '#0F172A',
          canvas: '#F8FAFC',
          surface: '#FFFFFF',
        },
      },
    },
  },
  plugins: [],
}
