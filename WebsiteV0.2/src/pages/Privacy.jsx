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
        <div className="font-extrabold text-navy dark:text-white">Galerie Brachot</div>
        <p className="mt-3">
          {lang === "nl"
            ? "De initiële ontwikkeling van deze website is mede mogelijk gemaakt dankzij Galerie Brachot. Galerie Brachot heeft geen toegang tot persoonsgegevens of andere informatie die via deze website wordt gedeeld."
            : "The initial creation of this website was made possible in part thanks to Galerie Brachot. Galerie Brachot does not have access to personal data or any other information shared through this website."}
        </p>
        <a
          href="https://www.galeriebrachot.be/en/"
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-3 rounded-xl bg-navy px-4 py-3 font-semibold text-white transition-all duration-300 hover:bg-orange hover:text-white dark:bg-white/10 dark:text-white dark:hover:bg-orange"
        >
          <img
            src="/logos/galerieb.png"
            alt="Galerie Brachot"
            className="h-8 w-auto rounded-md bg-navy/90 px-2 py-1 dark:bg-transparent"
            loading="lazy"
            decoding="async"
          />
          <span>
            {lang === "nl" ? "Bezoek de website van Galerie Brachot" : "Visit the Galerie Brachot website"}
          </span>
        </a>
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
