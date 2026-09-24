// ─────────────────────────────────────────────────────────────────────────────
//  COLOUR VALUES FOR JAVASCRIPT
//
//  Tailwind classes cover 99% of the styling (see tailwind.config.js).
//  A few things — SVG `fill` attributes, inline gradients — need a real hex
//  string instead of a class name. Those read from here.
//
//  KEEP THIS IN SYNC WITH tailwind.config.js.
// ─────────────────────────────────────────────────────────────────────────────

export const BRAND = {
  navy: "#1f3a5f",
  navyLight: "#2a4a6f",
  navyDark: "#162844",
  navyDeep: "#16294a",
  orange: "#f07d00",
  orangeLight: "#ff9b3a",
  orangeDeep: "#b85900",
  orangeInk: "#1a1206",
  fg: "#122038",
  fgMuted: "#5a6a80",
  white: "#ffffff",
  ink: "#020617"
};

/**
 * The colour the decorative wave at the bottom of a hero should be painted in.
 * The wave has to match the background of the section BELOW it, otherwise you
 * see a hard edge — so it flips with the light/dark theme.
 *
 * @param {"light"|"dark"} theme
 */
export function waveFillForTheme(theme) {
  return theme === "dark" ? BRAND.ink : BRAND.white;
}

/**
 * Tailwind classes for the standard page background + text colour.
 * Used by every top-level <main> so pages can never drift apart.
 */
export const PAGE_SURFACE =
  "bg-white text-fg dark:bg-ink dark:text-slate-100";

/**
 * The navy surface behind every hero and page header.
 * Flat rather than a gradient: the depth comes from the off-centre glows in
 * EditionHero, which look like light in a room instead of a CSS ramp.
 */
export const HERO_SURFACE = "bg-navy";
