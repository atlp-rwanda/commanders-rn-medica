/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./screens/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-500": "#246BFD",
        "primary-400": "#5089FD",
        "primary-300": "#7CA6FE",
        "primary-200": "#A7C4FE",
        "primary-100": "#E9F0FF",
        "Greyscale/900": "#212121",
        "Greyscale/600": "#757575",
        "Greyscale/400": "#BDBDBD",
        "Greyscale/100": "#F5F5F5",
      },
    },
    fontWeight: {
      thin: "100",
      hairline: "100",
      extralight: "200",
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
      "extra-bold": "800",
      black: "900",
    },
  },
  plugins: [],
};
