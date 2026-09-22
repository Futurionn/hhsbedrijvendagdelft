// ─────────────────────────────────────────────────────────────────────────────
//  COMPANY MARQUEE  —  the two rows of company logos that drift across the
//  home page, the top row to the right and the bottom row to the left.
//
//  The company list is split in half: first half on top, second half below.
//  Each half is rendered twice inside its row so the loop is seamless — see
//  src/shared/hooks/useMarqueeScroll.js for why.
//
//  Only one card may be open at a time across BOTH rows. That state, and the
//  delay that stops a card flickering when the pointer sits on its edge, live
//  in src/shared/hooks/useHoverCard.js
//
//  The animation speed is set in src/index.css (.marquee-left / .marquee-right).
// ─────────────────────────────────────────────────────────────────────────────
import { useMemo } from "react";
import CompanyCard from "./CompanyCard.jsx";
import { useMarqueeScroll } from "../hooks/useMarqueeScroll.js";
import { useIsTouchDevice } from "../hooks/useIsTouchDevice.js";
import { useHoverCard } from "../hooks/useHoverCard.js";

function MarqueeRow({ companies, direction, rowKey, hoverCard }) {
  const isTouch = useIsTouchDevice();
  const { openCardId, openCard, closeCard, closeCardNow, toggleCard } = hoverCard;

  // Card ids look like "top-4" — the row name plus the position, so the same
  // company appearing in both copies of the list can still be told apart.
  const isCardOpenInRow = openCardId != null && openCardId.startsWith(`${rowKey}-`);

  const { containerProps, cardClickGuardProps, isPaused, isDragging } = useMarqueeScroll({
    isCardOpenInRow,
    isTouch,
    // Leaving the row entirely is unambiguous, so that closes with no delay.
    closeOpenCard: () => closeCardNow((id) => id.startsWith(`${rowKey}-`))
  });

  // Two copies back to back. This is what makes the loop seamless.
  const loopedCompanies = useMemo(() => [...companies, ...companies], [companies]);

  return (
    <div
      {...containerProps}
      className={`marquee-scroll no-scrollbar select-none overflow-y-visible py-3 ${
        isPaused ? "overflow-x-auto" : "overflow-x-hidden"
      } ${isPaused ? (isDragging ? "cursor-grabbing" : "cursor-grab") : ""}`}
    >
      <div
        className={`marquee-track gap-8 px-8 ${
          direction === "right" ? "marquee-right" : "marquee-left"
        }`}
        style={{ animationPlayState: isPaused ? "paused" : "running" }}
      >
        {loopedCompanies.map((company, index) => {
          const cardId = `${rowKey}-${index}`;
          return (
            <div
              key={cardId}
              className="w-[260px] flex-none sm:w-[340px]"
              {...cardClickGuardProps}
            >
              <CompanyCard
                company={company}
                isOpen={openCardId === cardId}
                isMuted={openCardId != null && openCardId !== cardId}
                showHoverHint={openCardId != null && openCardId !== cardId}
                onOpen={() => openCard(cardId)}
                onClose={() => closeCard(cardId)}
                onToggle={() => toggleCard(cardId)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function CompanyMarquee({ companies }) {
  // One shared open-card state, so opening a card in the bottom row closes
  // the one in the top row.
  const hoverCard = useHoverCard();

  const [topRow, bottomRow] = useMemo(() => {
    const middle = Math.ceil(companies.length / 2);
    return [companies.slice(0, middle), companies.slice(middle)];
  }, [companies]);

  if (companies.length === 0) return null;

  return (
    <div className="mt-14 space-y-14 md:space-y-16">
      <MarqueeRow
        companies={topRow}
        direction="right"
        rowKey="top"
        hoverCard={hoverCard}
      />
      {bottomRow.length > 0 ? (
        <MarqueeRow
          companies={bottomRow}
          direction="left"
          rowKey="bottom"
          hoverCard={hoverCard}
        />
      ) : null}
    </div>
  );
}
