// ═════════════════════════════════════════════════════════════════════════════
//  STUDY ASSOCIATIONS
//
//  The six associations that organise the career day. Shown in the starry
//  navy section near the bottom of every home page.
//
//  These are the same for every edition, which is why they live in `shared`
//  rather than in an edition folder.
//
//  ─── TO ADD AN ASSOCIATION ──────────────────────────────────────────────────
//   1. Put the logo in  public/logos/
//   2. Copy a block below and fill it in.
//
//  ─── FIELDS ─────────────────────────────────────────────────────────────────
//   name          Shown in bold at the top of the card.
//   field         The study programme, shown underneath.
//   website       Without "https://" — it is added automatically.
//   logoSrc       Path starting at /logos/.
//   logoTone      Optional: "color" to show the logo in its own colours on
//                 the navy. Default "white" turns a dark-ink logo white.
//   logoPosition  Optional: "left" or "right" when a wide logo should hug one
//                 side instead of sitting centred.
//   logoOffsetY   Optional: nudge the logo up (negative) or down (positive)
//                 by this many pixels, for logos with odd whitespace.
// ═════════════════════════════════════════════════════════════════════════════

export const ASSOCIATIONS = [
  {
    name: "Ångström",
    field: "Technische Natuurkunde",
    website: "angstrom.nl",
    logoSrc: "/logos/angstrom.webp",
    logoTone: "color"
  },
  {
    name: "Fibonacci",
    field: "Toegepaste Wiskunde",
    website: "svfibonacci.nl",
    logoSrc: "/logos/Fibo.png"
  },
  {
    name: "Impuls",
    field: "Werktuigbouwkunde",
    website: "sv-impuls.nl",
    logoSrc: "/logos/Impuls.png",
    logoPosition: "right"
  },
  {
    name: "Kybernetes",
    field: "Mechatronica",
    website: "kybernetes.nl",
    logoSrc: "/logos/kyber.svg"
  },
  {
    name: "Rheon",
    field: "Elektrotechniek",
    website: "www.rheonline.nl",
    // Transparent copy of rheon.png (the original has a solid white fill).
    logoSrc: "/logos/rheon-lineart.png"
  },
  {
    name: "Bedrijfskundig Genootschap",
    field: "Technische Bedrijfskunde",
    website: "bgdelft.nl",
    logoSrc: "/logos/BG.png",
    logoTone: "color",
    logoOffsetY: 20
  }
];
