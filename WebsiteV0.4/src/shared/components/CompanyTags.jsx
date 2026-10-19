// ─────────────────────────────────────────────────────────────────────────────
//  COMPANY TAGS  —  what a company is looking for, at a glance.
//
//      Zoekt studenten      [Elektrotechniek] [Mechatronica] [Werktuigbouwkunde]
//      Staat ook open voor  Technische Natuurkunde · HBO-ICT
//      Mogelijkheden        ✓ Stage  ✓ Afstuderen  ✓ Baan
//
//  Used by the companies list and by the panel that opens in the home-page
//  gallery. `highlight` is the study chosen in a filter: its tag turns
//  orange so a student sees straight away why the company is listed.
//  `compact` drops the "also open to" line (the gallery panel is small).
//  The colours follow the card (white or navy), not the site theme: see
//  cardPalette() in src/shared/companyStyles.js.
//
//  The data comes from the company's `studies` / `opportunities` fields; the
//  labels from STUDY_LABELS / OPPORTUNITY_LABELS in src/shared/strings.js.
// ─────────────────────────────────────────────────────────────────────────────
import { Check } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { OPPORTUNITY_LABELS, STRINGS, STUDY_LABELS } from "../strings.js";
import { studiesOpen, studiesWanted } from "../companyData.js";
import { cardPalette } from "../companyStyles.js";

function Row({ label, labelClass, children }) {
  return (
    <div className="grid gap-x-4 gap-y-1.5 @xl:grid-cols-[10.5rem_1fr] @xl:items-baseline">
      <dt className={`text-caption font-medium uppercase tracking-[0.08em] ${labelClass}`}>
        {label}
      </dt>
      <dd className="flex flex-wrap gap-1.5">{children}</dd>
    </div>
  );
}

export default function CompanyTags({ company, highlight, compact = false }) {
  const { lang } = useLanguage();
  const t = STRINGS[lang];
  const studies = STUDY_LABELS[lang] ?? STUDY_LABELS.en;
  const offers = OPPORTUNITY_LABELS[lang] ?? OPPORTUNITY_LABELS.en;
  const c = cardPalette(company.logoTone);

  const wanted = studiesWanted(company);
  const open = compact ? [] : studiesOpen(company);
  const opportunities = company.opportunities ?? [];

  if (wanted.length === 0 && open.length === 0 && opportunities.length === 0) return null;

  return (
    // A container: the label sits beside its tags only when the box itself
    // is wide enough, so a narrow card stacks it above instead.
    <dl className="space-y-2.5 @container">
      {wanted.length > 0 ? (
        <Row label={t.studiesWanted} labelClass={c.faint}>
          {wanted.map((key) => (
            <span
              key={key}
              className={`rounded-sm px-2 py-0.5 text-caption font-medium ${
                key === highlight ? "bg-orange text-orange-ink" : c.wanted
              }`}
            >
              {studies[key]?.name ?? key}
            </span>
          ))}
        </Row>
      ) : null}

      {open.length > 0 ? (
        <Row label={t.studiesOpen} labelClass={c.faint}>
          {open.map((key) => (
            <span
              key={key}
              className={`rounded-sm border px-2 py-px text-caption ${
                key === highlight ? c.openHighlight : c.open
              }`}
            >
              {studies[key]?.name ?? key}
            </span>
          ))}
        </Row>
      ) : null}

      {opportunities.length > 0 ? (
        <Row label={t.opportunitiesLabel} labelClass={c.faint}>
          {opportunities.map((key) => (
            <span
              key={key}
              className={`inline-flex items-center gap-1 pr-2 text-caption font-medium ${c.primary}`}
            >
              <Check className={`h-3.5 w-3.5 ${c.accent}`} strokeWidth={2.25} aria-hidden="true" />
              {offers[key] ?? key}
            </span>
          ))}
        </Row>
      ) : null}
    </dl>
  );
}
