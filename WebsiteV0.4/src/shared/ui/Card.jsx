// ─────────────────────────────────────────────────────────────────────────────
//  CARD  —  a heading and a paragraph hanging from a hairline, with an
//  optional small line icon beside the heading.
//
//      import { CalendarDays } from "lucide-react";
//      <Card icon={CalendarDays} title="26 november" body="13:00 - 19:00." />
//
//  `body` can be a plain string or JSX, so it can hold bold text or a list.
//
//  Despite the name it is deliberately NOT a box: no background, no rounded
//  corners, no shadow. Put several in a grid and the rules line them up like
//  the rows of a table. (`variant` is accepted for older call sites and
//  ignored — nothing lifts on hover any more.)
// ─────────────────────────────────────────────────────────────────────────────

export default function Card({ icon: Icon, title, body }) {
  return (
    <div className="flex h-full flex-col border-t border-navy/15 pt-5 dark:border-white/15">
      <h3 className="flex items-baseline gap-2.5 text-heading text-navy dark:text-white">
        {Icon ? (
          <Icon
            className="h-4 w-4 shrink-0 translate-y-0.5 text-fg-muted dark:text-slate-400"
            strokeWidth={1.75}
            aria-hidden="true"
          />
        ) : null}
        {title}
      </h3>

      <div className="mt-2 space-y-2 text-body text-slate-600 dark:text-slate-300">
        {body}
      </div>
    </div>
  );
}
