import Link from "next/link";
import { nav, site } from "@/lib/site";
import Logo from "./Logo";
import {
  IconMapPin,
  IconPhone,
  IconMail,
  IconClock,
  IconInstagram,
  IconFacebook,
  IconWhatsApp,
} from "./Icons";

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-warm-dark texture relative text-cream">
      <div className="wrap relative grid gap-12 py-16 md:grid-cols-4">
        {/* Marque */}
        <div className="md:col-span-1">
          <Logo variant="light" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/70">
            {site.tagline}. Des plats généreux préparés avec cœur, du Sénégal
            jusqu&apos;à l&apos;Italie.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-cream/80 transition hover:border-gold hover:text-gold"
            >
              <IconInstagram width={18} height={18} />
            </a>
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-cream/80 transition hover:border-gold hover:text-gold"
            >
              <IconFacebook width={18} height={18} />
            </a>
            <a
              href={site.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-cream/80 transition hover:border-gold hover:text-gold"
            >
              <IconWhatsApp width={18} height={18} />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Navigation
          </h4>
          <ul className="mt-5 space-y-3 text-sm text-cream/75">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-underline hover:text-cream">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/reservation" className="link-underline hover:text-cream">
                Réserver
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Nous trouver
          </h4>
          <ul className="mt-5 space-y-4 text-sm text-cream/75">
            <li className="flex gap-3">
              <IconMapPin width={18} height={18} className="mt-0.5 shrink-0 text-gold" />
              <span>
                {site.address.line1}
                <br />
                {site.address.line2}
              </span>
            </li>
            <li>
              <a href={site.phoneHref} className="flex gap-3 hover:text-cream">
                <IconPhone width={18} height={18} className="shrink-0 text-gold" />
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex gap-3 hover:text-cream">
                <IconMail width={18} height={18} className="shrink-0 text-gold" />
                {site.email}
              </a>
            </li>
          </ul>
        </div>

        {/* Horaires */}
        <div>
          <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            <IconClock width={16} height={16} /> Horaires
          </h4>
          <ul className="mt-5 space-y-2.5 text-sm text-cream/75">
            {site.hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span>{h.day}</span>
                <span className={h.closed ? "text-terracotta-soft" : "text-cream"}>
                  {h.value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="wrap flex flex-col items-center justify-between gap-2 py-5 text-xs text-cream/50 sm:flex-row">
          <p>
            © {YEAR} {site.name}. Tous droits réservés.
          </p>
          <p>Fait avec passion · Sénégal × Italie</p>
        </div>
      </div>
    </footer>
  );
}
