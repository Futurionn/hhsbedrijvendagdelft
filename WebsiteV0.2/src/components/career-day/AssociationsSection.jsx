import { m } from "framer-motion";
import { useLanguage } from "../../shared/LanguageContext.jsx";
import { STRINGS } from "../../shared/strings.js";
import { ASSOCIATIONS } from "../../data/associations.js";

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

function Starfield() {
  const dots = Array.from({ length: 140 }, (_, i) => i);

  const rand = (seed) => {
    let t = seed + 0x6d2b79f5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* slow drift layer (moves the whole starfield) */}
      <m.div
        className="absolute inset-0"
        animate={{ x: [-20, 30, -20], y: [15, -20, 10] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {dots.map((i) => {
          const r1 = rand(i * 11.7);
          const r2 = rand(i * 19.3);
          const r3 = rand(i * 29.1);
          const r4 = rand(i * 41.9);

          const size = r3 > 0.97 ? 3 : r3 > 0.86 ? 2 : 1;
          const opacityBase = 0.35 + r4 * 0.45;
          const duration = 2.2 + r3 * 3.6;
          const delay = r2 * 2.5;
          const glow =
            size >= 2
              ? "drop-shadow(0 0 10px rgba(255,255,255,0.55))"
              : "drop-shadow(0 0 6px rgba(255,255,255,0.25))";

          return (
            <m.span
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                left: `${r1 * 100}%`,
                top: `${r2 * 100}%`,
                width: `${size}px`,
                height: `${size}px`,
                filter: glow
              }}
              initial={{ opacity: opacityBase }}
              animate={{ opacity: [opacityBase * 0.35, opacityBase * 1.25, opacityBase * 0.35] }}
              transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
            />
          );
        })}
      </m.div>
    </div>
  );
}

function AssociationCard({ item }) {
  const href = item.website.startsWith("http")
    ? item.website
    : `https://${item.website}`;

  const logoPositionClass =
    item.logoPosition === "right"
      ? "object-right"
      : item.logoPosition === "left"
        ? "object-left"
        : "object-center";

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group block rounded-3xl border border-white/10 bg-white/5 p-7 shadow-lg shadow-black/20 backdrop-blur-sm transition-all duration-500 hover:bg-white/10 hover:shadow-[#f07c00]/10"
    >
      <div className="flex items-stretch justify-between gap-6">
        <div className="min-w-0">
          <div className="text-xl font-extrabold text-white">{item.name}</div>
          <div className="mt-2 text-sm text-white/60">{item.field}</div>
          <div className="mt-5 text-sm font-semibold text-white/80 opacity-70 transition-all duration-500 group-hover:opacity-100">
            {item.website}
          </div>
        </div>

        {item.logoSrc ? (
          <div className="flex w-[150px] flex-none items-center justify-end overflow-hidden sm:w-[140px]">
            <img
              src={item.logoSrc}
              alt={`${item.name} logo`}
              className={`h-20 w-full object-contain ${logoPositionClass} opacity-90 transition-all duration-500 group-hover:opacity-100`}
              loading="lazy"
              decoding="async"
            />
          </div>
        ) : null}
      </div>
    </a>
  );
}

export default function AssociationsSection() {
  const { lang } = useLanguage();
  const t = STRINGS[lang];

  return (
    <section
      id="associations"
      className="relative overflow-hidden bg-gradient-to-b from-[#0f1f36] via-[#162844] to-[#1e3a5f] py-20"
    >
      <Starfield />

      <m.div {...reveal} className="relative mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold tracking-widest text-white/60">
            {t.associationsKicker}
          </p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            {t.associationsTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            {t.associationsSubtitle}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ASSOCIATIONS.map((item, index) => (
            <m.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <AssociationCard item={item} />
            </m.div>
          ))}
        </div>
      </m.div>
    </section>
  );
}
