// ─────────────────────────────────────────────────────────────────────────────
//  SMOOTH-SCROLL TO A SECTION ON THE SAME PAGE
//
//  Every <section> that you want to jump to needs an `id`:
//
//      <section id="companies"> ... </section>
//
//  Then any button can scroll to it:
//
//      const scrollToSection = useScrollToSection();
//      <Button onClick={() => scrollToSection("companies")}>Bekijk bedrijven</Button>
//
//  The optional second argument nudges the landing position in pixels —
//  a negative number stops a bit higher, positive a bit lower.
// ─────────────────────────────────────────────────────────────────────────────
import { useCallback } from "react";

export function useScrollToSection() {
  return useCallback((sectionId, offset = 0) => {
    if (typeof window === "undefined") return;

    const element = document.getElementById(sectionId);
    if (!element) return;

    // Put the section in the address bar so the link is shareable / bookmarkable.
    window.history?.replaceState?.(null, "", `#${sectionId}`);

    const target = Math.max(
      0,
      element.getBoundingClientRect().top + window.scrollY + offset
    );

    // If we are already within a couple of pixels, the browser skips the
    // animation entirely. Nudging first makes the scroll always feel responsive.
    if (Math.abs(window.scrollY - target) < 2) {
      window.scrollTo({ top: target + 2, behavior: "auto" });
    }

    window.scrollTo({ top: target, behavior: "smooth" });
  }, []);
}
