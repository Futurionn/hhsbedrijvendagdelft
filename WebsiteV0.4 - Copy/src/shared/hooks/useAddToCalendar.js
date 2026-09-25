// ─────────────────────────────────────────────────────────────────────────────
//  "ADD TO CALENDAR"
//
//  Sends the visitor to their calendar app with the event pre-filled.
//
//  Apple devices get the .ics file, because iOS and macOS open it straight
//  into Apple Calendar. Everyone else is sent to Google Calendar's prefilled
//  "new event" screen, which works without downloading anything.
//
//  Reads the `calendar` block of an edition config:
//      calendar: {
//        eventName: "T.I.S. Bedrijvendag 2026",
//        startUtc:  "20261126T120000Z",   // YYYYMMDDTHHMMSSZ, always UTC
//        endUtc:    "20261126T180000Z",
//        icsFile:   "/tis-bedrijvendag-november-2026.ics"
//      }
//
//  KEEP THE .ics FILE AND THESE TIMES IN SYNC. They are two separate sources
//  and nothing checks them against each other.
// ─────────────────────────────────────────────────────────────────────────────
import { useCallback } from "react";
import { VENUE } from "../../site.config.js";

function isAppleDevice() {
  if (typeof navigator === "undefined") return false;
  return /Macintosh|Mac OS X|iPhone|iPad|iPod/.test(navigator.userAgent || "");
}

/**
 * @param {object} calendar     the edition config's `calendar` block
 * @param {string} description  one line describing the event
 * @returns {null|() => void}   null when the edition has no date yet, so the
 *                              caller can render plain text instead of a button
 */
export function useAddToCalendar(calendar, description) {
  const isReady = Boolean(calendar?.startUtc && calendar?.endUtc);

  const addToCalendar = useCallback(() => {
    if (typeof window === "undefined" || !isReady) return;

    if (isAppleDevice() && calendar.icsFile) {
      window.location.href = calendar.icsFile;
      return;
    }

    const googleUrl =
      "https://calendar.google.com/calendar/render?action=TEMPLATE" +
      `&text=${encodeURIComponent(calendar.eventName)}` +
      `&dates=${calendar.startUtc}/${calendar.endUtc}` +
      `&details=${encodeURIComponent(description)}` +
      `&location=${encodeURIComponent(VENUE.address)}` +
      "&ctz=Europe/Amsterdam";

    window.open(googleUrl, "_blank", "noopener");
  }, [calendar, description, isReady]);

  return isReady ? addToCalendar : null;
}
