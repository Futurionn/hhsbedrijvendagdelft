// ═════════════════════════════════════════════════════════════════════════════
//  NOVEMBER 2026  —  COMPANY LIST
//
//  ★ ADD PARTICIPATING COMPANIES HERE. ★
//
//  ─── THE THREE STEPS ────────────────────────────────────────────────────────
//   1. Put the logo file in           public/logos/
//   2. Copy the TEMPLATE below into the list and fill it in.
//   3. Open src/editions/november-2026/edition.config.js and set
//      `showCompanies: true` so the section appears on the site.
//
//  ─── TEMPLATE  (copy everything between the braces) ─────────────────────────
//
//      {
//        name: "Voorbeeld B.V.",
//        logo: "/logos/voorbeeld.svg",
//        logoTone: "light",
//        category: "engineering",
//        industry: { nl: "Machinebouw", en: "Machine building" },
//        employees: "~ 50",
//        location: { nl: "Delft, NL", en: "Delft, NL" },
//        website: "https://voorbeeld.nl/",
//        stand: 1,
//        description: {
//          nl: "Twee tot vier zinnen over wat het bedrijf doet.",
//          en: "Two to four sentences about what the company does."
//        }
//      },
//
//  ─── WHAT EACH FIELD MEANS ──────────────────────────────────────────────────
//
//   name         Required. Shown on the card. Also generates the company's web
//                address, so "Voorbeeld B.V." becomes "voorbeeld-b-v".
//
//   logo         Path starting at /logos/. The file itself goes in
//                public/logos/. Prefer an SVG, or a PNG with a transparent
//                background, at least ~600px wide.
//                Leave the field out entirely and a "work in progress"
//                placeholder is used.
//
//   logoTone     Only needed when the logo has one fixed colour:
//                  "light"  the logo is WHITE  -> give it a dark card
//                  "dark"   the logo is BLACK  -> give it a white card
//                Leave it out for normal colour logos; the card then follows
//                the visitor's light/dark setting.
//
//   category     Used by the filter on the companies page. Pick one of:
//                  engineering  consultancy  technology  installation
//                  recruitment  defence      energy-transition  other
//                To invent a new one, add it to CATEGORY_LABELS in
//                src/shared/strings.js first, or it shows as a raw slug.
//
//   industry     Short sector description. Bilingual.
//   employees    Free text: "~ 50", "51-200", "N/A".
//   location     City and country. Bilingual (usually the same in both).
//   website      Full https:// address. Use "#" if they have no site.
//
//   stand        The stand number on the floor plan, or leave it out if
//                stands are not assigned yet. This ONE number is what links
//                the company to its spot on the map — there is no second list.
//
//   description  Two to four sentences. Bilingual. This is the text that
//                appears when someone hovers the card.
//
//  ─── ORDER ──────────────────────────────────────────────────────────────────
//  The order here is the order the logos scroll past on the home page. The
//  companies PAGE has its own A-Z sort, so this order only affects the home page.
// ═════════════════════════════════════════════════════════════════════════════
import { normalizeCompanies } from "../../../shared/companyData.js";

export const NOVEMBER_2026_COMPANIES = normalizeCompanies([
  // ↓↓↓ Paste company entries here. The list being empty is why the home page
  //     currently shows the "companies will follow later" cards instead.
]);
