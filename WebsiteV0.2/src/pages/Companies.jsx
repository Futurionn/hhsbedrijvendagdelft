import { useMemo, useState } from "react";
import { ExternalLink, Filter } from "lucide-react";
import LegalLayout from "./LegalLayout.jsx";
import { useLanguage } from "../shared/LanguageContext.jsx";
import { COMPANY_CATEGORY_LABELS, getCompanies } from "../data/companies.js";
import { useTheme } from "../shared/ThemeContext.jsx";

function Logo({ company, theme }) {
  const needsShadow =
    (theme === "dark" && company.logoTone === "dark") ||
    (theme !== "dark" && company.logoTone === "light");

  const shadowClass = needsShadow
    ? theme === "dark"
      ? "drop-shadow-[0_4px_10px_rgba(255,255,255,0.35)]"
      : "drop-shadow-[0_4px_10px_rgba(0,0,0,0.55)]"
    : "";

  if (company.logo) {
    return (
      <img
        src={company.logo}
        alt={`${company.name} logo`}
        className={`h-10 w-full max-w-full object-contain ${shadowClass}`}
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
    <div className="text-lg font-extrabold tracking-tight text-navy dark:text-white">
      {initials || company.name.slice(0, 2).toUpperCase()}
    </div>
  );
}

function CompanyRow({ company, theme, lang }) {
  const websiteLabel = lang === "nl" ? "Website" : "Website";
  const labels = COMPANY_CATEGORY_LABELS[lang] ?? COMPANY_CATEGORY_LABELS.en;
  const maxDescription = 160;
  const description =
    (company.description || "").length > maxDescription
      ? `${company.description.slice(0, maxDescription).trim()}…`
      : company.description;
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm shadow-black/5 dark:border-white/10 dark:bg-slate-900 dark:shadow-black/40">
      <div className="grid gap-4 sm:grid-cols-[140px_1fr_auto] sm:items-start">
        <div className="flex h-16 w-full max-w-[140px] items-center justify-start sm:justify-center">
          <Logo company={company} theme={theme} />
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="text-lg font-extrabold text-navy dark:text-white">
              {company.name}
            </div>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 dark:bg-white/10 dark:text-gray-200">
              {labels[company.category] ?? company.category}
            </span>
          </div>
          <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            {company.industry} • {company.location}
          </div>
          <div className="mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-200">
            {description}
          </div>
        </div>

        <a
          href={company.website}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 justify-self-start rounded-full bg-orange px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#f07c00]/20 transition-all duration-500 hover:scale-105 sm:justify-self-end"
        >
          {websiteLabel}
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

export default function Companies() {
  const { lang } = useLanguage();
  const { theme } = useTheme();

  const title = lang === "nl" ? "Bedrijven" : "Companies";
  const filterLabel = lang === "nl" ? "Filter" : "Filter";
  const categoryLabel = lang === "nl" ? "Categorie" : "Category";
  const sortLabel = lang === "nl" ? "Sorteer A-Z" : "Sort A-Z";
  const enabledLabel = lang === "nl" ? "aan" : "on";
  const disabledLabel = lang === "nl" ? "uit" : "off";
  const intro =
    lang === "nl"
      ? "Bekijk alle deelnemende bedrijven. Gebruik de filter om snel te zoeken."
      : "Browse all participating companies. Use the filter to quickly find what you need.";

  const allCompanies = useMemo(() => getCompanies(lang), [lang]);
  const labels = COMPANY_CATEGORY_LABELS[lang] ?? COMPANY_CATEGORY_LABELS.en;

  const [category, setCategory] = useState("all");
  const [sortAZ, setSortAZ] = useState(true);

  const categories = useMemo(() => {
    const set = new Set(allCompanies.map((c) => c.category).filter(Boolean));
    return ["all", ...Array.from(set).sort()];
  }, [allCompanies]);

  const visible = useMemo(() => {
    let list = allCompanies;
    if (category !== "all") list = list.filter((c) => c.category === category);
    if (sortAZ) list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [allCompanies, category, sortAZ]);

  return (
    <LegalLayout title={title}>
      <div className="text-gray-700 dark:text-gray-200">{intro}</div>

      <div className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4 dark:border-white/10 dark:bg-white/5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-navy dark:text-white">
          <Filter className="h-4 w-4 text-orange" />
          {filterLabel}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-200">
            <span className="font-semibold">{categoryLabel}:</span>
            <select
              className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 dark:border-white/10 dark:bg-slate-950 dark:text-gray-100"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {labels[c] ?? c}
                </option>
              ))}
            </select>
          </label>

          <button
            type="button"
            className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-900 transition-all duration-500 hover:shadow-lg hover:shadow-black/5 dark:border-white/10 dark:bg-slate-950 dark:text-gray-100 dark:hover:shadow-black/40"
            onClick={() => setSortAZ((v) => !v)}
            aria-pressed={sortAZ}
          >
            {sortLabel}: {sortAZ ? enabledLabel : disabledLabel}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {visible.map((company) => (
          <CompanyRow key={company.id} company={company} theme={theme} lang={lang} />
        ))}
      </div>
    </LegalLayout>
  );
}
