import Link from "next/link";
import Hero from "@/components/Hero";
import SectionTitle from "@/components/SectionTitle";
import Reveal from "@/components/Reveal";
import { DishCard } from "@/components/Dish";
import { popularDishes } from "@/lib/menu";
import { unsplash, IMG } from "@/lib/images";
import { site } from "@/lib/site";
import {
  IconArrow,
  IconChef,
  IconFlame,
  IconLeaf,
  IconStar,
} from "@/components/Icons";

const piliers = [
  {
    icon: IconChef,
    title: "Fait maison",
    text: "Chaque sauce, chaque marinade préparée sur place, chaque matin.",
  },
  {
    icon: IconFlame,
    title: "Au feu de bois",
    text: "Notre poulet Gigante braisé lentement pour un goût inimitable.",
  },
  {
    icon: IconLeaf,
    title: "Produits frais",
    text: "Des ingrédients de saison, du poisson frais et des épices du pays.",
  },
];

const cuisines = [
  {
    title: "Le Poulet Gigante",
    text: "Notre signature braisée au feu de bois.",
    image: IMG.pouletBraise,
    href: "/menu#poulet",
  },
  {
    title: "Spécialités du Sénégal",
    text: "Thiéboudienne, yassa, mafé et bien plus.",
    image: IMG.thieb,
    href: "/menu#senegal",
  },
  {
    title: "Saveurs d'Italie",
    text: "Lasagnes, pâtes et pizzas faites maison.",
    image: IMG.lasagnes,
    href: "/menu#italie",
  },
];

const avis = [
  {
    name: "Awa D.",
    text: "Le meilleur poulet braisé de la ville, sans exception. On se croirait à Dakar !",
  },
  {
    name: "Marco R.",
    text: "Mélange audacieux et réussi. Les lasagnes sont aussi bonnes que le thiéboudienne.",
  },
  {
    name: "Fatou & Léa",
    text: "Accueil chaleureux, portions généreuses et cadre magnifique. Notre adresse préférée.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Piliers */}
      <section className="bg-cream">
        <div className="wrap -mt-10 grid gap-5 md:grid-cols-3">
          {piliers.map((p, i) => (
            <Reveal key={p.title} delay={i * 120}>
              <div className="card flex items-start gap-4 p-6">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold/15 text-[#9a7420]">
                  <p.icon width={24} height={24} />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-ink">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {p.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* À propos */}
      <section className="bg-cream py-24">
        <div className="wrap grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative">
            <div
              className="img-cover aspect-[4/5] w-full rounded-[var(--radius-xl2)] shadow-[var(--shadow-card)]"
              style={{ backgroundImage: `url(${unsplash(IMG.chef, 900)})` }}
            />
            <div
              className="img-cover absolute -bottom-8 -right-4 hidden h-44 w-44 rounded-[var(--radius-xl2)] border-4 border-cream shadow-lg sm:block lg:-right-8"
              style={{ backgroundImage: `url(${unsplash(IMG.grill, 500)})` }}
            />
            <div className="absolute -left-4 top-8 hidden rounded-2xl bg-ink px-5 py-4 text-cream shadow-xl md:block">
              <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-gold-bright">
                12 ans
              </p>
              <p className="text-xs uppercase tracking-widest text-cream/70">
                de passion
              </p>
            </div>
          </Reveal>

          <div>
            <SectionTitle
              eyebrow="Notre histoire"
              title={
                <>
                  Deux cultures,
                  <br />
                  une même générosité
                </>
              }
            />
            <Reveal delay={120}>
              <p className="mt-6 text-base leading-relaxed text-muted">
                {site.name} est né d&apos;une envie simple : partager la cuisine
                qui a bercé notre enfance. Du <strong>teranga</strong>{" "}
                sénégalais — cet art de recevoir — aux trattorias italiennes,
                nous réunissons le meilleur des deux mondes dans une même
                assiette.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted">
                Notre poulet Gigante, braisé au feu de bois selon une recette
                familiale, est devenu une légende. À côté, nos lasagnes maison
                rappellent que la bonne cuisine n&apos;a pas de frontières.
              </p>
              <div className="mt-8 flex flex-wrap gap-8">
                {[
                  ["+40", "plats au menu"],
                  ["600+", "clients ravis"],
                  ["4,9/5", "note moyenne"],
                ].map(([n, l]) => (
                  <div key={l}>
                    <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-terracotta">
                      {n}
                    </p>
                    <p className="text-sm text-muted">{l}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Nos cuisines */}
      <section className="bg-sand/50 py-24">
        <div className="wrap">
          <SectionTitle
            center
            eyebrow="Notre carte"
            title="Trois univers dans votre assiette"
            subtitle="Du Sénégal à l'Italie, chaque spécialité est préparée avec le même soin."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {cuisines.map((c, i) => (
              <Reveal key={c.title} delay={i * 120}>
                <Link
                  href={c.href}
                  className="group relative block h-96 overflow-hidden rounded-[var(--radius-xl2)] shadow-[var(--shadow-soft)]"
                >
                  <div
                    className="img-cover absolute inset-0 transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                    style={{ backgroundImage: `url(${unsplash(c.image, 700)})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-cream">
                    <h3 className="text-2xl font-semibold">{c.title}</h3>
                    <p className="mt-1.5 text-sm text-cream/80">{c.text}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold-bright">
                      Voir les plats
                      <IconArrow
                        width={16}
                        height={16}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Plats populaires */}
      <section className="bg-cream py-24">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle
              eyebrow="Les favoris"
              title="Les plats qu'on s'arrache"
            />
            <Reveal>
              <Link href="/menu" className="btn btn-dark">
                Tout le menu
                <IconArrow width={18} height={18} />
              </Link>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {popularDishes.map((d, i) => (
              <Reveal key={d.name} delay={(i % 3) * 110}>
                <DishCard dish={d} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Galerie aperçu */}
      <section className="bg-espresso texture relative py-24">
        <div className="wrap relative">
          <SectionTitle
            center
            light
            eyebrow="En images"
            title="Un avant-goût de l'ambiance"
          />
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[IMG.g1, IMG.g2, IMG.interior, IMG.g4, IMG.table, IMG.g3, IMG.yassa, IMG.pizza].map(
              (g, i) => (
                <Reveal
                  key={i}
                  delay={(i % 4) * 90}
                  className={i % 5 === 0 ? "col-span-2 row-span-2" : ""}
                >
                  <div
                    className={`img-cover w-full overflow-hidden rounded-2xl ${
                      i % 5 === 0 ? "aspect-square" : "aspect-square"
                    }`}
                    style={{ backgroundImage: `url(${unsplash(g, 600)})` }}
                  />
                </Reveal>
              )
            )}
          </div>
          <div className="mt-10 text-center">
            <Link href="/galerie" className="btn btn-outline text-cream">
              Voir toute la galerie
              <IconArrow width={18} height={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Avis */}
      <section className="bg-cream py-24">
        <div className="wrap">
          <SectionTitle
            center
            eyebrow="Ils en parlent"
            title="Ce que disent nos clients"
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {avis.map((a, i) => (
              <Reveal key={a.name} delay={i * 120}>
                <figure className="card h-full p-7">
                  <div className="flex text-gold">
                    {[0, 1, 2, 3, 4].map((s) => (
                      <IconStar key={s} width={16} height={16} />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-[1.05rem] leading-relaxed text-ink/90">
                    « {a.text} »
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-terracotta/15 font-semibold text-terracotta">
                      {a.name.charAt(0)}
                    </span>
                    <span className="font-medium text-ink">{a.name}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Réservation */}
      <section className="relative overflow-hidden">
        <div
          className="img-cover absolute inset-0"
          style={{ backgroundImage: `url(${unsplash(IMG.heroAlt, 1600)})` }}
        />
        <div className="absolute inset-0 bg-espresso/82" />
        <div className="wrap relative py-24 text-center text-cream">
          <Reveal>
            <span className="divider-dot mb-6" />
            <h2 className="mx-auto max-w-2xl text-[clamp(2rem,4.5vw,3.3rem)] font-semibold">
              Réservez votre table dès maintenant
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-cream/75">
              Pour un dîner en amoureux, un repas de famille ou une grande
              tablée entre amis — nous vous réservons le meilleur accueil.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link href="/reservation" className="btn btn-gold">
                Réserver en ligne
                <IconArrow width={18} height={18} />
              </Link>
              <a href={site.phoneHref} className="btn btn-outline text-cream">
                Appeler : {site.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
