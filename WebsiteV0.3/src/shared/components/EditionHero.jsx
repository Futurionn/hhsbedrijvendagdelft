// ─────────────────────────────────────────────────────────────────────────────
//  EDITION HERO  —  the banner at the top of every edition's home page.
//
//  This is the SHELL only: the background, the top bar, the title block and
//  the wave at the bottom. What goes inside is passed in, so each edition can
//  show different pills and buttons without duplicating the whole banner.
//
//      <EditionHero
//        edition={edition}
//        kicker="Novembereditie"
//        title="Bedrijvendag"
//        year="2026"
//        subtitle="..."
//        pills={<>...<HeroPill /> x3 ...</>}
//        actions={<><Button /><Button /></>}
//        notice={<HeroNotice />}          // optional
//      />
//
//  The words come from the edition's config file, never from here.
//
//  ─── ABOUT THE BACKGROUND ───────────────────────────────────────────────────
//  A flat navy base with two soft light sources offset from the centre, rather
//  than a left-to-right gradient with drifting circles on top. Off-centre
//  lighting gives the panel depth without anything moving, which means there
//  is no animation to disable for reduced-motion visitors and nothing that
//  competes with the headline for attention.
// ─────────────────────────────────────────────────────────────────────────────
import { m } from "framer-motion";
import { REVEAL } from "../context/MotionProvider.jsx";
import FloatingOrbs from "../ui/FloatingOrbs.jsx";
import Wave from "../ui/Wave.jsx";

/** Two off-centre radial glows over the navy base. Purely atmospheric. */
function HeroLighting() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Warm key light, upper right — picks up the orange accent. */}
      <div
        className="absolute -right-[10%] -top-[30%] h-[36rem] w-[36rem] rounded-full opacity-[0.16] blur-3xl"
        style={{
          background: "radial-gradient(circle, #f07c00 0%, rgba(240,124,0,0) 70%)"
        }}
      />
      {/* Cool fill, lower left — keeps the left edge from going flat. */}
      <div
        className="absolute -bottom-[40%] -left-[15%] h-[40rem] w-[40rem] rounded-full opacity-25 blur-3xl"
        style={{
          background: "radial-gradient(circle, #2a4a6f 0%, rgba(42,74,111,0) 70%)"
        }}
      />
    </div>
  );
}

export default function EditionHero({
  kicker,
  title,
  year,
  subtitle,
  pills,
  actions,
  notice
}) {
  return (
    <section className="relative overflow-hidden bg-navy">
      <HeroLighting />
      <FloatingOrbs />

      {/* pt-28 clears the pinned header, which floats over this panel. */}
      <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-28 md:pb-28 md:pt-32">
        <m.div {...REVEAL} className="mx-auto max-w-3xl text-center">
          {kicker ? (
            <p className="text-kicker uppercase text-white/55">{kicker}</p>
          ) : null}

          <h1 className="mt-4 text-display text-white">
            <span className="text-orange">T.I.S.</span> {title}{" "}
            <span className="text-orange">{year}</span>
          </h1>

          {/* Slightly narrower than the headline so the paragraph has a
              comfortable measure instead of running the full width. */}
          <p className="mx-auto mt-5 max-w-xl text-lead text-white/70">{subtitle}</p>

          {pills ? (
            <div className="mt-9 flex flex-wrap items-center justify-center gap-2.5">
              {pills}
            </div>
          ) : null}

          {actions ? (
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {actions}
            </div>
          ) : null}

          {notice ? <div className="mt-12">{notice}</div> : null}
        </m.div>
      </div>

      <Wave size="tall" />
    </section>
  );
}

/**
 * The translucent panel that can sit at the bottom of a hero, for
 * announcements like "the March edition is archived".
 */
export function HeroNotice({ title, children }) {
  return (
    <div className="mx-auto max-w-xl rounded-2xl bg-white/[0.07] px-5 py-4 text-left ring-1 ring-inset ring-white/12 backdrop-blur-md">
      <div className="text-kicker uppercase text-orange/90">{title}</div>
      <div className="mt-2 text-body text-white/75">{children}</div>
    </div>
  );
}
