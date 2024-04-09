/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#AC00E6",
        "primary-bg": "#882781",
        secondary: "#000EF8",
        "secondary-bg": "#FAFAFA",
        error: "#B80000",
      },
    },
  },
  plugins: [],
};
