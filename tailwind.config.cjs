const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-roboto)', ...fontFamily.sans],
        hand: ['var(--font-mark)', ...fontFamily.serif]
      },
      colors: {
        grey: '#787887',
        white: '#F6F6F6',
        black: '#28282D',
        red: '#E2A5AD',
        'red-light': '#EDCDCE',
        beige: '#C9C0B5',
        'beige-dark': '#A99F92',
        olive: '#B5C7C9'
      },
      screens: {
        'mobile': '480px'
      },
      aspectRatio: {
        '3/4': '3 / 4'
      }
    },
  },
  plugins: [],
};
