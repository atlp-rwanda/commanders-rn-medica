/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./screens/**/*.{js,ts,jsx,tsx}",
     "./app/**/*.{js,ts,jsx,tsx}",
     "./components/**/*.{js,ts,jsx,tsx}",
     "./App.{js,jsx,ts,tsx}",
],
  theme: {
    extend: {colors: {
      lightblue:"#246BFD",
      reducedblue:"#246BFD14",
      darkblue:"#3062C8",
      lightgrey:"#FAFAFA",
      grey:"#9E9E9E",
      white:"#FFFFFF",
      popup:"#09101D",
      def:"#FFFFFF",

    },
    fontFamily: {
      UrbanistRegular: ["UrbanistRegular", "sans-serif"],
      UrbanistSemiBold:["UrbanistSemiBold", "sans-serif"],
      UrbanistBold:["UrbanistBold", "sans-serif"],
      UrbanistMedium:["UrbanistMedium", "sans-serif"],
    },
  },
    
  },
  plugins: [],
}


