import { m } from "framer-motion";
import { Users, Presentation, Coffee, FileText } from "lucide-react";
import { useLanguage } from "../../shared/LanguageContext.jsx";
import { STRINGS } from "../../shared/strings.js";

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

function FeatureCard({ icon: Icon, title, body }) {
  return (
    <div className="group flex h-full flex-col rounded-3xl bg-gray-50 p-7 transition-all duration-500 hover:bg-navy hover:shadow-lg hover:shadow-[#f07c00]/15 dark:bg-white/5 dark:hover:bg-navy">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange/10 transition-all duration-500 group-hover:bg-white/10">
        <Icon className="h-6 w-6 text-orange transition-all duration-500 group-hover:text-orange" />
      </div>
      <h4 className="mt-5 text-lg font-extrabold text-navy transition-all duration-500 group-hover:text-white dark:text-white">
        {title}
      </h4>
      <div className="mt-3 space-y-2 text-sm leading-relaxed text-gray-600 transition-all duration-500 group-hover:text-white/80 dark:text-gray-300">
        {body}
      </div>
    </div>
  );
}

export default function EventInfo() {
  const { lang } = useLanguage();
  const t = STRINGS[lang];

  const features =
    lang === "nl"
      ? [
          {
            icon: Coffee,
            title: "Planning",
            body: (
              <>
                <div>
                  <strong className="font-semibold text-navy dark:text-white group-hover:text-white">13:00 - 16:00:</strong>{" "}
                  Rondlopen & ontdekken 
                </div>
                <div>
                  <strong className="font-semibold text-navy dark:text-white group-hover:text-white">16:00 - 19:00:</strong>{" "}
                  Netwerkborrel
                </div>
              </>
            )
          },
          {
            icon: Users,
            title: "Netwerksessies",
            body: "Kom direct in contact met recruiters en professionals van topbedrijven."
          },
          {
            icon: Presentation,
            title: "Bedrijfspresentaties",
            body: "Volg inspirerende talks en leer over bedrijfscultuur en kansen."
          },

          {
            icon: FileText,
            title: "CV-check",
            body: "Krijg feedback op je cv van professionals en HR-specialisten."
          }
        ]
      : [
          {
            icon: Coffee,
            title: "Schedule",
            body: (
              <>
                <div>
                  <strong className="font-semibold text-navy dark:text-white group-hover:text-white">13:00 - 16:00:</strong>{" "}
                  Networking & exploring / conversations with companies.
                </div>
                <div>
                  <strong className="font-semibold text-navy dark:text-white group-hover:text-white">16:00 - 19:00:</strong>{" "}
                  Networking drinks.
                </div>
              </>
            )
          },
          {
            icon: Users,
            title: "Networking sessions",
            body: "Connect directly with recruiters and professionals from top companies."
          },
          {
            icon: Presentation,
            title: "Company presentations",
            body: "Attend talks and learn about company culture and opportunities."
          },
          {
            icon: FileText,
            title: "CV review",
            body: "Get professional feedback on your resume from HR specialists."
          }
        ];

  return (
    <section id="about" className="bg-white py-20 dark:bg-slate-950">
      <m.div {...reveal} className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-sm font-semibold tracking-widest text-orange">
              {t.aboutKicker}
            </p>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-navy dark:text-white md:text-5xl">
              {t.aboutTitleA}{" "}
              <span className="text-orange">{t.aboutTitleB}</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              {t.aboutBody}
            </p>

            <div className="mt-10">
              <div className="text-4xl font-extrabold text-navy dark:text-white">20+</div>
              <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">{t.statsCompanies}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {features.map((f, idx) => (
              <m.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <FeatureCard icon={f.icon} title={f.title} body={f.body} />
              </m.div>
            ))}
          </div>
        </div>
      </m.div>
    </section>
  );
}
