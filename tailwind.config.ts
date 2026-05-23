import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
        // Foundation — deep void → softened black
        ink: {
          950: '#05030C',
          900: '#0A0714',
          850: '#0F0B1E',
          800: '#15102A',
          700: '#1C1638',
          600: '#241C46',
        },
        // Primary — FormAI violet
        violet: {
          50: '#F4F0FF',
          100: '#E7DCFF',
          200: '#CCB5FF',
          300: '#A98AFF',
          400: '#8B66FF',
          500: '#7C5CFF', // brand
          600: '#6843E8',
          700: '#5230C2',
          800: '#3E2399',
          900: '#291663',
        },
        // Accent — pose-detection lime
        lime: {
          400: '#D6FF3D',
          500: '#C8FF00', // pose markers
          600: '#A4D900',
        },
        // Streak — fire orange
        ember: {
          400: '#FFA552',
          500: '#FF7A1A',
          600: '#E55F00',
        },
        // Scanner — cyan
        scan: {
          400: '#5FE3FF',
          500: '#1FCFFF',
          600: '#0AA3D6',
        },
        // Nutrition macros
        macro: {
          carb: '#FF3D8E',
          fat: '#E0FF1A',
          protein: '#1FCFFF',
        },
      },
      boxShadow: {
        // Glow hierarchy
        'glow-subtle': '0 0 24px -4px rgba(124, 92, 255, 0.25)',
        'glow-medium': '0 0 40px -2px rgba(124, 92, 255, 0.45), 0 0 80px -8px rgba(124, 92, 255, 0.2)',
        'glow-focal': '0 0 60px -2px rgba(124, 92, 255, 0.7), 0 0 120px -10px rgba(124, 92, 255, 0.35)',
        'glow-lime': '0 0 32px -4px rgba(200, 255, 0, 0.5)',
        'glow-ember': '0 0 32px -4px rgba(255, 122, 26, 0.55)',
        'glow-scan': '0 0 32px -4px rgba(31, 207, 255, 0.5)',
        'panel': '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 0 0 1px rgba(255,255,255,0.05)',
        'panel-strong': '0 1px 0 0 rgba(255,255,255,0.06) inset, 0 0 0 1px rgba(255,255,255,0.08)',
      },
      backgroundImage: {
        'grid-violet': "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'><path d='M40 0H0v40' fill='none' stroke='rgba(124,92,255,0.07)' stroke-width='1'/></svg>\")",
        'radial-violet': 'radial-gradient(circle at 50% 0%, rgba(124,92,255,0.35), transparent 60%)',
        'radial-focal': 'radial-gradient(circle at 50% 50%, rgba(124,92,255,0.5), transparent 65%)',
        'gradient-hero': 'linear-gradient(180deg, #05030C 0%, #0A0714 40%, #150A2B 100%)',
        'gradient-violet': 'linear-gradient(135deg, #7C5CFF 0%, #5230C2 100%)',
        'gradient-text': 'linear-gradient(180deg, #FFFFFF 0%, #C9B8FF 100%)',
        'gradient-accent-text': 'linear-gradient(120deg, #FFFFFF 0%, #A98AFF 45%, #5FE3FF 100%)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      fontSize: {
        'display-2xl': ['clamp(3rem, 7vw, 6.5rem)', { lineHeight: '0.95', letterSpacing: '-0.04em', fontWeight: '700' }],
        'display-xl': ['clamp(2.5rem, 5.5vw, 5rem)', { lineHeight: '1.02', letterSpacing: '-0.035em', fontWeight: '700' }],
        'display-lg': ['clamp(2rem, 4vw, 3.75rem)', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '700' }],
        'display-md': ['clamp(1.75rem, 3vw, 2.75rem)', { lineHeight: '1.1', letterSpacing: '-0.025em', fontWeight: '600' }],
      },
      animation: {
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fadeIn 1s ease-out both',
        'pulse-glow': 'pulseGlow 3.5s ease-in-out infinite',
        'scan': 'scan 4s ease-in-out infinite',
        'float': 'float 8s ease-in-out infinite',
        'gradient-shift': 'gradientShift 12s ease infinite',
        'orbit': 'orbit 18s linear infinite',
        'ticker': 'ticker 28s linear infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
        scan: {
          '0%, 100%': { transform: 'translateY(-100%)', opacity: '0' },
          '50%': { transform: 'translateY(100%)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(0.5deg)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        orbit: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        ticker: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-back': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
