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
          info: "#89CFF0",
          success: "#5FBC6E",
          warning: "#FFA500",
          error: "#ff0000",
        },
      },
      "halloween",
      "dark",
      "synthwave",
      "luxury",
      "night",
      "coffee",
      "forest",
      "dracula",
    ],
  },
};
