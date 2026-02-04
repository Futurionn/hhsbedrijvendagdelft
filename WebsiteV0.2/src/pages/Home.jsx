import HeroSection from "../components/career-day/HeroSection.jsx";
import CompaniesGrid from "../components/career-day/CompaniesGrid.jsx";
import EventInfo from "../components/career-day/EventInfo.jsx";
import AssociationsSection from "../components/career-day/AssociationsSection.jsx";
import Footer from "../components/career-day/Footer.jsx";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900 dark:bg-slate-950 dark:text-gray-100">
      <HeroSection />
      <CompaniesGrid />
      <EventInfo />
      <AssociationsSection />
      <Footer />
    </main>
  );
}
