# Website Architecture Map

## Runtime Flow

```text
main.jsx
+-- ReactDOM.createRoot()
    +-- <App />
        +-- EditionProvider
            +-- ThemeProvider
                +-- LanguageProvider
                    +-- MotionProvider
                        +-- BrowserRouter
                            +-- Routes
                                +-- /
                                |   +-- Home
                                |       +-- EditionSelector
                                |       +-- edition === march-2026
                                |       |   +-- HeroSection
                                |       |   +-- CompaniesGrid
                                |       |   +-- EventInfo
                                |       |   +-- AssociationsSection
                                |       |   +-- Footer
                                |       +-- edition === november-2026
                                |           +-- NovemberHeroSection
                                |           +-- NovemberCompaniesSection
                                |           +-- NovemberEventInfo
                                |           +-- AssociationsSection
                                |           +-- Footer
                                +-- /companies
                                |   +-- Companies
                                |       +-- LegalLayout
                                |       +-- getCompanies(lang)
                                |       +-- COMPANY_CATEGORY_LABELS
                                |       +-- MAP_HHS_COMPANY_ID_TO_STAND
                                +-- /voor-bedrijven
                                |   +-- CompanyRegistration
                                |       +-- LegalLayout
                                |       +-- COMPANY_REGISTRATION_FORM_HREF
                                |       +-- COMPANY_REGISTRATION_EMAIL
                                +-- /plattegrond
                                |   +-- MapPage
                                |       +-- LegalLayout
                                |       +-- STRINGS[lang]
                                |       +-- query param: stand
                                |       +-- MapHHS
                                +-- /faq
                                |   +-- Faq
                                |       +-- LegalLayout
                                +-- /privacy
                                |   +-- Privacy
                                |       +-- LegalLayout
                                +-- /terms
                                    +-- Terms
                                        +-- LegalLayout
```

## Mermaid View

```mermaid
flowchart TD
    A[main.jsx] --> B[App.jsx]
    B --> C[EditionProvider]
    C --> D[ThemeProvider]
    D --> E[LanguageProvider]
    E --> F[MotionProvider]
    F --> G[BrowserRouter]

    G --> H[/]
    G --> I[/companies]
    G --> J[/voor-bedrijven]
    G --> K[/plattegrond]
    G --> L[/faq]
    G --> M[/privacy]
    G --> N[/terms]

    H --> H1[Home]
    H1 --> H2[EditionSelector]
    H1 --> H3[March edition stack]
    H1 --> H4[November edition stack]
    H3 --> H3A[HeroSection]
    H3 --> H3B[CompaniesGrid]
    H3 --> H3C[EventInfo]
    H3 --> H3D[AssociationsSection]
    H3 --> H3E[Footer]
    H4 --> H4A[NovemberHeroSection]
    H4 --> H4B[NovemberCompaniesSection]
    H4 --> H4C[NovemberEventInfo]
    H4 --> H4D[AssociationsSection]
    H4 --> H4E[Footer]

    I --> I1[Companies]
    I1 --> I2[LegalLayout]
    I1 --> I3[data/companies.js]
    I1 --> I4[data/mapHotspots.js]

    J --> J1[CompanyRegistration]
    J1 --> J2[LegalLayout]
    J1 --> J3[shared/companyRegistration.js]

    K --> K1[MapPage]
    K1 --> K2[LegalLayout]
    K1 --> K3[components/career-day/MapHHS.jsx]
    K1 --> K4[shared/strings.js]

    L --> L1[Faq] --> L2[LegalLayout]
    M --> M1[Privacy] --> M2[LegalLayout]
    N --> N1[Terms] --> N2[LegalLayout]
```

## Shared State

- `EditionContext.jsx`
  Controls which homepage variant is shown.
  Persists the selected edition in `localStorage`.
  Defaults to `november-2026` when nothing valid is stored.

- `ThemeContext.jsx`
  Controls light and dark mode.
  Persists theme in `localStorage`.
  Applies the `dark` class to `document.documentElement`.

- `LanguageContext.jsx`
  Controls the active language, currently via in-memory React state.
  Exposes `lang` and `setLang`.

- `MotionProvider.jsx`
  Wraps the app in Framer Motion's lazy animation loader.

## Data and Content Sources

- `src/data/companies.js`
  Main company dataset for cards, company list filtering, and category labels.

- `src/data/mapHotspots.js`
  Stand numbers and map hotspot lookup used by the company list and map page.

- `src/data/associations.js`
  Source for the associations section shown on the homepage.

- `src/shared/strings.js`
  Localized copy for shared UI text, especially the map page and section labels.

- `src/shared/companyRegistration.js`
  Constants for the company registration route, email address, and registration link.

- `public/`
  Static assets such as logos, HHS imagery, map imagery, and the calendar file.

## What This Means Structurally

- `App.jsx` is the shell: providers plus all route registration live here.
- `Home.jsx` is the main composition hub: it decides which edition-specific landing page stack to render.
- `LegalLayout.jsx` is the reusable wrapper for secondary content pages.
- `components/career-day/` contains most visual feature sections and event-specific UI.
- `data/` and `shared/` act as the content and configuration layer beneath the pages.
