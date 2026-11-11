import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";
import { IMG } from "@/lib/images";
import {
  IconMapPin,
  IconPhone,
  IconMail,
  IconClock,
  IconInstagram,
  IconFacebook,
  IconWhatsApp,
  IconArrow,
} from "@/components/Icons";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contactez ${site.name} : adresse, horaires, téléphone et réservation.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Nous contacter"
        title="Contact & accès"
        subtitle="Une question, une grande tablée, un événement ? Écrivez-nous ou passez nous voir."
        image={IMG.table}
      />

      <section className="bg-cream py-20">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          {/* Infos */}
          <div>
            <Reveal>
              <h2 className="text-3xl font-semibold text-ink">
                Venez comme vous êtes
              </h2>
              <p className="mt-4 max-w-md text-muted">
                Le teranga sénégalais, c&apos;est avant tout l&apos;art de bien
                recevoir. Notre équipe vous attend avec le sourire.
              </p>
            </Reveal>

            <div className="mt-8 space-y-5">
              {[
                {
                  icon: IconMapPin,
                  label: "Adresse",
                  value: (
                    <>
                      {site.address.line1}
                      <br />
                      {site.address.line2}, {site.address.country}
                    </>
                  ),
                  href: site.mapsLink,
                },
                {
                  icon: IconPhone,
                  label: "Téléphone",
                  value: site.phone,
                  href: site.phoneHref,
                },
                {
                  icon: IconMail,
                  label: "E-mail",
                  value: site.email,
                  href: `mailto:${site.email}`,
                },
              ].map((c, i) => (
                <Reveal key={c.label} delay={i * 90}>
                  <a
                    href={c.href}
                    className="card flex items-start gap-4 p-5 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold/15 text-[#9a7420]">
                      <c.icon width={20} height={20} />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-widest text-muted">
                        {c.label}
                      </span>
                      <span className="mt-0.5 block font-medium text-ink">
                        {c.value}
                      </span>
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>

            {/* Horaires */}
            <Reveal delay={120}>
              <div className="card mt-6 p-6">
                <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#9a7420]">
                  <IconClock width={16} height={16} /> Horaires d&apos;ouverture
                </h3>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {site.hours.map((h) => (
                    <li
                      key={h.day}
                      className="flex justify-between gap-4 border-b border-line pb-2.5 last:border-0 last:pb-0"
                    >
                      <span className="text-muted">{h.day}</span>
                      <span
                        className={
                          h.closed ? "text-terracotta" : "font-medium text-ink"
                        }
                      >
                        {h.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Réseaux */}
            <Reveal delay={160}>
              <div className="mt-6 flex items-center gap-3">
                <span className="text-sm text-muted">Suivez-nous :</span>
                {[
                  { icon: IconInstagram, href: site.social.instagram, l: "Instagram" },
                  { icon: IconFacebook, href: site.social.facebook, l: "Facebook" },
                  { icon: IconWhatsApp, href: site.social.whatsapp, l: "WhatsApp" },
                ].map((s) => (
                  <a
                    key={s.l}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.l}
                    className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink transition hover:border-gold hover:bg-gold hover:text-espresso"
                  >
                    <s.icon width={18} height={18} />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Carte + CTA */}
          <div>
            <Reveal>
              <div className="overflow-hidden rounded-[var(--radius-xl2)] border border-line shadow-[var(--shadow-card)]">
                <iframe
                  title="Localisation du restaurant"
                  src={site.mapsEmbed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-[380px] w-full border-0"
                />
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="bg-warm-dark texture relative mt-6 overflow-hidden rounded-[var(--radius-xl2)] p-8 text-cream">
                <h3 className="relative text-2xl font-semibold">
                  Réservez votre table
                </h3>
                <p className="relative mt-2 text-cream/75">
                  Gagnez du temps : réservez en ligne en moins d&apos;une minute.
                </p>
                <Link
                  href="/reservation"
                  className="btn btn-gold relative mt-6"
                >
                  Réserver maintenant
                  <IconArrow width={18} height={18} />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
