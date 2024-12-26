/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        title: ['DM Sans', 'sans-serif'],
        body: ['Figtree', 'sans-serif'],
      },
      colors: {
        primary: '#fdfbfa',
        secondary: '#004aad',
        light: '#fffefd',
      },
    },
  },
  plugins: [], 
}

