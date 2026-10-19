import { LanguageProvider } from "./shared/LanguageContext.jsx";
import { ThemeProvider } from "./shared/ThemeContext.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Companies from "./pages/Companies.jsx";
import Faq from "./pages/Faq.jsx";
import MapPage from "./pages/Map.jsx";
import Privacy from "./pages/Privacy.jsx";
import Terms from "./pages/Terms.jsx";
import MotionProvider from "./shared/MotionProvider.jsx";

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <MotionProvider>
          {/* Archive: the site now lives under /March2026/ (see vite.config.js). */}
          <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/companies" element={<Companies />} />
              {/* Archive: the address the March list had on the V0.3/V0.4 site. */}
              <Route path="/bedrijven" element={<Companies />} />
              <Route path="/bedrijven/:companyId" element={<Companies />} />
              <Route path="*" element={<Home />} />
              <Route path="/plattegrond" element={<MapPage />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
            </Routes>
          </BrowserRouter>
        </MotionProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
