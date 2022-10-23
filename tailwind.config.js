/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{vue,js}"],
  theme: {
    extend: {},
    screens: {
      'lg': {'max': '992px'},
      'md': {'max': '768px'},
      'sm': {'max': '480px'},
      'xs': {'max': '348px'}
    },
    container: {
      padding: '20px',
      center: true,
    },
  },
  plugins: [],
}
