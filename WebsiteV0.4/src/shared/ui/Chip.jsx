// ─────────────────────────────────────────────────────────────────────────────
//  CHIP  —  a small toggle used by the filters (study, opportunity).
//
//      <Chip selected={study === "ee"} onClick={() => setStudy("ee")} count={7}>
//        Elektrotechniek
//      </Chip>
//
//  `selected` fills it navy (white in dark mode) and sets aria-pressed.
//  `onDark` is for chips that sit on the navy band.
//  `count` is an optional number shown after the label, muted.
//  `className` adds sizing, e.g. a fixed width so a row of chips never shifts.
// ─────────────────────────────────────────────────────────────────────────────

const BASE =
  "inline-flex min-h-10 items-center gap-2 rounded-sm border px-3.5 text-small font-medium " +
  "select-none [-webkit-tap-highlight-color:transparent] " +
  "transition-[transform,background-color,border-color,color] duration-settle ease-settle " +
  "active:scale-[0.97] active:duration-press";

const TONE = {
  light: {
    on: "border-navy bg-navy text-white dark:border-white dark:bg-white dark:text-navy",
    off:
      "border-rule bg-white text-fg hover:border-navy/60 " +
      "dark:border-rule-dark dark:bg-transparent dark:text-white dark:hover:border-white/60"
  },
  dark: {
    on: "border-white bg-white text-navy",
    off: "border-rule-dark text-white hover:border-white/60"
  }
};

export default function Chip({ selected = false, onClick, count, onDark = false, className = "", children }) {
  const tone = onDark ? TONE.dark : TONE.light;
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`${BASE} ${selected ? tone.on : tone.off} ${className}`}
    >
      {children}
      {count !== undefined ? (
        <span
          className={`tabular-nums ${
            selected ? "opacity-70" : onDark ? "text-on-dark-3" : "text-fg-muted dark:text-on-dark-3"
          }`}
        >
          {count}
        </span>
      ) : null}
    </button>
  );
}
