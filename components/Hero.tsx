import Link from "next/link";
import { site } from "@/lib/site";
import { unsplash, IMG } from "@/lib/images";
import { IconArrow, IconStar, IconClock } from "./Icons";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-espresso">
      {/* Image de fond */}
      <div
        className="img-cover absolute inset-0"
        style={{
          backgroundImage: `url(${unsplash(IMG.hero, 1920, 70)})`,
          animation: "kenburns 16s ease-out both",
        }}
      />
      {/* Dégradés de lisibilité */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(18,16,12,0.72) 0%, rgba(18,16,12,0.55) 35%, rgba(18,16,12,0.82) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 70% at 20% 30%, rgba(200,154,60,0.18), transparent 60%)",
        }}
      />

      {/* Contenu */}
      <div className="wrap relative z-10 pt-24 pb-16 text-cream">
        <div className="max-w-3xl">
          <p
            className="eyebrow !text-gold-soft"
            style={{ animation: "fade-up 0.8s 0.1s both" }}
          >
            Restaurant Sénégalais · Saveurs d&apos;Italie
          </p>

          <h1
            className="mt-6 text-[clamp(2.8rem,8vw,5.8rem)] font-bold leading-[0.98]"
            style={{ animation: "fade-up 0.9s 0.22s both" }}
          >
            L&apos;art de recevoir,
            <br />
            <span className="text-gold-bright italic">à la sénégalaise.</span>
          </h1>

          <p
            className="mt-7 max-w-xl text-lg leading-relaxed text-cream/80"
            style={{ animation: "fade-up 0.9s 0.36s both" }}
          >
            Chez {site.name}, chaque assiette raconte un voyage : le poulet
            braisé au feu de bois, le thiéboudienne du pays et nos lasagnes
            maison. Généreux, chaleureux, fait avec le cœur.
          </p>

          <div
            className="mt-10 flex flex-wrap items-center gap-4"
            style={{ animation: "fade-up 0.9s 0.5s both" }}
          >
            <Link href="/reservation" className="btn btn-gold">
              Réserver une table
              <IconArrow width={18} height={18} />
            </Link>
            <Link href="/menu" className="btn btn-outline text-cream">
              Découvrir le menu
            </Link>
          </div>

          {/* Bandeau infos */}
          <div
            className="mt-14 flex flex-wrap items-center gap-x-9 gap-y-4 text-sm"
            style={{ animation: "fade-up 0.9s 0.64s both" }}
          >
            <div className="flex items-center gap-2">
              <span className="flex text-gold-bright">
                {[0, 1, 2, 3, 4].map((i) => (
                  <IconStar key={i} width={16} height={16} />
                ))}
              </span>
              <span className="text-cream/80">4,9 · +600 avis</span>
            </div>
            <div className="h-5 w-px bg-white/20" />
            <div className="flex items-center gap-2 text-cream/80">
              <IconClock width={16} height={16} className="text-gold-soft" />
              Ouvert aujourd&apos;hui · 11h30 – 23h
            </div>
          </div>
        </div>
      </div>

      {/* Indicateur de scroll */}
      <div className="absolute inset-x-0 bottom-7 z-10 flex justify-center">
        <div className="flex h-11 w-7 items-start justify-center rounded-full border border-white/30 p-1.5">
          <span className="h-2 w-1 animate-bounce rounded-full bg-gold-bright" />
        </div>
      </div>
    </section>
  );
}
