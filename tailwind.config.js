/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cb: {
          purple: '#8B5CF6',
          'purple-dark': '#6D28D9',
          'purple-deep': '#4C1D95',
          'white-soft': '#F8F8FA',
          white: '#FFFFFF',
          'gray-light': '#E7E7EB',
          gray: '#C4C4C9',
          'gray-dark': '#3A3A3F',
          'black-soft': '#1A1A1D',
          pink: '#F472B6',
          blue: '#60A5FA',
          green: '#34D399',
          red: '#EF4444',
        },
        badge: {
          'green-text': '#059669',
          'red-text': '#B91C1C',
        },
        border: {
          'dark-subtle': '#26262C',
        },
        light: {
          bg: '#F8F8FA',
          card: '#FFFFFF',
          text: '#1A1A1D',
          action: '#8B5CF6',
        },
        dark: {
          bg: '#0F0F12',
          card: '#18181C',
          text: '#F5F5F7',
          action: '#6D28D9',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #8B5CF6, #6D28D9)',
        'gradient-deep': 'linear-gradient(135deg, #6D28D9, #4C1D95)',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        // Hierarquia de tipografia
        'h1': ['2rem', { lineHeight: '2.5rem', fontWeight: '700' }],        // 32px
        'h2': ['1.625rem', { lineHeight: '2rem', fontWeight: '600' }],      // 26px
        'h3': ['1.375rem', { lineHeight: '1.875rem', fontWeight: '600' }],  // 22px
        'h4': ['1.125rem', { lineHeight: '1.625rem', fontWeight: '500' }],  // 18px
        'large': ['1rem', { lineHeight: '1.5rem', fontWeight: '400' }],     // 16px
        'body': ['0.9375rem', { lineHeight: '1.5rem', fontWeight: '400' }], // 15px
        'label': ['0.8125rem', { lineHeight: '1.25rem', fontWeight: '500' }], // 13px
        'button': ['0.9375rem', { lineHeight: '1.5rem', fontWeight: '600' }], // 15px
      },
      spacing: {
        // Sistema de espaçamento (múltiplos de 4px)
        // Tailwind já possui 1-16 por padrão, apenas documentando o padrão
        // 1: '0.25rem',   // 4px
        // 2: '0.5rem',    // 8px - Listas
        // 3: '0.75rem',   // 12px - Componentes internos, botões
        // 4: '1rem',      // 16px - Gap padrão
        // 5: '1.25rem',   // 20px - Cards
        // 6: '1.5rem',    // 24px - Cards
        // 8: '2rem',      // 32px - Seções médias
        // 10: '2.5rem',   // 40px - Seções médias
        // 12: '3rem',     // 48px - Seções médias a grandes
        // 16: '4rem',     // 64px - Seções grandes
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};