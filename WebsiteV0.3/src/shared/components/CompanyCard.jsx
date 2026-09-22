// ─────────────────────────────────────────────────────────────────────────────
//  COMPANY CARD  —  the card that scrolls past on the home page.
//
//  Closed it shows just the logo. Hovering (or tapping, on a phone) expands it
//  to reveal the description, sector, size, region, stand number and a link to
//  the company's website.
//
//  Only ONE card is open at a time. The parent (CompanyMarquee) owns that
//  state and tells each card whether it is the open one — that is what `isOpen`,
//  `onOpen` and `onClose` are for.
//
//  Card colours come from src/shared/companyStyles.js, driven by the
//  company's `logoTone` field.
// ─────────────────────────────────────────────────────────────────────────────
import { m } from "framer-motion";
import { Briefcase, ExternalLink, Globe2, Users2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { useIsTouchDevice } from "../hooks/useIsTouchDevice.js";
import { STRINGS } from "../strings.js";
import { surfaceClasses, surfaceTextClasses } from "../companyStyles.js";
import CompanyLogo from "../ui/CompanyLogo.jsx";

/** One "Sector: Machinebouw" line inside the opened card. */
function DetailRow({ icon: Icon, label, value, labelClass, valueClass }) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="h-4 w-4 shrink-0 text-orange" aria-hidden="true" />
      <span className={`font-semibold ${labelClass}`}>{label}:</span>
      <span className={valueClass}>{value}</span>
    </div>
  );
}

export default function CompanyCard({
  company,
  isOpen,
  isMuted = false,
  showHoverHint = false,
  onOpen,
  onClose,
  onToggle
}) {
  const { lang } = useLanguage();
  const t = STRINGS[lang];
  const isTouch = useIsTouchDevice();

  const text = surfaceTextClasses(company.logoTone);
  const standValue = Number.isInteger(company.stand) ? `#${company.stand}` : t.tbd;

  // On touch the parent toggles with no delay; hover uses onOpen/onClose,
  // where closing is deliberately delayed (see useHoverCard.js).
  const toggle = () => onToggle?.();

  return (
    <m.div
      className={`relative h-full cursor-pointer overflow-hidden rounded-3xl border shadow-lg transition-opacity duration-300 ${surfaceClasses(
        company.logoTone
      )} ${isMuted ? "opacity-80" : "opacity-100"}`}
      // One input model per device, never both.
      //
      // With a mouse, hovering opens and closes the card.
      //
      // On a touch screen, tapping toggles it. The hover handlers MUST be
      // disabled there: a tap also emits pointerenter and pointerleave, so
      // leaving them attached makes the card open and immediately close again,
      // and the tap appears to do nothing.
      onHoverStart={isTouch ? undefined : onOpen}
      onHoverEnd={isTouch ? undefined : onClose}
      onClick={isTouch ? toggle : undefined}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggle();
        }
      }}
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      aria-label={company.name}
      // Also disabled on touch: a tap fires pointerenter, which would scale the
      // card up between finger-down and finger-up. The card moving under the
      // finger makes the browser cancel the click, so the tap does nothing.
      whileHover={isTouch ? undefined : { scale: 1.02 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{ transformOrigin: "center" }}
    >
      <div className="p-8">
        <div className="flex items-center justify-center p-6">
          <CompanyLogo company={company} size="card" />
        </div>

        {!isOpen && showHoverHint ? (
          <p
            className={`mt-1 text-center text-xs font-semibold uppercase tracking-wider ${text.secondary}`}
          >
            {t.hoverForMoreInfo}
          </p>
        ) : null}

        {/* Animating height from 0 to "auto" is what makes the card unfold. */}
        <m.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="overflow-hidden"
        >
          <div className="pt-7">
            <h3 className={`text-heading ${text.primary}`}>
              {company.name}
            </h3>
            <p className={`mt-3 text-sm leading-relaxed ${text.secondary}`}>
              {company.description}
            </p>

            <div className={`mt-6 space-y-3 text-sm ${text.body}`}>
              <DetailRow
                icon={Briefcase}
                label={t.industry}
                value={company.industry || t.tbd}
                labelClass={text.body}
                valueClass={text.secondary}
              />
              <DetailRow
                icon={Users2}
                label={t.employees}
                value={company.employees || t.tbd}
                labelClass={text.body}
                valueClass={text.secondary}
              />
              <DetailRow
                icon={Globe2}
                label={t.region}
                value={company.location || t.tbd}
                labelClass={text.body}
                valueClass={text.secondary}
              />
            </div>

            <div className="mt-6">
              <p className={`text-sm font-semibold ${text.primary}`}>{t.stand}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="min-w-[3.25rem] rounded-full bg-orange px-3 py-1 text-center text-caption font-semibold text-navy-deep">
                  {standValue}
                </span>
              </div>
            </div>

            <a
              href={company.website}
              target="_blank"
              rel="noreferrer"
              // Without this, clicking the link would also toggle the card.
              onClick={(event) => event.stopPropagation()}
              className="mt-6 inline-flex items-center gap-2 font-semibold text-orange-deep transition-[gap,color] duration-settle ease-settle hover:gap-3 dark:text-orange"
            >
              {t.visitWebsite}
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </m.div>
      </div>

      {/* The thin gradient bar that wipes in along the bottom when open. */}
      <m.div
        className="absolute bottom-0 left-0 h-1 w-full origin-left bg-gradient-to-r from-orange via-orange-light to-navy"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isOpen ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </m.div>
  );
}
