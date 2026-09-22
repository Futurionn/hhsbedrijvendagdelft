// ─────────────────────────────────────────────────────────────────────────────
//  STARFIELD  —  the twinkling dots behind the study-associations strip.
//
//  Positions come from a seeded pseudo-random function rather than
//  Math.random(), so the stars land in the SAME place on every render. With
//  Math.random() they would jump around whenever React re-rendered.
//
//  Turn the density up or down with STAR_COUNT.
//  The parent element needs `relative overflow-hidden`.
// ─────────────────────────────────────────────────────────────────────────────
import { m } from "framer-motion";

const STAR_COUNT = 120;

/** Deterministic 0..1 value for a given seed (mulberry32-style hash). */
function seededRandom(seed) {
  let t = seed + 0x6d2b79f5;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

const STARS = Array.from({ length: STAR_COUNT }, (_, i) => {
  const left = seededRandom(i * 11.7);
  const top = seededRandom(i * 19.3);
  const sizeSeed = seededRandom(i * 29.1);
  const brightnessSeed = seededRandom(i * 41.9);

  const size = sizeSeed > 0.97 ? 3 : sizeSeed > 0.86 ? 2 : 1;
  const opacity = 0.35 + brightnessSeed * 0.45;

  return {
    id: i,
    left: `${left * 100}%`,
    top: `${top * 100}%`,
    size,
    opacity,
    twinkleDuration: 2.2 + sizeSeed * 3.6,
    twinkleDelay: top * 2.5,
    glow:
      size >= 2
        ? "drop-shadow(0 0 10px rgba(255,255,255,0.55))"
        : "drop-shadow(0 0 6px rgba(255,255,255,0.25))"
  };
});

export default function Starfield() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Outer layer drifts the whole field slowly; inner spans twinkle. */}
      <m.div
        className="absolute inset-0"
        animate={{ x: [-20, 30, -20], y: [15, -20, 10] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {STARS.map((star) => (
          <m.span
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              filter: star.glow
            }}
            initial={{ opacity: star.opacity }}
            animate={{
              opacity: [star.opacity * 0.35, star.opacity * 1.25, star.opacity * 0.35]
            }}
            transition={{
              duration: star.twinkleDuration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: star.twinkleDelay
            }}
          />
        ))}
      </m.div>
    </div>
  );
}
