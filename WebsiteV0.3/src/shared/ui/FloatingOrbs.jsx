// ─────────────────────────────────────────────────────────────────────────────
//  FLOATING ORBS  —  the soft drifting circles in the hero background.
//
//  Purely decorative. To change the look, edit the ORBS list: `size` is in
//  pixels, `x`/`y` are CSS positions, `opacity` is how visible an orb is, and
//  `delay` staggers the animation so they do not all move in step.
//
//  They stop for anyone who asks for reduced motion — <MotionConfig
//  reducedMotion="user"> in src/shared/context/MotionProvider.jsx handles that
//  for every framer-motion element at once, so there is nothing to do here.
//
//  The parent element needs `relative overflow-hidden`.
// ─────────────────────────────────────────────────────────────────────────────
import { m } from "framer-motion";

const ORBS = [
  { size: 260, x: "10%", y: "20%", opacity: 0.09, delay: 0 },
  { size: 320, x: "65%", y: "15%", opacity: 0.08, delay: 0.2 },
  { size: 420, x: "35%", y: "55%", opacity: 0.07, delay: 0.4 },
  { size: 280, x: "85%", y: "60%", opacity: 0.08, delay: 0.1 },
  { size: 220, x: "5%", y: "70%", opacity: 0.07, delay: 0.3 }
];

export default function FloatingOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {ORBS.map((orb, index) => (
        <m.div
          key={index}
          className="absolute rounded-full bg-white"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            opacity: orb.opacity
          }}
          animate={{ y: [0, -18, 0], x: [0, 10, 0] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay
          }}
        />
      ))}
    </div>
  );
}
