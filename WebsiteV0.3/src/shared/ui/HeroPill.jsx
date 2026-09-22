// ─────────────────────────────────────────────────────────────────────────────
//  HERO PILL  —  the "Datum / Tijd / Locatie" chips under the hero title.
//
//  Three ways to use it, depending on what a click should do:
//
//    <HeroPill icon={Clock} label="13:00 - 19:00" />                     static
//    <HeroPill icon={Clock} label="13:00 - 19:00" onClick={fn} tooltip="..." />
//    <HeroPill icon={MapPin} label="HHS Delft" href={url} tooltip={address} />
//
//  `tooltip` is the small bubble that appears on hover.
//
//  ─── ABOUT THE MATERIAL ─────────────────────────────────────────────────────
//  The pill is a translucent layer over the hero, not a solid chip: a blurred
//  background plus a bright inset top edge, so it reads as a pane of glass
//  catching light rather than a painted rectangle. The interactive ones get a
//  press state; the static one does not, because nothing happens when you
//  press it and pretending otherwise is a lie about what the control does.
// ─────────────────────────────────────────────────────────────────────────────

const PILL_BASE =
  "group relative inline-flex items-center gap-2.5 rounded-full px-4 py-2.5 text-body font-medium text-white " +
  "bg-white/10 backdrop-blur-md ring-1 ring-inset ring-white/15";

const PILL_INTERACTIVE =
  "transition-[transform,background-color,box-shadow] duration-settle ease-settle " +
  "hover:bg-white/[0.18] hover:ring-white/25 " +
  "active:scale-[0.97] active:duration-press " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 " +
  "select-none [-webkit-tap-highlight-color:transparent]";

function PillInner({ icon: Icon, label, tooltip }) {
  return (
    <>
      {Icon ? <Icon className="h-4 w-4 shrink-0 text-orange" aria-hidden="true" /> : null}
      <span>{label}</span>
      {tooltip ? (
        <span
          role="tooltip"
          className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 w-max max-w-[80vw] -translate-x-1/2 translate-y-1 rounded-lg bg-navy-deep/90 px-3 py-1.5 text-caption text-white/90 opacity-0 shadow-lg shadow-black/30 backdrop-blur-sm transition-[opacity,transform] duration-settle ease-settle group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
        >
          {tooltip}
        </span>
      ) : null}
    </>
  );
}

export default function HeroPill({ icon, label, tooltip, onClick, href }) {
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={`${PILL_BASE} ${PILL_INTERACTIVE}`}
      >
        <PillInner icon={icon} label={label} tooltip={tooltip} />
      </a>
    );
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={`${PILL_BASE} ${PILL_INTERACTIVE}`}>
        <PillInner icon={icon} label={label} tooltip={tooltip} />
      </button>
    );
  }

  return (
    <div className={PILL_BASE}>
      <PillInner icon={icon} label={label} tooltip={tooltip} />
    </div>
  );
}
