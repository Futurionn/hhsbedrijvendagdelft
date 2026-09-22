// ─────────────────────────────────────────────────────────────────────────────
//  CARD  —  an icon, a heading and a paragraph in a rounded box.
//
//  Used by every "what to expect" / "programme" grid on the site.
//
//      import { CalendarDays } from "lucide-react";
//      <Card icon={CalendarDays} title="26 november" body="13:00 - 19:00." />
//
//  `body` can be a plain string or JSX, so it can hold bold text or a list.
//
//  Two looks:
//    <Card />                  raised on hover, for grids you browse
//    <Card variant="plain" />  static, for grids you simply read
//
//  ─── ABOUT THE HOVER ────────────────────────────────────────────────────────
//  The hover lifts the card a little and deepens its shadow, rather than
//  inverting it to a dark fill. Recolouring the whole card on hover makes a
//  grid flash as the pointer crosses it; a small lift reads as the card coming
//  forward, which is what hovering actually means here.
// ─────────────────────────────────────────────────────────────────────────────

const SHARED =
  "flex h-full flex-col rounded-2xl border p-6 " +
  "border-navy/[0.07] bg-white dark:border-white/10 dark:bg-white/[0.04]";

const HOVER =
  "transition-[transform,box-shadow,border-color] duration-settle ease-settle " +
  "shadow-[0_1px_2px_rgba(15,31,54,0.04)] " +
  "hover:-translate-y-0.5 hover:border-navy/12 hover:shadow-[0_12px_28px_-12px_rgba(15,31,54,0.22)] " +
  "dark:hover:border-white/20 dark:hover:shadow-[0_12px_28px_-12px_rgba(0,0,0,0.6)]";

export default function Card({ icon: Icon, title, body, variant = "hover" }) {
  const isHover = variant === "hover";

  return (
    <div className={`${SHARED} ${isHover ? HOVER : ""}`}>
      {Icon ? (
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange/10 text-orange">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      ) : null}

      <h3 className="mt-4 text-heading text-navy dark:text-white">{title}</h3>

      <div className="mt-2 space-y-2 text-body text-slate-600 dark:text-slate-300">
        {body}
      </div>
    </div>
  );
}
