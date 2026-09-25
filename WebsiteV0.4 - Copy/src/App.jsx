// ═════════════════════════════════════════════════════════════════════════════
//  APP  —  THE ROUTE TABLE
//
//  This file answers one question: which web address shows which page?
//  It is the best place to start if you are new to this codebase.
//
//  ─── THE ADDRESSES ──────────────────────────────────────────────────────────
//
//    /                           the active edition's home page
//                                (which edition that is: src/site.config.js)
//
//    /November2026               November 2026 home        ← the live edition
//    /November2026/bedrijven     its company list
//    /November2026/plattegrond   its floor plan
//
//    /March2026                  March 2026 home           ← frozen archive
//    /March2026/bedrijven        its company list
//    /March2026/plattegrond      its floor plan
//
//    /voor-bedrijven             company registration form
//    /faq                        frequently asked questions
//    /privacy                    privacy policy
//    /terms                      terms of use
//
//    /companies, /plattegrond    old addresses from before editions had their
//                                own URLs. They redirect, so links that were
//                                shared in the past keep working.
//
//    anything else               redirects to /
//
//  ─── HOW EDITION ROUTES ARE BUILT ───────────────────────────────────────────
//  They are NOT typed out one by one. The list below is generated from
//  src/editions/index.js, so registering a new edition there automatically
//  gives it all three of its addresses.
//
//  ─── THE PROVIDER STACK ─────────────────────────────────────────────────────
//  The nested wrappers below give every component access to shared state:
//      ThemeProvider     light/dark mode
//      LanguageProvider  NL/EN
//      MotionProvider    the animation engine
//      BrowserRouter     the URL
//  Order matters only in that everything must sit inside all of them.
// ═════════════════════════════════════════════════════════════════════════════
import { BrowserRouter, Navigate, Route } from "react-router-dom";

import { LanguageProvider } from "./shared/context/LanguageContext.jsx";
import { ThemeProvider } from "./shared/context/ThemeContext.jsx";
import MotionProvider from "./shared/context/MotionProvider.jsx";
import PageTransition from "./shared/components/PageTransition.jsx";

import CompaniesPage from "./pages/CompaniesPage.jsx";
import CompanyRegistrationPage from "./pages/CompanyRegistrationPage.jsx";
import FaqPage from "./pages/FaqPage.jsx";
import FloorPlanPage from "./pages/FloorPlanPage.jsx";
import PrivacyPage from "./pages/PrivacyPage.jsx";
import TermsPage from "./pages/TermsPage.jsx";

import {
  EDITIONS,
  SUBPAGE,
  editionPath,
  getActiveEdition,
  getLegacyEdition
} from "./editions/index.js";

import { COMPANY_REGISTRATION } from "./site.config.js";

export default function App() {
  const activeEdition = getActiveEdition();
  const legacyEdition = getLegacyEdition();

  return (
    <ThemeProvider>
      <LanguageProvider>
        <MotionProvider>
          <BrowserRouter>
            {/* <PageTransition> is <Routes> plus a soft fade between pages. */}
            <PageTransition>
              {/* The bare domain shows the active edition. */}
              <Route
                path="/"
                element={<activeEdition.Home edition={activeEdition} />}
              />

              {/* Three routes per edition, generated from the registry. */}
              {EDITIONS.map((edition) => (
                <Route key={edition.id} path={editionPath(edition)}>
                  <Route index element={<edition.Home edition={edition} />} />
                  <Route
                    path={SUBPAGE.companies}
                    element={<CompaniesPage edition={edition} />}
                  />
                  <Route
                    path={SUBPAGE.floorPlan}
                    element={<FloorPlanPage edition={edition} />}
                  />
                </Route>
              ))}

              {/* Pages that belong to the site rather than to one edition. */}
              <Route path={COMPANY_REGISTRATION.route} element={<CompanyRegistrationPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />

              {/* Old addresses. `replace` keeps them out of the back button. */}
              <Route
                path="/companies"
                element={
                  <Navigate to={editionPath(legacyEdition, SUBPAGE.companies)} replace />
                }
              />
              <Route
                path="/plattegrond"
                element={
                  <Navigate to={editionPath(legacyEdition, SUBPAGE.floorPlan)} replace />
                }
              />

              {/* Anything unrecognised goes home rather than showing nothing. */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </PageTransition>
          </BrowserRouter>
        </MotionProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
