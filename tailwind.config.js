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
      "lighter-dark": "#242424",
      color1: "#A174EB",
      gray: "#B0B0B0",
    },
    extend: {
      height: {
        "10v": "10vh",
        "20v": "20vh",
        "30v": "30vh",
        "40v": "40vh",
        "50v": "50vh",
        "60v": "60vh",
        "70v": "70vh",
        "80v": "80vh",
        "90v": "90vh",
        "100v": "100vh",
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],
  daisyui: {
    themes: [
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
      "halloween",
      "light",
      "dark",
      "synthwave",
      "forest",
      "black",
      "luxury",
      "dracula",
      "business",
      "night",
      "coffee",
    ],
  },
};
