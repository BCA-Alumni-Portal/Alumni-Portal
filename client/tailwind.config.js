const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    colors: {
      'cream': '#f1f2e9',
      'defaultblue': '#4691f2',
      'hover-blue': '#267ded',
      'hover-cream': '#e4e6da',

      'black': '#0f172a',
      'white': '#ffffff',
      amber: colors.amber,
      stone: colors.stone,
      red: colors.red,
      sky: colors.sky
    },
    extend: {},
  },
  plugins: [
    require("daisyui"),
    require('flowbite/plugin')
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