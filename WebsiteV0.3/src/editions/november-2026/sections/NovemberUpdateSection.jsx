// ─────────────────────────────────────────────────────────────────────────────
//  NOVEMBER UPDATE SECTION  —  the placeholder that stands in for the company
//  list while the participants are still being confirmed.
//
//  It disappears on its own: as soon as `showCompanies` is true in
//  edition.config.js AND data/companies.js has entries, NovemberHome swaps
//  this section out for the real scrolling company logos.
//
//  All the wording — the heading and the three cards — comes from
//  ../edition.config.js, under the keys beginning with `update`.
// ─────────────────────────────────────────────────────────────────────────────
import { useLanguage } from "../../../shared/context/LanguageContext.jsx";
import { pick } from "../../../shared/i18n.js";
import { COMPANY_REGISTRATION } from "../../../site.config.js";
import Button from "../../../shared/ui/Button.jsx";
import Card from "../../../shared/ui/Card.jsx";
import SectionHeading from "../../../shared/ui/SectionHeading.jsx";
import { NOVEMBER_2026_CONTENT as content } from "../edition.config.js";

export default function NovemberUpdateSection() {
  const { lang } = useLanguage();

  return (
    <section id="november-update" className="scroll-mt-6 bg-white pb-12 pt-16 dark:bg-ink md:pb-14 md:pt-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          kicker={pick(content.updateKicker, lang)}
          title={pick(content.updateTitle, lang)}
          subtitle={pick(content.updateSubtitle, lang)}
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {content.updateCards.map((card, index) => (
            <div key={pick(card.title, lang)}>
              <Card
                variant="plain"
                icon={card.icon}
                title={pick(card.title, lang)}
                body={pick(card.body, lang)}
              />
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button to={COMPANY_REGISTRATION.route}>{pick(content.updateCta, lang)}</Button>
        </div>
      </div>
    </section>
  );
}
