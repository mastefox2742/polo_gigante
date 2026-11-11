"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import Logo from "./Logo";
import { IconMenu, IconClose, IconPhone } from "./Icons";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Accueil : hero clair → nav sombre. Pages internes : en-tête photo sombre → nav claire.
  const overHero = pathname !== "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const textColor = overHero ? "text-cream" : "text-ink";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cream/92 backdrop-blur-md border-b border-line shadow-[0_8px_30px_-20px_rgba(25,18,11,0.4)]"
          : "bg-transparent"
      }`}
    >
      <div className="wrap flex items-center justify-between py-3.5">
        <Link href="/" aria-label={site.name}>
          <Logo variant={overHero ? "light" : "dark"} />
        </Link>

        {/* Nav desktop */}
        <nav className="hidden items-center gap-9 md:flex">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`link-underline text-sm font-medium transition-colors ${textColor} ${
                  active ? "opacity-100" : "opacity-80 hover:opacity-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href={site.phoneHref}
            className={`flex items-center gap-2 text-sm font-medium ${textColor} opacity-85 hover:opacity-100`}
          >
            <IconPhone width={16} height={16} />
            {site.phone}
          </a>
          <Link href="/reservation" className="btn btn-gold !py-2.5 !px-5 text-sm">
            Réserver
          </Link>
        </div>

        {/* Bouton mobile */}
        <button
          onClick={() => setOpen(true)}
          aria-label="Ouvrir le menu"
          className={`md:hidden ${textColor}`}
        >
          <IconMenu width={26} height={26} />
        </button>
      </div>

      {/* Overlay mobile */}
      <div
        className={`fixed inset-0 z-50 bg-espresso text-cream transition-all duration-400 md:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4">
          <Logo variant="light" />
          <button onClick={() => setOpen(false)} aria-label="Fermer le menu">
            <IconClose width={28} height={28} />
          </button>
        </div>
        <nav className="flex flex-col gap-2 px-6 pt-8">
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="border-b border-white/10 py-4 font-[family-name:var(--font-display)] text-3xl"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "translateX(0)" : "translateX(20px)",
                transition: `all 0.4s ${0.1 + i * 0.07}s`,
              }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/reservation"
            className="btn btn-gold mt-8 w-full"
          >
            Réserver une table
          </Link>
          <a
            href={site.phoneHref}
            className="mt-4 flex items-center justify-center gap-2 text-gold-soft"
          >
            <IconPhone width={16} height={16} /> {site.phone}
          </a>
        </nav>
      </div>
    </header>
  );
}
