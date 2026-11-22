// ─────────────────────────────────────────────────────────────────────────────
//  FLOOR PLAN DATA HELPERS
//
//  An edition's floor plan (src/editions/<edition>/data/floorPlan.js) only
//  says where each stand IS. Who stands there comes from the company list,
//  through the `stand:` number. This file joins the two into the complete
//  objects the map draws (StandMap.jsx): one "entry" per stand or facility,
//  with its name, logo, colours and measured shape.
//
//  You should not need to touch this file to move a stand or a company.
// ─────────────────────────────────────────────────────────────────────────────
import { studiesWanted } from "./companyData.js";
import { pick } from "./i18n.js";
import { STAND_COLORS } from "./theme.js";

/** The filter values that are not a study programme. */
export const MAP_GROUP = {
  team: "team",
  other: "other",
  facility: "facility"
};

/** [[x, y], ...]  ->  "x,y x,y ..."  (what an SVG polygon wants). */
export function toPointString(points) {
  return points.map(([x, y]) => `${x},${y}`).join(" ");
}

/**
 * Measure a stand: its centre, its bounding box, and the upright box that
 * fits INSIDE it (`bw` x `bh`). The logo and the number tag are laid out in
 * that inner box, so they stay inside a stand that is drawn at an angle.
 * `angle` is the direction of its long side, between -90° and 90°.
 */
export function standGeometry(points) {
  const xs = points.map((point) => point[0]);
  const ys = points.map((point) => point[1]);
  const bbox = {
    x0: Math.min(...xs),
    y0: Math.min(...ys),
    x1: Math.max(...xs),
    y1: Math.max(...ys)
  };
  const cx = xs.reduce((sum, x) => sum + x, 0) / xs.length;
  const cy = ys.reduce((sum, y) => sum + y, 0) / ys.length;

  // Anything that is not four-cornered: fall back to the bounding box.
  if (points.length !== 4) {
    return { cx, cy, bbox, bw: bbox.x1 - bbox.x0, bh: bbox.y1 - bbox.y0, angle: 0, rotated: false };
  }

  const [p0, p1, p2] = points;
  const sideA = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]);
  const sideB = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]);
  const angleA = Math.atan2(p1[1] - p0[1], p1[0] - p0[0]);
  const cos = Math.abs(Math.cos(angleA));
  const sin = Math.abs(Math.sin(angleA));
  // 1 for an upright stand; up to 1.41 for one turned 45°.
  const shrink = cos + sin;
  const aIsHorizontal = cos >= sin;

  // The long side's direction, turned so text along it is never upside down.
  const longAngle = sideA >= sideB ? angleA : angleA + Math.PI / 2;
  let degrees = (longAngle * 180) / Math.PI;
  while (degrees > 90) degrees -= 180;
  while (degrees <= -90) degrees += 180;

  return {
    cx,
    cy,
    bbox,
    bw: (aIsHorizontal ? sideA : sideB) / shrink,
    bh: (aIsHorizontal ? sideB : sideA) / shrink,
    long: Math.max(sideA, sideB),
    short: Math.min(sideA, sideB),
    angle: degrees,
    rotated: shrink > 1.02
  };
}

/**
 * Cut a four-cornered stand into equal stripes, one per colour, along its
 * first side. Returns [{ color, points }] ready for <polygon>.
 */
export function standStripes(points, colors) {
  if (points.length !== 4 || colors.length < 2) {
    return [{ color: colors[0], points: toPointString(points) }];
  }
  const [p0, p1, p2, p3] = points;
  const along = (from, to, t) => [from[0] + (to[0] - from[0]) * t, from[1] + (to[1] - from[1]) * t];
  const round = ([x, y]) => [Math.round(x * 10) / 10, Math.round(y * 10) / 10];

  return colors.map((color, index) => {
    const start = index / colors.length;
    const end = (index + 1) / colors.length;
    return {
      color,
      points: toPointString(
        [along(p0, p1, start), along(p0, p1, end), along(p3, p2, end), along(p3, p2, start)].map(round)
      )
    };
  });
}

/**
 * Join the floor plan with the (already localised) company list.
 *
 * Every entry has:
 *   key      unique, e.g. "stand-15" or "facility-garderobe"
 *   kind     "company" | "team" | "free" | "facility"
 *   stand    the stand number, or null for a facility
 *   name     what to call it (null for a free stand)
 *   company  the company object, for kind "company"
 *   groups   what the filter matches on: study keys, or ["team"]
 *   colors   the hex colours it is painted in
 *   stripes  those colours as polygons
 *   + logo, logoTone, website, and the measurements from standGeometry()
 */
export function buildMapEntries(plan, companies, lang) {
  if (!plan?.stands) return [];

  const companyByStand = new Map(
    companies.filter((company) => Number.isInteger(company.stand)).map((company) => [company.stand, company])
  );
  const extraByStand = new Map((plan.extraStands ?? []).map((extra) => [extra.stand, extra]));
  const seen = new Set();

  const stands = plan.stands.map((spot, index) => {
    const company = companyByStand.get(spot.stand) ?? null;
    const extra = company ? null : extraByStand.get(spot.stand) ?? null;
    // A stand drawn twice keeps a distinct key.
    const key = seen.has(spot.stand) ? `stand-${spot.stand}-${index}` : `stand-${spot.stand}`;
    seen.add(spot.stand);

    let kind = "free";
    let groups = [];
    let colors = [STAND_COLORS.other];
    if (company) {
      kind = "company";
      groups = studiesWanted(company);
      if (groups.length > 0) colors = groups.map((study) => STAND_COLORS[study] ?? STAND_COLORS.other);
    } else if (extra) {
      kind = "team";
      groups = [MAP_GROUP.team];
      colors = [STAND_COLORS.team];
    }

    const source = company ?? extra;
    return {
      key,
      kind,
      stand: spot.stand,
      name: source ? pick(source.name, lang) : null,
      company,
      logo: source?.logo ?? null,
      logoTone: source?.logoTone ?? null,
      website: source?.website && source.website !== "#" ? source.website : null,
      groups,
      colors,
      points: toPointString(spot.points),
      stripes: standStripes(spot.points, colors),
      ...standGeometry(spot.points)
    };
  });

  const facilities = (plan.facilities ?? []).map((facility) => ({
    key: `facility-${facility.id}`,
    kind: "facility",
    stand: null,
    name: pick(facility.name, lang),
    company: null,
    logo: null,
    logoTone: null,
    website: null,
    groups: [],
    colors: [STAND_COLORS.facility],
    points: toPointString(facility.points),
    stripes: standStripes(facility.points, [STAND_COLORS.facility]),
    ...standGeometry(facility.points)
  }));

  return [...stands, ...facilities];
}

/**
 * Does an entry pass the chosen filter? `filter` is null (everything), a
 * study key ("ee"), or one of MAP_GROUP. A free stand never matches.
 */
export function matchesMapFilter(entry, filter) {
  if (entry.kind === "free") return false;
  if (!filter) return true;
  if (filter === MAP_GROUP.facility) return entry.kind === "facility";
  if (entry.kind === "facility") return false;
  if (filter === MAP_GROUP.other) return entry.groups.length === 0;
  return entry.groups.includes(filter);
}

/** The box around a set of entries: what the map zooms to after a filter. */
export function boundsOf(entries) {
  return entries.reduce(
    (box, entry) => ({
      x0: Math.min(box.x0, entry.bbox.x0),
      y0: Math.min(box.y0, entry.bbox.y0),
      x1: Math.max(box.x1, entry.bbox.x1),
      y1: Math.max(box.y1, entry.bbox.y1)
    }),
    { x0: Infinity, y0: Infinity, x1: -Infinity, y1: -Infinity }
  );
}
