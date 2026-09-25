// ─────────────────────────────────────────────────────────────────────────────
//  SITE-WIDE SETTINGS
//
//  Things that are true for the WHOLE website, regardless of which edition you
//  are looking at. Edit-once values: domain, contact addresses, the venue.
//
//  Edition-specific things (dates, hero text, company list) do NOT live here.
//  They live in  src/editions/<edition>/edition.config.js
// ─────────────────────────────────────────────────────────────────────────────

/** Public domain, used to build canonical URLs for search engines. */
export const SITE_URL = "https://hhsbedrijvendagdelft.nl";

/**
 * Which edition the bare domain ("/") shows.
 * Must match an `id` in src/editions/index.js.
 *
 * WHEN A NEW EDITION STARTS: change this one line.
 */
export const ACTIVE_EDITION_ID = "november-2026";

/**
 * Where the old, pre-edition URLs (/companies and /plattegrond) send visitors.
 * Those links were published before editions had their own URLs, so they must
 * keep working.
 *
 * Right now they point at March 2026, because that is the edition that actually
 * has a company list and a floor plan. Once the November company list is live,
 * change this to "november-2026".
 */
export const LEGACY_ROUTE_EDITION_ID = "march-2026";

/** The venue. Shown in the hero, the footer, the FAQ and the legal pages. */
export const VENUE = {
  nameNl: "HHS Delft",
  nameEn: "THUAS Delft",
  /** The campus name, the same in both languages. Shown in the hero. */
  campus: "Delft T.I.S. Campus",
  address: "Rotterdamseweg 137, 2628 AL Delft",
  /** Link used by the "location" pill in the hero. */
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Rotterdamseweg%20137%2C%202628%20AL%20Delft"
};

/** Every email address used on the site, in one place. */
export const CONTACT = {
  /** Official organisation address — footer + company registration. */
  organisation: "bedrijvendagdelft@hhs.nl",
  /** Website maintainer — bug reports, logo changes, listing fixes. */
  webmaster: "voorzitter@rheonline.nl"
};

/** De Haagse Hogeschool's own channels, linked from the footer. */
export const HHS_LINKS = {
  website: "https://www.thuas.com/",
  instagram: "https://www.instagram.com/dehaagsehogeschool/"
};

/** The Microsoft Form companies fill in to register their interest. */
export const COMPANY_REGISTRATION = {
  /** Route on this site that shows the form. */
  route: "/voor-bedrijven",
  /** Opens the form in a new tab. */
  formUrl: "https://forms.cloud.microsoft/e/J6wpapkE6H",
  /** Same form, embedded in an <iframe> on the page. */
  formEmbedUrl: "https://forms.cloud.microsoft/e/J6wpapkE6H?embed=true"
};

/** Who built the site — shown in the FAQ. */
export const CREDITS = {
  authorName: "Mathis Gesquiere",
  authorRole: { nl: "voorzitter van S.V. Rheon", en: "president of S.V. Rheon" },
  authorLinkedIn: "https://linkedin.com/in/mathis-g",
  year: "2026"
};
