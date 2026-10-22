/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f5fa',
          100: '#e1ecf4',
          200: '#c5dbe9',
          300: '#9bc3db',
          400: '#6ca6c9',
          500: '#4f7a9d',
          600: '#3e6282',
          700: '#334f6b',
          800: '#2d435a',
          900: '#283a4c',
          dark: '#1e2d3b',
        },
        slateHeader: '#32373e',
        heroBlue: '#4b7396',
        heroCard: '#3d6384',
        ctaYellow: '#f5b027',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
