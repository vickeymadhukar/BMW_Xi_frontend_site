/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        display: ['"Clash Display"', '"Neue Montreal"', 'sans-serif'],
      },
      colors: {
        bmwBlue: '#0066B1',
        bmwSilver: '#E5E4E2',
      }
    },
  },
  plugins: [],
}
