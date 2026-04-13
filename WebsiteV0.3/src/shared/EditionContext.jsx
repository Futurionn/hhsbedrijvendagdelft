import { createContext, useContext, useEffect, useMemo, useState } from "react";

const EDITION_STORAGE_KEY = "tis-career-day-edition";

export const EDITIONS = {
  NOVEMBER_2026: "november-2026",
  MARCH_2026: "march-2026"
};

const EDITION_OPTIONS = [
  { id: EDITIONS.NOVEMBER_2026, label: "November 2026" },
  { id: EDITIONS.MARCH_2026, label: "March 2026" }
];

const EditionContext = createContext(null);

function getInitialEdition() {
  if (typeof window === "undefined") return EDITIONS.NOVEMBER_2026;

  const storedEdition = window.localStorage.getItem(EDITION_STORAGE_KEY);
  const isKnownEdition = EDITION_OPTIONS.some((option) => option.id === storedEdition);
  return isKnownEdition ? storedEdition : EDITIONS.NOVEMBER_2026;
}

export function EditionProvider({ children }) {
  const [edition, setEdition] = useState(getInitialEdition);

  useEffect(() => {
    window.localStorage.setItem(EDITION_STORAGE_KEY, edition);
  }, [edition]);

  const value = useMemo(
    () => ({
      edition,
      setEdition,
      editionOptions: EDITION_OPTIONS
    }),
    [edition]
  );

  return <EditionContext.Provider value={value}>{children}</EditionContext.Provider>;
}

export function useEdition() {
  const value = useContext(EditionContext);

  if (!value) {
    throw new Error("useEdition must be used within an EditionProvider");
  }

  return value;
}
