// ─────────────────────────────────────────────────────────────────────────────
//  MARCH 2026  —  EDITION SETTINGS     *** FROZEN ARCHIVE — DO NOT EDIT ***
//
//  This edition happened on 5 March 2026. Everything below is a record of what
//  the site said on the day. Leave it alone.
//
//  Working on the next edition? Everything you need is in
//      src/editions/november-2026/edition.config.js
// ─────────────────────────────────────────────────────────────────────────────
import { Coffee, FileText, Presentation, Users } from "lucide-react";

export const MARCH_2026_CONTENT = {
  // -- Hero ----------------------------------------------------------------
  editionKicker: { nl: "Maart editie", en: "March edition" },
  title: { nl: "Bedrijvendag", en: "Career Day" },
  year: "2026",
  subtitle: {
    nl: "Ontmoet toonaangevende bedrijven, ontdek kansen en zet de eerste stap naar jouw carrière.",
    en: "Connect with leading companies, explore opportunities, and take the first step towards your career."
  },

  // -- The three pills under the hero title ---------------------------------
  dateValue: { nl: "5 Maart 2026", en: "5 March 2026" },
  dateTooltip: { nl: "Voeg toe aan agenda", en: "Add to calendar" },
  timeValue: { nl: "13u - 19u", en: "13:00 - 19:00" },
  timeTooltip: { nl: "Ga naar planning", en: "Jump to schedule" },

  // -- Hero buttons ---------------------------------------------------------
  ctaCompanies: { nl: "Ontdek bedrijven", en: "Discover Companies" },
  ctaMap: { nl: "Plattegrond", en: "Map" },

  // -- "What to expect" section --------------------------------------------
  aboutKicker: { nl: "WAT JE KUNT VERWACHTEN", en: "WHAT TO EXPECT" },
  aboutTitle: { nl: "Jouw toegangspoort tot", en: "Your gateway to" },
  aboutTitleAccent: { nl: "professioneel succes", en: "professional success" },
  aboutBody: {
    nl: "Career Day 2026 brengt de slimste studenten en toonaangevende bedrijven samen. Of je nu op zoek bent naar een stage, een startersfunctie of je carrièrepad wilt verkennen: dit is jouw kans om waardevolle connecties te leggen.",
    en: "Career Day 2026 brings together top students and leading companies. Whether you're seeking an internship, a graduate role, or exploring career paths, this is your chance to build meaningful connections."
  },
  statValue: "30+",
  statLabel: { nl: "Bedrijven", en: "Companies" },

  // -- The four cards in the "what to expect" grid --------------------------
  aboutCards: [
    {
      icon: Coffee,
      title: { nl: "Planning", en: "Schedule" },
      schedule: [
        { time: "13:00 - 16:00", nl: "Rondlopen & ontdekken", en: "Networking & exploring" },
        { time: "16:00 - 19:00", nl: "Netwerkborrel", en: "Networking drinks" }
      ]
    },
    {
      icon: Users,
      title: { nl: "Netwerksessies", en: "Networking sessions" },
      body: {
        nl: "Kom direct in contact met recruiters en professionals van topbedrijven.",
        en: "Connect directly with recruiters and professionals from top companies."
      }
    },
    {
      icon: Presentation,
      title: { nl: "Bedrijfspresentaties", en: "Company presentations" },
      body: {
        nl: "Volg inspirerende talks en leer over bedrijfscultuur en kansen.",
        en: "Attend talks and learn about company culture and opportunities."
      }
    },
    {
      icon: FileText,
      title: { nl: "CV-check", en: "CV review" },
      body: {
        nl: "Krijg feedback op je cv van professionals en HR-specialisten.",
        en: "Get professional feedback on your resume from HR specialists."
      }
    }
  ],

  // -- "Add to calendar" button ---------------------------------------------
  //  Apple devices get the .ics download (it opens Apple Calendar directly);
  //  everyone else is sent to Google Calendar's prefilled "new event" screen.
  calendar: {
    eventName: "T.I.S. Career Day 2026",
    /** UTC, format YYYYMMDDTHHMMSSZ. 12:00Z = 13:00 Amsterdam time. */
    startUtc: "20260305T120000Z",
    endUtc: "20260305T180000Z",
    /** File in /public. */
    icsFile: "/tis-career-day-2026.ics"
  }
};
