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
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/companies" element={<Companies />} />
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
