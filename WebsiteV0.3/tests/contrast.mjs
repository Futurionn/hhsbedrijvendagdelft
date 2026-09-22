// ═════════════════════════════════════════════════════════════════════════════
//  CONTRAST CHECK
//
//  Checks every text/background pair the site actually uses against the WCAG AA
//  minimum, so a colour tweak cannot quietly make text unreadable.
//
//      node tests/contrast.mjs
//
//  Needs no browser and no server — it is pure arithmetic on the palette.
//
//  ─── THE THRESHOLDS ─────────────────────────────────────────────────────────
//      4.5:1   normal text
//      3.0:1   large text (24px+, or 18.7px+ bold) and UI shapes
//
//  ─── WHEN YOU CHANGE A COLOUR ───────────────────────────────────────────────
//  Update the matching constant below, run this, and fix anything that fails.
//  The values here must mirror tailwind.config.js.
// ═════════════════════════════════════════════════════════════════════════════

const PALETTE = {
  navy: "#1e3a5f",
  navyDeep: "#0f1f36",
  orange: "#f07c00",
  orangeDeep: "#b85900",
  white: "#ffffff",
  ink: "#020617",
  slate200: "#e2e8f0",
  slate300: "#cbd5e1",
  slate400: "#94a3b8",
  slate500: "#64748b",
  slate600: "#475569"
};

const toRgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));

/** Flatten a translucent foreground onto an opaque background. */
const composite = (fg, bg, alpha) => fg.map((c, i) => c * alpha + bg[i] * (1 - alpha));

const luminance = (rgb) => {
  const [r, g, b] = rgb.map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const C = Object.fromEntries(
  Object.entries(PALETTE).map(([name, hex]) => [name, toRgb(hex)])
);

/** [description, foreground, background, "normal" | "large"] */
const PAIRS = [
  // -- Hero, on navy --
  ["hero title            white / navy", C.white, C.navy, "large"],
  ["hero kicker           white 55% / navy", composite(C.white, C.navy, 0.55), C.navy, "normal"],
  ["hero subtitle         white 70% / navy", composite(C.white, C.navy, 0.7), C.navy, "normal"],
  ["hero pill label       white / navy + white 10%", C.white, composite(C.white, C.navy, 0.1), "normal"],
  ["top bar control       white 85% / navy", composite(C.white, C.navy, 0.85), C.navy, "normal"],

  // -- Buttons --
  ["primary button        navy-deep / orange", C.navyDeep, C.orange, "normal"],
  ["primary hover         navy-deep / orange-light", C.navyDeep, toRgb("#ff9b3a"), "normal"],
  ["ghost button          white / navy + white 12%", C.white, composite(C.white, C.navy, 0.12), "normal"],
  ["outline button        navy / white", C.navy, C.white, "normal"],

  // -- Pinned header. It is translucent, so it must be checked against its
  //    WORST background: a white section scrolling underneath it. --
  ["header nav link      white 90% / navy 90% on white",
    composite(C.white, composite(C.navy, C.white, 0.9), 0.9),
    composite(C.navy, C.white, 0.9), "normal"],
  ["header control       white 85% / navy 90% on white",
    composite(C.white, composite(C.navy, C.white, 0.9), 0.85),
    composite(C.navy, C.white, 0.9), "normal"],

  // -- Light page --
  ["section title         navy / white", C.navy, C.white, "large"],
  ["kicker                orange-deep / white", C.orangeDeep, C.white, "normal"],
  ["title accent          orange-deep / white", C.orangeDeep, C.white, "large"],
  ["inline link           orange-deep / white", C.orangeDeep, C.white, "normal"],
  ["lead paragraph        slate-600 / white", C.slate600, C.white, "normal"],
  ["caption               slate-500 / white", C.slate500, C.white, "normal"],

  // -- Dark page --
  ["section title (dark)  white / ink", C.white, C.ink, "large"],
  ["body (dark)           slate-300 / ink", C.slate300, C.ink, "normal"],
  ["caption (dark)        slate-400 / ink", C.slate400, C.ink, "normal"],
  ["accent (dark)         orange / ink", C.orange, C.ink, "normal"],

  // -- Associations strip, on navy --
  ["associations kicker   white 60% / navy", composite(C.white, C.navy, 0.6), C.navy, "normal"],
  ["associations name     white 75% / navy", composite(C.white, C.navy, 0.75), C.navy, "normal"],

  // -- Footer, on navy --
  ["footer body           white 65% / navy", composite(C.white, C.navy, 0.65), C.navy, "normal"],
  ["footer bottom bar     white 55% / navy", composite(C.white, C.navy, 0.55), C.navy, "normal"],
  ["footer accent         orange / navy", C.orange, C.navy, "large"]
];

let failures = 0;
console.log("\nWCAG AA — 4.5:1 normal text, 3.0:1 large text\n");

for (const [label, fg, bg, size] of PAIRS) {
  const required = size === "large" ? 3.0 : 4.5;
  const value = contrast(fg, bg);
  const ok = value >= required;
  if (!ok) failures++;
  console.log(
    `${ok ? "PASS" : "FAIL"}  ${label.padEnd(44)} ${value.toFixed(2)}:1  (needs ${required.toFixed(1)})`
  );
}

console.log(
  failures === 0
    ? "\n✅  Every pair meets AA.\n"
    : `\n❌  ${failures} pair(s) below AA.\n`
);
process.exit(failures === 0 ? 0 : 1);
