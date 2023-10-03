/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "src/**/.{js,jsx,html}",
    "src/components/.{js,jsx,html}",
    "./src/components/.{html,js,jsx}",
    "./App.js/.{js,jsx}",
    "public/index.html/*.html",
    "src/components/*/.{js,jsx,html}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
