// ─────────────────────────────────────────────────────────────────────────────
//  COMPANIES PAGE  —  the full, filterable list of an edition's companies.
//
//  Lives at  /<edition>/bedrijven   e.g. /November2026/bedrijven
//
//  Filters (all kept in the web address, so a filtered list can be shared):
//      ?study=ee               only companies looking for that programme,
//                              followed by the ones that are open to it
//      ?offer=internship       only companies offering that (internship,
//                              graduation, traineeship, job)
//      ?category=engineering   the sector category
//      ?q=abb                  only companies whose name contains this
//                              (the search box, see CompanySearch.jsx)
//      ?focus=<company-id>     scrolls to that company and rings it in orange
//                              (this is what the floor plan links to)
//
//  And one longer address:
//      /<edition>/bedrijven/<company-id>
//                              the same list, opened at that company with its
//                              full description. This is where "Meer info" on
//                              the home-page gallery leads.
//
//  The study and offer filters only appear when the edition's companies carry
//  that data (November does, the March archive does not).
//
//  The list itself comes from the edition's data/companies.js — not from here.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useMemo, useState } from "react";
import { MapPin } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom";
import PageLayout from "../shared/components/PageLayout.jsx";
import CompanySearch, { matchesSearch } from "../shared/components/CompanySearch.jsx";
import CompanyTags from "../shared/components/CompanyTags.jsx";
import Button from "../shared/ui/Button.jsx";
import Chip from "../shared/ui/Chip.jsx";
import CompanyLogo from "../shared/ui/CompanyLogo.jsx";
import { useLanguage } from "../shared/context/LanguageContext.jsx";
import { usePageMeta } from "../shared/hooks/usePageMeta.js";
import { CATEGORY_LABELS, OPPORTUNITY_LABELS, STRINGS, STUDY_LABELS } from "../shared/strings.js";
import {
  collectCategories,
  collectStudies,
  localizeCompanies,
  splitByStudy
} from "../shared/companyData.js";
import { cardPalette } from "../shared/companyStyles.js";
import { SUBPAGE, editionPath, hasFloorPlan } from "../editions/index.js";

/** Descriptions longer than this get a "Lees meer" toggle. */
const DESCRIPTION_LIMIT = 220;

/** How long the orange highlight ring stays on a focused company. */
const HIGHLIGHT_MS = 2400;

const OFFER_KEYS = ["internship", "graduation", "traineeship", "job"];

function CompanyRow({ company, edition, study, isHighlighted, isOpened, showMapLink }) {
  const { lang } = useLanguage();
  const t = STRINGS[lang];
  const labels = CATEGORY_LABELS[lang] ?? CATEGORY_LABELS.en;
  const [expanded, setExpanded] = useState(isOpened);
  useEffect(() => setExpanded(isOpened), [isOpened]);

  const hasStand = Number.isInteger(company.stand);
  // White card (navy for white logos) in BOTH themes: the logos are made for
  // it. Text follows the card, not the theme.
  const c = cardPalette(company.logoTone);
  const isLong = company.description.length > DESCRIPTION_LIMIT;

  const facts = [
    [t.industry, company.industry],
    [t.region, company.location],
    [t.employees, company.employees],
    [t.stand, hasStand ? `#${company.stand}` : null]
  ].filter(([, value]) => value && value !== "N/A" && value !== "TBD");

  return (
    <article
      // The floor plan scrolls to this id.
      id={`company-${company.id}`}
      className={`scroll-mt-28 rounded-sm border p-5 @container transition-shadow duration-settle ease-settle sm:p-6 ${c.surface} ${
        isHighlighted ? "ring-2 ring-orange ring-offset-2 ring-offset-white dark:ring-offset-ink" : ""
      }`}
    >
      {/* Logo beside the text only when the card itself has the room. */}
      <div className="grid gap-5 @2xl:grid-cols-[176px_minmax(0,1fr)] @2xl:gap-7">
        <div className="flex h-20 items-center justify-start px-1 @2xl:h-28 @2xl:justify-center">
          <CompanyLogo company={company} size="row" />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h2 className={`text-heading ${c.primary}`}>{company.name}</h2>
            <span className={`rounded-sm px-2 py-0.5 text-caption font-medium ${c.chip}`}>
              {labels[company.category] ?? company.category}
            </span>
          </div>

          <dl className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-small">
            {facts.map(([label, value]) => (
              <div key={label} className="flex gap-1.5">
                <dt className={c.muted}>{label}:</dt>
                <dd className={c.primary}>{value}</dd>
              </div>
            ))}
          </dl>

          <p
            className={`mt-4 max-w-[75ch] text-body ${c.primary} ${
              isLong && !expanded ? "line-clamp-3" : ""
            }`}
          >
            {company.description}
          </p>
          {isLong ? (
            <Button
              variant="link"
              onClick={() => setExpanded((current) => !current)}
              aria-expanded={expanded}
              className={`mt-1 text-small ${c.primary}`}
            >
              {expanded ? t.readLess : t.readMore}
            </Button>
          ) : null}

          <div className={`mt-5 border-t pt-4 ${c.rule}`}>
            <CompanyTags company={company} highlight={study} />
            {company.opportunityNote ? (
              <p className={`mt-3 max-w-[75ch] border-l-2 border-orange pl-3 text-small ${c.muted}`}>
                {company.opportunityNote}
              </p>
            ) : null}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
            {company.website && company.website !== "#" ? (
              <Button href={company.website} variant={c.button} size="sm" arrow="out">
                {t.website}
              </Button>
            ) : null}
            {hasStand && showMapLink ? (
              <Button
                to={`${editionPath(edition, SUBPAGE.floorPlan)}?stand=${company.stand}`}
                variant={c.button}
                size="sm"
                iconRight={MapPin}
              >
                {t.showOnMap}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

function FilterGroup({ label, children }) {
  return (
    <div className="grid gap-2 @2xl:grid-cols-[9rem_1fr] @2xl:items-start">
      <p className="pt-2 text-small font-medium text-fg dark:text-white">{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

export default function CompaniesPage({ edition }) {
  const { lang } = useLanguage();
  const t = STRINGS[lang];
  const labels = CATEGORY_LABELS[lang] ?? CATEGORY_LABELS.en;
  const studyLabels = STUDY_LABELS[lang] ?? STUDY_LABELS.en;
  const offerLabels = OPPORTUNITY_LABELS[lang] ?? OPPORTUNITY_LABELS.en;
  const [searchParams, setSearchParams] = useSearchParams();

  const allCompanies = useMemo(
    () => localizeCompanies(edition.companies, lang),
    [edition.companies, lang]
  );

  // Filters live in the web address rather than in component state, so a
  // filtered list can be bookmarked, shared, and reached with the back button.
  const category = searchParams.get("category") ?? "all";
  const study = searchParams.get("study") ?? "all";
  const offer = searchParams.get("offer") ?? "all";
  const query = searchParams.get("q") ?? "";

  const setQuery = (next) => {
    const params = new URLSearchParams(searchParams);
    if (next) params.set("q", next);
    else params.delete("q");
    params.delete("focus");
    setSearchParams(params, { replace: true });
  };

  // A picked suggestion: fill in its name and point at it (?focus=), in one go.
  const pickCompany = (company) => {
    const params = new URLSearchParams(searchParams);
    params.set("q", company.name);
    params.set("focus", company.id);
    setSearchParams(params, { replace: true });
  };

  const setParam = (key, next) => {
    const params = new URLSearchParams(searchParams);
    if (next === "all") params.delete(key);
    else params.set(key, next);
    // `replace` keeps the back button useful: flicking through filters should
    // not bury the page the visitor arrived from under a dozen history entries.
    setSearchParams(params, { replace: true });
  };

  const resetFilters = () => {
    const params = new URLSearchParams(searchParams);
    ["category", "study", "offer", "q"].forEach((key) => params.delete(key));
    setSearchParams(params, { replace: true });
  };

  const [sortAZ, setSortAZ] = useState(true);
  const [highlightedId, setHighlightedId] = useState(null);

  const categories = useMemo(() => collectCategories(allCompanies), [allCompanies]);
  const studies = useMemo(() => collectStudies(allCompanies), [allCompanies]);
  const offers = useMemo(
    () => OFFER_KEYS.filter((key) => allCompanies.some((c) => c.opportunities.includes(key))),
    [allCompanies]
  );

  // Category and offer narrow the list; the study then splits it into
  // "looking for you" and "also open to you".
  const { wanted, open } = useMemo(() => {
    const narrowed = allCompanies.filter(
      (company) =>
        (category === "all" || company.category === category) &&
        (offer === "all" || company.opportunities.includes(offer)) &&
        matchesSearch(company, query)
    );
    const sorted = sortAZ ? [...narrowed].sort((a, b) => a.name.localeCompare(b.name)) : narrowed;
    return splitByStudy(sorted, study);
  }, [allCompanies, category, offer, study, sortAZ, query]);

  // What the search box suggests: everyone the other filters let through,
  // so a suggestion never leads to an empty list.
  const searchable = useMemo(
    () =>
      allCompanies.filter(
        (company) =>
          (category === "all" || company.category === category) &&
          (offer === "all" || company.opportunities.includes(offer)) &&
          (study === "all" || company.studies?.[study] === "yes" || company.studies?.[study] === "maybe")
      ),
    [allCompanies, category, offer, study]
  );

  // Counts on the study chips, for the current category/offer.
  const studyCount = (key) =>
    allCompanies.filter(
      (company) =>
        company.studies?.[key] === "yes" &&
        (category === "all" || company.category === category) &&
        (offer === "all" || company.opportunities.includes(offer)) &&
        matchesSearch(company, query)
    ).length;

  // /bedrijven/<id> opens a company in full; ?focus=<id> only points at it.
  const { companyId } = useParams();
  const focusId = companyId ?? searchParams.get("focus");
  const openCompany = companyId ? allCompanies.find((company) => company.id === companyId) : null;

  usePageMeta({
    title: openCompany
      ? `${openCompany.name} | ${t.companiesPageTitle} ${edition.label} | T.I.S. Bedrijvendag Delft`
      : `${t.companiesPageTitle} ${edition.label} | T.I.S. Bedrijvendag Delft`,
    description: t.companiesPageIntro,
    canonicalPath: editionPath(edition, SUBPAGE.companies)
  });

  // Arriving with ?focus=... : scroll to that company and ring it briefly.
  useEffect(() => {
    if (!focusId) return;

    const element = document.getElementById(`company-${focusId}`);
    if (!element) return;

    setHighlightedId(focusId);
    // Arriving from another page the list is still fading in, so jump
    // straight there; within the page, glide.
    element.scrollIntoView({ behavior: companyId ? "instant" : "smooth", block: "start" });
    if (companyId) return undefined; // an opened company keeps its ring

    const timer = window.setTimeout(() => {
      setHighlightedId((current) => (current === focusId ? null : current));
    }, HIGHLIGHT_MS);

    return () => window.clearTimeout(timer);
  }, [focusId, companyId]);

  const showMapLink = hasFloorPlan(edition);
  const filtersActive = category !== "all" || study !== "all" || offer !== "all" || query !== "";
  const total = wanted.length + open.length;

  const renderRow = (company) => (
    <CompanyRow
      key={company.id}
      company={company}
      edition={edition}
      study={study}
      isHighlighted={highlightedId === company.id}
      isOpened={companyId === company.id}
      showMapLink={showMapLink}
    />
  );

  return (
    <PageLayout title={t.companiesPageTitle} edition={edition} wide>
      <p className="max-w-[60ch] text-body text-fg-muted dark:text-on-dark-2">{t.companiesPageIntro}</p>

      {allCompanies.length === 0 ? (
        <p className="text-body text-fg dark:text-white">{t.companiesEmpty}</p>
      ) : (
        <>
          {/* -- Filters -- */}
          <div className="space-y-4 rounded-sm border border-rule bg-navy/[0.025] p-4 @container dark:border-rule-dark dark:bg-white/[0.04] sm:p-5">
            <CompanySearch
              companies={searchable}
              value={query}
              onChange={setQuery}
              onPick={pickCompany}
            />

            {studies.length > 0 ? (
              <FilterGroup label={t.filterStudy}>
                <Chip selected={study === "all"} onClick={() => setParam("study", "all")}>
                  {t.filterAllStudies}
                </Chip>
                {studies.map((key) => (
                  <Chip
                    key={key}
                    selected={study === key}
                    onClick={() => setParam("study", key)}
                    count={studyCount(key)}
                  >
                    {studyLabels[key]?.name ?? key}
                  </Chip>
                ))}
              </FilterGroup>
            ) : null}

            {offers.length > 0 ? (
              <FilterGroup label={t.filterOffer}>
                <Chip selected={offer === "all"} onClick={() => setParam("offer", "all")}>
                  {t.filterAllOffers}
                </Chip>
                {offers.map((key) => (
                  <Chip key={key} selected={offer === key} onClick={() => setParam("offer", key)}>
                    {offerLabels[key] ?? key}
                  </Chip>
                ))}
              </FilterGroup>
            ) : null}

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-rule pt-4 dark:border-rule-dark">
              <div className="flex flex-wrap items-center gap-3">
                <label className="flex items-center gap-2 text-small text-fg dark:text-white">
                  <span className="font-medium">{t.category}</span>
                  <select
                    className="min-h-10 rounded-sm border border-rule bg-white px-3 text-small text-fg transition-colors duration-settle hover:border-navy/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange dark:border-rule-dark dark:bg-ink dark:text-white"
                    value={category}
                    onChange={(event) => setParam("category", event.target.value)}
                  >
                    {categories.map((key) => (
                      <option key={key} value={key}>
                        {labels[key] ?? key}
                      </option>
                    ))}
                  </select>
                </label>
                <Chip selected={sortAZ} onClick={() => setSortAZ((current) => !current)}>
                  {t.sortAZ}
                </Chip>
              </div>

              <div className="flex items-center gap-4 text-small">
                <span className="tabular-nums text-fg-muted dark:text-on-dark-2" aria-live="polite">
                  {t.filterCount(total)}
                </span>
                {filtersActive ? (
                  <Button variant="link" onClick={resetFilters} className="text-fg dark:text-white">
                    {t.filterReset}
                  </Button>
                ) : null}
              </div>
            </div>
          </div>

          {/* -- The list -- */}
          {total === 0 ? (
            <p className="text-body text-fg-muted dark:text-on-dark-2">{t.filterNoResults}</p>
          ) : null}

          <div className="space-y-4">{wanted.map(renderRow)}</div>

          {open.length > 0 ? (
            <div className="space-y-4 pt-6">
              <div>
                <h2 className="text-heading text-fg dark:text-white">
                  {t.filterOpenHeading(studyLabels[study]?.name ?? study)}
                </h2>
                <p className="mt-1 text-small text-fg-muted dark:text-on-dark-2">{t.filterOpenBody}</p>
              </div>
              {open.map(renderRow)}
            </div>
          ) : null}
        </>
      )}
    </PageLayout>
  );
}
