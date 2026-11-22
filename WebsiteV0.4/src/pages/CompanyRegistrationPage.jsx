// ─────────────────────────────────────────────────────────────────────────────
//  FOR COMPANIES PAGE  —  lives at /voor-bedrijven
//
//  The page that sells the career day to companies. Top to bottom:
//
//      1. registration   CLOSED: "mail us to get on the mailing list"
//                        OPEN:   the practical facts and the Microsoft Form
//      2. benefits       what a company gets out of taking part
//      3. history        the editions so far, each with its number of companies
//
//  Open or closed is ONE switch:  COMPANY_REGISTRATION.open  in
//  src/site.config.js. The form address is in the same place.
//
//  Every word on the page is in  src/shared/data/forCompanies.js
// ─────────────────────────────────────────────────────────────────────────────
import { ArrowUpRight, Mail } from "lucide-react";
import PageLayout from "../shared/components/PageLayout.jsx";
import Button from "../shared/ui/Button.jsx";
import Card from "../shared/ui/Card.jsx";
import { useLanguage } from "../shared/context/LanguageContext.jsx";
import { usePageMeta } from "../shared/hooks/usePageMeta.js";
import { pick } from "../shared/i18n.js";
import { FOR_COMPANIES as content } from "../shared/data/forCompanies.js";
import { COMPANY_REGISTRATION, CONTACT } from "../site.config.js";
import { editionPath, getEditionById } from "../editions/index.js";

const MUTED = "text-fg-muted dark:text-on-dark-2";
const KICKER = "text-small font-medium text-orange-deep dark:text-orange";
const SECTION = "border-t border-rule pt-10 dark:border-rule-dark";

/** A section's small orange word, its heading and an optional paragraph. */
function SectionIntro({ kicker, heading, intro }) {
  return (
    <div>
      <p className={KICKER}>{kicker}</p>
      <h2 className="mt-2 text-title text-fg dark:text-white">{heading}</h2>
      {intro ? <p className={`mt-4 max-w-[60ch] text-body ${MUTED}`}>{intro}</p> : null}
    </div>
  );
}

/** Registration closed: the mailing-list block with the one orange button. */
function ClosedNotice({ lang }) {
  const text = content.closed;
  const mailto = `mailto:${CONTACT.organisation}?subject=${encodeURIComponent(
    pick(text.mailSubject, lang)
  )}`;

  return (
    <section data-registration="closed" className="max-w-[62ch] border-l-2 border-orange pl-6">
      <h2 className="text-heading text-fg dark:text-white">{pick(text.heading, lang)}</h2>
      <p className="mt-2 text-body text-fg dark:text-slate-200">{pick(text.body, lang)}</p>
      <p className={`mt-2 text-body ${MUTED}`}>{pick(text.nextEdition, lang)}</p>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Button href={mailto} size="lg" icon={Mail}>
          {pick(text.mailButton, lang)}
        </Button>
        <Button
          href={`mailto:${CONTACT.organisation}`}
          variant="link"
          className="text-fg dark:text-white"
        >
          {CONTACT.organisation}
        </Button>
      </div>
    </section>
  );
}

/** Registration open: the practical facts and the embedded form. */
function OpenRegistration({ lang }) {
  const text = content.open;

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        {text.facts.map((fact) => (
          <Card
            key={pick(fact.title, "en")}
            icon={fact.icon}
            title={pick(fact.title, lang)}
            body={pick(fact.body, lang)}
          />
        ))}
      </div>

      <section data-registration="open" className={SECTION}>
        <SectionIntro
          kicker={pick(text.formKicker, lang)}
          heading={pick(text.formHeading, lang)}
          intro={pick(text.formNote, lang)}
        />

        <div className="mt-6 overflow-hidden rounded-sm border border-rule bg-white dark:border-rule-dark dark:bg-ink">
          <iframe
            title={pick(text.formIframeTitle, lang)}
            src={COMPANY_REGISTRATION.formEmbedUrl}
            className="h-[780px] max-h-screen w-full max-w-full border-0"
            allowFullScreen
          />
        </div>

        <p className={`mt-6 text-body ${MUTED}`}>{pick(text.formHelp, lang)}</p>
        <div className="mt-4 flex flex-wrap gap-4">
          <Button href={COMPANY_REGISTRATION.formUrl} size="lg" iconRight={ArrowUpRight}>
            {pick(text.openForm, lang)}
          </Button>
          <Button href={`mailto:${CONTACT.organisation}`} variant="outline" size="lg" icon={Mail}>
            {pick(text.mailUs, lang)}
          </Button>
        </div>
      </section>
    </>
  );
}

/** One earlier edition: its number of companies, its date, and where to see it. */
function EditionRecord({ record, lang }) {
  const edition = getEditionById(record.editionId);
  if (!edition) return null;
  // The number the edition itself published, or else its list counted.
  const stat = edition.content.statValue ?? String(edition.companies.length);

  return (
    <article
      data-edition-record={record.editionId}
      className="border-t border-rule-strong pt-5 dark:border-white/70"
    >
      <h3 className={KICKER}>{pick(record.name, lang)}</h3>

      <p className="mt-3 flex items-baseline gap-3">
        <span className="text-numeral tabular-nums text-fg dark:text-white">{stat}</span>
        <span className={`text-small ${MUTED}`}>{pick(content.history.statLabel, lang)}</span>
      </p>

      <p className="mt-4 text-fact text-fg dark:text-white">{pick(record.date, lang)}</p>
      <p className={`text-small ${MUTED}`}>{pick(record.hours, lang)}</p>
      <p className={`mt-3 max-w-[52ch] text-body ${MUTED}`}>{pick(record.body, lang)}</p>

      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
        {record.links.map((link) => (
          <Button
            key={link.subpage}
            to={editionPath(edition, link.subpage)}
            variant="link"
            className="text-fg dark:text-white"
          >
            {pick(link.label, lang)}
          </Button>
        ))}
      </div>
    </article>
  );
}

export default function CompanyRegistrationPage() {
  const { lang } = useLanguage();
  const isOpen = COMPANY_REGISTRATION.open;
  const intro = pick(isOpen ? content.open.intro : content.closed.intro, lang);
  const { benefits, history } = content;

  usePageMeta({
    title: `${pick(content.title, lang)} | T.I.S. Bedrijvendag Delft`,
    description: intro,
    canonicalPath: COMPANY_REGISTRATION.route
  });

  return (
    <PageLayout title={pick(content.title, lang)} wide>
      <p className="max-w-[46ch] text-lead text-fg dark:text-white">{intro}</p>

      {isOpen ? <OpenRegistration lang={lang} /> : <ClosedNotice lang={lang} />}

      {/* -- What a company gets -- */}
      <section className={`!mt-14 ${SECTION}`}>
        <SectionIntro
          kicker={pick(benefits.kicker, lang)}
          heading={pick(benefits.heading, lang)}
          intro={pick(benefits.intro, lang)}
        />

        <div className="mt-10 grid gap-x-grid gap-y-8 tab:grid-cols-2 lg:grid-cols-3">
          {benefits.items.map((item) => (
            <Card
              key={pick(item.title, "en")}
              icon={item.icon}
              title={pick(item.title, lang)}
              body={pick(item.body, lang)}
            />
          ))}
        </div>

        <p className={`mt-8 max-w-[70ch] text-small ${MUTED}`}>{pick(benefits.note, lang)}</p>
      </section>

      {/* -- The editions so far -- */}
      <section className={`!mt-14 ${SECTION}`}>
        <SectionIntro
          kicker={pick(history.kicker, lang)}
          heading={pick(history.heading, lang)}
          intro={pick(history.intro, lang)}
        />

        <div className="mt-10 grid gap-x-grid gap-y-10 tab:grid-cols-2">
          {history.editions.map((record) => (
            <EditionRecord key={record.editionId} record={record} lang={lang} />
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
