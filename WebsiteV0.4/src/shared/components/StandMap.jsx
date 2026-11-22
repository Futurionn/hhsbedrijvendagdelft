// ─────────────────────────────────────────────────────────────────────────────
//  STAND MAP  —  the drawn, zoomable floor plan with the list beside it.
//
//      ┌───────────────────────────────┬──────────────────┐
//      │                         [+]   │ search           │
//      │        the hall,        [−]   │ [Alle] [ET] [MT] │  filter chips
//      │     one shape per       [⌂]   │ Per opleiding·A–Z│
//      │         stand           [⛶]   │ ───────────────  │
//      │  ┌──────────────┐             │ 9  ABB           │  the list
//      │  │ chosen stand │             │ 18 Berkel …      │
//      │  └──────────────┘             │ Laatst bijgewerkt│
//      └───────────────────────────────┴──────────────────┘
//
//  ─── WHAT IT DOES ───────────────────────────────────────────────────────────
//   • A stand is painted in the colours of the study programmes its company
//     is looking for, with the company's logo and the stand number on it.
//   • Click a stand, or a name in the list: its card opens over the map
//     (text, what they offer, website, "Meer info" to the companies list).
//     From the list the map also glides to that stand.
//   • A filter chip dims every stand that does not match and zooms to the
//     ones that do. The search box narrows the list (name or stand number).
//   • Drag to move, pinch or Ctrl/⌘ + scroll to zoom, double-click to zoom
//     in; the buttons zoom, show the whole plan, or go full screen.
//     (All of that lives in src/shared/hooks/useMapView.js.)
//   • The chosen stand is kept in the web address (?stand=12), so a stand
//     can be shared, and "Toon op kaart" in the companies list lands on it.
//   • On a narrow screen the list drops under the map.
//
//  ─── WHERE THE CONTENT COMES FROM ───────────────────────────────────────────
//   shapes of the stands, walls      src/editions/<edition>/data/floorPlan.js
//   who stands where, logos, text    src/editions/<edition>/data/companies.js
//                                    (a company's `stand:` number)
//   the colours                      `stand` in tailwind.config.js and
//                                    STAND_COLORS in src/shared/theme.js
//   every word                       src/shared/strings.js ("map…")
//
//  To add or move a stand, edit the data files — never this file.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Check, Home, Maximize, Minimize, Minus, Plus, Search, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.jsx";
import { useMapView } from "../hooks/useMapView.js";
import { OPPORTUNITY_LABELS, STRINGS, STUDY_LABELS } from "../strings.js";
import { STUDY_KEYS, localizeCompanies } from "../companyData.js";
import { cardPalette } from "../companyStyles.js";
import { pick } from "../i18n.js";
import { MAP_GROUP, boundsOf, buildMapEntries, matchesMapFilter } from "../floorPlanData.js";
import { SUBPAGE, editionPath } from "../../editions/index.js";
import Button from "../ui/Button.jsx";
import Chip from "../ui/Chip.jsx";
import { normalize } from "./CompanySearch.jsx";

/** The colour swatch of each programme / group (see tailwind.config.js). */
const SWATCH = {
  ee: "bg-stand-ee",
  mt: "bg-stand-mt",
  wtb: "bg-stand-wtb",
  tn: "bg-stand-tn",
  tw: "bg-stand-tw",
  tbk: "bg-stand-tbk",
  ict: "bg-stand-ict",
  team: "bg-stand-team",
  facility: "bg-stand-facility",
  other: "bg-stand-other"
};

/** Descriptions longer than this get a "Lees meer" toggle on the card. */
const DESCRIPTION_LIMIT = 200;

/** Room kept free beside the card, and for the buttons, when placing a stand. */
const CARD_GAP_PX = 16;
const CONTROLS_RESERVE_PX = 64;

/** The site's easing (--ease), for the card sliding in. */
const EASE = [0.2, 0.7, 0.2, 1];

/** The outline every stand carries; thicker under the pointer. */
const OUTLINE =
  "fill-none [vector-effect:non-scaling-stroke] transition-[stroke] duration-settle ";
const OUTLINE_IDLE = "stroke-navy-deep/40 [stroke-width:1.2] dark:stroke-white/40";
const OUTLINE_HOVER =
  "group-hover:stroke-navy-deep group-hover:[stroke-width:2.5] dark:group-hover:stroke-white";
/** A stand the filter matched, and the chosen stand: a breathing outline. */
const OUTLINE_LIT = "stroke-navy-deep dark:stroke-white motion-safe:animate-stand-pulse";

/** Hard-edged colour bands, left to right: the stand's colours in miniature. */
function stripeGradient(colors) {
  if (colors.length < 2) return colors[0];
  const stops = colors.map(
    (color, index) =>
      `${color} ${(index / colors.length) * 100}% ${((index + 1) / colors.length) * 100}%`
  );
  return `linear-gradient(90deg, ${stops.join(", ")})`;
}

/**
 * The width/height ratio of every logo, measured once they have loaded.
 * The plate under a logo hugs it, and for that its shape must be known.
 */
function useLogoRatios(sources) {
  const [ratios, setRatios] = useState({});
  const list = sources.join("|");

  useEffect(() => {
    let live = true;
    const found = {};
    let flush = 0;

    list.split("|").filter(Boolean).forEach((source) => {
      const image = new Image();
      image.onload = () => {
        if (!live || !image.naturalWidth || !image.naturalHeight) return;
        found[source] = image.naturalWidth / image.naturalHeight;
        // Logos arrive in bursts: collect them and repaint once per frame.
        cancelAnimationFrame(flush);
        flush = requestAnimationFrame(() => live && setRatios((known) => ({ ...known, ...found })));
      };
      image.src = source;
    });

    return () => {
      live = false;
      cancelAnimationFrame(flush);
    };
  }, [list]);

  return ratios;
}

/** How large a logo may be drawn inside its stand, and the plate's margin. */
function logoBox(entry, ratio) {
  const margin = Math.min(entry.bw, entry.bh) * 0.106;
  const maxWidth = entry.bw * 0.76 - margin;
  const maxHeight = entry.bh * 0.76 - margin;
  let width = maxWidth;
  let height = width / ratio;
  if (height > maxHeight) {
    height = maxHeight;
    width = height * ratio;
  }
  return { width, height, margin };
}

// ── One stand (or facility) on the map ──────────────────────────────────────
function StandShape({ entry, ratio, dimmed, lit, title }) {
  const isFree = entry.kind === "free";
  const short = Math.min(entry.bw, entry.bh);
  const label = entry.stand === null ? "" : String(entry.stand);

  // The number tag sits in the top-left corner of the stand's inner box.
  const tag = short * 0.15;
  const tagX = entry.cx - entry.bw / 2 + tag * 1.05;
  const tagY = entry.cy - entry.bh / 2 + tag * 1.05;

  const logo = entry.logo && ratio ? logoBox(entry, ratio) : null;

  return (
    <g
      data-key={entry.key}
      data-stand={label || undefined}
      data-dimmed={dimmed || undefined}
      className={`group transition-opacity duration-settle ${isFree ? "" : "cursor-pointer"} ${
        dimmed ? "opacity-[0.14]" : ""
      }`}
    >
      {title ? <title>{title}</title> : null}

      {isFree ? (
        <polygon points={entry.points} className="fill-white/85 dark:fill-white/10" />
      ) : (
        entry.stripes.map((stripe) => (
          <polygon key={stripe.points} points={stripe.points} fill={stripe.color} />
        ))
      )}

      <polygon
        points={entry.points}
        className={`${OUTLINE} ${
          lit ? `${OUTLINE_LIT} [stroke-width:3.5]` : `${OUTLINE_IDLE} ${isFree ? "" : OUTLINE_HOVER}`
        }`}
      />

      {logo ? (
        <>
          {/* The plate: white, or navy for a logo that is itself white. */}
          <rect
            x={entry.cx - (logo.width + logo.margin) / 2}
            y={entry.cy - (logo.height + logo.margin) / 2}
            width={logo.width + logo.margin}
            height={logo.height + logo.margin}
            rx={1.5}
            className={`stroke-navy-deep/15 [stroke-width:1] [vector-effect:non-scaling-stroke] ${
              entry.logoTone === "light" ? "fill-navy-deep" : "fill-white"
            }`}
          />
          <image
            href={entry.logo}
            x={entry.cx - logo.width / 2}
            y={entry.cy - logo.height / 2}
            width={logo.width}
            height={logo.height}
            preserveAspectRatio="xMidYMid meet"
            className="pointer-events-none"
          />
        </>
      ) : null}

      {/* The stand number, on its own tag so it reads on any colour. */}
      {label && !isFree ? (
        <>
          <rect
            x={tagX - tag}
            y={tagY - tag}
            width={tag * 2}
            height={tag * 2}
            rx={1.2}
            className="fill-navy-deep"
          />
          <text
            x={tagX}
            y={tagY}
            fontSize={tag * (label.length > 2 ? 0.85 : 1.15)}
            fontWeight={600}
            textAnchor="middle"
            dominantBaseline="central"
            className="pointer-events-none fill-white"
          >
            {label}
          </text>
        </>
      ) : null}

      {/* A free stand shows only its number. */}
      {isFree ? (
        <text
          x={entry.cx}
          y={entry.cy}
          fontSize={Math.min(entry.bh * 0.3, entry.bw * 0.26)}
          fontWeight={600}
          textAnchor="middle"
          dominantBaseline="central"
          className="pointer-events-none fill-fg-muted dark:fill-on-dark-3"
        >
          {label}
        </text>
      ) : null}

      {/* A facility shows its name, written along its long side. */}
      {entry.kind === "facility" ? (
        <text
          x={entry.cx}
          y={entry.cy}
          fontSize={Math.min(
            entry.short * 0.42,
            (entry.long * 0.9) / Math.max(1, entry.name.length * 0.56)
          )}
          fontWeight={500}
          textAnchor="middle"
          dominantBaseline="central"
          transform={entry.rotated ? `rotate(${entry.angle} ${entry.cx} ${entry.cy})` : undefined}
          className="pointer-events-none fill-white"
        >
          {entry.name}
        </text>
      ) : null}
    </g>
  );
}

// ── The card that opens over the map for the chosen stand ───────────────────
function StandCard({ entry, edition, onClose }) {
  const { lang } = useLanguage();
  const t = STRINGS[lang];
  const studyLabels = STUDY_LABELS[lang] ?? STUDY_LABELS.en;
  const offerLabels = OPPORTUNITY_LABELS[lang] ?? OPPORTUNITY_LABELS.en;
  const [expanded, setExpanded] = useState(false);

  // White card (navy for a white logo) in BOTH themes, like every company
  // card on the site: the logos are made for it.
  const c = cardPalette(entry.logoTone);
  const company = entry.company;
  const description = company?.description && company.description !== "TBD" ? company.description : "";
  const isLong = description.length > DESCRIPTION_LIMIT;
  const opportunities = company?.opportunities ?? [];

  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.2, ease: EASE } }}
      exit={{ opacity: 0, y: 6, transition: { duration: 0.12, ease: "easeIn" } }}
      data-stand-card
      className={`absolute inset-x-2 bottom-2 z-20 max-h-[70%] overflow-y-auto overscroll-contain rounded-sm border p-4 shadow-[0_16px_40px_-20px_rgba(10,22,44,0.4)] @4xl:inset-x-auto @4xl:bottom-3 @4xl:left-3 @4xl:max-h-[calc(100%-1.5rem)] @4xl:w-96 ${c.surface}`}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label={t.galleryClose}
        className={`absolute right-2 top-2 grid h-10 w-10 place-items-center rounded-sm transition-[transform,color] duration-settle active:scale-[0.97] active:duration-press ${c.close}`}
      >
        <X className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
      </button>

      <div className="flex items-center gap-3.5 pr-10">
        {entry.logo ? (
          <div className={`grid h-16 w-16 shrink-0 place-items-center rounded-sm border ${c.rule}`}>
            <img src={entry.logo} alt="" className="max-h-[80%] max-w-[84%] object-contain" />
          </div>
        ) : null}
        <div className="min-w-0">
          <h2 className={`text-heading ${c.primary}`}>{entry.name}</h2>
          <span className={`mt-1.5 inline-block rounded-sm px-2 py-0.5 text-caption font-medium ${c.chip}`}>
            {entry.kind === "facility" ? t.mapFacility : `${t.stand} ${entry.stand}`}
          </span>
        </div>
      </div>

      {/* The programmes the stand is painted in, with the same swatches. */}
      {entry.groups.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {entry.groups.map((group) => (
            <span
              key={group}
              className={`inline-flex items-center gap-1.5 rounded-sm px-2 py-0.5 text-caption font-medium ${c.wanted}`}
            >
              <span className={`h-2 w-2 shrink-0 rounded-sm ${SWATCH[group]}`} aria-hidden="true" />
              {group === MAP_GROUP.team ? t.mapGroupTeam : studyLabels[group]?.name ?? group}
            </span>
          ))}
        </div>
      ) : null}

      {description ? (
        <>
          <p className={`mt-3.5 text-small ${c.primary} ${isLong && !expanded ? "line-clamp-4" : ""}`}>
            {description}
          </p>
          {isLong ? (
            <Button
              variant="link"
              onClick={() => setExpanded((current) => !current)}
              aria-expanded={expanded}
              className={`mt-1 text-small ${c.primary}`}
            >
              {expanded ? t.readLess : t.readMore}
            </Button>
          ) : null}
        </>
      ) : null}

      {opportunities.length > 0 ? (
        <div className={`mt-3.5 flex flex-wrap items-center gap-x-3 gap-y-1 border-t pt-3 ${c.rule}`}>
          <span className={`text-caption font-medium uppercase tracking-[0.08em] ${c.faint}`}>
            {t.opportunitiesLabel}
          </span>
          {opportunities.map((key) => (
            <span key={key} className={`inline-flex items-center gap-1 text-caption font-medium ${c.primary}`}>
              <Check className={`h-3.5 w-3.5 ${c.accent}`} strokeWidth={2.25} aria-hidden="true" />
              {offerLabels[key] ?? key}
            </span>
          ))}
        </div>
      ) : null}

      {company?.opportunityNote ? (
        <p className={`mt-3 border-l-2 border-orange pl-3 text-small ${c.muted}`}>
          {company.opportunityNote}
        </p>
      ) : null}

      {entry.website || company ? (
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
          {entry.website ? (
            <Button href={entry.website} variant={c.button} size="sm" arrow="out">
              {t.website}
            </Button>
          ) : null}
          {company ? (
            <Button
              variant="link"
              to={`${editionPath(edition, SUBPAGE.companies)}/${company.id}`}
              className={`text-small ${c.primary}`}
            >
              {t.moreInfo}
            </Button>
          ) : null}
        </div>
      ) : null}
    </m.div>
  );
}

// ── One line in the list beside the map ─────────────────────────────────────
function EntryRow({ entry, isSelected, onPick }) {
  return (
    <button
      type="button"
      onClick={() => onPick(entry)}
      aria-current={isSelected ? "true" : undefined}
      data-entry={entry.key}
      className={`flex w-full select-none items-center gap-3 rounded-sm px-2 py-1.5 text-left text-small transition-[transform,background-color] duration-settle ease-settle [-webkit-tap-highlight-color:transparent] active:scale-[0.97] active:duration-press ${
        isSelected
          ? "bg-navy/10 dark:bg-white/[0.14]"
          : "hover:bg-navy/[0.05] dark:hover:bg-white/[0.07]"
      }`}
    >
      {/* The stand number, underlined with the stand's own colours. */}
      <span className="relative grid h-8 w-10 shrink-0 place-items-center overflow-hidden rounded-sm bg-navy-deep pb-1 font-semibold tabular-nums text-white dark:bg-white/[0.12]">
        {entry.stand ?? ""}
        <span
          className="absolute inset-x-0 bottom-0 h-1"
          style={{ background: stripeGradient(entry.colors) }}
          aria-hidden="true"
        />
      </span>

      {entry.logo ? (
        <span
          className={`grid h-8 w-12 shrink-0 place-items-center rounded-sm border ${
            entry.logoTone === "light"
              ? "border-navy-deep bg-navy-deep dark:border-white/15"
              : "border-rule bg-white dark:border-white"
          }`}
        >
          <img src={entry.logo} alt="" loading="lazy" className="max-h-[78%] max-w-[84%] object-contain" />
        </span>
      ) : null}

      <span className="min-w-0 text-fg dark:text-white">{entry.name}</span>
    </button>
  );
}

function GroupHeading({ swatch, count, children }) {
  return (
    <div className="flex items-center gap-2 px-2 pb-1 pt-3 text-small font-medium text-fg dark:text-white">
      {swatch ? <span className={`h-3 w-3 shrink-0 rounded-sm ${swatch}`} aria-hidden="true" /> : null}
      <h3 className="min-w-0">{children}</h3>
      {count !== undefined ? (
        <span className="ml-auto tabular-nums font-normal text-fg-muted dark:text-on-dark-3">{count}</span>
      ) : null}
    </div>
  );
}

/**
 * A filter chip with a colour swatch in front of its label. The chips fill a
 * two-column grid, so a long programme name wraps inside its chip instead of
 * pushing every chip onto a line of its own.
 */
function SwatchChip({ swatch, selected, onClick, children }) {
  return (
    <Chip selected={selected} onClick={onClick} className="w-full !px-2.5 py-1 text-left leading-tight">
      {swatch ? (
        <span
          className={`h-2.5 w-2.5 shrink-0 rounded-sm ${swatch} ${
            selected ? "ring-1 ring-white/70 dark:ring-navy/40" : ""
          }`}
          aria-hidden="true"
        />
      ) : null}
      {children}
    </Chip>
  );
}

export default function StandMap({ edition }) {
  const { lang } = useLanguage();
  const t = STRINGS[lang];
  const studyLabels = STUDY_LABELS[lang] ?? STUDY_LABELS.en;
  const plan = edition.floorPlan;
  const [searchParams, setSearchParams] = useSearchParams();

  const companies = useMemo(
    () => localizeCompanies(edition.companies, lang),
    [edition.companies, lang]
  );
  const entries = useMemo(() => buildMapEntries(plan, companies, lang), [plan, companies, lang]);
  const byKey = useMemo(() => new Map(entries.map((entry) => [entry.key, entry])), [entries]);
  const ratios = useLogoRatios(
    useMemo(() => [...new Set(entries.map((entry) => entry.logo).filter(Boolean))], [entries])
  );

  const [selectedKey, setSelectedKey] = useState(null);
  const [filter, setFilter] = useState(null); // null | a study key | a MAP_GROUP
  const [mode, setMode] = useState("study"); // "study" | "az"
  const [query, setQuery] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [canFullscreen, setCanFullscreen] = useState(false);

  const rootRef = useRef(null); // what goes full screen
  const frameRef = useRef(null); // the map + the panel
  const mapRef = useRef(null);

  const selected = selectedKey ? byKey.get(selectedKey) ?? null : null;

  /** True when the list sits under the map instead of beside it. */
  const isStacked = () =>
    frameRef.current ? getComputedStyle(frameRef.current).flexDirection === "column" : false;

  // ── Selecting ─────────────────────────────────────────────────────────────
  /** Keep the chosen stand in the address, without adding history entries. */
  const writeStandParam = (stand) => {
    const params = new URLSearchParams(searchParams);
    if (stand === null) params.delete("stand");
    else params.set("stand", String(stand));
    if (params.toString() !== searchParams.toString()) setSearchParams(params, { replace: true });
  };

  const deselect = () => {
    setSelectedKey(null);
    writeStandParam(null);
  };

  // What still has to happen once the chosen stand's card is on the page:
  // "zoom" (glide to the stand) or "nudge" (only move it out from under the
  // card). Done in an effect, because the card must exist to be measured.
  const pendingMove = useRef(null);

  const select = (entry, zoom) => {
    const move = zoom ? "zoom" : "nudge";
    // Already open (its card is there): nothing to wait for.
    if (entry.key === selectedKey) {
      settle(entry, move);
      return;
    }
    pendingMove.current = move;
    setSelectedKey(entry.key);
    writeStandParam(entry.stand);
  };

  /**
   * The part of the map the card does not cover, in screen px from the
   * map's top-left corner: beside the card, or above it when the card
   * spans the full width (stacked layout). `cardTop` is where the card
   * begins.
   */
  const clearArea = () => {
    const map = mapRef.current.getBoundingClientRect();
    const cards = mapRef.current.querySelectorAll("[data-stand-card]");
    const card = cards[cards.length - 1]?.getBoundingClientRect();
    const area = {
      left: 0,
      top: 0,
      right: map.width - CONTROLS_RESERVE_PX,
      bottom: map.height,
      cardTop: card ? card.top - map.top - CARD_GAP_PX : map.height,
      map
    };
    if (!card) return area;
    if (isStacked()) area.bottom = area.cardTop;
    else area.left = card.right - map.left + CARD_GAP_PX;
    return area;
  };

  /** Bring the chosen stand into view, clear of its card. */
  const settle = (entry, move) => {
    if (!mapRef.current) return;
    const area = clearArea();
    const stacked = isStacked();

    if (move === "zoom") {
      // At least some ten metres of hall around the stand, and the stand in
      // the middle of the part of the map that is free.
      const reach = Math.max(Math.max(entry.bw, entry.bh) * 1.6, 5 * (plan.pixelsPerMetre ?? 28));
      view.api.showPoint(entry.cx, entry.cy, reach, {
        x: (area.left + area.right) / 2 - area.map.width / 2,
        y: (area.top + area.bottom) / 2 - area.map.height / 2
      });
      return;
    }

    // A click on the map: leave the view alone unless the card now lies
    // over the stand; then slide the map just far enough to show it.
    const shape = mapRef.current.querySelector(`[data-key="${entry.key}"]`)?.getBoundingClientRect();
    if (!shape) return;
    const stand = {
      left: shape.left - area.map.left,
      right: shape.right - area.map.left,
      top: shape.top - area.map.top,
      bottom: shape.bottom - area.map.top
    };
    const isUnderCard = stacked
      ? stand.bottom > area.bottom
      : stand.left < area.left && stand.bottom > area.cardTop;
    if (!isUnderCard) return;

    // How far [low, high] must move to lie inside [from, to].
    const shift = (low, high, from, to) => {
      if (high - low > to - from) return (from + to) / 2 - (low + high) / 2;
      if (low < from) return from - low;
      if (high > to) return to - high;
      return 0;
    };
    view.api.panBy(
      stacked ? 0 : shift(stand.left, stand.right, area.left, area.right),
      stacked ? shift(stand.top, stand.bottom, area.top, area.bottom) : 0
    );
  };

  // A newly chosen stand: wait one frame for its card, then move the map.
  useEffect(() => {
    const move = pendingMove.current;
    pendingMove.current = null;
    if (!move || !selected) return undefined;
    const frame = requestAnimationFrame(() => settle(selected, move));
    return () => cancelAnimationFrame(frame);
  }, [selectedKey]);

  /** A click on the map that was not a drag: which stand is under it? */
  const onTap = (clientX, clientY) => {
    const shape = document.elementFromPoint(clientX, clientY)?.closest?.("[data-key]");
    const entry = shape ? byKey.get(shape.getAttribute("data-key")) : null;
    if (entry && entry.kind !== "free" && matchesMapFilter(entry, filter)) select(entry, false);
    else deselect();
  };

  const view = useMapView({
    width: plan.width,
    height: plan.height,
    onTap,
    // In full screen there is no page to scroll, so the wheel zooms freely.
    freeWheel: isFullscreen
  });

  // From the list: also bring the map to the stand (and, stacked, into view).
  const pickFromList = (entry) => {
    select(entry, true);
    if (isStacked()) mapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const chooseFilter = (next) => {
    setFilter(next);
    if (selected && !matchesMapFilter(selected, next)) deselect();
    if (!next) {
      view.api.fit(true);
      return;
    }
    const hits = entries.filter((entry) => matchesMapFilter(entry, next));
    if (hits.length > 0) view.api.showBox(boundsOf(hits));
  };

  // Arriving with ?stand=12 ("Toon op kaart"): open that stand and go to it.
  useEffect(() => {
    const stand = Number.parseInt(searchParams.get("stand") ?? "", 10);
    const entry = entries.find((item) => item.stand === stand && item.kind !== "free");
    if (!entry) return undefined;

    pendingMove.current = "zoom";
    setSelectedKey(entry.key);
    const frame = requestAnimationFrame(() =>
      mapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    );
    return () => cancelAnimationFrame(frame);
    // Only on arrival: later changes to the address are our own.
  }, []);

  // Esc closes the card.
  useEffect(() => {
    if (!selectedKey) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") deselect();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [selectedKey, searchParams]);

  // ── Full screen ───────────────────────────────────────────────────────────
  useEffect(() => {
    setCanFullscreen(Boolean(document.fullscreenEnabled));
    const onChange = () => setIsFullscreen(document.fullscreenElement === rootRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else rootRef.current?.requestFullscreen?.().catch(() => {});
  };

  // ── The list ──────────────────────────────────────────────────────────────
  const byName = (a, b) => a.name.localeCompare(b.name, lang);
  const needle = normalize(query);
  const listed = entries
    .filter(
      (entry) =>
        matchesMapFilter(entry, filter) &&
        (!needle || normalize(entry.name).includes(needle) || String(entry.stand) === needle)
    )
    .sort(byName);

  // "Per opleiding": a company is listed under every programme it looks for.
  const groups = [
    ...STUDY_KEYS.map((key) => ({
      id: key,
      name: studyLabels[key]?.name ?? key,
      items: listed.filter((entry) => entry.groups.includes(key))
    })),
    {
      id: MAP_GROUP.team,
      name: t.mapGroupTeam,
      items: listed.filter((entry) => entry.kind === "team")
    },
    {
      id: MAP_GROUP.other,
      name: t.mapGroupOther,
      items: listed.filter((entry) => entry.kind === "company" && entry.groups.length === 0)
    },
    {
      id: MAP_GROUP.facility,
      name: t.mapGroupFacilities,
      items: listed.filter((entry) => entry.kind === "facility")
    }
  ].filter((group) => (!filter || filter === group.id) && group.items.length > 0);

  // The filter chips: only what actually occurs on this plan.
  const filterChips = [
    ...STUDY_KEYS.filter((key) => entries.some((entry) => entry.groups.includes(key))).map((key) => ({
      id: key,
      name: studyLabels[key]?.name ?? key
    })),
    ...(entries.some((entry) => entry.kind === "team") ? [{ id: MAP_GROUP.team, name: t.mapGroupTeam }] : []),
    ...(entries.some((entry) => entry.kind === "facility")
      ? [{ id: MAP_GROUP.facility, name: t.mapGroupFacilities }]
      : [])
  ];

  const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform ?? "");

  const row = (entry, prefix) => (
    <EntryRow
      key={`${prefix}-${entry.key}`}
      entry={entry}
      isSelected={entry.key === selectedKey}
      onPick={pickFromList}
    />
  );

  return (
    <div
      ref={rootRef}
      data-stand-map
      className={`@container ${isFullscreen ? "h-full w-full overflow-auto bg-white dark:bg-ink" : ""}`}
    >
      <div
        ref={frameRef}
        className={`flex flex-col overflow-hidden rounded-sm border border-rule bg-white dark:border-rule-dark dark:bg-ink @4xl:flex-row ${
          isFullscreen ? "@4xl:h-full" : "@4xl:h-[108vh] @4xl:max-h-[62rem]"
        }`}
      >
        {/* ── The map ── */}
        <div
          ref={mapRef}
          className="relative h-[62vh] min-w-0 scroll-mt-24 overflow-hidden bg-navy/[0.04] dark:bg-white/[0.04] @4xl:h-auto @4xl:flex-1"
        >
          <svg
            ref={view.svgRef}
            role="img"
            aria-label={t.mapSvgLabel}
            viewBox={`0 0 ${plan.width} ${plan.height}`}
            className="block h-full w-full cursor-grab touch-none select-none"
            {...view.handlers}
          >
            {plan.walls ? (
              <path
                d={plan.walls}
                fillRule="evenodd"
                className="pointer-events-none fill-navy dark:fill-white/70"
              />
            ) : null}

            {entries.map((entry) => {
              const matches = matchesMapFilter(entry, filter);
              return (
                <StandShape
                  key={entry.key}
                  entry={entry}
                  ratio={entry.logo ? ratios[entry.logo] : null}
                  dimmed={Boolean(filter) && !matches}
                  lit={Boolean(filter) && matches}
                  title={
                    entry.kind === "free"
                      ? null
                      : entry.stand === null
                        ? entry.name
                        : t.mapStandTitle(entry.name, entry.stand)
                  }
                />
              );
            })}

            {/* The chosen stand's outline, drawn last so no neighbour covers it. */}
            {selected ? (
              <polygon
                points={selected.points}
                data-selected-outline
                className={`pointer-events-none ${OUTLINE} ${OUTLINE_LIT} [stroke-width:4]`}
              />
            ) : null}
          </svg>

          <div className="absolute right-3 top-3 z-10 flex flex-col gap-1.5">
            <Button
              variant="outline"
              size="sm"
              icon={Plus}
              aria-label={t.mapZoomIn}
              title={t.mapZoomIn}
              onClick={() => view.api.zoomBy(1.5)}
              className="w-11 shrink-0 bg-white px-0 dark:bg-ink"
            />
            <Button
              variant="outline"
              size="sm"
              icon={Minus}
              aria-label={t.mapZoomOut}
              title={t.mapZoomOut}
              onClick={() => view.api.zoomBy(1 / 1.5)}
              className="w-11 shrink-0 bg-white px-0 dark:bg-ink"
            />
            <Button
              variant="outline"
              size="sm"
              icon={Home}
              aria-label={t.mapZoomFit}
              title={t.mapZoomFit}
              onClick={() => view.api.fit(true)}
              className="w-11 shrink-0 bg-white px-0 dark:bg-ink"
            />
            {canFullscreen ? (
              <Button
                variant="outline"
                size="sm"
                icon={isFullscreen ? Minimize : Maximize}
                aria-label={isFullscreen ? t.mapFullscreenExit : t.mapFullscreen}
                title={isFullscreen ? t.mapFullscreenExit : t.mapFullscreen}
                onClick={toggleFullscreen}
                className="w-11 shrink-0 bg-white px-0 dark:bg-ink"
              />
            ) : null}
          </div>

          {/* Shown for a moment after a plain scroll over the map. */}
          <div
            aria-hidden={!view.hintVisible}
            className={`pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-sm bg-navy-deep/90 px-4 py-2.5 text-small text-white transition-opacity duration-settle ${
              view.hintVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {isMac ? t.mapZoomHintMac : t.mapZoomHint}
          </div>

          <AnimatePresence>
            {selected ? (
              <StandCard key={selected.key} entry={selected} edition={edition} onClose={deselect} />
            ) : null}
          </AnimatePresence>
        </div>

        {/* ── The panel: search, filter, list ── */}
        <aside
          aria-label={t.mapPanelLabel}
          className="flex min-h-0 flex-col border-t border-rule dark:border-rule-dark @4xl:w-[26rem] @4xl:shrink-0 @4xl:border-l @4xl:border-t-0"
        >
          <div className="space-y-3 p-4 pb-3">
            <p className="text-small text-fg-muted dark:text-on-dark-2">{t.mapPanelHint}</p>

            <div className="relative">
              <label htmlFor="stand-map-search" className="sr-only">
                {t.mapSearchLabel}
              </label>
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-muted dark:text-on-dark-3"
                strokeWidth={2}
                aria-hidden="true"
              />
              <input
                id="stand-map-search"
                type="search"
                autoComplete="off"
                spellCheck={false}
                placeholder={t.mapSearchLabel}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="min-h-11 w-full rounded-sm border border-rule bg-white pl-10 pr-3 text-small text-fg placeholder:text-fg-muted transition-colors duration-settle hover:border-navy/60 focus:border-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-orange dark:border-rule-dark dark:bg-ink dark:text-white dark:placeholder:text-on-dark-3 dark:hover:border-white/60 dark:focus:border-white"
              />
            </div>

            <div role="group" aria-label={t.mapFilterLabel} className="grid grid-cols-2 gap-1.5">
              <SwatchChip selected={!filter} onClick={() => chooseFilter(null)}>
                {t.mapFilterAll}
              </SwatchChip>
              {filterChips.map((chip) => (
                <SwatchChip
                  key={chip.id}
                  swatch={SWATCH[chip.id]}
                  selected={filter === chip.id}
                  onClick={() => chooseFilter(filter === chip.id ? null : chip.id)}
                >
                  {chip.name}
                </SwatchChip>
              ))}
            </div>

            <div role="group" aria-label={t.mapViewLabel} className="flex gap-1.5">
              <Chip selected={mode === "study"} onClick={() => setMode("study")} className="flex-1 justify-center">
                {t.mapViewStudy}
              </Chip>
              <Chip selected={mode === "az"} onClick={() => setMode("az")} className="flex-1 justify-center">
                {t.mapViewAZ}
              </Chip>
            </div>
          </div>

          <div
            data-stand-list
            className="min-h-0 flex-1 border-t border-rule px-2 pb-3 pt-1 dark:border-rule-dark @4xl:overflow-y-auto"
          >
            {listed.length === 0 ? (
              <p className="px-2 py-3 text-small text-fg-muted dark:text-on-dark-2">{t.mapNoResults}</p>
            ) : mode === "study" ? (
              groups.map((group) => (
                <section key={group.id}>
                  <GroupHeading swatch={SWATCH[group.id]} count={group.items.length}>
                    {group.name}
                  </GroupHeading>
                  {group.items.map((entry) => row(entry, group.id))}
                </section>
              ))
            ) : (
              listed.flatMap((entry, index) => {
                const letter = entry.name.trim().charAt(0).toUpperCase();
                const previous = index > 0 ? listed[index - 1].name.trim().charAt(0).toUpperCase() : null;
                return letter === previous
                  ? [row(entry, "az")]
                  : [<GroupHeading key={`letter-${letter}`}>{letter}</GroupHeading>, row(entry, "az")];
              })
            )}
          </div>

          {plan.updated ? (
            <p className="border-t border-rule px-4 py-2.5 text-caption text-fg-muted dark:border-rule-dark dark:text-on-dark-3">
              {t.mapUpdated(pick(plan.updated, lang))}
            </p>
          ) : null}
        </aside>
      </div>
    </div>
  );
}
