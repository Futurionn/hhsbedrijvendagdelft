import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { useEdition } from "../../shared/EditionContext.jsx";
import { useLanguage } from "../../shared/LanguageContext.jsx";

export default function EditionSelector() {
  const { edition, setEdition, editionOptions } = useEdition();
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedEdition = useMemo(
    () => editionOptions.find((option) => option.id === edition) ?? editionOptions[0],
    [edition, editionOptions]
  );

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  const label = lang === "nl" ? "Editie" : "Edition";

  return (
    <div
      ref={containerRef}
      className="absolute left-4 top-4 z-50 md:left-6 md:top-6"
    >
      <div className="relative rounded-2xl border border-white/15 bg-navy/55 p-2 shadow-2xl shadow-black/20 backdrop-blur-md">
        <div className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70">
          {label}
        </div>

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="inline-flex min-w-[172px] items-center justify-between gap-4 rounded-xl bg-white/10 px-4 py-3 text-left text-sm font-semibold text-white transition-all duration-300 hover:bg-white/15"
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <span>{selectedEdition?.label}</span>
          <ChevronDown
            className={`h-4 w-4 text-orange transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open ? (
          <div
            className="absolute left-0 top-full mt-2 w-full rounded-2xl border border-white/15 bg-navy/95 p-2 shadow-2xl shadow-black/30"
            role="listbox"
            aria-label={label}
          >
            {editionOptions.map((option) => {
              const isSelected = option.id === edition;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    setEdition(option.id);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                    isSelected
                      ? "bg-orange text-white"
                      : "text-white/85 hover:bg-white/10"
                  }`}
                  role="option"
                  aria-selected={isSelected}
                >
                  <span>{option.label}</span>
                  {isSelected ? <Check className="h-4 w-4" /> : null}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
