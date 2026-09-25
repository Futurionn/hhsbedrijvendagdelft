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
  navy: "#1f3a5f",
  navyDeep: "#16294a",
  orange: "#f07d00",
  orangeLight: "#ff9b3a",
  orangeDeep: "#b85900",
  orangeInk: "#1a1206",
  fg: "#122038",
  fgMuted: "#5a6a80",
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
  // -- Hero, on navy. Bubbles sit at the edges, never behind text, but the
  //    faintest of them (white ~4.5%) is included as a worst case. --
  ["hero word             white / navy + bubble", C.white, composite(C.white, C.navy, 0.045), "large"],
  ['"T.I.S."              orange / navy', C.orange, C.navy, "large"],
  ["lede, details         white 72% / navy + bubble",
    composite(C.white, composite(C.white, C.navy, 0.045), 0.72), composite(C.white, C.navy, 0.045), "normal"],
  ["labels (Wanneer)      white 60% / navy", composite(C.white, C.navy, 0.6), C.navy, "normal"],

  // -- Buttons --
  ["primary button        orange-ink / orange", C.orangeInk, C.orange, "normal"],
  ["primary hover (hero)  navy / white", C.navy, C.white, "normal"],
  ["primary hover (page)  white / navy", C.white, C.navy, "normal"],
  ["outline button        navy / white", C.navy, C.white, "normal"],

  // -- Pinned header. It is translucent, so it must be checked against its
  //    WORST background: a white section scrolling underneath it. --
  // (The inactive language in "NL / EN" uses this same 72%; the reference's
  //  50% falls to 4.3:1 over a white section.)
  ["header links, lang   white 72% / navy 90% on white",
    composite(C.white, composite(C.navy, C.white, 0.9), 0.72),
    composite(C.navy, C.white, 0.9), "normal"],

  // -- Light page --
  ["headings, copy        fg / white", C.fg, C.white, "normal"],
  ["muted copy, rails     fg-muted / white", C.fgMuted, C.white, "normal"],
  ["section number        orange-deep / white", C.orangeDeep, C.white, "normal"],
  ["timeline numerals     fg / white", C.fg, C.white, "large"],

  // -- Dark page --
  ["section title (dark)  white / ink", C.white, C.ink, "large"],
  ["body (dark)           slate-300 / ink", C.slate300, C.ink, "normal"],
  ["muted (dark)          slate-400 / ink", C.slate400, C.ink, "normal"],
  ["section number (dark) orange / ink", C.orange, C.ink, "normal"],

  // -- Dark bottom band and footer, on navy-deep --
  ["band heading          white / navy-deep", C.white, C.navyDeep, "large"],
  ["band intro            white 72% / navy-deep", composite(C.white, C.navyDeep, 0.72), C.navyDeep, "normal"],
  ["band rail, footer     white 60% / navy-deep", composite(C.white, C.navyDeep, 0.6), C.navyDeep, "normal"],
  ["band section number   orange / navy-deep", C.orange, C.navyDeep, "normal"]
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
