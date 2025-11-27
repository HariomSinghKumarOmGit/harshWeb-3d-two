/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        minecraft: {
          grass: '#7CBD3A',
          dirt: '#8B6F47',
          stone: '#7F7F7F',
          sky: '#87CEEB',
          night: '#0A1628',
        },
      },
      zIndex: {
        'ui': '100',
        'world': '1',
      },
    },
  },
  plugins: [],
}
