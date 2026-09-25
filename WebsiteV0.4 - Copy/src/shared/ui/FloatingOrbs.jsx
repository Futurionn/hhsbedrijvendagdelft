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
//    wide      true = tablets and up only, where it would otherwise sit
//              behind the text on a phone
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
  { size: "22px", pos: { right: "30%", bottom: "26%" }, d: "11s", x: "-6px", y: "-12px" },
  // The smaller ones scattered around the edges.
  { size: "clamp(90px, 10vw, 150px)", pos: { right: "6%", bottom: "12%" }, d: "19s", x: "12px", y: "-18px" },
  { size: "clamp(48px, 5vw, 76px)", pos: { left: "8%", top: "14%" }, d: "15s", x: "10px", y: "16px" },
  { size: "28px", pos: { left: "24%", top: "30%" }, d: "12s", x: "-8px", y: "-14px", wide: true },
  { size: "clamp(60px, 6vw, 96px)", pos: { right: "22%", top: "38%" }, d: "18s", x: "-14px", y: "10px", wide: true },
  { size: "18px", pos: { left: "33%", bottom: "18%" }, d: "10s", x: "8px", y: "-10px", wide: true },
  { size: "clamp(120px, 14vw, 210px)", pos: { left: "-4%", bottom: "-10%" }, d: "23s", x: "16px", y: "-12px", wide: true },
  { size: "14px", pos: { right: "12%", top: "22%" }, d: "9s", x: "-6px", y: "8px" },
  { size: "40px", pos: { left: "70%", bottom: "8%" }, d: "14s", x: "10px", y: "-14px" }
];

export default function FloatingOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden="true">
      {BUBBLES.map((bubble, index) => (
        <span
          key={index}
          className={`bubble ${bubble.wide ? "hidden tab:block" : ""}`}
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
