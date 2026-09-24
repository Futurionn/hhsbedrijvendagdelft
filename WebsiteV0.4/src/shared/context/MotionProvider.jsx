// ─────────────────────────────────────────────────────────────────────────────
//  ANIMATION ENGINE
//
//  Framer Motion ships two flavours of its component:
//    <motion.div>  pulls in the whole library
//    <m.div>       is tiny, but only works inside a <LazyMotion> wrapper
//
//  This wrapper is that <LazyMotion>. It sits near the top of App.jsx so every
//  component below it can use the lightweight `m` import and the bundle stays
//  small. Always import { m } from "framer-motion" — never { motion }.
//
//  <MotionConfig reducedMotion="user"> makes Framer drop transform and layout
//  animations for anyone whose system asks for reduced motion, while keeping
//  opacity fades. That covers every animated component at once, so individual
//  components never have to check the setting themselves.
// ─────────────────────────────────────────────────────────────────────────────
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";

export default function MotionProvider({ children }) {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

// ─── THE HOUSE SPRING ────────────────────────────────────────────────────────
//  A spring rather than a fixed-duration curve, because a spring animates from
//  wherever the element currently is. If something re-triggers mid-flight the
//  motion stays continuous instead of jumping back to the start.
//
//  `bounce: 0` is critically damped: it settles without overshooting. Overshoot
//  is reserved for motion the user physically caused — a flick or a drag —
//  where a little bounce reads as momentum. On content that simply appears,
//  bounce reads as decoration.
const SPRING = { type: "spring", bounce: 0, duration: 0.5 };

/**
 * The standard "rise into view" animation.
 * Spread it onto any framer-motion element:
 *
 *     <m.div {...REVEAL}>...</m.div>
 *
 * The offset is small on purpose. A 30px slide on every section is the kind of
 * thing that reads as a template; 12px reads as the page settling.
 */
export const REVEAL = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: SPRING
};
