// ═════════════════════════════════════════════════════════════════════════════
//  THE EDITION REGISTRY
//
//  Every edition of the career day is listed here, once. Routing, the footer
//  links, the companies page and the floor plan page all read from this list,
//  so registering an edition here is all it takes to put it on the site.
//
//  ─── HOW TO ADD THE NEXT EDITION (e.g. March 2027) ──────────────────────────
//   1. Copy the whole folder  src/editions/november-2026
//      to                     src/editions/march-2027
//   2. Rename the exports inside the copied files
//      (NOVEMBER_2026_CONTENT -> MARCH_2027_CONTENT, and so on).
//   3. Add a block to the EDITIONS list below, copying the shape of the
//      existing ones.
//   4. In src/site.config.js set  ACTIVE_EDITION_ID = "march-2027"
//      so the bare domain shows the new edition.
//   5. Set the previous edition's `status` to "archived".
//
//  Nothing else needs to change: the URLs, the menu links and the sitemap
//  entries are all generated from this list.
// ═════════════════════════════════════════════════════════════════════════════
import { ACTIVE_EDITION_ID, LEGACY_ROUTE_EDITION_ID } from "../site.config.js";

import MarchHome from "./march-2026/MarchHome.jsx";
import { MARCH_2026_CONTENT } from "./march-2026/edition.config.js";
import { MARCH_2026_COMPANIES } from "./march-2026/data/companies.js";
import { MARCH_2026_FLOOR_PLAN } from "./march-2026/data/floorPlan.js";

import NovemberHome from "./november-2026/NovemberHome.jsx";
import { NOVEMBER_2026_CONTENT } from "./november-2026/edition.config.js";
import { NOVEMBER_2026_COMPANIES } from "./november-2026/data/companies.js";
import { NOVEMBER_2026_FLOOR_PLAN } from "./november-2026/data/floorPlan.js";

/**
 * The URL segment used for sub-pages of an edition.
 * Changing these changes the public web addresses, so only do it deliberately.
 */
export const SUBPAGE = {
  companies: "bedrijven",
  floorPlan: "plattegrond"
};

export const EDITIONS = [
  {
    /** Internal name. Referenced by site.config.js. */
    id: "november-2026",
    /** The URL segment: hhsbedrijvendagdelft.nl/November2026 */
    slug: "November2026",
    /** Shown to visitors, e.g. in the archive link. */
    label: "November 2026",
    /** "active" = upcoming, "archived" = already happened, frozen. */
    status: "active",
    content: NOVEMBER_2026_CONTENT,
    companies: NOVEMBER_2026_COMPANIES,
    floorPlan: NOVEMBER_2026_FLOOR_PLAN,
    Home: NovemberHome
  },
  {
    id: "march-2026",
    slug: "March2026",
    label: "March 2026",
    status: "archived",
    content: MARCH_2026_CONTENT,
    companies: MARCH_2026_COMPANIES,
    floorPlan: MARCH_2026_FLOOR_PLAN,
    Home: MarchHome
  }
];

/** Look an edition up by its internal id. */
export function getEditionById(id) {
  return EDITIONS.find((edition) => edition.id === id) ?? null;
}

/** Look an edition up by its URL segment. Used by the router. */
export function getEditionBySlug(slug) {
  return EDITIONS.find((edition) => edition.slug === slug) ?? null;
}

/** The edition the bare domain "/" shows. Set in site.config.js. */
export function getActiveEdition() {
  return getEditionById(ACTIVE_EDITION_ID) ?? EDITIONS[0];
}

/** Where the old /companies and /plattegrond links point. Set in site.config.js. */
export function getLegacyEdition() {
  return getEditionById(LEGACY_ROUTE_EDITION_ID) ?? getActiveEdition();
}

/**
 * Build a URL inside an edition.
 *
 *   editionPath(edition)                      ->  "/November2026"
 *   editionPath(edition, SUBPAGE.companies)   ->  "/November2026/bedrijven"
 */
export function editionPath(edition, subpage = "") {
  const base = `/${edition.slug}`;
  return subpage ? `${base}/${subpage}` : base;
}

/** True when this edition has companies AND has been switched on. */
export function hasCompanies(edition) {
  return Boolean(edition.content.showCompanies !== false && edition.companies.length > 0);
}

/** True when this edition has a floor plan AND has been switched on. */
export function hasFloorPlan(edition) {
  return Boolean(edition.content.showFloorPlan !== false && edition.floorPlan);
}

/**
 * The associations strip. Shown unless an edition explicitly turns it off with
 * `showAssociations: false`, so an edition that says nothing keeps it.
 */
export function showAssociations(edition) {
  return edition.content.showAssociations !== false;
}
