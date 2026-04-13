import HeroSection from "../components/career-day/HeroSection.jsx";
import CompaniesGrid from "../components/career-day/CompaniesGrid.jsx";
import EventInfo from "../components/career-day/EventInfo.jsx";
import AssociationsSection from "../components/career-day/AssociationsSection.jsx";
import Footer from "../components/career-day/Footer.jsx";
import EditionSelector from "../components/career-day/EditionSelector.jsx";
import NovemberHeroSection from "../components/career-day/NovemberHeroSection.jsx";
import NovemberCompaniesSection from "../components/career-day/NovemberCompaniesSection.jsx";
import NovemberEventInfo from "../components/career-day/NovemberEventInfo.jsx";
import { EDITIONS, useEdition } from "../shared/EditionContext.jsx";

function MarchEditionHome() {
  return (
    <>
      <HeroSection />
      <CompaniesGrid />
      <EventInfo />
      <AssociationsSection />
      <Footer showCta />
    </>
  );
}

function NovemberEditionHome() {
  return (
    <>
      <NovemberHeroSection />
      <NovemberCompaniesSection />
      <NovemberEventInfo />
      <AssociationsSection />
      <Footer showCta />
    </>
  );
}

export default function Home() {
  const { edition } = useEdition();

  return (
    <main className="relative min-h-screen bg-white text-gray-900 dark:bg-slate-950 dark:text-gray-100">
      <EditionSelector />
      {edition === EDITIONS.MARCH_2026 ? <MarchEditionHome /> : <NovemberEditionHome />}
    </main>
  );
}
