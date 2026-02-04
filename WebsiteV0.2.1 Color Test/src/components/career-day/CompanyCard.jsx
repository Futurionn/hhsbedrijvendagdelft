import { m } from "framer-motion";
import { ExternalLink, Globe2, Users2, Briefcase } from "lucide-react";
import { useMemo } from "react";
import { useLanguage } from "../../shared/LanguageContext.jsx";
import { STRINGS } from "../../shared/strings.js";
import { useTheme } from "../../shared/ThemeContext.jsx";

function LogoOrInitials({ company, theme }) {
  const needsShadow =
    (theme === "dark" && company.logoTone === "dark") ||
    (theme !== "dark" && company.logoTone === "light");

  const shadowClass = needsShadow
    ? theme === "dark"
      ? "drop-shadow-[0_4px_10px_rgba(255,255,255,0.35)]"
      : "drop-shadow-[0_4px_10px_rgba(0,0,0,1)]"
    : "";

  if (company.logo) {
    return (
      <img
        src={company.logo}
        alt={`${company.name} logo`}
        className={`h-14 w-auto max-w-[220px] object-contain ${shadowClass}`}
        loading="lazy"
      />
    );
  }

  const initials = company.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

  return (
    <div className="text-3xl font-extrabold tracking-tight text-navy dark:text-white">
      {initials || company.name.slice(0, 2).toUpperCase()}
    </div>
  );
}

export default function CompanyCard({ company, isOpen, onOpen, onClose }) {
  const { lang } = useLanguage();
  const t = STRINGS[lang];
  const { theme } = useTheme();

  const enableClickToggle =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    !window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const toggleOpen = () => {
    if (isOpen) onClose?.();
    else onOpen?.();
  };

  const opportunityColors = useMemo(
    () => [
      "bg-orange/10 text-orange dark:bg-orange/15 dark:text-orange",
      "bg-navy/10 text-navy dark:bg-white/10 dark:text-gray-100",
      "bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-200"
    ],
    []
  );

  return (
    <m.div
      className="relative h-full cursor-pointer overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-lg shadow-black/5 dark:border-white/10 dark:bg-slate-900 dark:shadow-black/40"
      onHoverStart={onOpen}
      onHoverEnd={onClose}
      onClick={enableClickToggle ? toggleOpen : undefined}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleOpen();
        }
      }}
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{ transformOrigin: "center" }}
    >
      <div className="p-8">
        <div className="flex items-center justify-center p-6">
          <LogoOrInitials company={company} theme={theme} />
        </div>

        <m.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="overflow-hidden"
        >
          <div className="pt-7">
            <h3 className="text-2xl font-extrabold tracking-tight text-navy dark:text-white">
              {company.name}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              {company.description}
            </p>

            <div className="mt-6 space-y-3 text-sm text-gray-700 dark:text-gray-200">
              <div className="flex items-center gap-3">
                <Briefcase className="h-4 w-4 text-orange" />
                <span className="font-semibold">{t.industry}:</span>
                <span className="text-gray-600 dark:text-gray-300">{company.industry || t.tbd}</span>
              </div>
              <div className="flex items-center gap-3">
                <Users2 className="h-4 w-4 text-orange" />
                <span className="font-semibold">{t.employees}:</span>
                <span className="text-gray-600 dark:text-gray-300">{company.employees || t.tbd}</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe2 className="h-4 w-4 text-orange" />
                <span className="font-semibold">{t.region}:</span>
                <span className="text-gray-600 dark:text-gray-300">{company.location || t.tbd}</span>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm font-semibold text-navy dark:text-white">
                {t.opportunities}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {(company.opportunities || [t.tbd]).map((op, idx) => (
                  <span
                    key={op}
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      opportunityColors[idx % opportunityColors.length]
                    }`}
                  >
                    {op}
                  </span>
                ))}
              </div>
            </div>

            <a
              href={company.website}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="mt-6 inline-flex items-center gap-2 font-semibold text-orange transition-all duration-500 hover:gap-3"
            >
              {t.visitWebsite}
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </m.div>
      </div>

      <m.div
        className="absolute bottom-0 left-0 h-1 w-full origin-left bg-gradient-to-r from-orange via-[#ff9b3a] to-navy"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isOpen ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </m.div>
  );
}
