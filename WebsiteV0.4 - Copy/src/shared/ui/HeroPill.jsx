// ─────────────────────────────────────────────────────────────────────────────
//  HERO PILL  —  kept only so the frozen March 2026 page keeps working.
//
//  The hero no longer uses rounded chips. Its facts are label / value /
//  detail rows — see ./MetaRow.jsx, which new editions should use directly.
//  This wrapper maps the old props onto a MetaRow:
//
//      icon     -> shown small where the label would be
//      label    -> the value
//      tooltip  -> the visible line underneath (a hover-only tooltip was
//                  invisible on phones; a visible line works everywhere)
// ─────────────────────────────────────────────────────────────────────────────
import MetaRow from "./MetaRow.jsx";

/** The March data prefixes its address with a pin emoji; the row has no need. */
const stripLeadingEmoji = (text) =>
  typeof text === "string" ? text.replace(/^\p{Extended_Pictographic}️?\s*/u, "") : text;

export default function HeroPill({ icon, label, tooltip, onClick, href }) {
  return (
    <MetaRow
      icon={icon}
      value={label}
      detail={stripLeadingEmoji(tooltip)}
      onClick={onClick}
      href={href}
    />
  );
}
