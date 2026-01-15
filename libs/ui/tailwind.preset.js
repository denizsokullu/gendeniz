/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        // Primary - Neon Lime
        primary: {
          DEFAULT: '#84CC16',
          50: '#F7FEE7',
          100: '#ECFCCB',
          200: '#D9F99D',
          300: '#BEF264',
          400: '#A3E635',
          500: '#84CC16',
          600: '#65A30D',
          700: '#4D7C0F',
          800: '#3F6212',
          900: '#365314',
          950: '#1A2E05',
        },
        // Background - Obsidian
        background: {
          DEFAULT: '#0A0A0B',
          secondary: '#141415',
          elevated: '#1C1C1E',
        },
        // Surface colors
        surface: {
          DEFAULT: '#141415',
          elevated: '#1C1C1E',
          overlay: '#232326',
        },
        // Border colors
        border: {
          DEFAULT: '#27272A',
          muted: '#1C1C1E',
          focus: '#84CC16',
        },
        // Text colors
        text: {
          primary: '#FAFAFA',
          secondary: '#A1A1AA',
          muted: '#71717A',
          inverse: '#0A0A0B',
        },
        // Semantic colors
        success: {
          DEFAULT: '#22C55E',
          muted: '#22C55E20',
        },
        warning: {
          DEFAULT: '#EAB308',
          muted: '#EAB30820',
        },
        error: {
          DEFAULT: '#EF4444',
          muted: '#EF444420',
        },
        info: {
          DEFAULT: '#3B82F6',
          muted: '#3B82F620',
        },
      },
      backgroundColor: {
        dark: '#0A0A0B',
      },
      backgroundImage: {
        'glow-primary':
          'radial-gradient(ellipse at top, rgba(132, 204, 22, 0.08) 0%, transparent 50%)',
        'gradient-primary': 'linear-gradient(135deg, #84CC16 0%, #A3E635 100%)',
      },
      boxShadow: {
        glow: '0 0 20px rgba(132, 204, 22, 0.3)',
        'glow-lg': '0 0 40px rgba(132, 204, 22, 0.4)',
      },
      ringColor: {
        DEFAULT: '#84CC16',
      },
    },
  },
};
