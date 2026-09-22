// ─────────────────────────────────────────────────────────────────────────────
//  ABOUT SECTION  —  the two-column block halfway down every home page:
//  a headline and intro on the left, a grid of four cards on the right.
//
//  March calls it "What to expect", November calls it "What we know". Same
//  layout, different words — and all the words come from the edition's
//  config file, under the keys beginning with `about`.
//
//  Its id is "about", which is what the footer's "Over het event" link and
//  the hero's time pill scroll to.
// ─────────────────────────────────────────────────────────────────────────────
import { useLanguage } from "../context/LanguageContext.jsx";
import { pick } from "../i18n.js";
import Card from "../ui/Card.jsx";

/**
 * A card whose body is a timetable rather than a paragraph, e.g.
 *   13:00 - 16:00  Rondlopen & ontdekken
 * Used by the March "Planning" card.
 */
function ScheduleBody({ rows, lang }) {
  return (
    <>
      {rows.map((row) => (
        <div key={row.time}>
          <strong className="font-semibold text-navy dark:text-white">
            {row.time}:
          </strong>{" "}
          {pick(row, lang)}
        </div>
      ))}
    </>
  );
}

export default function AboutSection({ content }) {
  const { lang } = useLanguage();

  return (
    <section id="about" className="bg-white py-16 dark:bg-ink md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
          {/* -- Left column: headline, intro, and either a notice or a stat -- */}
          <div>
            <p className="text-kicker uppercase text-orange-deep dark:text-orange">
              {pick(content.aboutKicker, lang)}
            </p>
            <h2 className="mt-3 text-title text-navy dark:text-white">
              {pick(content.aboutTitle, lang)}{" "}
              <span className="text-orange-deep dark:text-orange">{pick(content.aboutTitleAccent, lang)}</span>
            </h2>
            <p className="mt-5 text-lead text-slate-600 dark:text-slate-300">
              {pick(content.aboutBody, lang)}
            </p>

            {content.aboutNotice ? (
              <div className="mt-8 rounded-2xl border border-orange/20 bg-orange/[0.06] p-5 dark:bg-orange/10">
                <div className="text-kicker uppercase text-orange-deep dark:text-orange">
                  {pick(content.aboutNotice.title, lang)}
                </div>
                <p className="mt-2 text-body text-slate-700 dark:text-slate-200">
                  {pick(content.aboutNotice.body, lang)}
                </p>
              </div>
            ) : null}

            {content.statValue ? (
              <div className="mt-10">
                <div className="text-title text-navy dark:text-white">
                  {content.statValue}
                </div>
                <div className="text-heading text-slate-600 dark:text-slate-300">
                  {pick(content.statLabel, lang)}
                </div>
              </div>
            ) : null}
          </div>

          {/* -- Right column: the four cards -- */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {content.aboutCards.map((card, index) => (
              <div key={pick(card.title, lang)}>
                <Card
                  icon={card.icon}
                  title={pick(card.title, lang)}
                  body={
                    card.schedule ? (
                      <ScheduleBody rows={card.schedule} lang={lang} />
                    ) : (
                      pick(card.body, lang)
                    )
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
