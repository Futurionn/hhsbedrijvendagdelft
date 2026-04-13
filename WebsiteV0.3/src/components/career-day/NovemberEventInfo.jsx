import { m } from "framer-motion";
import {
  BriefcaseBusiness,
  CalendarDays,
  MapPinned,
  Users
} from "lucide-react";
import { useLanguage } from "../../shared/LanguageContext.jsx";

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
      <p className="mt-3 text-sm leading-relaxed text-gray-600 transition-all duration-500 group-hover:text-white/80 dark:text-gray-300">
        {body}
      </p>
    </div>
  );
}

export default function NovemberEventInfo() {
  const { lang } = useLanguage();

  const titleA = lang === "nl" ? "Wat we nu al" : "What we already";
  const titleB = lang === "nl" ? "kunnen delen" : "know";
  const body =
    lang === "nl"
      ? "De novembereditie krijgt dezelfde vertrouwde uitstraling als de maarteditie, maar blijft voorlopig bewust compact zolang de laatste details nog ontbreken."
      : "The November edition keeps the same familiar look and feel as the March edition, while intentionally staying compact until the final details are confirmed.";
  const features =
    lang === "nl"
      ? [
          {
            icon: CalendarDays,
            title: "November 2026",
            body: "De editie staat gepland voor november 2026. Zodra de definitieve datum bekend is, komt die meteen op deze pagina."
          },
          {
            icon: MapPinned,
            title: "HHS Delft",
            body: "De locatie blijft voorlopig De Haagse Hogeschool in Delft: Rotterdamseweg 137, 2628 AL Delft."
          },
          {
            icon: Users,
            title: "Voor studenten",
            body: "Reken opnieuw op bedrijven, netwerkgesprekken en carrierekansen zodra de deelnemers bevestigd zijn."
          },
          {
            icon: BriefcaseBusiness,
            title: "Voor bedrijven",
            body: "Bedrijven kunnen zich alvast melden voor deelname aan de novembereditie via de registratieknop op deze pagina."
          }
        ]
      : [
          {
            icon: CalendarDays,
            title: "November 2026",
            body: "The edition is planned for November 2026. As soon as the final date is confirmed, it will be added here immediately."
          },
          {
            icon: MapPinned,
            title: "THUAS Delft",
            body: "The provisional location remains The Hague University of Applied Sciences in Delft: Rotterdamseweg 137, 2628 AL Delft."
          },
          {
            icon: Users,
            title: "For students",
            body: "Expect companies, networking conversations, and career opportunities again once the participants have been confirmed."
          },
          {
            icon: BriefcaseBusiness,
            title: "For companies",
            body: "Companies can already express interest in joining the November edition through the registration button on this page."
          }
        ];

  return (
    <section id="about" className="bg-white py-20 dark:bg-slate-950">
      <m.div {...reveal} className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-sm font-semibold tracking-widest text-orange">
              {lang === "nl" ? "WAT WE WETEN" : "WHAT WE KNOW"}
            </p>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-navy dark:text-white md:text-5xl">
              {titleA} <span className="text-orange">{titleB}</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              {body}
            </p>

            <div className="mt-10 rounded-3xl border border-orange/20 bg-orange/5 p-6 dark:border-orange/20 dark:bg-orange/10">
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-orange">
                {lang === "nl" ? "Let op" : "Please note"}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-200">
                {lang === "nl"
                  ? "Alle informatie op deze pagina is voorlopig en kan nog veranderen zodra meer details over de novembereditie bekend zijn."
                  : "All information on this page is preliminary and may still change as more details about the November edition become available."}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {features.map((feature, index) => (
              <m.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <FeatureCard {...feature} />
              </m.div>
            ))}
          </div>
        </div>
      </m.div>
    </section>
  );
}
