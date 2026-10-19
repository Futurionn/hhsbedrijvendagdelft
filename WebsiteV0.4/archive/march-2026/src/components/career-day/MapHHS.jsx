import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MAP_HHS_IMAGE_WIDTH,
  MAP_HHS_IMAGE_HEIGHT,
  MAP_HHS_STANDS,
  MAP_HHS_STAND_COMPANIES,
  MAP_HHS_STAND_COMPANY_IDS,
} from "../../data/mapHotspots.js";

function asPct(value, total) {
  return `${(value / total) * 100}%`;
}

export default function MapHHS({ lang, focusedStand = null }) {
  const [activeStand, setActiveStand] = useState(null);
  const navigate = useNavigate();
  const isTouchDevice = useMemo(
    () =>
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(hover: none), (pointer: coarse)").matches,
    []
  );

  const standAssignments = useMemo(() => {
    return MAP_HHS_STANDS.map((spot, index) => ({
      ...spot,
      id: `stand-${spot.stand}-${spot.key ?? index}`,
      companyName: MAP_HHS_STAND_COMPANIES[spot.stand] ?? null,
    }));
  }, []);

  const activeSpot = standAssignments.find((spot) => spot.id === activeStand) ?? null;
  const mappedSpots = useMemo(
    () => standAssignments.filter((spot) => MAP_HHS_STAND_COMPANY_IDS[spot.stand]),
    [standAssignments]
  );

  useEffect(() => {
    if (!focusedStand) return;
    const target = standAssignments.find((spot) => spot.stand === focusedStand);
    if (!target) return;
    setActiveStand(target.id);
  }, [focusedStand, standAssignments]);

  const hintText =
    lang === "nl"
      ? isTouchDevice
        ? "Tik eenmaal voor de bedrijfsnaam, tik nogmaals om de bedrijvenlijst te openen."
        : "Hover om het bedrijf te zien, klik om het in de bedrijvenlijst te openen."
      : isTouchDevice
        ? "Tap once to preview the company, tap again to open it in the companies list."
        : "Hover to view the company, click to open it in the companies list.";

  const openCompaniesAtStand = (spot) => {
    let targetCompanyId = MAP_HHS_STAND_COMPANY_IDS[spot.stand] ?? null;

    // For stands without a direct listing, jump to the nearest mapped stand.
    if (!targetCompanyId && mappedSpots.length > 0) {
      const spotCx = spot.x + spot.width / 2;
      const spotCy = spot.y + spot.height / 2;
      let best = mappedSpots[0];
      let bestDistance = Number.POSITIVE_INFINITY;

      for (const candidate of mappedSpots) {
        const candidateCx = candidate.x + candidate.width / 2;
        const candidateCy = candidate.y + candidate.height / 2;
        const distance = (candidateCx - spotCx) ** 2 + (candidateCy - spotCy) ** 2;
        if (distance < bestDistance) {
          bestDistance = distance;
          best = candidate;
        }
      }

      targetCompanyId = MAP_HHS_STAND_COMPANY_IDS[best.stand] ?? null;
    }

    const params = new URLSearchParams();
    if (targetCompanyId) params.set("focus", targetCompanyId);
    params.set("stand", String(spot.stand));
    navigate(`/companies?${params.toString()}`);
  };

  return (
    <div>
      <div className="relative">
        <div className="relative overflow-hidden rounded-2xl border border-orange/30 bg-white/70 shadow-lg shadow-black/5 dark:bg-slate-900/40 dark:shadow-black/40">
          <img
            src="/MapHHS.jpeg"
            alt={lang === "nl" ? "Plattegrond HHS Delft" : "HHS Delft floor plan"}
            className="w-full h-auto"
          />

          <div className="absolute inset-0">
            {standAssignments.map((spot) => {
              const isActive = activeStand === spot.id;
              const companyName =
                spot.companyName ??
                (lang === "nl" ? "Bedrijf volgt binnenkort" : "Company coming soon");
              return (
                <button
                  key={spot.id}
                  type="button"
                  className={`absolute rounded-[4px] border transition-all duration-200 ${
                    isActive
                      ? "border-orange bg-orange/30 ring-2 ring-orange/70"
                      : "border-transparent bg-transparent hover:border-orange/80 hover:bg-orange/20"
                  }`}
                  style={{
                    left: asPct(spot.x, MAP_HHS_IMAGE_WIDTH),
                    top: asPct(spot.y, MAP_HHS_IMAGE_HEIGHT),
                    width: asPct(spot.width, MAP_HHS_IMAGE_WIDTH),
                    height: asPct(spot.height, MAP_HHS_IMAGE_HEIGHT),
                  }}
                  aria-label={`Stand ${spot.stand}: ${companyName}`}
                  onMouseEnter={() => setActiveStand(spot.id)}
                  onMouseLeave={() =>
                    setActiveStand((current) => (current === spot.id ? null : current))
                  }
                  onFocus={() => setActiveStand(spot.id)}
                  onBlur={() => setActiveStand((current) => (current === spot.id ? null : current))}
                  onClick={() => {
                    if (isTouchDevice && activeStand !== spot.id) {
                      setActiveStand(spot.id);
                      return;
                    }
                    openCompaniesAtStand(spot);
                  }}
                >
                  <span className="sr-only">{`Stand ${spot.stand}`}</span>
                </button>
              );
            })}
          </div>
        </div>

        {activeSpot ? (
          <div
            className="pointer-events-none absolute z-20 max-w-[75vw] -translate-x-1/2 -translate-y-[115%] rounded-xl bg-black/80 px-3 py-2 text-xs text-white shadow-lg shadow-black/30 backdrop-blur-sm"
            style={{
              left: asPct(activeSpot.x + activeSpot.width / 2, MAP_HHS_IMAGE_WIDTH),
              top: asPct(activeSpot.y, MAP_HHS_IMAGE_HEIGHT),
            }}
          >
            <div className="font-semibold text-orange">{`Stand ${activeSpot.stand}`}</div>
            <div className="mt-0.5 font-medium text-white/95">
              {activeSpot.companyName ??
                (lang === "nl" ? "Bedrijf volgt binnenkort" : "Company coming soon")}
            </div>
          </div>
        ) : null}
      </div>

      <p className="mt-3 text-sm font-medium text-gray-600 dark:text-gray-300">{hintText}</p>
    </div>
  );
}
