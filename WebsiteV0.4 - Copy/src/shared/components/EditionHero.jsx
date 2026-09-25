// ─────────────────────────────────────────────────────────────────────────────
//  EDITION HERO  —  the navy banner at the top of every edition's home page.
//  Built to design/tis-reference.html.
//
//  This is the SHELL only: the background, the bubbles, the layout and the
//  wave at the bottom. What goes inside is passed in:
//
//      <EditionHero
//        kicker="Novembereditie"          // top-right: "Novembereditie 2026"
//        title="Bedrijvendag"             // the full-width word
//        year="2026"
//        lede="Ontmoet bedrijven, ..."    // the paragraph under the rule
//        meta={<><MetaRow /><MetaRow /></>}   // Wanneer / Waar
//        actions={<><Button /><Button variant="link" /></>}
//        notice={<HeroNotice />}          // optional
//      />
//
//  `subtitle` is used when there is no `lede`, and `pills` is the old name
//  for `meta` (the March archive uses both).
//
//  ─── THE COMPOSITION ────────────────────────────────────────────────────────
//      De Haagse Hogeschool, Delft                  Novembereditie 2026
//      T.I.S. Campus                     (hover T.I.S. for the full name)
//      Bedrijvendag                      (spans the whole grid)
//      ────────────────────────────────────────────────────────────────
//      lede (cols 1–5)                  Wanneer (7–9)     Waar (10–12)
//      [Bekijk het programma ↓]  Voor bedrijven →  Voeg toe aan agenda ↗
//
//  The bubbles, the lighting-free navy and the wave are all aria-hidden.
// ─────────────────────────────────────────────────────────────────────────────
import { m } from "framer-motion";
import { useLanguage } from "../context/LanguageContext.jsx";
import { REVEAL } from "../context/MotionProvider.jsx";
import { STRINGS } from "../strings.js";
import FloatingOrbs from "../ui/FloatingOrbs.jsx";
import TisName from "../ui/TisName.jsx";
import { Container, GRID } from "../ui/Section.jsx";
import Wave from "../ui/Wave.jsx";

export default function EditionHero({
  kicker,
  title,
  year,
  lede,
  subtitle,
  meta,
  pills,
  actions,
  notice
}) {
  const { lang } = useLanguage();
  const t = STRINGS[lang];
  const facts = meta ?? pills;

  return (
    <section className="on-dark relative isolate overflow-hidden bg-navy text-white">
      <FloatingOrbs />

      <Container className="relative z-[2] pb-hero-bottom pt-hero-top">
        <m.div {...REVEAL}>
          <p className="flex flex-col gap-[0.15rem] text-small text-on-dark-2 tab:flex-row tab:justify-between">
            <span>{t.heroOrganisation}</span>
            {kicker ? (
              <span className="text-on-dark-3">
                {kicker}
                {year ? ` ${year}` : ""}
              </span>
            ) : null}
          </p>

          <h1 className="mt-hero-h1">
            <span className="mb-[0.14em] block text-display-tis">
              <TisName className="text-orange" /> {t.heroCampus}
            </span>
            <span className="-ml-[0.055em] block whitespace-nowrap text-display">{title}</span>
            {/* The year is part of the event's name for search engines and
                screen readers; visually it lives in the kicker above. */}
            {year ? <span className="sr-only"> {year}</span> : null}
          </h1>

          <div className="mt-after h-px bg-rule-dark" role="presentation" />

          <div className={`${GRID} gap-y-12 pt-8`}>
            {lede ?? subtitle ? (
              <p className="col-span-12 max-w-[30ch] text-lead text-on-dark-2 lg:col-span-5">
                {lede ?? subtitle}
              </p>
            ) : null}

            {facts ? (
              <dl className="col-span-12 grid grid-cols-1 gap-x-grid gap-y-6 tab:grid-cols-2 lg:col-span-6 lg:col-start-7">
                {facts}
              </dl>
            ) : null}

            {actions ? (
              <div className="col-span-12 flex flex-col items-stretch gap-x-8 gap-y-4 tab:flex-row tab:flex-wrap tab:items-center [&>.tlink]:self-start">
                {actions}
              </div>
            ) : null}
          </div>

          {notice ? <div className="mt-12">{notice}</div> : null}
        </m.div>
      </Container>

      <Wave size="tall" />
    </section>
  );
}

/**
 * A short announcement at the bottom of a hero, for things like "the March
 * edition is archived". An orange rule and type, not a floating panel.
 */
export function HeroNotice({ title, children }) {
  return (
    <div className="max-w-xl border-l-2 border-orange pl-6">
      <div className="font-semibold text-white">{title}</div>
      <div className="mt-1 text-body text-on-dark-2">{children}</div>
    </div>
  );
}
