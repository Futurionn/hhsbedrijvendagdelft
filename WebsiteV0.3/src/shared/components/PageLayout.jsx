// ─────────────────────────────────────────────────────────────────────────────
//  PAGE LAYOUT  —  the frame used by every page that is NOT a home page:
//  companies, floor plan, FAQ, privacy, terms, company registration.
//
//  It draws the navy header with the title, the wave underneath it, a centred
//  content column, and the footer. Your page only supplies the content:
//
//      <PageLayout title="FAQ">
//        <p>...</p>
//      </PageLayout>
//
//  Props:
//    title      the big heading in the navy header
//    edition    optional — makes the "back" link and footer point at that
//               edition instead of the active one
//    wide       true widens the content column from 3xl to 6xl, for pages
//               with cards or a map rather than paragraphs
// ─────────────────────────────────────────────────────────────────────────────
import Footer from "./Footer.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { STRINGS } from "../strings.js";
import { HERO_SURFACE, PAGE_SURFACE } from "../theme.js";
import SiteHeader from "./SiteHeader.jsx";
import Wave from "../ui/Wave.jsx";
import { getActiveEdition } from "../../editions/index.js";

export default function PageLayout({ title, edition, wide = false, children }) {
  const { lang } = useLanguage();
  const t = STRINGS[lang];

  const currentEdition = edition ?? getActiveEdition();

  return (
    <>
      <SiteHeader edition={currentEdition} />

      <main className={`min-h-screen ${PAGE_SURFACE}`}>
        <div className={`relative overflow-hidden ${HERO_SURFACE}`}>
          <div className="mx-auto max-w-6xl px-6 pb-16 pt-28 md:pt-32">
            <h1 className="text-title-sm text-white">{title}</h1>
          </div>

          <Wave size="short" />
        </div>

        <div className={`mx-auto ${wide ? "max-w-6xl" : "max-w-3xl"} px-6 py-12`}>
          <div className="space-y-6 text-slate-700 dark:text-slate-200">{children}</div>
        </div>

        <Footer edition={currentEdition} />
      </main>
    </>
  );
}
