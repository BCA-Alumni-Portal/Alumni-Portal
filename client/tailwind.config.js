/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    colors:{
      'cream':'#f1f2e9',
      'defaultblue':'#4691f2',
      'hover-blue':'#267ded',
      'black': '#0f172a',
      'hover-cream': '#e4e6da',},
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}