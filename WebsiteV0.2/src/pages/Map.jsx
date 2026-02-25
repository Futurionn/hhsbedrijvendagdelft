import { MapPin } from "lucide-react";
import LegalLayout from "./LegalLayout.jsx";
import { useLanguage } from "../shared/LanguageContext.jsx";
import { STRINGS } from "../shared/strings.js";

export default function MapPage() {
  const { lang } = useLanguage();
  const t = STRINGS[lang];

  return (
    <LegalLayout title={t.mapPageTitle}>
      <div className="text-gray-700 dark:text-gray-200">{t.mapPageIntro}</div>

      <section className="overflow-hidden rounded-3xl border border-orange/30 bg-gradient-to-br from-orange/10 via-white to-gray-50 p-8 dark:from-orange/10 dark:via-white/5 dark:to-slate-900">
        <span className="inline-flex items-center rounded-full bg-orange px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-white">
          {t.mapComingSoonTitle}
        </span>

        <div className="mt-6 flex items-center gap-3">
          <MapPin className="h-6 w-6 text-orange" />
          <h2 className="text-2xl font-extrabold text-navy dark:text-white">
            {lang === "nl" ? "Interactieve plattegrond" : "Interactive floor plan"}
          </h2>
        </div>

        <p className="mt-3 max-w-2xl text-gray-700 dark:text-gray-200">{t.mapComingSoonBody}</p>

        <div className="mt-8 flex h-56 items-center justify-center rounded-2xl border border-dashed border-orange/40 bg-white/70 text-sm font-semibold text-gray-600 dark:bg-slate-900/40 dark:text-gray-300">
          {lang === "nl" ? "Kaart placeholder" : "Map placeholder"}
        </div>
      </section>
    </LegalLayout>
  );
}
