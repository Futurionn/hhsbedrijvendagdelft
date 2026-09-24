// ─────────────────────────────────────────────────────────────────────────────
//  MARQUEE SCROLLING
//
//  The logo rows on the home page drift sideways forever, but the visitor can
//  also grab them and scroll by hand. Making both work at once takes some
//  bookkeeping, and it all lives here so the component stays readable.
//
//  ─── HOW THE ENDLESS LOOP WORKS ─────────────────────────────────────────────
//  The component renders the company list TWICE, back to back. A CSS animation
//  slides the track from 0% to -50% — which is exactly one copy of the list —
//  and then snaps back to 0%. Because the second copy looks identical to the
//  first, the snap is invisible and the row appears to scroll forever.
//
//  ─── WHY IT PAUSES ──────────────────────────────────────────────────────────
//  The CSS animation is paused whenever the visitor is hovering the row,
//  dragging it, or has a card open — otherwise the card would slide out from
//  under the cursor. While paused, native scrolling is enabled instead.
//
//  ─── WRAPPING BY HAND ───────────────────────────────────────────────────────
//  Native scrolling has real edges, so `wrapScroll` teleports the viewport by
//  one list-length whenever it reaches one. Same trick, same invisibility.
// ─────────────────────────────────────────────────────────────────────────────
import { useCallback, useRef, useState } from "react";

/** Card width + the gap between cards, in pixels. Keeps hand-scrolling aligned
 *  to card boundaries so a row never stops mid-card. */
const CARD_STRIDE = 340 + 32;

/** How far the pointer must move before it counts as a drag and not a click. */
const DRAG_THRESHOLD_PX = 6;

/** After a drag, ignore clicks for this long so releasing does not open a card. */
const CLICK_SUPPRESSION_MS = 250;

export function useMarqueeScroll({ isCardOpenInRow, closeOpenCard, isTouch = false }) {
  const scrollRef = useRef(null);

  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isManualMode, setIsManualMode] = useState(false);

  // Plain refs, not state: these change during pointer moves and must not
  // trigger a re-render on every mouse pixel.
  const drag = useRef({
    active: false,
    startX: 0,
    startY: 0,
    startScrollLeft: 0,
    moved: false,
    suppressClicks: false,
    suppressTimer: null
  });

  const isPaused = isManualMode || isHovering || isCardOpenInRow;

  /** Teleport by one list-length when the visitor scrolls off either end. */
  const wrapScroll = useCallback(() => {
    const element = scrollRef.current;
    if (!element) return;

    const maxScroll = element.scrollWidth - element.clientWidth;
    if (maxScroll <= 0) return;

    const oneListWidth = Math.floor(element.scrollWidth / 2);
    if (oneListWidth <= 0 || oneListWidth > maxScroll) return;

    if (element.scrollLeft <= 1) element.scrollLeft += oneListWidth;
    else if (element.scrollLeft >= oneListWidth + 1) element.scrollLeft -= oneListWidth;
  }, []);

  /**
   * When hand-scrolling starts at position 0 there is nothing to the left to
   * scroll into. Jump into the middle of the first copy first, so the row can
   * be dragged in both directions straight away.
   */
  const moveAwayFromEdge = useCallback(() => {
    const element = scrollRef.current;
    if (!element) return;

    const maxScroll = element.scrollWidth - element.clientWidth;
    if (maxScroll <= 0) return;

    const oneListWidth = Math.floor(element.scrollWidth / 2);
    const quarterIn = Math.floor(oneListWidth / 2);
    const alignedToCard = Math.floor(quarterIn / CARD_STRIDE) * CARD_STRIDE;

    if (element.scrollLeft < 2) {
      element.scrollLeft = Math.min(alignedToCard, maxScroll);
    }
  }, []);

  const endDrag = useCallback(
    (event) => {
      const element = scrollRef.current;
      const wasDragging = drag.current.moved;

      drag.current.active = false;
      drag.current.moved = false;
      setIsDragging(false);
      setIsManualMode(false);

      if (event?.pointerId != null) element?.releasePointerCapture?.(event.pointerId);
      wrapScroll();

      if (!wasDragging) return;

      // Swallow the click that the browser fires when the drag is released.
      drag.current.suppressClicks = true;
      if (drag.current.suppressTimer) clearTimeout(drag.current.suppressTimer);
      drag.current.suppressTimer = setTimeout(() => {
        drag.current.suppressClicks = false;
        drag.current.suppressTimer = null;
      }, CLICK_SUPPRESSION_MS);
    },
    [wrapScroll]
  );

  /** Spread onto the scrolling container element. */
  const containerProps = {
    ref: scrollRef,

    // Touch screens emit synthetic mouseenter/mouseleave around a tap. Acting
    // on them would close the card the visitor just opened, so on touch the
    // row is paused by swiping (which sets manual mode) rather than by hover.
    onMouseEnter: isTouch
      ? undefined
      : () => {
          setIsHovering(true);
          moveAwayFromEdge();
        },

    onMouseLeave: isTouch ? undefined : () => {
      setIsHovering(false);
      setIsDragging(false);
      setIsManualMode(false);
      drag.current.active = false;
      drag.current.moved = false;
      drag.current.suppressClicks = false;
      if (drag.current.suppressTimer) {
        clearTimeout(drag.current.suppressTimer);
        drag.current.suppressTimer = null;
      }
      closeOpenCard?.();
    },

    onScroll: () => {
      if (isPaused) wrapScroll();
    },

    onPointerDown: (event) => {
      // Left mouse button only, and never start a drag on a real control.
      if (event.button != null && event.button !== 0) return;
      if (event.target?.closest?.("a,button,input,textarea,select")) return;

      const element = scrollRef.current;
      if (!element) return;

      drag.current.active = true;
      drag.current.startX = event.clientX;
      drag.current.startY = event.clientY;
      drag.current.startScrollLeft = element.scrollLeft;
      drag.current.moved = false;
    },

    onPointerMove: (event) => {
      if (!drag.current.active) return;
      const element = scrollRef.current;
      if (!element) return;

      const deltaX = event.clientX - drag.current.startX;
      const deltaY = event.clientY - drag.current.startY;

      if (!drag.current.moved) {
        // Too small to tell yet — wait for more movement.
        if (Math.abs(deltaX) < DRAG_THRESHOLD_PX && Math.abs(deltaY) < DRAG_THRESHOLD_PX) {
          return;
        }
        // Mostly vertical: the visitor is scrolling the page, not the row.
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
          drag.current.active = false;
          return;
        }

        drag.current.moved = true;
        setIsDragging(true);
        setIsManualMode(true);
        moveAwayFromEdge();
        if (event.pointerId != null) element.setPointerCapture?.(event.pointerId);
      }

      element.scrollLeft = drag.current.startScrollLeft - deltaX;
      wrapScroll();
      event.preventDefault();
    },

    onPointerUp: endDrag,
    onPointerCancel: endDrag
  };

  /**
   * Put this on each card wrapper. It cancels the click that fires at the end
   * of a drag, so dragging a row never accidentally opens a card.
   */
  const cardClickGuardProps = {
    onClickCapture: (event) => {
      if (!drag.current.suppressClicks) return;
      event.preventDefault();
      event.stopPropagation();
    }
  };

  return { containerProps, cardClickGuardProps, isPaused, isDragging };
}
