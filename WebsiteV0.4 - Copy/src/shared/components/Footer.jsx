// ─────────────────────────────────────────────────────────────────────────────
//  FOOTER  —  appears at the bottom of every single page.
//
//  Modelled on the "hover footer" pattern, in T.I.S. colours: the deep navy
//  with the stars, a warm orange glow rising from the bottom edge, and a huge
//  outlined word that lights up in orange around the mouse.
//
//                       2 6 . 1 1 . 2 6        huge outline (HoverText)
//
//      T.I.S. Bedrijvendag   Snelle links    Meer                  Contact
//      short paragraph       Over het event  Voor bedrijven •      ✉ ...
//                            Verenigingen    Privacybeleid         ⌖ ...
//                            FAQ             Gebruiksvoorwaarden   ⚠ ...
//      ──────────────────────────────────────────────────────────────────
//      [web] [insta]                      © 2026 De Haagse Hogeschool
//
//  Props:
//    edition   which edition's pages the links should point at.
//              Defaults to the active edition (see src/site.config.js).
//    bigText   the huge outlined word. The home page passes the date
//              ("26.11.26"); every other page gets "T.I.S.".
//    showCta   accepted for older call sites (the March archive passes it);
//              the footer no longer has a call-to-action panel.
//
//  The text comes from src/shared/strings.js.
//  The email addresses and social links come from src/site.config.js.
// ─────────────────────────────────────────────────────────────────────────────
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.jsx";
import { STRINGS } from "../strings.js";
import { COMPANY_REGISTRATION, CONTACT, HHS_LINKS, VENUE } from "../../site.config.js";
import {
  SUBPAGE,
  editionPath,
  getActiveEdition,
  hasCompanies
} from "../../editions/index.js";
import { Container } from "../ui/Section.jsx";
import HoverText from "../ui/HoverText.jsx";
import Starfield from "../ui/Starfield.jsx";
import TisName from "../ui/TisName.jsx";

// ── Icons: 20px line icons that take the text colour. ────────────────────────
const ICON = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true
};

const MailIcon = () => (
  <svg {...ICON}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);
const PinIcon = () => (
  <svg {...ICON}>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);
const BugIcon = () => (
  <svg {...ICON}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5v5.5M12 16.5h.01" />
  </svg>
);
const GlobeIcon = () => (
  <svg {...ICON}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z" />
  </svg>
);
const InstagramIcon = () => (
  <svg {...ICON}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <path d="M17.5 6.5h.01" />
  </svg>
);

// ── Pieces ──────────────────────────────────────────────────────────────────
const LINK = "transition-colors duration-settle hover:text-orange";

function Column({ title, children }) {
  return (
    <div>
      <h2 className="mb-4 text-heading text-white">{title}</h2>
      <ul className="space-y-2.5 text-body text-on-dark-2">{children}</ul>
    </div>
  );
}

function SocialLink({ label, href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex h-11 w-11 items-center justify-center text-on-dark-2 transition-colors duration-settle hover:text-orange"
    >
      {children}
    </a>
  );
}

export default function Footer({ edition, bigText = "T.I.S." }) {
  const { lang } = useLanguage();
  const t = STRINGS[lang];

  const currentEdition = edition ?? getActiveEdition();
  const homePath = editionPath(currentEdition);
  const showCompanyLinks = hasCompanies(currentEdition);

  return (
    <footer className="relative isolate z-[1] overflow-hidden bg-navy-deep text-white">
      <Starfield />
      {/* The warm glow rising from the bottom edge. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 0%, rgba(22,41,74,0) 60%, rgba(240,125,0,0.12) 100%)"
        }}
      />

      <Container className="relative z-[1]">
        {bigText ? <HoverText text={bigText} className="pt-[clamp(1.5rem,3vw,2.5rem)]" /> : null}

        <div className="grid grid-cols-1 gap-8 pb-10 pt-[clamp(2rem,4vw,3.5rem)] sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr] lg:gap-12">
          {/* -- Brand -- */}
          <div>
            <p className="text-heading font-medium">
              <TisName className="text-orange" /> {t.footerEvent.replace("T.I.S. ", "")}
            </p>
            <p className="mt-4 max-w-sm text-body text-on-dark-2">{t.footerAboutBody}</p>
          </div>

          <Column title={t.footerLinksTitle}>
            <li>
              <a className={LINK} href={`${homePath}#about`}>
                {t.footerLinkAbout}
              </a>
            </li>
            {showCompanyLinks ? (
              <li>
                <Link className={LINK} to={editionPath(currentEdition, SUBPAGE.companies)}>
                  {t.footerLinkCompanies}
                </Link>
              </li>
            ) : null}
            <li>
              <a className={LINK} href={`${homePath}#associations`}>
                {t.footerLinkAssociations}
              </a>
            </li>
            <li>
              <Link className={LINK} to="/faq">
                {t.footerLinkFaq}
              </Link>
            </li>
          </Column>

          <Column title={t.footerMoreTitle}>
            <li>
              <Link className={`${LINK} group inline-flex items-center gap-2.5`} to={COMPANY_REGISTRATION.route}>
                {t.footerLinkForCompanies}
                {/* Pulsing dot: registration is open. */}
                <span className="relative flex h-2 w-2" title={t.footerRegistrationOpen}>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-orange" />
                </span>
                <span className="sr-only">({t.footerRegistrationOpen})</span>
              </Link>
            </li>
            <li>
              <Link className={LINK} to="/privacy">
                {t.footerPrivacy}
              </Link>
            </li>
            <li>
              <Link className={LINK} to="/terms">
                {t.footerTerms}
              </Link>
            </li>
          </Column>

          <Column title={t.footerContactTitle}>
            <li className="flex items-start gap-3">
              <span className="mt-[3px] text-orange">
                <MailIcon />
              </span>
              <a className={`${LINK} break-all`} href={`mailto:${CONTACT.organisation}`}>
                {CONTACT.organisation}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-[3px] text-orange">
                <PinIcon />
              </span>
              <a className={LINK} href={VENUE.googleMapsUrl} target="_blank" rel="noreferrer">
                {VENUE.address}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-[3px] text-orange">
                <BugIcon />
              </span>
              <span>
                <span className="block text-small text-on-dark-3">{t.footerSiteIssues}</span>
                <a className={`${LINK} break-all`} href={`mailto:${CONTACT.webmaster}`}>
                  {CONTACT.webmaster}
                </a>
              </span>
            </li>
          </Column>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-rule-dark py-6 text-small text-on-dark-3 sm:flex-row">
          <div className="flex items-center sm:-ml-3">
            <SocialLink label={t.footerWebsite} href={HHS_LINKS.website}>
              <GlobeIcon />
            </SocialLink>
            <SocialLink label="Instagram" href={HHS_LINKS.instagram}>
              <InstagramIcon />
            </SocialLink>
          </div>
          <p className="text-center sm:text-right">
            © 2026 {t.footerOrganisation} · {t.footerEvent}
          </p>
        </div>
      </Container>
    </footer>
  );
}
