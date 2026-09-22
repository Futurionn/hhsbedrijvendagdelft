// ─────────────────────────────────────────────────────────────────────────────
//  "IS THIS A PHONE / TABLET?"
//
//  Several components behave differently without a mouse: cards expand on tap
//  instead of hover, and the company marquee becomes swipeable.
//
//  This checks for a *coarse pointer* rather than screen width, which is the
//  reliable signal — a small laptop window still has a mouse.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useState } from "react";

const TOUCH_QUERY = "(hover: none), (pointer: coarse)";

export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;

    const mediaQuery = window.matchMedia(TOUCH_QUERY);
    const update = () => setIsTouch(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return isTouch;
}
