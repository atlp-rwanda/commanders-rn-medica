/** @type {import('tailwindcss').Config} */

const primary = {
  50: "#eef5ff",
  100: "#e9f0ff",
  200: "#a7c4fe",
  300: "#7ca6fe",
  400: "#5089fd",
  500: "#246Bfd",
  600: "#1d55f3",
  700: "#1640df",
  800: "#1835b5",
  900: "#1a328e",
  950: "#152156",
};

module.exports = {
  content: [
    "./screens/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./App.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary,
        lightblue: "#246BFD",
        darkblue: "#3062C8",
        lightgrey: "#FAFAFA",
        grey: "#9E9E9E",
        white: "#FFFFFF",
        popup: "#09101D",
        def: "#FFFFFF",
      },
      fontFamily: {
        UrbanistRegular: ["UrbanistRegular", "sans-serif"],
        UrbanistSemiBold: ["UrbanistSemiBold", "sans-serif"],
        UrbanistBold: ["UrbanistBold", "sans-serif"],
        UrbanistMedium: ["UrbanistMedium", "sans-serif"],
      },
    },
  },
  plugins: [],
};
