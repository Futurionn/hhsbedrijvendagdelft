// ─────────────────────────────────────────────────────────────────────────────
//  SCROLL MANAGER
//
//  In a single-page app the browser never really "loads a new page", so it
//  does not reset the scroll position by itself. Without this, clicking a link
//  at the bottom of a long page would drop you at the bottom of the next one.
//
//  Rules:
//    plain link  (/faq)          -> jump to the top
//    anchor link (/#companies)   -> scroll to that section
//
//  Anchor links get two retries, because the target section may not exist yet
//  on the first paint — images and animated sections settle a moment later.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const RETRY_DELAY_MS = 250;

export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    const scrollToHash = () => {
      const element = document.getElementById(hash.slice(1));
      if (!element) return false;
      element.scrollIntoView({ behavior: "auto", block: "start" });
      return true;
    };

    if (scrollToHash()) return;

    const frame = window.requestAnimationFrame(scrollToHash);
    const timer = window.setTimeout(scrollToHash, RETRY_DELAY_MS);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [pathname, hash]);

  return null;
}
