/**
 * CAFÉ BUGADO — Design Tokens
 *
 * Fonte única de verdade para cores, tipografia, espaçamento, bordas e animações.
 * Qualquer novo padrão visual deve ser definido aqui antes de ser usado nos componentes.
 *
 * Uso:
 *   import { colors, gradients, spacing } from '@/tokens';
 */

// ---------------------------------------------------------------------------
// CORES
// ---------------------------------------------------------------------------

export const colors = {
  // Roxo — cor primária da marca
  purple: {
    DEFAULT: '#8B5CF6',  // cb-purple
    dark:    '#6D28D9',  // cb-purple-dark
    deep:    '#4C1D95',  // cb-purple-deep
  },

  // Tons neutros
  white: {
    DEFAULT: '#FFFFFF',
    soft:    '#F8F8FA',  // cb-white-soft
  },
  gray: {
    light:   '#E7E7EB',  // cb-gray-light
    DEFAULT: '#C4C4C9',  // cb-gray
    dark:    '#3A3A3F',  // cb-gray-dark
  },
  black: {
    soft:    '#1A1A1D',  // cb-black-soft
  },

  // Acento
  pink:    '#F472B6',  // cb-pink
  blue:    '#60A5FA',  // cb-blue
  green:   '#34D399',  // cb-green
  red:     '#EF4444',  // cb-red

  // Badges
  badge: {
    greenText: '#059669',
    redText:   '#B91C1C',
  },

  // Bordas
  border: {
    darkSubtle: '#26262C',
  },

  // Tema Light
  light: {
    bg:     '#F8F8FA',
    card:   '#FFFFFF',
    text:   '#1A1A1D',
    action: '#8B5CF6',
  },

  // Tema Dark
  dark: {
    bg:     '#0F0F12',
    card:   '#18181C',
    text:   '#F5F5F7',
    action: '#6D28D9',
  },
} as const;

// ---------------------------------------------------------------------------
// GRADIENTES
// Correspondem às classes Tailwind 'bg-gradient-primary' e 'bg-gradient-deep'
// ---------------------------------------------------------------------------

export const gradients = {
  primary: 'linear-gradient(135deg, #8B5CF6, #6D28D9)',  // bg-gradient-primary
  deep:    'linear-gradient(135deg, #6D28D9, #4C1D95)',  // bg-gradient-deep
} as const;

// Classes Tailwind prontas para uso direto em className
export const gradientClasses = {
  primary: 'bg-gradient-primary',
  deep:    'bg-gradient-deep',
  text:    'bg-clip-text text-transparent bg-gradient-primary',
} as const;

// ---------------------------------------------------------------------------
// TIPOGRAFIA
// ---------------------------------------------------------------------------

export const fontFamily = {
  sans:    ['Inter', 'system-ui', 'sans-serif'],
  heading: ['Inter', 'system-ui', 'sans-serif'],
  mono:    ['JetBrains Mono', 'Fira Code', 'monospace'],
} as const;

export const fontSize = {
  h1:     { size: '2rem',      lineHeight: '2.5rem',  weight: '700' },  // text-h1
  h2:     { size: '1.625rem',  lineHeight: '2rem',    weight: '600' },  // text-h2
  h3:     { size: '1.375rem',  lineHeight: '1.875rem',weight: '600' },  // text-h3
  h4:     { size: '1.125rem',  lineHeight: '1.625rem',weight: '500' },  // text-h4
  large:  { size: '1rem',      lineHeight: '1.5rem',  weight: '400' },  // text-large
  body:   { size: '0.9375rem', lineHeight: '1.5rem',  weight: '400' },  // text-body
  label:  { size: '0.8125rem', lineHeight: '1.25rem', weight: '500' },  // text-label
  button: { size: '0.9375rem', lineHeight: '1.5rem',  weight: '600' },  // text-button
} as const;

// ---------------------------------------------------------------------------
// ESPAÇAMENTO
// Sistema de múltiplos de 4px — usar classes Tailwind padrão (p-1, gap-4 etc.)
// ---------------------------------------------------------------------------

export const spacing = {
  1:  '0.25rem',  //  4px — mínimo
  2:  '0.5rem',   //  8px — listas
  3:  '0.75rem',  // 12px — internos de componentes, botões
  4:  '1rem',     // 16px — gap padrão
  5:  '1.25rem',  // 20px — cards
  6:  '1.5rem',   // 24px — cards
  8:  '2rem',     // 32px — seções médias
  10: '2.5rem',   // 40px — seções médias
  12: '3rem',     // 48px — seções médias a grandes
  16: '4rem',     // 64px — seções grandes
} as const;

// ---------------------------------------------------------------------------
// BORDAS
// ---------------------------------------------------------------------------

export const borderRadius = {
  sm:  'rounded',     // 4px
  md:  'rounded-md',  // 6px
  lg:  'rounded-lg',  // 8px  — padrão dos botões e cards
  xl:  'rounded-xl',  // 12px — cards maiores
  '2xl': 'rounded-2xl',
  full: 'rounded-full', // pílulas / badges
} as const;

export const borderWidth = {
  DEFAULT: 'border',    // 1px
  2:       'border-2',  // 2px — botão outline
} as const;

// ---------------------------------------------------------------------------
// SOMBRAS
// ---------------------------------------------------------------------------

export const shadows = {
  sm:     'shadow-sm',
  md:     'shadow-md',
  lg:     'shadow-lg',
  purple: 'shadow-lg shadow-cb-purple/30',  // sombra temática
} as const;

// ---------------------------------------------------------------------------
// BOTÕES — variantes e tamanhos
// Referência para Button.tsx e LinkButton.tsx
// ---------------------------------------------------------------------------

export const buttonVariants = {
  primary:   'bg-gradient-primary text-white hover:shadow-lg hover:-translate-y-0.5',
  secondary: 'bg-cb-purple/10 text-cb-purple hover:bg-cb-purple/20 dark:bg-cb-purple/20 dark:hover:bg-cb-purple/30',
  outline:   'border-2 border-cb-purple text-cb-purple hover:bg-cb-purple/10 dark:border-cb-purple-dark dark:text-cb-purple-dark dark:hover:bg-cb-purple-dark/10',
  ghost:     'text-cb-purple hover:bg-cb-purple/10 dark:text-cb-purple-dark dark:hover:bg-cb-purple-dark/10',
  danger:    'bg-cb-red text-white hover:bg-cb-red/90 hover:shadow-lg',
} as const;

export const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm',    // 12/6px
  md: 'px-6 py-3 text-base',    // 24/12px — padrão
  lg: 'px-8 py-4 text-lg',      // 32/16px
} as const;

export const buttonBase =
  'font-semibold rounded-lg transition-all duration-200 inline-flex items-center justify-center gap-2';

// ---------------------------------------------------------------------------
// ANIMAÇÕES
// Referência para as classes definidas em index.css
// ---------------------------------------------------------------------------

export const animations = {
  fadeIn:     'animate-fadeIn',     // opacity 0→1, 1s ease-in-out
  slideUp:    'animate-slideUp',    // translateY(20px)→0 + fadeIn, 1s
  float:      'animate-float',      // levitação suave, 15s infinite
  typing:     'animate-typing',     // efeito máquina de escrever, 3s
  wordRotate: 'animate-wordRotate', // rotação de palavras no hero, 12s
  spinSlow:   'animate-spin-slow',  // spin 3s linear infinite
  pulse:      'animate-pulse',      // opacity pulse, 2s infinite
} as const;

// ---------------------------------------------------------------------------
// TRANSIÇÕES
// ---------------------------------------------------------------------------

export const transitions = {
  fast:    'transition-all duration-150',
  DEFAULT: 'transition-all duration-200',  // padrão dos botões
  medium:  'transition-all duration-300',
  slow:    'transition-all duration-500',
} as const;

// ---------------------------------------------------------------------------
// Z-INDEX
// ---------------------------------------------------------------------------

export const zIndex = {
  header:  'z-50',
  overlay: 'z-40',
  modal:   'z-50',
  tooltip: 'z-50',
} as const;
