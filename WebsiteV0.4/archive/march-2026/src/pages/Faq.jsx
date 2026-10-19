import LegalLayout from "./LegalLayout.jsx";
import { useLanguage } from "../shared/LanguageContext.jsx";

function Item({ q, a }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 dark:border-white/10 dark:bg-white/5">
      <div className="font-extrabold text-navy dark:text-white">{q}</div>
      <div className="mt-2 text-gray-700 dark:text-gray-200">{a}</div>
    </div>
  );
}

export default function Faq() {
  const { lang } = useLanguage();
  const title = lang === "nl" ? "FAQ" : "FAQ";

  const items =
    lang === "nl"
      ? [
          {
            q: "Wat is de T.I.S. Bedrijvendag?",
            a: "Een bedrijvendag waar je bedrijven en studieverenigingen ontmoet en meer leert over stages, traineeships en starterskansen."
          },
          {
            q: "Waar vindt het event plaats?",
            a: "Op HHS Delft (Rotterdamseweg 137, 2628 AL Delft)."
          },
          {
            q: "Is aanmelden verplicht?",
            a: "Nee. Aanmelden is gratis en het event is open voor iedereen."
          },
          {
            q: "Moet ik een cv meenemen?",
            a: "Niet verplicht, maar wel handig als je direct met recruiters wilt praten."
          },
          {
            q: "Logo/bedrijfsinfo toevoegen of aanpassen + feedback",
            a: (
              <>
                Mail je logo (PNG/SVG), een korte beschrijving (2–4 zinnen),
                eventuele kansen (stage/traineeship/afstuderen), locatie en
                website-link naar{" "}
                <a className="font-semibold text-orange" href="mailto:voorzitter@rheonline.nl">
                  voorzitter@rheonline.nl
                </a>
                .
                <div className="mt-3">
                  <span className="font-semibold">Logo-tip:</span> bij voorkeur een SVG of een PNG met transparante achtergrond. Zorg dat het logo scherp is (liefst minimaal ~600px breed) en zonder grote witte randen.
                </div>
                <div className="mt-3">
                  <span className="font-semibold">Feedback/bugs:</span> stuur je feedback/bug (liefst met screenshot + wat je deed) naar{" "}
                  <a className="font-semibold text-orange" href="mailto:voorzitter@rheonline.nl">
                    voorzitter@rheonline.nl
                  </a>
                  .
                </div>
              </>
            )
          }
        ]
      : [
          {
            q: "What is the T.I.S. Career Day?",
            a: "A career day where you meet companies and study associations and learn about internships and graduate opportunities."
          },
          {
            q: "Where is the event hosted?",
            a: "At THUAS Delft (Rotterdamseweg 137, 2628 AL Delft)."
          },
          {
            q: "Do I need to register?",
            a: "No. Entry is free and the event is open to everyone."
          },
          {
            q: "Should I bring a CV?",
            a: "Not required, but useful if you want to talk directly with recruiters."
          },
          {
            q: "Add/update company info + feedback",
            a: (
              <>
                Email your logo (PNG/SVG), a short description (2–4 sentences),
                opportunities (internship/traineeship/thesis), location and
                website link to{" "}
                <a className="font-semibold text-orange" href="mailto:voorzitter@rheonline.nl">
                  voorzitter@rheonline.nl
                </a>
                .
                <div className="mt-3">
                  <span className="font-semibold">Logo tip:</span> preferably SVG, or a PNG with a transparent background. Make sure it’s crisp (ideally at least ~600px wide) and without large white margins.
                </div>
                <div className="mt-3">
                  <span className="font-semibold">Feedback/bugs:</span> send your feedback/bug (ideally with a screenshot + steps to reproduce) to{" "}
                  <a className="font-semibold text-orange" href="mailto:voorzitter@rheonline.nl">
                    voorzitter@rheonline.nl
                  </a>
                  .
                </div>
              </>
            )
          }
        ];

  return (
    <LegalLayout title={title}>
      <div className="text-gray-700 dark:text-gray-200">
        {lang === "nl"
          ? "De meestgestelde vragen over de T.I.S. Bedrijvendag."
          : "Frequently asked questions about the T.I.S. Career Day."}
      </div>
      {items.map((it) => (
        <Item key={it.q} q={it.q} a={it.a} />
      ))}
    </LegalLayout>
  );
}
