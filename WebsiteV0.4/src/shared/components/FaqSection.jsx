// ─────────────────────────────────────────────────────────────────────────────
//  FAQ  —  the questions as <details> rows separated by hairlines, each with
//  a + that turns into a − when it opens.
//
//    <FaqList />        just the rows, ALL questions; the /faq page uses this
//    <FaqSection />     the FAQ on the home page: rail, heading, rows,
//                       minus the questions marked `homePage: false`
//
//  The questions and answers live in src/shared/data/faq.jsx.
//  The heading text is in src/shared/strings.js (keys starting "faq").
//  The row styling (marker, +/− icon) is `.faq` in src/index.css.
// ─────────────────────────────────────────────────────────────────────────────
import { useLanguage } from "../context/LanguageContext.jsx";
import { pick } from "../i18n.js";
import { STRINGS } from "../strings.js";
import { FAQ_ITEMS } from "../data/faq.jsx";
import { Container, GRID, SectionMain, SectionRail } from "../ui/Section.jsx";

export function FaqList({ homePage = false }) {
  const { lang } = useLanguage();
  const items = homePage ? FAQ_ITEMS.filter((item) => item.homePage !== false) : FAQ_ITEMS;

  return (
    <div className="faq border-t border-rule-strong dark:border-white/70">
      {items.map((item) => (
        <details key={pick(item.q, "en")} className="border-b border-rule dark:border-white/15">
          <summary className="grid min-h-[76px] cursor-pointer grid-cols-[1fr_2rem] items-center gap-4 py-6 text-heading font-normal text-fg transition-colors duration-settle hover:text-navy dark:text-white dark:hover:text-slate-300">
            {pick(item.q, lang)}
            <i className="faq-icon" aria-hidden="true" />
          </summary>
          <div className="-mt-1 max-w-[60ch] pb-8 text-body text-fg-muted dark:text-slate-400">
            {pick(item.a, lang)}
          </div>
        </details>
      ))}
    </div>
  );
}

export default function FaqSection({ number }) {
  const { lang } = useLanguage();
  const t = STRINGS[lang];

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="scroll-mt-6 bg-white pb-section dark:bg-ink"
    >
      <Container className={GRID}>
        <SectionRail number={number}>{t.faqRail}</SectionRail>

        <SectionMain>
          <h2 id="faq-title" className="pb-after text-title text-fg dark:text-white">
            {t.faqTitle}
          </h2>
          <FaqList homePage />
        </SectionMain>
      </Container>
    </section>
  );
}
