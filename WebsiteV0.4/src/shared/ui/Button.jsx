// ─────────────────────────────────────────────────────────────────────────────
//  BUTTON  —  the one component to use for every clickable call-to-action.
//
//  It renders the right HTML element automatically:
//
//    <Button to="/faq">FAQ</Button>                  -> in-site link  (React Router)
//    <Button href="https://...">Website</Button>     -> external link (new tab)
//    <Button onClick={doThing}>Klik</Button>         -> a real <button>
//
//  Looks:
//
//    <Button>Orange, filled</Button>                  (variant="primary")
//    <Button variant="link">Typographic action</Button>
//    <Button variant="outline">Outlined, light pages</Button>
//
//  There is ONE primary button per view; every other action is a `link`:
//  underlined type whose underline retracts on hover (`.tlink` in
//  src/index.css). `link` takes its colour from the surrounding text.
//
//  On hover the primary button inverts: to navy on a light page, to white
//  inside anything marked `.on-dark` (the hero is) — see src/index.css.
//  `variant="ghost"` is the old name for `link`, kept for the March archive.
//
//  Arrows — on the FILLED buttons only (a `link` ignores `arrow` and stays a
//  plain underline). They nudge in their own direction on hover:
//
//    <Button arrow="down">Bekijk het programma</Button>    ↓  scrolls down
//    <Button arrow="right">Voor bedrijven</Button>         →  another page
//    <Button arrow="out">Voeg toe aan agenda</Button>      ↗  leaves the page
//
//  Icons (any icon from the `lucide-react` package) still work:
//    <Button icon={MapPin}>Plattegrond</Button>
//
//  The press state (`active:scale-[0.97]`) is fast on purpose: a control
//  answers the finger on the way down. Corners are 2px.
// ─────────────────────────────────────────────────────────────────────────────
import { Link } from "react-router-dom";

const BASE_CLASSES =
  "group select-none [-webkit-tap-highlight-color:transparent] " +
  "transition-[transform,background-color,border-color,color] duration-settle ease-settle " +
  "active:scale-[0.97] active:duration-press";

const VARIANT_CLASSES = {
  // The reference's `.btn`: orange with a dark label (6.7:1).
  primary:
    "btn-primary inline-flex items-center gap-3 rounded-sm bg-orange font-semibold text-orange-ink " +
    "hover:bg-navy hover:text-white dark:hover:bg-white dark:hover:text-navy",
  // Outlined in navy, for light pages; inverts on hover.
  outline:
    "inline-flex items-center justify-center gap-3 rounded-sm border border-navy/30 font-medium text-navy " +
    "hover:border-navy hover:bg-navy hover:text-white " +
    "dark:border-white/30 dark:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-navy",
  // The reference's `.tlink`.
  link: "tlink",
  ghost: "tlink"
};

const SIZE_CLASSES = {
  sm: "min-h-11 px-4 text-small",
  md: "min-h-12 px-5 text-body",
  lg: "min-h-[52px] pl-[1.375rem] pr-5 text-body"
};

const ARROWS = {
  down: { glyph: "↓", cls: "arr s" },
  right: { glyph: "→", cls: "arr" },
  out: { glyph: "↗", cls: "arr ne" }
};

export default function Button({
  children,
  to,
  href,
  onClick,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconRight: IconRight,
  arrow,
  className = "",
  ...rest
}) {
  const isLink = variant === "link" || variant === "ghost";
  const classes = [
    BASE_CLASSES,
    VARIANT_CLASSES[variant] ?? VARIANT_CLASSES.primary,
    isLink ? "" : SIZE_CLASSES[size] ?? SIZE_CLASSES.md,
    className
  ]
    .filter(Boolean)
    .join(" ");

  // Underlined links carry no arrow: the underline already says "clickable".
  // Only the filled buttons show one.
  const Arrow = arrow && !isLink ? ARROWS[arrow] : null;

  const inner = (
    <>
      {Icon ? <Icon className="h-4 w-4 shrink-0" aria-hidden="true" /> : null}
      {children}
      {IconRight ? <IconRight className="h-4 w-4 shrink-0" aria-hidden="true" /> : null}
      {Arrow ? (
        <span className={Arrow.cls} aria-hidden="true">
          {Arrow.glyph}
        </span>
      ) : null}
    </>
  );

  // An in-site route: /faq, /November2026, ...
  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {inner}
      </Link>
    );
  }

  // Anything off-site, or a mailto: link. Opens in a new tab.
  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
        {...rest}
      >
        {inner}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes} {...rest}>
      {inner}
    </button>
  );
}
