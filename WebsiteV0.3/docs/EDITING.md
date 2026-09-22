# Editing guide

Recipes for the jobs that actually come up. Each one is self-contained: start
at the top of the recipe and follow it to the end.

Before you start, have the site running so you can see your changes:

```bash
cd WebsiteV0.3
npm run dev
```

- [Add a company](#add-a-company)
- [Edit or remove a company](#edit-or-remove-a-company)
- [Add the floor plan](#add-the-floor-plan)
- [Change the date, time or any hero text](#change-the-date-time-or-any-hero-text)
- [Turn on "add to calendar"](#turn-on-add-to-calendar)
- [Add a button](#add-a-button)
- [Add a card to an existing section](#add-a-card-to-an-existing-section)
- [Add a whole new section](#add-a-whole-new-section)
- [Change a colour](#change-a-colour)
- [Add or edit an FAQ question](#add-or-edit-an-faq-question)
- [Add a study association](#add-a-study-association)
- [Add a new page](#add-a-new-page)
- [Start the next edition](#start-the-next-edition)
- [Rules of thumb](#rules-of-thumb)

---

## Add a company

**File:** `src/editions/november-2026/data/companies.js`

### 1. The logo

Drop the file into `public/logos/`. Name it simply — `voorbeeld.svg`, not
`Voorbeeld Logo FINAL v2 (1).svg`.

Best to worst: **SVG** → **PNG with a transparent background** → JPG.
Aim for at least 600px wide, and crop off big white margins.

Referring to it in code, the path always starts at `/logos/`, because
everything in `public/` is served from the root of the site:

```
public/logos/voorbeeld.svg   →   logo: "/logos/voorbeeld.svg"
```

### 2. The entry

Add this inside the `normalizeCompanies([ ... ])` list. Order matters only for
the scrolling rows on the home page; the companies *page* sorts A–Z itself.

```js
{
  name: "Voorbeeld B.V.",
  logo: "/logos/voorbeeld.svg",
  logoTone: "light",
  category: "engineering",
  industry: { nl: "Machinebouw", en: "Machine building" },
  employees: "~ 50",
  location: { nl: "Delft, NL", en: "Delft, NL" },
  website: "https://voorbeeld.nl/",
  stand: 1,
  description: {
    nl: "Twee tot vier zinnen over wat het bedrijf doet.",
    en: "Two to four sentences about what the company does."
  }
},
```

**Do not forget the comma** after the closing `}`. A missing comma is the most
common cause of a blank white page.

### 3. Switch the section on

In `src/editions/november-2026/edition.config.js`:

```js
showCompanies: true,
```

Until this is `true`, the home page shows the "companies will follow later"
cards no matter how many companies you have added.

### Field reference

| Field | Required | Notes |
| --- | --- | --- |
| `name` | yes | Also generates the company's id: `"Voorbeeld B.V."` → `voorbeeld-b-v` |
| `logo` | no | Leave out and a placeholder is used |
| `logoTone` | no | See below — get this wrong and the logo vanishes |
| `category` | no | Defaults to `other`. Drives the filter |
| `industry` | no | Bilingual. Defaults to `TBD` |
| `employees` | no | Free text: `"~ 50"`, `"51-200"`, `"N/A"` |
| `location` | no | Bilingual. Usually identical in both |
| `website` | no | Full `https://` address, or `"#"` if none |
| `stand` | no | The number on the floor plan. Links the company to the map |
| `description` | no | Bilingual, 2–4 sentences |
| `id` | no | Only set this by hand to keep an old link working after a rename |

**`logoTone`** decides the card's background, because a white logo is invisible
on a white card:

| Value | Logo is | Card becomes |
| --- | --- | --- |
| `"light"` | white / very light | dark |
| `"dark"` | black / very dark | white |
| *(omit)* | normal colours | follows the visitor's light/dark setting |

Always check a new logo in **both** light and dark mode.

**`category`** must be one of `engineering`, `consultancy`, `technology`,
`installation`, `recruitment`, `defence`, `energy-transition`, `other`.
To add a new one, put it in `CATEGORY_LABELS` in `src/shared/strings.js` first
— both the `nl` and the `en` block — otherwise the filter shows the raw slug.

---

## Edit or remove a company

Same file. Change the fields, or delete the whole `{ ... },` block including
its trailing comma.

If the company had a `stand`, its rectangle on the map becomes unlabelled.
Either give the stand to another company, or add a name for it under
`extraStandLabels` in that edition's `data/floorPlan.js`.

---

## Add the floor plan

**File:** `src/editions/november-2026/data/floorPlan.js` (currently `null`)

### 1. The picture

Put it in `public/` — for example `public/MapNovember2026.jpeg`. Note its real
pixel size; you will need it.

### 2. Measure the stands

Coordinates are **pixels of the original image file**, counted from its
top-left corner. Not screen pixels, not percentages. The site converts them to
percentages itself, which is why the map stays aligned on a phone.

Open the image in anything that shows a pixel cursor position (Paint, GIMP,
Photoshop, Figma):

1. Point at the **top-left** corner of a stand → that is `x` and `y`.
2. Point at the **bottom-right** corner. Then:
   - `width = right x − left x`
   - `height = bottom y − top y`

### 3. Fill in the file

```js
export const NOVEMBER_2026_FLOOR_PLAN = {
  image: "/MapNovember2026.jpeg",
  imageWidth: 1131,     // the file's REAL pixel width
  imageHeight: 1600,    // the file's REAL pixel height

  // Names for stands that are not companies (student teams, partners)
  extraStandLabels: {
    12: "Hydro Motion Team"
  },

  hotspots: [
    { stand: 1, x: 153, y: 1063, width: 80, height: 60 },
    { stand: 2, x: 558, y: 423,  width: 37, height: 74 }
  ]
};
```

### 4. Switch it on

In `edition.config.js`: `showFloorPlan: true,`

### 5. Check your work

Open `/November2026/plattegrond`. Each rectangle lights up orange on hover. If
one is in the wrong place, adjust its numbers and the browser reloads instantly.

A stand shows a company name when a company in `companies.js` has the matching
`stand` number. There is no second list — the company list is the only source.

If one stand appears twice on the picture, give each rectangle a `key`:

```js
{ stand: 32, key: "upper", x: 1060, y: 284, width: 37, height: 74 },
{ stand: 32, key: "lower", x: 857,  y: 611, width: 37, height: 74 }
```

A complete worked example: `src/editions/march-2026/data/floorPlan.js`
(39 rectangles, 38 stands).

---

## Change the date, time or any hero text

**File:** `src/editions/november-2026/edition.config.js`

Everything the hero shows is near the top of that file:

```js
dateValue: { nl: "26 november 2026", en: "26 November 2026" },
timeValue: { nl: "13:00 - 19:00",    en: "13:00 - 19:00" },
```

If the date moves, change it in **three** places or they will disagree:

1. `dateValue` / `timeValue` here
2. the `calendar` block at the bottom of the same file (in UTC)
3. the matching `.ics` file in `public/`

The title, subtitle, button labels and the notice box are all in the same file,
each under a commented heading.

---

## Turn on "add to calendar"

This is **already on** for November 2026. The recipe below is for the next
edition, or if the date moves.

1. Fill in the `calendar` block at the bottom of `edition.config.js`. Times are
   **UTC**, written `YYYYMMDDTHHMMSSZ`. The Netherlands is UTC+1 in November,
   so `12:00Z` is 13:00 local:

   ```js
   calendar: {
     eventName: "T.I.S. Bedrijvendag 2026",
     startUtc: "20261126T120000Z",   // 13:00 Amsterdam
     endUtc:   "20261126T180000Z",   // 19:00 Amsterdam
     icsFile:  "/tis-bedrijvendag-november-2026.ics"
   }
   ```

2. Create the matching `.ics` file in `public/`. Copy
   `public/tis-bedrijvendag-november-2026.ics`, rename it, and change
   `DTSTART`, `DTEND`, `SUMMARY` and `UID`. Apple devices open this file;
   everyone else is sent to Google Calendar.

   **The .ics times and the `calendar` block are two separate sources and
   nothing checks them against each other.** Change both.

3. Set `showAddToCalendar: true`.

---

## Add a button

Never hand-write one — use the shared `Button`, and it matches the rest of the
site automatically.

```jsx
import Button from "../../shared/ui/Button.jsx";
```

(Count the `../` carefully: from `src/editions/november-2026/` it is
`../../shared/ui/Button.jsx`; from `src/pages/` it is `../shared/ui/Button.jsx`.)

```jsx
<Button to="/faq">FAQ</Button>                        // a page on this site
<Button href="https://example.com">Website</Button>   // external, new tab
<Button href="mailto:someone@hhs.nl">Mail ons</Button>
<Button onClick={() => alert("hoi")}>Klik</Button>    // runs code
```

Looks and sizes:

```jsx
<Button variant="primary">Orange, filled (default)</Button>
<Button variant="ghost">Frosted — only on the dark navy hero</Button>
<Button variant="outline">Outlined — for light pages</Button>

<Button size="sm">small</Button>
<Button size="md">medium (default)</Button>
<Button size="lg">large — hero buttons</Button>
```

With an icon, from [lucide.dev/icons](https://lucide.dev/icons):

```jsx
import { MapPin } from "lucide-react";

<Button icon={MapPin}>Plattegrond</Button>        // icon on the left
<Button iconRight={MapPin}>Plattegrond</Button>   // icon on the right
```

### A button that scrolls to a section on the same page

```jsx
import { useScrollToSection } from "../../shared/hooks/useScrollToSection.js";

const scrollToSection = useScrollToSection();

<Button onClick={() => scrollToSection("about")}>Meer info</Button>
```

`"about"` is the `id` of the target `<section id="about">`. The ids in use are
`about`, `companies`, `associations` and `november-update`.

---

## Add a card to an existing section

Cards are data, not code. In `edition.config.js`, find `updateCards` or
`aboutCards` and copy one block:

```js
{
  icon: Users,
  title: { nl: "Voor studenten", en: "For students" },
  body: {
    nl: "Nederlandse tekst.",
    en: "English text."
  }
},
```

If your icon is not already imported, add it to the `import { ... } from
"lucide-react";` line at the very top of the file. Forgetting this is the
second most common cause of a blank page.

To remove a card, delete its block. To reorder them, move the blocks.

---

## Add a whole new section

Say you want a "Programma" section on the November page.

**1. Create `src/editions/november-2026/sections/NovemberScheduleSection.jsx`:**

```jsx
import { m } from "framer-motion";
import { useLanguage } from "../../../shared/context/LanguageContext.jsx";
import { REVEAL } from "../../../shared/context/MotionProvider.jsx";
import { pick } from "../../../shared/i18n.js";
import SectionHeading from "../../../shared/ui/SectionHeading.jsx";
import { NOVEMBER_2026_CONTENT as content } from "../edition.config.js";

export default function NovemberScheduleSection() {
  const { lang } = useLanguage();

  return (
    <section id="schedule" className="bg-white py-20 dark:bg-ink">
      <m.div {...REVEAL} className="mx-auto max-w-6xl px-6">
        <SectionHeading
          kicker={pick(content.scheduleKicker, lang)}
          title={pick(content.scheduleTitle, lang)}
        />
        {/* your content */}
      </m.div>
    </section>
  );
}
```

The parts worth copying every time:

- `id="schedule"` — so buttons can scroll to it
- `bg-white ... dark:bg-ink` — **always** set the dark colour too
- `mx-auto max-w-6xl px-6` — keeps it the same width as every other section
- `<m.div {...REVEAL}>` — the standard fade-in on scroll

**2. Add the text to `edition.config.js`:**

```js
scheduleKicker: { nl: "PROGRAMMA", en: "SCHEDULE" },
scheduleTitle:  { nl: "De dag in het kort", en: "The day at a glance" },
```

**3. Put it on the page** — in `NovemberHome.jsx`, import it and add one line
where you want it to appear:

```jsx
import NovemberScheduleSection from "./sections/NovemberScheduleSection.jsx";
```

```jsx
      {showCompanies ? <CompaniesSection edition={edition} /> : <NovemberUpdateSection />}

      <NovemberScheduleSection />     {/* ← here */}

      <AboutSection content={content} />
```

Section order on the page is exactly the order of those lines.

---

## Change a colour

**File:** `tailwind.config.js`

```js
orange: {
  DEFAULT: "#f07c00",
  light: "#ff9b3a"
}
```

Change the hex and every orange thing on the site changes.

**Then change the same value in `src/shared/theme.js`.** That file feeds the
handful of places that need a raw hex rather than a class name (the SVG waves).
If the two disagree, the wave under the hero will not match the page.

Restart `npm run dev` after editing `tailwind.config.js` — it is read once at
startup.

To use a colour in a component:

```jsx
<div className="bg-orange text-white">        {/* solid */}
<div className="bg-orange/10">                {/* 10% opacity */}
<div className="bg-white dark:bg-ink">        {/* light and dark */}
```

### Text sizes and motion speeds live in the same file

Use a named size rather than `text-2xl font-bold tracking-tight` — each named
size carries the right line-height, tracking and weight already:

```jsx
<h2 className="text-title text-navy dark:text-white">Heading</h2>
<p  className="text-lead text-slate-600 dark:text-slate-300">Intro line.</p>
<p  className="text-body text-slate-600 dark:text-slate-300">Normal text.</p>
```

Full list of sizes and the two motion speeds: README section 6.

---

## Add or edit an FAQ question

**File:** `src/shared/data/faq.jsx`

```js
{
  q: { nl: "Is er parkeergelegenheid?", en: "Is there parking?" },
  a: { nl: "Ja, gratis op het terrein.", en: "Yes, free on site." }
},
```

An answer can contain a link. Use the `Link` helper already defined at the top
of that file, and wrap the answer in `<> ... </>`:

```js
a: {
  nl: <>Mail ons via <Link href="mailto:x@hhs.nl">x@hhs.nl</Link>.</>,
  en: <>Email us at <Link href="mailto:x@hhs.nl">x@hhs.nl</Link>.</>
}
```

---

## Add a study association

**File:** `src/shared/data/associations.js`

Logo into `public/logos/` first, then:

```js
{
  name: "Naam",
  field: "Studierichting",
  website: "voorbeeld.nl",          // no https:// — it is added for you
  logoSrc: "/logos/naam.png",
  logoPosition: "right",            // optional: "left" / "right" for wide logos
  logoOffsetY: 20                   // optional: nudge down (or up, if negative)
}
```

These appear on every edition's home page, which is why they live in `shared/`.

---

## Add a new page

Say you want `/sponsors`.

**1. Create `src/pages/SponsorsPage.jsx`:**

```jsx
import PageLayout from "../shared/components/PageLayout.jsx";
import { useLanguage } from "../shared/context/LanguageContext.jsx";
import { usePageMeta } from "../shared/hooks/usePageMeta.js";

export default function SponsorsPage() {
  const { lang } = useLanguage();
  const title = lang === "nl" ? "Sponsoren" : "Sponsors";

  usePageMeta({
    title: `${title} | T.I.S. Bedrijvendag Delft`,
    canonicalPath: "/sponsors"
  });

  return (
    <PageLayout title={title}>
      <p>Your content.</p>
    </PageLayout>
  );
}
```

`PageLayout` gives you the navy header, the back link and the footer for free.
`usePageMeta` sets the browser tab title and tells Google the correct address —
without it the page inherits the home page's title.

**2. Register the address** in `src/App.jsx`, next to the other site-wide pages:

```jsx
import SponsorsPage from "./pages/SponsorsPage.jsx";
```

```jsx
<Route path="/sponsors" element={<SponsorsPage />} />
```

**3. Add it to `public/sitemap.xml`** so Google finds it.

**4. Link to it** — in the footer (`src/shared/components/Footer.jsx`) or
anywhere else: `<Button to="/sponsors">Sponsoren</Button>`.

---

## Start the next edition

When March 2027 comes around:

**1. Copy the folder.**

```bash
cp -r src/editions/november-2026 src/editions/march-2027
```

**2. Rename the exports** inside the copied files, so the two editions do not
collide. In `march-2027/`, change every `NOVEMBER_2026_` to `MARCH_2027_`, and
rename `NovemberHome.jsx` → `MarchHome2027.jsx` along with the component inside
it. Update the imports in the copied files to match.

**3. Empty the new edition's data** — `data/companies.js` back to an empty
list, `data/floorPlan.js` back to `null` — and set `showCompanies: false` and
`showFloorPlan: false` while you fill it in.

**4. Register it** in `src/editions/index.js`:

```js
{
  id: "march-2027",
  slug: "March2027",              // becomes /March2027
  label: "March 2027",
  status: "active",
  content: MARCH_2027_CONTENT,
  companies: MARCH_2027_COMPANIES,
  floorPlan: MARCH_2027_FLOOR_PLAN,
  Home: MarchHome2027
}
```

Add the matching `import` lines at the top of that file.

**5. Make it the live edition** in `src/site.config.js`:

```js
export const ACTIVE_EDITION_ID = "march-2027";
```

**6. Archive November 2026** — set its `status` to `"archived"` in the registry,
and add the `*** FROZEN ARCHIVE — DO NOT EDIT ***` banner to the top of its
files so the next person knows.

**7. Point the old links at it.** `LEGACY_ROUTE_EDITION_ID` in `site.config.js`
controls where `/companies` and `/plattegrond` land. Move it to the new edition
once that edition has a company list.

**8. Update `public/sitemap.xml`** with the new addresses.

You do not need to touch `App.jsx`: the three addresses per edition are
generated from the registry.

---

## Hide the associations strip

**File:** the edition's `edition.config.js`

```js
showAssociations: false,
```

The strip of organising study associations disappears from that edition's home
page. Leave the key out entirely and the strip stays.

---

## Add a link to the top menu

**File:** `src/shared/components/SiteHeader.jsx`

Add an entry to `navItems`:

```js
// scrolls to <section id="schedule"> on the home page
{ key: "schedule", label: t.navSchedule, section: "schedule" },

// or navigates to a separate page
{ key: "sponsors", label: t.navSponsors, route: "/sponsors" },
```

Then add `navSchedule` / `navSponsors` to both language blocks in
`src/shared/strings.js`. The same list feeds the desktop row and the phone menu,
so one entry covers both.

---

## Rules of thumb

**Text belongs in a config or data file, never typed into a component.**
If you find yourself typing a Dutch sentence inside a `.jsx` file, it probably
belongs in `edition.config.js` or `strings.js`.

**Always write both languages.** A missing `nl:` or `en:` renders as a blank gap.

**Always write the dark-mode colour.** Every `bg-`/`text-` on a section needs
its `dark:` twin, or the page breaks for dark-mode visitors.

**Never edit `src/editions/march-2026/`.** It is a record of an event that
already happened.

**Commas matter.** Every `}` in a list needs a `,` after it. A missing comma
gives you a blank white page — check the browser console (`F12`), it names the
file and line.

**Check both themes and a phone** before you publish. In the browser: `F12` →
the phone icon in the corner.

**Run `npm test`** before uploading. It catches the things that are easy to miss.
