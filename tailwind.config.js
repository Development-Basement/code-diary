/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./contexts/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    require("daisyui"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
  ],
  daisyui: {
    themes: [
      {
        sapphire: {
          primary: "#A174EB", // Action - Main
          secondary: "#5FBC6E", // Important
          accent: "#000000",
          neutral: "#1A1A1A", // Dark - Main
          "base-100": "#212121", // Background - Dark
          info: "#000000",
          success: "#000000",
          warning: "#000000",
          error: "#DC2828",
        },
      },
      "halloween",
      "dark",
      "synthwave",
      "black",
      "luxury",
      "business",
      "night",
      "coffee",
      "forest",
      "dracula",
      "light",
    ],
  },
};
