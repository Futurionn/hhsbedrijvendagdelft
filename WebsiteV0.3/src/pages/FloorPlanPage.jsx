// ─────────────────────────────────────────────────────────────────────────────
//  FLOOR PLAN PAGE  —  wraps the interactive map in the standard page frame.
//
//  Lives at  /<edition>/plattegrond   e.g. /March2026/plattegrond
//
//  Web-address option:
//      ?stand=12   highlights that stand on arrival and scrolls the map into
//                  view (this is what the "Toon op kaart" buttons link to)
//
//  The map itself is FloorPlanMap; the stand coordinates are in the edition's
//  data/floorPlan.js.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import PageLayout from "../shared/components/PageLayout.jsx";
import FloorPlanMap from "../shared/components/FloorPlanMap.jsx";
import { useLanguage } from "../shared/context/LanguageContext.jsx";
import { usePageMeta } from "../shared/hooks/usePageMeta.js";
import { STRINGS } from "../shared/strings.js";
import { SUBPAGE, editionPath } from "../editions/index.js";

/**
 * The map image loads after the page does, which changes the page height and
 * would leave a plain scroll in the wrong place. Re-running the scroll a few
 * times covers the image arriving late.
 */
const SCROLL_RETRY_DELAYS_MS = [180, 600, 1200];

export default function FloorPlanPage({ edition }) {
  const { lang } = useLanguage();
  const t = STRINGS[lang];
  const [searchParams] = useSearchParams();
  const mapAreaRef = useRef(null);

  const standParam = Number.parseInt(searchParams.get("stand") ?? "", 10);
  const focusedStand = Number.isNaN(standParam) ? null : standParam;

  usePageMeta({
    title: `${t.mapPageTitle} ${edition.label} | T.I.S. Bedrijvendag Delft`,
    description: t.mapPageIntro,
    canonicalPath: editionPath(edition, SUBPAGE.floorPlan)
  });

  useEffect(() => {
    if (!focusedStand || !mapAreaRef.current) return;

    const scrollMapIntoView = () => {
      const top = mapAreaRef.current?.getBoundingClientRect().top ?? 0;
      window.scrollTo({ top: Math.max(0, top + window.scrollY - 12), behavior: "smooth" });
    };

    scrollMapIntoView();
    const timers = SCROLL_RETRY_DELAYS_MS.map((delay) =>
      window.setTimeout(scrollMapIntoView, delay)
    );

    return () => timers.forEach(window.clearTimeout);
  }, [focusedStand]);

  return (
    <PageLayout title={t.mapPageTitle} edition={edition} wide>
      <div className="text-lead text-slate-600 dark:text-slate-300">{t.mapPageIntro}</div>

      <section className="overflow-hidden rounded-2xl border border-navy/[0.07] bg-navy/[0.02] p-6 dark:border-white/10 dark:bg-white/[0.04] sm:p-8">
        <span className="inline-flex items-center rounded-full bg-orange/10 px-3 py-1 text-kicker uppercase text-orange-deep dark:text-orange">
          {t.mapBadge}
        </span>

        <div className="mt-6 flex items-center gap-3">
          <MapPin className="h-6 w-6 text-orange" />
          <h2 className="text-heading text-navy dark:text-white">
            {t.mapHeading}
          </h2>
        </div>

        <p className="mt-3 max-w-2xl text-body text-slate-600 dark:text-slate-300">{t.mapIntro}</p>

        <div ref={mapAreaRef} className="mt-8">
          <FloorPlanMap edition={edition} focusedStand={focusedStand} />
        </div>
      </section>
    </PageLayout>
  );
}
