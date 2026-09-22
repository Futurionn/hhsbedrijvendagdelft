// ─────────────────────────────────────────────────────────────────────────────
//  FLOOR PLAN MAP  —  the picture of the venue with clickable stands on top.
//
//  Hovering a stand shows a tooltip with the company name; clicking it opens
//  that company in the companies list.
//
//  ─── HOW A STAND KNOWS ITS COMPANY ──────────────────────────────────────────
//  Each company in the edition's companies.js carries a `stand:` number.
//  A hotspot with the same number is that company's spot. Stands with no
//  company (student teams) get their name from `extraStandLabels` in the
//  floor-plan data file.
//
//  ─── WHY PERCENTAGES ────────────────────────────────────────────────────────
//  Hotspot coordinates are stored in original-image pixels, but are rendered
//  as percentages of the image. That is what keeps every rectangle glued to
//  the right spot when the picture is scaled down on a phone.
//
//  To add or move a stand, edit the edition's data/floorPlan.js — never this file.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.jsx";
import { useIsTouchDevice } from "../hooks/useIsTouchDevice.js";
import { STRINGS } from "../strings.js";
import { SUBPAGE, editionPath } from "../../editions/index.js";

/** Convert an original-image pixel value into a CSS percentage. */
function toPercent(value, total) {
  return `${(value / total) * 100}%`;
}

export default function FloorPlanMap({ edition, focusedStand = null }) {
  const { lang } = useLanguage();
  const t = STRINGS[lang];
  const navigate = useNavigate();
  const isTouch = useIsTouchDevice();

  const [activeHotspotId, setActiveHotspotId] = useState(null);

  // Which stand the visitor has already tapped once, on a touch screen.
  // This deliberately does NOT use `activeHotspotId`: tapping a button also
  // focuses it, and the focus handler below sets `activeHotspotId` before the
  // click handler ever runs. Comparing against that would make every first tap
  // look like a second one, and the stand would open immediately.
  const tappedHotspotId = useRef(null);

  const floorPlan = edition.floorPlan;

  /** Attach each hotspot's company (if it has one) and a stable React key. */
  const hotspots = useMemo(() => {
    if (!floorPlan) return [];

    const companyByStand = new Map(
      edition.companies
        .filter((company) => Number.isInteger(company.stand))
        .map((company) => [company.stand, company])
    );

    return floorPlan.hotspots.map((hotspot, index) => ({
      ...hotspot,
      id: `stand-${hotspot.stand}-${hotspot.key ?? index}`,
      company: companyByStand.get(hotspot.stand) ?? null,
      label:
        companyByStand.get(hotspot.stand)?.name ??
        floorPlan.extraStandLabels?.[hotspot.stand] ??
        null
    }));
  }, [floorPlan, edition.companies]);

  const activeHotspot = hotspots.find((hotspot) => hotspot.id === activeHotspotId) ?? null;

  // Arriving from a "show on map" link: pre-highlight the requested stand.
  useEffect(() => {
    if (!focusedStand) return;
    const target = hotspots.find((hotspot) => hotspot.stand === focusedStand);
    if (target) setActiveHotspotId(target.id);
  }, [focusedStand, hotspots]);

  if (!floorPlan) {
    return <p className="text-slate-700 dark:text-slate-200">{t.mapEmpty}</p>;
  }

  /** Open the companies list, scrolled to this stand's company. */
  const openCompanyForStand = (hotspot) => {
    const params = new URLSearchParams();
    if (hotspot.company) params.set("focus", hotspot.company.id);
    params.set("stand", String(hotspot.stand));
    navigate(`${editionPath(edition, SUBPAGE.companies)}?${params.toString()}`);
  };

  return (
    <div>
      <div className="relative">
        <div className="relative overflow-hidden rounded-2xl border border-orange/30 bg-white/70 shadow-lg shadow-black/5 dark:bg-slate-900/40 dark:shadow-black/40">
          <img src={floorPlan.image} alt={t.mapAltText} className="h-auto w-full" />

          <div className="absolute inset-0">
            {hotspots.map((hotspot) => {
              const isActive = activeHotspotId === hotspot.id;
              const label = hotspot.label ?? t.mapStandUnassigned;

              return (
                <button
                  key={hotspot.id}
                  type="button"
                  className={`absolute rounded-[3px] border transition-[background-color,border-color,box-shadow] duration-press ${
                    isActive
                      ? "border-orange bg-orange/30 ring-2 ring-orange/70"
                      : "border-transparent bg-transparent hover:border-orange/80 hover:bg-orange/20"
                  }`}
                  style={{
                    left: toPercent(hotspot.x, floorPlan.imageWidth),
                    top: toPercent(hotspot.y, floorPlan.imageHeight),
                    width: toPercent(hotspot.width, floorPlan.imageWidth),
                    height: toPercent(hotspot.height, floorPlan.imageHeight)
                  }}
                  aria-label={`${t.stand} ${hotspot.stand}: ${label}`}
                  onMouseEnter={() => setActiveHotspotId(hotspot.id)}
                  onMouseLeave={() =>
                    setActiveHotspotId((current) =>
                      current === hotspot.id ? null : current
                    )
                  }
                  onFocus={() => setActiveHotspotId(hotspot.id)}
                  onBlur={() =>
                    setActiveHotspotId((current) =>
                      current === hotspot.id ? null : current
                    )
                  }
                  onClick={() => {
                    // On a phone the first tap only reveals the name, because
                    // there is no hover to preview it with. The second opens it.
                    if (isTouch && tappedHotspotId.current !== hotspot.id) {
                      tappedHotspotId.current = hotspot.id;
                      setActiveHotspotId(hotspot.id);
                      return;
                    }
                    tappedHotspotId.current = null;
                    if (hotspot.company) openCompanyForStand(hotspot);
                  }}
                />
              );
            })}
          </div>
        </div>

        {activeHotspot ? (
          <div
            className="pointer-events-none absolute z-20 max-w-[75vw] -translate-x-1/2 -translate-y-[115%] rounded-lg bg-navy-deep/90 px-3 py-2 text-caption text-white shadow-lg shadow-black/30 backdrop-blur-sm"
            style={{
              left: toPercent(
                activeHotspot.x + activeHotspot.width / 2,
                floorPlan.imageWidth
              ),
              top: toPercent(activeHotspot.y, floorPlan.imageHeight)
            }}
          >
            <div className="font-semibold text-orange/90">{`${t.stand} ${activeHotspot.stand}`}</div>
            <div className="mt-0.5 font-medium text-white/95">
              {activeHotspot.label ?? t.mapStandUnassigned}
            </div>
          </div>
        ) : null}
      </div>

      <p className="mt-3 text-caption text-slate-500 dark:text-slate-400">
        {isTouch ? t.mapHintTouch : t.mapHintMouse}
      </p>
    </div>
  );
}
