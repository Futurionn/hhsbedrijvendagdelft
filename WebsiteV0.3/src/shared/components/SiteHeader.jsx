// ─────────────────────────────────────────────────────────────────────────────
//  SITE HEADER  —  the bar pinned to the top of every page.
//
//  Logo on the left, section links in the middle, language and theme on the
//  right. On a phone the links collapse behind a menu button.
//
//  ─── HOW IT BEHAVES ─────────────────────────────────────────────────────────
//  At the top of the page it is invisible, so the hero reads as one clean
//  panel. As soon as the page scrolls it fades in as a translucent layer with
//  the content sliding underneath it — a floating pane of glass rather than an
//  opaque strip that permanently eats a band of the screen.
//
//  There is no border under it. The blur and the tint are what separate it
//  from the content; a hard 1px line would fight the soft material.
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
import { Languages, Menu, Moon, Sun, X } from "lucide-react";
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

const CONTROL =
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-caption font-semibold text-white/85 " +
  "transition-[transform,background-color,color] duration-settle ease-settle " +
  "hover:bg-white/10 hover:text-white active:scale-[0.96] active:duration-press " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70";

const NAV_LINK =
  "rounded-full px-3 py-1.5 text-caption font-semibold text-white/90 " +
  "transition-[background-color,color] duration-settle ease-settle " +
  "hover:bg-white/10 hover:text-white " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70";

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
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-settle ease-settle ${
        isScrolled
          ? "bg-navy/90 shadow-lg shadow-navy-deep/20 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label={t.navLabel}
        className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-3"
      >
        <HhsLogo size="hero" />

        {/* -- Section links. Hidden on small screens; the menu button covers them. -- */}
        <div className="ml-auto hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) =>
            item.route ? (
              <Link key={item.key} to={item.route} className={NAV_LINK}>
                {item.label}
              </Link>
            ) : (
              <button
                key={item.key}
                type="button"
                onClick={() => goToSection(item.section)}
                className={NAV_LINK}
              >
                {item.label}
              </button>
            )
          )}
        </div>

        {/* -- Language + theme -- */}
        <div className="ml-auto flex items-center gap-0.5 rounded-full bg-white/[0.06] p-1 ring-1 ring-inset ring-white/10 backdrop-blur-md lg:ml-2">
          <button
            type="button"
            onClick={toggleLang}
            className={CONTROL}
            aria-label={t.switchLanguage}
          >
            <Languages className="h-3.5 w-3.5 text-orange" aria-hidden="true" />
            <span>{lang === "nl" ? "EN" : "NL"}</span>
          </button>

          <span className="h-3.5 w-px bg-white/12" aria-hidden="true" />

          <button
            type="button"
            onClick={toggleTheme}
            className={CONTROL}
            aria-label={t.toggleDarkMode}
          >
            {theme === "dark" ? (
              <Sun className="h-3.5 w-3.5 text-orange" aria-hidden="true" />
            ) : (
              <Moon className="h-3.5 w-3.5 text-orange" aria-hidden="true" />
            )}
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className={`${CONTROL} lg:hidden`}
          aria-label={isMenuOpen ? t.navClose : t.navOpen}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <X className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Menu className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* -- Phone menu. Height animates so it unfolds instead of appearing. -- */}
      <m.div
        ref={menuRef}
        initial={false}
        animate={{ height: isMenuOpen ? "auto" : 0, opacity: isMenuOpen ? 1 : 0 }}
        transition={{ type: "spring", bounce: 0, duration: 0.35 }}
        className="overflow-hidden lg:hidden"
      >
        <div className="mx-auto max-w-6xl space-y-1 border-t border-white/10 bg-navy/90 px-6 py-4 backdrop-blur-xl">
          {navItems.map((item) =>
            item.route ? (
              <Link
                key={item.key}
                to={item.route}
                className="block rounded-xl px-3 py-2.5 text-body font-semibold text-white/85 transition-colors duration-settle hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            ) : (
              <button
                key={item.key}
                type="button"
                onClick={() => goToSection(item.section)}
                className="block w-full rounded-xl px-3 py-2.5 text-left text-body font-semibold text-white/85 transition-colors duration-settle hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </button>
            )
          )}
        </div>
      </m.div>
    </header>
  );
}
