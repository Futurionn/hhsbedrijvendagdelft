# Notes for AI assistants (I see you)

Read this before changing anything. `README.md` has the full picture; this is
the short version plus the rules that are easy to get wrong. Cause I know YOU not me reader will probably use ai so that are the basic rules I has issues with.

## What this is

A React + Vite + Tailwind static site for a university career day. No backend,
no database. All content is in data and config files under `src/`.

## Hard rules

1. **Never edit `src/editions/march-2026/`.** That edition has already taken
   place; its content is a historical record. Every file there carries a
   `*** FROZEN ARCHIVE — DO NOT EDIT ***` banner. Shared components that March
   happens to use *are* fair game — content is frozen, code is not.

2. **Never hardcode user-visible text in a `.jsx` component.** It belongs in
   the edition config, `src/shared/strings.js`, or a data file under
   `src/shared/data/`.

3. **Every user-visible string is bilingual:** `{ nl: "...", en: "..." }`.
   A plain string is only correct when both languages are genuinely identical.
   Never ship one without the other.

4. **Every colour utility needs its dark-mode twin.** `bg-white dark:bg-ink`,
   `text-navy dark:text-white`. The site has a real dark mode and it is tested.

5. **Colours, text sizes and motion speeds all come from
   `tailwind.config.js`.** Do not write raw hex, nor ad-hoc
   `text-2xl font-bold tracking-tight` stacks. Use the named sizes
   (`text-display`/`display-tis`/`bigdate`/`numeral`/`title`/`heading`/`lead`/`fact`/`body`/`small`/`caption`)
   and the durations (`duration-press`, `duration-settle`, `duration-draw`). The few places
   needing a hex string read `src/shared/theme.js`, which mirrors the palette —
   change both together.

6. **Two oranges.** `text-orange-deep dark:text-orange` for orange WORDS on
   light backgrounds (the brand orange is only 2.8:1 on white); `bg-orange`
   for fills. The primary button uses a `text-orange-ink` label, never white.
   Run `npm run test:contrast` after any colour change.

7. **Interactive things get `active:scale-[0.97] active:duration-press`.**
   A control must answer on pointer-down. Animate `transform`/`opacity`, never
   `transition-all`.

8. **Do not add scroll-triggered fade-ins to page content.** They were removed
   deliberately: content at `opacity: 0` until observed is fragile, breaks
   full-page screenshots, and reads as templated. `REVEAL` exists for the hero
   only.

9. **Use the shared UI primitives** in `src/shared/ui/` — `Button`, `Card`,
   `Section` (`Container`/`GRID`/`SectionRail`/`SectionMain`/`Rule`), `MetaRow`,
   `SectionHeading`, `Wave`. Do not hand-roll a styled `<button>`
   or `<a>`.

10. **`import { m } from "framer-motion"`**, never `motion`. The app is wrapped
   in `LazyMotion`; `motion` would defeat it and inflate the bundle.

## Where things live

| Concern | File |
| --- | --- |
| Which address shows which page | `src/App.jsx` |
| Edition registry (slugs, status, data wiring) | `src/editions/index.js` |
| Active edition, legacy redirects, emails, venue | `src/site.config.js` |
| All text for an edition | `src/editions/<edition>/edition.config.js` |
| Companies for an edition | `src/editions/<edition>/data/companies.js` |
| Floor plan for an edition | `src/editions/<edition>/data/floorPlan.js` |
| Cross-page text + category labels | `src/shared/strings.js` |
| Colours, type, motion | `tailwind.config.js` (+ `src/shared/theme.js`, `:root` in `src/index.css`) |
| The design spec (open in a browser) | `design/tis-reference.html` |

## Data model facts worth knowing

- A company's `stand` number is the **only** link between it and the floor
  plan. There is no second lookup table; do not reintroduce one.
- Company `id` is derived from `name` via `slugify()` unless set explicitly.
  Ids appear in URLs (`?focus=<id>`), so changing a name changes a link.
- `logoTone` (`"light"` / `"dark"` / omitted) decides the card background so
  single-colour logos stay visible. Colours come from
  `src/shared/companyStyles.js` — both the home-page card and the list row read
  from there, so change it once.
- `hasCompanies(edition)` / `hasFloorPlan(edition)` in `src/editions/index.js`
  gate whole sections, buttons and menu links. A section that "should appear"
  but does not is usually a `showCompanies` / `showFloorPlan` flag in the
  edition config.

## Routing

```
/                          active edition (canonical), set by ACTIVE_EDITION_ID
/<Slug>                    edition home          e.g. /November2026
/<Slug>/bedrijven          its company list
/<Slug>/plattegrond        its floor plan
/voor-bedrijven /faq /privacy /terms     site-wide pages
/companies /plattegrond    legacy redirects, target set by LEGACY_ROUTE_EDITION_ID
*                          redirects to /
```

Edition routes are **generated** from the registry — do not add them by hand.

Every page must call `usePageMeta({ title, description, canonicalPath })`, or
it inherits the home page's title and canonical URL.

## Verifying a change

```bash
npm run build          # must pass
npm run preview        # leave running on :4173
npm test               # browser checks; needs: npm i --no-save playwright
                       #                       npx playwright install chromium
```

`npm run test:contrast` is a second suite. It needs no browser and no server,
and checks every colour pair against WCAG AA. Run it after any colour change.

`npm test` covers all 14 routes, language and theme persistence, the company
filter, the map hotspots, the marquee pause-on-hover, the pinned header, the
logo returning to `/`, the 1s card-close delay, and phone layout. If you change
behaviour in those areas, update `tests/smoke.mjs` to match.

## Traps

- **`node_modules/` and `dist/` are gitignored.** They were committed once;
  do not re-add them.
- **A missing comma in a data file gives a blank white page**, not a build
  error. Check the browser console.
- **The server is case-sensitive, Windows is not.** `Logo.PNG` ≠ `logo.png`
  once deployed.
- **`public/.htaccess` is required** for deep links to survive a refresh.
- **The logo always links to `/`, never to the current edition.** From the
  March archive it is the only way back to the live site.
- **The header is translucent, so its labels must clear AA against a WHITE
  section scrolling under it**, not against navy. That is why the tint is 90%.
- **Card close is delayed by 1s** (`src/shared/hooks/useHoverCard.js`). Opening
  is instant. Removing the delay brings back the open/close flicker when the
  pointer sits on a card edge.
- **The collapsed mobile menu is `inert`.** It stays mounted to animate, so
  without that its links stay in the tab order.
- **Never put an HTML tag name in angle brackets inside a comment in
  `index.html`.** Vite injects its dev-mode scripts after the first literal
  head tag it finds; if that match is inside a comment the scripts are
  commented out and `npm run dev` serves a blank page while the production
  build still works.
