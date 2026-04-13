import { m } from "framer-motion";
import { ArrowUpRight, BriefcaseBusiness, CalendarDays, FileText, Mail, MapPin } from "lucide-react";
import LegalLayout from "./LegalLayout.jsx";
import { useLanguage } from "../shared/LanguageContext.jsx";
import {
  COMPANY_REGISTRATION_EMAIL,
  COMPANY_REGISTRATION_FORM_EMBED_HREF,
  COMPANY_REGISTRATION_FORM_HREF
} from "../shared/companyRegistration.js";

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

function InfoCard({ icon: Icon, title, body }) {
  return (
    <div className="rounded-3xl border border-gray-100 bg-gray-50 p-6 dark:border-white/10 dark:bg-white/5">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange/10">
        <Icon className="h-6 w-6 text-orange" />
      </div>
      <h3 className="mt-5 text-xl font-extrabold text-navy dark:text-white">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{body}</p>
    </div>
  );
}

export default function CompanyRegistration() {
  const { lang } = useLanguage();

  const title = lang === "nl" ? "Voor bedrijven" : "For companies";
  const intro =
    lang === "nl"
      ? "Wilt u als bedrijf op de hoogte blijven van de T.I.S. Bedrijvendag in november 2026? Laat uw gegevens achter via het formulier, dan nemen we u mee in de mailinglijst en verdere informatie."
      : "Would you like to stay informed as a company about the T.I.S. Career Day in November 2026? Leave your details through the form and we will include you in the mailing list and further updates.";
  const note =
    lang === "nl"
      ? "Vul het formulier in om uw interesse door te geven. De definitieve deelname en praktische details volgen later."
      : "Fill in the form to share your interest. Final participation and practical details will follow later.";
  const formButtonLabel =
    lang === "nl" ? "Open interesseformulier" : "Open interest form";
  const mailButtonLabel =
    lang === "nl" ? "Of mail ons direct" : "Or email us directly";
  const formHelpText =
    lang === "nl"
      ? "Embedded not working? Klik op de link om het formulier los te openen."
      : "Embedded not working? Click the link to open the form separately.";

  const cards =
    lang === "nl"
      ? [
          {
            icon: CalendarDays,
            title: "Editie",
            body: "De volgende editie staat gepland voor november 2026. De exacte datum en tijd volgen nog."
          },
          {
            icon: MapPin,
            title: "Locatie",
            body: "Voorlopig is de locatie opnieuw HHS Delft, Rotterdamseweg 137, 2628 AL Delft."
          },
          {
            icon: BriefcaseBusiness,
            title: "Interesselijst",
            body: "Deze pagina is bedoeld voor bedrijven die interesse hebben in deelname, zichtbaarheid op de bedrijvendag en contact met studenten. Via het formulier bouwen we eerst een gedeelde contactlijst op."
          },
          {
            icon: FileText,
            title: "Vervolg",
            body: "Na uw aanmelding nemen we contact op zodra er meer bekend is over de datum, deelnamevorm en praktische informatie voor bedrijven."
          }
        ]
      : [
          {
            icon: CalendarDays,
            title: "Edition",
            body: "The next edition is planned for November 2026. The exact date and timing will follow later."
          },
          {
            icon: MapPin,
            title: "Location",
            body: "The provisional location is again THUAS Delft, Rotterdamseweg 137, 2628 AL Delft."
          },
          {
            icon: BriefcaseBusiness,
            title: "Interest list",
            body: "This page is intended for companies interested in participating, gaining visibility at the event, and connecting with students. The form helps us build a shared contact list first."
          },
          {
            icon: FileText,
            title: "Next steps",
            body: "After your submission, we will get in touch once more is confirmed about the date, participation format, and practical information for companies."
          }
        ];

  return (
    <LegalLayout title={title}>
      <div className="text-gray-700 dark:text-gray-200">{intro}</div>

      <div className="grid gap-6 md:grid-cols-2">
        {cards.map((card, index) => (
          <m.div
            key={card.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
          >
            <InfoCard {...card} />
          </m.div>
        ))}
      </div>

      <m.section
        {...reveal}
        className="overflow-hidden rounded-3xl border border-orange/20 bg-gradient-to-br from-orange/10 via-white to-gray-50 p-8 dark:from-orange/10 dark:via-white/5 dark:to-slate-900"
      >
        <div className="text-sm font-semibold uppercase tracking-[0.24em] text-orange">
          {lang === "nl" ? "Interesseformulier" : "Interest form"}
        </div>
        <h2 className="mt-3 text-3xl font-extrabold text-navy dark:text-white">
          {lang === "nl" ? "Formulier direct invullen" : "Fill in the form directly"}
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-700 dark:text-gray-200">
          {note}
        </p>

        <div className="mt-6 overflow-hidden rounded-3xl border border-orange/20 bg-white dark:border-white/10 dark:bg-slate-950">
          <iframe
            title={lang === "nl" ? "Microsoft interesseformulier" : "Microsoft interest form"}
            src={COMPANY_REGISTRATION_FORM_EMBED_HREF}
            className="h-[780px] w-full"
            style={{ border: "none", maxWidth: "100%", maxHeight: "100vh" }}
            allowFullScreen
          />
        </div>

        <div className="mt-6">
          <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-200">
            {formHelpText}
          </p>

          <div className="mt-4 flex flex-wrap gap-4">
            <a
              href={COMPANY_REGISTRATION_FORM_HREF}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#f07c00]/25 transition-all duration-500 hover:scale-105"
            >
              {formButtonLabel}
              <ArrowUpRight className="h-4 w-4" />
            </a>

            <a
              href={`mailto:${COMPANY_REGISTRATION_EMAIL}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-orange/30 bg-white px-6 py-3 text-sm font-semibold text-navy transition-all duration-500 hover:scale-105 hover:bg-orange/5 dark:bg-white/5 dark:text-white"
            >
              <Mail className="h-4 w-4 text-orange" />
              {mailButtonLabel}
            </a>
          </div>
        </div>
      </m.section>

    </LegalLayout>
  );
}
