// ─────────────────────────────────────────────────────────────────────────────
//  PAGE TRANSITION  —  a soft cross-fade between pages.
//
//  Without it, clicking "FAQ" swaps the whole screen in one frame and jumps
//  to the top: it feels like a hard cut. Now the old page fades out quickly,
//  the scroll position resets while nothing is visible, and the new page
//  fades in.
//
//      old page  ──fade out 0.18s──▶  (scroll to top)  ──fade in 0.35s──▶  new page
//
//  Only a change of PATH counts as a new page. A jump to a section on the same
//  page (/#about) does not fade; it just scrolls.
//
//  Opacity only, never a slide: every page contains the fixed header, and a
//  transform on an ancestor would unpin it for the length of the animation.
//  The sections' own "rise into view" (REVEAL) still gives the new page
//  its motion.
//
//  With "reduce motion" on, Framer keeps the fades (they do not move
//  anything) — see MotionProvider.jsx.
// ─────────────────────────────────────────────────────────────────────────────
import { AnimatePresence, m } from "framer-motion";
import { Routes, useLocation } from "react-router-dom";
import ScrollManager from "./ScrollManager.jsx";

const EASE = [0.2, 0.7, 0.2, 1]; // the site's --ease

export default function PageTransition({ children }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <m.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.35, ease: EASE } }}
        exit={{ opacity: 0, transition: { duration: 0.18, ease: "easeIn" } }}
      >
        {/* Both get the location explicitly, so the page that is fading out
            keeps showing (and scrolling) the OLD address until it is gone. */}
        <ScrollManager location={location} />
        <Routes location={location}>{children}</Routes>
      </m.div>
    </AnimatePresence>
  );
}
