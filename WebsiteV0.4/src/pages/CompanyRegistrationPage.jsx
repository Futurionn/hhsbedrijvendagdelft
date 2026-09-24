// ─────────────────────────────────────────────────────────────────────────────
//  COMPANY REGISTRATION PAGE  —  lives at /voor-bedrijven
//
//  Four info cards plus the embedded Microsoft Form that companies fill in to
//  register their interest.
//
//  The form address is in src/site.config.js -> COMPANY_REGISTRATION.
//  The card text is in the CARDS list below.
// ─────────────────────────────────────────────────────────────────────────────
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  FileText,
  Mail,
  MapPin
} from "lucide-react";
import PageLayout from "../shared/components/PageLayout.jsx";
import Button from "../shared/ui/Button.jsx";
import Card from "../shared/ui/Card.jsx";
import { useLanguage } from "../shared/context/LanguageContext.jsx";
import { usePageMeta } from "../shared/hooks/usePageMeta.js";
import { pick } from "../shared/i18n.js";
import { COMPANY_REGISTRATION, CONTACT, VENUE } from "../site.config.js";

/** The four explanatory cards. Copy a block to add one. */
const CARDS = [
  {
    icon: CalendarDays,
    title: { nl: "Wanneer", en: "When" },
    body: {
      nl: "Donderdag 26 november 2026, van 13:00 tot 19:00 uur. Vanaf 16:00 is er een netwerkborrel.",
      en: "Thursday 26 November 2026, from 13:00 to 19:00. Networking drinks from 16:00."
    }
  },
  {
    icon: MapPin,
    title: { nl: "Waar", en: "Where" },
    body: {
      nl: `${VENUE.nameNl}, Delft T.I.S. Campus, ${VENUE.address}.`,
      en: `${VENUE.nameEn}, Delft T.I.S. Campus, ${VENUE.address}.`
    }
  },
  {
    icon: BriefcaseBusiness,
    title: { nl: "Aanmelden", en: "Registering" },
    body: {
      nl: "Via het formulier op deze pagina meldt u uw bedrijf aan voor deelname met een stand. U geeft daarbij uw contactgegevens en uw wensen voor de dag door.",
      en: "The form on this page registers your company for a stand at the event. You provide your contact details and what you need for the day."
    }
  },
  {
    icon: FileText,
    title: { nl: "Wat er daarna gebeurt", en: "What happens next" },
    body: {
      nl: "Na uw aanmelding nemen wij contact op met de praktische informatie: standindeling, opbouwtijden, catering en de plattegrond.",
      en: "After you register we get in touch with the practical information: stand allocation, set-up times, catering and the floor plan."
    }
  }
];

const TEXT = {
  title: { nl: "Voor bedrijven", en: "For companies" },
  intro: {
    nl: "Wilt u met uw bedrijf deelnemen aan de T.I.S. Bedrijvendag op donderdag 26 november 2026? Meld u aan via het formulier op deze pagina.",
    en: "Would you like your company to take part in the T.I.S. Career Day on Thursday 26 November 2026? Register through the form on this page."
  },
  formKicker: { nl: "Aanmeldformulier", en: "Registration form" },
  formHeading: {
    nl: "Meld uw bedrijf aan",
    en: "Register your company"
  },
  formNote: {
    nl: "Vul het formulier in om uw deelname door te geven. Wij nemen daarna contact op over de praktische details.",
    en: "Fill in the form to register your participation. We will then get in touch about the practical details."
  },
  formHelp: {
    nl: "Werkt het ingesloten formulier niet? Gebruik de knop om het in een nieuw tabblad te openen.",
    en: "Embedded form not working? Use the button to open it in a new tab."
  },
  openForm: { nl: "Aanmeldformulier openen", en: "Open registration form" },
  mailUs: { nl: "Of mail ons direct", en: "Or email us directly" },
  formIframeTitle: {
    nl: "Aanmeldformulier bedrijven",
    en: "Company registration form"
  }
};

export default function CompanyRegistrationPage() {
  const { lang } = useLanguage();

  usePageMeta({
    title: `${pick(TEXT.title, lang)} | T.I.S. Bedrijvendag Delft`,
    description: pick(TEXT.intro, lang),
    canonicalPath: COMPANY_REGISTRATION.route
  });

  return (
    <PageLayout title={pick(TEXT.title, lang)} wide>
      <div className="text-slate-700 dark:text-slate-200">{pick(TEXT.intro, lang)}</div>

      <div className="grid gap-6 md:grid-cols-2">
        {CARDS.map((card, index) => (
          <div key={pick(card.title, "en")}>
            <Card
              variant="plain"
              icon={card.icon}
              title={pick(card.title, lang)}
              body={pick(card.body, lang)}
            />
          </div>
        ))}
      </div>

      <section className="border-t border-navy/15 pt-8 dark:border-white/15">
        <div className="text-small text-fg-muted dark:text-slate-400">
          {pick(TEXT.formKicker, lang)}
        </div>
        <h2 className="mt-3 text-title text-navy dark:text-white">
          {pick(TEXT.formHeading, lang)}
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-700 dark:text-slate-200">
          {pick(TEXT.formNote, lang)}
        </p>

        <div className="mt-6 overflow-hidden rounded-sm border border-rule bg-white dark:border-white/15 dark:bg-ink">
          <iframe
            title={pick(TEXT.formIframeTitle, lang)}
            src={COMPANY_REGISTRATION.formEmbedUrl}
            className="h-[780px] w-full"
            style={{ border: "none", maxWidth: "100%", maxHeight: "100vh" }}
            allowFullScreen
          />
        </div>

        <div className="mt-6">
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            {pick(TEXT.formHelp, lang)}
          </p>

          <div className="mt-4 flex flex-wrap gap-4">
            <Button
              href={COMPANY_REGISTRATION.formUrl}
              size="lg"
              iconRight={ArrowUpRight}
            >
              {pick(TEXT.openForm, lang)}
            </Button>

            <Button
              href={`mailto:${CONTACT.organisation}`}
              variant="outline"
              size="lg"
              icon={Mail}
            >
              {pick(TEXT.mailUs, lang)}
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
