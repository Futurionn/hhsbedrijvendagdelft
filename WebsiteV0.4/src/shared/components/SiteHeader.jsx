// ─────────────────────────────────────────────────────────────────────────────
//  SITE HEADER  —  the bar pinned to the top of every page.
//
//  Logo on the left, section links in the middle, "NL / EN" and the theme
//  switch on the right (design/tis-reference.html). Below 1024px the links
//  collapse behind a "Menu" button; below 700px the language switch moves
//  into that menu too.
//
//  ─── HOW IT BEHAVES ─────────────────────────────────────────────────────────
//  At the top of the page it is invisible, so the hero reads as one clean
//  panel. As soon as the page scrolls it fades in as a translucent layer with
//  the content sliding underneath it — a floating pane of glass rather than an
//  opaque strip that permanently eats a band of the screen.
//
//  There is no border and no shadow under it: the tint alone separates it.
//
//  The tint is deliberately strong (90%). A translucent bar takes on whatever
//  scrolls beneath it, so the label contrast is only as good as its WORST
//  background — a white section. At 80% tint with 75% white labels that pair
//  falls to 4.4:1, under the AA minimum. These values hold it above 4.5:1
//  whatever passes underneath.
//
//  ─── ADDING A LINK ──────────────────────────────────────────────────────────
//  Add an entry to NAV_ITEMS below. `section` is an id on the home page and
//  scrolls to it; `route` is a normal page and navigates. Labels come from
//  src/shared/strings.js, never typed here.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { m } from "framer-motion";
import { useLanguage } from "../context/LanguageContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import { useScrollToSection } from "../hooks/useScrollToSection.js";
import { STRINGS } from "../strings.js";
import { COMPANY_REGISTRATION } from "../../site.config.js";
import { editionPath, hasCompanies } from "../../editions/index.js";
import HhsLogo from "../ui/HhsLogo.jsx";

/** How far the page must scroll before the bar materialises. */
const REVEAL_AFTER_PX = 24;

// Every control is at least 44px tall so it is easy to hit with a thumb.
const NAV_LINK =
  "inline-flex min-h-11 items-center text-small text-on-dark-2 transition-colors duration-settle hover:text-white";

const ICON_BUTTON =
  "grid h-11 w-11 place-items-center rounded-sm text-white transition-transform duration-settle active:scale-[0.94] active:duration-press";

const MENU_ITEM =
  "block w-full py-3.5 text-left text-body text-on-dark-2 transition-colors duration-settle hover:text-white";

/** "NL / EN" with the current language bold and white. */
function LanguageLabel({ lang }) {
  return (
    <>
      <b className={lang === "nl" ? "font-medium text-white" : "font-normal"}>NL</b>
      {" / "}
      <b className={lang === "en" ? "font-medium text-white" : "font-normal"}>EN</b>
    </>
  );
}

export default function SiteHeader({ edition }) {
  const { lang, toggleLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const t = STRINGS[lang];
  const scrollToSection = useScrollToSection();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const homePath = edition ? editionPath(edition) : "/";
  const isOnEditionHome = pathname === homePath || (!edition && pathname === "/");
  const companiesSection = edition && hasCompanies(edition) ? "companies" : "november-update";

  const navItems = [
    { key: "programme", label: t.navProgramme, section: companiesSection },
    { key: "about", label: t.navAbout, section: "about" },
    { key: "associations", label: t.navAssociations, section: "associations" },
    { key: "companies", label: t.footerLinkForCompanies, route: COMPANY_REGISTRATION.route },
    { key: "faq", label: t.footerLinkFaq, route: "/faq" }
  ];

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > REVEAL_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // A route change closes the menu; leaving it open across pages is disorienting.
  useEffect(() => setIsMenuOpen(false), [pathname]);

  // The collapsed menu is still in the DOM so it can animate. `inert` takes it
  // out of the tab order and hides it from screen readers while it is closed —
  // otherwise keyboard users tab into invisible links.
  useEffect(() => {
    if (menuRef.current) menuRef.current.inert = !isMenuOpen;
  }, [isMenuOpen]);

  const goToSection = (sectionId) => {
    setIsMenuOpen(false);
    if (isOnEditionHome) {
      scrollToSection(sectionId, -72); // clear the pinned bar
    } else {
      navigate(`${homePath}#${sectionId}`);
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 text-white transition-[background-color,backdrop-filter] duration-settle ease-settle ${
        isScrolled ? "bg-navy/90 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav
        aria-label={t.navLabel}
        className="mx-auto flex h-[72px] max-w-grid items-center justify-between gap-6 px-gutter tab:h-[88px]"
      >
        <HhsLogo size="hero" />

        {/* -- Section links. Hidden below 1024px; the Menu button covers them. -- */}
        <ul className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <li key={item.key}>
              {item.route ? (
                <Link to={item.route} className={NAV_LINK}>
                  {item.label}
                </Link>
              ) : (
                <button type="button" onClick={() => goToSection(item.section)} className={NAV_LINK}>
                  {item.label}
                </button>
              )}
            </li>
          ))}
        </ul>

        {/* -- Language, theme, menu -- */}
        <div className="flex items-center gap-5 text-small">
          <button
            type="button"
            onClick={toggleLang}
            className={`${NAV_LINK} hidden tab:inline-flex`}
            aria-label={t.switchLanguage}
          >
            <LanguageLabel lang={lang} />
          </button>

          <button type="button" onClick={toggleTheme} className={ICON_BUTTON} aria-label={t.toggleDarkMode}>
            {theme === "dark" ? (
              <Sun className="h-[18px] w-[18px]" strokeWidth={1.5} aria-hidden="true" />
            ) : (
              <Moon className="h-[18px] w-[18px]" strokeWidth={1.5} aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="min-h-11 text-small text-white lg:hidden"
            aria-label={isMenuOpen ? t.navClose : t.navOpen}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? t.navMenuClose : t.navMenu}
          </button>
        </div>
      </nav>

      {/* -- Phone menu. Height animates so it unfolds instead of appearing. -- */}
      <m.div
        ref={menuRef}
        initial={false}
        animate={{ height: isMenuOpen ? "auto" : 0, opacity: isMenuOpen ? 1 : 0 }}
        transition={{ type: "spring", bounce: 0, duration: 0.35 }}
        className="overflow-hidden bg-navy/95 backdrop-blur-xl lg:hidden"
      >
        <div className="mx-auto max-w-grid divide-y divide-rule-dark border-t border-rule-dark px-gutter pb-2">
          {navItems.map((item) =>
            item.route ? (
              <Link key={item.key} to={item.route} className={MENU_ITEM}>
                {item.label}
              </Link>
            ) : (
              <button
                key={item.key}
                type="button"
                onClick={() => goToSection(item.section)}
                className={MENU_ITEM}
              >
                {item.label}
              </button>
            )
          )}
          {/* On phones the language switch lives here instead of in the bar. */}
          <button type="button" onClick={toggleLang} className={`${MENU_ITEM} tab:hidden`}>
            <LanguageLabel lang={lang} />
          </button>
        </div>
      </m.div>
    </header>
  );
}
