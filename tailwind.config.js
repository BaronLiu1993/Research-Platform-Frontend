// tailwind.config.js
const {heroui} = require("@heroui/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@heroui/theme/dist/components/(input-otp|form).js",
  ],
  theme: {
    extend: {
      fontFamily: {
        cmubi: ['cmubi', 'sans-serif']
      }
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};