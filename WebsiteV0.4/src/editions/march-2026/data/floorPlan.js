// ─────────────────────────────────────────────────────────────────────────────
//  MARCH 2026  —  FLOOR PLAN         *** FROZEN ARCHIVE — DO NOT EDIT ***
//
//  The clickable rectangles laid over the floor plan picture.
//
//  HOW THE MAP KNOWS WHICH COMPANY IS WHERE
//  Each company in ./companies.js carries a `stand:` number. A hotspot with
//  the same `stand` number is that company's spot on the picture. There is no
//  second list to keep in sync — the company list is the single source of truth.
//
//  COORDINATES are in PIXELS OF THE ORIGINAL IMAGE, measured from its top-left
//  corner. The component converts them to percentages, so the map stays correct
//  at any screen size. If you ever swap the picture for a new one, update
//  `imageWidth` / `imageHeight` to the new file's real pixel size.
// ─────────────────────────────────────────────────────────────────────────────

export const MARCH_2026_FLOOR_PLAN = {
  /** Path inside /public. */
  image: "/MapHHS.jpeg",

  /** The picture's real size in pixels — the coordinate system below. */
  imageWidth: 1131,
  imageHeight: 1600,

  /**
   * Names for stands that are NOT in companies.js (student teams, partners).
   * Stands that do have a company entry are labelled automatically.
   */
  extraStandLabels: {
    // 10 stands below belong to student teams and partner
    // stands that have no entry in companies.js, so their name is given here.
    29: "Technisch Bureau Koppe B.V.",
    30: "Sensor",
    31: "Mammoet",
    32: "Stedin netbeheer",
    33: "Dosign B.V.",
    34: "Continu B.V.",
    35: "Hydro Motion Team",
    36: "Even Groene Vrienden",
    37: "Delft Solar Team",
    38: "The Curiosity Contest",
  },

  /**
   * One rectangle per stand.
   *   stand  = the number printed on the floor plan
   *   x, y   = top-left corner, in original-image pixels
   *   width, height = size of the clickable area
   *   key    = only needed when one stand appears TWICE on the picture,
   *            to give each rectangle a unique React key
   */
  hotspots: [
    { stand: 1, x: 153, y: 1063, width: 80, height: 60 },
    { stand: 2, x: 558, y: 423, width: 37, height: 74 },
    { stand: 3, x: 614, y: 423, width: 37, height: 74 },
    { stand: 4, x: 757, y: 580, width: 37, height: 76 },
    { stand: 5, x: 757, y: 455, width: 37, height: 74 },
    { stand: 6, x: 567, y: 375, width: 74, height: 37 },
    { stand: 7, x: 558, y: 521, width: 37, height: 74 },
    { stand: 8, x: 614, y: 517, width: 37, height: 74 },
    { stand: 9, x: 558, y: 611, width: 37, height: 74 },
    { stand: 10, x: 558, y: 701, width: 37, height: 75 },
    { stand: 11, x: 1059, y: 440, width: 39, height: 76 },
    { stand: 12, x: 1052, y: 605, width: 37, height: 75 },
    { stand: 13, x: 393, y: 568, width: 69, height: 69 },
    { stand: 14, x: 235, y: 840, width: 69, height: 69 },
    { stand: 15, x: 633, y: 256, width: 69, height: 69 },
    { stand: 16, x: 614, y: 800, width: 69, height: 69 },
    { stand: 17, x: 403, y: 271, width: 69, height: 69 },
    { stand: 18, x: 401, y: 363, width: 69, height: 69 },
    { stand: 19, x: 535, y: 800, width: 69, height: 69 },
    { stand: 20, x: 706, y: 997, width: 69, height: 68 },
    { stand: 21, x: 535, y: 254, width: 69, height: 68 },
    { stand: 22, x: 314, y: 840, width: 70, height: 69 },
    { stand: 23, x: 614, y: 611, width: 37, height: 74 },
    { stand: 24, x: 468, y: 1162, width: 80, height: 58 },
    { stand: 25, x: 614, y: 701, width: 37, height: 75 },
    { stand: 26, x: 696, y: 1086, width: 78, height: 78 },
    { stand: 27, x: 78, y: 1007, width: 75, height: 84 },
    { stand: 28, x: 2, y: 1007, width: 75, height: 84 },
    { stand: 29, x: 559, y: 1193, width: 81, height: 58 },
    { stand: 30, x: 3, y: 916, width: 38, height: 75 },
    { stand: 31, x: 396, y: 749, width: 71, height: 69 },
    { stand: 32, key: "lower", x: 857, y: 611, width: 37, height: 74 },
    { stand: 32, key: "upper", x: 1060, y: 284, width: 37, height: 74 },
    { stand: 33, x: 566, y: 890, width: 70, height: 69 },
    { stand: 34, x: 393, y: 659, width: 69, height: 69 },
    { stand: 35, x: 921, y: 277, width: 69, height: 69 },
    { stand: 36, x: 920, y: 358, width: 70, height: 69 },
    { stand: 37, x: 921, y: 439, width: 76, height: 70 },
    { stand: 38, x: 920, y: 521, width: 70, height: 69 },
  ]
};
