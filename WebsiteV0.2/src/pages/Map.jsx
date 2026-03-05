import { useEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import LegalLayout from "./LegalLayout.jsx";
import { useLanguage } from "../shared/LanguageContext.jsx";
import { STRINGS } from "../shared/strings.js";
import MapHHS from "../components/career-day/MapHHS.jsx";

export default function MapPage() {
  const { lang } = useLanguage();
  const [searchParams] = useSearchParams();
  const t = STRINGS[lang];
  const standParam = Number.parseInt(searchParams.get("stand") ?? "", 10);
  const focusedStand = Number.isNaN(standParam) ? null : standParam;
  const mapAreaRef = useRef(null);

  useEffect(() => {
    if (!focusedStand || !mapAreaRef.current) return;

    const scrollToMap = () => {
      const mapTop = mapAreaRef.current?.getBoundingClientRect().top ?? 0;
      const absoluteTop = mapTop + window.scrollY;
      // Land the viewport directly on the map area when coming from the companies list.
      window.scrollTo({ top: Math.max(0, absoluteTop - 12), behavior: "smooth" });
    };

    // Retry a few times to handle late layout changes (e.g. image loading).
    scrollToMap();
    const retry1 = window.setTimeout(scrollToMap, 180);
    const retry2 = window.setTimeout(scrollToMap, 600);
    const retry3 = window.setTimeout(scrollToMap, 1200);

    return () => {
      window.clearTimeout(retry1);
      window.clearTimeout(retry2);
      window.clearTimeout(retry3);
    };
  }, [focusedStand]);

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

        <div ref={mapAreaRef} className="mt-8">
          <MapHHS lang={lang} focusedStand={focusedStand} />
        </div>
      </section>
    </LegalLayout>
  );
}
