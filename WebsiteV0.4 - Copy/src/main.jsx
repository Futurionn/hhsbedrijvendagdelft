// ─────────────────────────────────────────────────────────────────────────────
//  ENTRY POINT  —  where the website starts.
//
//  index.html contains one empty <div id="root">. This file fills it with the
//  React app. You will rarely need to touch it; the interesting part is
//  App.jsx, which decides what each web address shows.
//
//  <React.StrictMode> is a development-only safety net: it runs some code
//  twice to surface bugs early. It has no effect on the built site.
// ─────────────────────────────────────────────────────────────────────────────
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// The typeface, Rubik, bundled with the site instead of fetched from Google:
// one variable file covering every weight. See tailwind.config.js.
import "@fontsource-variable/rubik/wght.css";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
