/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      body: ["Poppins", "sans-serif"],
    },
    colors: {
      bgColor: "#F4F7FF",
      blueColor: "#007bff",
      indigo: "#6610f2",
      purpleColor: "#6f42c1",
      pinkColor: "#e83e8c",
      redColor: "#dc3545",
      orangeColor: "#fd7e14",
      yellowColor: "#ffc107",
      // green: "#28a745",
      teal: "#20c997",
      cyan: "#17a2b8",
      gray: "#6c757d",

      textColor: "#CCCCCC",
      grayDark: "#343a40",
      primary: "#007bff",
      secondary: "#6c757d",
      success: "#28a745",
      info: "#17a2b8",
      warning: "#ffc107",
      danger: "#dc3545",
      light: "#f8f9fa",
      dark: "#343a40",
      darkPrimary: "#333333",
    },
    extend: {
      boxShadow: {
        primaryShadow: "0 3px 6px rgba(51,51,51,.05)",
        itemShadow: "0 5px 15px rgba(0,0,0,.05)",
      },
    },
  },
  plugins: [],
});
