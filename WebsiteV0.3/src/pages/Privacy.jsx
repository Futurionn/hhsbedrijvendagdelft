import LegalLayout from "./LegalLayout.jsx";
import { useLanguage } from "../shared/LanguageContext.jsx";
import {
  COMPANY_REGISTRATION_EMAIL,
  COMPANY_REGISTRATION_FORM_HREF
} from "../shared/companyRegistration.js";

function Section({ title, children }) {
  return (
    <section className="rounded-2xl border border-gray-100 bg-gray-50 p-6 dark:border-white/10 dark:bg-white/5">
      <h2 className="font-extrabold text-navy dark:text-white">{title}</h2>
      <div className="mt-3 space-y-3 text-gray-700 dark:text-gray-200">{children}</div>
    </section>
  );
}

export default function Privacy() {
  const { lang } = useLanguage();
  const title = lang === "nl" ? "Privacybeleid" : "Privacy Policy";
  const updatedAt = "13 april 2026";

  return (
    <LegalLayout title={title}>
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange">
        {lang === "nl" ? `Laatst bijgewerkt: ${updatedAt}` : `Last updated: April 13, 2026`}
      </p>

      <p className="text-gray-700 dark:text-gray-200">
        {lang === "nl"
          ? "In dit privacybeleid lichten wij toe welke persoonsgegevens via deze website kunnen worden verwerkt, voor welke doeleinden dit gebeurt en hoe daarmee wordt omgegaan."
          : "This privacy policy explains which personal data may be processed through this website, for which purposes this happens, and how such data is handled."}
      </p>

      <Section title={lang === "nl" ? "1. Wie wij zijn" : "1. Who we are"}>
        <p>
          {lang === "nl"
            ? "Deze website ondersteunt de T.I.S. Bedrijvendag in Delft. Voor vragen over deze website of over persoonsgegevens die via deze website worden gedeeld, kunt u contact opnemen via "
            : "This website supports the T.I.S. Career Day in Delft. For questions about this website or about personal data shared through it, you can contact us via "}
          <a
            href={`mailto:${COMPANY_REGISTRATION_EMAIL}`}
            className="font-semibold text-navy transition-all duration-300 hover:text-orange dark:text-white dark:hover:text-orange"
          >
            {COMPANY_REGISTRATION_EMAIL}
          </a>
          .
        </p>
      </Section>

      <Section title={lang === "nl" ? "2. Welke gegevens kunnen worden verwerkt" : "2. What data may be processed"}>
        <p>
          {lang === "nl"
            ? "De website heeft in hoofdzaak een informatief karakter. Wanneer u gebruikmaakt van het bedrijvenformulier, kunt u vrijwillig bedrijfs- en contactgegevens verstrekken, zoals bedrijfsnaam, naam van de contactpersoon, e-mailadres, telefoonnummer en eventuele aanvullende opmerkingen."
            : "The website is primarily informational. When you use the company interest form, you may voluntarily provide company and contact details such as the company name, contact person, email address, phone number, and any additional notes."}
        </p>
      </Section>

      <Section title={lang === "nl" ? "3. Rechtsgrond" : "3. Legal basis"}>
        <p>
          {lang === "nl"
            ? "Voor zover via het bedrijvenformulier persoonsgegevens worden verstrekt, verwerken wij deze gegevens omdat u deze zelf vrijwillig aan ons doorgeeft met het doel om contact te onderhouden over mogelijke deelname aan de T.I.S. Bedrijvendag. Afhankelijk van de context kan deze verwerking berusten op toestemming of op een gerechtvaardigd belang bij het organiseren en opvolgen van de communicatie rondom het evenement."
            : "To the extent personal data is provided through the company form, we process that data because you voluntarily submit it to us for the purpose of maintaining contact about possible participation in the T.I.S. Career Day. Depending on the context, this processing may be based on consent or on a legitimate interest in organising and following up communication around the event."}
        </p>
      </Section>

      <Section title={lang === "nl" ? "4. Microsoft Forms" : "4. Microsoft Forms"}>
        <p>
          {lang === "nl"
            ? "Het interesseformulier voor bedrijven wordt aangeboden via Microsoft Forms. Wanneer u dit formulier invult, worden de door u ingevoerde gegevens verwerkt via Microsoft. Voor dit onderdeel zijn daarom tevens de voorwaarden en het privacybeleid van Microsoft van toepassing."
            : "The company interest form is provided through Microsoft Forms. When you complete this form, the information you submit is processed through Microsoft. Microsoft's own terms and privacy policy therefore also apply to that part of the process."}
        </p>
        <p>
          <a
            href={COMPANY_REGISTRATION_FORM_HREF}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-navy transition-all duration-300 hover:text-orange dark:text-white dark:hover:text-orange"
          >
            {lang === "nl" ? "Open het formulier" : "Open the form"}
          </a>
        </p>
      </Section>

      <Section title={lang === "nl" ? "5. Doel van de verwerking" : "5. Purpose of processing"}>
        <p>
          {lang === "nl"
            ? "Gegevens die via het bedrijvenformulier worden gedeeld, worden uitsluitend gebruikt om contact te onderhouden over interesse in deelname aan de T.I.S. Bedrijvendag, om nadere informatie te verstrekken en om praktische communicatie mogelijk te maken."
            : "Information shared through the company form is used only to maintain contact about interest in participating in the T.I.S. Career Day, to provide follow-up information, and to facilitate practical communication."}
        </p>
      </Section>

      <Section title={lang === "nl" ? "6. Beveiliging" : "6. Security"}>
        <p>
          {lang === "nl"
            ? "Wij nemen passende organisatorische en technische maatregelen om persoonsgegevens die via deze website of via gekoppelde formulieren worden gedeeld zoveel mogelijk te beschermen tegen verlies, misbruik of onbevoegde toegang. Daarbij merken wij op dat geen enkele vorm van gegevensoverdracht of digitale opslag volledige zekerheid kan bieden."
            : "We take appropriate organisational and technical measures to protect personal data shared through this website or through linked forms against loss, misuse, or unauthorised access as far as reasonably possible. At the same time, no method of transmission or digital storage can offer complete security."}
        </p>
      </Section>

      <Section title={lang === "nl" ? "7. Externe links en embedded inhoud" : "7. External links and embedded content"}>
        <p>
          {lang === "nl"
            ? "Deze website bevat links naar externe websites en kan externe inhoud tonen, zoals Microsoft Forms, Google Maps en socialmediapagina's. Wanneer u daarop klikt of van die diensten gebruikmaakt, kunnen deze partijen zelfstandig persoonsgegevens verwerken. Daarvoor gelden hun eigen privacyvoorwaarden."
            : "This website contains links to external websites and may display embedded content, such as Microsoft Forms, Google Maps, and social media pages. When you click those links or use those services, those parties may process data independently. Their own privacy terms apply in those cases."}
        </p>
      </Section>

      <Section title={lang === "nl" ? "8. Bewaartermijn" : "8. Retention"}>
        <p>
          {lang === "nl"
            ? "Gegevens die via het interesseformulier worden ontvangen, worden niet langer bewaard dan redelijkerwijs noodzakelijk is voor communicatie over de bedrijvendag en de opvolging daarvan."
            : "Information received through the interest form will not be kept longer than reasonably necessary for communication about the career day and the related follow-up."}
        </p>
      </Section>

      <Section title={lang === "nl" ? "9. Uw rechten" : "9. Your rights"}>
        <p>
          {lang === "nl"
            ? "Indien op uw situatie van toepassing, kunt u verzoeken om inzage in uw persoonsgegevens, correctie van onjuiste gegevens, verwijdering van gegevens, beperking van de verwerking of bezwaar tegen het gebruik van uw gegevens. U kunt hiervoor contact opnemen via "
            : "Where applicable to your situation, you may request access to your personal data, correction of inaccurate data, deletion of data, restriction of processing, or object to the use of your data. You can contact us for this via "}
          <a
            href={`mailto:${COMPANY_REGISTRATION_EMAIL}`}
            className="font-semibold text-navy transition-all duration-300 hover:text-orange dark:text-white dark:hover:text-orange"
          >
            {COMPANY_REGISTRATION_EMAIL}
          </a>
          .
        </p>
      </Section>

      <Section title={lang === "nl" ? "10. Cookies en toekomstige uitbreidingen" : "10. Cookies and future additions"}>
        <p>
          {lang === "nl"
            ? "Op dit moment is deze website in hoofdzaak informatief. Indien later cookies, statistieken, analytics of andere aanvullende functionaliteiten worden toegevoegd, kan dit privacybeleid daarop worden aangepast."
            : "At this time, this website is mainly informational. If cookies, statistics, analytics, or other additional features are introduced later, this privacy policy may be updated accordingly."}
        </p>
      </Section>

      <Section title={lang === "nl" ? "11. Wijzigingen" : "11. Changes"}>
        <p>
          {lang === "nl"
            ? "Wij kunnen dit privacybeleid van tijd tot tijd aanpassen, bijvoorbeeld wanneer de website of de wijze waarop formulieren en communicatie worden gebruikt verandert. De meest recente versie wordt steeds op deze pagina gepubliceerd."
            : "We may update this privacy policy from time to time, for example when the website changes or when the way forms and communication are used changes. The most recent version will always be published on this page."}
        </p>
      </Section>
    </LegalLayout>
  );
}
