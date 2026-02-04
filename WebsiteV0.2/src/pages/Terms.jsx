import LegalLayout from "./LegalLayout.jsx";
import { useLanguage } from "../shared/LanguageContext.jsx";

export default function Terms() {
  const { lang } = useLanguage();
  const title = lang === "nl" ? "Gebruiksvoorwaarden" : "Terms of Service";

  return (
    <LegalLayout title={title}>
      <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 dark:border-white/10 dark:bg-white/5">
        <div className="font-extrabold text-navy dark:text-white">
          {lang === "nl" ? "Gebruik" : "Use"}
        </div>
        <p className="mt-3">
          {lang === "nl"
            ? "Deze website is bedoeld als informatieve pagina voor de T.I.S. Bedrijvendag. Inhoud kan wijzigen."
            : "This website is an informational page for the T.I.S. Career Day. Content may change."}
        </p>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 dark:border-white/10 dark:bg-white/5">
        <div className="font-extrabold text-navy dark:text-white">
          {lang === "nl" ? "Externe links" : "External links"}
        </div>
        <p className="mt-3">
          {lang === "nl"
            ? "Links naar externe websites vallen onder de voorwaarden en privacy van die websites."
            : "Links to external websites are subject to those websites' terms and privacy policies."}
        </p>
      </div>
    </LegalLayout>
  );
}
