// ─────────────────────────────────────────────────────────────────────────────
//  MAP VIEW  —  zooming and dragging for the drawn floor plan (StandMap.jsx).
//
//  The map is one <svg>. "Where the visitor is looking" is its viewBox: a
//  rectangle on the drawing. Dragging moves that rectangle, zooming shrinks
//  or grows it. The viewBox is written straight onto the element instead of
//  through React state, so a drag does not re-render the whole map 60 times
//  a second.
//
//  ─── WHAT THE VISITOR CAN DO ────────────────────────────────────────────────
//    drag                    move the map (mouse, pen or one finger)
//    pinch                   zoom (two fingers)
//    Ctrl/⌘ + scroll         zoom at the pointer. A plain scroll is left to
//                            the page, and a short hint explains the key.
//                            In full screen there is no page to scroll, so a
//                            plain scroll zooms.
//    double-click            zoom in on that spot
//    a click without a drag  reported to `onTap`, to select a stand
//
//  With "reduce motion" on, the animated moves jump straight to their end.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useLayoutEffect, useRef, useState } from "react";

/** A press that travels less than this (in screen px) is a click, not a drag. */
const TAP_SLOP_PX = 6;
/** How long an animated move takes. */
const MOVE_MS = 420;
/** How long the "use Ctrl + scroll" hint stays up. */
const HINT_MS = 1300;
/** Applied to the svg while a drag is in progress. */
const DRAGGING_CLASS = "cursor-grabbing";

export function useMapView({ width, height, onTap, freeWheel = false }) {
  const svgRef = useRef(null);
  const view = useRef({ x: 0, y: 0, w: width, h: height });
  const frame = useRef(0);
  const pointers = useRef(new Map());
  const travelled = useRef(0);
  const [hintVisible, setHintVisible] = useState(false);

  // The newest props, read by the wheel listener, which is attached only once.
  const latest = useRef({ onTap, freeWheel });
  latest.current = { onTap, freeWheel };

  // The api object keeps one identity for the life of the component; its
  // functions are (re)assigned below and always see the current props.
  const api = useRef({}).current;

  const rect = () => svgRef.current.getBoundingClientRect();
  const aspect = () => {
    const box = rect();
    return box.width / Math.max(1, box.height);
  };
  const apply = () => {
    const v = view.current;
    svgRef.current?.setAttribute("viewBox", `${v.x} ${v.y} ${v.w} ${v.h}`);
  };

  // Zoom limits: in to 1/16 of the drawing, out to a little past all of it.
  const minWidth = Math.max(width, height) / 16;
  const maxWidth = () => Math.max(width, height * aspect()) * 1.15;

  /** The view that shows the whole drawing with a small margin. */
  const fitted = () => {
    const ratio = aspect();
    let w;
    let h;
    if (width / height > ratio) {
      w = width * 1.04;
      h = w / ratio;
    } else {
      h = height * 1.04;
      w = h * ratio;
    }
    return { x: (width - w) / 2, y: (height - h) / 2, w, h };
  };

  /** Keep the centre of the view on the drawing, so it cannot be lost. */
  const clamp = () => {
    const v = view.current;
    const cx = v.x + v.w / 2;
    const cy = v.y + v.h / 2;
    v.x += Math.min(width, Math.max(0, cx)) - cx;
    v.y += Math.min(height, Math.max(0, cy)) - cy;
  };

  const stop = () => cancelAnimationFrame(frame.current);

  /** Zoom by `factor`, keeping the drawing under screen point (px, py) still. */
  const zoomAt = (px, py, factor) => {
    const v = view.current;
    const box = rect();
    const point = {
      x: v.x + ((px - box.left) * v.w) / box.width,
      y: v.y + ((py - box.top) * v.h) / box.height
    };
    const nextWidth = Math.min(Math.max(v.w / factor, minWidth), maxWidth());
    const scale = nextWidth / v.w;
    v.x = point.x - (point.x - v.x) * scale;
    v.y = point.y - (point.y - v.y) * scale;
    v.w = nextWidth;
    v.h *= scale;
    clamp();
    apply();
  };

  const animateTo = (target) => {
    stop();
    const from = { ...view.current };
    const startedAt = performance.now();
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const step = (now) => {
      const progress = reduce ? 1 : Math.min(1, (now - startedAt) / MOVE_MS);
      const eased = 1 - (1 - progress) ** 3;
      const v = view.current;
      v.x = from.x + (target.x - from.x) * eased;
      v.y = from.y + (target.y - from.y) * eased;
      v.w = from.w + (target.w - from.w) * eased;
      v.h = from.h + (target.h - from.h) * eased;
      // Land exactly on the target, not a rounding error beside it.
      if (progress >= 1) Object.assign(v, target);
      apply();
      if (progress < 1) frame.current = requestAnimationFrame(step);
    };
    frame.current = requestAnimationFrame(step);
  };

  /** The view that frames a box on the drawing, padded by `pad` (1 = tight). */
  const framing = (x0, y0, x1, y1, pad) => {
    const ratio = aspect();
    let w = Math.max(x1 - x0, minWidth) * pad;
    let h = Math.max(y1 - y0, minWidth / ratio) * pad;
    if (w / h < ratio) w = h * ratio;
    else h = w / ratio;
    return { x: (x0 + x1) / 2 - w / 2, y: (y0 + y1) / 2 - h / 2, w, h };
  };

  // ── What the map component calls ──────────────────────────────────────────

  /** The + and − buttons: zoom on the middle of the map. */
  api.zoomBy = (factor) => {
    if (!svgRef.current) return;
    const box = rect();
    stop();
    zoomAt(box.left + box.width / 2, box.top + box.height / 2, factor);
  };

  /** Show the whole drawing. */
  api.fit = (animate = true) => {
    if (!svgRef.current) return;
    const target = fitted();
    if (animate) animateTo(target);
    else {
      stop();
      view.current = target;
      apply();
    }
  };

  /** Glide to a box on the drawing (the stands a filter matched). */
  api.showBox = (box, pad = 1.35) => {
    if (!svgRef.current) return;
    animateTo(framing(box.x0, box.y0, box.x1, box.y1, pad));
  };

  /**
   * Glide to one spot, with `reach` drawing units visible on every side.
   * `offset` ({ x, y } in screen px, from the middle of the map) is where
   * the spot should land: off-centre, to keep it clear of the card that
   * lies over part of the map.
   */
  api.showPoint = (cx, cy, reach, offset = { x: 0, y: 0 }) => {
    if (!svgRef.current) return;
    const box = rect();
    const target = framing(cx - reach, cy - reach, cx + reach, cy + reach, 1);
    target.x -= (offset.x * target.w) / box.width;
    target.y -= (offset.y * target.h) / box.height;
    animateTo(target);
  };

  /** Glide the map sideways/up by a number of screen px, without zooming. */
  api.panBy = (dx, dy) => {
    if (!svgRef.current || (!dx && !dy)) return;
    const box = rect();
    const v = view.current;
    animateTo({ x: v.x - (dx * v.w) / box.width, y: v.y - (dy * v.h) / box.height, w: v.w, h: v.h });
  };

  // ── Start fitted, and stay sensible when the map is resized ───────────────
  useLayoutEffect(() => {
    const svg = svgRef.current;
    if (!svg) return undefined;

    view.current = fitted();
    apply();

    // Keep the same centre and zoom; only the shape of the view changes.
    const observer = new ResizeObserver(() => {
      const v = view.current;
      const cy = v.y + v.h / 2;
      v.h = v.w / aspect();
      v.y = cy - v.h / 2;
      apply();
    });
    observer.observe(svg);
    return () => {
      observer.disconnect();
      stop();
    };
  }, [width, height]);

  // ── The wheel. Attached by hand: React's own listener is passive, and a
  //    passive listener may not stop the page from scrolling. ───────────────
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return undefined;
    let hintTimer = 0;

    const onWheel = (event) => {
      if (!latest.current.freeWheel && !(event.ctrlKey || event.metaKey)) {
        setHintVisible(true);
        clearTimeout(hintTimer);
        hintTimer = window.setTimeout(() => setHintVisible(false), HINT_MS);
        return;
      }
      event.preventDefault();
      setHintVisible(false);
      stop();
      zoomAt(event.clientX, event.clientY, Math.exp(-event.deltaY * 0.0016));
    };

    svg.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      svg.removeEventListener("wheel", onWheel);
      clearTimeout(hintTimer);
    };
  }, []);

  // ── Dragging and pinching ─────────────────────────────────────────────────
  const onPointerDown = (event) => {
    if (event.button > 0) return;
    const svg = svgRef.current;
    svg.setPointerCapture?.(event.pointerId);
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.current.size === 1) travelled.current = 0;
    stop();
    svg.classList.add(DRAGGING_CLASS);
  };

  const onPointerMove = (event) => {
    const previous = pointers.current.get(event.pointerId);
    if (!previous) return;
    const v = view.current;
    const box = rect();

    if (pointers.current.size === 1) {
      const dx = event.clientX - previous.x;
      const dy = event.clientY - previous.y;
      travelled.current += Math.abs(dx) + Math.abs(dy);
      v.x -= (dx * v.w) / box.width;
      v.y -= (dy * v.h) / box.height;
      clamp();
      apply();
    } else if (pointers.current.size === 2) {
      let other = null;
      pointers.current.forEach((point, id) => {
        if (id !== event.pointerId) other = point;
      });
      const before = Math.hypot(previous.x - other.x, previous.y - other.y);
      const after = Math.hypot(event.clientX - other.x, event.clientY - other.y);
      const midBefore = { x: (previous.x + other.x) / 2, y: (previous.y + other.y) / 2 };
      const midAfter = { x: (event.clientX + other.x) / 2, y: (event.clientY + other.y) / 2 };
      v.x -= ((midAfter.x - midBefore.x) * v.w) / box.width;
      v.y -= ((midAfter.y - midBefore.y) * v.h) / box.height;
      if (before > 0) zoomAt(midAfter.x, midAfter.y, after / before);
      travelled.current += 20; // a pinch is never a click
    }

    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
  };

  const onPointerEnd = (event) => {
    if (!pointers.current.has(event.pointerId)) return;
    pointers.current.delete(event.pointerId);
    if (pointers.current.size > 0) return;

    svgRef.current?.classList.remove(DRAGGING_CLASS);
    if (travelled.current < TAP_SLOP_PX && event.type === "pointerup") {
      latest.current.onTap?.(event.clientX, event.clientY);
    }
  };

  const onDoubleClick = (event) => {
    stop();
    zoomAt(event.clientX, event.clientY, 1.8);
  };

  return {
    svgRef,
    api,
    hintVisible,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: onPointerEnd,
      onPointerCancel: onPointerEnd,
      onDoubleClick
    }
  };
}
