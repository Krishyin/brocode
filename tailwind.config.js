/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dev: {
          bg: "#06090e",
          surface: "#0c121d",
          panel: "#121a29",
          elevated: "#182236",
          border: "#202d45",
          borderLight: "#2c3e5e",
          textMuted: "#6b7d99",
          textDim: "#94a3b8",
          textMain: "#e2e8f0",
          textBright: "#f8fafc",
          amber: {
            DEFAULT: "#d97706",
            light: "#f59e0b",
            glow: "rgba(245, 158, 11, 0.15)",
          },
          green: {
            DEFAULT: "#059669",
            light: "#10b981",
            glow: "rgba(16, 185, 129, 0.15)",
          },
          red: {
            DEFAULT: "#dc2626",
            light: "#ef4444",
            glow: "rgba(239, 68, 68, 0.15)",
          },
          blue: {
            DEFAULT: "#2563eb",
            light: "#38bdf8",
            glow: "rgba(56, 189, 248, 0.15)",
          }
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'Menlo', 'Monaco', 'Consolas', '"Courier New"', 'monospace'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'Cambria', '"Times New Roman"', 'serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-slow': 'fadeIn 1.8s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
