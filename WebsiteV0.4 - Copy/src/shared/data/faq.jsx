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
import { VENUE } from "../../site.config.js";

const LINK_CLASS =
  "font-medium text-fg underline decoration-fg/35 underline-offset-4 transition-colors duration-settle hover:decoration-fg dark:text-white dark:decoration-white/40 dark:hover:decoration-white";

/**
 * An underlined link, for use inside answers.
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
  }
];
