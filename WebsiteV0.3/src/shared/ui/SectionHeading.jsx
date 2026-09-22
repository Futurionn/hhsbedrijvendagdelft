// ─────────────────────────────────────────────────────────────────────────────
//  SECTION HEADING  —  the small orange label + title + intro paragraph that
//  opens almost every section on the site.
//
//      <SectionHeading
//        kicker="ONZE PARTNERS"
//        title="Deelnemende bedrijven"
//        titleAccent="2026"              (optional, rendered in orange)
//        subtitle="Beweeg over een bedrijf voor meer info."
//      />
//
//  `align="left"` for two-column layouts, `align="center"` (default) for
//  full-width sections.
//
//  The sizes come from the type scale in tailwind.config.js, which carries the
//  right line-height and letter-spacing for each one. Do not set those here.
// ─────────────────────────────────────────────────────────────────────────────

export default function SectionHeading({
  kicker,
  title,
  titleAccent,
  subtitle,
  align = "center",
  id
}) {
  const isCentered = align === "center";

  return (
    <div className={isCentered ? "text-center" : "text-left"}>
      {kicker ? (
        <p className="text-kicker uppercase text-orange-deep dark:text-orange">{kicker}</p>
      ) : null}

      <h2 id={id} className="mt-3 text-title text-navy dark:text-white">
        {title}
        {titleAccent ? <span className="text-orange-deep dark:text-orange"> {titleAccent}</span> : null}
      </h2>

      {subtitle ? (
        <p
          className={`mt-4 max-w-2xl text-lead text-slate-600 dark:text-slate-300 ${
            isCentered ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
