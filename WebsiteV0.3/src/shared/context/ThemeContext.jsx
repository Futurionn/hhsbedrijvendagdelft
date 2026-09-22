// ─────────────────────────────────────────────────────────────────────────────
//  LIGHT / DARK MODE
//
//  Adding the class "dark" to <html> is what switches every `dark:` Tailwind
//  class on the page. That is the whole mechanism.
//
//  The choice is saved in localStorage, and index.html re-applies it before
//  React boots so the page never flashes white on a dark-mode reload.
// ─────────────────────────────────────────────────────────────────────────────
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "theme";
const DEFAULT_THEME = "light";

const ThemeContext = createContext(null);

/** Page background per theme — must match `body` in src/index.css. */
const THEME_COLOR = { light: "#ffffff", dark: "#020617" };

function applyTheme(theme) {
  if (typeof document === "undefined") return;

  document.documentElement.classList.toggle("dark", theme === "dark");

  // Colours the browser UI on mobile (the bar above and below the page).
  // Without this the address bar stays white over a dark page.
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", THEME_COLOR[theme] ?? THEME_COLOR.light);
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(DEFAULT_THEME);

  useEffect(() => {
    let stored = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      // Ignore: fall through to the default.
    }
    const initial = stored === "dark" ? "dark" : DEFAULT_THEME;
    setThemeState(initial);
    applyTheme(initial);
  }, []);

  const setTheme = useCallback((next) => {
    setThemeState(next);
    applyTheme(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore: the theme still works for this visit.
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme, isDark: theme === "dark" }),
    [theme, setTheme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
