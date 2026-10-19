/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  // `relative`: the main site's build runs from WebsiteV0.4/, so the paths
  // must be read from this folder, not from where the command is run.
  content: { relative: true, files: ["./index.html", "./src/**/*.{js,jsx}"] },
  theme: {
    extend: {
      colors: {
        navy: "#1e3a5f",
        orange: "#f07c00"
      }
    }
  },
  plugins: []
};
