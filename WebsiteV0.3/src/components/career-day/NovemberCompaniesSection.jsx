import { m } from "framer-motion";
import { BriefcaseBusiness, CalendarClock, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../shared/LanguageContext.jsx";
import { COMPANY_REGISTRATION_ROUTE } from "../../shared/companyRegistration.js";

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

function UpdateCard({ icon: Icon, title, body }) {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm shadow-black/5 dark:border-white/10 dark:bg-white/5 dark:shadow-black/20">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange/10">
        <Icon className="h-6 w-6 text-orange" />
      </div>
      <h3 className="mt-5 text-xl font-extrabold text-navy dark:text-white">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{body}</p>
    </div>
  );
}

export default function NovemberCompaniesSection() {
  const { lang } = useLanguage();

  const title = lang === "nl" ? "November 2026 update" : "November 2026 update";
  const subtitle =
    lang === "nl"
      ? "De lijst met deelnemende bedrijven en de exacte datum volgen later. Tot die tijd staat deze editie alvast klaar als voorlopige informatiepagina."
      : "The participating companies and exact event date will be shared later. Until then, this edition serves as a preliminary information page.";
  const cards =
    lang === "nl"
      ? [
          {
            icon: CalendarClock,
            title: "Datum en planning",
            body: "De editie staat gepland voor november 2026. Zodra de definitieve datum en tijden vastliggen, werken we deze pagina direct bij."
          },
          {
            icon: FileText,
            title: "Bedrijven volgen later",
            body: "De bedrijvenlijst voor november is nog niet gepubliceerd. Daarom tonen we hier nog geen stands, plattegrond of deelnemersoverzicht."
          },
          {
            icon: BriefcaseBusiness,
            title: "Interesse doorgeven",
            body: "Wilt u als bedrijf betrokken blijven bij de novembereditie? Gebruik de knop om uw gegevens achter te laten via het interesseformulier."
          }
        ]
      : [
          {
            icon: CalendarClock,
            title: "Date and schedule",
            body: "The edition is planned for November 2026. As soon as the final date and timing are confirmed, we will update this page."
          },
          {
            icon: FileText,
            title: "Companies will follow later",
            body: "The November company list has not been published yet, so this edition currently does not show stands, a map, or a participant overview."
          },
          {
            icon: BriefcaseBusiness,
            title: "Share your interest",
            body: "Would you like to stay involved as a company for the November edition? Use the button to leave your details through the interest form."
          }
        ];

  return (
    <section
      id="november-update"
      className="scroll-mt-6 bg-white py-20 dark:bg-slate-950"
    >
      <m.div {...reveal} className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold tracking-widest text-orange">
            {lang === "nl" ? "VOORLOPIGE INFO" : "PRELIMINARY INFO"}
          </p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-navy dark:text-white md:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-300">
            {subtitle}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {cards.map((card, index) => (
            <m.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <UpdateCard {...card} />
            </m.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to={COMPANY_REGISTRATION_ROUTE}
            className="inline-flex items-center justify-center rounded-full bg-orange px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-[#f07c00]/25 transition-all duration-500 hover:scale-105"
          >
            {lang === "nl" ? "Interesseformulier openen" : "Open interest form"}
          </Link>
        </div>
      </m.div>
    </section>
  );
}
