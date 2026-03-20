/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mascot: {
          50: 'var(--color-mascot-50)',
          100: 'var(--color-mascot-100)',
          200: 'var(--color-mascot-200)',
          300: 'var(--color-mascot-300)',
          400: 'var(--color-mascot-400)',
          500: 'var(--color-mascot-500)',
          600: 'var(--color-mascot-600)',
          700: 'var(--color-mascot-700)',
        },
        // 保留 primary 作为 mascot 的别名，便于迁移
        primary: {
          50: 'var(--color-mascot-50)',
          100: 'var(--color-mascot-100)',
          200: 'var(--color-mascot-200)',
          300: 'var(--color-mascot-300)',
          400: 'var(--color-mascot-400)',
          500: 'var(--color-mascot-500)',
          600: 'var(--color-mascot-600)',
          700: 'var(--color-mascot-700)',
        },
        success: '#22C55E',
        warning: '#F97316',
        pink: '#F472B6',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
