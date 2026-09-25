// ─────────────────────────────────────────────────────────────────────────────
//  HHS LOGO  —  the university wordmark, top left on every page.
//
//  One component so the hero and the inner pages can never drift apart.
//
//  ─── WHY THE width/height ATTRIBUTES MATTER ─────────────────────────────────
//  The file is 1127 × 401 (a wide wordmark, not a square icon). Passing its
//  real pixel size tells the browser the shape BEFORE the image downloads, so
//  it reserves exactly the right box. Without them the header visibly reflows
//  when the logo arrives — the logo appears to jump or sit at the wrong size
//  for a moment.
//
//  The CSS height below is what actually sizes it on screen; `w-auto` keeps
//  the aspect ratio. Do not add a max-width: at this ratio the height is
//  always the limiting dimension, so a max-width only adds a second rule that
//  can contradict the first.
// ─────────────────────────────────────────────────────────────────────────────
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.jsx";
import { STRINGS } from "../strings.js";

/** The file's true pixel size. Update both if the file is ever replaced. */
const INTRINSIC_WIDTH = 1127;
const INTRINSIC_HEIGHT = 401;

//  Sized so the second line of the wordmark stays legible: below roughly
//  44px tall "UNIVERSITY OF APPLIED SCIENCES" turns into grey mush.
const SIZES = {
  /** Home page hero. */
  hero: "h-11 sm:h-12",
  /** Inner page headers, which have a shorter band. */
  compact: "h-9 sm:h-10"
};

/**
 * The logo ALWAYS goes to "/", never to the current edition's home. From the
 * March archive there is otherwise no way back to the live site, which is the
 * one thing a visitor expects a logo to do.
 */
export default function HhsLogo({ size = "hero" }) {
  const to = "/";
  const { lang } = useLanguage();
  const t = STRINGS[lang];

  return (
    <Link
      to={to}
      aria-label={t.backToHome}
      className="inline-flex shrink-0 rounded-sm transition-opacity duration-settle ease-settle hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
    >
      <img
        src="/HHS/HHS.png"
        alt={t.hhsLogoAlt}
        width={INTRINSIC_WIDTH}
        height={INTRINSIC_HEIGHT}
        className={`${SIZES[size] ?? SIZES.hero} w-auto`}
        loading="eager"
        decoding="async"
      />
    </Link>
  );
}
