/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./contexts/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      // FIXME: remove these colors
      "lighter-dark": "#242424",
      color1: "#A174EB",
      gray: "#B0B0B0",
      ...require("tailwindcss/colors"),
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],
  daisyui: {
    themes: [
      "forest",
      "dracula",
      { saphire: {} },
      "light",
      "halloween",
      "dark",
      "synthwave",
      "black",
      "luxury",
      "business",
      "night",
      "coffee",
    ],
  },
};
