// ─────────────────────────────────────────────────────────────────────────────
//  STUDY ASSOCIATIONS  —  the dark band at the bottom of every home page.
//
//      ~~~~~~~~~~~~~~~~~~~~~~~~~ wave: white page curving into navy ~~~~~~~~
//      04 Verenigingen     Studieverenigingen
//                          Klik op een vereniging ...
//      ─────────┬─────────┬─────────┬─────────
//        logo   │  logo   │  logo   │  logo        (hairline grid, 4/3/2
//      ─────────┼─────────┼─────────┴─────────      columns by width)
//        logo   │  logo   │
//
//      26.11.26            huge and faint, cropped by the footer below
//
//  The stars twinkle behind all of it. Logos are knocked out to white at 62%
//  and come up to 100% on hover or keyboard focus. Their alt text is the
//  association's name.
//
//  ─── TO REMOVE IT ───────────────────────────────────────────────────────────
//  Set `showAssociations: false` in the edition's config file.
//
//  The list of associations is in src/shared/data/associations.js
//  The heading text is in src/shared/strings.js (keys starting "associations").
// ─────────────────────────────────────────────────────────────────────────────
import { useLanguage } from "../context/LanguageContext.jsx";
import { STRINGS } from "../strings.js";
import { ASSOCIATIONS } from "../data/associations.js";
import { Container, GRID, SectionMain, SectionRail } from "../ui/Section.jsx";
import Starfield from "../ui/Starfield.jsx";
import Wave from "../ui/Wave.jsx";

function AssociationLogo({ association }) {
  // Data files store bare domains ("angstrom.nl"); make them real links.
  const href = association.website.startsWith("http")
    ? association.website
    : `https://${association.website}`;

  return (
    <li className="flex min-h-[112px] items-center p-6 tab:min-h-[clamp(120px,12vw,168px)]">
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="block w-full opacity-[0.62] transition-opacity duration-settle hover:opacity-100 focus-visible:opacity-100"
      >
        {association.logoSrc ? (
          <img
            src={association.logoSrc}
            alt={association.name}
            className="mx-auto block h-auto max-h-16 w-full max-w-[150px] object-contain brightness-0 invert"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <span className="block text-center font-semibold text-white">{association.name}</span>
        )}
      </a>
    </li>
  );
}

/** "26.11.26" -> 26.11 + an orange "." + 26, like the reference. */
function BigDate({ value }) {
  const cut = value.lastIndexOf(".");
  return (
    <p
      aria-hidden="true"
      className="-ml-[0.06em] mt-[clamp(4rem,8vw,7rem)] select-none whitespace-nowrap text-bigdate text-white/[0.07]"
    >
      {cut > 0 ? (
        <>
          {value.slice(0, cut)}
          <em className="not-italic text-orange opacity-90">.</em>
          {value.slice(cut + 1)}
        </>
      ) : (
        value
      )}
    </p>
  );
}

export default function AssociationsSection({ number, bigDate }) {
  const { lang } = useLanguage();
  const t = STRINGS[lang];

  return (
    <section
      id="associations"
      aria-labelledby="associations-title"
      className={`relative isolate scroll-mt-20 overflow-hidden bg-navy-deep text-white ${
        bigDate ? "" : "pb-section"
      }`}
    >
      <Wave edge="top" />
      <Starfield />

      <Container className={`${GRID} relative z-[1] pt-after-lg`}>
        <SectionRail number={number} tone="dark">
          {t.navAssociations}
        </SectionRail>

        <SectionMain>
          <h2 id="associations-title" className="max-w-[14ch] text-title text-white">
            {t.associationsTitle}
          </h2>
          <p className="mt-6 max-w-[48ch] text-body text-on-dark-2">{t.associationsSubtitle}</p>
        </SectionMain>
      </Container>

      <Container className="relative z-[1]">
        <ul className="logo-grid mt-after-lg grid grid-cols-2 border-t border-rule-dark tab:grid-cols-3 lg:grid-cols-4">
          {ASSOCIATIONS.map((association) => (
            <AssociationLogo key={association.name} association={association} />
          ))}
        </ul>

        {bigDate ? <BigDate value={bigDate} /> : null}
      </Container>
    </section>
  );
}
