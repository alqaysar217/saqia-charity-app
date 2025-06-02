/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        tajawal: ['Tajawal', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eef8fd',
          100: '#d5ebf9',
          200: '#adddf4',
          300: '#84cfef',
          400: '#4BB4DE', // Main primary color
          500: '#2290c3',
          600: '#1a73a0',
          700: '#155b7e',
          800: '#134a65',
          900: '#123d55',
        },
        secondary: {
          50: '#f3f4f6',
          100: '#e5e7eb',
          200: '#d1d5db',
          300: '#9ca3af',
          400: '#6b7280',
          500: '#4b5563',
          600: '#374151',
          700: '#1f2937',
          800: '#111827',
          900: '#0f172a',
        },
        success: {
          400: '#22c55e',
        },
        warning: {
          400: '#f59e0b',
        },
        error: {
          400: '#ef4444',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};