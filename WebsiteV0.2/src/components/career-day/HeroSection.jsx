import { m } from "framer-motion";
import { Calendar, Clock, MapPin, Languages, Moon, Sun } from "lucide-react";
import { useLanguage } from "../../shared/LanguageContext.jsx";
import { STRINGS } from "../../shared/strings.js";
import { useTheme } from "../../shared/ThemeContext.jsx";

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

function Wave({ fill = "#762222" }) {
  return (
    <svg
      className="pointer-events-none absolute bottom-0 left-0 w-full"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,64 C240,120 480,120 720,80 C960,40 1200,40 1440,64 L1440,120 L0,120 Z"
        fill={fill}
      />
    </svg>
  );
}

function FloatingOrbs() {
  const orbs = [
    { size: 260, x: "10%", y: "20%", opacity: 0.09, delay: 0 },
    { size: 320, x: "65%", y: "15%", opacity: 0.08, delay: 0.2 },
    { size: 420, x: "35%", y: "55%", opacity: 0.07, delay: 0.4 },
    { size: 280, x: "85%", y: "60%", opacity: 0.08, delay: 0.1 },
    { size: 220, x: "5%", y: "70%", opacity: 0.07, delay: 0.3 }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {orbs.map((orb, idx) => (
        <m.div
          key={idx}
          className="absolute rounded-full bg-white"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            opacity: orb.opacity
          }}
          animate={{ y: [0, -18, 0], x: [0, 10, 0] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay
          }}
        />
      ))}
    </div>
  );
}

export default function HeroSection() {
  const { lang, setLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const t = STRINGS[lang];

  const yearAccent = "2026";
  const otherLang = lang === "nl" ? "en" : "nl";
  const langLabel = otherLang === "en" ? "EN" : "NL";
  const themeLabel = theme === "dark" ? (lang === "nl" ? "Licht" : "Light") : (lang === "nl" ? "Donker" : "Dark");
  const mapsHref =
    "https://www.google.com/maps/search/?api=1&query=Rotterdamseweg%20137%2C%202628%20AL%20Delft";
  const logoAlt = lang === "nl" ? "De Haagse Hogeschool" : "The Hague University of Applied Sciences";

  const goToSection = (id, offset = 0) => {
    if (typeof window === "undefined") return;

    const el = document.getElementById(id);
    if (!el) return;

    window.history?.replaceState?.(null, "", `#${id}`);

    const rectTop = el.getBoundingClientRect().top;
    const target = Math.max(0, rectTop + window.scrollY + offset);

    if (Math.abs(window.scrollY - target) < 2) {
      window.scrollTo({ top: target + 2, behavior: "auto" });
    }
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  const goCompanies = () => goToSection("companies");
  const goAbout = () => goToSection("about", 80);

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#1e3a5f] via-[#2a4a6f] to-[#1e3a5f]">
      <FloatingOrbs />

      <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-10 md:pb-28 md:pt-12">
        <div className="flex items-center justify-between gap-4">
          <img
            src="/HHS/HHS.png"
            alt={logoAlt}
            className="h-9 w-auto max-w-[220px] opacity-95 sm:h-10 sm:max-w-[320px] md:h-12"
            loading="eager"
          />

          <div className="flex flex-col items-end gap-2">
            <button
              type="button"
              onClick={() => setLang(otherLang)}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur-sm transition-all duration-500 hover:bg-white/15 hover:shadow-lg hover:shadow-[#f07c00]/25"
              aria-label="Switch language"
            >
              <Languages className="h-4 w-4 text-orange" />
              <span>{langLabel}</span>
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur-sm transition-all duration-500 hover:bg-white/15 hover:shadow-lg hover:shadow-[#f07c00]/25"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-orange" />
              ) : (
                <Moon className="h-4 w-4 text-orange" />
              )}
              <span>{themeLabel}</span>
            </button>
          </div>
        </div>

        <m.div
          {...reveal}
          className="mx-auto mt-14 max-w-3xl text-center"
        >
          <h1 className="text-5xl font-extrabold tracking-tight text-white md:text-6xl">
            <span className="text-orange">T.I.S.</span> {lang === "nl" ? "Bedrijvendag" : "Career Day"}{" "}
            <span className="text-orange">{yearAccent}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80 md:text-xl">
            {t.heroSubtitle}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 md:flex-row">
            <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-3 text-white/90 backdrop-blur-sm">
              <Calendar className="h-5 w-5 text-orange" />
              <span className="font-semibold">{t.dateValue}</span>
            </div>
            <div
              role="button"
              tabIndex={0}
              onClick={goAbout}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  goAbout();
                }
              }}
              className="inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-3 text-white/90 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 hover:cursor-pointer"
            >
              <Clock className="h-5 w-5 text-orange" />
              <span className="font-semibold">{t.timeValue}</span>
            </div>
            <a
              href={mapsHref}
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-3 text-white/90 backdrop-blur-sm transition-all duration-500 hover:bg-white/15 hover:shadow-lg hover:shadow-[#f07c00]/20"
            >
              <MapPin className="h-5 w-5 text-orange" />
              <span className="font-semibold">{t.locationValue}</span>
              <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-3 w-max -translate-x-1/2 rounded-xl bg-black/60 px-4 py-2 text-sm text-white/90 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                📍 {t.locationAddress}
              </span>
            </a>
          </div>

          <div className="mt-10">
            <button
              type="button"
              onClick={goCompanies}
              className="inline-flex items-center justify-center rounded-full bg-orange px-10 py-4 font-semibold text-white shadow-lg shadow-[#f07c00]/30 transition-all duration-500 hover:scale-105 hover:shadow-[#f07c00]/45"
            >
              {t.ctaDiscover}
            </button>
          </div>
        </m.div>
      </div>

      <Wave fill={theme === "dark" ? "#020617" : "#ffffff"} />
    </section>
  );
}
