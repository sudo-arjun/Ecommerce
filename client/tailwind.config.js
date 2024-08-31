/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,ejs,js}"],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui'),],
  darkMode: 'selector'
}

