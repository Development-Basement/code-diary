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
      {
        saphire: {
          primary: "#A174EB", // Action - Main
          secondary: "#5FBC6E", // Important
          accent: "#000000",
          neutral: "#1A1A1A", // Dark - Main
          "base-100": "#212121", // Background - Dark
          info: "#000000",
          success: "#000000",
          warning: "#000000",
          error: "#000000",
        },
      },
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
