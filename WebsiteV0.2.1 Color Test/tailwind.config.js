/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#1e3a5f",
        orange: "#9EA700" //#909806 
      }
    }
  },
  plugins: []
};
