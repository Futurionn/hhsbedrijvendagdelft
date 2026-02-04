import { m } from "framer-motion";
import { useLanguage } from "../../shared/LanguageContext.jsx";
import { STRINGS } from "../../shared/strings.js";
import { Link } from "react-router-dom";

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

function HhsIcon({ src, alt = "", className = "" }) {
  return (
    <img
      src={src}
      alt={alt}
      className={`h-12 w-12 shrink-0 object-contain ${className}`}
      loading="lazy"
      decoding="async"
    />
  );
}

function IconLink({ label, src, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex items-center justify-center transition-all duration-500 hover:scale-105 hover:drop-shadow-[0_10px_12px_rgba(240,124,0,0.18)]"
    >
      <HhsIcon src={src} alt="" />
    </a>
  );
}

export default function Footer() {
  const { lang } = useLanguage();
  const t = STRINGS[lang];

  const email = t.tbd;
  const phone = t.tbd;
  const siteIssuesEmail = "voorzitter@rheonline.nl";
  const address =
    lang === "nl"
      ? "Rotterdamseweg 137, 2628 AL Delft"
      : "Rotterdamseweg 137, 2628 AL Delft";

  const hhsWebsite = "https://www.thuas.com/";
  const hhsInstagram = "https://www.instagram.com/dehaagsehogeschool/";
  const hhsLinkedIn = "https://www.linkedin.com/school/the-hague-university-of-applied-sciences/";

  return (
    <footer className="bg-navy text-white">
      <m.div {...reveal} className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-3xl bg-white/5 p-10 text-center backdrop-blur-sm">
          <h3 className="text-3xl font-extrabold">{t.footerCtaTitle}</h3>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            {t.footerCtaBody}
          </p>
          <div className="mx-auto mt-6 flex max-w-2xl items-center justify-center gap-3 text-sm font-semibold text-white/80">
            <span className="h-2 w-2 rounded-full bg-orange" />
            <span>{lang === "nl" ? "Gratis toegang" : "Free entry"}</span>
            <span className="text-white/40">•</span>
            <span>{lang === "nl" ? "Open voor iedereen" : "Open to everyone"}</span>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="text-2xl font-extrabold">
              {lang === "nl" ? (
                "De Haagse Hogeschool"
              ) : (
                <>
                  The Hague University
                  <span className="text-orange"> of Applied Sciences</span>
                </>
              )}
            </div>
            <p className="mt-4 max-w-md text-white/70">{t.footerAboutBody}</p>

            <div className="mt-6 flex items-center">
              <IconLink label="Website" src="/HHS/HHSWeb.png" href={hhsWebsite} />
              <IconLink label="LinkedIn" src="/HHS/HHSLinkedin.png" href={hhsLinkedIn} />
              <IconLink label="Instagram" src="/HHS/HHSinta.png" href={hhsInstagram} />
            </div>
          </div>

          <div>
            <h4 className="text-lg font-extrabold">{t.footerLinksTitle}</h4>
            <ul className="mt-4 space-y-3 text-white/70">
              <li>
                <a className="transition-all duration-500 hover:text-white" href="#about">
                  {t.footerLinkAbout}
                </a>
              </li>
              <li>
                <a className="transition-all duration-500 hover:text-white" href="#companies">
                  {t.footerLinkCompanies}
                </a>
              </li>
              <li>
                <a className="transition-all duration-500 hover:text-white" href="#associations">
                  {lang === "nl" ? "Verenigingen" : "Associations"}
                </a>
              </li>
              <li>
                <Link className="transition-all duration-500 hover:text-white" to="/faq">
                  {t.footerLinkFaq}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-extrabold">{t.footerContactTitle}</h4>
            <div className="mt-4 text-white/70">
              <div className="flex items-center gap-3">
                <HhsIcon src="/HHS/HHSmail.png" alt="" className="h-10 w-10" />
                <span>{email}</span>
              </div>
              <div className="flex items-center gap-3">
                <HhsIcon src="/HHS/HHSphone.png" alt="" className="h-10 w-10" />
                <span>{phone}</span>
              </div>
              <div className="flex items-start gap-3">
                <HhsIcon src="/HHS/HHSmap.png" alt="" className="mt-0.5 h-10 w-10" />
                <span>{address}</span>
              </div>
            </div>
          </div>
        </div>
      </m.div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-white/60 md:flex-row">
          <div className="space-y-2 text-center md:text-left">
            <div>
              © 2026 {lang === "nl" ? "De Haagse Hogeschool" : "The Hague University of Applied Sciences"}.
            </div>
            <div>
              {lang === "nl" ? "Problemen met de website?" : "Website issues?"}{" "}
              <a
                className="font-semibold text-white/80 transition-all duration-500 hover:text-white"
                href={`mailto:${siteIssuesEmail}`}
              >
                {siteIssuesEmail}
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-end">
            <a
              href="https://www.galeriebrachot.be/en/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 font-semibold text-white/80 transition-all duration-500 hover:text-white"
            >
              <span>{t.footerSponsoredBy}</span>
              <img
                src="/logos/galerieb.png"
                alt="Galerie Brachot"
                className="h-6 w-auto opacity-90"
                loading="lazy"
                decoding="async"
              />
            </a>

            <div className="flex items-center gap-6">
              <Link to="/privacy" className="transition-all duration-500 hover:text-white">
                {t.footerPrivacy}
              </Link>
              <Link to="/terms" className="transition-all duration-500 hover:text-white">
                {t.footerTerms}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
