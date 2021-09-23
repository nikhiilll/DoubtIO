const tailwindcss = require("tailwindcss");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#8D87FB",
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
    },
  },
  // plugins: [require("@tailwindcss/forms")],
  plugins: [],
};
