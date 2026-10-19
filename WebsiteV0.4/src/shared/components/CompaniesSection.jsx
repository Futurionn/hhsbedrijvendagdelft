// ─────────────────────────────────────────────────────────────────────────────
//  COMPANIES SECTION  —  the "Deelnemende bedrijven" block on a home page:
//  a heading, a "What do you study?" picker, the curved card gallery
//  (CompanyGallery.jsx) and, under it, a link to the full list.
//
//  The picker shows three programmes at a time (ET, MT, WTB first, the order
//  of STUDY_KEYS), or as many as fit on a narrow screen, with arrows to page
//  through the rest; it wraps round at either end. Clicking the chosen
//  programme again clears it and shows every company.
//
//  Shown on any edition whose `showCompanies` is true and whose company list
//  is not empty (see src/editions/index.js -> hasCompanies).
//
//  The November home also uses it while its own list is still empty, to show
//  the March companies under a "Vorige editie" heading. That is what the
//  optional `kicker`, `title`, `subtitle`, `showIssues` and `joinsPrevious`
//  props are for.
//
//  The headline text lives in src/shared/strings.js, not here.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { STRINGS, STUDY_LABELS } from "../strings.js";
import { CONTACT } from "../../site.config.js";
import { SUBPAGE, editionPath } from "../../editions/index.js";
import { collectStudies, localizeCompanies, splitByStudy } from "../companyData.js";
import Button from "../ui/Button.jsx";
import Chip from "../ui/Chip.jsx";
import { Container, GRID, SectionMain, SectionRail } from "../ui/Section.jsx";
import CompanyGallery from "./CompanyGallery.jsx";

// At most three programmes per page; fewer when the row is too narrow for
// three (a phone, a narrow window). Sizes are in rem, so they follow the
// phone's 1.5× text (html.pc-on-phone) as the chips do.
const STUDIES_VISIBLE = 3;
const CHIP_MIN_REM = 10; // a chip may shrink from w-56 (14rem) to this
const ARROW_REM = 2.75; // w-11
const GAP_REM = 0.5; // gap-2

/** How many study chips fit next to the two arrows in the element. */
function useStudiesPerPage(ref) {
  const [perPage, setPerPage] = useState(STUDIES_VISIBLE);
  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    const measure = () => {
      const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      const room = element.clientWidth / rem - 2 * (ARROW_REM + GAP_REM);
      const fits = Math.floor((room + GAP_REM) / (CHIP_MIN_REM + GAP_REM));
      setPerPage(Math.max(1, Math.min(STUDIES_VISIBLE, fits)));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);
  return perPage;
}

export default function CompaniesSection({
  edition,
  kicker,
  title,
  subtitle,
  showIssues = true,
  // Directly under another white section: skip the top padding, the
  // section above already supplies the gap.
  joinsPrevious = false
}) {
  const { lang } = useLanguage();
  const t = STRINGS[lang];

  const companies = useMemo(
    () => localizeCompanies(edition.companies, lang),
    [edition.companies, lang]
  );
  const studyLabels = STUDY_LABELS[lang] ?? STUDY_LABELS.en;

  // "What do you study?" — narrows the gallery to the companies looking for
  // that programme. Hidden when the companies carry no study data (March).
  const studies = useMemo(() => collectStudies(companies), [companies]);
  const [study, setStudy] = useState("all");
  const [pageIndex, setPageIndex] = useState(0);
  const pickerRef = useRef(null);
  const perPage = useStudiesPerPage(pickerRef);
  // A carousel of pages (ET/MT/WTB first). The last page is filled up from
  // the one before so it is always full; past it, the arrows come back round
  // to the first page (and back from the first to the last).
  const pageStarts = useMemo(() => {
    const last = Math.max(0, studies.length - perPage);
    const starts = [];
    for (let i = 0; i < last; i += perPage) starts.push(i);
    starts.push(last);
    return starts;
  }, [studies.length, perPage]);
  // A new page size reshuffles the pages: start again from the first.
  useEffect(() => setPageIndex(0), [perPage]);
  const start = pageStarts[pageIndex % pageStarts.length];
  const visibleStudies = studies.slice(start, start + perPage);
  const page = (direction) =>
    setPageIndex((n) => (n + direction + pageStarts.length) % pageStarts.length);
  const pickStudy = (key) => setStudy((current) => (current === key ? "all" : key));
  const shown = useMemo(() => splitByStudy(companies, study).wanted, [companies, study]);

  const listPath =
    editionPath(edition, SUBPAGE.companies) + (study === "all" ? "" : `?study=${study}`);

  return (
    <section
      id="companies"
      aria-labelledby="companies-title"
      className={`scroll-mt-4 overflow-x-clip bg-white pb-section dark:bg-ink md:scroll-mt-6 ${
        joinsPrevious ? "" : "pt-section"
      }`}
    >
      <Container className={GRID}>
        <SectionRail>{kicker ?? t.companiesKicker}</SectionRail>

        <SectionMain>
          <h2 id="companies-title" className="text-title text-fg dark:text-white">
            {title ?? t.companiesTitle}
          </h2>
          <p className="mt-6 max-w-[48ch] text-body text-fg-muted dark:text-slate-400">
            {subtitle ?? t.companiesSubtitle}
          </p>
        </SectionMain>
      </Container>

      {studies.length > 0 ? (
        <Container className="mt-8 flex flex-col items-center gap-4 text-center">
          <p id="companies-study-label" className="text-heading font-medium text-fg dark:text-white">
            {t.companiesStudyFilter}
          </p>
          <div ref={pickerRef} className="flex w-full items-center justify-center gap-2">
            {studies.length > perPage ? (
              <Button
                variant="outline"
                size="sm"
                icon={ChevronLeft}
                aria-label={t.studiesPrevious}
                onClick={() => page(-1)}
                className="w-11 shrink-0 px-0"
              />
            ) : null}
            <div
              role="group"
              aria-labelledby="companies-study-label"
              className="flex min-w-0 justify-center gap-2"
            >
              {visibleStudies.map((key) => (
                <Chip
                  key={key}
                  selected={study === key}
                  onClick={() => pickStudy(key)}
                  count={splitByStudy(companies, key).wanted.length}
                  // Fixed size: paging to longer or shorter names must not
                  // move the arrows out from under the pointer. On a narrow
                  // row the chips shrink alike (min-w-0) and the name wraps.
                  className="h-12 w-56 min-w-0 justify-center text-center leading-tight"
                >
                  {studyLabels[key]?.name ?? key}
                </Chip>
              ))}
            </div>
            {studies.length > perPage ? (
              <Button
                variant="outline"
                size="sm"
                icon={ChevronRight}
                aria-label={t.studiesNext}
                onClick={() => page(1)}
                className="w-11 shrink-0 px-0"
              />
            ) : null}
          </div>
        </Container>
      ) : null}

      {/* Full-bleed: the rows run to the screen edges, outside the grid. */}
      <div className="mt-6 md:mt-8">
        {shown.length > 0 ? (
          <CompanyGallery companies={shown} edition={edition} study={study} />
        ) : (
          <Container>
            <p className="text-body text-fg-muted dark:text-on-dark-2">{t.companiesStudyEmpty}</p>
          </Container>
        )}
      </div>

      <Container className="mt-6 flex justify-center">
        <Button variant="link" to={listPath} className="text-fg dark:text-white">
          {t.companiesViewAll}
        </Button>
      </Container>

      {showIssues ? (
        <Container className="mt-8">
          <p className="text-small text-fg-muted dark:text-slate-400">
            {t.companiesIssuesLabel}{" "}
            <a
              className="font-medium text-fg underline decoration-fg/35 underline-offset-4 transition-colors duration-settle hover:decoration-fg dark:text-white dark:decoration-white/40 dark:hover:decoration-white"
              href={`mailto:${CONTACT.webmaster}`}
            >
              {CONTACT.webmaster}
            </a>
          </p>
        </Container>
      ) : null}
    </section>
  );
}
