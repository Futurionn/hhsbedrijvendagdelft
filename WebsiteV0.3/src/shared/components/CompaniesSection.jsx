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
import SectionHeading from "../ui/SectionHeading.jsx";
import CompanyMarquee from "./CompanyMarquee.jsx";

export default function CompaniesSection({ edition }) {
  const { lang } = useLanguage();
  const t = STRINGS[lang];

  const companies = localizeCompanies(edition.companies, lang);
  const listPath = editionPath(edition, SUBPAGE.companies);

  return (
    <section id="companies" className="scroll-mt-4 bg-white py-16 dark:bg-ink md:py-20 md:scroll-mt-6">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          kicker={t.companiesKicker}
          title={t.companiesTitle}
          subtitle={t.companiesSubtitle}
        />

        <p className="mx-auto mt-3 max-w-2xl text-center text-caption text-slate-500 dark:text-slate-400">
          {t.companiesIssuesLabel}{" "}
          <a className="font-semibold text-orange-deep dark:text-orange" href={`mailto:${CONTACT.webmaster}`}>
            {CONTACT.webmaster}
          </a>
        </p>

        <div className="mt-4 text-center">
          <Button to={listPath}>{t.companiesViewAll} →</Button>
        </div>
      </div>

      {/* Full-bleed: the rows run to the screen edges, outside the max-width. */}
      <CompanyMarquee companies={companies} />

      <div className="mx-auto mt-10 max-w-6xl px-6 text-center">
        <Button to={listPath}>{t.companiesViewAll} →</Button>
      </div>
    </section>
  );
}
