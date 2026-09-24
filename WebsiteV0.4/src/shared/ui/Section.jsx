// ─────────────────────────────────────────────────────────────────────────────
//  SECTION PRIMITIVES  —  the pieces every section is built from.
//
//    <Container>      the master grid box: max 1440px, the page gutter on
//                     both sides. Add GRID (below) to the element that holds
//                     a rail and its content.
//
//    <SectionRail>    the section's number and name, in columns 1–3:
//                         01  Programma
//                     On tablets and phones it sits above the content.
//
//    <SectionMain>    the section's content, in columns 4–12.
//
//    <Rule>           a hairline.
//
//  `tone="dark"` on SectionRail and Rule is for the navy backgrounds.
// ─────────────────────────────────────────────────────────────────────────────

/** The 12-column grid. Spread onto the element that holds rail + main. */
export const GRID = "grid grid-cols-12 gap-x-grid";

export function Container({ as: Tag = "div", className = "", children, ...rest }) {
  return (
    <Tag className={`mx-auto w-full max-w-grid px-gutter ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

const RAIL_TONES = {
  light: { number: "text-orange-deep dark:text-orange", text: "text-fg-muted dark:text-slate-400" },
  dark: { number: "text-orange", text: "text-on-dark-3" }
};

export function SectionRail({ number, children, tone = "light", className = "" }) {
  const t = RAIL_TONES[tone] ?? RAIL_TONES.light;

  return (
    <p
      className={`col-span-12 mb-6 flex items-baseline gap-[0.9rem] text-small lg:col-span-3 lg:mb-0 lg:pt-[0.6rem] ${t.text} ${className}`}
    >
      {number ? <b className={`font-medium tabular-nums ${t.number}`}>{number}</b> : null}
      <span>{children}</span>
    </p>
  );
}

export function SectionMain({ className = "", children }) {
  return <div className={`col-span-12 lg:col-span-9 lg:col-start-4 ${className}`}>{children}</div>;
}

export function Rule({ tone = "light", className = "" }) {
  const color = tone === "dark" ? "bg-rule-dark" : "bg-rule dark:bg-white/15";
  return <div className={`h-px ${color} ${className}`} role="presentation" />;
}
