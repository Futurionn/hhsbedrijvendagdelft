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
//    <Button>Orange, filled</Button>                        (variant="primary")
//    <Button variant="ghost">See-through, for dark heroes</Button>
//    <Button variant="outline">Outlined, for light pages</Button>
//
//  Sizes:  size="sm" | "md" (default) | "lg"
//
//  Icons (any icon from the `lucide-react` package):
//
//    import { MapPin } from "lucide-react";
//    <Button icon={MapPin}>Plattegrond</Button>           icon on the left
//    <Button iconRight={MapPin}>Plattegrond</Button>      icon on the right
//
//  ─── ABOUT THE FEEL ─────────────────────────────────────────────────────────
//  The press state (`active:scale-[0.97]`) is the important one, and it is
//  fast on purpose. A button should answer the finger the moment it goes down,
//  not when it comes back up — the instant the response lags, a control stops
//  feeling direct. Hover is secondary and slower, because a hover is the user
//  considering, not acting.
// ─────────────────────────────────────────────────────────────────────────────
import { Link } from "react-router-dom";

const BASE_CLASSES = [
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold",
  "select-none [-webkit-tap-highlight-color:transparent]",
  // Only transform and colours animate — both are cheap for the compositor.
  "transition-[transform,background-color,box-shadow,border-color]",
  "duration-settle ease-settle",
  // The press: fast, and it overrides the slower hover timing above.
  "active:scale-[0.97] active:duration-press",
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-orange/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-ink"
].join(" ");

const VARIANT_CLASSES = {
  // Solid orange, with a dark label rather than a white one.
  //
  // White text on this orange is 2.8:1 — unreadable for a lot of people, and
  // below the AA minimum. Darkening the LABEL instead of the fill keeps the
  // brand colour exactly as it is and takes the pair to 6.0:1.
  primary:
    "bg-orange text-navy-deep shadow-lg shadow-orange/25 hover:bg-orange-light hover:shadow-orange/35",
  // Frosted. Only readable on the dark navy hero background.
  ghost:
    "bg-white/12 text-white backdrop-blur-md hover:bg-white/20 ring-1 ring-inset ring-white/15",
  // Outlined. For secondary actions on white/light pages.
  outline:
    "border border-navy/15 bg-white text-navy hover:border-navy/30 hover:bg-navy/[0.03] dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
};

const SIZE_CLASSES = {
  sm: "px-4 py-2 text-caption",
  md: "px-5 py-2.5 text-body",
  lg: "px-7 py-3.5 text-body"
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
  className = "",
  ...rest
}) {
  const classes = [
    BASE_CLASSES,
    VARIANT_CLASSES[variant] ?? VARIANT_CLASSES.primary,
    SIZE_CLASSES[size] ?? SIZE_CLASSES.md,
    className
  ]
    .filter(Boolean)
    .join(" ");

  const inner = (
    <>
      {Icon ? <Icon className="h-4 w-4 shrink-0" aria-hidden="true" /> : null}
      {children}
      {IconRight ? <IconRight className="h-4 w-4 shrink-0" aria-hidden="true" /> : null}
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
