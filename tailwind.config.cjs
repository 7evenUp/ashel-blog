/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: '#F0EDE8',
        black: '#28282D',
        beige: '#DCD4D1',
        'beige-dark': '#c4bab7'
      },
      screens: {
        'mobile': '480px'
      }
    },
  },
  plugins: [],
};
