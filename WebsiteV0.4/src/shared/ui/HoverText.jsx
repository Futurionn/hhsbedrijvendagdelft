// ─────────────────────────────────────────────────────────────────────────────
//  HOVER TEXT  —  the huge outlined date at the top of the footer.
//
//  Three copies of the same SVG text are stacked:
//    1. a faint white outline, always there;
//    2. the outline "drawing itself" once, when it scrolls into view;
//    3. an orange → white gradient outline, visible only inside a soft
//       circle that follows the mouse (or finger) — the hover glow.
//  A dot in the text (the "." before the year) is filled orange.
//
//  The viewBox is measured from the text itself, so the word always fills
//  the width it is given exactly, and is cropped to the height of the
//  digits so there is no empty band above or below.
//
//  Purely decorative: screen readers skip it. Reduced-motion visitors get
//  the outline without the drawing animation.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";

export default function HoverText({ text, className = "" }) {
  const svgRef = useRef(null);
  const textRef = useRef(null);
  const [box, setBox] = useState({ x: 0, y: 0, width: 300, height: 100 });
  const [focus, setFocus] = useState(null); // { x, y } as 0–1 of the svg, or null
  const [drawn, setDrawn] = useState(false);

  // useId() gives ":r1:"; colons are not safe inside url(#...).
  const uid = useId().replace(/:/g, "");
  const ids = { grad: `ht-grad-${uid}`, glow: `ht-glow-${uid}`, mask: `ht-mask-${uid}` };

  // Fit the viewBox to the text once the font is in.
  useLayoutEffect(() => {
    const fit = () => {
      const b = textRef.current?.getBBox();
      // Width from the text itself; height cropped to the digits/capitals
      // (Rubik's cap height is 0.7 of the 100-unit font size) instead of the
      // full line box, which would add a band of empty space above and below.
      if (b && b.width > 0) setBox({ x: b.x - 1, y: -72, width: b.width + 2, height: 74 });
    };
    fit();
    document.fonts?.ready.then(fit);
  }, [text]);

  // Draw the outline the first time it comes on screen.
  useEffect(() => {
    const el = svgRef.current;
    if (!el || !("IntersectionObserver" in window)) {
      setDrawn(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onMove = (event) => {
    const rect = svgRef.current.getBoundingClientRect();
    setFocus({
      x: (event.clientX - rect.left) / rect.width,
      y: (event.clientY - rect.top) / rect.height
    });
  };

  // "26.11.26" -> 26.11 + an orange "." + 26
  const cut = text.lastIndexOf(".");
  const content = (dotFill) =>
    cut > 0 ? (
      <>
        {text.slice(0, cut)}
        <tspan fill={dotFill}>.</tspan>
        {text.slice(cut + 1)}
      </>
    ) : (
      text
    );

  const shared = {
    x: 0,
    y: 0,
    className: "hover-text-glyphs",
    fill: "transparent",
    // In viewBox units: the text is 100 units tall, so 0.4 ≈ 1–1.5px on screen.
    strokeWidth: 0.4
  };

  return (
    <svg
      ref={svgRef}
      viewBox={`${box.x} ${box.y} ${box.width} ${box.height}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className={`block w-full select-none overflow-visible ${className}`}
      onPointerMove={onMove}
      onPointerLeave={() => setFocus(null)}
    >
      <defs>
        <linearGradient id={ids.grad} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f07d00" />
          <stop offset="35%" stopColor="#ff9b3a" />
          <stop offset="55%" stopColor="#ffffff" />
          <stop offset="75%" stopColor="#ff9b3a" />
          <stop offset="100%" stopColor="#f07d00" />
        </linearGradient>
        <radialGradient
          id={ids.glow}
          gradientUnits="userSpaceOnUse"
          cx={box.x + (focus?.x ?? 0.5) * box.width}
          cy={box.y + (focus?.y ?? 0.5) * box.height}
          r={box.width * 0.22}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </radialGradient>
        <mask id={ids.mask}>
          <rect x={box.x} y={box.y} width={box.width} height={box.height} fill={`url(#${ids.glow})`} />
        </mask>
      </defs>

      {/* 1 — faint outline, and the text the viewBox is measured from */}
      <text ref={textRef} {...shared} stroke="rgba(255,255,255,0.14)" fill="rgba(255,255,255,0.03)">
        {content("#f07d00")}
      </text>

      {/* 2 — the outline drawing itself in */}
      <text
        {...shared}
        stroke="rgba(255,255,255,0.45)"
        className={`hover-text-glyphs hover-text-draw ${drawn ? "is-drawn" : ""}`}
      >
        {content("transparent")}
      </text>

      {/* 3 — the gradient outline, shown only around the pointer */}
      <text
        {...shared}
        stroke={`url(#${ids.grad})`}
        strokeWidth={0.8}
        mask={`url(#${ids.mask})`}
        style={{ opacity: focus ? 1 : 0, transition: "opacity 0.3s" }}
      >
        {content("transparent")}
      </text>
    </svg>
  );
}
