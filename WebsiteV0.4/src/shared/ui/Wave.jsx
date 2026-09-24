// ─────────────────────────────────────────────────────────────────────────────
//  WAVE  —  the curved edges between navy and the white page.
//
//    <Wave />              bottom of a hero: navy above, the page below.
//                          Two layers: a faint white swell, then the page
//                          colour in front of it.
//    <Wave size="short" /> the smaller version under inner-page headers.
//    <Wave edge="top" />   top of the dark bottom band: the page colour
//                          curving down into navy.
//
//  The page-coloured layer must match the section it meets, otherwise a hard
//  line appears. `waveFillForTheme()` handles the light/dark flip.
//
//  The bottom wave sits one pixel BELOW the edge on purpose: section heights
//  are rarely whole pixels, and overlapping by 1px hides the hairline seam
//  the browser would otherwise leave at some zoom levels.
// ─────────────────────────────────────────────────────────────────────────────
import { useTheme } from "../context/ThemeContext.jsx";
import { waveFillForTheme } from "../theme.js";

export default function Wave({ size = "tall", edge = "bottom" }) {
  const { theme } = useTheme();
  const fill = waveFillForTheme(theme);

  if (edge === "top") {
    return (
      <svg
        className="pointer-events-none relative z-[1] block h-wave w-full"
        viewBox="0 0 1440 128"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path fill={fill} d="M0 0H1440V90C1330 104 1160 98 940 60 620 6 280 20 0 96Z" />
      </svg>
    );
  }

  if (size === "short") {
    return (
      <svg
        className="pointer-events-none absolute -bottom-px left-0 w-full"
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path fill={fill} d="M0,48 C240,90 480,90 720,58 C960,26 1200,26 1440,48 L1440,90 L0,90 Z" />
      </svg>
    );
  }

  return (
    <svg
      className="pointer-events-none absolute -bottom-px left-0 right-0 z-[3] block h-wave w-full"
      viewBox="0 0 1440 128"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path fill="#fff" fillOpacity=".08" d="M0 44C300 118 640 124 980 56 1180 16 1340 10 1440 26V128H0Z" />
      <path data-page-fill fill={fill} d="M0 30C330 116 700 122 1070 48 1250 12 1370 12 1440 22V128H0Z" />
    </svg>
  );
}
