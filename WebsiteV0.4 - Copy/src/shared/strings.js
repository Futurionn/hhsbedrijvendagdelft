// ─────────────────────────────────────────────────────────────────────────────
//  SITE-WIDE TEXT  (Dutch + English)
//
//  Text that appears on MORE THAN ONE page lives here: buttons, footer links,
//  table headers, the companies filter, and so on.
//
//  Text that belongs to ONE edition (hero title, event date, the "what to
//  expect" cards) does NOT live here. It lives in that edition's config file:
//      src/editions/november-2026/edition.config.js
//      src/editions/march-2026/edition.config.js
//
//  HOW TO USE IT IN A COMPONENT:
//      const { lang } = useLanguage();
//      const t = STRINGS[lang];
//      <p>{t.footerPrivacy}</p>
//
//  HOW TO ADD A NEW PIECE OF TEXT:
//      1. Add the key to BOTH the `nl` block and the `en` block below.
//      2. Use it as `t.yourNewKey`.
//      Keep the two blocks in the same order so they stay easy to compare.
// ─────────────────────────────────────────────────────────────────────────────

export const STRINGS = {
  // ───────────────────────────────── DUTCH ──────────────────────────────────
  nl: {
    // -- Header / navigation -----------------------------------------------
    navLabel: "Hoofdnavigatie",
    navOpen: "Menu openen",
    navClose: "Menu sluiten",
    navMenu: "Menu",
    navMenuClose: "Sluiten",
    navProgramme: "Programma",
    navAbout: "Over het event",
    navAssociations: "Verenigingen",

    // -- Top bar controls --------------------------------------------------
    switchLanguage: "Wissel van taal",
    toggleDarkMode: "Licht/donker wisselen",
    themeLight: "Licht",
    themeDark: "Donker",
    backToHome: "Terug naar home",
    hhsLogoAlt: "De Haagse Hogeschool",

    // -- Hero ---------------------------------------------------------------
    heroOrganisation: "De Haagse Hogeschool, Delft",
    heroCampus: "Campus",
    tisFullName: "Faculteit Technologie, Innovatie & Samenleving",
    heroLabelWhen: "Wanneer",
    heroLabelWhere: "Waar",

    // -- FAQ section on the home page ---------------------------------------
    faqRail: "FAQ",
    faqTitle: "Veelgestelde vragen",

    // -- Companies section on the home page --------------------------------
    companiesKicker: "Onze partners",
    companiesTitle: "Deelnemende bedrijven",
    companiesSubtitle:
      "Beweeg over een bedrijf om meer te leren over hun missie en beschikbare mogelijkheden.",
    companiesViewAll: "Bekijk alle bedrijven",
    companiesIssuesLabel: "Problemen met uw bedrijf representatie?",
    companiesEmpty:
      "De bedrijvenlijst voor deze editie is nog niet gepubliceerd. Zodra de deelnemers bekend zijn, verschijnen ze hier.",
    companiesGalleryHint: "Sleep of veeg om te bladeren, klik op een bedrijf voor meer info.",
    companiesPreviousKicker: "Vorige editie",
    companiesPreviousTitle: "Zij waren er in maart",
    companiesPreviousSubtitle:
      "De bedrijven voor november volgen nog. Dit waren de deelnemers van maart 2026.",
    galleryPrevious: "Vorig bedrijf",
    galleryNext: "Volgend bedrijf",
    galleryClose: "Sluiten",

    // -- Companies list page -----------------------------------------------
    companiesPageTitle: "Bedrijven",
    companiesPageIntro:
      "Bekijk alle deelnemende bedrijven. Gebruik de filter om snel te zoeken.",
    filter: "Filter",
    category: "Categorie",
    sortAZ: "Sorteer A-Z",
    on: "aan",
    off: "uit",
    showOnMap: "Toon op kaart",
    stand: "Stand",
    website: "Website",

    // -- Company card details ----------------------------------------------
    industry: "Sector",
    employees: "Medewerkers",
    region: "Regio",
    visitWebsite: "Website bezoeken",
    hoverForMoreInfo: "Hover voor meer info",

    // -- Floor plan page ---------------------------------------------------
    mapPageTitle: "Plattegrond",
    mapPageIntro: "Bekijk de interactieve plattegrond van de bedrijvendag.",
    mapBadge: "Interactief",
    mapHeading: "Interactieve plattegrond",
    mapIntro: "Klik op een stand om direct te zien welk bedrijf daar staat.",
    mapHintMouse:
      "Hover om het bedrijf te zien, klik om het in de bedrijvenlijst te openen.",
    mapHintTouch:
      "Tik eenmaal voor de bedrijfsnaam, tik nogmaals om de bedrijvenlijst te openen.",
    mapAltText: "Plattegrond HHS Delft",
    mapStandUnassigned: "Bedrijf volgt binnenkort",
    mapEmpty:
      "Voor deze editie is nog geen plattegrond beschikbaar. Zodra de indeling vastligt, verschijnt die hier.",

    // -- Study associations section ----------------------------------------
    associationsKicker: "Organiserende verenigingen",
    associationsTitle: "Studieverenigingen",
    associationsSubtitle: "Klik op een vereniging om naar de website te gaan.",

    // -- Footer -------------------------------------------------------------
    footerCtaTitle: "Klaar om jouw toekomst vorm te geven?",
    footerCtaBody:
      "Kom langs, ontmoet bedrijven en verenigingen, en breid je netwerk uit.",
    footerFreeEntry: "Gratis toegang",
    footerOpenToAll: "Open voor iedereen",
    footerOrganisation: "De Haagse Hogeschool",
    footerEvent: "T.I.S. Bedrijvendag",
    footerWebsite: "Website HHS",
    footerAboutBody:
      "De Haagse Hogeschool verbindt onderwijs en werkveld en helpt studenten klaar te stomen voor de uitdagingen van morgen.",
    footerLinksTitle: "Snelle links",
    footerLinkAbout: "Over het event",
    footerLinkCompanies: "Bedrijven",
    footerLinkAssociations: "Verenigingen",
    footerLinkFaq: "FAQ",
    footerLinkForCompanies: "Voor bedrijven",
    footerContactTitle: "Contact",
    footerPrivacy: "Privacybeleid",
    footerTerms: "Gebruiksvoorwaarden",
    footerSiteIssues: "Problemen met de website?",
    footerMoreTitle: "Meer",
    footerRegistrationOpen: "Aanmelding open",

    // -- Shared fallbacks ---------------------------------------------------
    tbd: "TBD"
  },

  // ──────────────────────────────── ENGLISH ─────────────────────────────────
  en: {
    // -- Header / navigation -----------------------------------------------
    navLabel: "Main navigation",
    navOpen: "Open menu",
    navClose: "Close menu",
    navMenu: "Menu",
    navMenuClose: "Close",
    navProgramme: "Programme",
    navAbout: "About the event",
    navAssociations: "Associations",

    // -- Top bar controls --------------------------------------------------
    switchLanguage: "Switch language",
    toggleDarkMode: "Toggle dark mode",
    themeLight: "Light",
    themeDark: "Dark",
    backToHome: "Back to home",
    hhsLogoAlt: "The Hague University of Applied Sciences",

    // -- Hero ---------------------------------------------------------------
    heroOrganisation: "The Hague University of Applied Sciences, Delft",
    heroCampus: "Campus",
    tisFullName: "Faculty of Technology, Innovation & Society",
    heroLabelWhen: "When",
    heroLabelWhere: "Where",

    // -- FAQ section on the home page ---------------------------------------
    faqRail: "FAQ",
    faqTitle: "Frequently asked questions",

    // -- Companies section on the home page --------------------------------
    companiesKicker: "Our partners",
    companiesTitle: "Participating Companies",
    companiesSubtitle:
      "Hover over each company to learn more about their mission and available roles.",
    companiesViewAll: "View all companies",
    companiesIssuesLabel: "Issues with your company listing?",
    companiesEmpty:
      "The company list for this edition has not been published yet. Participants will appear here once they are confirmed.",
    companiesGalleryHint: "Drag or swipe to browse, click a company for more.",
    companiesPreviousKicker: "Previous edition",
    companiesPreviousTitle: "They were there in March",
    companiesPreviousSubtitle:
      "The companies for November are still to come. These took part in March 2026.",
    galleryPrevious: "Previous company",
    galleryNext: "Next company",
    galleryClose: "Close",

    // -- Companies list page -----------------------------------------------
    companiesPageTitle: "Companies",
    companiesPageIntro:
      "Browse all participating companies. Use the filter to quickly find what you need.",
    filter: "Filter",
    category: "Category",
    sortAZ: "Sort A-Z",
    on: "on",
    off: "off",
    showOnMap: "Show on map",
    stand: "Stand",
    website: "Website",

    // -- Company card details ----------------------------------------------
    industry: "Industry",
    employees: "Employees",
    region: "Region",
    visitWebsite: "Visit Website",
    hoverForMoreInfo: "Hover for more info",

    // -- Floor plan page ---------------------------------------------------
    mapPageTitle: "Map",
    mapPageIntro: "Explore the interactive career day floor plan.",
    mapBadge: "Interactive",
    mapHeading: "Interactive floor plan",
    mapIntro: "Hover over a stand to instantly see which company is located there.",
    mapHintMouse: "Hover to view the company, click to open it in the companies list.",
    mapHintTouch:
      "Tap once to preview the company, tap again to open it in the companies list.",
    mapAltText: "THUAS Delft floor plan",
    mapStandUnassigned: "Company coming soon",
    mapEmpty:
      "No floor plan is available for this edition yet. It will appear here once the layout is final.",

    // -- Study associations section ----------------------------------------
    associationsKicker: "Organising associations",
    associationsTitle: "Study Associations",
    associationsSubtitle: "Click on an association to visit its website.",

    // -- Footer -------------------------------------------------------------
    footerCtaTitle: "Ready to shape your future?",
    footerCtaBody:
      "Meet companies and associations, ask questions, and grow your network.",
    footerFreeEntry: "Free entry",
    footerOpenToAll: "Open to everyone",
    footerOrganisation: "The Hague University of Applied Sciences",
    footerEvent: "T.I.S. Career Day",
    footerWebsite: "THUAS website",
    footerAboutBody:
      "The Hague University of Applied Sciences prepares students through practical education and strong industry connections.",
    footerLinksTitle: "Quick Links",
    footerLinkAbout: "About the Event",
    footerLinkCompanies: "Companies",
    footerLinkAssociations: "Associations",
    footerLinkFaq: "FAQ",
    footerLinkForCompanies: "For companies",
    footerContactTitle: "Contact",
    footerPrivacy: "Privacy Policy",
    footerTerms: "Terms of Service",
    footerSiteIssues: "Website issues?",
    footerMoreTitle: "More",
    footerRegistrationOpen: "Registration open",

    // -- Shared fallbacks ---------------------------------------------------
    tbd: "TBD"
  }
};

/**
 * Labels for the company categories used by the filter on the companies page.
 * The KEY must match the `category` field of a company in a data file.
 *
 * TO ADD A CATEGORY: add the same key to both blocks below, then use that key
 * as `category:` on a company.
 */
export const CATEGORY_LABELS = {
  nl: {
    all: "Alle",
    other: "Overig",
    defence: "Defensie",
    "energy-transition": "Energietransitie",
    engineering: "Engineering",
    consultancy: "Consultancy",
    recruitment: "Recruitment",
    technology: "Technologie",
    installation: "Installatie"
  },
  en: {
    all: "All",
    other: "Other",
    defence: "Defence",
    "energy-transition": "Energy transition",
    engineering: "Engineering",
    consultancy: "Consultancy",
    recruitment: "Recruitment",
    technology: "Technology",
    installation: "Installation"
  }
};
