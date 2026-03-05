import { useMemo, useState } from "react";
import {
  MAP_HHS_IMAGE_WIDTH,
  MAP_HHS_IMAGE_HEIGHT,
  MAP_HHS_STANDS,
  MAP_HHS_STAND_COMPANIES,
} from "../../data/mapHotspots.js";

function asPct(value, total) {
  return `${(value / total) * 100}%`;
}

export default function MapHHS({ lang }) {
  const [activeStand, setActiveStand] = useState(null);

  const standAssignments = useMemo(() => {
    return MAP_HHS_STANDS.map((spot, index) => ({
      ...spot,
      id: `stand-${spot.stand}-${spot.key ?? index}`,
      companyName: MAP_HHS_STAND_COMPANIES[spot.stand] ?? null,
    }));
  }, []);

  const activeSpot = standAssignments.find((spot) => spot.id === activeStand) ?? null;
  const hintText =
    lang === "nl"
      ? "Hover of klik op een stand om het bedrijf te zien."
      : "Hover or tap a stand to see the company.";

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
                  onClick={() =>
                    setActiveStand((current) => (current === spot.id ? null : spot.id))
                  }
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
