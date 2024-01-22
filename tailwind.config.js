/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "main-1": "#130C1C",
        "main-2": "#170f23",
        "main-3": "#2a213a"
      },
      colors: {
        "main-1": "#130C1C",
        "main-2": "#170f23",
        "main-3": "#2a213a"
      }
    },
  },
  plugins: [],
}

