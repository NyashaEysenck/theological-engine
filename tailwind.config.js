/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary palette inspired by the reference image
        primary: {
          50: '#f0f4f8',   // Very light blue-gray
          100: '#d9e2ec',  // Light blue-gray
          200: '#bcccdc',  // Medium light blue-gray
          300: '#9fb3c8',  // Medium blue-gray
          400: '#829ab1',  // Medium blue
          500: '#627d98',  // Base blue
          600: '#486581',  // Darker blue
          700: '#334e68',  // Dark blue (main navy from image)
          800: '#243b53',  // Very dark blue
          900: '#102a43',  // Deepest blue
          950: '#0a1929',  // Almost black blue
        },
        // Secondary warm beige/cream palette from background
        secondary: {
          50: '#fefdfb',   // Almost white cream
          100: '#fdf9f0',  // Very light cream
          200: '#faf2e4',  // Light cream (main background)
          300: '#f5e6d3',  // Medium light cream
          400: '#edd5b7',  // Medium cream
          500: '#e2c29f',  // Base cream
          600: '#d4a574',  // Darker cream
          700: '#c4915c',  // Brown-cream
          800: '#a67c52',  // Dark brown
          900: '#8b6914',  // Deep brown
          950: '#4a3728',  // Very dark brown
        },
        // Accent colors for highlights and interactive elements
        accent: {
          50: '#fff7ed',   // Very light orange
          100: '#ffedd5',  // Light orange
          200: '#fed7aa',  // Medium light orange
          300: '#fdba74',  // Medium orange
          400: '#fb923c',  // Base orange
          500: '#f97316',  // Bright orange
          600: '#ea580c',  // Dark orange
          700: '#c2410c',  // Darker orange
          800: '#9a3412',  // Very dark orange
          900: '#7c2d12',  // Deepest orange
          950: '#431407',  // Almost black orange
        },
        // Neutral grays with warm undertones
        neutral: {
          50: '#fafaf9',   // Almost white
          100: '#f5f5f4',  // Very light gray
          200: '#e7e5e4',  // Light gray
          300: '#d6d3d1',  // Medium light gray
          400: '#a8a29e',  // Medium gray
          500: '#78716c',  // Base gray
          600: '#57534e',  // Dark gray
          700: '#44403c',  // Darker gray
          800: '#292524',  // Very dark gray
          900: '#1c1917',  // Almost black
          950: '#0c0a09',  // Pure black
        },
        // Success, warning, error states
        success: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        warning: {
          50: '#fffbeb',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        error: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
      },
      fontFamily: {
        // Typography matching the academic, professional feel
        heading: ['Spectral', 'Georgia', 'serif'], // Elegant serif for headings
        body: ['Inter', 'system-ui', 'sans-serif'], // Clean sans-serif for body
        mono: ['JetBrains Mono', 'Consolas', 'monospace'], // For code/technical content
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'strong': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 2px 10px -2px rgba(0, 0, 0, 0.05)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 15px -3px rgba(0, 0, 0, 0.1), 0 2px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'paper-texture': "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23f5e6d3\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
      },
    },
  },
  plugins: [],
};