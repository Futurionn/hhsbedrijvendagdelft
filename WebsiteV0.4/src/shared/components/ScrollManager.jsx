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
  // The address this page appeared with, and whether it has changed since.
  const arrivedAt = useRef(null);
  const hasMoved = useRef(false);

  useEffect(() => {
    // "Arriving" is judged by the address, not by counting runs: in
    // development React runs this effect twice on arrival, and a second,
    // smooth scroll to the top would undo a page's own jump (the company
    // list jumping to the company it was opened at).
    const address = pathname + hash;
    if (arrivedAt.current === null) arrivedAt.current = address;
    if (address !== arrivedAt.current) hasMoved.current = true;
    const behavior = hasMoved.current ? "smooth" : "instant";

    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior });
      return;
    }

    // Land just below the pinned header bar, measured (its drawn height
    // changes with the PC's 80% zoom and on phones).
    const scrollToHash = () => {
      const element = document.getElementById(hash.slice(1));
      if (!element) return false;
      const bar = document.querySelector("header")?.getBoundingClientRect().height ?? 72;
      const top = element.getBoundingClientRect().top + window.scrollY - bar - 16;
      window.scrollTo({ top: Math.max(0, top), left: 0, behavior });
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
