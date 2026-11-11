import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import MenuNav from "@/components/MenuNav";
import { MenuItem } from "@/components/Dish";
import { menu } from "@/lib/menu";
import { unsplash, IMG } from "@/lib/images";
import { site } from "@/lib/site";
import { IconArrow } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Le Menu",
  description:
    "Découvrez la carte de Pollo Gigante : poulet braisé, spécialités sénégalaises, saveurs d'Italie, desserts et jus maison.",
};

export default function MenuPage() {
  return (
    <>
      <PageHeader
        eyebrow="Notre carte"
        title="Le Menu"
        subtitle="Du poulet Gigante aux lasagnes maison — tout est fait avec amour."
        image={IMG.grill}
      />

      <MenuNav categories={menu.map((c) => ({ id: c.id, title: c.title }))} />

      <section className="bg-cream pb-28 pt-6">
        <div className="wrap">
          {menu.map((cat, idx) => (
            <div
              key={cat.id}
              id={cat.id}
              className="scroll-mt-28 border-t border-line py-14 first:border-t-0"
            >
              <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
                {/* Colonne titre + image */}
                <div className="lg:sticky lg:top-28 lg:self-start">
                  <Reveal>
                    <p className="eyebrow">{`0${idx + 1}`}</p>
                    <h2 className="mt-3 text-3xl font-semibold text-ink">
                      {cat.title}
                    </h2>
                    <p className="mt-2 text-sm text-muted">{cat.subtitle}</p>
                    {cat.dishes[0]?.image && (
                      <div
                        className="img-cover mt-6 hidden aspect-[4/3] w-full rounded-2xl shadow-[var(--shadow-soft)] lg:block"
                        style={{
                          backgroundImage: `url(${unsplash(
                            cat.dishes.find((d) => d.image)?.image ?? IMG.grill,
                            600
                          )})`,
                        }}
                      />
                    )}
                  </Reveal>
                </div>

                {/* Liste des plats */}
                <div className="divide-y divide-line">
                  {cat.dishes.map((dish, i) => (
                    <Reveal key={dish.name} delay={i * 60}>
                      <MenuItem dish={dish} />
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Note allergènes */}
          <p className="mt-10 rounded-2xl bg-sand/60 p-5 text-center text-sm text-muted">
            Une allergie ou un régime particulier ? Prévenez-nous, nous adaptons
            volontiers nos plats. Prix en {site.currency}, service compris.
          </p>

          {/* CTA */}
          <div className="mt-12 flex flex-col items-center gap-4 text-center">
            <h3 className="text-2xl font-semibold text-ink">
              Envie de goûter tout ça ?
            </h3>
            <Link href="/reservation" className="btn btn-gold">
              Réserver une table
              <IconArrow width={18} height={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
