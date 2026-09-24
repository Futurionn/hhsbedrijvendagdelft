// ─────────────────────────────────────────────────────────────────────────────
//  COMPANY CARD COLOURS
//
//  Some company logos are white-on-transparent, some are dark-on-transparent.
//  A white logo disappears on a white card; a dark logo disappears on a dark
//  card. So each company can declare what its logo needs, with `logoTone`:
//
//      logoTone: "light"   logo is LIGHT  -> always give it a DARK  card
//      logoTone: "dark"    logo is DARK   -> always give it a WHITE card
//      (not set)           logo works either way -> card follows the site theme
//
//  Everything that draws a company (the home-page cards and the companies
//  list) reads its colours from here, so the two can never drift apart.
// ─────────────────────────────────────────────────────────────────────────────

/** Tailwind classes for the card/row background and border. */
export function surfaceClasses(logoTone) {
  if (logoTone === "light") {
    return "border-slate-800 bg-slate-900";
  }
  if (logoTone === "dark") {
    return "border-gray-100 bg-white";
  }
  return "border-gray-100 bg-white dark:border-white/10 dark:bg-slate-900";
}

/**
 * Tailwind text colours that stay readable on that surface.
 *
 *   const text = surfaceTextClasses(company.logoTone);
 *   <h3 className={text.primary}>   company name
 *   <p  className={text.secondary}> description, meta labels
 *   <p  className={text.body}>      longer body copy
 */
export function surfaceTextClasses(logoTone) {
  if (logoTone === "light") {
    return {
      primary: "text-white",
      secondary: "text-gray-200",
      body: "text-gray-100",
      chip: "bg-white/10 text-gray-100"
    };
  }
  if (logoTone === "dark") {
    return {
      primary: "text-navy",
      secondary: "text-gray-600",
      body: "text-gray-700",
      chip: "bg-gray-100 text-gray-700"
    };
  }
  return {
    primary: "text-navy dark:text-white",
    secondary: "text-gray-600 dark:text-gray-300",
    body: "text-gray-700 dark:text-gray-200",
    chip: "bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-200"
  };
}

/**
 * The outlined row actions ("Toon op kaart", "Website"), tinted to stay
 * visible on any surface. They invert on hover. Orange is reserved for the
 * one primary button, so these are neutral.
 */
export function mapButtonClasses(logoTone) {
  if (logoTone === "light") {
    return "border-white/40 text-white hover:border-white hover:bg-white hover:text-navy";
  }
  if (logoTone === "dark") {
    return "border-navy/30 text-navy hover:border-navy hover:bg-navy hover:text-white";
  }
  return (
    "border-navy/30 text-navy hover:border-navy hover:bg-navy hover:text-white " +
    "dark:border-white/30 dark:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-navy"
  );
}
