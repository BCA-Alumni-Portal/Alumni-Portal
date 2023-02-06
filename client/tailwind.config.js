const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    colors: {
      'white': '#ffffff',
      'black': '#000000',
      amber: colors.amber,
      stone: colors.stone,
      red: colors.red,
      sky: colors.sky
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}