import { unsplash } from "@/lib/images";

export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  image,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image: string;
}) {
  return (
    <section className="relative flex min-h-[48vh] items-end overflow-hidden bg-espresso pt-24">
      <div
        className="img-cover absolute inset-0"
        style={{ backgroundImage: `url(${unsplash(image, 1600, 68)})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/60 to-espresso/40" />
      <div className="wrap relative z-10 pb-12 text-cream">
        {eyebrow && <p className="eyebrow !text-gold-soft">{eyebrow}</p>}
        <h1 className="mt-4 text-[clamp(2.4rem,6vw,4.2rem)] font-bold leading-none">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-xl text-lg text-cream/80">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
