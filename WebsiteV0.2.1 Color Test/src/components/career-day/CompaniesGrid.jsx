import { STRINGS } from "../../shared/strings.js";
import { useLanguage } from "../../shared/LanguageContext.jsx";
import { getCompanies } from "../../data/companies.js";
import CompanyCard from "./CompanyCard.jsx";
import { m } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

function splitTwoRows(items) {
  const mid = Math.ceil(items.length / 2);
  return [items.slice(0, mid), items.slice(mid)];
}

function MarqueeRow({
  direction,
  items,
  openId,
  setOpenId,
  rowKey
}) {
  const [hoverRow, setHoverRow] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [manualMode, setManualMode] = useState(false);
  const scrollRef = useRef(null);
  const isTouch =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(hover: none), (pointer: coarse)").matches;
  const dragRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    startScrollLeft: 0,
    moved: false,
    movedRecently: false,
    movedRecentlyTimer: null
  });

  const paused =
    manualMode || hoverRow || (openId != null && openId.startsWith(`${rowKey}-`));

  const stride = 340 + 32; // card width + gap-8 (2rem)

  const normalizeScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const max = el.scrollWidth - el.clientWidth;
    if (max <= 0) return;

    const half = Math.floor(el.scrollWidth / 2);
    if (half <= 0 || half > max) return;

    if (el.scrollLeft <= 1) el.scrollLeft += half;
    else if (el.scrollLeft >= half + 1) el.scrollLeft -= half;
  };

  const onOpen = (id) => {
    if (dragging) return;
    setOpenId(id);
  };
  const onClose = (id) => {
    setOpenId((cur) => (cur === id ? null : cur));
  };

  const rowClass = direction === "right" ? "marquee-right" : "marquee-left";
  const doubled = useMemo(() => [...items, ...items], [items]);

  const ensureScrollableStart = () => {
    const el = scrollRef.current;
    if (!el) return;

    const max = el.scrollWidth - el.clientWidth;
    if (max <= 0) return;

    const half = Math.floor(el.scrollWidth / 2);
    const raw = Math.floor(half / 2);
    const aligned = Math.floor(raw / stride) * stride;
    const start = Math.min(aligned, max);
    if (el.scrollLeft < 2) el.scrollLeft = start;
  };

  useEffect(() => {
    if (!isTouch) return;
    ensureScrollableStart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTouch, doubled.length]);

  return (
    <div
      ref={scrollRef}
      onMouseEnter={() => {
        setHoverRow(true);
        const el = scrollRef.current;
        if (!el) return;

        const max = el.scrollWidth - el.clientWidth;
        if (max <= 0) return;

        const half = Math.floor(el.scrollWidth / 2);
        const raw = Math.floor(half / 2);
        const aligned = Math.floor(raw / stride) * stride;
        const start = Math.min(aligned, max);
        if (el.scrollLeft < 2) el.scrollLeft = start;
      }}
      onMouseLeave={() => {
        setHoverRow(false);
        setDragging(false);
        setManualMode(false);
        dragRef.current.active = false;
        dragRef.current.moved = false;
        dragRef.current.movedRecently = false;
        if (dragRef.current.movedRecentlyTimer) {
          clearTimeout(dragRef.current.movedRecentlyTimer);
          dragRef.current.movedRecentlyTimer = null;
        }
        setOpenId((cur) => (cur?.startsWith(`${rowKey}-`) ? null : cur));
      }}
      onScroll={() => {
        if (!paused) return;
        normalizeScroll();
      }}
      onPointerDown={(e) => {
        if (e.button != null && e.button !== 0) return;
        if (e.target?.closest?.("a,button,input,textarea,select")) return;
        const el = scrollRef.current;
        if (!el) return;

        dragRef.current.active = true;
        dragRef.current.startX = e.clientX;
        dragRef.current.startY = e.clientY;
        dragRef.current.startScrollLeft = el.scrollLeft;
        dragRef.current.moved = false;
      }}
      onPointerMove={(e) => {
        if (!dragRef.current.active) return;
        const el = scrollRef.current;
        if (!el) return;

        const deltaX = e.clientX - dragRef.current.startX;
        const deltaY = e.clientY - dragRef.current.startY;
        if (!dragRef.current.moved) {
          const threshold = 6;
          if (Math.abs(deltaX) < threshold && Math.abs(deltaY) < threshold) return;
          if (Math.abs(deltaY) > Math.abs(deltaX)) {
            dragRef.current.active = false;
            return;
          }

          dragRef.current.moved = true;
          setDragging(true);
          setManualMode(true);
          ensureScrollableStart();
          if (e.pointerId != null) el.setPointerCapture?.(e.pointerId);
        }

        el.scrollLeft = dragRef.current.startScrollLeft - deltaX;
        normalizeScroll();
        e.preventDefault();
      }}
      onPointerUp={(e) => {
        const el = scrollRef.current;
        const wasMoved = dragRef.current.moved;
        dragRef.current.active = false;
        dragRef.current.moved = false;
        setDragging(false);
        setManualMode(false);
        if (e.pointerId != null) el?.releasePointerCapture?.(e.pointerId);
        normalizeScroll();

        if (wasMoved) {
          dragRef.current.movedRecently = true;
          if (dragRef.current.movedRecentlyTimer) clearTimeout(dragRef.current.movedRecentlyTimer);
          dragRef.current.movedRecentlyTimer = setTimeout(() => {
            dragRef.current.movedRecently = false;
            dragRef.current.movedRecentlyTimer = null;
          }, 250);
        }
      }}
      onPointerCancel={(e) => {
        const el = scrollRef.current;
        dragRef.current.active = false;
        dragRef.current.moved = false;
        setDragging(false);
        setManualMode(false);
        if (e.pointerId != null) el?.releasePointerCapture?.(e.pointerId);
        normalizeScroll();
      }}
      className={`marquee-scroll no-scrollbar overflow-y-visible py-3 select-none ${
        paused ? "overflow-x-auto" : "overflow-x-hidden"
      } ${paused ? (dragging ? "cursor-grabbing" : "cursor-grab") : ""}`}
    >
      <div
        className={`marquee-track ${rowClass} gap-8 px-8`}
        style={{ animationPlayState: paused ? "paused" : "running" }}
      >
        {doubled.map((company, index) => {
          const id = `${rowKey}-${index}`;
          return (
            <div
              key={id}
              className="w-[260px] flex-none sm:w-[340px]"
              onClickCapture={(e) => {
                if (dragRef.current.movedRecently) {
                  e.preventDefault();
                  e.stopPropagation();
                }
              }}
            >
              <CompanyCard
                company={company}
                isOpen={openId === id}
                onOpen={() => onOpen(id)}
                onClose={() => onClose(id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function CompaniesGrid() {
  const { lang } = useLanguage();
  const t = STRINGS[lang];
  const companyIssuesLabel =
    lang === "nl"
      ? "Problemen met uw bedrijf representatie?"
      : "Issues with your company listing?";
  const companyIssuesEmail = "voorzitter@rheonline.nl";
  const listLabel =
    lang === "nl" ? "Bekijk alle bedrijven →" : "View all companies →";

  const [openId, setOpenId] = useState(null);
  const [topRow, bottomRow] = useMemo(() => {
    const companies = getCompanies(lang);
    return splitTwoRows(companies);
  }, [lang]);

  return (
    <section id="companies" className="scroll-mt-4 bg-white py-20 dark:bg-slate-950 md:scroll-mt-6">
      <m.div id="companies-top" {...reveal} className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold tracking-widest text-orange">
            {t.companiesKicker}
          </p>
          <h2
            id="companies-title"
            className="mt-3 scroll-mt-4 text-4xl font-extrabold tracking-tight text-navy dark:text-white md:scroll-mt-6 md:text-5xl"
          >
            {t.companiesTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-300">
            {t.companiesSubtitle}
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-600 dark:text-gray-300">
            {companyIssuesLabel}{" "}
            <a className="font-semibold text-orange" href={`mailto:${companyIssuesEmail}`}>
              {companyIssuesEmail}
            </a>
          </p>
          <div className="mt-4">
            <Link
              to="/companies"
              className="text-sm font-semibold text-orange transition-all duration-500 hover:opacity-80"
            >
              {listLabel}
            </Link>
          </div>
        </div>
      </m.div>

      {/* Full-bleed rows (go to screen edges) */}
      <div className="mt-14 space-y-14 md:space-y-16">
        <MarqueeRow
          direction="right"
          items={topRow}
          openId={openId}
          setOpenId={setOpenId}
          rowKey="top"
        />
        <MarqueeRow
          direction="left"
          items={bottomRow}
          openId={openId}
          setOpenId={setOpenId}
          rowKey="bottom"
        />
      </div>

      <div className="mx-auto mt-10 max-w-6xl px-6 text-center">
        <Link
          to="/companies"
          className="inline-flex items-center justify-center rounded-full bg-orange px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-[#909806]/25 transition-all duration-500 hover:scale-105"
        >
          {listLabel}
        </Link>
      </div>
    </section>
  );
}
