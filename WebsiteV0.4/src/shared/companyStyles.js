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

/**
 * The colours of an opened company card (gallery panel) and a row in the
 * companies list. The card keeps a FIXED surface in both themes, because
 * the logos are made for it:
 *
 *   logoTone "light"  (white logo)  -> navy card, white text
 *   anything else                   -> WHITE card, dark text, also in
 *                                      dark mode (a white card on the dark
 *                                      page is fine; white text on it is not)
 *
 * So these classes deliberately have no `dark:` variants: the text follows
 * the card, not the site theme.
 */
export function cardPalette(logoTone) {
  if (logoTone === "light") {
    return {
      surface: "border-white/10 bg-navy-deep",
      primary: "text-white",
      muted: "text-on-dark-2",
      faint: "text-on-dark-3",
      rule: "border-rule-dark",
      chip: "bg-white/10 text-on-dark-2",
      wanted: "bg-white/10 text-white",
      open: "border-rule-dark text-on-dark-2",
      openHighlight: "border-orange text-orange",
      accent: "text-orange",
      close: "text-on-dark-2 hover:text-white",
      button: "outline-on-dark"
    };
  }
  return {
    surface: "border-rule bg-white",
    primary: "text-fg",
    muted: "text-fg-muted",
    faint: "text-fg-muted",
    rule: "border-rule",
    chip: "bg-navy/[0.07] text-fg-muted",
    wanted: "bg-navy/[0.07] text-navy",
    open: "border-rule text-fg-muted",
    openHighlight: "border-orange-deep text-orange-deep",
    accent: "text-orange-deep",
    close: "text-fg-muted hover:text-fg",
    button: "outline-on-light"
  };
}
