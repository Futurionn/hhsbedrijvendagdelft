// ─────────────────────────────────────────────────────────────────────────────
//  ABOUT SECTION  —  "02 Over het event", halfway down every home page.
//
//      02 Over het event   Eén middag,                       Wanneer
//                          een netwerk verder                Donderdag 26 nov.
//                                                            ───────────────
//                          intro paragraph                   Waar
//                                                            HHS Delft
//                          ┃ Goed om te weten                ───────────────
//                          ┃ Toegang is gratis ...           Studenten ...
//
//  A statement with its body and note in columns 4–8, a list of facts
//  separated by hairlines in columns 10–12. No boxes.
//
//  All the words come from the edition's config file, under the keys
//  beginning with `about`. `number` is the section number ("02").
//
//  Its id is "about", which is what the footer's "Over het event" link and
//  the header's nav scroll to.
// ─────────────────────────────────────────────────────────────────────────────
import { useLanguage } from "../context/LanguageContext.jsx";
import { pick } from "../i18n.js";
import { Container, GRID, SectionRail } from "../ui/Section.jsx";

/**
 * A fact whose value is a timetable rather than a sentence, e.g.
 *   13:00 - 16:00  Rondlopen & ontdekken
 * Used by the March "Planning" row.
 */
function ScheduleBody({ rows, lang }) {
  return (
    <span className="block">
      {rows.map((row) => (
        <span key={row.time} className="block">
          <span className="tabular-nums">{row.time}</span> {pick(row, lang)}
        </span>
      ))}
    </span>
  );
}

/**
 * One fact. With a `label` (November): the label is the small word on top,
 * `title` an optional first line. Without one (March): the title is the label.
 */
function Fact({ card, lang }) {
  const label = card.label ? pick(card.label, lang) : pick(card.title, lang);
  const lead = card.label && card.title ? pick(card.title, lang) : null;

  return (
    <div className="border-t border-rule py-6 last:border-b dark:border-white/15">
      <dt className="text-caption text-fg-muted dark:text-slate-400">{label}</dt>
      <dd className="mt-[0.2rem] text-fact text-fg dark:text-white">
        {lead ? <span className="block">{lead}</span> : null}
        {card.schedule ? (
          <ScheduleBody rows={card.schedule} lang={lang} />
        ) : (
          <span
            className={
              lead ? "mt-1 block text-small text-fg-muted dark:text-slate-400" : "block"
            }
          >
            {pick(card.body, lang)}
          </span>
        )}
      </dd>
    </div>
  );
}

export default function AboutSection({ content, number }) {
  const { lang } = useLanguage();

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="scroll-mt-6 bg-white pb-section dark:bg-ink"
    >
      <Container className={`${GRID} lg:gap-y-16`}>
        <SectionRail number={number}>{pick(content.aboutKicker, lang)}</SectionRail>

        <div className="col-span-12 lg:col-span-5 lg:col-start-4">
          <h2 id="about-title" className="text-title text-fg dark:text-white">
            {pick(content.aboutTitle, lang)}
            <br />
            {pick(content.aboutTitleAccent, lang)}
          </h2>
          <p className="mt-8 max-w-[52ch] text-body text-fg-muted dark:text-slate-400">
            {pick(content.aboutBody, lang)}
          </p>

          {content.aboutNotice ? (
            <div className="mt-12 max-w-[46ch] border-l-2 border-orange pl-6">
              <p className="mb-1 font-semibold text-fg dark:text-white">
                {pick(content.aboutNotice.title, lang)}
              </p>
              <p className="text-body text-fg dark:text-slate-200">
                {pick(content.aboutNotice.body, lang)}
              </p>
            </div>
          ) : null}

          {content.statValue ? (
            <p className="mt-12 flex items-baseline gap-4">
              <span className="text-numeral text-fg dark:text-white">{content.statValue}</span>
              <span className="text-small text-fg-muted dark:text-slate-400">
                {pick(content.statLabel, lang)}
              </span>
            </p>
          ) : null}
        </div>

        <dl className="col-span-12 mt-16 self-end lg:col-span-3 lg:col-start-10 lg:mt-0">
          {content.aboutCards.map((card) => (
            <Fact key={pick(card.label ?? card.title, lang)} card={card} lang={lang} />
          ))}
        </dl>
      </Container>
    </section>
  );
}
