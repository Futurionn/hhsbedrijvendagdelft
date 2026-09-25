// ─────────────────────────────────────────────────────────────────────────────
//  STARFIELD  —  the twinkling dots behind the dark bottom band.
//
//  Positions come from a seeded pseudo-random sequence rather than
//  Math.random(), so the stars land in the SAME place on every render and
//  every visit. With Math.random() they would jump whenever React re-rendered.
//
//  The twinkle itself is the `.star` class in src/index.css; each star gets
//  its own size, brightness, speed and phase through CSS variables. They stop
//  for visitors who ask for reduced motion.
//
//  Turn the density up or down with STAR_COUNT.
//  The parent element needs `relative overflow-hidden`.
// ─────────────────────────────────────────────────────────────────────────────

const STAR_COUNT = 160;

/** The reference's generator: a Park–Miller sequence seeded with 7. */
function makeStars() {
  let seed = 7;
  const next = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

  return Array.from({ length: STAR_COUNT }, (_, id) => {
    const roll = next();
    const size = roll > 0.93 ? 3 : roll > 0.7 ? 2 : 1.5;
    return {
      id,
      left: `${(next() * 100).toFixed(2)}%`,
      top: `${(next() * 100).toFixed(2)}%`,
      size: `${size}px`,
      glow: size >= 2 ? "10px" : "5px",
      opacity: (0.4 + next() * 0.5).toFixed(2),
      duration: `${(2.2 + next() * 3.6).toFixed(1)}s`,
      delay: `${(-next() * 6).toFixed(1)}s`
    };
  });
}

const STARS = makeStars();

export default function Starfield() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="star-drift">
        {STARS.map((star) => (
          <span
            key={star.id}
            className="star"
            style={{
              left: star.left,
              top: star.top,
              "--s": star.size,
              "--g": star.glow,
              "--o": star.opacity,
              "--d": star.duration,
              "--dl": star.delay
            }}
          />
        ))}
      </div>
    </div>
  );
}
