/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        rose: {
          25: '#FFF7F8',
          50: '#FFF1F3',
          100: '#FFE4E8',
          200: '#FECDD6',
          300: '#FDA4C0',
          400: '#FC6F94',
          500: '#F43F6E',
          600: '#E01E5B',
          700: '#B80B47',
          800: '#8C0938',
          900: '#5C0625',
        },
        lavender: {
          50: '#F6F4FF',
          100: '#EEE9FF',
          200: '#Dfd8FF',
          300: '#C9B8FF',
          400: '#B197FF',
          500: '#9B6FFF',
          600: '#7C4DFF',
          700: '#6B35F5',
          800: '#5A27E0',
          900: '#3D18A8',
        },
        ink: {
          50: '#F8F9FB',
          100: '#F1F3F7',
          200: '#E3E7EF',
          300: '#CCD3DF',
          400: '#A8B0C2',
          500: '#7C8499',
          600: '#5A6275',
          700: '#3D4456',
          800: '#232A3A',
          900: '#15192A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(35, 42, 58, 0.04), 0 1px 3px rgba(35, 42, 58, 0.03)',
        'card': '0 4px 24px rgba(35, 42, 58, 0.06), 0 1px 4px rgba(35, 42, 58, 0.04)',
        'card-lg': '0 12px 40px rgba(35, 42, 58, 0.08), 0 4px 12px rgba(35, 42, 58, 0.04)',
        'glow-rose': '0 0 0 1px rgba(244, 63, 110, 0.08), 0 8px 24px rgba(244, 63, 110, 0.12)',
        'glow-lavender': '0 0 0 1px rgba(155, 111, 255, 0.08), 0 8px 24px rgba(155, 111, 255, 0.12)',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-scale': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in-right': {
          from: { opacity: '0', transform: 'translateX(24px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-left': {
          from: { opacity: '0', transform: 'translateX(-24px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.6' },
          '100%': { transform: 'scale(1.4)', opacity: '0' },
        },
        'draw-line': {
          from: { strokeDashoffset: '1000' },
          to: { strokeDashoffset: '0' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-3px)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'fade-in-scale': 'fade-in-scale 0.4s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.4s ease-out forwards',
        'slide-in-left': 'slide-in-left 0.4s ease-out forwards',
        'float': 'float 4s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2s ease-out infinite',
        'draw-line': 'draw-line 1.5s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
