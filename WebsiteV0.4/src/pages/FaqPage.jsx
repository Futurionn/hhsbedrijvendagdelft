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
import { FaqList } from "../shared/components/FaqSection.jsx";

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
      <p className="text-lead text-fg-muted dark:text-slate-400">{intro}</p>

      <FaqList />
    </PageLayout>
  );
}
