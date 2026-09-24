// ─────────────────────────────────────────────────────────────────────────────
//  META ROW  —  one fact in the hero: a small label, the value, and a line
//  of detail underneath.
//
//      Wanneer                          Waar
//      Donderdag 26 november            Delft T.I.S. Campus ↗
//      13:00–19:00 · borrel vanaf 16:00 Rotterdamseweg 137, 2628 AL Delft
//
//  Put several inside a <dl> (EditionHero does this). Made for the navy hero,
//  so the colours are light.
//
//      <MetaRow label="Waar" value="Delft T.I.S. Campus"
//               detail="Rotterdamseweg 137, 2628 AL Delft" href={mapsUrl} />
//
//  With `href` or `onClick` only the VALUE becomes a link (underlined, with
//  an arrow); the label and detail stay plain text. The link's hit area is
//  44px tall without pushing the layout apart.
// ─────────────────────────────────────────────────────────────────────────────

const ARROWS = {
  down: { glyph: "↓", cls: "arr s" },
  right: { glyph: "→", cls: "arr" },
  out: { glyph: "↗", cls: "arr ne" }
};

// The value keeps the reference's tight "Campus ↗" spacing; the negative
// margin gives it a 44px hit area without pushing the rows apart.
const VALUE_LINK = "tlink -my-[9px] gap-[0.3em] text-left font-normal";

export default function MetaRow({ label, icon: Icon, value, detail, onClick, href, arrow }) {
  const Arrow = ARROWS[arrow ?? (href ? "out" : "right")];
  const arrowEl = (
    <span className={Arrow.cls} aria-hidden="true">
      {Arrow.glyph}
    </span>
  );

  let valueEl = value;
  if (href) {
    const isExternal = href.startsWith("http");
    valueEl = (
      <a
        href={href}
        className={VALUE_LINK}
        {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {value}
        {arrowEl}
      </a>
    );
  } else if (onClick) {
    valueEl = (
      <button type="button" onClick={onClick} className={VALUE_LINK}>
        {value}
        {arrowEl}
      </button>
    );
  }

  return (
    <div>
      {label || Icon ? (
        <dt className="mb-[0.4rem] text-caption text-on-dark-3">
          {label ?? <Icon className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />}
        </dt>
      ) : null}
      <dd className="text-lead leading-[1.3] text-white">
        {valueEl}
        {detail ? (
          <small className="mt-[0.35rem] block text-small tracking-normal text-on-dark-2">
            {detail}
          </small>
        ) : null}
      </dd>
    </div>
  );
}
