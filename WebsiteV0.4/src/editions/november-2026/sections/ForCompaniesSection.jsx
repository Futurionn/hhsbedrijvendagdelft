// ─────────────────────────────────────────────────────────────────────────────
//  FOR COMPANIES SECTION  —  the full-width "Voor bedrijven" link row, just
//  above the FAQ. Leads to the company registration form.
//
//      ────────────────────────────────────────────────────────────
//      Voor bedrijven             (orange underline draws in on hover)
//      Wilt u deelnemen met een stand? ...
//      ────────────────────────────────────────────────────────────
//
//  The text is `updateCompanies` in ../edition.config.js.
// ─────────────────────────────────────────────────────────────────────────────
import { Link } from "react-router-dom";
import { useLanguage } from "../../../shared/context/LanguageContext.jsx";
import { pick } from "../../../shared/i18n.js";
import { COMPANY_REGISTRATION } from "../../../site.config.js";
import { Container, GRID, SectionMain } from "../../../shared/ui/Section.jsx";
import { NOVEMBER_2026_CONTENT as content } from "../edition.config.js";

export default function ForCompaniesSection() {
  const { lang } = useLanguage();
  const companies = content.updateCompanies;
  if (!companies) return null;

  return (
    <section className="bg-white pb-section dark:bg-ink">
      <Container className={GRID}>
        <SectionMain>
          <Link
            to={COMPANY_REGISTRATION.route}
            className="bizlink grid grid-cols-1 items-center gap-4 border-b border-t border-b-rule border-t-rule-strong py-8 dark:border-b-white/15 dark:border-t-white/70"
          >
            <div>
              <strong className="bizlink-title inline text-title font-normal leading-none text-fg dark:text-white">
                {pick(companies.title, lang)}
              </strong>
              <span className="mt-[0.6rem] block max-w-[60ch] text-body text-fg-muted dark:text-slate-400">
                {pick(companies.body, lang)}
              </span>
            </div>
          </Link>
        </SectionMain>
      </Container>
    </section>
  );
}
