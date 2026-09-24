// ─────────────────────────────────────────────────────────────────────────────
//  FLOATING ORBS  —  the translucent bubbles in the hero.
//
//  Each bubble is lit from the top-left with a faint 1px rim (the `.bubble`
//  class in src/index.css) and drifts slowly between two positions. They sit
//  at the EDGES of the hero, most of them cropped by it, so they never form a
//  solid disc behind the headline or the text.
//
//  To change the look, edit the BUBBLES list:
//    size      CSS width/height (a clamp() scales with the window)
//    pos       where it sits: any of left / right / top / bottom
//    d         how long one drift takes; x / y how far it drifts
//
//  They stand still for visitors who ask for reduced motion (see the
//  prefers-reduced-motion block in src/index.css).
//
//  The parent element needs `relative overflow-hidden`.
// ─────────────────────────────────────────────────────────────────────────────

const BUBBLES = [
  { size: "clamp(320px, 44vw, 640px)", pos: { right: "-14%", top: "-18%" }, d: "26s", x: "-18px", y: "22px" },
  { size: "clamp(160px, 20vw, 300px)", pos: { left: "-7%", top: "44%" }, d: "21s", x: "14px", y: "-16px" },
  { size: "clamp(70px, 7vw, 112px)", pos: { left: "57%", top: "17%" }, d: "17s", x: "-10px", y: "14px" },
  { size: "36px", pos: { left: "49%", top: "9%" }, d: "13s" },
  { size: "clamp(220px, 30vw, 440px)", pos: { left: "38%", bottom: "-24%" }, d: "24s", x: "20px", y: "-10px" },
  { size: "22px", pos: { right: "30%", bottom: "26%" }, d: "11s", x: "-6px", y: "-12px" }
];

export default function FloatingOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden="true">
      {BUBBLES.map((bubble, index) => (
        <span
          key={index}
          className="bubble"
          style={{
            width: bubble.size,
            height: bubble.size,
            ...bubble.pos,
            "--d": bubble.d,
            ...(bubble.x ? { "--x": bubble.x } : {}),
            ...(bubble.y ? { "--y": bubble.y } : {})
          }}
        />
      ))}
    </div>
  );
}
