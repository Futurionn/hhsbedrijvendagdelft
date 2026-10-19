// ─────────────────────────────────────────────────────────────────────────────
//  ARCHIVE REDIRECT  —  hands an address over to a separately built old site.
//
//  The March 2026 edition is not drawn by this app: /March2026 is the old
//  V0.2 site, built from archive/march-2026 into its own folder (see that
//  folder's vite.config.js). When a link inside this app leads there, React
//  Router would otherwise draw it here, so this does a full page load of the
//  same address instead and the server answers it from the archive folder.
//
//  If the server sends this app back for that address (the archive was not
//  uploaded), loading it again would loop forever; the timestamp below stops
//  that after one try.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const LOOP_KEY = "archive-redirect";

export default function ArchiveRedirect() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    const target = pathname + search + hash;
    let last = null;
    try {
      last = JSON.parse(sessionStorage.getItem(LOOP_KEY) ?? "null");
    } catch {
      /* Private browsing can block sessionStorage; just go. */
    }
    if (last && last.target === target && Date.now() - last.at < 5000) {
      console.error(`The archive at ${target} is missing on the server: upload dist/March2026.`);
      return;
    }
    try {
      sessionStorage.setItem(LOOP_KEY, JSON.stringify({ target, at: Date.now() }));
    } catch {
      /* see above */
    }
    window.location.replace(target);
  }, [pathname, search, hash]);

  return null;
}
