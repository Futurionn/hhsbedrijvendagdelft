// ─────────────────────────────────────────────────────────────────────────────
//  WAVE  —  the curved white shape that separates a navy header from the
//  white page below it.
//
//  It must be painted in the colour of the section UNDERNEATH it, otherwise
//  a hard line appears. `waveFillForTheme()` handles the light/dark flip.
//
//  The parent element needs `relative overflow-hidden`.
//
//  It sits one pixel BELOW the bottom edge on purpose. Section heights are
//  rarely whole pixels, so at some zoom levels the browser rounds the navy
//  block and the white block below it in opposite directions and leaves a
//  hairline between them. Overlapping by 1px removes the seam at every zoom.
// ─────────────────────────────────────────────────────────────────────────────
import { useTheme } from "../context/ThemeContext.jsx";
import { waveFillForTheme } from "../theme.js";

/** `size="tall"` for heroes (120px), `size="short"` for page headers (90px). */
export default function Wave({ size = "tall" }) {
  const { theme } = useTheme();
  const fill = waveFillForTheme(theme);

  const isTall = size === "tall";
  const viewBox = isTall ? "0 0 1440 120" : "0 0 1440 90";
  const path = isTall
    ? "M0,64 C240,120 480,120 720,80 C960,40 1200,40 1440,64 L1440,120 L0,120 Z"
    : "M0,48 C240,90 480,90 720,58 C960,26 1200,26 1440,48 L1440,90 L0,90 Z";

  return (
    <svg
      className="pointer-events-none absolute -bottom-px left-0 w-full"
      viewBox={viewBox}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d={path} fill={fill} />
    </svg>
  );
}
