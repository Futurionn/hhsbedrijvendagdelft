// ─────────────────────────────────────────────────────────────────────────────
//  COMPANIES SECTION  —  the "Deelnemende bedrijven" block on a home page:
//  a heading, a link to the full list, and the two scrolling logo rows.
//
//  Shown on any edition whose `showCompanies` is true and whose company list
//  is not empty (see src/editions/index.js -> hasCompanies).
//
//  The headline text lives in src/shared/strings.js, not here.
// ─────────────────────────────────────────────────────────────────────────────
import { useLanguage } from "../context/LanguageContext.jsx";
import { STRINGS } from "../strings.js";
import { CONTACT } from "../../site.config.js";
import { SUBPAGE, editionPath } from "../../editions/index.js";
import { localizeCompanies } from "../companyData.js";
import Button from "../ui/Button.jsx";
import { Container, GRID, SectionMain, SectionRail } from "../ui/Section.jsx";
import CompanyMarquee from "./CompanyMarquee.jsx";

export default function CompaniesSection({ edition, number }) {
  const { lang } = useLanguage();
  const t = STRINGS[lang];

  const companies = localizeCompanies(edition.companies, lang);
  const listPath = editionPath(edition, SUBPAGE.companies);

  return (
    <section
      id="companies"
      aria-labelledby="companies-title"
      className="scroll-mt-4 bg-white py-section dark:bg-ink md:scroll-mt-6"
    >
      <Container className={GRID}>
        <SectionRail number={number}>{t.companiesKicker}</SectionRail>

        <SectionMain>
          <h2 id="companies-title" className="text-title text-fg dark:text-white">
            {t.companiesTitle}
          </h2>
          <div className="mt-6 flex flex-col gap-x-grid gap-y-4 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-[48ch] text-body text-fg-muted dark:text-slate-400">
              {t.companiesSubtitle}
            </p>
            <Button variant="link" arrow="right" to={listPath} className="shrink-0 text-fg dark:text-white">
              {t.companiesViewAll}
            </Button>
          </div>
        </SectionMain>
      </Container>

      {/* Full-bleed: the rows run to the screen edges, outside the grid. */}
      <div className="mt-12 md:mt-16">
        <CompanyMarquee companies={companies} />
      </div>

      <Container className="mt-10 flex flex-col gap-x-grid gap-y-6 md:flex-row md:items-center md:justify-between">
        <Button to={listPath} arrow="right">
          {t.companiesViewAll}
        </Button>
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
    </section>
  );
}
