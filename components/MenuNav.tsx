"use client";

import { useEffect, useState } from "react";

export default function MenuNav({
  categories,
}: {
  categories: { id: string; title: string }[];
}) {
  const [active, setActive] = useState(categories[0]?.id);

  useEffect(() => {
    const sections = categories
      .map((c) => document.getElementById(c.id))
      .filter(Boolean) as HTMLElement[];

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [categories]);

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div className="sticky top-[60px] z-40 border-b border-line bg-cream/92 backdrop-blur-md">
      <div className="wrap flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categories.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            onClick={(e) => handleClick(e, c.id)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all ${
              active === c.id
                ? "bg-ink text-cream"
                : "text-muted hover:bg-sand"
            }`}
          >
            {c.title}
          </a>
        ))}
      </div>
    </div>
  );
}
