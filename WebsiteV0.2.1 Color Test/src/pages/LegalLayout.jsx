import { Link } from "react-router-dom";
import { useLanguage } from "../shared/LanguageContext.jsx";
import { useTheme } from "../shared/ThemeContext.jsx";

function Wave({ fill = "#ffffff" }) {
  return (
    <svg
      className="absolute bottom-0 left-0 w-full"
      viewBox="0 0 1440 90"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,48 C240,90 480,90 720,58 C960,26 1200,26 1440,48 L1440,90 L0,90 Z"
        fill={fill}
      />
    </svg>
  );
}

export default function LegalLayout({ title, children }) {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const homeLabel = lang === "nl" ? "Terug naar home" : "Back to home";
  const logoAlt = lang === "nl" ? "De Haagse Hogeschool" : "The Hague University of Applied Sciences";

  return (
    <main className="min-h-screen bg-white text-gray-900 dark:bg-slate-950 dark:text-gray-100">
      <div className="relative overflow-hidden bg-gradient-to-r from-[#1e3a5f] via-[#2a4a6f] to-[#1e3a5f]">
        <div className="mx-auto max-w-6xl px-6 pb-16 pt-10">
          <div className="flex items-center justify-between gap-4">
            <img
              src="/logos/HHS.png"
              alt={logoAlt}
              className="h-7 w-auto max-w-[180px] opacity-95 sm:h-8 sm:max-w-[260px] md:h-9"
            />
            <Link
              className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur-sm transition-all duration-500 hover:bg-white/15"
              to="/"
            >
              ← {homeLabel}
            </Link>
          </div>

          <h1 className="mt-10 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            {title}
          </h1>
        </div>
        <Wave fill={theme === "dark" ? "#020617" : "#ffffff"} />
      </div>

      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="space-y-6 text-gray-700 dark:text-gray-200">{children}</div>
      </div>
    </main>
  );
}
