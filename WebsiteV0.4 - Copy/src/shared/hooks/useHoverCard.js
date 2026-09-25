// ─────────────────────────────────────────────────────────────────────────────
//  WHICH CARD IS OPEN
//
//  Tracks the one open company card across both marquee rows, and — the point
//  of this hook — delays CLOSING.
//
//  ─── THE PROBLEM IT SOLVES ──────────────────────────────────────────────────
//  Opening a card makes it taller. When the pointer sits near a card's edge,
//  that growth can move the edge out from under the pointer, which fires a
//  mouse-leave, which closes the card, which shrinks it back under the pointer,
//  which fires a mouse-enter… The card flickers open and shut many times a
//  second and the row jitters with it.
//
//  Opening stays instant, because the visitor asked for it. Closing waits
//  CLOSE_DELAY_MS. If the pointer comes back within that window — which is
//  exactly what the flicker loop does — the pending close is cancelled and
//  nothing moves.
//
//  Moving to a DIFFERENT card still switches immediately: the new card wins,
//  no waiting for the old one to time out.
// ─────────────────────────────────────────────────────────────────────────────
import { useCallback, useEffect, useRef, useState } from "react";

/** How long a card stays open after the pointer leaves it. */
const CLOSE_DELAY_MS = 1000;

export function useHoverCard() {
  const [openCardId, setOpenCardId] = useState(null);
  const closeTimer = useRef(null);

  const cancelPendingClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  /** Open a card now. Any queued close is abandoned. */
  const openCard = useCallback(
    (cardId) => {
      cancelPendingClose();
      setOpenCardId(cardId);
    },
    [cancelPendingClose]
  );

  /**
   * Ask for a card to close. It stays open for CLOSE_DELAY_MS first, so a
   * pointer that wobbles across the edge does not make it flicker.
   */
  const closeCard = useCallback(
    (cardId) => {
      cancelPendingClose();
      closeTimer.current = setTimeout(() => {
        closeTimer.current = null;
        // Only close if this card is still the open one. If the visitor moved
        // to another card in the meantime, that one must stay open.
        setOpenCardId((current) => (current === cardId ? null : current));
      }, CLOSE_DELAY_MS);
    },
    [cancelPendingClose]
  );

  /** Close whatever is open, right now — used when the pointer leaves the row. */
  const closeCardNow = useCallback(
    (predicate) => {
      cancelPendingClose();
      setOpenCardId((current) => {
        if (current == null) return null;
        if (predicate && !predicate(current)) return current;
        return null;
      });
    },
    [cancelPendingClose]
  );

  /** Tap toggles on touch screens, with no delay either way. */
  const toggleCard = useCallback(
    (cardId) => {
      cancelPendingClose();
      setOpenCardId((current) => (current === cardId ? null : cardId));
    },
    [cancelPendingClose]
  );

  useEffect(() => cancelPendingClose, [cancelPendingClose]);

  return { openCardId, openCard, closeCard, closeCardNow, toggleCard };
}
