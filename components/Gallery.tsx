"use client";

import { useState, useEffect, useCallback } from "react";
import { unsplash } from "@/lib/images";
import { IconClose, IconArrow } from "./Icons";

export type GalleryItem = { image: string; label: string };

export default function Gallery({ items }: { items: GalleryItem[] }) {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % items.length)),
    [items.length]
  );
  const prev = useCallback(
    () =>
      setIndex((i) =>
        i === null ? i : (i - 1 + items.length) % items.length
      ),
    [items.length]
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, next, prev]);

  return (
    <>
      <div className="columns-2 gap-4 md:columns-3 [&>*]:mb-4">
        {items.map((it, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="group relative block w-full overflow-hidden rounded-2xl shadow-[var(--shadow-soft)]"
          >
            <img
              src={unsplash(it.image, 700)}
              alt={it.label}
              loading="lazy"
              className="w-full transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <span className="absolute inset-0 flex items-end bg-gradient-to-t from-espresso/70 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="text-sm font-medium text-cream">{it.label}</span>
            </span>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {index !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-espresso/95 p-4"
          onClick={close}
        >
          <button
            onClick={close}
            aria-label="Fermer"
            className="absolute right-5 top-5 text-cream/80 transition hover:text-cream"
          >
            <IconClose width={30} height={30} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Précédent"
            className="absolute left-4 text-cream/70 transition hover:text-cream md:left-10"
          >
            <IconArrow width={32} height={32} className="rotate-180" />
          </button>
          <figure
            className="max-h-[85vh] max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={unsplash(items[index].image, 1400, 80)}
              alt={items[index].label}
              className="max-h-[78vh] w-auto rounded-2xl object-contain"
            />
            <figcaption className="mt-4 text-center text-sm text-cream/80">
              {items[index].label} · {index + 1} / {items.length}
            </figcaption>
          </figure>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Suivant"
            className="absolute right-4 text-cream/70 transition hover:text-cream md:right-10"
          >
            <IconArrow width={32} height={32} />
          </button>
        </div>
      )}
    </>
  );
}
