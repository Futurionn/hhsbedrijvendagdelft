import LegalLayout from "./LegalLayout.jsx";
import { useLanguage } from "../shared/LanguageContext.jsx";

function Section({ title, children }) {
  return (
    <section className="rounded-2xl border border-gray-100 bg-gray-50 p-6 dark:border-white/10 dark:bg-white/5">
      <h2 className="font-extrabold text-navy dark:text-white">{title}</h2>
      <div className="mt-3 space-y-3 text-gray-700 dark:text-gray-200">{children}</div>
    </section>
  );
}

export default function Terms() {
  const { lang } = useLanguage();
  const title = lang === "nl" ? "Gebruiksvoorwaarden" : "Terms of Use";

  return (
    <LegalLayout title={title}>
      <p className="text-gray-700 dark:text-gray-200">
        {lang === "nl"
          ? "Door deze website te gebruiken, stemt u in met deze gebruiksvoorwaarden. Deze tekst is bedoeld om bezoekers in praktische zin te informeren over het gebruik van de website."
          : "By using this website, you agree to these terms of use. This text is intended to provide visitors with practical information about the use of the website."}
      </p>

      <Section title={lang === "nl" ? "1. Informatief karakter" : "1. Informational nature"}>
        <p>
          {lang === "nl"
            ? "Deze website is bedoeld om informatie te verstrekken over de T.I.S. Bedrijvendag, deelnemende bedrijven, verenigingen, locatie en aanverwante communicatie. De inhoud heeft een informatief karakter en kan op ieder moment worden aangepast."
            : "This website is intended to provide information about the T.I.S. Career Day, participating companies, associations, the location, and related communication. The content is informational in nature and may be changed at any time."}
        </p>
      </Section>

      <Section title={lang === "nl" ? "2. Geen garantie op volledigheid of actualiteit" : "2. No guarantee of completeness or timeliness"}>
        <p>
          {lang === "nl"
            ? "Hoewel de informatie op deze website met zorg wordt samengesteld, kunnen data, tijden, deelnemers, locaties, links en andere inhoud wijzigen. Aan de inhoud van deze website kunnen geen rechten worden ontleend."
            : "Although the information on this website is prepared with care, dates, times, participants, locations, links, and other content may change. No rights can be derived from the content of this website."}
        </p>
      </Section>

      <Section title={lang === "nl" ? "3. Formulieren en communicatie" : "3. Forms and communication"}>
        <p>
          {lang === "nl"
            ? "Wanneer u via deze website een formulier gebruikt of contactgegevens verstrekt, doet u dit vrijwillig. Het verzenden van een formulier betekent niet automatisch dat deelname of samenwerking definitief is bevestigd."
            : "When you use a form or provide contact details through this website, you do so voluntarily. Submitting a form does not automatically mean that participation or cooperation has been definitively confirmed."}
        </p>
      </Section>

      <Section title={lang === "nl" ? "4. Externe diensten en websites" : "4. External services and websites"}>
        <p>
          {lang === "nl"
            ? "Deze website bevat links naar en embedded inhoud van externe partijen, zoals Microsoft Forms, Google Maps en socialmediaplatformen. Het gebruik van deze diensten valt onder de voorwaarden van de betreffende externe partij."
            : "This website contains links to and embedded content from external parties, such as Microsoft Forms, Google Maps, and social media platforms. The use of those services is subject to the terms of the relevant external party."}
        </p>
      </Section>

      <Section title={lang === "nl" ? "5. Toegestaan gebruik" : "5. Permitted use"}>
        <p>
          {lang === "nl"
            ? "U dient deze website uitsluitend op een rechtmatige en zorgvuldige wijze te gebruiken. Het is niet toegestaan de website opzettelijk te verstoren, te misbruiken of te gebruiken voor handelingen die schade kunnen veroorzaken."
            : "You must use this website only in a lawful and careful manner. It is not permitted to intentionally disrupt, misuse, or use the website for activities that may cause harm."}
        </p>
      </Section>

      <Section title={lang === "nl" ? "6. Intellectueel eigendom" : "6. Intellectual property"}>
        <p>
          {lang === "nl"
            ? "Voor zover van toepassing blijven teksten, afbeeldingen, logo's en andere inhoud eigendom van de betreffende rechthebbenden. Gebruik, verspreiding of overname daarvan is niet toegestaan zonder voorafgaande toestemming, tenzij dit wettelijk is toegestaan."
            : "Where applicable, texts, images, logos, and other content remain the property of their respective rights holders. Use, distribution, or reproduction is not permitted without prior permission, unless legally permitted."}
        </p>
      </Section>

      <Section title={lang === "nl" ? "7. Wijzigingen" : "7. Changes"}>
        <p>
          {lang === "nl"
            ? "Wij kunnen deze gebruiksvoorwaarden van tijd tot tijd aanpassen wanneer de website of de aanverwante dienstverlening verandert. De meest recente versie staat steeds op deze pagina."
            : "We may update these terms of use from time to time when the website or the related services change. The most recent version will always be available on this page."}
        </p>
      </Section>
    </LegalLayout>
  );
}
