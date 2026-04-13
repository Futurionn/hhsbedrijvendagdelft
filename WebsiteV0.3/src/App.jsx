import { LanguageProvider } from "./shared/LanguageContext.jsx";
import { ThemeProvider } from "./shared/ThemeContext.jsx";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Companies from "./pages/Companies.jsx";
import Faq from "./pages/Faq.jsx";
import MapPage from "./pages/Map.jsx";
import Privacy from "./pages/Privacy.jsx";
import Terms from "./pages/Terms.jsx";
import MotionProvider from "./shared/MotionProvider.jsx";
import { EditionProvider } from "./shared/EditionContext.jsx";
import CompanyRegistration from "./pages/CompanyRegistration.jsx";
import { useEffect } from "react";

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    const id = hash.slice(1);
    const scrollToHash = () => {
      const element = document.getElementById(id);
      if (!element) return false;
      element.scrollIntoView({ behavior: "auto", block: "start" });
      return true;
    };

    if (scrollToHash()) return;

    const frame = window.requestAnimationFrame(scrollToHash);
    const timer = window.setTimeout(scrollToHash, 250);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <EditionProvider>
      <ThemeProvider>
        <LanguageProvider>
          <MotionProvider>
            <BrowserRouter>
              <ScrollManager />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/companies" element={<Companies />} />
                <Route path="/voor-bedrijven" element={<CompanyRegistration />} />
                <Route path="/plattegrond" element={<MapPage />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
              </Routes>
            </BrowserRouter>
          </MotionProvider>
        </LanguageProvider>
      </ThemeProvider>
    </EditionProvider>
  );
}
