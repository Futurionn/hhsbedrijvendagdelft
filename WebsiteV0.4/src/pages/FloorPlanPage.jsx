// ─────────────────────────────────────────────────────────────────────────────
//  FLOOR PLAN PAGE  —  wraps the interactive map in the standard page frame.
//
//  Lives at  /<edition>/plattegrond   e.g. /November2026/plattegrond
//
//  Web-address option:
//      ?stand=12   opens that stand on arrival and brings the map into view
//                  (this is what the "Toon op kaart" buttons link to)
//
//  There are two kinds of map, and the edition's data/floorPlan.js decides
//  which one this page shows:
//
//    a DRAWN plan (it has `stands: [...]`)   ->  StandMap.jsx
//        zoomable, with the search/filter list beside it. November 2026.
//
//    a PICTURE with hotspots (it has `image` and `hotspots`)  ->  FloorPlanMap.jsx
//        the older kind: rectangles over a photo of the plan.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import PageLayout from "../shared/components/PageLayout.jsx";
import FloorPlanMap from "../shared/components/FloorPlanMap.jsx";
import StandMap from "../shared/components/StandMap.jsx";
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

  // A drawn plan handles ?stand= itself (StandMap); this is for the picture.
  const isDrawnPlan = Boolean(edition.floorPlan?.stands);

  useEffect(() => {
    if (isDrawnPlan || !focusedStand || !mapAreaRef.current) return;

    const scrollMapIntoView = () => {
      const top = mapAreaRef.current?.getBoundingClientRect().top ?? 0;
      window.scrollTo({ top: Math.max(0, top + window.scrollY - 12), behavior: "smooth" });
    };

    scrollMapIntoView();
    const timers = SCROLL_RETRY_DELAYS_MS.map((delay) =>
      window.setTimeout(scrollMapIntoView, delay)
    );

    return () => timers.forEach(window.clearTimeout);
  }, [focusedStand, isDrawnPlan]);

  if (isDrawnPlan) {
    return (
      <PageLayout title={t.mapPageTitle} edition={edition} wide>
        <p className="max-w-[60ch] text-body text-fg-muted dark:text-on-dark-2">{t.mapPageIntro}</p>
        <StandMap edition={edition} />
      </PageLayout>
    );
  }

  return (
    <PageLayout title={t.mapPageTitle} edition={edition} wide>
      <div className="text-lead text-slate-600 dark:text-slate-300">{t.mapPageIntro}</div>

      <section className="border-t border-navy/15 pt-8 dark:border-white/15">
        <span className="text-small text-fg-muted dark:text-slate-400">
          {t.mapBadge}
        </span>

        <div className="mt-6 flex items-center gap-3">
          <MapPin className="h-6 w-6 text-fg-muted dark:text-slate-400" strokeWidth={1.5} aria-hidden="true" />
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
