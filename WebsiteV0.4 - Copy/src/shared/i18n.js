// ─────────────────────────────────────────────────────────────────────────────
//  BILINGUAL VALUE HELPER
//
//  Data files store text that differs per language as an object:
//
//      description: { nl: "Fabrikant van sensoren.", en: "Sensor manufacturer." }
//
//  ...and text that is the SAME in both languages as a plain string:
//
//      name: "Tempcontrol B.V."
//
//  `pick()` accepts either shape and always returns a plain string, so
//  components never have to know which one a given field used.
//
//      pick(company.description, "nl")  ->  "Fabrikant van sensoren."
//      pick(company.name, "nl")         ->  "Tempcontrol B.V."
// ─────────────────────────────────────────────────────────────────────────────

export function pick(value, lang) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value[lang] ?? value.en ?? value.nl ?? "";
  }
  return value;
}
