const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    // ripple: theme => ({
    //   colors: theme('colors'),
    //   darken: 0.1
    // }),
    colors: {
      'black': '#0f172a',
      'white': '#ffffff',
      amber: colors.amber,
      stone: colors.stone,
      cyan: colors.cyan,
      red: colors.red,
      sky: colors.sky,
      green: colors.green,
    },
    extend: {
      maxHeight: {
        '25': '25%',
        '50': '50%',
        '75': '75%',
      }
    }
  },
  plugins: [
    require("daisyui"),
    require('flowbite/plugin'),
    // require('tailwindcss-ripple')(),
    require("tw-elements/dist/plugin.cjs")
  ],
  daisyui: {
    styled: true,
    themes: false,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
  },
}