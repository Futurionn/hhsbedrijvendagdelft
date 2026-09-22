# T.I.S. Bedrijvendag Delft — website

The website for the career day at De Haagse Hogeschool, Delft campus.
Live at **[hhsbedrijvendagdelft.nl](https://hhsbedrijvendagdelft.nl)**.

It is a normal website built with React. There is no database, no login and no
server code. Everything a visitor sees comes from text files in this repository,
which means **editing the site is editing a text file and uploading the result**.

---

## Contents

1. [Run it on your own computer](#1-run-it-on-your-own-computer)
2. [The two editions](#2-the-two-editions)
3. [Where everything lives](#3-where-everything-lives)
4. [What to edit, for the thing you want to change](#4-what-to-edit-for-the-thing-you-want-to-change)
5. [Text and languages](#5-text-and-languages)
6. [Colours, type and motion](#6-colours-type-and-motion)
7. [Buttons, cards and other building blocks](#7-buttons-cards-and-other-building-blocks)
8. [Adding a company](#8-adding-a-company)
9. [Publishing your changes](#9-publishing-your-changes)
10. [Testing](#10-testing)
11. [If something breaks](#11-if-something-breaks)

Two longer guides sit in [`docs/`](docs/):

- **[docs/EDITING.md](docs/EDITING.md)** — step-by-step recipes for the most
  common jobs (add a company, add a button, add a section, start a new edition).
- **[docs/DEPLOY.md](docs/DEPLOY.md)** — building and uploading the site, in detail.

---

## 1. Run it on your own computer

You need **[Node.js](https://nodejs.org)** version 18 or newer. Install it once;
everything else comes from the commands below.

```bash
cd WebsiteV0.3      # you must be in this folder
npm install         # first time only — downloads the libraries
npm run dev         # starts the site
```

`npm run dev` prints an address, normally <http://localhost:5173>. Open it in a
browser. **Leave the command running**: it watches your files, and every time
you save one the browser updates by itself, usually without losing your place.

Stop it with `Ctrl + C`.

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server. Use this while editing. |
| `npm run build` | Builds the finished site into `dist/`. This is what you upload. |
| `npm run preview` | Serves the built `dist/` on <http://localhost:4173>, exactly as the real server would. Check here before uploading. |
| `npm test` | Opens the site in a real browser and checks every page still works. See [Testing](#10-testing). |
| `npm run test:contrast` | Checks every colour pair against WCAG AA. No browser needed. |

> **`npm run dev` vs `npm run preview`** — `dev` is fast and reloads as you type,
> but it is not the real thing. `preview` runs the actual built files. When you
> want to be sure before uploading, use `preview`.

---

## 2. The two editions

The career day happens more than once, and each edition gets its own web address.

| Address | What it is |
| --- | --- |
| `/` | Whichever edition is currently active — right now, November 2026 |
| `/November2026` | Thursday 26 November 2026. **This is where you work.** |
| `/March2026` | The edition of 5 March 2026. **Frozen archive — do not edit.** |

`/` and `/November2026` show the same page. `/` is the canonical address, which
is what search engines are told to index.

Each edition also has sub-pages, which only appear once that edition has
content for them:

```
/November2026/bedrijven       the company list
/November2026/plattegrond     the interactive floor plan
/March2026/bedrijven
/March2026/plattegrond
```

There used to be a dropdown in the corner for switching editions. It is gone;
editions are web addresses now.

### "Frozen" means the words, not the code

March 2026 already happened. Its **content** — dates, companies, texts — is a
historical record and must not change.

Its **code** is not sealed off. March and November share the same buttons,
cards, footer and styling, so a visual improvement reaches both pages. That is
deliberate: you fix something once, not twice. What you must never do is edit
anything inside `src/editions/march-2026/`. Those files all carry a
`*** FROZEN ARCHIVE — DO NOT EDIT ***` banner at the top.

---

## 3. Where everything lives

```
WebsiteV0.3/
│
├── index.html                 the page shell — SEO tags live here, nothing else
├── package.json               the command list and the library list
├── tailwind.config.js         ← COLOURS, TEXT SIZES, MOTION SPEEDS
│
├── public/                    files copied to the site untouched
│   ├── logos/                 ← company + association logos go here
│   ├── HHS/                   school logo and footer icons
│   ├── MapHHS.jpeg            the March floor plan picture
│   ├── .htaccess              server rules — REQUIRED, see docs/DEPLOY.md
│   ├── robots.txt
│   └── sitemap.xml            ← add new addresses here for Google
│
├── src/
│   ├── main.jsx               starts the app (you will not need to touch this)
│   ├── App.jsx                ← THE ROUTE TABLE: which address shows which page
│   ├── index.css              global styles, marquee, accessibility settings
│   ├── site.config.js         ← domain, email addresses, venue, form link
│   │
│   ├── editions/
│   │   ├── index.js           ← the edition registry (add a new edition here)
│   │   │
│   │   ├── november-2026/     ★ YOUR WORKING FOLDER
│   │   │   ├── edition.config.js      ← ALL THE TEXT for this edition
│   │   │   ├── NovemberHome.jsx       which sections appear, in what order
│   │   │   ├── sections/              sections unique to this edition
│   │   │   └── data/
│   │   │       ├── companies.js       ← ADD COMPANIES HERE
│   │   │       └── floorPlan.js       ← ADD THE MAP HERE
│   │   │
│   │   └── march-2026/        *** FROZEN — DO NOT EDIT ***
│   │       ├── edition.config.js
│   │       ├── MarchHome.jsx
│   │       └── data/
│   │
│   ├── pages/                 pages shared by both editions
│   │   ├── CompaniesPage.jsx          the filterable company list
│   │   ├── FloorPlanPage.jsx          the map page
│   │   ├── CompanyRegistrationPage.jsx  /voor-bedrijven
│   │   ├── FaqPage.jsx
│   │   ├── PrivacyPage.jsx
│   │   └── TermsPage.jsx
│   │
│   └── shared/                used by everything
│       ├── strings.js         ← TEXT that appears on more than one page
│       ├── theme.js           colour values for the few places needing a hex
│       ├── i18n.js            the NL/EN picker
│       ├── companyData.js     fills in defaults for company entries
│       ├── companyStyles.js   light-logo / dark-logo card colours
│       ├── ui/                small building blocks: Button, Card, Wave, …
│       ├── components/        big pieces: Footer, hero, marquee, map, …
│       ├── context/           language, theme and animation state
│       ├── hooks/             reusable behaviour
│       └── data/
│           ├── associations.js  ← the six study associations
│           └── faq.jsx          ← the FAQ questions and answers
│
├── tests/smoke.mjs            browser checks — run with `npm test`
└── docs/                      the two long guides
```

**Every file starts with a comment block** explaining what it is for and what
you are meant to change in it. If you open a file and are not sure, read the
top ten lines.

---

## 4. What to edit, for the thing you want to change

| I want to… | Open this file |
| --- | --- |
| Change the November date, time, hero text, or the cards | `src/editions/november-2026/edition.config.js` |
| **Add a company** | `src/editions/november-2026/data/companies.js` — and see [§8](#8-adding-a-company) |
| Add the floor plan / move a stand | `src/editions/november-2026/data/floorPlan.js` |
| Change a colour, a text size or a motion speed | `tailwind.config.js` |
| Change a word that appears on several pages (buttons, footer, filters) | `src/shared/strings.js` |
| Change an email address, the venue, or the registration form link | `src/site.config.js` |
| Add or edit an FAQ question | `src/shared/data/faq.jsx` |
| Add or edit a study association | `src/shared/data/associations.js` |
| Add / remove / reorder a section on the November page | `src/editions/november-2026/NovemberHome.jsx` |
| Add or rename a menu link | `src/shared/components/SiteHeader.jsx` (`navItems`) |
| Hide the study-associations strip | `showAssociations: false` in the edition config |
| Add a new web address | `src/App.jsx` |
| Start the next edition (March 2027, …) | `src/editions/index.js` — recipe in [docs/EDITING.md](docs/EDITING.md) |
| Change the privacy policy or terms | `src/pages/PrivacyPage.jsx`, `src/pages/TermsPage.jsx` |
| Change what Google shows in search results | `index.html` + `public/sitemap.xml` |
| Change the logo-scroll speed | `src/index.css`, the `72s` values |

---

## 5. Text and languages

The site is bilingual. Every visible sentence exists twice.

Anything written like this has a Dutch and an English version:

```js
title: { nl: "Bedrijvendag", en: "Career Day" }
```

Anything written as a plain string is the same in both languages:

```js
year: "2026"
```

**Always fill in both `nl` and `en`.** A missing one shows as a blank space on
the page.

Text lives in one of three places, depending on how widely it is used:

| Where the text appears | File |
| --- | --- |
| On one edition only (hero, dates, that edition's cards) | `src/editions/<edition>/edition.config.js` |
| On several pages (buttons, footer, filter labels) | `src/shared/strings.js` |
| Facts about the organisation (emails, address, form link) | `src/site.config.js` |

To add a new shared phrase, add the key to **both** the `nl` and the `en` block
in `strings.js`, then use it in a component as `t.yourNewKey`.

---

## 6. Colours, type and motion

**The whole design system is in one file: `tailwind.config.js`.** Change a
value there and it updates across the site.

### Colours

```js
navy:   { DEFAULT: "#1e3a5f", light: "#2a4a6f", dark: "#162844", deep: "#0f1f36" }
orange: { DEFAULT: "#f07c00", light: "#ff9b3a", deep: "#b85900" }
ink: "#020617"   // the dark-mode page background
```

**There are two oranges, and the difference matters.** The brand orange is
bright, so orange *words* on a white page only reach 2.8:1 — below the 4.5:1
that small text needs to be readable. So:

| Use | Class |
| --- | --- |
| Orange **text** on a light background | `text-orange-deep dark:text-orange` |
| Orange **fill** (buttons, chips, icons) | `bg-orange` |
| Orange text on navy | `text-orange` |

For the same reason the orange button has a **dark navy label, not a white
one**: white on this orange is 2.8:1, navy-deep on it is 6.0:1. That keeps the
brand colour exactly as it is and makes the label readable.

Run `npm run test:contrast` after changing any colour — it checks every
text/background pair the site uses and needs no browser.

| Class | Effect |
| --- | --- |
| `bg-orange` | orange background |
| `text-navy` | navy text |
| `border-orange/30` | orange border at 30% opacity |
| `dark:bg-ink` | dark-mode background |

Anything after `dark:` only applies in dark mode. **When you set a background,
always set the dark version too**, or the page breaks for dark-mode visitors.

One exception: SVG shapes need a real hex value rather than a class name. Those
read from **`src/shared/theme.js`**, which holds the same values. **Change a
colour in `tailwind.config.js` and change it in `theme.js` too.**

### Type

Do not set `text-2xl font-bold tracking-tight` by hand. Use a named size — each
one already carries the right line-height, letter-spacing and weight for that
size, which is why headings look settled rather than stretched:

| Class | For |
| --- | --- |
| `text-display` | the hero headline |
| `text-title` | section headings |
| `text-title-sm` | page headings on inner pages |
| `text-heading` | card headings |
| `text-lead` | the intro paragraph under a heading |
| `text-body` | normal text |
| `text-caption` | small print, meta rows |
| `text-kicker` | the small spaced-out label above a section title |

The display sizes use `clamp()`, so they scale smoothly with the window instead
of jumping at breakpoints. The site uses the system font on purpose: it already
ships optical sizing and legibility tuning, and it loads instantly.

### Motion

Two speeds, used consistently:

| Class | For |
| --- | --- |
| `duration-press` (110ms) | the pressed state — must feel instant |
| `duration-settle` (220ms) | hover and state changes |

The rule behind them: **a control answers the finger on the way down, not on
the way up.** That is why buttons carry `active:scale-[0.97]` with the fast
duration, and why hover — which is the user considering, not acting — is the
slower one. Animate `transform` and `opacity` rather than `all`; those two are
cheap and stay smooth.

Scroll-triggered fade-ins are deliberately **not** used for page content. Content
is simply there when you arrive. Motion is reserved for things the visitor
actually does.

## 7. Buttons, cards and other building blocks

You should almost never write a button by hand. Use the shared ones, and they
come out consistent automatically.

### A button — `src/shared/ui/Button.jsx`

It works out which kind of link to produce on its own:

```jsx
import Button from "../../shared/ui/Button.jsx";

<Button to="/faq">FAQ</Button>                       // a page on this site
<Button href="https://example.com">Website</Button>  // external, opens a new tab
<Button onClick={doSomething}>Klik hier</Button>     // runs code
```

Appearance:

```jsx
<Button>Orange, filled</Button>                  // the default
<Button variant="ghost">For the dark hero</Button>
<Button variant="outline">Secondary, light pages</Button>
<Button size="sm">small</Button>   <Button size="lg">large</Button>
```

With an icon — any name from [lucide.dev/icons](https://lucide.dev/icons):

```jsx
import { MapPin } from "lucide-react";
<Button icon={MapPin}>Plattegrond</Button>
```

### The other pieces

| Component | What it is |
| --- | --- |
| `ui/Card.jsx` | icon + heading + text in a rounded box |
| `ui/SectionHeading.jsx` | the orange label + big title + intro paragraph |
| `ui/HeroPill.jsx` | the rounded date/time/location chips in the hero |
| `ui/CompanyLogo.jsx` | a company logo, falling back to its initials |
| `ui/Wave.jsx` | the curved divider under a navy header |
| `ui/HhsLogo.jsx` | the university wordmark; always links to `/` |
| `components/SiteHeader.jsx` | the pinned top bar: logo, menu, NL/EN, light/dark |
| `components/EditionHero.jsx` | the navy banner under the header |
| `components/Footer.jsx` | the footer |
| `components/CompanyMarquee.jsx` | the scrolling logo rows |
| `components/FloorPlanMap.jsx` | the clickable map |
| `components/PageLayout.jsx` | the frame around every non-home page |

Worked examples of adding a button or a whole section are in
[docs/EDITING.md](docs/EDITING.md).

---

## 8. Adding a company

Three steps.

**1. Put the logo in `public/logos/`.**
Prefer an SVG, or a PNG with a transparent background, at least ~600px wide.

**2. Add an entry to `src/editions/november-2026/data/companies.js`:**

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

**3. Open `src/editions/november-2026/edition.config.js` and set
`showCompanies: true`.** Until you do, the page shows the "companies will follow
later" cards instead.

### The two fields that trip people up

**`logoTone`** — only needed when a logo is a single fixed colour:

- `"light"` — the logo is **white**, so the card is drawn **dark**
- `"dark"` — the logo is **black**, so the card is drawn **white**
- leave it out for normal colour logos; the card then follows the visitor's
  light/dark setting

Get this wrong and the logo disappears into the background in one of the themes.

**`stand`** — the stand number on the floor plan. This single number is what
connects a company to its spot on the map, the "Stand #12" chip on its card and
the "Toon op kaart" button. There is no second list to keep in sync. Leave it
out if stands are not assigned yet.

`category` must be one of: `engineering`, `consultancy`, `technology`,
`installation`, `recruitment`, `defence`, `energy-transition`, `other`. To
invent a new one, add it to `CATEGORY_LABELS` in `src/shared/strings.js` first.

Full details, including the floor plan, are in [docs/EDITING.md](docs/EDITING.md).

---

## 9. Publishing your changes

```bash
npm run build
```

This produces a **`dist/`** folder. That folder *is* the website.

```bash
npm run preview     # check dist/ locally at http://localhost:4173 first
```

Then upload **the contents of `dist/`** — not the folder itself — to the web
root on the server (usually `public_html/` or `www/`).

> **The one thing that goes wrong:** `dist/.htaccess` starts with a dot, and
> most FTP programs hide it. If it is missing, the home page works but every
> other address 404s the moment someone refreshes. Turn on "show hidden files"
> and confirm it is there.

Step-by-step instructions, including what to check after uploading, are in
**[docs/DEPLOY.md](docs/DEPLOY.md)**.

---

## 10. Testing

There is an automated check that opens the real site in a real browser and
verifies every page loads, the language and dark-mode buttons work, the company
filter works, the map is clickable, and nothing breaks on a phone.

```bash
npm install --no-save playwright     # first time only
npx playwright install chromium      # first time only — downloads a browser

npm run build
npm run preview                      # leave running in this terminal

npm test                             # in a SECOND terminal
```

It prints a `PASS` / `FAIL` line per check. Run it before every upload.

If you would rather check by hand, the things worth clicking are: switch NL/EN,
switch dark mode, reload the page (both settings should stick), hover a company
logo, click a stand on the March map, and open any page directly by typing its
address.

---

## 11. If something breaks

**A blank white page.** A JavaScript error stopped the app. Open the browser
console (`F12` → Console) and read the first red line — it names the file.

**`npm run dev` fails to start.** Delete `node_modules` and run `npm install`
again.

**A page 404s on the live site but works locally.** `.htaccess` did not get
uploaded. See [§9](#9-publishing-your-changes).

**A logo is invisible.** Wrong `logoTone`. See [§8](#8-adding-a-company).

**Your change does not show up after uploading.** Hard-refresh
(`Ctrl + Shift + R`). If it still shows the old version, you uploaded the
`dist` folder itself rather than its contents.

**Text shows as a blank gap.** A missing `nl:` or `en:` on a bilingual value.

**Still stuck** — website problems: `voorzitter@rheonline.nl`.

---

## Built with

[React](https://react.dev) (interface) · [Vite](https://vite.dev) (build tool) ·
[Tailwind CSS](https://tailwindcss.com) (styling) ·
[React Router](https://reactrouter.com) (addresses) ·
[Framer Motion](https://www.framer.com/motion/) (animation) ·
[Lucide](https://lucide.dev) (icons)

Originally built in 2026 by Mathis Gesquiere as president of S.V. Rheon.
