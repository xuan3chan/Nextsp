/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "src/**/*.{js,jsx,html}",
    "src/components/.{js,jsx,html}",
    "./src/components/.{html,js,jsx}",
    "./App.js/.{js,jsx}",
    ".public/index.html",
    "src/components/*/.{js,jsx,html}",
    './pages/**/*.{html,js}',
    './components/**/*.{html,js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        'login-pink': '#FFF3FF',
        'login-blue': '#CBE1FD',
        'login-green': '#DAFFE6',
        'login-white': '#ffffff'
      },
      height: {
        
      }
    },
    '@media (min-width: 1024px)': {
      '.lg\\:block': {
        display: 'block',
      },
    },
  },
  plugins: [],
};
