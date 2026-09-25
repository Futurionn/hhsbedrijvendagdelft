// ═════════════════════════════════════════════════════════════════════════════
//  NOVEMBER 2026  —  HOME PAGE
//
//  Lives at  /November2026  and, because it is the active edition, also at  /
//
//  ─── WHAT THIS FILE IS FOR ──────────────────────────────────────────────────
//  This file decides WHICH SECTIONS appear and IN WHAT ORDER. It contains
//  almost no words — those all come from ./edition.config.js
//
//  So:
//    changing text        ->  edition.config.js
//    adding a company     ->  data/companies.js
//    reordering sections  ->  here (the list at the bottom of this file)
//
//  ─── THE PAGE IN ORDER ──────────────────────────────────────────────────────
//      hero
//      programme      (or the companies, once showCompanies is true)
//      about
//      FAQ
//      associations   (a small row at the top of the dark band)
//      footer         (same navy: the big hover date, then the links)
//
//  To move a section, move its line in the returned block at the bottom.
//  To remove one, delete its line. To add a new one, write a component and
//  drop it in — see docs/EDITING.md → "Add a section".
// ═════════════════════════════════════════════════════════════════════════════
import { useLanguage } from "../../shared/context/LanguageContext.jsx";
import { useScrollToSection } from "../../shared/hooks/useScrollToSection.js";
import { usePageMeta } from "../../shared/hooks/usePageMeta.js";
import { useAddToCalendar } from "../../shared/hooks/useAddToCalendar.js";
import { pick } from "../../shared/i18n.js";
import { STRINGS } from "../../shared/strings.js";
import { PAGE_SURFACE } from "../../shared/theme.js";
import { COMPANY_REGISTRATION, VENUE } from "../../site.config.js";
import { hasCompanies, showAssociations } from "../index.js";

import AboutSection from "../../shared/components/AboutSection.jsx";
import AssociationsSection from "../../shared/components/AssociationsSection.jsx";
import CompaniesSection from "../../shared/components/CompaniesSection.jsx";
import EditionHero from "../../shared/components/EditionHero.jsx";
import FaqSection from "../../shared/components/FaqSection.jsx";
import Footer from "../../shared/components/Footer.jsx";
import SiteHeader from "../../shared/components/SiteHeader.jsx";
import Button from "../../shared/ui/Button.jsx";
import MetaRow from "../../shared/ui/MetaRow.jsx";

import NovemberUpdateSection from "./sections/NovemberUpdateSection.jsx";
import { NOVEMBER_2026_CONTENT as content } from "./edition.config.js";

export default function NovemberHome({ edition }) {
  const { lang } = useLanguage();
  const t = STRINGS[lang];
  const scrollToSection = useScrollToSection();

  // Returns null while the edition has no confirmed date, in which case the
  // date row renders as plain text instead of a button.
  const addToCalendar = useAddToCalendar(
    content.showAddToCalendar ? content.calendar : null,
    pick(content.subtitle, lang)
  );

  // Once companies are added and switched on, the real companies section
  // replaces the "coming later" update cards automatically.
  const showCompanies = hasCompanies(edition);

  usePageMeta({
    title:
      lang === "nl"
        ? "T.I.S. Bedrijvendag November 2026 | De Haagse Hogeschool Delft"
        : "T.I.S. Career Day November 2026 | THUAS Delft",
    description: pick(content.subtitle, lang),
    // Canonical is "/" because this edition is also served on the bare domain.
    canonicalPath: "/"
  });

  return (
    <>
      <SiteHeader edition={edition} />

      <main className={`relative min-h-screen ${PAGE_SURFACE}`}>
        <EditionHero
          kicker={pick(content.editionKicker, lang)}
          title={pick(content.title, lang)}
          year={content.year}
          lede={pick(content.lede, lang)}
          meta={
            <>
              <MetaRow
                label={t.heroLabelWhen}
                value={pick(content.whenValue, lang)}
                detail={pick(content.whenDetail, lang)}
              />
              <MetaRow
                label={t.heroLabelWhere}
                value={VENUE.campus}
                detail={VENUE.address}
                href={VENUE.googleMapsUrl}
              />
            </>
          }
          actions={
            <>
              <Button
                size="lg"
                arrow="down"
                className="justify-between tab:justify-start"
                onClick={() =>
                  scrollToSection(showCompanies ? "companies" : "november-update")
                }
              >
                {pick(content.ctaPrimary, lang)}
              </Button>
              <Button variant="link" arrow="right" to={COMPANY_REGISTRATION.route}>
                {pick(content.ctaRegistration, lang)}
              </Button>
              {addToCalendar ? (
                <Button
                  variant="link"
                  arrow="out"
                  onClick={addToCalendar}
                  className="text-on-dark-2 hover:text-white"
                >
                  {pick(content.dateTooltip, lang)}
                </Button>
              ) : null}
            </>
          }
        />

      {showCompanies ? (
        <CompaniesSection edition={edition} />
      ) : (
        <NovemberUpdateSection />
      )}

      <AboutSection content={content} />
      <FaqSection />
      {showAssociations(edition) ? (
        <AssociationsSection />
      ) : null}
      <Footer edition={edition} bigText={content.bigDate} />
      </main>
    </>
  );
}
