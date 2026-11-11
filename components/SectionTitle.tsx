import Reveal from "./Reveal";

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  center = false,
  light = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <Reveal className={center ? "text-center" : ""}>
      {eyebrow && (
        <p
          className={`eyebrow ${center ? "eyebrow-center justify-center" : ""} ${
            light ? "!text-gold-soft" : ""
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`mt-4 text-[clamp(2rem,4.5vw,3.3rem)] font-semibold ${
          light ? "text-cream" : "text-ink"
        } ${center ? "mx-auto max-w-3xl" : "max-w-2xl"}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base leading-relaxed ${
            light ? "text-cream/70" : "text-muted"
          } ${center ? "mx-auto max-w-xl" : "max-w-xl"}`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
