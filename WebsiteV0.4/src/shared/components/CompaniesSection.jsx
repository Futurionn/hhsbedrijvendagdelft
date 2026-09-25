// ─────────────────────────────────────────────────────────────────────────────
//  COMPANIES SECTION  —  the "Deelnemende bedrijven" block on a home page:
//  a heading, a link to the full list, and the curved card gallery
//  (CompanyGallery.jsx).
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
import { useMemo } from "react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { STRINGS } from "../strings.js";
import { CONTACT } from "../../site.config.js";
import { SUBPAGE, editionPath } from "../../editions/index.js";
import { localizeCompanies } from "../companyData.js";
import Button from "../ui/Button.jsx";
import { Container, GRID, SectionMain, SectionRail } from "../ui/Section.jsx";
import CompanyGallery from "./CompanyGallery.jsx";

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
  const listPath = editionPath(edition, SUBPAGE.companies);

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
          <div className="mt-6 flex flex-col gap-x-grid gap-y-4 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-[48ch] text-body text-fg-muted dark:text-slate-400">
              {subtitle ?? t.companiesSubtitle}
            </p>
            <Button variant="link" arrow="right" to={listPath} className="shrink-0 text-fg dark:text-white">
              {t.companiesViewAll}
            </Button>
          </div>
        </SectionMain>
      </Container>

      {/* Full-bleed: the rows run to the screen edges, outside the grid. */}
      <div className="mt-6 md:mt-8">
        <CompanyGallery companies={companies} edition={edition} />
      </div>

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
