// ─────────────────────────────────────────────────────────────────────────────
//  COMPANY GALLERY  —  two curved rows of company cards that turn against
//  each other, modelled on the 21st.dev "circular gallery".
//
//        ╰──[ ]──[ ]──[ ]──[ ]──[ ]──╯     top row: ∪, drifts to the right
//        ╭──[ ]──[ ]──[ ]──[ ]──[ ]──╮     bottom row: ∩, drifts to the left
//
//  ─── HOW IT BEHAVES ─────────────────────────────────────────────────────────
//    • It drifts on its own. Hovering it stops the drift.
//    • Sideways trackpad swipe, shift + wheel, or drag: moves it.
//      A normal up/down scroll goes straight through to the page.
//    • Click a card: it glides to the middle, the others step back, and the
//      card opens into a panel with the details and a "Meer info" button to
//      the company's own entry on the companies page.
//      Esc, the ×, clicking elsewhere or dragging closes it. A click while a
//      card is open only closes; it does not open the card under the pointer.
//
//  The cards are drawn with WebGL (src/shared/ui/circularGallery/). That code
//  is loaded only when this section is on the page, so it does not slow the
//  rest of the site. Without WebGL the old scrolling rows are shown instead.
//
//  Screen readers get a plain list of the companies with links, instead of
//  the canvas.
// ─────────────────────────────────────────────────────────────────────────────
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { STRINGS } from "../strings.js";
import { SUBPAGE, editionPath } from "../../editions/index.js";
import { cardPalette } from "../companyStyles.js";
import Button from "../ui/Button.jsx";
import CompanyLogo from "../ui/CompanyLogo.jsx";
import CompanyMarquee from "./CompanyMarquee.jsx";
import CompanyTags from "./CompanyTags.jsx";

const SPRING = { type: "spring", bounce: 0, duration: 0.5 };

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

/** Initial height guess before the engine has measured, so nothing jumps. */
function guessHeight() {
  const width = typeof window === "undefined" ? 1200 : window.innerWidth;
  const phone = width < 700;
  const boost = document.documentElement.classList.contains("pc-on-phone") ? 1.3 : 1;
  const cardH = Math.round((phone ? 176 : Math.min(250, Math.max(200, width * 0.17))) * boost);
  const bend = phone ? 24 : Math.round(Math.min(90, width * 0.06));
  return 2 * (cardH + (phone ? 10 : 16) + bend) + 24;
}

/**
 * The opened card: grows out of the card's own size into a panel, gliding
 * from where the card sits to the middle of the gallery so it never hangs
 * over the heading above or the text below.
 *
 * The panel stays WHITE in both themes (navy for white logos), like the card
 * it grew out of, so the logo keeps the background it was made for. Its text
 * follows the card, not the site theme: see cardPalette() in companyStyles.js.
 */
function CompanyPanel({ company, rect, edition, study, onClose, containerWidth, containerHeight }) {
  const { lang } = useLanguage();
  const t = STRINGS[lang];
  // Phones see the page zoomed out (html.pc-on-phone), so a card-sized
  // panel would be tiny: there it opens almost screen-wide. On a PC it grows
  // to ~2× the card.
  const onPhone = document.documentElement.classList.contains("pc-on-phone");
  const panelWidth = onPhone
    ? Math.min(containerWidth - 48, 720)
    : Math.min(Math.max(rect.width * 2.1, 420), containerWidth - 24);
  const centre = { x: containerWidth / 2, y: containerHeight / 2 };
  const from = { x: rect.x - centre.x, y: rect.y - centre.y };
  const detailPath = `${editionPath(edition, SUBPAGE.companies)}/${company.id}`;
  const c = cardPalette(company.logoTone);

  return (
    <div
      className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-1/2"
      style={{ left: centre.x, top: centre.y }}
    >
      <m.div
        role="dialog"
        aria-label={company.name}
        initial={{ ...from, width: rect.width * 0.94, height: rect.height * 0.94, opacity: 0.6 }}
        animate={{ x: 0, y: 0, width: panelWidth, height: "auto", opacity: 1 }}
        exit={{ ...from, width: rect.width * 0.94, height: rect.height * 0.94, opacity: 0 }}
        transition={SPRING}
        className={`pointer-events-auto relative overflow-hidden rounded-md border shadow-[0_24px_60px_-24px_rgba(10,22,44,0.45)] ${c.surface} ${c.primary}`}
      >
        <m.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0, transition: { ...SPRING, delay: 0.12 } }}
          exit={{ opacity: 0, transition: { duration: 0.12 } }}
          className="overflow-y-auto overscroll-contain p-6"
          style={{ width: panelWidth, maxHeight: containerHeight - 16 }}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label={t.galleryClose}
            className={`absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-sm transition-[transform,color] duration-settle active:scale-[0.97] active:duration-press ${c.close}`}
          >
            <X className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
          </button>

          <div className="flex h-12 max-w-[60%] items-center pr-2">
            <CompanyLogo company={company} size="row" />
          </div>

          <h3 className={`mt-4 text-heading font-medium ${c.primary}`}>{company.name}</h3>
          <p className={`mt-0.5 text-small ${c.muted}`}>
            {[company.industry, company.location].filter(Boolean).join(" · ")}
          </p>

          <p className={`mt-4 line-clamp-4 text-small ${c.primary}`}>{company.description}</p>

          <div className={`mt-4 border-t pt-4 ${c.rule}`}>
            <CompanyTags company={company} highlight={study} compact />
          </div>

          <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-small">
            <div className="flex gap-1.5">
              <dt className={c.muted}>{t.employees}:</dt>
              <dd className={c.primary}>{company.employees || t.tbd}</dd>
            </div>
            <div className="flex gap-1.5">
              <dt className={c.muted}>{t.stand}:</dt>
              <dd className={`tabular-nums ${c.primary}`}>
                {Number.isInteger(company.stand) ? `#${company.stand}` : t.tbd}
              </dd>
            </div>
          </dl>

          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button to={detailPath} arrow="right" size="sm">
              {t.moreInfo}
            </Button>
            {company.website && company.website !== "#" ? (
              <Button href={company.website} variant="link" className={c.primary}>
                {t.website}
              </Button>
            ) : null}
          </div>
        </m.div>
      </m.div>
    </div>
  );
}

export default function CompanyGallery({ companies, edition, study }) {
  const { lang } = useLanguage();
  const t = STRINGS[lang];

  const wrapperRef = useRef(null);
  const hostRef = useRef(null);
  const engineRef = useRef(null);
  const [webgl] = useState(supportsWebGL);
  const [height, setHeight] = useState(guessHeight);
  const [width, setWidth] = useState(0);
  const [open, setOpen] = useState(null); // { company, rect }

  const byId = useMemo(() => new Map(companies.map((c) => [c.id, c])), [companies]);
  const [top, bottom] = useMemo(() => {
    const middle = Math.ceil(companies.length / 2);
    return [companies.slice(0, middle), companies.slice(middle)];
  }, [companies]);

  const close = useCallback(() => {
    setOpen(null);
    engineRef.current?.release();
  }, []);

  // Build the engine; rebuilt when the language changes (the cards carry text).
  useEffect(() => {
    if (!webgl || !hostRef.current || companies.length === 0) return undefined;
    let cancelled = false;
    let engine = null;

    Promise.all([
      import("../ui/circularGallery/engine.js"),
      import("../ui/circularGallery/cardArt.js")
    ]).then(([{ GalleryEngine, layoutFor }, { drawCompanyCard }]) => {
      if (cancelled || !hostRef.current) return;
      const measure = () => {
        const w = wrapperRef.current?.clientWidth ?? 0;
        setWidth(w);
        setHeight(layoutFor(w).height);
      };
      measure();

      engine = new GalleryEngine(hostRef.current, {
        top,
        bottom,
        drawCard: (company) => drawCompanyCard(company, { stand: t.stand }),
        reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        onCardClick: (hit) => {
          setOpen(null);
          // With a card open (or gliding to the middle), a click anywhere in
          // the gallery only closes it. It never opens the card underneath.
          if (!hit || engine.frozen) {
            engine.release();
            return;
          }
          engine.focusCard(hit.card, hit.rowIndex);
        },
        onSettled: (selected, rect) => {
          engine.setPanelOpen(true);
          setOpen({ company: byId.get(selected.key), rect });
        }
      });
      engineRef.current = engine;

      const observer = new ResizeObserver(() => {
        measure();
        setOpen(null);
        engine.release();
      });
      observer.observe(wrapperRef.current);
      engine.cleanupResize = () => observer.disconnect();
    });

    return () => {
      cancelled = true;
      if (engine) {
        engine.cleanupResize?.();
        engine.destroy();
      }
      engineRef.current = null;
      setOpen(null);
    };
  }, [webgl, companies, top, bottom, byId, t.stand]);

  // Esc and clicks outside the gallery close an open card.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => event.key === "Escape" && close();
    const onPointer = (event) => {
      if (!wrapperRef.current?.contains(event.target)) close();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open, close]);

  if (companies.length === 0) return null;
  if (!webgl) return <CompanyMarquee companies={companies} />;

  return (
    <div>
      <div ref={wrapperRef} className="relative select-none" style={{ height }}>
        <div
          ref={hostRef}
          aria-hidden="true"
          className="absolute inset-0 cursor-grab touch-pan-y overflow-hidden active:cursor-grabbing"
        />

        <AnimatePresence>
          {open ? (
            <CompanyPanel
              key={open.company.id}
              company={open.company}
              rect={open.rect}
              edition={edition}
              study={study}
              onClose={close}
              containerWidth={width}
              containerHeight={height}
            />
          ) : null}
        </AnimatePresence>
      </div>

      {/* The canvas is invisible to screen readers; this is what they get. */}
      <ul className="sr-only">
        {companies.map((company) => (
          <li key={company.id}>
            <Link to={`${editionPath(edition, SUBPAGE.companies)}/${company.id}`}>
              {company.name}, {company.industry}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
