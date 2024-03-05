/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "deep-purple": "#712bda",
        "mid-purple": "#a45deb",
        "dark-backdrop": "rgba(28, 28, 45, 0.9)",
      },
      boxShadow: {
        new: "0 0 6px 0 rgba(148, 77, 230, 0.75)",
        card: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      },
    },
  },
  plugins: [],
});
