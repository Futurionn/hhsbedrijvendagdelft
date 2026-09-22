// ─────────────────────────────────────────────────────────────────────────────
//  LANGUAGE (NL / EN)
//
//  `lang` is always the string "nl" or "en".
//  Any component can read it with:   const { lang } = useLanguage();
//
//  Dutch is the default because most visitors are Dutch-speaking students.
//  The choice is remembered in the browser so it survives a page reload.
// ─────────────────────────────────────────────────────────────────────────────
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "tis-career-day-lang";
const DEFAULT_LANG = "nl";

/** The two languages the site ships. Adding a third means adding it here AND
 *  adding the matching keys to src/shared/strings.js and every edition config. */
export const LANGUAGES = ["nl", "en"];

const LanguageContext = createContext(null);

function readStoredLang() {
  if (typeof window === "undefined") return DEFAULT_LANG;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return LANGUAGES.includes(stored) ? stored : DEFAULT_LANG;
  } catch {
    // Private browsing can throw on localStorage access.
    return DEFAULT_LANG;
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(DEFAULT_LANG);

  // Read the saved choice after mount, so the server/first paint is predictable.
  useEffect(() => {
    setLangState(readStoredLang());
  }, []);

  const setLang = useCallback((next) => {
    if (!LANGUAGES.includes(next)) return;
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore: the language still works for this visit.
    }
  }, []);

  /** Flip to the other language. Used by the NL/EN button in the hero. */
  const toggleLang = useCallback(() => {
    setLang(lang === "nl" ? "en" : "nl");
  }, [lang, setLang]);

  // Keep <html lang="..."> correct for screen readers and search engines.
  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(
    () => ({ lang, setLang, toggleLang }),
    [lang, setLang, toggleLang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}
