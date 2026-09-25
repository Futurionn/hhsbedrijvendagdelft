// ─────────────────────────────────────────────────────────────────────────────
//  T.I.S. NAME  —  the letters "T.I.S." with a small card that explains them.
//
//      T.I.S.            ← hover, keyboard focus or tap
//      ┌──────────────────────────────────────────────────┐
//      │ T.I.S.  Faculteit Technologie, Innovatie & ...    │
//      └──────────────────────────────────────────────────┘
//
//  The letters look exactly as they do without it: no underline, no hand
//  cursor. The card fades up a moment after the pointer arrives, so passing
//  over the word on the way somewhere else does not flash it.
//
//  The card is aria-hidden but still referenced by aria-describedby, so
//  screen readers get the full name as the letters' description rather than
//  as part of the heading text: the heading still reads "T.I.S. Campus".
//
//  The full name is in src/shared/strings.js (`tisFullName`).
// ─────────────────────────────────────────────────────────────────────────────
import { useId } from "react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { STRINGS } from "../strings.js";

export default function TisName({ className = "" }) {
  const { lang } = useLanguage();
  const t = STRINGS[lang];
  const id = useId();

  return (
    <span
      tabIndex={0}
      aria-describedby={id}
      className={`group/tis relative inline-block rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-orange/60 ${className}`}
    >
      T.I.S.
      <span
        id={id}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-full z-20 mt-2 w-max max-w-[min(27rem,calc(100vw-2rem))] translate-y-1 whitespace-normal rounded-md bg-white px-3.5 py-2.5 text-left text-small font-normal normal-case leading-snug tracking-normal text-navy opacity-0 shadow-[0_12px_32px_-12px_rgba(10,20,40,0.55)] transition-[opacity,transform] duration-settle ease-settle group-hover/tis:translate-y-0 group-hover/tis:opacity-100 group-hover/tis:delay-150 group-focus/tis:translate-y-0 group-focus/tis:opacity-100"
      >
        <span className="mr-1.5 font-medium text-orange-deep">T.I.S.</span>
        {t.tisFullName}
      </span>
    </span>
  );
}
