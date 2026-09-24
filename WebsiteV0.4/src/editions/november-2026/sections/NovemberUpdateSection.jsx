// ─────────────────────────────────────────────────────────────────────────────
//  NOVEMBER UPDATE SECTION  —  "01 Programma": the day as a time axis. It
//  stands in for the company list while participants are being confirmed.
//
//  It disappears on its own: as soon as `showCompanies` is true in
//  edition.config.js AND data/companies.js has entries, NovemberHome swaps
//  this section out for the real scrolling company logos.
//
//      01 Programma   Donderdag 26 november
//
//                     13:00                   16:00            19:00
//                     ┬──────┬──────┬──────┬──────┬──────┬──────┐   ← axis
//                     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   navy lane
//                     13:00–19:00 Bedrijvendag ...
//                                             ━━━━━━━━━━━━━━━━━━━━   orange lane
//                                             16:00–19:00 Netwerkborrel
//
//                     Voor bedrijven                              →
//
//  The lanes are placed on a grid with one column per hour, so a lane's
//  from/to in the config IS its position. On phones the axis goes and each
//  lane becomes a row with a coloured left border and its own time.
//
//  All the wording comes from ../edition.config.js (keys starting `update`).
// ─────────────────────────────────────────────────────────────────────────────
import { Link } from "react-router-dom";
import { useLanguage } from "../../../shared/context/LanguageContext.jsx";
import { pick } from "../../../shared/i18n.js";
import { COMPANY_REGISTRATION } from "../../../site.config.js";
import { Container, GRID, SectionMain, SectionRail } from "../../../shared/ui/Section.jsx";
import { NOVEMBER_2026_CONTENT as content } from "../edition.config.js";

/** "16:00" -> 16 */
const hourOf = (time) => Number.parseInt(time, 10);

const LANE_TONES = {
  navy: "border-navy dark:border-slate-300",
  orange: "border-orange"
};

function Timeline({ timeline, lang }) {
  const start = hourOf(timeline.start);
  const hours = hourOf(timeline.end) - start;

  return (
    <div className="mt-[clamp(2.5rem,5vw,4.5rem)]">
      {/* The printed times and the axis are a picture of the lanes below,
          which carry the same times as text — so screen readers skip them. */}
      <div aria-hidden="true" className="hidden tab:block">
        <div className="relative h-[1em] text-numeral text-fg dark:text-white">
          {timeline.marks.map((mark, index) => {
            const isFirst = index === 0;
            const isLast = index === timeline.marks.length - 1;
            const offset = ((hourOf(mark) - start) / hours) * 100;
            return (
              <span
                key={mark}
                className="absolute top-0"
                style={
                  isFirst ? { left: "-0.04em" } : isLast ? { right: 0 } : { left: `${offset}%` }
                }
              >
                {mark}
              </span>
            );
          })}
        </div>
        <div className="tl-axis mt-[clamp(1rem,2vw,1.5rem)]" style={{ "--hours": hours }} />
      </div>

      <ol
        className="grid grid-cols-1 gap-y-8 tab:mt-8 tab:[grid-template-columns:repeat(var(--hours),minmax(0,1fr))]"
        style={{ "--hours": hours }}
      >
        {timeline.lanes.map((lane, index) => (
          <li
            key={lane.from + lane.to}
            className={`border-l-4 pl-6 tab:border-l-0 tab:border-t-[5px] tab:pl-0 tab:pt-6 tab:[grid-column:var(--lane)] ${
              LANE_TONES[lane.tone] ?? LANE_TONES.navy
            } ${index > 0 ? "ml-8 tab:ml-0" : ""}`}
            style={{
              "--lane": `${hourOf(lane.from) - start + 1} / ${hourOf(lane.to) - start + 1}`
            }}
          >
            <p className="text-[2.25rem] font-light leading-[1.1] tracking-[-0.04em] text-fg dark:text-white tab:text-small tab:font-normal tab:tracking-normal tab:text-fg-muted dark:tab:text-slate-400">
              <time dateTime={lane.from}>{lane.from}</time>–<time dateTime={lane.to}>{lane.to}</time>
            </p>
            <h3 className="mt-[0.2rem] text-heading text-fg dark:text-white">{pick(lane.title, lang)}</h3>
            <p className="mt-[0.35rem] max-w-[36ch] text-body text-fg-muted dark:text-slate-400">
              {pick(lane.body, lang)}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function NovemberUpdateSection() {
  const { lang } = useLanguage();
  const companies = content.updateCompanies;

  return (
    <section
      id="november-update"
      aria-labelledby="november-update-title"
      className="scroll-mt-6 bg-white py-section dark:bg-ink"
    >
      <Container className={GRID}>
        <SectionRail number="01">{pick(content.updateKicker, lang)}</SectionRail>

        <SectionMain>
          <h2 id="november-update-title" className="text-title text-fg dark:text-white">
            {pick(content.updateTitle, lang)}
          </h2>
          <p className="mt-6 max-w-[48ch] text-body text-fg-muted dark:text-slate-400">
            {pick(content.updateSubtitle, lang)}
          </p>

          <Timeline timeline={content.updateTimeline} lang={lang} />

          {companies ? (
            <Link
              to={COMPANY_REGISTRATION.route}
              className="bizlink mt-[clamp(3.5rem,7vw,6rem)] grid grid-cols-1 items-center gap-4 border-b border-t border-b-rule border-t-rule-strong py-8 dark:border-b-white/15 dark:border-t-white/70 tab:grid-cols-[1fr_auto]"
            >
              <div>
                <strong className="bizlink-title inline text-title font-normal leading-none text-fg dark:text-white">
                  {pick(companies.title, lang)}
                </strong>
                <span className="mt-[0.6rem] block max-w-[60ch] text-body text-fg-muted dark:text-slate-400">
                  {pick(companies.body, lang)}
                </span>
              </div>
              <span
                className="bizlink-arr hidden text-title font-light leading-none text-fg dark:text-white tab:block"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          ) : null}
        </SectionMain>
      </Container>
    </section>
  );
}
