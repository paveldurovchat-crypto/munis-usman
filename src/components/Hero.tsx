import { Link } from "@tanstack/react-router";
import heroGif from "@/assets/hero.gif";
import { useI18n } from "@/lib/i18n";

export function Hero() {
  const { t } = useI18n();
  return (
    <section className="relative h-screen min-h-[720px] w-full overflow-hidden">
      <img
        src={heroGif}
        alt="MUNIS USMAN — Wearable Art"
        className="absolute inset-0 h-full w-full object-cover object-center animate-kenburns"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/30 via-forest-deep/20 to-forest-deep/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/60 via-transparent to-forest-deep/30" />

      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-24 lg:px-20 lg:pb-32">
        <div className="max-w-3xl animate-fade-up">
          <p className="mb-6 text-[11px] uppercase tracking-[0.4em] text-gold-soft">
            {t("home.heroKicker")}
          </p>
          <h1 className="font-display text-5xl leading-[0.95] text-cream sm:text-6xl lg:text-[7.5rem]">
            <span className="block">Wearable Art.</span>
            <em className="not-italic text-gold-gradient">Crafted in Tashkent.</em>
          </h1>
          <p className="mt-8 max-w-md text-base font-light leading-relaxed text-cream/85">
            {t("brand.tagline") === "Wearable Art. Crafted in Tashkent."
              ? "Designer brand of hand-embroidered, limited-edition pieces. Since 2014."
              : "Дизайнерский бренд ручной работы. Ограниченные серии и изделия на заказ — с 2014 года."}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/collection"
              className="group inline-flex items-center gap-3 border border-gold/70 bg-transparent px-8 py-4 text-[11px] uppercase tracking-[0.28em] text-cream transition-all hover:bg-gold hover:text-forest-deep"
            >
              {t("cta.explore")}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              to="/custom"
              className="inline-flex items-center gap-3 border border-cream/30 bg-transparent px-8 py-4 text-[11px] uppercase tracking-[0.28em] text-cream transition-all hover:border-cream/80"
            >
              {t("cta.customOrder")}
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 z-10 hidden flex-col items-end gap-2 text-cream/60 lg:flex">
        <div className="h-12 w-px bg-cream/40" />
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
      </div>
    </section>
  );
}
