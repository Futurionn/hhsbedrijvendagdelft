# Style notes: read this before touching the design

A hand-over for the next agent (or person). The owner reviewed the V0.4
redesign over several rounds and said: **"I love it, everything, the style."**
This file records that approved state, the brief that would have got there
in one go, and what was learned on the way. `AGENTS.md` still holds the hard
rules; this file is about the look and feel.

---

## 1. The approved style: keep it exactly like this

### Overall
- **Font:** Rubik (variable, self-hosted via `@fontsource-variable/rubik`).
- **Colours:** navy `#1f3a5f` (hero), deep navy `#16294a` (bottom band),
  orange `#f07d00` for accents and actions, white pages. Dark mode is real
  and must keep working.
- **Clean, not templated.** No numbered section labels ("04 Verenigingen"
  reads as "AI vibe"). Each section gets a small plain orange label above
  its heading, and nothing else.
- **No wide empty left column.** Content uses the full grid.
- **Tight spacing.** The owner repeatedly asked for *less* vertical space.
  Section padding is `--section: clamp(3rem, 5.5vw, 5.5rem)`. When in
  doubt, tighten.
- **Phones show the PC layout, zoomed out to fit, not restacked.**
  - A script in `index.html` sets the viewport to `width=800` on any
    device whose short side is under 700px, and adds `html.pc-on-phone`.
  - The phone then shrinks the 800px layout to its screen (about 0.49× on
    390px). The page keeps the PC/tablet arrangement: Wanneer and Waar side
    by side, the timeline across, About facts 2×2, association logos in
    rows, and the footer in two columns. It is simply taller to scroll.
  - `html.pc-on-phone { font-size: 150% }` scales everything sized in rem
    (text, buttons, paddings) so it lands readable and tappable after the
    shrink. The px-sized header bar is 128px, and the gallery cards are
    1.3× bigger.
  - A company opened in the gallery becomes a near screen-wide panel
    (container width − 48px, at most 720px), centred in the gallery.
  - Pinch-zoom still works. Tablets and laptops are untouched.
  - Rejected by the owner: restacking into one column, and sideways swipe
    rows that hide items.
  - Always check 390px.
- **PCs are shown at 80%.** From 1024px up, `html { zoom: 0.8 }`
  (src/index.css), exactly like browser zoom at 80%. At 100% the owner
  found it "far too close".
  - Pointer maths must allow for it: the gallery divides by `zoomFactor()`.
  - Offsets for the pinned header are measured
    (`header.getBoundingClientRect().height`), never hard-coded.
- **Phone mode needs a small screen AND a touch screen.** The touch check
  keeps small laptop screens on the PC layout.
- **No wrapping of email addresses**: they use `whitespace-nowrap`, not
  `break-all`.
- **Underlined links have no arrow.** The underline is the cue. Only the
  filled orange buttons keep an arrow; `Button` ignores `arrow` on
  `variant="link"`, and `MetaRow` links have none.
- **Motion is smooth, never a hard cut.** Hovers must never shift the
  layout below them.

### Page, top to bottom (November home)
1. **Hero:** navy, with many translucent floating bubbles (14; some are
   hidden on phones). The heading reads **"T.I.S. Campus"**, with T.I.S. in
   orange and Campus in white, above the huge word **"Bedrijvendag"**.
   - Hovering or tapping **T.I.S.** fades in a small white card: "T.I.S.
     Faculteit Technologie, Innovatie & Samenleving".
   - The letters themselves get no underline or other visual cue
     (`src/shared/ui/TisName.jsx`). The footer brand uses the same
     component.
2. **Programme:**
   - Two time blocks on one line: 13:00–16:00 navy "Bedrijvendag" (everyone
     at their stand) and 16:00–19:00 orange "Netwerkborrel" (companies walk
     around too).
   - On hover the other block fades and the hovered one gets a tint and a
     top bar. It uses `box-shadow` and a background colour, so nothing
     below moves.
3. **Company gallery**, the owner's favourite piece
   (`CompanyGallery.jsx` + `src/shared/ui/circularGallery/`):
   - Based on 21st.dev "circular-gallery-2" by ravikatiyar162, built with
     `ogl` (WebGL).
   - **Two rows.** The bottom row is a ∩ curve and the top row its mirror
     (∪). They turn in **opposite directions**.
   - **No wavy distortion.** The cards stay flat and sharp.
   - **Card art:** logo, a hairline, the name, the sector, and an orange
     "Stand n". White card, or navy for white logos (`logoTone: "light"`).
   - **Drift:** it moves on its own. **Hovering stops it.**
   - **Moving it:** sideways trackpad swipe, shift + wheel, or drag.
   - **Vertical scrolling is never blocked.** Up/down wheel goes to the page,
     and phones use `touch-action: pan-y`.
   - **Click a card:** it glides to the centre, the others fade back, and
     it grows smoothly into a panel with the details. The panel has a
     **"Meer info"** button to `/<Edition>/bedrijven/<company-id>`, which
     shows the full list opened at that company with all its data.
   - **Closing:** Esc, the ×, clicking outside, or dragging.
   - **Before November companies exist:** November shows the March
     companies under "Zij waren er in maart".
4. **Over het event:**
   - Statement heading in the left half, with an orange accent line.
   - Facts in a 2×2 grid on the right, with orange labels and top rules.
5. **FAQ:**
   - Rows are `<details>` elements with a +/− icon, and answers slide open.
   - The items "Wie heeft deze website gemaakt?" and "Logo/bedrijfsinfo
     toevoegen…" were removed on purpose.
6. **Associations:**
   - A wave from white into the deep-navy band, with **clearly visible,
     drifting, twinkling stars**.
   - A small uppercase caption, then **one centred row of small logos**,
     each with the association name and study underneath.
   - **Logos sit straight on the navy, with no white tiles.** Coloured logos
     (Ångström, BG) keep their colours; dark-ink logos (Fibonacci, Impuls,
     Kybernetes, Rheon) are turned white (`logoTone` in `associations.js`).
     Rheon uses `rheon-lineart.png`, a transparent copy of its logo.
7. **Footer.** The owner said "I love it, save this, this is how I like it":
   - It uses the "hover footer" pattern from 21st.dev (mdafsarx) in our
     colours: deep navy, stars, and a soft orange glow from the bottom.
   - **Huge outlined date "26.11.26"** with an orange dot. It is centred on
     every screen size, draws itself in, and glows orange around the pointer
     (`HoverText.jsx`). Inner pages show "T.I.S." instead.
   - Four columns:
     - **T.I.S. Bedrijvendag:** a short about text.
     - **Snelle links.**
     - **Meer:** "Voor bedrijven" with a pulsing orange dot.
     - **Contact:** orange line icons.
   - Then the social icons and the © row.
   - **Do not redesign it.** Only ever make the spacing tighter.

### Page changes
- Pages **cross-fade**: the old page fades out (0.18s), the view jumps to
  the top while nothing is visible, and the new page fades in (0.35s).
  This is done in `PageTransition.jsx`.
- Use opacity only. A transform would unpin the fixed header.

---

## 1b. Techniques and exact values (how the look is built)

The source of truth is the code: `tailwind.config.js`, `:root` in
`src/index.css`, and `src/shared/theme.js`. These are the values as they
stand in the approved version.

### Colours
| Token | Value | Used for |
| --- | --- | --- |
| `navy` | `#1f3a5f` | Hero, page headers, the programme's navy lane |
| `navy-deep` | `#16294a` | Associations + footer band, navy company cards |
| `orange` | `#f07d00` | Fills, accents, focus ring, "T.I.S." on navy |
| `orange-deep` | `#b85900` | Orange **text** on white (4.7:1); `text-orange-deep dark:text-orange` |
| `orange-ink` | `#1a1206` | Label on the orange button (never white) |
| `fg` / `fg-muted` | `#122038` / `#5a6a80` | Body text / secondary text on white |
| `rule` / `rule-strong` / `rule-dark` | fg at 14% / fg at 90% / white at 16% | Hairlines |
| `on-dark-2` / `on-dark-3` | white 72% / white 60% | Secondary / tertiary text on navy |
| `ink` | `#020617` | Dark-mode page background |

### Type (Rubik Variable; tabular figures site-wide via `font-feature-settings: "tnum"`)
| Class | Size | Line-height / tracking / weight |
| --- | --- | --- |
| `text-display` ("Bedrijvendag") | `clamp(3.4rem, 15vw, 15rem)`; phone `clamp(3rem, 15.2vw, 6rem)` | 0.86 / −0.055em / 500 |
| `text-display-tis` ("T.I.S. Campus") | display × 0.36 (phone × 0.46) | 0.86 / −0.04em / 500 |
| `text-title` (h2) | `clamp(2.25rem, 4.6vw, 4.25rem)` | 1.02 / −0.035em / 400 |
| `text-heading` (h3, FAQ questions) | `clamp(1.25rem, 1.6vw, 1.625rem)` | 1.25 / −0.02em / 500 |
| `text-numeral` (programme times) | `clamp(3rem, 5.2vw, 5rem)` | 1 / −0.05em / 300 |
| `text-lead` (hero paragraph) | `clamp(1.1875rem, 1.4vw, 1.5rem)` | 1.38 / −0.01em |
| `text-fact` (About values) | 1.1875rem | 1.35 / −0.01em |
| `text-body` | 1.0625rem (17px) | 1.55 |
| `text-small` (labels, nav, rails) | 0.9375rem (15px) | 1.5 |
| `text-caption` | 0.8125rem (13px) | 1.45 |

Section label (`SectionRail`): `text-small font-medium`, orange-deep (orange
on dark), `mb-4`, no number. Association caption: `text-caption uppercase
tracking-[0.14em] text-on-dark-3`. `p { text-wrap: pretty }`.

### Spacing and layout
- **Grid:** 12 columns, max width 1440px (`--max`). The gutter is
  `clamp(1rem, 4.4vw, 4rem)` and the column gap `clamp(1rem, 1.7vw, 1.5rem)`.
  Use `Container` + `GRID` from `src/shared/ui/Section.jsx`.
- **Breakpoints:** `tab` = 700px (phone → tablet), `lg` = 1024px.
- **Section padding (`py-section` / `pb-section`):**
  `clamp(3rem, 5.5vw, 5.5rem)`. Sections on the same white background
  share one gap: the next section only takes `pb-section`.
- **After a heading:** `after` = `clamp(1.5rem, 3vw, 2.5rem)`,
  `after-lg` = `clamp(2rem, 4vw, 3.5rem)`.
- **Hero:** `hero-top` = `clamp(120px, 15vh, 168px)`,
  `hero-bottom` = `clamp(120px, 14vw, 220px)`,
  `hero-h1` = `clamp(2.5rem, 6vh, 4.5rem)`.
- **Programme:** the timeline starts `mt-[clamp(2rem,3.5vw,3rem)]` below;
  the "Voor bedrijven" link row sits `mt-[clamp(2rem,4vw,3.5rem)]` below.
- **About:** body `mt-6`, notice `mt-8`, facts grid `gap-y-6`.
- **Footer:**
  - Big date `pt-[clamp(1.5rem,3vw,2.5rem)]`.
  - Columns `pt-[clamp(2rem,4vw,3.5rem)] pb-10 gap-8` (`lg:gap-12`),
    laid out `lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]`.
  - Column heading `mb-4`, list `space-y-2.5`.

### Boxes, lines and shapes
- **Radius:** a single 2px radius (`rounded-sm`) for buttons and boxes.
  Bubbles and stars are the only circles. Exceptions:
  - The gallery cards: an 8px radius on a 480px texture, about 4px on
    screen.
  - The gallery detail panel and the T.I.S. hover card use `rounded-md`.
- **Separators:** hairlines and top rules, not boxes.
  - About facts: `border-t border-rule-strong`, `pt-5`.
  - FAQ: a `border-t` over the list, then `border-b` per row.
- **Shadows:** almost none. Only the hover cards and panels have one:
  - T.I.S. card: `0 12px 32px -12px`.
  - Gallery panel: `0 24px 60px -24px`.
  - Gallery card art: blur 12, offset-y 4, fg at 16%.
- **Focus:** `outline: 2px solid orange; outline-offset: 3px`, keyboard only.

### Motion
- **Easing:** `cubic-bezier(0.2, 0.7, 0.2, 1)` (`--ease` / `ease-settle`).
- **Durations:** `press` 110ms (button pressed), `settle` 200ms (colour and
  state changes), `draw`/`--dur` 450ms (underlines, arrows, FAQ).
- **Buttons:** `active:scale-[0.97] active:duration-press`. Animate only
  `transform`/`opacity`, never `transition-all`.
- **Links (`.tlink`):**
  - The underline sits 10px under the text and retracts to the right on
    hover.
  - No arrow on underlined links.
  - The arrows on the filled buttons nudge 4px in their own direction
    (↓ moves 3px down).
  - "Voor bedrijven": an orange 2px underline draws in under the title
    (no arrow).
- **Framer spring:** `{ type: "spring", bounce: 0, duration: 0.5 }`.
  `REVEAL` is hero-only: opacity 0→1 and y 12→0.
- **Page fade:** out 0.18s ease-in, in 0.35s; opacity only.
- **FAQ:**
  - `::details-content` block-size 0 → auto with
    `interpolate-size: allow-keywords`.
  - The answer fades in from −6px.
  - The + rotates to −.
- **Programme hover** (desktop with a mouse only):
  - The other lanes fade to 0.4.
  - The hovered lane gets `background: var(--lane-bg)` and
    `box-shadow: 0 -4px 0 0 var(--lane-c)`.
  - Padding and the 5px top border are there at rest, so nothing moves.
  - Navy lane: `--lane-bg` is navy at 5%. Orange lane: orange at 7%.
- **Bubbles (`.bubble`, `FloatingOrbs.jsx`):**
  - 14 of them. Look: a radial white gradient lit from 32%/28% (13% → 2%
    opacity) plus an inset 1px white ring at 6%.
  - Each drifts 9–26s, alternating.
  - The `wide` ones are hidden below 700px.
- **Stars (`Starfield.jsx`):**
  - 160 of them, 1.5, 2 or 3px, with a glow of 5 or 10px (white at 55%).
  - Opacity 0.4–0.9, twinkling from 0.3× to 1.3× over 2.2–5.8s.
  - The whole field drifts on a 30s loop (±20–30px).
- **Footer date (`HoverText.jsx`):**
  - SVG text: font-size 100px in viewBox units, weight 500, −0.05em
    tracking.
  - The viewBox is cropped to the cap height using `getBBox`, which is what
    keeps it centred on every screen size.
  - Three layers:
    - a faint base (stroke white 14%, fill 3%);
    - a stroke that draws itself in (white 45%, dash 1000, 4s, started by
      an IntersectionObserver);
    - an orange → white gradient stroke (width 0.8), shown through a
      radial mask of radius width × 0.22 that follows the pointer.
  - The dot is orange.
  - Glow behind the footer:
    `radial-gradient(125% 125% at 50% 0%, transparent 60%, rgba(240,125,0,0.12) 100%)`.
- **T.I.S. hover card:**
  - Fades in and rises from `translate-y-1`, 200ms, with a 150ms delay on
    mouse hover (none on focus).
  - It is `aria-hidden` but linked by `aria-describedby`.
- **Association logos:** lift 2px on hover (`-translate-y-0.5`). The name
  goes from `on-dark-2` to white.

### Company gallery numbers (`circularGallery/engine.js`, `layoutFor`)
- **Card size:**
  - Laptop: height `clamp(200, 17% of width, 250)px`.
  - Phone: 176px.
  - Width is 0.8 × height (portrait 4:5).
- **Row gap:** 32px (phone 20).
- **Curve lift at the screen edges:** `min(90, 6% of width)` (phone 24).
- **Card spacing:** 16% of the card width (phone 14%).
- **Container height:** 2 × (card + gap/2 + lift) + 24.
- **Camera:** FOV 45 at z 20. The curve is the circle through the centre
  and both edges; each card is rotated to follow it.
- **Rows:** bottom = ∩ moving with the scroll value `s`; top = ∪ moving
  with −s. Positions wrap within one loop; the list is repeated until a
  loop is wider than the screen.
- **Speeds:**
  - Drift: 26px/s, stopped while hovered and with reduced motion.
  - Scroll smoothing: lerp 0.075 (0.25 while dragging).
  - A drag starts after 6px of mostly horizontal movement.
- **Opening a card:**
  - The clicked card glides to x = 0, and the other cards dim to 28%.
  - The HTML panel then springs from the card's size to
    `max(1.7 × card width, 340px)`, capped at screen width − 24px, with
    height `auto`.
  - Its content fades in 0.12s later.
- **Card art (canvas 480×600, 14px margin for the shadow):**
  - The logo is fitted into the top half: at most 86% of the width and 70%
    of the height.
  - A hairline at 54% of the card's height.
  - The name at weight 500, 38px, up to 2 lines.
  - The sector at weight 400, 27px, muted.
  - "Stand n" in orange, weight 500, 25px, at the bottom.
- **Performance:** the WebGL code is split out and loaded only when the
  section is on screen (about 18 KB gzipped). Nothing is drawn while it is
  off-screen.

---

## 2. What should have been asked (the one-shot brief)

If you are starting from the V0.3 site, this brief produces the approved
design:

> Redesign the home page, but keep the site's identity: navy, orange,
> white, and the Rubik font.
> - **Hero:** "T.I.S. Campus" above a huge "Bedrijvendag", with lots of
>   floating bubbles. Hovering T.I.S. shows "Faculteit Technologie,
>   Innovatie & Samenleving" in a small card, with no visual cue on the
>   letters.
> - **Programme:** two time blocks on one line, "13–16 Bedrijvendag"
>   (everyone at their stand) and "16–19 Netwerkborrel" (companies move
>   around). Hovering highlights a block without moving anything below it.
> - **Companies:** the 21st.dev circular-gallery-2 animation without the
>   wavy effect, as two mirrored rows (∪ on top of ∩) turning opposite
>   ways. Hover stops the autoscroll; horizontal scrolling moves it;
>   vertical page scrolling is never blocked. Clicking a card smoothly
>   opens more info on the card, with a "Meer info" button to
>   /bedrijven/<company> showing all its data.
> - **Over het event:** a compact statement plus a 2×2 grid of facts, with
>   no big empty left column.
> - **FAQ:** answers slide open. Drop the "who made this site" and
>   "logo/info feedback" items.
> - **Associations:** clearly moving stars. One small centred row of logos
>   with name and study under each, placed directly on the navy with no
>   tiles. Coloured logos keep their colours; dark ones turn white.
> - **Footer:** the 21st.dev "hover-footer" in our colours, with a huge
>   centred outlined date "26.11.26" and the old four-column footer
>   content under it.
> - **Everywhere:** no section numbers, tight spacing, smooth page
>   transitions, and clean on phones.

---

## 3. What was learned (for agents)

### About the owner
- They review visually, on a laptop **and** a home PC with a different
  screen size. Anything that is "centred" must use real measurement (the
  footer date uses SVG `getBBox`), not a fixed `vw` size.
- They reject "AI-template" tells: numbered sections, a slide-up on every
  block, empty rails.
- They link 21st.dev components as references. Those pages need a login,
  so ask them to paste the code, which they will.
- When they say "save this", they mean write it down so it is kept. It
  does not mean "commit".
- They prefer a short plan followed by building, over lots of questions.

### Technical traps hit this round
- **21st.dev gallery scrolling:** the original listens to `wheel` on
  `window`, which hijacks page scrolling. Only react to wheel events where
  `|deltaX| > |deltaY|`, attached to the gallery element.
- **Logo tone filters:**
  - A white-on-navy filter (`brightness-0 invert`) needs a **transparent**
    PNG, or the logo becomes a white block.
  - A grey or invert filter on colour logos makes them muddy, so the
    treatment is set per logo.
- **Stroke draw-in animation:** `vector-effect: non-scaling-stroke` breaks
  `stroke-dash` draw-in animations. Use stroke widths in viewBox units.
- **Canvas card art:**
  - SVG logos without `width`/`height` draw at 0×0 on a canvas. Fetch the
    SVG and give it explicit dimensions (see `cardArt.js`).
  - Wait for `document.fonts.load(...)` before drawing, or the cards use
    the fallback font.
- **Headless screenshots with Edge:**
  - `--virtual-time-budget` freezes Framer Motion's animations, which gives
    blank pages. Drive a real-time browser over CDP (`--remote-debugging-port`)
    instead.
  - Very tall windows sometimes skip painting the hero text. That is a
    capture artifact, not a bug.
  - A `file://` iframe goes blank. Serve the test wrapper from `dist/`.
  - Synthetic touch-scroll gestures don't scroll the page in headless mode,
    so check `touch-action: pan-y` on the gallery element instead.
- **Never run `taskkill /IM msedge.exe`.** It closes the owner's own
  browser. Close only the test browser (CDP `Browser.close`).
- **Checking a WebGL canvas:** you can't read its state from the DOM.
  Compare two screenshots of the canvas instead (equal means paused).

### Rules from AGENTS.md that are easy to break
- **`src/editions/march-2026/` is frozen.**
  - An agent "fixed" garbled `IndustriÃ«le` / `efficiÃ«ntie` there and had
    to revert it.
  - It is still garbled and shows on the Bilfinger and Quooker cards. Only
    the owner can decide to fix it.
- **No raw hex in components.** JS colours come from `src/shared/theme.js`
  (`BRAND`).
- **`tests/smoke.mjs` must follow behaviour changes.**
  - It still tests the OLD marquee (sections 4, 5 and 7: `.marquee-scroll`,
    hover-to-open cards, the 1s close delay). Those checks will fail now
    that the gallery replaced the marquee.
  - A rewrite was drafted and then undone at the owner's request.
  - To check the gallery, compare canvas screenshots: drift, hover-pause,
    vertical wheel passes through, sideways wheel moves it, click opens,
    Esc closes, "Meer info" navigates, phone tap and ×.
  - Running the suite needs `npm i --no-save playwright` and
    `npx playwright install chromium`. Ask the owner first.

---

## 4. Open items
- Nothing is committed yet. The owner decides when.
- The garbled "ë" in the March data (see above) is waiting on the owner.
- `tests/smoke.mjs` still tests the old marquee and needs updating for
  the gallery (only when the owner asks).
- The gallery hint says "klik" on phones too; "tik" might read better.
- A `WebsiteV0.4 - Copy` folder sits next to the project. The owner made
  it, so leave it alone.
