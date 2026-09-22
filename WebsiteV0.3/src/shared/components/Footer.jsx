// ─────────────────────────────────────────────────────────────────────────────
//  FOOTER  —  appears at the bottom of every single page.
//
//  Props:
//    edition   which edition's pages the "Quick links" should point at.
//              Defaults to the active edition (see src/site.config.js).
//    showCta   true adds the big "Ready to shape your future?" panel on top.
//              Home pages pass it; inner pages do not.
//
//  The text comes from src/shared/strings.js.
//  The email addresses and social links come from src/site.config.js.
// ─────────────────────────────────────────────────────────────────────────────
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.jsx";
import { STRINGS } from "../strings.js";
import {
  COMPANY_REGISTRATION,
  CONTACT,
  HHS_LINKS,
  VENUE
} from "../../site.config.js";
import {
  SUBPAGE,
  editionPath,
  getActiveEdition,
  hasCompanies
} from "../../editions/index.js";

/** One of the small square PNG icons in /public/HHS. */
/** The small square PNGs in /public/HHS. All are 378 x 403. */
function HhsIcon({ src, className = "h-10 w-10" }) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      width={378}
      height={403}
      className={`${className} shrink-0 object-contain`}
      loading="lazy"
      decoding="async"
    />
  );
}

function SocialLink({ label, src, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex items-center justify-center transition-[transform,background-color,box-shadow,color] duration-settle ease-settle active:scale-[0.97] active:duration-press hover:drop-shadow-[0_10px_12px_rgba(240,124,0,0.18)]"
    >
      <HhsIcon src={src} />
    </a>
  );
}

const LINK_CLASSES = "transition-colors duration-settle ease-settle hover:text-white";

export default function Footer({ edition, showCta = false }) {
  const { lang } = useLanguage();
  const t = STRINGS[lang];

  const currentEdition = edition ?? getActiveEdition();
  const homePath = editionPath(currentEdition);
  const showCompanyLinks = hasCompanies(currentEdition);

  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {showCta ? (
          <div className="rounded-2xl bg-white/[0.06] p-8 text-center ring-1 ring-inset ring-white/10 sm:p-10">
            <h2 className="text-title">{t.footerCtaTitle}</h2>
            <p className="mx-auto mt-3 max-w-xl text-lead text-white/70">{t.footerCtaBody}</p>
            <div className="mx-auto mt-6 flex max-w-2xl items-center justify-center gap-3 text-caption font-semibold text-white/70">
              <span className="h-2 w-2 rounded-full bg-orange" />
              <span>{t.footerFreeEntry}</span>
              <span className="text-white/40">•</span>
              <span>{t.footerOpenToAll}</span>
            </div>
          </div>
        ) : null}

        <div
          className={`${
            showCta ? "mt-16 " : ""
          }grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4`}
        >
          {/* -- About + social icons -- */}
          <div className="lg:col-span-2">
            <div className="text-heading">
              {lang === "nl" ? (
                t.footerOrganisation
              ) : (
                <>
                  The Hague University
                  <span className="text-orange"> of Applied Sciences</span>
                </>
              )}
            </div>
            <p className="mt-3 max-w-md text-body text-white/65">{t.footerAboutBody}</p>

            <div className="mt-6 flex items-center">
              <SocialLink label="Website" src="/HHS/HHSWeb.png" href={HHS_LINKS.website} />
              <SocialLink label="Instagram" src="/HHS/HHSinta.png" href={HHS_LINKS.instagram} />
            </div>
          </div>

          {/* -- Quick links -- */}
          <div>
            <h2 className="text-heading">{t.footerLinksTitle}</h2>
            <ul className="mt-4 space-y-2.5 text-body text-white/65">
              <li>
                <a className={LINK_CLASSES} href={`${homePath}#about`}>
                  {t.footerLinkAbout}
                </a>
              </li>
              {showCompanyLinks ? (
                <li>
                  <Link
                    className={LINK_CLASSES}
                    to={editionPath(currentEdition, SUBPAGE.companies)}
                  >
                    {t.footerLinkCompanies}
                  </Link>
                </li>
              ) : null}
              <li>
                <a className={LINK_CLASSES} href={`${homePath}#associations`}>
                  {t.footerLinkAssociations}
                </a>
              </li>
              <li>
                <Link className={LINK_CLASSES} to="/faq">
                  {t.footerLinkFaq}
                </Link>
              </li>
              <li>
                <Link className={LINK_CLASSES} to={COMPANY_REGISTRATION.route}>
                  {t.footerLinkForCompanies}
                </Link>
              </li>
            </ul>
          </div>

          {/* -- Contact details -- */}
          <div>
            <h2 className="text-heading">{t.footerContactTitle}</h2>
            <div className="mt-4 space-y-1 text-body text-white/65">
              <div className="flex items-center gap-3">
                <HhsIcon src="/HHS/HHSmail.png" className="h-10 w-10" />
                <a className={LINK_CLASSES} href={`mailto:${CONTACT.organisation}`}>
                  {CONTACT.organisation}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <HhsIcon src="/HHS/HHSmap.png" className="mt-0.5 h-10 w-10" />
                <span>{VENUE.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* -- Bottom bar -- */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-6 text-caption text-white/55 md:flex-row">
          <div className="space-y-2 text-center md:text-left">
            <div>© 2026 {t.footerOrganisation}.</div>
            <div>
              {t.footerSiteIssues}{" "}
              <a
                className="font-semibold text-white/80 transition-colors duration-settle ease-settle hover:text-white"
                href={`mailto:${CONTACT.webmaster}`}
              >
                {CONTACT.webmaster}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/privacy" className={LINK_CLASSES}>
              {t.footerPrivacy}
            </Link>
            <Link to="/terms" className={LINK_CLASSES}>
              {t.footerTerms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
