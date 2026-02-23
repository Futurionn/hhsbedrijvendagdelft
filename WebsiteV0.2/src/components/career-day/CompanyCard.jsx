import { m } from "framer-motion";
import { ExternalLink, Globe2, Users2, Briefcase } from "lucide-react";
import { useMemo } from "react";
import { useLanguage } from "../../shared/LanguageContext.jsx";
import { STRINGS } from "../../shared/strings.js";

function LogoOrInitials({ company }) {
  const initialsClass =
    company.logoTone === "light"
      ? "text-white"
      : company.logoTone === "dark"
        ? "text-navy"
        : "text-navy dark:text-white";

  if (company.logo) {
    return (
      <img
        src={company.logo}
        alt={`${company.name} logo`}
        className="h-14 w-auto max-w-[220px] object-contain"
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
    <div className={`text-3xl font-extrabold tracking-tight ${initialsClass}`}>
      {initials || company.name.slice(0, 2).toUpperCase()}
    </div>
  );
}

export default function CompanyCard({
  company,
  isOpen,
  isMuted = false,
  showHoverHint = false,
  onOpen,
  onClose
}) {
  const { lang } = useLanguage();
  const t = STRINGS[lang];
  const isDarkSurface = company.logoTone === "light";
  const isWhiteSurface = company.logoTone === "dark";
  const cardSurfaceClass =
    company.logoTone === "light"
      ? "border-slate-800 bg-slate-900 shadow-black/35"
      : company.logoTone === "dark"
        ? "border-gray-100 bg-white shadow-black/5"
        : "border-gray-100 bg-white shadow-black/5 dark:border-white/10 dark:bg-slate-900 dark:shadow-black/40";
  const primaryTextClass = isDarkSurface
    ? "text-white"
    : isWhiteSurface
      ? "text-slate-900"
      : "text-navy dark:text-white";
  const secondaryTextClass = isDarkSurface
    ? "text-gray-200"
    : isWhiteSurface
      ? "text-slate-700"
      : "text-gray-600 dark:text-gray-300";
  const metaTextClass = isDarkSurface
    ? "text-gray-100"
    : isWhiteSurface
      ? "text-slate-800"
      : "text-gray-700 dark:text-gray-200";
  const valueTextClass = isDarkSurface
    ? "text-gray-200"
    : isWhiteSurface
      ? "text-slate-700"
      : "text-gray-600 dark:text-gray-300";

  const enableClickToggle =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    !window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const toggleOpen = () => {
    if (isOpen) onClose?.();
    else onOpen?.();
  };

  const opportunityColors = useMemo(() => {
    if (isDarkSurface) {
      return [
        "bg-orange/20 text-orange-100",
        "bg-white/10 text-white",
        "bg-white/15 text-gray-100"
      ];
    }

    if (isWhiteSurface) {
      return [
        "bg-orange/10 text-orange-700",
        "bg-navy/10 text-slate-900",
        "bg-gray-100 text-slate-700"
      ];
    }

    return [
      "bg-orange/10 text-orange dark:bg-orange/15 dark:text-orange",
      "bg-navy/10 text-navy dark:bg-white/10 dark:text-gray-100",
      "bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-200"
    ];
  }, [isDarkSurface, isWhiteSurface]);

  return (
    <m.div
      className={`relative h-full cursor-pointer overflow-hidden rounded-3xl border shadow-lg transition-opacity duration-300 ${cardSurfaceClass} ${
        isMuted ? "opacity-80" : "opacity-100"
      }`}
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
          <LogoOrInitials company={company} />
        </div>
        {!isOpen && showHoverHint ? (
          <p className={`mt-1 text-center text-xs font-semibold uppercase tracking-wider ${secondaryTextClass}`}>
            {t.hoverForMoreInfo}
          </p>
        ) : null}

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
            <h3 className={`text-2xl font-extrabold tracking-tight ${primaryTextClass}`}>
              {company.name}
            </h3>
            <p className={`mt-3 text-sm leading-relaxed ${secondaryTextClass}`}>
              {company.description}
            </p>

            <div className={`mt-6 space-y-3 text-sm ${metaTextClass}`}>
              <div className="flex items-center gap-3">
                <Briefcase className="h-4 w-4 text-orange" />
                <span className="font-semibold">{t.industry}:</span>
                <span className={valueTextClass}>{company.industry || t.tbd}</span>
              </div>
              <div className="flex items-center gap-3">
                <Users2 className="h-4 w-4 text-orange" />
                <span className="font-semibold">{t.employees}:</span>
                <span className={valueTextClass}>{company.employees || t.tbd}</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe2 className="h-4 w-4 text-orange" />
                <span className="font-semibold">{t.region}:</span>
                <span className={valueTextClass}>{company.location || t.tbd}</span>
              </div>
            </div>

            <div className="mt-6">
              <p className={`text-sm font-semibold ${primaryTextClass}`}>
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
