import type { Dish } from "@/lib/menu";
import { unsplash } from "@/lib/images";
import { formatPrice } from "@/lib/format";
import { IconFlame, IconLeaf, IconStar } from "./Icons";

function Tag({ label }: { label: string }) {
  const icon =
    label === "Épicé" ? (
      <IconFlame width={12} height={12} />
    ) : label === "Végé" ? (
      <IconLeaf width={12} height={12} />
    ) : label === "Signature" ? (
      <IconStar width={12} height={12} />
    ) : null;
  const tone =
    label === "Épicé"
      ? "bg-terracotta/10 text-terracotta"
      : label === "Végé"
        ? "bg-forest/10 text-forest"
        : label === "Signature"
          ? "bg-gold/15 text-[#9a7420]"
          : "bg-sand text-muted";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-wide ${tone}`}
    >
      {icon}
      {label}
    </span>
  );
}

/* Carte avec photo — utilisée pour les plats mis en avant */
export function DishCard({ dish }: { dish: Dish }) {
  return (
    <article className="card group overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-card)]">
      <div className="relative h-56 overflow-hidden">
        <div
          className="img-cover absolute inset-0 transition-transform duration-[1.2s] ease-out group-hover:scale-110"
          style={{
            backgroundImage: dish.image
              ? `url(${unsplash(dish.image, 700, 68)})`
              : undefined,
            background: dish.image
              ? undefined
              : "linear-gradient(135deg,#2a2018,#4a3420)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/55 to-transparent" />
        <span className="absolute right-3 top-3 rounded-full bg-cream/95 px-3 py-1 text-sm font-bold text-ink shadow-sm">
          {formatPrice(dish.price)}
        </span>
        {dish.popular && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-gold px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-wide text-espresso">
            <IconStar width={12} height={12} /> Populaire
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold text-ink">{dish.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {dish.description}
        </p>
        {dish.tags && dish.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {dish.tags.map((t) => (
              <Tag key={t} label={t} />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

/* Ligne de menu — nom · prix avec pointillés (style carte de restaurant) */
export function MenuItem({ dish }: { dish: Dish }) {
  return (
    <div className="group py-5">
      <div className="flex items-baseline gap-3">
        <h3 className="text-lg font-semibold text-ink">{dish.name}</h3>
        {dish.tags?.map((t) => (
          <Tag key={t} label={t} />
        ))}
        <span className="mx-1 flex-1 translate-y-[-3px] border-b border-dotted border-line" />
        <span className="font-[family-name:var(--font-display)] text-lg font-semibold text-terracotta">
          {formatPrice(dish.price)}
        </span>
      </div>
      <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted">
        {dish.description}
      </p>
    </div>
  );
}
