// ─────────────────────────────────────────────────────────────────────────────
//  SECTION PRIMITIVES  —  the pieces every section is built from.
//
//    <Container>      the master grid box: max 1440px, the page gutter on
//                     both sides. Add GRID (below) to the element that holds
//                     a rail and its content.
//
//    <SectionRail>    the section's name, a small orange label above the
//                     heading ("Programma"), full width.
//
//    <SectionMain>    the section's content, full width.
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
  light: "text-orange-deep dark:text-orange",
  dark: "text-orange"
};

// `number` is still accepted so older call sites keep working, but it is no
// longer printed: the label alone sits above the heading, full width, so no
// left column is left empty.
export function SectionRail({ children, tone = "light", className = "" }) {
  return (
    <p
      className={`col-span-12 mb-4 text-small font-medium ${RAIL_TONES[tone] ?? RAIL_TONES.light} ${className}`}
    >
      {children}
    </p>
  );
}

export function SectionMain({ className = "", children }) {
  return <div className={`col-span-12 ${className}`}>{children}</div>;
}

export function Rule({ tone = "light", className = "" }) {
  const color = tone === "dark" ? "bg-rule-dark" : "bg-rule dark:bg-white/15";
  return <div className={`h-px ${color} ${className}`} role="presentation" />;
}
