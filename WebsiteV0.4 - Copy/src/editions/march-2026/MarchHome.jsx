// ─────────────────────────────────────────────────────────────────────────────
//  MARCH 2026  —  HOME PAGE          *** FROZEN ARCHIVE — DO NOT EDIT ***
//
//  Lives at  /March2026
//
//  This page is a record of an event that has already happened. Do not change
//  its wording or its sections. (Shared components and styling improvements do
//  reach this page — that is intentional — but its CONTENT stays as it was.)
//
//  The page in order:
//      hero  ->  company logos  ->  what to expect  ->  associations  ->  footer
// ─────────────────────────────────────────────────────────────────────────────
import { Calendar, Clock, MapPin } from "lucide-react";
import { useLanguage } from "../../shared/context/LanguageContext.jsx";
import { useScrollToSection } from "../../shared/hooks/useScrollToSection.js";
import { usePageMeta } from "../../shared/hooks/usePageMeta.js";
import { useAddToCalendar } from "../../shared/hooks/useAddToCalendar.js";
import { pick } from "../../shared/i18n.js";
import { PAGE_SURFACE } from "../../shared/theme.js";
import { VENUE } from "../../site.config.js";
import { SUBPAGE, editionPath, showAssociations } from "../index.js";

import AboutSection from "../../shared/components/AboutSection.jsx";
import AssociationsSection from "../../shared/components/AssociationsSection.jsx";
import CompaniesSection from "../../shared/components/CompaniesSection.jsx";
import EditionHero from "../../shared/components/EditionHero.jsx";
import Footer from "../../shared/components/Footer.jsx";
import SiteHeader from "../../shared/components/SiteHeader.jsx";
import Button from "../../shared/ui/Button.jsx";
import HeroPill from "../../shared/ui/HeroPill.jsx";

import { MARCH_2026_CONTENT as content } from "./edition.config.js";

export default function MarchHome({ edition }) {
  const { lang } = useLanguage();
  const scrollToSection = useScrollToSection();
  const addToCalendar = useAddToCalendar(content.calendar, pick(content.subtitle, lang));

  usePageMeta({
    title:
      lang === "nl"
        ? "T.I.S. Bedrijvendag Maart 2026 (archief) | De Haagse Hogeschool Delft"
        : "T.I.S. Career Day March 2026 (archive) | THUAS Delft",
    description: pick(content.subtitle, lang),
    canonicalPath: editionPath(edition)
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
              icon={Calendar}
              label={pick(content.dateValue, lang)}
              tooltip={pick(content.dateTooltip, lang)}
              onClick={addToCalendar}
            />
            <HeroPill
              icon={Clock}
              label={pick(content.timeValue, lang)}
              tooltip={pick(content.timeTooltip, lang)}
              onClick={() => scrollToSection("about", 20)}
            />
            <HeroPill
              icon={MapPin}
              label={lang === "nl" ? VENUE.nameNl : VENUE.nameEn}
              tooltip={`📍 ${VENUE.address}`}
              href={VENUE.googleMapsUrl}
            />
          </>
        }
        actions={
          <>
            <Button size="lg" onClick={() => scrollToSection("companies")}>
              {pick(content.ctaCompanies, lang)}
            </Button>
            <Button size="lg" variant="ghost" to={editionPath(edition, SUBPAGE.floorPlan)}>
              {pick(content.ctaMap, lang)}
            </Button>
          </>
        }
      />

      <CompaniesSection edition={edition} />
      <AboutSection content={content} />
      {showAssociations(edition) ? <AssociationsSection /> : null}
      <Footer edition={edition} showCta />
      </main>
    </>
  );
}
