// ═════════════════════════════════════════════════════════════════════════════
//  FREQUENTLY ASKED QUESTIONS
//
//  ★ EDIT THE QUESTIONS AND ANSWERS HERE. ★
//
//  ─── TO ADD A QUESTION ──────────────────────────────────────────────────────
//  Copy one { } block and fill it in:
//
//      {
//        q: { nl: "Vraag?", en: "Question?" },
//        a: { nl: "Antwoord.", en: "Answer." }
//      },
//
//  ─── TO PUT A LINK IN AN ANSWER ─────────────────────────────────────────────
//  An answer can be JSX instead of a plain string, so it can contain links or
//  bold text. Wrap it in <> ... </> and use the `Link` helper below:
//
//      a: {
//        nl: <>Mail ons via <Link href="mailto:x@y.nl">x@y.nl</Link>.</>,
//        en: <>Email us at <Link href="mailto:x@y.nl">x@y.nl</Link>.</>
//      }
//
//  This file is .jsx (not .js) precisely because answers may contain markup.
// ═════════════════════════════════════════════════════════════════════════════
import { Link as RouterLink } from "react-router-dom";
import { CONTACT, CREDITS, VENUE } from "../../site.config.js";

const LINK_CLASS =
  "font-semibold text-orange-deep underline decoration-orange-deep/30 underline-offset-2 transition-colors duration-settle hover:decoration-orange-deep dark:text-orange dark:decoration-orange/40 dark:hover:decoration-orange";

/**
 * An orange link, for use inside answers.
 * A path starting with "/" stays inside the app (no full page reload);
 * anything else is treated as external and opens in a new tab.
 */
function Link({ href, children }) {
  if (href.startsWith("/")) {
    return (
      <RouterLink to={href} className={LINK_CLASS}>
        {children}
      </RouterLink>
    );
  }

  const isExternal = href.startsWith("http");
  return (
    <a
      className={LINK_CLASS}
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

export const FAQ_ITEMS = [
  {
    q: {
      nl: "Wat is de T.I.S. Bedrijvendag?",
      en: "What is the T.I.S. Career Day?"
    },
    a: {
      nl: "Een bedrijvendag waar je bedrijven en studieverenigingen ontmoet en meer leert over stages, traineeships en starterskansen.",
      en: "A career day where you meet companies and study associations and learn about internships and graduate opportunities."
    }
  },
  {
    q: { nl: "Waar vindt het event plaats?", en: "Where is the event hosted?" },
    a: {
      nl: `Op ${VENUE.nameNl} (${VENUE.address}).`,
      en: `At ${VENUE.nameEn} (${VENUE.address}).`
    }
  },
  {
    q: { nl: "Is aanmelden verplicht?", en: "Do I need to register?" },
    a: {
      nl: "Nee. Aanmelden is gratis en het event is open voor iedereen.",
      en: "No. Entry is free and the event is open to everyone."
    }
  },
  {
    q: { nl: "Moet ik een cv meenemen?", en: "Should I bring a CV?" },
    a: {
      nl: "Niet verplicht, maar wel handig als je direct met recruiters wilt praten.",
      en: "Not required, but useful if you want to talk directly with recruiters."
    }
  },
  {
    q: {
      nl: "Kan ik de vorige editie nog bekijken?",
      en: "Can I still see the previous edition?"
    },
    a: {
      nl: (
        <>
          Ja. De editie van maart 2026 blijft online, met alle deelnemende
          bedrijven en de plattegrond, via{" "}
          <Link href="/March2026">hhsbedrijvendagdelft.nl/March2026</Link>.
        </>
      ),
      en: (
        <>
          Yes. The March 2026 edition stays online, with every participating
          company and the floor plan, at{" "}
          <Link href="/March2026">hhsbedrijvendagdelft.nl/March2026</Link>.
        </>
      )
    }
  },
  {
    q: { nl: "Wie heeft deze website gemaakt?", en: "Who created this website?" },
    a: {
      nl: (
        <>
          Deze website is in {CREDITS.year} gemaakt door {CREDITS.authorName}, in de
          functie van {CREDITS.authorRole.nl}. Bekijk zijn profiel via{" "}
          <Link href={CREDITS.authorLinkedIn}>linkedin.com/in/mathis-g</Link>.
        </>
      ),
      en: (
        <>
          This website was created in {CREDITS.year} by {CREDITS.authorName}, in the
          role of {CREDITS.authorRole.en}. View the profile via{" "}
          <Link href={CREDITS.authorLinkedIn}>linkedin.com/in/mathis-g</Link>.
        </>
      )
    }
  },
  {
    q: {
      nl: "Logo/bedrijfsinfo toevoegen of aanpassen + feedback",
      en: "Add/update company info + feedback"
    },
    a: {
      nl: (
        <>
          Mail je logo (PNG/SVG), een korte beschrijving (2–4 zinnen), eventuele kansen
          (stage/traineeship/afstuderen), locatie en website-link naar{" "}
          <Link href={`mailto:${CONTACT.webmaster}`}>{CONTACT.webmaster}</Link>.
          <div className="mt-3">
            <span className="font-semibold">Logo-tip:</span> bij voorkeur een SVG of een
            PNG met transparante achtergrond. Zorg dat het logo scherp is (liefst
            minimaal ~600px breed) en zonder grote witte randen.
          </div>
          <div className="mt-3">
            <span className="font-semibold">Feedback/bugs:</span> stuur je feedback/bug
            (liefst met screenshot + wat je deed) naar{" "}
            <Link href={`mailto:${CONTACT.webmaster}`}>{CONTACT.webmaster}</Link>.
          </div>
        </>
      ),
      en: (
        <>
          Email your logo (PNG/SVG), a short description (2–4 sentences), opportunities
          (internship/traineeship/thesis), location and website link to{" "}
          <Link href={`mailto:${CONTACT.webmaster}`}>{CONTACT.webmaster}</Link>.
          <div className="mt-3">
            <span className="font-semibold">Logo tip:</span> preferably SVG, or a PNG
            with a transparent background. Make sure it is crisp (ideally at least
            ~600px wide) and without large white margins.
          </div>
          <div className="mt-3">
            <span className="font-semibold">Feedback/bugs:</span> send your feedback/bug
            (ideally with a screenshot + steps to reproduce) to{" "}
            <Link href={`mailto:${CONTACT.webmaster}`}>{CONTACT.webmaster}</Link>.
          </div>
        </>
      )
    }
  }
];
