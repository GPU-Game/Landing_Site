const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "500px",
        ...defaultTheme.screens,
      },

      fontFamily: {
        sans: ["Changa One", ...defaultTheme.fontFamily.sans],
        varela: ["Varela Round", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
