// ─────────────────────────────────────────────────────────────────────────────
//  SECTION HEADING  —  the small label + title + intro paragraph
//  that can open a section.
//
//      <SectionHeading
//        number="04"                     (optional section number)
//        kicker="ONZE PARTNERS"
//        title="Deelnemende bedrijven"
//        titleAccent="2026"              (optional, appended to the title)
//        subtitle="Beweeg over een bedrijf voor meer info."
//      />
//
//  Left-aligned by default, like every section on the home page.
//  `align="center"` still exists for the rare case that needs it.
//
//  For a section on the 12-column grid with the label in its own rail
//  (columns 1–3), use <SectionRail> + <SectionMain> from ./Section.jsx.
//
//  The sizes come from the type scale in tailwind.config.js, which carries the
//  right line-height and letter-spacing for each one. Do not set those here.
// ─────────────────────────────────────────────────────────────────────────────
export default function SectionHeading({
  number,
  kicker,
  title,
  titleAccent,
  subtitle,
  align = "left",
  id
}) {
  const isCentered = align === "center";

  return (
    <div className={isCentered ? "flex flex-col items-center text-center" : "text-left"}>
      {kicker ? (
        <p className="flex items-baseline gap-[0.9rem] text-small text-fg-muted dark:text-slate-400">
          {number ? (
            <b className="font-medium tabular-nums text-orange-deep dark:text-orange">{number}</b>
          ) : null}
          <span>{kicker}</span>
        </p>
      ) : null}

      <h2 id={id} className="mt-6 text-title text-fg dark:text-white">
        {title}
        {titleAccent ? <> {titleAccent}</> : null}
      </h2>

      {subtitle ? (
        <p className="mt-6 max-w-[48ch] text-body text-fg-muted dark:text-slate-400">{subtitle}</p>
      ) : null}
    </div>
  );
}
