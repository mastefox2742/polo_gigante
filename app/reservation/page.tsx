import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import ReservationForm from "@/components/ReservationForm";
import { site } from "@/lib/site";
import { IMG } from "@/lib/images";
import {
  IconClock,
  IconPhone,
  IconStar,
  IconChef,
} from "@/components/Icons";

export const metadata: Metadata = {
  title: "Réserver une table",
  description: `Réservez votre table chez ${site.name} en ligne, en moins d'une minute.`,
};

const perks = [
  { icon: IconChef, text: "Table préparée selon vos envies" },
  { icon: IconStar, text: "Accueil teranga garanti" },
  { icon: IconClock, text: "Confirmation rapide par notre équipe" },
];

export default function ReservationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Réservation"
        title="Réservez votre table"
        subtitle="Quelques clics suffisent pour vous garantir la meilleure place."
        image={IMG.heroAlt}
      />

      <section className="bg-cream py-20">
        <div className="wrap grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Colonne info */}
          <div>
            <Reveal>
              <p className="eyebrow">Pourquoi réserver</p>
              <h2 className="mt-4 text-3xl font-semibold text-ink">
                On vous garde la meilleure table
              </h2>
              <p className="mt-4 text-muted">
                Pour être sûr d&apos;avoir de la place, surtout le week-end,
                réservez à l&apos;avance. C&apos;est simple, rapide et sans
                engagement.
              </p>
            </Reveal>

            <ul className="mt-8 space-y-4">
              {perks.map((p, i) => (
                <Reveal key={i} delay={i * 90}>
                  <li className="flex items-center gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold/15 text-[#9a7420]">
                      <p.icon width={20} height={20} />
                    </span>
                    <span className="text-ink">{p.text}</span>
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={160}>
              <div className="bg-warm-dark texture relative mt-10 overflow-hidden rounded-[var(--radius-xl2)] p-7 text-cream">
                <h3 className="relative flex items-center gap-2 text-lg font-semibold">
                  <IconClock width={18} height={18} className="text-gold-soft" />
                  Horaires
                </h3>
                <ul className="relative mt-4 space-y-2 text-sm">
                  {site.hours.map((h) => (
                    <li key={h.day} className="flex justify-between gap-4">
                      <span className="text-cream/70">{h.day}</span>
                      <span
                        className={
                          h.closed ? "text-terracotta-soft" : "text-cream"
                        }
                      >
                        {h.value}
                      </span>
                    </li>
                  ))}
                </ul>
                <a
                  href={site.phoneHref}
                  className="relative mt-5 flex items-center gap-2 text-gold-bright"
                >
                  <IconPhone width={16} height={16} />
                  Ou appelez-nous : {site.phone}
                </a>
              </div>
            </Reveal>
          </div>

          {/* Formulaire */}
          <Reveal delay={120}>
            <ReservationForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
