import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Gallery, { type GalleryItem } from "@/components/Gallery";
import Reveal from "@/components/Reveal";
import { IMG } from "@/lib/images";
import { IconArrow } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Galerie",
  description:
    "Plongez dans l'ambiance de Pollo Gigante : nos plats, notre salle et nos moments de partage.",
};

const items: GalleryItem[] = [
  { image: IMG.pouletBraise, label: "Poulet Braisé Gigante" },
  { image: IMG.thieb, label: "Thiéboudienne" },
  { image: IMG.lasagnes, label: "Lasagnes maison" },
  { image: IMG.interior, label: "Notre salle" },
  { image: IMG.yassa, label: "Poulet Yassa" },
  { image: IMG.pizza, label: "Pizza Reine Gigante" },
  { image: IMG.grill, label: "Au feu de bois" },
  { image: IMG.mafe, label: "Mafé bœuf" },
  { image: IMG.table, label: "Table dressée" },
  { image: IMG.poisson, label: "Poisson braisé" },
  { image: IMG.ailes, label: "Ailes épicées" },
  { image: IMG.g4, label: "Partage et convivialité" },
  { image: IMG.dessert2, label: "Tiramisu maison" },
  { image: IMG.boisson, label: "Bissap frais" },
  { image: IMG.chef, label: "En cuisine" },
];

export default function GaleriePage() {
  return (
    <>
      <PageHeader
        eyebrow="En images"
        title="Galerie"
        subtitle="Les plats, la salle, les sourires — un aperçu de l'expérience Pollo Gigante."
        image={IMG.interior}
      />

      <section className="bg-cream py-20">
        <div className="wrap">
          <Reveal>
            <Gallery items={items} />
          </Reveal>

          <div className="mt-16 flex flex-col items-center gap-4 text-center">
            <p className="text-muted">
              Suivez-nous sur les réseaux pour ne rien manquer de nos nouveautés.
            </p>
            <Link href="/reservation" className="btn btn-gold">
              Réserver votre table
              <IconArrow width={18} height={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
