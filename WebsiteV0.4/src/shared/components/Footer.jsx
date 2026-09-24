// ─────────────────────────────────────────────────────────────────────────────
//  FOOTER  —  appears at the bottom of every single page.
//
//  One ruled bar on the dark navy, as in design/tis-reference.html:
//
//      © 2026 De Haagse Hogeschool · T.I.S. Bedrijvendag     Over het event
//      bedrijvendagdelft@hhs.nl · Rotterdamseweg 137 ...     Verenigingen  FAQ
//      Problemen met de website? voorzitter@...              Voor bedrijven ...
//
//  On the home page it follows the dark associations band directly, so the
//  big faint date there looks cropped by it.
//
//  Props:
//    edition   which edition's pages the links should point at.
//              Defaults to the active edition (see src/site.config.js).
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

// 44px tall so each link is a comfortable touch target.
const NAV_LINK =
  "inline-flex min-h-11 items-center transition-colors duration-settle hover:text-white";

const INLINE_LINK =
  "text-on-dark-2 underline decoration-white/30 underline-offset-4 transition-colors duration-settle hover:text-white hover:decoration-white";

export default function Footer({ edition }) {
  const { lang } = useLanguage();
  const t = STRINGS[lang];

  const currentEdition = edition ?? getActiveEdition();
  const homePath = editionPath(currentEdition);
  const showCompanyLinks = hasCompanies(currentEdition);

  return (
    <footer className="relative z-[1] bg-navy-deep text-on-dark-3">
      <Container className="flex flex-wrap items-start justify-between gap-x-8 gap-y-6 border-t border-rule-dark pb-12 pt-8 text-small">
        <div className="space-y-1">
          <p>
            © 2026 {t.footerOrganisation} · {t.footerEvent}
          </p>
          <p>
            <a className={INLINE_LINK} href={`mailto:${CONTACT.organisation}`}>
              {CONTACT.organisation}
            </a>{" "}
            · {VENUE.address}
          </p>
          <p>
            {t.footerSiteIssues}{" "}
            <a className={INLINE_LINK} href={`mailto:${CONTACT.webmaster}`}>
              {CONTACT.webmaster}
            </a>
          </p>
        </div>

        <nav aria-label={t.footerLinksTitle} className="flex max-w-2xl flex-wrap gap-x-6">
          <a className={NAV_LINK} href={`${homePath}#about`}>
            {t.footerLinkAbout}
          </a>
          {showCompanyLinks ? (
            <Link className={NAV_LINK} to={editionPath(currentEdition, SUBPAGE.companies)}>
              {t.footerLinkCompanies}
            </Link>
          ) : null}
          <a className={NAV_LINK} href={`${homePath}#associations`}>
            {t.footerLinkAssociations}
          </a>
          <Link className={NAV_LINK} to="/faq">
            {t.footerLinkFaq}
          </Link>
          <Link className={NAV_LINK} to={COMPANY_REGISTRATION.route}>
            {t.footerLinkForCompanies}
          </Link>
          <Link className={NAV_LINK} to="/privacy">
            {t.footerPrivacy}
          </Link>
          <Link className={NAV_LINK} to="/terms">
            {t.footerTerms}
          </Link>
          <a className={NAV_LINK} href={HHS_LINKS.website} target="_blank" rel="noreferrer">
            {t.footerWebsite}
          </a>
          <a className={NAV_LINK} href={HHS_LINKS.instagram} target="_blank" rel="noreferrer">
            Instagram
          </a>
        </nav>
      </Container>
    </footer>
  );
}
