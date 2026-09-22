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
//      companies      (once showCompanies is true — update cards until then)
//      about
//      associations
//      footer
//
//  To move a section, move its line in the returned block at the bottom.
//  To remove one, delete its line. To add a new one, write a component and
//  drop it in — see docs/EDITING.md → "Add a section".
// ═════════════════════════════════════════════════════════════════════════════
import { BriefcaseBusiness, CalendarDays, Clock, MapPin } from "lucide-react";
import { useLanguage } from "../../shared/context/LanguageContext.jsx";
import { useScrollToSection } from "../../shared/hooks/useScrollToSection.js";
import { usePageMeta } from "../../shared/hooks/usePageMeta.js";
import { useAddToCalendar } from "../../shared/hooks/useAddToCalendar.js";
import { pick } from "../../shared/i18n.js";
import { PAGE_SURFACE } from "../../shared/theme.js";
import { COMPANY_REGISTRATION, VENUE } from "../../site.config.js";
import { hasCompanies, showAssociations } from "../index.js";

import AboutSection from "../../shared/components/AboutSection.jsx";
import AssociationsSection from "../../shared/components/AssociationsSection.jsx";
import CompaniesSection from "../../shared/components/CompaniesSection.jsx";
import EditionHero from "../../shared/components/EditionHero.jsx";
import Footer from "../../shared/components/Footer.jsx";
import SiteHeader from "../../shared/components/SiteHeader.jsx";
import Button from "../../shared/ui/Button.jsx";
import HeroPill from "../../shared/ui/HeroPill.jsx";

import NovemberUpdateSection from "./sections/NovemberUpdateSection.jsx";
import { NOVEMBER_2026_CONTENT as content } from "./edition.config.js";

export default function NovemberHome({ edition }) {
  const { lang } = useLanguage();
  const scrollToSection = useScrollToSection();

  // Returns null while the edition has no confirmed date, in which case the
  // date pill renders as plain text instead of a button.
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
        subtitle={pick(content.subtitle, lang)}
        pills={
          <>
            <HeroPill
              icon={CalendarDays}
              label={pick(content.dateValue, lang)}
              tooltip={addToCalendar ? pick(content.dateTooltip, lang) : undefined}
              onClick={addToCalendar}
            />
            <HeroPill
              icon={Clock}
              label={pick(content.timeValue, lang)}
              tooltip={pick(content.timeTooltip, lang)}
              onClick={() =>
                scrollToSection(showCompanies ? "companies" : "november-update", -20)
              }
            />
            <HeroPill
              icon={MapPin}
              label={lang === "nl" ? VENUE.nameNl : VENUE.nameEn}
              tooltip={VENUE.address}
              href={VENUE.googleMapsUrl}
            />
          </>
        }
        actions={
          <>
            <Button
              size="lg"
              onClick={() =>
                scrollToSection(showCompanies ? "companies" : "november-update")
              }
            >
              {pick(content.ctaPrimary, lang)}
            </Button>
            <Button size="lg" variant="ghost" to={COMPANY_REGISTRATION.route} icon={BriefcaseBusiness}>
              {pick(content.ctaRegistration, lang)}
            </Button>
          </>
        }
      />

      {showCompanies ? (
        <CompaniesSection edition={edition} />
      ) : (
        <NovemberUpdateSection />
      )}

      <AboutSection content={content} />
      {showAssociations(edition) ? <AssociationsSection /> : null}
      <Footer edition={edition} showCta />
      </main>
    </>
  );
}
