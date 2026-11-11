import Link from "next/link";
import { unsplash } from "@/lib/images";
import { menu } from "@/lib/menu";
import { formatPrice } from "@/lib/format";
import { IconStar } from "./Icons";

// Assiettes vues du dessus (remplace par tes propres photos détourées si besoin)
const PLATE_TOP = "photo-1563379926898-05f4575a45d8"; // spaghetti aux crevettes
const PLATE_BOTTOM = "photo-1598103442097-8b74394b95c6"; // poulet rôti

export default function Hero() {
  return (
    <section className="hero-linen relative flex min-h-[100svh] flex-col items-center overflow-hidden">
      {/* Assiette haut-gauche */}
      <div className="hero-plate hero-plate-tl" aria-hidden>
        <div
          className="hero-plate-inner"
          style={{ backgroundImage: `url(${unsplash(PLATE_TOP, 900, 75)})` }}
        />
      </div>

      {/* Assiette bas-droite */}
      <div className="hero-plate hero-plate-br" aria-hidden>
        <div
          className="hero-plate-inner"
          style={{ backgroundImage: `url(${unsplash(PLATE_BOTTOM, 900, 75)})` }}
        />
      </div>

      {/* Contenu centré */}
      <div className="relative z-10 flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-5 pb-56 pt-[17rem] text-center sm:pt-32 font-[family-name:var(--font-jost)] text-ink md:pb-64">
        <p className="hero-eyebrow hero-in" style={{ animationDelay: "0.1s" }}>
          Restaurant sénégalais · Cuisine italienne
        </p>

        <h1 className="hero-title hero-in" style={{ animationDelay: "0.25s" }}>
          La tradition
          <span className="block">
            <em className="hero-title-accent">dans chaque</em> assiette
          </span>
        </h1>

        <p
          className="hero-in mt-7 max-w-xl text-[clamp(1.05rem,1.6vw,1.3rem)] font-light leading-relaxed text-[#4a4440]"
          style={{ animationDelay: "0.4s" }}
        >
          Le poulet braisé au feu de bois, le thiéboudienne du pays et nos
          lasagnes maison — préparés avec soin, comme à la maison.
        </p>

        <div
          className="hero-in mt-6 flex items-center gap-2 text-[0.95rem] text-[#4a4440]"
          style={{ animationDelay: "0.5s" }}
        >
          <IconStar width={15} height={15} className="text-gold" />
          <strong className="font-semibold text-ink">4,9</strong>
          <span>note moyenne sur Google</span>
        </div>

        <div
          className="hero-in mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
          style={{ animationDelay: "0.6s" }}
        >
          <Link href="/reservation" className="hero-cta">
            Réserver une table
          </Link>
          <Link
            href="/menu"
            className="link-underline text-[0.8rem] font-medium uppercase tracking-[0.25em] text-ink"
          >
            Voir la carte
          </Link>
        </div>
      </div>

      {/* Carte du menu inclinée qui dépasse en bas */}
      <Link
        href="/menu"
        className="hero-menu-card group"
        aria-label="Voir notre menu"
      >
        <div className="hero-menu-card-inner font-[family-name:var(--font-jost)]">
          <p className="text-center text-[clamp(1.6rem,3vw,2.3rem)] font-medium uppercase tracking-[0.08em] text-ink">
            Notre Menu
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-1 border-y border-dashed border-[#cbbfa9] py-3 text-[0.8rem] text-[#5d554c]">
            {menu.map((c) => (
              <span key={c.id}>{c.title}</span>
            ))}
          </div>
          <p className="mt-5 text-center text-[1.15rem] font-medium uppercase tracking-[0.12em] text-ink">
            {menu[1].title}
          </p>
          <ul className="mx-auto mt-3 max-w-sm space-y-2 text-[0.85rem] text-[#5d554c]">
            {menu[1].dishes.slice(0, 3).map((d) => (
              <li key={d.name} className="flex items-baseline gap-2">
                <span>{d.name}</span>
                <span className="flex-1 border-b border-dotted border-[#cbbfa9]" />
                <span className="text-ink">{formatPrice(d.price)}</span>
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </section>
  );
}
