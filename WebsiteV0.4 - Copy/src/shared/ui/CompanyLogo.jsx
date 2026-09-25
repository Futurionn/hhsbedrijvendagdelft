// ─────────────────────────────────────────────────────────────────────────────
//  COMPANY LOGO  —  shows a company's logo image, or falls back to its
//  initials in a coloured box if no logo file is set.
//
//  `size="card"` is the big version on the home-page cards.
//  `size="row"`  is the small version in the companies list.
// ─────────────────────────────────────────────────────────────────────────────
import { surfaceTextClasses } from "../companyStyles.js";

export default function CompanyLogo({ company, size = "card" }) {
  const isCard = size === "card";

  if (company.logo) {
    return (
      <img
        src={company.logo}
        alt={`${company.name} logo`}
        className={
          isCard
            ? "h-14 w-auto max-w-[220px] object-contain"
            : "h-10 w-full max-w-full object-contain"
        }
        loading="lazy"
      />
    );
  }

  // No logo file: build initials from the first two words of the name.
  const initials =
    company.name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase())
      .join("") || company.name.slice(0, 2).toUpperCase();

  return (
    <div
      className={`font-extrabold tracking-tight ${
        isCard ? "text-3xl" : "text-lg"
      } ${surfaceTextClasses(company.logoTone).primary}`}
    >
      {initials}
    </div>
  );
}
