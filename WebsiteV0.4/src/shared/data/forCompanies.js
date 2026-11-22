// ═════════════════════════════════════════════════════════════════════════════
//  FOR COMPANIES  —  every word on the /voor-bedrijven page.
//
//  ★ EDIT THE TEXT OF THE "VOOR BEDRIJVEN" PAGE HERE. ★
//
//  ─── OPEN OR CLOSED ─────────────────────────────────────────────────────────
//  The page has two faces, chosen by ONE switch in src/site.config.js:
//
//      COMPANY_REGISTRATION.open: false   registration is closed. The page
//                                         asks companies to email us to get
//                                         on the mailing list (`closed` below).
//      COMPANY_REGISTRATION.open: true    the registration form is shown
//                                         (`open` below).
//
//  Under either face come the same two blocks, which sell the event:
//      `benefits`   what a company gets out of taking part
//      `history`    the editions held so far
//
//  ─── WHEN REGISTRATION FOR A NEW EDITION OPENS ──────────────────────────────
//   1. Set `open: true` in src/site.config.js (and the new form link there).
//   2. Update the date and times in `open.intro` and `open.facts` below.
//   3. Add the edition that just took place to `history.editions`.
//
//  Everything written as { nl, en } needs both languages.
// ═════════════════════════════════════════════════════════════════════════════
import {
  BriefcaseBusiness,
  CalendarDays,
  FileText,
  GlassWater,
  Globe2,
  GraduationCap,
  Map as MapIcon,
  MapPin,
  Store,
  Users
} from "lucide-react";
import { VENUE } from "../../site.config.js";

export const FOR_COMPANIES = {
  title: { nl: "Voor bedrijven", en: "For companies" },

  // ═══════════════════════════════════════════════════════════════════════════
  //  REGISTRATION CLOSED  —  shown while COMPANY_REGISTRATION.open is false
  // ═══════════════════════════════════════════════════════════════════════════
  closed: {
    /** The opening paragraph. Also the page description for search engines. */
    intro: {
      nl: "De inschrijving voor de bedrijvendag van 26 november 2026 is gesloten. Wilt u er de volgende keer bij zijn? Mail ons, dan zetten wij u op de mailinglijst.",
      en: "Registration for the career day on 26 November 2026 has closed. Would you like to take part next time? Email us and we will add you to the mailing list."
    },

    /** The block with the orange rule and the mail button. */
    heading: {
      nl: "Op de mailinglijst voor de volgende editie",
      en: "Join the mailing list for the next edition"
    },
    body: {
      nl: "Stuur een mail met uw bedrijfsnaam en een contactpersoon. U ontvangt dan de datum, de aanmeldlink en verdere updates zodra die bekend zijn. Vragen over deelname kunt u op hetzelfde adres stellen.",
      en: "Send an email with your company name and a contact person. You will then receive the date, the registration link and further updates as soon as they are known. Questions about taking part are welcome at the same address."
    },
    /** The date of the next edition. Replace this line once it is known. */
    nextEdition: {
      nl: "De datum van de volgende editie is nog niet bekend.",
      en: "The date of the next edition has not been set yet."
    },
    mailButton: { nl: "Mail de organisatie", en: "Email the organisers" },
    /** Filled in as the subject of the email the button starts. */
    mailSubject: {
      nl: "Mailinglijst volgende T.I.S. Bedrijvendag",
      en: "Mailing list for the next T.I.S. Career Day"
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  REGISTRATION OPEN  —  shown while COMPANY_REGISTRATION.open is true
  // ═══════════════════════════════════════════════════════════════════════════
  open: {
    intro: {
      nl: "Wilt u met uw bedrijf deelnemen aan de T.I.S. Bedrijvendag op donderdag 26 november 2026? Meld u aan via het formulier op deze pagina.",
      en: "Would you like your company to take part in the T.I.S. Career Day on Thursday 26 November 2026? Register through the form on this page."
    },

    /** The practical facts above the form. Copy a block to add one. */
    facts: [
      {
        icon: CalendarDays,
        title: { nl: "Wanneer", en: "When" },
        body: {
          nl: "Donderdag 26 november 2026, van 12:00 tot 19:00 uur. Vanaf 16:00 is er een netwerkborrel.",
          en: "Thursday 26 November 2026, from 12:00 to 19:00. Networking drinks from 16:00."
        }
      },
      {
        icon: MapPin,
        title: { nl: "Waar", en: "Where" },
        body: {
          nl: `${VENUE.nameNl}, Delft T.I.S. Campus, ${VENUE.address}.`,
          en: `${VENUE.nameEn}, Delft T.I.S. Campus, ${VENUE.address}.`
        }
      },
      {
        icon: BriefcaseBusiness,
        title: { nl: "Aanmelden", en: "Registering" },
        body: {
          nl: "Via het formulier op deze pagina meldt u uw bedrijf aan voor deelname met een stand. U geeft daarbij uw contactgegevens en uw wensen voor de dag door.",
          en: "The form on this page registers your company for a stand at the event. You provide your contact details and what you need for the day."
        }
      },
      {
        icon: FileText,
        title: { nl: "Wat er daarna gebeurt", en: "What happens next" },
        body: {
          nl: "Na uw aanmelding nemen wij contact op met de praktische informatie: standindeling, opbouwtijden, catering en de plattegrond.",
          en: "After you register we get in touch with the practical information: stand allocation, set-up times, catering and the floor plan."
        }
      }
    ],

    formKicker: { nl: "Aanmeldformulier", en: "Registration form" },
    formHeading: { nl: "Meld uw bedrijf aan", en: "Register your company" },
    formNote: {
      nl: "Vul het formulier in om uw deelname door te geven. Wij nemen daarna contact op over de praktische details.",
      en: "Fill in the form to register your participation. We will then get in touch about the practical details."
    },
    formHelp: {
      nl: "Werkt het ingesloten formulier niet? Gebruik de knop om het in een nieuw tabblad te openen.",
      en: "Embedded form not working? Use the button to open it in a new tab."
    },
    openForm: { nl: "Aanmeldformulier openen", en: "Open registration form" },
    mailUs: { nl: "Of mail ons direct", en: "Or email us directly" },
    formIframeTitle: { nl: "Aanmeldformulier bedrijven", en: "Company registration form" }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  WHAT A COMPANY GETS  —  always shown
  // ═══════════════════════════════════════════════════════════════════════════
  benefits: {
    kicker: { nl: "Deelnemen", en: "Taking part" },
    heading: { nl: "Wat deelname u oplevert", en: "What taking part gives you" },
    intro: {
      nl: "Eén middag op de campus, in gesprek met de technische studenten die u zoekt.",
      en: "One afternoon on campus, talking to the technical students you are looking for."
    },

    /** One block per benefit. Copy a block to add one. */
    items: [
      {
        icon: Store,
        title: { nl: "Een eigen stand", en: "Your own stand" },
        body: {
          nl: "Een middag lang uw eigen plek in de hal op de Delft T.I.S. Campus. Studenten lopen vrij langs en spreken u direct, zonder afspraak.",
          en: "Your own spot in the hall at the Delft T.I.S. Campus for an afternoon. Students walk past freely and talk to you directly, no appointment needed."
        }
      },
      {
        icon: GraduationCap,
        title: { nl: "Studenten van zeven opleidingen", en: "Students from seven programmes" },
        body: {
          nl: "Elektrotechniek, Mechatronica, Werktuigbouwkunde, Technische Natuurkunde, Toegepaste Wiskunde, Technische Bedrijfskunde en HBO-ICT. U geeft vooraf aan welke opleidingen u zoekt.",
          en: "Electrical Engineering, Mechatronics, Mechanical Engineering, Applied Physics, Applied Mathematics, Industrial Engineering & Management and HBO-ICT. You tell us beforehand which programmes you are looking for."
        }
      },
      {
        icon: Globe2,
        title: { nl: "Uw bedrijf op de website", en: "Your company on the website" },
        body: {
          nl: "Een eigen pagina met uw logo, een beschrijving en uw aanbod: stages, afstudeeropdrachten en banen. Studenten filteren de lijst op hun opleiding en vinden u al vóór de dag.",
          en: "Your own page with your logo, a description and what you offer: internships, graduation projects and jobs. Students filter the list by their programme and find you before the day."
        }
      },
      {
        icon: MapIcon,
        title: { nl: "Een plek op de plattegrond", en: "A place on the floor plan" },
        body: {
          nl: "Uw stand staat op de interactieve plattegrond, in de kleuren van de opleidingen die u zoekt. Studenten zien in één oogopslag waar ze moeten zijn.",
          en: "Your stand is on the interactive floor plan, in the colours of the programmes you are looking for. Students see at a glance where to go."
        }
      },
      {
        icon: GlassWater,
        title: { nl: "De netwerkborrel", en: "The networking drinks" },
        body: {
          nl: "Na de standuren volgt de borrel: het informele deel, waar u met een drankje verder praat met studenten en met de andere bedrijven.",
          en: "After the stand hours come the drinks: the informal part, where you carry on talking to students and to the other companies with a drink in hand."
        }
      },
      {
        icon: Users,
        title: { nl: "Door studenten georganiseerd", en: "Organised by students" },
        body: {
          nl: "De bedrijvendag wordt georganiseerd door de studieverenigingen van de campus. U staat dus dicht bij de studenten zelf.",
          en: "The career day is organised by the study associations on campus, so you are close to the students themselves."
        }
      }
    ],

    /** The small print under the blocks. */
    note: {
      nl: "Zo zag deelname er in 2026 uit. De precieze invulling en voorwaarden van de volgende editie ontvangt u per mail.",
      en: "This is what taking part looked like in 2026. You will receive the exact set-up and conditions of the next edition by email."
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  THE EDITIONS SO FAR  —  always shown
  //
  //  `editionId` must match an `id` in src/editions/index.js. The big number
  //  is not typed here: it is that edition's `statValue` if it has one,
  //  otherwise the number of companies in its list.
  //
  //  `links`: `subpage` is "" (the edition's home), "bedrijven" or
  //  "plattegrond".
  // ═══════════════════════════════════════════════════════════════════════════
  history: {
    kicker: { nl: "Eerdere edities", en: "Earlier editions" },
    heading: { nl: "Twee edities in 2026", en: "Two editions in 2026" },
    intro: {
      nl: "Van ruim dertig bedrijven in maart naar veertig in november. Beide edities staan online, met alle deelnemers.",
      en: "From over thirty companies in March to forty in November. Both editions are online, with every participant."
    },
    statLabel: { nl: "bedrijven", en: "companies" },

    editions: [
      {
        editionId: "march-2026",
        name: { nl: "Maart 2026", en: "March 2026" },
        date: { nl: "Donderdag 5 maart 2026", en: "Thursday 5 March 2026" },
        hours: { nl: "13:00–19:00 · borrel vanaf 16:00", en: "13:00–19:00 · drinks from 16:00" },
        body: {
          nl: "Stands van 13:00 tot 16:00, daarna de netwerkborrel. De hele editie is nog te bekijken, met de bedrijven en de plattegrond van die dag.",
          en: "Stands from 13:00 to 16:00, then the networking drinks. The whole edition can still be viewed, with the companies and the floor plan of that day."
        },
        links: [{ subpage: "", label: { nl: "Bekijk maart 2026", en: "View March 2026" } }]
      },
      {
        editionId: "november-2026",
        name: { nl: "November 2026", en: "November 2026" },
        date: { nl: "Donderdag 26 november 2026", en: "Thursday 26 November 2026" },
        hours: { nl: "12:00–19:00 · borrel vanaf 16:00", en: "12:00–19:00 · drinks from 16:00" },
        body: {
          nl: "Stands van 12:00 tot 16:00, daarna de netwerkborrel. Met een pagina per bedrijf en een plattegrond waarop studenten op opleiding zoeken.",
          en: "Stands from 12:00 to 16:00, then the networking drinks. With a page per company and a floor plan that students search by programme."
        },
        links: [
          { subpage: "bedrijven", label: { nl: "Bekijk de bedrijven", en: "See the companies" } },
          { subpage: "plattegrond", label: { nl: "Bekijk de plattegrond", en: "View the floor plan" } }
        ]
      }
    ]
  }
};
