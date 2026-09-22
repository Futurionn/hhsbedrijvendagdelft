// ═════════════════════════════════════════════════════════════════════════════
//  NOVEMBER 2026  —  EDITION SETTINGS
//
//  ★ THIS IS THE MAIN FILE YOU EDIT. ★
//
//  Almost every word a visitor reads on the November home page comes from
//  this file. Change the text here and the page updates — you do not need to
//  open any component.
//
//  ─── HOW THE TEXT WORKS ─────────────────────────────────────────────────────
//  Anything written as  { nl: "...", en: "..." }  has a Dutch and an English
//  version. Always fill in both; the site has an NL/EN switch and a missing
//  language shows up as an empty space on the page.
//  A plain "..." (no nl/en) is used for text that is identical in both
//  languages, like a year or an address.
//
//  ─── THE SWITCHES AT THE TOP ────────────────────────────────────────────────
//  `showCompanies` and `showFloorPlan` control whether whole sections of the
//  page exist. Flip one to true once you have filled in the matching data
//  file, and the section, its buttons and its menu links all appear at once.
//
//  ─── ADDING COMPANIES ───────────────────────────────────────────────────────
//  Companies are NOT in this file. They live in
//      src/editions/november-2026/data/companies.js
//  See docs/EDITING.md → "Add a company" for the step-by-step.
// ═════════════════════════════════════════════════════════════════════════════
import {
  BriefcaseBusiness,
  CalendarDays,
  Clock,
  GlassWater,
  MapPinned,
  Users
} from "lucide-react";

export const NOVEMBER_2026_CONTENT = {
  // ═══════════════════════════════════════════════════════════════════════════
  //  SECTION SWITCHES  —  turn parts of the page on and off
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * false → the home page shows the "companies will follow later" update cards.
   * true  → the home page shows the scrolling company logos, and the
   *         /November2026/bedrijven page becomes reachable from the menu.
   *
   * ONLY flip this to true AFTER you have added companies to
   * src/editions/november-2026/data/companies.js
   */
  showCompanies: false,

  /**
   * false → no floor plan anywhere for this edition.
   * true  → the /November2026/plattegrond page and its buttons appear.
   *
   * ONLY flip this to true AFTER you have filled in
   * src/editions/november-2026/data/floorPlan.js
   */
  showFloorPlan: false,

  /**
   * The strip of organising study associations near the bottom of the page.
   * Set to false to remove it entirely.
   */
  showAssociations: true,

  /**
   * The date is confirmed, so the date pill is an "add to calendar" button.
   * It reads the `calendar` block at the bottom of this file.
   */
  showAddToCalendar: true,

  // ═══════════════════════════════════════════════════════════════════════════
  //  HERO  —  the banner at the top of the page
  // ═══════════════════════════════════════════════════════════════════════════

  /** Small spaced-out label above the title. */
  editionKicker: { nl: "Novembereditie", en: "November edition" },

  /** The words between "T.I.S." and the year in the big title. */
  title: { nl: "Bedrijvendag", en: "Career Day" },

  /** Shown in orange at the end of the title. */
  year: "2026",

  /** The paragraph under the title. */
  subtitle: {
    nl: "Donderdag 26 november op de Delft T.I.S. Campus. Ontmoet bedrijven, ontdek stages en starterskansen, en blijf hangen voor de netwerkborrel.",
    en: "Thursday 26 November at the Delft T.I.S. Campus. Meet companies, explore internships and graduate roles, and stay for the networking drinks."
  },

  // ── The three pills under the title ────────────────────────────────────────

  dateValue: { nl: "26 november 2026", en: "26 November 2026" },
  dateTooltip: { nl: "Voeg toe aan agenda", en: "Add to calendar" },

  timeValue: { nl: "13:00–19:00", en: "13:00–19:00" },
  timeTooltip: { nl: "Bekijk het programma", en: "See the programme" },

  // ── The two buttons under the pills ────────────────────────────────────────

  /** Scrolls down to the update section. */
  ctaPrimary: { nl: "Bekijk het programma", en: "See the programme" },

  /** Goes to the company registration form at /voor-bedrijven. */
  ctaRegistration: { nl: "Voor bedrijven", en: "For companies" },

  // ═══════════════════════════════════════════════════════════════════════════
  //  PROGRAMME SECTION  —  shown while `showCompanies` is false
  //
  //  Once the company list goes live this section is replaced by the
  //  scrolling company logos.
  // ═══════════════════════════════════════════════════════════════════════════

  updateKicker: { nl: "PROGRAMMA", en: "PROGRAMME" },
  updateTitle: { nl: "Donderdag 26 november", en: "Thursday 26 November" },
  updateSubtitle: {
    nl: "Datum, tijd en locatie staan vast. De deelnemende bedrijven en de plattegrond volgen zodra de inschrijving rond is.",
    en: "The date, time and venue are confirmed. Participating companies and the floor plan follow once registration closes."
  },

  /**
   * The cards in the programme section.
   * ADD A CARD: copy one { } block, change the icon, title and body.
   * REMOVE A CARD: delete its { } block.
   * `icon` must be imported at the top of this file — browse the available
   * icons at https://lucide.dev/icons
   */
  updateCards: [
    {
      icon: Clock,
      title: { nl: "13:00–16:00", en: "13:00–16:00" },
      body: {
        nl: "Rondlopen en ontdekken. Loop langs de stands, stel je vragen en spreek recruiters en engineers van de deelnemende bedrijven.",
        en: "Walk the floor. Visit the stands, ask your questions, and talk to recruiters and engineers from the participating companies."
      }
    },
    {
      icon: GlassWater,
      title: { nl: "Vanaf 16:00", en: "From 16:00" },
      body: {
        nl: "Netwerkborrel. Het informele deel van de dag, met een drankje erbij, tot 19:00 uur.",
        en: "Networking drinks. The informal half of the day, with a drink in hand, until 19:00."
      }
    },
    {
      icon: BriefcaseBusiness,
      title: { nl: "Voor bedrijven", en: "For companies" },
      body: {
        nl: "Wilt u deelnemen met een stand? Meld uw bedrijf aan via het aanmeldformulier, dan nemen wij contact op over de praktische details.",
        en: "Would you like to join with a stand? Register your company through the form and we will follow up with the practical details."
      }
    }
  ],

  /** Button under the programme cards. */
  updateCta: {
    nl: "Aanmeldformulier openen",
    en: "Open registration form"
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  "WHAT TO EXPECT" SECTION  —  the two-column block further down the page
  // ═══════════════════════════════════════════════════════════════════════════

  aboutKicker: { nl: "WAT JE KUNT VERWACHTEN", en: "WHAT TO EXPECT" },
  aboutTitle: { nl: "Eén middag,", en: "One afternoon," },
  aboutTitleAccent: { nl: "een netwerk verder", en: "a network further" },
  aboutBody: {
    nl: "De bedrijvendag brengt studenten van de Delft T.I.S. Campus en het technische werkveld bij elkaar. Of je nu een stage zoekt, je afstudeeropdracht rond wilt krijgen of gewoon wilt weten wat er na je studie mogelijk is: je loopt binnen zonder afspraak.",
    en: "The career day brings students from the Delft T.I.S. Campus together with the technical industry. Whether you are looking for an internship, lining up a graduation project, or simply curious about what comes after your degree: walk in, no appointment needed."
  },

  /** The orange-bordered notice box. Set to null to remove it. */
  aboutNotice: {
    title: { nl: "Goed om te weten", en: "Good to know" },
    body: {
      nl: "Toegang is gratis en aanmelden is niet nodig. Een cv meenemen is niet verplicht, maar wel handig als je direct met recruiters wilt praten.",
      en: "Entry is free and you do not need to register. Bringing a CV is optional, but useful if you want to talk to recruiters on the spot."
    }
  },

  /** Same card format as `updateCards` above. */
  aboutCards: [
    {
      icon: CalendarDays,
      title: { nl: "Donderdag 26 november", en: "Thursday 26 November" },
      body: {
        nl: "13:00 tot 19:00 uur, met vanaf 16:00 de netwerkborrel.",
        en: "13:00 to 19:00, with networking drinks from 16:00."
      }
    },
    {
      icon: MapPinned,
      title: { nl: "HHS Delft", en: "THUAS Delft" },
      body: {
        nl: "Delft T.I.S. Campus, Rotterdamseweg 137, 2628 AL Delft. Tien minuten fietsen vanaf station Delft.",
        en: "Delft T.I.S. Campus, Rotterdamseweg 137, 2628 AL Delft. A ten-minute cycle from Delft station."
      }
    },
    {
      icon: Users,
      title: { nl: "Voor studenten", en: "For students" },
      body: {
        nl: "Stages, afstudeeropdrachten en startersfuncties, plus de kans om te vragen hoe het werk er echt uitziet.",
        en: "Internships, graduation projects and graduate roles, plus the chance to ask what the work actually looks like."
      }
    },
    {
      icon: BriefcaseBusiness,
      title: { nl: "Voor bedrijven", en: "For companies" },
      body: {
        nl: "Een stand, een middag, en direct contact met technische studenten uit Delft.",
        en: "One stand, one afternoon, and direct contact with technical students in Delft."
      }
    }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  //  CALENDAR  —  used by the date pill when `showAddToCalendar` is true
  //
  //  Times are in UTC and must be written as YYYYMMDDTHHMMSSZ.
  //  The Netherlands is UTC+1 in November, so 12:00Z = 13:00 local time.
  //
  //  The .ics file in /public must match these times — Apple devices use the
  //  file, everyone else is sent to Google Calendar.
  // ═══════════════════════════════════════════════════════════════════════════
  calendar: {
    eventName: "T.I.S. Bedrijvendag 2026",
    startUtc: "20261126T120000Z", // 13:00 Amsterdam
    endUtc: "20261126T180000Z", //   19:00 Amsterdam
    icsFile: "/tis-bedrijvendag-november-2026.ics"
  }
};
