// ─────────────────────────────────────────────────────────────────────────────
//  COMPANY DATA HELPERS
//
//  Every edition keeps its own list of companies in
//      src/editions/<edition>/data/companies.js
//
//  That raw list is deliberately easy to type by hand. This file turns it into
//  the complete, predictable objects the components expect: it fills in
//  sensible defaults, generates an `id` from the name, and resolves the
//  bilingual `{ nl, en }` fields down to plain strings for one language.
//
//  You should not need to touch this file to add or edit a company.
// ─────────────────────────────────────────────────────────────────────────────
import { pick } from "./i18n.js";

/** Shown when a company has no logo file yet. */
const PLACEHOLDER_LOGO = "/logos/WIP.png";

/**
 * Turn a company name into a URL-safe id:
 *   "Berkel Industrial B.V."  ->  "berkel-industrial-b-v"
 *
 * The id is what links point at (?focus=berkel-industrial-b-v) and what the
 * floor plan uses to connect a stand to a company. Set `id:` explicitly on a
 * company if you ever need to keep an old link working after a rename.
 */
export function slugify(name) {
  return String(name ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Fill in every optional field so components never have to check for missing
 * values. Called once per edition, at import time.
 */
export function normalizeCompanies(rawCompanies) {
  return rawCompanies.map((company) => ({
    ...company,
    id: company.id ?? slugify(company.name),
    logo: company.logo ?? PLACEHOLDER_LOGO,
    logoTone: company.logoTone ?? null,
    category: company.category ?? "other",
    industry: company.industry ?? "TBD",
    employees: company.employees ?? "N/A",
    location: company.location ?? "TBD",
    website: company.website ?? "#",
    stand: Number.isInteger(company.stand) ? company.stand : null,
    studies: company.studies ?? {},
    opportunities: company.opportunities ?? [],
    opportunityNote: company.opportunityNote ?? null,
    description: company.description ?? "TBD"
  }));
}

/**
 * Resolve the bilingual fields of one company for the current language.
 * `{ nl: "Delft, NL", en: "Delft, NL" }` becomes just `"Delft, NL"`.
 */
export function localizeCompany(company, lang) {
  return {
    ...company,
    industry: pick(company.industry, lang),
    location: pick(company.location, lang),
    employees: pick(company.employees, lang),
    opportunityNote: company.opportunityNote ? pick(company.opportunityNote, lang) : null,
    description: pick(company.description, lang)
  };
}

/** The same, for a whole list. This is what pages call. */
export function localizeCompanies(companies, lang) {
  return companies.map((company) => localizeCompany(company, lang));
}

/**
 * Build a `{ [companyId]: standNumber }` lookup from a company list.
 * Used to show "Stand #12" on a card and to link a card to the floor plan.
 */
export function buildStandLookup(companies) {
  const lookup = {};
  for (const company of companies) {
    if (Number.isInteger(company.stand)) lookup[company.id] = company.stand;
  }
  return lookup;
}

/**
 * Every category that actually occurs in a company list, alphabetically,
 * with "all" first. Feeds the dropdown on the companies page, so the filter
 * never offers a category with zero results.
 */
export function collectCategories(companies) {
  const used = new Set(companies.map((company) => company.category).filter(Boolean));
  return ["all", ...Array.from(used).sort()];
}

// ─── STUDY PROGRAMMES ───────────────────────────────────────────────────────
//  Each company says per programme whether it is looking for those students
//  ("yes"), open to them ("maybe") or not ("no"). The labels live in
//  STUDY_LABELS in src/shared/strings.js; the keys are listed here once so
//  every filter shows them in the same order.

/** The programmes, in the order the filters show them. */
export const STUDY_KEYS = ["ee", "mt", "wtb", "tn", "tw", "tbk", "ict"];

/** Programmes the company is looking for, in STUDY_KEYS order. */
export function studiesWanted(company) {
  return STUDY_KEYS.filter((key) => company.studies?.[key] === "yes");
}

/** Programmes the company is open to, but not specifically looking for. */
export function studiesOpen(company) {
  return STUDY_KEYS.filter((key) => company.studies?.[key] === "maybe");
}

/** Every programme that at least one company in the list is looking for. */
export function collectStudies(companies) {
  return STUDY_KEYS.filter((key) => companies.some((company) => company.studies?.[key] === "yes"));
}

/**
 * Split a list for one chosen programme: who is looking for it, and who is
 * open to it. `study` "all" (or empty) returns everyone as `wanted`.
 */
export function splitByStudy(companies, study) {
  if (!study || study === "all") return { wanted: companies, open: [] };
  return {
    wanted: companies.filter((company) => company.studies?.[study] === "yes"),
    open: companies.filter((company) => company.studies?.[study] === "maybe")
  };
}
