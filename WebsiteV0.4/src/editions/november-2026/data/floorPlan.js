// ═════════════════════════════════════════════════════════════════════════════
//  NOVEMBER 2026  —  FLOOR PLAN
//
//  ★ THE INTERACTIVE MAP: where every stand is. ★
//
//  The map is DRAWN from this file (it is not a picture): the walls of the
//  hall, one shape per stand, and the facilities. The page that shows it is
//  /November2026/plattegrond; the component is
//  src/shared/components/StandMap.jsx.
//
//  ─── WHAT IS *NOT* IN THIS FILE ─────────────────────────────────────────────
//  Which company stands where. A stand here only has a NUMBER; the company
//  with the same `stand:` number in ./companies.js is the one drawn on it —
//  its logo, its name, its text, and the colours of the study programmes it
//  is looking for (its `studies` marked "yes"). One number, one source of
//  truth.
//
//  So, to ...
//    move a company to another stand   change `stand:` in ./companies.js
//    swap two companies                swap their `stand:` numbers there
//    change a stand's colours          change the company's `studies` there
//    empty a stand                     remove `stand:` from the company; the
//                                      stand stays on the map, white, with
//                                      only its number
//    hide the whole map                `showFloorPlan: false` in
//                                      ../edition.config.js
//
//  ─── COORDINATES ────────────────────────────────────────────────────────────
//  Everything is measured on one drawing of `width` x `height` units, from
//  its top-left corner (x to the right, y down). `pixelsPerMetre` says how
//  many of those units one metre is: a 4 m x 2 m stand is about 113 x 57.
//
//  A stand is its four corners, in order round the shape:
//      { stand: 15, points: [[769, 271.2], [655.6, 271.2], [655.6, 214.5], [769, 214.5]] }
//  The colour stripes are cut along the FIRST side (corner 1 to corner 2), so
//  start with a long side to get stripes across the length of the stand.
//
//  ─── WHERE THE NUMBERS COME FROM ────────────────────────────────────────────
//  The organisers draw the plan in their floor-plan editor and export it as
//  one HTML file ("plattegrond_met_bedrijven.html"). The stands, facilities
//  and walls below were taken from the export of 18 November 2026. After a
//  new export, replace the `points` (and `walls` if the hall changed) and
//  update `updated`.
// ═════════════════════════════════════════════════════════════════════════════

export const NOVEMBER_2026_FLOOR_PLAN = {
  /** The size of the drawing all coordinates are measured on. */
  width: 1538.5,
  height: 1573.5,

  /** Drawing units per metre. Decides how far the map zooms in on a stand. */
  pixelsPerMetre: 28.3,

  /** Shown under the list: "Laatst bijgewerkt op ...". */
  updated: { nl: "18 november 2026", en: "18 November 2026" },

  /**
   * The walls of the hall, as one SVG path (filled, not stroked). Traced
   * from the organisers' drawing; the gaps are the doors.
   */
  walls:
    "M592.2,1278.9 590.9,1282.0 615.8,1292.9 617.1,1289.8 616.7,1289.0 593.1,1278.5Z" +
    "M917.4,832.2 917.0,925.3 993.9,926.2 993.9,1017.5 1045.0,1118.1 1045.0,1445.0 1033.2,1445.0 935.8,1437.6 663.0,1309.1 661.3,1312.6 930.5,1439.3 933.2,1441.5 1049.4,1449.8 1049.4,1117.2 997.8,1016.2 997.8,926.2 1047.7,926.2 1047.7,922.2 997.8,921.4 921.8,921.4 921.4,837.0 948.9,836.6 948.9,832.2Z" +
    "M561.6,528.4 557.3,528.9 556.8,822.6 324.7,822.2 324.3,910.9 90.9,910.9 90.9,914.8 90.0,915.3 90.0,1045.9 545.9,1260.5 546.8,1260.5 548.1,1257.1 94.4,1043.3 94.0,915.3 328.7,914.8 329.1,826.1 561.6,826.5Z" +
    "M1001.8,466.4 985.2,467.2 984.3,719.0 1002.2,718.6Z" +
    "M991.3,470.7 998.3,471.2 997.8,714.6 988.2,714.2 989.1,479.0 989.5,471.6Z" +
    "M1001.8,323.0 986.0,322.6 985.2,396.4 984.3,398.2 869.3,398.2 869.3,414.8 1001.3,415.2Z" +
    "M997.4,327.4 997.0,410.9 873.3,410.4 873.7,402.6 989.1,402.6 990.0,326.9 992.6,326.5Z" +
    "M557.3,210.2 556.8,483.4 560.8,483.4 561.2,271.4 562.1,214.2 984.3,213.7 984.7,270.6 1002.2,271.0 1003.1,101.0 1380.7,101.0 1381.2,769.3 867.6,769.7 867.6,787.2 982.1,787.2 982.5,865.9 986.9,866.3 986.9,783.3 872.4,783.3 872.0,774.1 1385.1,773.6 1385.1,97.0 998.7,97.0 998.3,266.6 989.1,266.2 988.7,212.0 987.3,209.8Z",

  /**
   * Stands that are not a company (student teams). They are drawn like a
   * company stand, in the "team" colour, and listed under "Dreamteam".
   * `logo`, `logoTone` and `website` are optional.
   */
  extraStands: [
    {
      stand: 39,
      name: "Hydro Motion Team",
      logo: "/logos/hydromotion.png",
      logoTone: "dark",
      website: "https://hydromotionteam.nl/"
    }
  ],

  /** Things that are not stands. Listed under "Voorzieningen". */
  facilities: [
    {
      id: "infobalie",
      name: { nl: "Infobalie", en: "Info desk" },
      points: [[644.3, 1237.3], [620.3, 1288.7], [594.6, 1276.7], [618.6, 1225.4]]
    },
    {
      id: "garderobe",
      name: { nl: "Garderobe", en: "Cloakroom" },
      points: [[928.2, 866.2], [1041.6, 866.2], [1041.6, 922.9], [928.2, 922.9]]
    }
  ],

  /** One line per stand. The trailing name is only a note for the reader. */
  stands: [
    { stand: 1, points: [[825.1, 1290.4], [902.2, 1326.3], [866.3, 1403.4], [789.2, 1367.5]] }, // Schulte en Lestraden B.V.
    { stand: 2, points: [[748.1, 1254.5], [825.1, 1290.4], [789.2, 1367.5], [712.1, 1331.5]] }, // Continu Professionals
    { stand: 3, points: [[514.3, 1145.5], [591.4, 1181.4], [555.4, 1258.5], [478.4, 1222.5]] }, // Almacon Storage Systems
    { stand: 4, points: [[437.2, 1109.5], [514.3, 1145.5], [478.4, 1222.5], [401.3, 1186.6]] }, // Demcon
    { stand: 5, points: [[360.2, 1073.6], [437.2, 1109.5], [401.3, 1186.6], [324.2, 1150.7]] }, // Sweco Nederland B.V.
    { stand: 6, points: [[283.1, 1037.6], [360.2, 1073.6], [324.2, 1150.7], [247.2, 1114.7]] }, // Tempcontrol
    { stand: 7, points: [[206, 1001.7], [283.1, 1037.6], [247.2, 1114.7], [170.1, 1078.8]] }, // DVI
    { stand: 8, points: [[477.6, 937.1], [392.6, 937.1], [392.6, 852], [477.6, 852]] }, // Rubber Design B.V.
    { stand: 9, points: [[562.6, 937.1], [477.6, 937.1], [477.6, 852], [562.6, 852]] }, // ABB B.V.
    { stand: 10, points: [[619.3, 762], [619.3, 875.4], [562.6, 875.4], [562.6, 762]] }, // Van Dorp Installaties
    { stand: 11, points: [[619.3, 648.6], [619.3, 762], [562.6, 762], [562.6, 648.6]] }, // Gebr. Smits Holding B.V.
    { stand: 12, points: [[619.3, 535.2], [619.3, 648.6], [562.6, 648.6], [562.6, 535.2]] }, // InWork
    { stand: 13, points: [[619.3, 399.3], [619.3, 512.7], [562.6, 512.7], [562.6, 399.3]] }, // DVP Smart Concepts B.V.
    { stand: 14, points: [[619.3, 285.9], [619.3, 399.3], [562.6, 399.3], [562.6, 285.9]] }, // Peutz
    { stand: 15, points: [[769, 271.2], [655.6, 271.2], [655.6, 214.5], [769, 214.5]] }, // Hoppenbrouwers Barendrecht
    { stand: 16, points: [[882.3, 271.2], [769, 271.2], [769, 214.5], [882.3, 214.5]] }, // Comaen
    { stand: 17, points: [[882.3, 467.7], [967.4, 467.7], [967.4, 552.8], [882.3, 552.8]] }, // Wepro
    { stand: 18, points: [[882.3, 552.8], [967.4, 552.8], [967.4, 637.8], [882.3, 637.8]] }, // Berkel Industrial B.V.
    { stand: 19, points: [[882.3, 637.8], [967.4, 637.8], [967.4, 722.8], [882.3, 722.8]] }, // Verkade Klimaat
    { stand: 20, points: [[683.9, 459.2], [683.9, 345.8], [740.6, 345.8], [740.6, 459.2]] }, // Huygen
    { stand: 21, points: [[797.3, 345.8], [797.3, 459.2], [740.6, 459.2], [740.6, 345.8]] }, // Emmett Green Engineering
    { stand: 22, points: [[683.9, 572.6], [683.9, 459.2], [740.6, 459.2], [740.6, 572.6]] }, // Energy Solutions B.V.
    { stand: 23, points: [[797.3, 459.2], [797.3, 572.6], [740.6, 572.6], [740.6, 459.2]] }, // Mammoet
    { stand: 24, points: [[683.9, 686], [683.9, 572.6], [740.6, 572.6], [740.6, 686]] }, // Osbit
    { stand: 25, points: [[797.3, 572.6], [797.3, 686], [740.6, 686], [740.6, 572.6]] }, // Red Point Alloys B.V.
    { stand: 26, points: [[797.3, 742.7], [683.9, 742.7], [683.9, 686], [797.3, 686]] }, // Online Payment Platform
    { stand: 27, points: [[669.7, 861], [754.8, 861], [754.8, 946.1], [669.7, 946.1]] }, // RH Marine Netherlands B.V.
    { stand: 28, points: [[754.8, 861], [839.8, 861], [839.8, 946.1], [754.8, 946.1]] }, // Quooker
    { stand: 29, points: [[669.7, 1031.1], [669.7, 946.1], [754.8, 946.1], [754.8, 1031.1]] }, // Conscia Nederland
    { stand: 30, points: [[754.8, 946.1], [839.8, 946.1], [839.8, 1031.1], [754.8, 1031.1]] }, // Dosign Engineering
    { stand: 31, points: [[1169.7, 226.8], [1056.3, 226.8], [1056.3, 170.1], [1169.7, 170.1]] }, // Leiderdorp Instruments
    { stand: 32, points: [[1283, 226.8], [1169.7, 226.8], [1169.7, 170.1], [1283, 170.1]] }, // Logiqs B.V.
    { stand: 33, points: [[1311.7, 430.9], [1311.7, 317.5], [1368.4, 317.5], [1368.4, 430.9]] }, // Fluor B.V.
    { stand: 34, points: [[1311.7, 544.3], [1311.7, 430.9], [1368.4, 430.9], [1368.4, 544.3]] }, // KERN Engineers
    { stand: 35, points: [[1311.7, 657.6], [1311.7, 544.3], [1368.4, 544.3], [1368.4, 657.6]] }, // Certhon
    { stand: 36, points: [[1198.3, 709.1], [1311.7, 709.1], [1311.7, 765.8], [1198.3, 765.8]] }, // Maasstad Ingenieurs B.V.
    { stand: 37, points: [[1084.9, 709.1], [1198.3, 709.1], [1198.3, 765.8], [1084.9, 765.8]] }, // Siemens Nederland N.V.
    { stand: 38, points: [[1113.3, 365.3], [1113.3, 280.3], [1198.3, 280.3], [1198.3, 365.3]] }, // Roll Dock Shipping B.V.
    { stand: 39, points: [[1198.3, 365.3], [1198.3, 450.3], [1113.3, 450.3], [1113.3, 365.3]] }, // Hydro Motion Team
    { stand: 40, points: [[1113.3, 535.2], [1113.3, 450.2], [1198.3, 450.2], [1198.3, 535.2]] }, // Rijksvastgoedbedrijf
    { stand: 41, points: [[1198.3, 535.2], [1198.3, 620.2], [1113.3, 620.2], [1113.3, 535.2]] } // TechniekMatch
  ]
};
