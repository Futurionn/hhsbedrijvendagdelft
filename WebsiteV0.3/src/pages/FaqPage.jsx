// ─────────────────────────────────────────────────────────────────────────────
//  FAQ PAGE  —  lives at /faq
//
//  This file only draws the boxes. The questions and answers are in
//      src/shared/data/faq.jsx
//  Edit them there.
// ─────────────────────────────────────────────────────────────────────────────
import PageLayout from "../shared/components/PageLayout.jsx";
import { useLanguage } from "../shared/context/LanguageContext.jsx";
import { usePageMeta } from "../shared/hooks/usePageMeta.js";
import { pick } from "../shared/i18n.js";
import { FAQ_ITEMS } from "../shared/data/faq.jsx";

function FaqItem({ question, answer }) {
  return (
    <div className="rounded-2xl border border-navy/[0.07] bg-navy/[0.02] p-6 dark:border-white/10 dark:bg-white/5">
      <h2 className="text-heading text-navy dark:text-white">{question}</h2>
      <div className="mt-2 text-body text-slate-600 dark:text-slate-300">{answer}</div>
    </div>
  );
}

export default function FaqPage() {
  const { lang } = useLanguage();

  const intro =
    lang === "nl"
      ? "De meestgestelde vragen over de T.I.S. Bedrijvendag."
      : "Frequently asked questions about the T.I.S. Career Day.";

  usePageMeta({
    title: "FAQ | T.I.S. Bedrijvendag Delft",
    description: intro,
    canonicalPath: "/faq"
  });

  return (
    <PageLayout title="FAQ">
      <div className="text-lead text-slate-600 dark:text-slate-300">{intro}</div>

      {FAQ_ITEMS.map((item) => (
        <FaqItem
          key={pick(item.q, "en")}
          question={pick(item.q, lang)}
          answer={pick(item.a, lang)}
        />
      ))}
    </PageLayout>
  );
}
