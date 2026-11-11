import { site } from "@/lib/site";

export default function Logo({
  variant = "dark",
  compact = false,
}: {
  variant?: "dark" | "light";
  compact?: boolean;
}) {
  const main = variant === "light" ? "#f7f1e6" : "#19120b";
  return (
    <span className="inline-flex items-center gap-2.5 select-none">
      <span
        aria-hidden
        className="relative grid place-items-center"
        style={{ width: 38, height: 38 }}
      >
        <svg width="38" height="38" viewBox="0 0 40 40" fill="none">
          <circle
            cx="20"
            cy="20"
            r="19"
            stroke="var(--color-gold)"
            strokeWidth="1.4"
          />
          <circle cx="20" cy="20" r="14.5" fill="var(--color-terracotta)" />
          {/* drumstick / flamme stylisée */}
          <path
            d="M15 25c-1.6-1.6-1.6-4.3 0-6 1.3-1.3 2-2.6 2.2-4.4.3 1.8 1.3 2.8 2.4 3.9 1.7 1.7 1.7 4.4 0 6-1.6 1.7-3.1 1.7-4.6.5z"
            fill="var(--color-gold-bright)"
          />
          <path
            d="M19 20c1.4 0 2.6 1.2 2.6 2.7 0 1.2-.7 2-1.6 2.5"
            stroke="var(--color-espresso)"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
        </svg>
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span
            className="font-[family-name:var(--font-display)] text-[1.15rem] font-bold tracking-tight"
            style={{ color: main }}
          >
            {site.name}
          </span>
          <span
            className="text-[0.56rem] font-semibold uppercase tracking-[0.3em]"
            style={{ color: "var(--color-gold)" }}
          >
            Sénégal · Italie
          </span>
        </span>
      )}
    </span>
  );
}
