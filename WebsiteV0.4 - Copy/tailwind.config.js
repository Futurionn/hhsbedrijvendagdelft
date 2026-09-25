/** @type {import('tailwindcss').Config} */

// ─────────────────────────────────────────────────────────────────────────────
//  THE DESIGN SYSTEM — colours, type, space and motion all live here.
//
//  The source of truth is design/tis-reference.html. Its `:root` block is
//  copied into src/index.css as CSS variables (--t-display, --gutter, ...);
//  this file turns those into Tailwind classes:
//
//      navy        ->  bg-navy       text-navy       border-navy
//      fg.muted    ->  text-fg-muted
//      rule.strong ->  border-rule-strong
//
//  Add "/<number>" for transparency on the hex colours: bg-orange/10.
//
//  If you add a NEW colour, also add it to src/shared/theme.js so that the
//  few places that need a raw hex value (the SVG waves) stay in sync.
// ─────────────────────────────────────────────────────────────────────────────
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    // The reference has one extra break at 700px (phone → tablet), so the
    // screens are listed in full to keep them in ascending order.
    screens: {
      sm: "640px",
      tab: "700px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px"
    },

    extend: {
      // ── COLOURS ────────────────────────────────────────────────────────────
      colors: {
        // The brand blue. DEFAULT is the hero; `deep` the dark bottom band.
        navy: {
          DEFAULT: "#1f3a5f",
          light: "#2a4a6f",
          dark: "#162844",
          deep: "#16294a"
        },

        // Orange is for action and a few fixed accents only: the button,
        // "T.I.S.", section numbers, the borrel lane, the note rule, focus.
        //
        // CONTRAST NOTE. Orange TEXT on white is only 2.75:1. `deep` is the
        // same hue darkened to 4.7:1 — use it for orange words on light
        // backgrounds (the section numbers):
        //   text-orange-deep dark:text-orange     <- orange text
        //   bg-orange                             <- orange fill
        // `ink` is the dark label on the orange button (6.7:1).
        orange: {
          DEFAULT: "#f07d00",
          light: "#ff9b3a",
          deep: "#b85900",
          ink: "#1a1206"
        },

        // Text on the white page: `fg` for copy, `fg-muted` for secondary.
        fg: {
          DEFAULT: "#122038",
          muted: "#5a6a80"
        },

        // Hairlines. `strong` opens a list (the programme axis, the FAQ);
        // `dark` is the hairline on navy.
        rule: {
          DEFAULT: "rgba(18, 32, 56, 0.14)",
          strong: "rgba(18, 32, 56, 0.9)",
          dark: "rgba(255, 255, 255, 0.16)"
        },

        // Text on navy. The reference's third level is 50% white; it is 60%
        // here because 50% on the hero navy is 4.1:1, under AA.
        "on-dark": {
          DEFAULT: "#ffffff",
          2: "rgba(255, 255, 255, 0.72)",
          3: "rgba(255, 255, 255, 0.6)"
        },

        // Page background in dark mode (same value as Tailwind's slate-950).
        ink: "#020617"
      },

      // ── TYPE ───────────────────────────────────────────────────────────────
      //  One family, Rubik, self-hosted (see src/main.jsx). Weights do the
      //  work: 300 for the big numerals, 400 for headings, 500 for the hero
      //  word and item titles, 600 for the button.
      fontFamily: {
        sans: [
          "Rubik Variable",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif"
        ]
      },

      //  Each size carries its own line-height, letter-spacing and weight.
      //  The fluid ones read the CSS variables in src/index.css, so a phone
      //  override there (e.g. --t-display) reaches every class at once.
      fontSize: {
        // "Bedrijvendag" in the hero — fills the grid.
        display: ["var(--t-display)", { lineHeight: "0.86", letterSpacing: "-0.055em", fontWeight: "500" }],
        // "T.I.S." above it: a fixed fraction of the display size.
        "display-tis": [
          "calc(var(--t-display) * var(--tis-ratio))",
          { lineHeight: "0.86", letterSpacing: "-0.04em", fontWeight: "500" }
        ],
        // The faint "26.11.26" at the foot of the page.
        bigdate: ["clamp(5.5rem, 27vw, 26rem)", { lineHeight: "0.74", letterSpacing: "-0.07em", fontWeight: "500" }],
        // Times on the programme axis.
        numeral: ["var(--t-num)", { lineHeight: "1", letterSpacing: "-0.05em", fontWeight: "300" }],
        // Section headings (h2).
        title: ["var(--t-h2)", { lineHeight: "1.02", letterSpacing: "-0.035em", fontWeight: "400" }],
        // Item headings (h3), FAQ questions.
        heading: ["var(--t-h3)", { lineHeight: "1.25", letterSpacing: "-0.02em", fontWeight: "500" }],
        // The hero paragraph and the Wanneer / Waar values.
        lead: ["var(--t-lede)", { lineHeight: "1.38", letterSpacing: "-0.01em" }],
        // Values in the "Over het event" fact list.
        fact: ["1.1875rem", { lineHeight: "1.35", letterSpacing: "-0.01em" }],
        // Body copy.
        body: ["var(--t-body)", { lineHeight: "1.55" }],
        // Rails, nav, secondary lines.
        small: ["var(--t-small)", { lineHeight: "1.5" }],
        // Labels: "Wanneer", "Waar".
        caption: ["var(--t-meta)", { lineHeight: "1.45" }]
      },

      // ── LAYOUT ─────────────────────────────────────────────────────────────
      //  One 12-column grid, max 1440px. Use <Container> from
      //  src/shared/ui/Section.jsx for the outer box and `gap-x-grid` between
      //  columns. Sections put their rail in columns 1–3 and content in 4–12.
      maxWidth: {
        grid: "var(--max)"
      },
      spacing: {
        gutter: "var(--gutter)",
        grid: "var(--gap)",
        section: "var(--section)",
        // Hero: space above the headline and below the actions (room for the
        // wave), and the gap between the headline and its rule.
        "hero-top": "clamp(120px, 15vh, 168px)",
        "hero-bottom": "clamp(120px, 14vw, 220px)",
        "hero-h1": "clamp(2.5rem, 6vh, 4.5rem)",
        // A block that follows a heading (the rule, the FAQ list, the logos).
        after: "clamp(1.5rem, 3vw, 2.5rem)",
        "after-lg": "clamp(2rem, 4vw, 3.5rem)",
        wave: "clamp(56px, 8.5vw, 128px)"
      },

      // ── SHAPES ─────────────────────────────────────────────────────────────
      //  ONE radius: 2px (`rounded-sm`). The bubbles and the stars are the
      //  only round things on the site. No rounded-md/xl/2xl/full, no pills,
      //  no shadows, no icon tiles.

      // ── MOTION ─────────────────────────────────────────────────────────────
      //    press  — must feel instant, so the UI answers the finger
      //    settle — a colour or state change the eye follows
      //    draw   — an underline retracting, an arrow nudging (the reference's
      //             --dur, with its --ease)
      transitionDuration: {
        press: "110ms",
        settle: "200ms",
        draw: "450ms"
      },
      transitionTimingFunction: {
        settle: "cubic-bezier(0.2, 0.7, 0.2, 1)"
      }
    }
  },
  plugins: []
};
