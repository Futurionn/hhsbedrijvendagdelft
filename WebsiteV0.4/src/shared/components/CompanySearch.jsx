// ─────────────────────────────────────────────────────────────────────────────
//  COMPANY SEARCH  —  the search box on the companies page, with suggestions.
//
//      [⌕ a                       ]
//       ┌──────────────────────────┐
//       │ ABB                       │   names that START with what you typed
//       │ Almacon                   │   come first, then names that contain it
//       │ Mammoet                   │
//       └──────────────────────────┘
//
//  Typing narrows the list straight away (the page does that with `value`).
//  Picking a suggestion (click, or ↑ ↓ + Enter) calls `onPick`, which the
//  page uses to fill in the name and scroll to that company. Esc closes the
//  suggestions, and a second Esc clears the box.
//
//  Built as an ARIA combobox, so screen readers announce the suggestions.
//  The text comes from src/shared/strings.js.
// ─────────────────────────────────────────────────────────────────────────────
import { useId, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { STRINGS } from "../strings.js";

/** How many suggestions show at once. */
const MAX_SUGGESTIONS = 6;

/** Lower-case, accents stripped, so "e" also finds "é". */
export const normalize = (text) =>
  text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

/** Does the company match a search? Matches anywhere in the name. */
export function matchesSearch(company, query) {
  const q = normalize(query);
  return !q || normalize(company.name).includes(q);
}

export default function CompanySearch({ companies, value, onChange, onPick }) {
  const { lang } = useLanguage();
  const t = STRINGS[lang];
  const listId = useId();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);

  const suggestions = useMemo(() => {
    const q = normalize(value);
    if (!q) return [];
    const starts = [];
    const contains = [];
    for (const company of companies) {
      const name = normalize(company.name);
      if (name.startsWith(q)) starts.push(company);
      else if (name.includes(q)) contains.push(company);
    }
    const byName = (a, b) => a.name.localeCompare(b.name);
    return [...starts.sort(byName), ...contains.sort(byName)].slice(0, MAX_SUGGESTIONS);
  }, [companies, value]);

  const showList = open && suggestions.length > 0;

  const pick = (company) => {
    // onPick, when given, fills in the name itself (in the same address
    // update as the scroll target), so it replaces onChange here.
    if (onPick) onPick(company);
    else onChange(company.name);
    setOpen(false);
    setActive(-1);
  };

  const onKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActive((i) => (suggestions.length ? (i + 1) % suggestions.length : -1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      setActive((i) => (suggestions.length ? (i <= 0 ? suggestions.length - 1 : i - 1) : -1));
    } else if (event.key === "Enter") {
      if (showList) {
        event.preventDefault();
        pick(suggestions[active >= 0 ? active : 0]);
      }
    } else if (event.key === "Escape") {
      if (showList) setOpen(false);
      else onChange("");
      setActive(-1);
    }
  };

  // Bold the part of the name that matches what was typed.
  const renderName = (name) => {
    const at = normalize(name).indexOf(normalize(value));
    if (at < 0) return name;
    const end = at + normalize(value).length;
    return (
      <>
        {name.slice(0, at)}
        <strong className="font-semibold text-fg dark:text-white">{name.slice(at, end)}</strong>
        {name.slice(end)}
      </>
    );
  };

  return (
    <div className="relative">
      <label htmlFor={`${listId}-input`} className="sr-only">
        {t.searchLabel}
      </label>
      <Search
        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-muted dark:text-on-dark-3"
        strokeWidth={2}
        aria-hidden="true"
      />
      <input
        id={`${listId}-input`}
        type="search"
        role="combobox"
        aria-expanded={showList}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={showList && active >= 0 ? `${listId}-${active}` : undefined}
        autoComplete="off"
        spellCheck={false}
        placeholder={t.searchPlaceholder}
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
          setOpen(true);
          setActive(-1);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={onKeyDown}
        className="min-h-12 w-full rounded-sm border border-rule bg-white pl-10 pr-3 text-body text-fg placeholder:text-fg-muted transition-colors duration-settle hover:border-navy/60 focus:border-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-orange dark:border-rule-dark dark:bg-ink dark:text-white dark:placeholder:text-on-dark-3 dark:hover:border-white/60 dark:focus:border-white"
      />

      {showList ? (
        <ul
          id={listId}
          role="listbox"
          aria-label={t.searchSuggestions}
          className="absolute left-0 right-0 top-full z-30 mt-1 overflow-hidden rounded-sm border border-rule bg-white py-1 shadow-[0_16px_40px_-20px_rgba(10,22,44,0.4)] dark:border-rule-dark dark:bg-ink"
        >
          {suggestions.map((company, index) => (
            <li
              key={company.id}
              id={`${listId}-${index}`}
              role="option"
              aria-selected={index === active}
              // mousedown, not click: it fires before the input's blur closes the list.
              onMouseDown={(event) => {
                event.preventDefault();
                pick(company);
              }}
              onMouseEnter={() => setActive(index)}
              className={`flex cursor-pointer items-baseline justify-between gap-4 px-3.5 py-2.5 text-body text-fg-muted dark:text-on-dark-2 ${
                index === active ? "bg-navy/[0.06] dark:bg-white/[0.08]" : ""
              }`}
            >
              <span>{renderName(company.name)}</span>
              {company.industry ? (
                <span className="truncate text-small text-fg-muted dark:text-on-dark-3">
                  {company.industry}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
