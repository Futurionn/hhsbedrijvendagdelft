import LegalLayout from "./LegalLayout.jsx";
import { useLanguage } from "../shared/LanguageContext.jsx";

export default function Privacy() {
  const { lang } = useLanguage();
  const title = lang === "nl" ? "Privacybeleid" : "Privacy Policy";

  return (
    <LegalLayout title={title}>
      <p className="text-gray-700 dark:text-gray-200">
        {lang === "nl"
          ? "We gaan zorgvuldig om met privacy. Deze website is vooral informatief."
          : "We take privacy seriously. This website is primarily informational."}
      </p>

      <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 dark:border-white/10 dark:bg-white/5">
        <div className="font-extrabold text-navy dark:text-white">
          {lang === "nl" ? "Wat we (nu) doen" : "What we (currently) do"}
        </div>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            {lang === "nl"
              ? "Geen registratieformulier op de site."
              : "No registration form on the site."}
          </li>
          <li>
            {lang === "nl"
              ? "Geen tracking/analytics ingesteld."
              : "No tracking/analytics configured."}
          </li>
        </ul>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 dark:border-white/10 dark:bg-white/5">
        <div className="font-extrabold text-navy dark:text-white">
          {lang === "nl" ? "Wijzigingen" : "Changes"}
        </div>
        <p className="mt-3">
          {lang === "nl"
            ? "Als we later analytics of inschrijvingen toevoegen, werken we dit beleid bij."
            : "If we add analytics or registrations later, we will update this policy."}
        </p>
      </div>
    </LegalLayout>
  );
}
