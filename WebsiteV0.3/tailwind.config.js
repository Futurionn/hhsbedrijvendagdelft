/** @type {import('tailwindcss').Config} */

// ─────────────────────────────────────────────────────────────────────────────
//  THE DESIGN SYSTEM — colours, type and motion all live here.
//
//  Change a value in this file and it updates everywhere on the site at once.
//  These names become Tailwind classes:
//
//      navy        ->  bg-navy       text-navy       border-navy
//      navy.light  ->  bg-navy-light text-navy-light
//      orange      ->  bg-orange     text-orange     shadow-orange/30
//
//  Add "/<number>" for transparency:  bg-orange/10  =  orange at 10% opacity.
//
//  If you add a NEW colour, also add it to src/shared/theme.js so that the
//  few places that need a raw hex value (the SVG waves) stay in sync.
// ─────────────────────────────────────────────────────────────────────────────
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      // ── COLOURS ────────────────────────────────────────────────────────────
      colors: {
        // Primary brand blue — headings, footer, hero background.
        navy: {
          DEFAULT: "#1e3a5f", // main navy
          light: "#2a4a6f", // middle of the hero gradient
          dark: "#162844", // associations gradient, middle stop
          deep: "#0f1f36" // associations gradient, top stop
        },

        // Accent colour — buttons, icons, highlights.
        //
        // CONTRAST NOTE. The brand orange is bright, so orange TEXT on a white
        // page only reaches 2.8:1 — well under the 4.5:1 that small text needs
        // to stay readable. `deep` is the same hue darkened until it passes
        // (4.7:1). Use it for orange WORDS on light backgrounds; keep DEFAULT
        // for fills, icons and anything sitting on navy.
        //
        //   text-orange-deep dark:text-orange     <- orange text
        //   bg-orange                             <- orange fill
        orange: {
          DEFAULT: "#f07c00", // the brand orange — fills and dark backgrounds
          light: "#ff9b3a", // hover accent
          deep: "#b85900" // orange TEXT on white (passes AA)
        },

        // Page background in dark mode (same value as Tailwind's slate-950).
        ink: "#020617"
      },

      // ── TYPE ───────────────────────────────────────────────────────────────
      //  The system font is used deliberately: it already ships optical sizing,
      //  tracking tables and legibility tuning that a downloaded webfont does
      //  not, and it costs nothing to load.
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif"
        ]
      },

      //  Each size carries its OWN line-height and letter-spacing, because the
      //  right value for both changes with size:
      //    - big text needs TIGHTER tracking (letters drift apart as they grow)
      //      and TIGHTER leading
      //    - small text needs slightly LOOSER tracking to stay legible
      //  A single letter-spacing applied to everything is wrong somewhere.
      //
      //  The display sizes use clamp() so they scale with the viewport instead
      //  of jumping at breakpoints.
      fontSize: {
        // Hero headline.
        display: [
          "clamp(2.5rem, 1.6rem + 3.6vw, 4.25rem)",
          { lineHeight: "1.04", letterSpacing: "-0.033em", fontWeight: "700" }
        ],
        // Section headings.
        title: [
          "clamp(1.875rem, 1.35rem + 2.1vw, 2.875rem)",
          { lineHeight: "1.1", letterSpacing: "-0.024em", fontWeight: "700" }
        ],
        // Page headings (the navy header on inner pages).
        "title-sm": [
          "clamp(1.75rem, 1.4rem + 1.4vw, 2.5rem)",
          { lineHeight: "1.12", letterSpacing: "-0.02em", fontWeight: "700" }
        ],
        // Card headings.
        heading: ["1.1875rem", { lineHeight: "1.3", letterSpacing: "-0.012em", fontWeight: "650" }],
        // Intro paragraphs under a heading.
        lead: ["1.0625rem", { lineHeight: "1.62", letterSpacing: "-0.005em" }],
        // Body copy.
        body: ["0.9375rem", { lineHeight: "1.62", letterSpacing: "0" }],
        // Captions, meta rows.
        caption: ["0.8125rem", { lineHeight: "1.5", letterSpacing: "0.005em" }],
        // The small spaced-out label above a section title.
        kicker: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.14em", fontWeight: "600" }]
      },

      // 650 sits between semibold and bold — enough presence for a card
      // heading without the shouty weight of 800.
      fontWeight: {
        650: "650"
      },

      // ── MOTION ─────────────────────────────────────────────────────────────
      //  Two speeds, used consistently:
      //    press  — must feel instant, so the UI answers the finger
      //    settle — a hover or state change the eye follows
      transitionDuration: {
        press: "110ms",
        settle: "220ms"
      },

      //  A gentle overshoot-free curve. Anything the user can grab uses a
      //  spring in JS instead (see src/shared/context/MotionProvider.jsx).
      transitionTimingFunction: {
        settle: "cubic-bezier(0.22, 0.61, 0.36, 1)"
      }
    }
  },
  plugins: []
};
