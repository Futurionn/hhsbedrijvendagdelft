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
//  It lives INSIDE the page that fades in (see PageTransition.jsx), so it runs
//  when the new page appears — after the old one has faded out, never while
//  it is still on screen. That first jump is instant: the page is invisible
//  at that moment, so there is nothing to watch. A later anchor link on the
//  same page scrolls smoothly instead.
//
//  Anchor links get two retries, because the target section may not exist yet
//  on the first paint — images and animated sections settle a moment later.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useRef } from "react";

const RETRY_DELAY_MS = 250;

export default function ScrollManager({ location }) {
  const { pathname, hash } = location;
  const isFirstRun = useRef(true);

  useEffect(() => {
    const behavior = isFirstRun.current ? "instant" : "smooth";
    isFirstRun.current = false;

    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior });
      return;
    }

    const scrollToHash = () => {
      const element = document.getElementById(hash.slice(1));
      if (!element) return false;
      element.scrollIntoView({ behavior, block: "start" });
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
