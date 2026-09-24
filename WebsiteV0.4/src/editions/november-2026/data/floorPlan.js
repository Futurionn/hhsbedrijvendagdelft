// ═════════════════════════════════════════════════════════════════════════════
//  NOVEMBER 2026  —  FLOOR PLAN
//
//  ★ ADD THE INTERACTIVE MAP HERE. ★
//
//  `null` means "this edition has no floor plan yet" and the map page stays
//  hidden. To switch the map on, replace `null` with the object shown in the
//  template below, then set `showFloorPlan: true` in edition.config.js.
//
//  ─── HOW THE MAP WORKS ──────────────────────────────────────────────────────
//  A picture of the venue sits in /public. On top of it, invisible rectangles
//  are placed over each stand. Hovering one shows the company name; clicking
//  one opens that company in the companies list.
//
//  A rectangle finds its company through the `stand:` number that the company
//  carries in ./companies.js. One number, one source of truth.
//
//  ─── HOW TO GET THE COORDINATES ─────────────────────────────────────────────
//  Coordinates are PIXELS OF THE ORIGINAL IMAGE FILE, counted from its
//  top-left corner — not screen pixels, and not percentages. The component
//  converts them to percentages, which is why the map stays aligned on a phone.
//
//  The quickest way to measure them:
//    1. Open the image in any editor that shows a pixel cursor position
//       (Paint, GIMP, Photoshop, Figma, even Windows Photos' crop tool).
//    2. Put the cursor on the TOP-LEFT corner of a stand  -> that is x and y.
//    3. Put it on the BOTTOM-RIGHT corner. Then:
//          width  = right x  -  left x
//          height = bottom y -  top y
//    4. Check your work in the browser: the rectangle lights up orange on hover.
//
//  ─── TEMPLATE ───────────────────────────────────────────────────────────────
//
//      export const NOVEMBER_2026_FLOOR_PLAN = {
//        image: "/MapNovember2026.jpeg",   // the file, placed in public/
//        imageWidth: 1131,                 // the file's REAL pixel width
//        imageHeight: 1600,                // the file's REAL pixel height
//
//        // Names for stands that are not companies (student teams, partners).
//        extraStandLabels: {
//          12: "Hydro Motion Team"
//        },
//
//        hotspots: [
//          { stand: 1, x: 153, y: 1063, width: 80, height: 60 },
//          { stand: 2, x: 558, y: 423,  width: 37, height: 74 }
//          // ...one line per stand
//        ]
//      };
//
//  If one stand appears twice on the picture, give each rectangle a `key` so
//  they stay distinguishable:
//        { stand: 32, key: "upper", x: 1060, y: 284, width: 37, height: 74 },
//        { stand: 32, key: "lower", x: 857,  y: 611, width: 37, height: 74 }
//
//  A worked, complete example is right next door:
//      src/editions/march-2026/data/floorPlan.js
// ═════════════════════════════════════════════════════════════════════════════

export const NOVEMBER_2026_FLOOR_PLAN = null;
