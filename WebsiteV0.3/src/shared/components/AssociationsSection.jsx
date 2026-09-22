// ─────────────────────────────────────────────────────────────────────────────
//  STUDY ASSOCIATIONS  —  a quiet strip of the six organising associations.
//
//  ─── WHY IT IS SMALL ────────────────────────────────────────────────────────
//  This is a credit line, not a destination. It used to be six large cards,
//  which gave it the same visual weight as the event itself. It is now one row
//  of small logos — present, findable, clearly secondary — on the navy band
//  with the drifting starfield behind it.
//
//  Logos are knocked out to white at rest (`brightness-0 invert`) so six
//  unrelated palettes read as one row against the navy; full colour returns on
//  hover.
//
//  ─── TO REMOVE IT ───────────────────────────────────────────────────────────
//  Set `showAssociations: false` in the edition's config file. It is shown by
//  default, so an edition that says nothing about it keeps the strip.
//
//  The list of associations is in src/shared/data/associations.js
//  The heading text is in src/shared/strings.js (keys starting "associations").
// ─────────────────────────────────────────────────────────────────────────────
import { useLanguage } from "../context/LanguageContext.jsx";
import { STRINGS } from "../strings.js";
import { ASSOCIATIONS } from "../data/associations.js";
import Starfield from "../ui/Starfield.jsx";

function AssociationLink({ association }) {
  // Data files store bare domains ("angstrom.nl"); make them real links.
  const href = association.website.startsWith("http")
    ? association.website
    : `https://${association.website}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      title={`${association.name} — ${association.field}`}
      className="group flex w-[128px] flex-col items-center gap-2 rounded-xl px-2 py-2 transition-[transform,background-color] duration-settle ease-settle hover:-translate-y-0.5 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
    >
      {association.logoSrc ? (
        <img
          src={association.logoSrc}
          alt={`${association.name} logo`}
          // Knocked out to white at rest; full colour on hover. See the note
          // at the top of this file.
          className="h-9 w-auto max-w-[110px] object-contain opacity-80 brightness-0 invert transition-[opacity,filter] duration-settle ease-settle group-hover:opacity-100 group-hover:brightness-100 group-hover:invert-0"
          loading="lazy"
          decoding="async"
        />
      ) : null}

      <span className="text-center text-caption font-semibold leading-tight text-white/75 transition-colors duration-settle group-hover:text-white">
        {association.name}
      </span>
    </a>
  );
}

export default function AssociationsSection() {
  const { lang } = useLanguage();
  const t = STRINGS[lang];

  return (
    <section
      id="associations"
      className="relative scroll-mt-20 overflow-hidden bg-navy py-12"
    >
      <Starfield />

      <div className="relative mx-auto max-w-6xl px-6">
        <p className="text-center text-kicker uppercase text-white/60">
          {t.associationsKicker}
        </p>

        <div className="mt-6 flex flex-wrap items-start justify-center gap-x-2 gap-y-4 sm:gap-x-6">
          {ASSOCIATIONS.map((association) => (
            <AssociationLink key={association.name} association={association} />
          ))}
        </div>
      </div>
    </section>
  );
}
