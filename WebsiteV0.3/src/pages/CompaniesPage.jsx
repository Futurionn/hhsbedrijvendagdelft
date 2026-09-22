// ─────────────────────────────────────────────────────────────────────────────
//  COMPANIES PAGE  —  the full, filterable list of an edition's companies.
//
//  Lives at  /<edition>/bedrijven   e.g. /March2026/bedrijven
//
//  Two web-address options change what it does:
//      ?category=engineering   opens with that filter already applied
//      ?focus=<company-id>     scrolls to that company and rings it in orange
//                              (this is what the floor plan links to)
//
//  The list itself comes from the edition's data/companies.js — not from here.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useMemo, useState } from "react";
import { ExternalLink, Filter, MapPin } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import PageLayout from "../shared/components/PageLayout.jsx";
import CompanyLogo from "../shared/ui/CompanyLogo.jsx";
import { useLanguage } from "../shared/context/LanguageContext.jsx";
import { usePageMeta } from "../shared/hooks/usePageMeta.js";
import { CATEGORY_LABELS, STRINGS } from "../shared/strings.js";
import { collectCategories, localizeCompanies } from "../shared/companyData.js";
import {
  mapButtonClasses,
  surfaceClasses,
  surfaceTextClasses
} from "../shared/companyStyles.js";
import { SUBPAGE, editionPath, hasFloorPlan } from "../editions/index.js";

/** How many characters of the description to show before trimming with "…". */
const DESCRIPTION_LIMIT = 160;

/** How long the orange highlight ring stays on a focused company. */
const HIGHLIGHT_MS = 2400;

function CompanyRow({ company, edition, isHighlighted, showMapLink }) {
  const { lang } = useLanguage();
  const t = STRINGS[lang];
  const labels = CATEGORY_LABELS[lang] ?? CATEGORY_LABELS.en;

  const text = surfaceTextClasses(company.logoTone);
  const hasStand = Number.isInteger(company.stand);

  const description =
    company.description.length > DESCRIPTION_LIMIT
      ? `${company.description.slice(0, DESCRIPTION_LIMIT).trim()}…`
      : company.description;

  return (
    <div
      // The floor plan scrolls to this id.
      id={`company-${company.id}`}
      className={`overflow-hidden rounded-2xl border p-5 shadow-sm transition-colors duration-settle ease-settle ${surfaceClasses(
        company.logoTone
      )} ${
        isHighlighted
          ? "ring-2 ring-orange/70 ring-offset-2 ring-offset-white dark:ring-offset-ink"
          : ""
      }`}
    >
      <div className="grid gap-4 sm:grid-cols-[140px_1fr_auto] sm:items-start">
        <div className="flex h-16 w-full max-w-[140px] items-center justify-start px-3 sm:justify-center">
          <CompanyLogo company={company} size="row" />
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <div className={`text-heading ${text.primary}`}>{company.name}</div>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${text.chip}`}>
              {labels[company.category] ?? company.category}
            </span>
            {hasStand ? (
              <span className="rounded-full bg-orange/10 px-3 py-1 text-caption font-semibold text-orange-deep dark:text-orange">
                {`${t.stand} #${company.stand}`}
              </span>
            ) : null}
          </div>

          <div className={`mt-1 text-sm ${text.secondary}`}>
            {company.industry} - {company.location}
          </div>
          <div className={`mt-3 text-sm leading-relaxed ${text.body}`}>{description}</div>
        </div>

        <div className="flex flex-col items-start gap-2 sm:items-end">
          {hasStand && showMapLink ? (
            <Link
              to={`${editionPath(edition, SUBPAGE.floorPlan)}?stand=${company.stand}`}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-[transform,background-color,box-shadow,color] duration-settle ease-settle active:scale-[0.97] active:duration-press ${mapButtonClasses(
                company.logoTone
              )}`}
            >
              {t.showOnMap}
              <MapPin className="h-4 w-4 text-orange" />
            </Link>
          ) : null}

          <a
            href={company.website}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-orange px-4 py-2 text-caption font-semibold text-navy-deep shadow-lg shadow-orange/20 transition-[transform,background-color,box-shadow] duration-settle ease-settle hover:bg-orange-light active:scale-[0.97] active:duration-press"
          >
            {t.website}
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function CompaniesPage({ edition }) {
  const { lang } = useLanguage();
  const t = STRINGS[lang];
  const labels = CATEGORY_LABELS[lang] ?? CATEGORY_LABELS.en;
  const [searchParams, setSearchParams] = useSearchParams();

  const allCompanies = useMemo(
    () => localizeCompanies(edition.companies, lang),
    [edition.companies, lang]
  );

  // The chosen category lives in the web address rather than in component
  // state, so a filtered list can be bookmarked, shared, and reached with the
  // back button. Everything else follows from the address.
  const category = searchParams.get("category") ?? "all";

  const setCategory = (next) => {
    const params = new URLSearchParams(searchParams);
    if (next === "all") params.delete("category");
    else params.set("category", next);
    // `replace` keeps the back button useful: flicking through filters should
    // not bury the page the visitor arrived from under a dozen history entries.
    setSearchParams(params, { replace: true });
  };

  const [sortAZ, setSortAZ] = useState(true);
  const [highlightedId, setHighlightedId] = useState(null);

  const categories = useMemo(() => collectCategories(allCompanies), [allCompanies]);

  const visibleCompanies = useMemo(() => {
    const filtered =
      category === "all"
        ? allCompanies
        : allCompanies.filter((company) => company.category === category);

    return sortAZ
      ? [...filtered].sort((a, b) => a.name.localeCompare(b.name))
      : filtered;
  }, [allCompanies, category, sortAZ]);

  const focusId = searchParams.get("focus");

  usePageMeta({
    title: `${t.companiesPageTitle} ${edition.label} | T.I.S. Bedrijvendag Delft`,
    description: t.companiesPageIntro,
    canonicalPath: editionPath(edition, SUBPAGE.companies)
  });

  // Arriving with ?focus=... : scroll to that company and ring it briefly.
  useEffect(() => {
    if (!focusId) return;

    const element = document.getElementById(`company-${focusId}`);
    if (!element) return;

    setHighlightedId(focusId);
    element.scrollIntoView({ behavior: "smooth", block: "center" });

    const timer = window.setTimeout(() => {
      setHighlightedId((current) => (current === focusId ? null : current));
    }, HIGHLIGHT_MS);

    return () => window.clearTimeout(timer);
  }, [focusId, visibleCompanies]);

  const showMapLink = hasFloorPlan(edition);

  return (
    <PageLayout title={t.companiesPageTitle} edition={edition} wide>
      <div className="text-slate-700 dark:text-slate-200">{t.companiesPageIntro}</div>

      {allCompanies.length === 0 ? (
        <p className="text-slate-700 dark:text-slate-200">{t.companiesEmpty}</p>
      ) : (
        <>
          {/* -- Filter bar -- */}
          <div className="flex flex-col gap-3 rounded-2xl border border-navy/[0.07] bg-navy/[0.02] p-4 dark:border-white/10 dark:bg-white/5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-navy dark:text-white">
              <Filter className="h-4 w-4 text-orange" />
              {t.filter}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <label className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200">
                <span className="font-semibold">{t.category}:</span>
                <select
                  className="rounded-xl border border-navy/15 bg-white px-3 py-2 text-body text-slate-900 transition-colors duration-settle hover:border-navy/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange/70 dark:border-white/10 dark:bg-ink dark:text-slate-100"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                >
                  {categories.map((key) => (
                    <option key={key} value={key}>
                      {labels[key] ?? key}
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="button"
                className="rounded-xl border border-navy/15 bg-white px-3 py-2 text-body font-semibold text-slate-900 transition-[background-color,border-color] duration-settle ease-settle hover:border-navy/25 active:scale-[0.98] active:duration-press dark:border-white/10 dark:bg-ink dark:text-slate-100"
                onClick={() => setSortAZ((current) => !current)}
                aria-pressed={sortAZ}
              >
                {t.sortAZ}: {sortAZ ? t.on : t.off}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {visibleCompanies.map((company) => (
              <CompanyRow
                key={company.id}
                company={company}
                edition={edition}
                isHighlighted={highlightedId === company.id}
                showMapLink={showMapLink}
              />
            ))}
          </div>
        </>
      )}
    </PageLayout>
  );
}
