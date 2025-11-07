/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // MathStar brand colors - "Midnight Blue" theme from PRD
        // Professional, neutral, no pink/magenta (as specified)
        primary: {
          50: '#E6EDF5',
          100: '#CCDAEB',
          200: '#99B5D7',
          300: '#6690C3',
          400: '#336BAF',
          500: '#00469B', // Strong professional blue
          600: '#003A7C',
          700: '#002D5D',
          800: '#00203E',
          900: '#00131F',
          DEFAULT: '#005A9C' // Primary action button color from PRD
        },
        secondary: {
          50: '#FFF4E6',
          100: '#FFE9CC',
          200: '#FFD399',
          300: '#FFBD66',
          400: '#FFA733',
          500: '#FF9100',
          600: '#FD7E14', // Vibrant orange accent/hover from PRD
          700: '#E06600',
          800: '#C45500',
          900: '#A74400',
          DEFAULT: '#FD7E14'
        },
        success: {
          50: '#E8F5E9',
          100: '#C8E6C9',
          200: '#A5D6A7',
          300: '#81C784',
          400: '#66BB6A',
          500: '#4CAF50',
          600: '#28A745', // Bright green for correct answers (PRD)
          700: '#2E7D32',
          800: '#1B5E20',
          900: '#0D3F0F',
          DEFAULT: '#28A745'
        },
        error: {
          50: '#FFEBEE',
          100: '#FFCDD2',
          200: '#EF9A9A',
          300: '#E57373',
          400: '#EF5350',
          500: '#F44336',
          600: '#DC3545', // Strong red for errors (PRD)
          700: '#C62828',
          800: '#B71C1C',
          900: '#8B0000',
          DEFAULT: '#DC3545'
        },
        // Dark theme colors (dark-mode-first approach from PRD)
        dark: {
          bg: '#1A1A1D', // Very dark grey, almost black (PRD)
          text: '#F5F5F5', // Off-white for primary text (PRD)
          secondary: '#4E4E50' // Medium grey for secondary text/borders (PRD)
        },
        // Standard gray scale
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827'
        }
      },
      // Touch-optimized sizes for mobile-first design (students on phones)
      spacing: {
        'touch-min': '3rem', // 48px - minimum touch target
        'touch-safe': '4rem' // 64px - comfortable touch area
      },
      borderRadius: {
        mathstar: '0.5rem' // Consistent border-radius for MathStar
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'] // Primary font from PRD
      }
    }
  },
  darkMode: 'class', // Enable dark mode
  plugins: [
    require('@tailwindcss/forms') // Add forms plugin
  ]
}
