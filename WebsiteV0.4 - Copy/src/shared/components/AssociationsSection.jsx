// ─────────────────────────────────────────────────────────────────────────────
//  STUDY ASSOCIATIONS  —  a quiet row of the six organising associations, at
//  the top of the dark band that runs into the footer.
//
//      ~~~~~~~~~~~~~~~~~~~~~~~~~ wave: white page curving into navy ~~~~~~~~
//                       ORGANISERENDE VERENIGINGEN
//         [logo]    [logo]    [logo]    [logo]    [logo]    [logo]
//         Ångström  Fibonacci Impuls    ...
//         T. Natuurk. Wiskunde ...                           (small, grey)
//
//  A credit line, not a destination: small logos in one row (wrapping on
//  phones), each with the association's name and study underneath. The
//  stars twinkle behind it and carry on into the footer.
//
//  ─── THE LOGOS ─────────────────────────────────────────────────────────────
//  Straight on the navy, no tiles. Set `logoTone` per logo in
//  associations.js:
//    "color"  (Ångström, BG) the logo in its own colours — they read fine
//             on the navy.
//    "white"  (default) dark-ink logos (Fibonacci, Impuls, Kybernetes,
//             Rheon) turned white, otherwise they would vanish on the navy.
//  The logo lifts slightly on hover or keyboard focus.
//
//  A "white" logo needs a TRANSPARENT background, or it turns into a white
//  block — that is why Rheon uses rheon-lineart.png (a transparent copy).
//
//  ─── TO REMOVE IT ───────────────────────────────────────────────────────────
//  Set `showAssociations: false` in the edition's config file.
//
//  The list of associations is in src/shared/data/associations.js
//  The heading text is in src/shared/strings.js (`associationsKicker`).
// ─────────────────────────────────────────────────────────────────────────────
import { useLanguage } from "../context/LanguageContext.jsx";
import { STRINGS } from "../strings.js";
import { ASSOCIATIONS } from "../data/associations.js";
import { Container } from "../ui/Section.jsx";
import Starfield from "../ui/Starfield.jsx";
import Wave from "../ui/Wave.jsx";

const LOGO_TONE = {
  white: "brightness-0 invert opacity-90",
  color: ""
};

function AssociationLink({ association }) {
  // Data files store bare domains ("angstrom.nl"); make them real links.
  const href = association.website.startsWith("http")
    ? association.website
    : `https://${association.website}`;

  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="group flex w-[128px] flex-col items-center gap-2 px-2 py-3"
      >
        {association.logoSrc ? (
          <span className="flex h-14 w-[104px] items-center justify-center transition-transform duration-settle ease-settle group-hover:-translate-y-0.5">
            <img
              src={association.logoSrc}
              alt=""
              className={`max-h-full max-w-full object-contain ${
                LOGO_TONE[association.logoTone] ?? LOGO_TONE.white
              }`}
              loading="lazy"
              decoding="async"
            />
          </span>
        ) : null}

        <span className="text-center leading-tight">
          <span className="block text-caption font-medium text-on-dark-2 transition-colors duration-settle group-hover:text-white">
            {association.name}
          </span>
          <span className="mt-0.5 block text-[0.75rem] text-on-dark-3">{association.field}</span>
        </span>
      </a>
    </li>
  );
}

export default function AssociationsSection() {
  const { lang } = useLanguage();
  const t = STRINGS[lang];

  return (
    <section
      id="associations"
      aria-labelledby="associations-title"
      className="relative isolate scroll-mt-20 overflow-hidden bg-navy-deep pb-[clamp(2.5rem,5vw,4rem)] text-white"
    >
      <Wave edge="top" />
      <Starfield />

      <Container className="relative z-[1] pt-after">
        <h2
          id="associations-title"
          className="text-center text-caption font-medium uppercase tracking-[0.14em] text-on-dark-3"
        >
          {t.associationsKicker}
        </h2>

        <ul className="mt-6 flex flex-wrap items-start justify-center gap-x-1 gap-y-2 sm:gap-x-4">
          {ASSOCIATIONS.map((association) => (
            <AssociationLink key={association.name} association={association} />
          ))}
        </ul>
      </Container>
    </section>
  );
}
