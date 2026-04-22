import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { Hero } from "@/components/Hero";
import { SiteFooter } from "@/components/SiteFooter";
import { FadeUp } from "@/components/FadeUp";
import { useI18n } from "@/lib/i18n";
import logoGreen from "@/assets/logo-green.svg";
import embroideryHands from "@/assets/embroidery-hands.jpg";
import fabricDetails from "@/assets/fabric-details.jpg";
import collection1 from "@/assets/collection-1.jpg";
import collection3 from "@/assets/collection-3.jpg";
import phoneCase from "@/assets/phone-case.jpg";
import journal1 from "@/assets/journal-1.jpg";
import journal2 from "@/assets/journal-2.jpg";
import journal3 from "@/assets/journal-3.jpg";
import { products } from "@/lib/products";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "MUNIS USMAN — Ташкент" },
      {
        name: "description",
        content:
          "Мастерская в Ташкенте с 2014 года. Шьём и вышиваем вручную — небольшими партиями, для конкретных людей.",
      },
      { property: "og:title", content: "MUNIS USMAN — Tashkent" },
      {
        property: "og:description",
        content: "A Tashkent studio since 2014. We sew and embroider by hand — in small batches, for specific people.",
      },
    ],
  }),
});

function Index() {
  const { t } = useI18n();
  const featured = products.slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>
        <Hero />

        {/* Philosophy */}
        <section id="philosophy" className="relative overflow-hidden bg-cream py-28 lg:py-40">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-12 lg:gap-20 lg:px-12">
            <FadeUp className="lg:col-span-4">
              <p className="mb-6 text-xs uppercase tracking-[0.4em] text-muted-foreground">
                {t("home.philosophyKicker")}
              </p>
              <img src={logoGreen} alt="MUNIS USMAN" className="h-40 w-auto opacity-90 lg:h-56" loading="lazy" />
            </FadeUp>
            <div className="lg:col-span-8">
              <FadeUp>
                <h2 className="whitespace-pre-line font-display text-4xl leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
                  {t("home.philosophyTitle")}
                </h2>
              </FadeUp>
              <div className="mt-12 grid gap-10 border-t border-border pt-10 sm:grid-cols-2">
                <FadeUp delay={100}>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {t("home.philosophyBody1")}
                  </p>
                </FadeUp>
                <FadeUp delay={200}>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {t("home.philosophyBody2")}
                  </p>
                </FadeUp>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Collection */}
        <section className="bg-ivory py-28 lg:py-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <FadeUp>
              <p className="mb-4 text-xs uppercase tracking-[0.4em] text-muted-foreground">
                {t("home.featuredKicker")}
              </p>
            </FadeUp>
            <FadeUp delay={80}>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <h2 className="font-display text-5xl leading-[1.05] text-foreground lg:text-7xl">
                  {t("home.featuredTitle")}
                </h2>
                <p className="max-w-sm text-sm text-muted-foreground">{t("home.featuredSubtitle")}</p>
              </div>
            </FadeUp>

            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
              {featured.map((p, i) => (
                <FadeUp key={p.slug} delay={i * 120}>
                  <Link
                    to="/collection/$slug"
                    params={{ slug: p.slug }}
                    className="group block"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                      <img
                        src={p.image}
                        alt={t(p.nameKey)}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="mt-5">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-accent">
                        {t(p.tagKey)}
                      </p>
                      <h3 className="mt-2 font-display text-2xl text-foreground">{t(p.nameKey)}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{t(p.descKey)}</p>
                    </div>
                  </Link>
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={200}>
              <div className="mt-16 flex justify-center">
                <Link
                  to="/collection"
                  className="group inline-flex items-center gap-3 border border-forest/40 px-8 py-4 text-[11px] uppercase tracking-[0.18em] text-foreground transition-all hover:bg-forest hover:text-cream font-sans"
                >
                  {t("home.featuredCta")}
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Process — burgundy section */}
        <section className="bg-burgundy text-cream">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative aspect-[4/5] overflow-hidden lg:aspect-auto">
              <img src={embroideryHands} alt="Hand embroidery" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col justify-center px-6 py-20 lg:px-16 lg:py-28">
              <FadeUp>
                <p className="mb-6 text-xs uppercase tracking-[0.4em] text-gold-soft">
                  {t("home.processKicker")}
                </p>
              </FadeUp>
              <FadeUp delay={80}>
                <h2 className="font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
                  {t("home.processTitle")}
                </h2>
              </FadeUp>
              <FadeUp delay={160}>
                <p className="mt-8 max-w-md text-base leading-relaxed text-cream/80">
                  {t("home.processBody")}
                </p>
              </FadeUp>
              <FadeUp delay={240}>
                <Link
                  to="/custom"
                  className="mt-10 inline-flex items-center gap-3 border border-gold/70 px-8 py-4 text-[11px] uppercase tracking-[0.18em] text-cream transition-all hover:bg-gold hover:text-forest-deep font-sans"
                >
                  {t("home.processCta")} →
                </Link>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* Gallery — instagram-style */}
        <section className="bg-cream py-28 lg:py-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <FadeUp>
              <p className="mb-4 text-xs uppercase tracking-[0.4em] text-muted-foreground">
                {t("home.galleryKicker")}
              </p>
            </FadeUp>
            <FadeUp delay={80}>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <h2 className="font-display text-4xl leading-[1.05] text-foreground lg:text-6xl">
                  {t("home.galleryTitle")}
                </h2>
                <p className="max-w-sm text-sm text-muted-foreground">{t("home.gallerySubtitle")}</p>
              </div>
            </FadeUp>
            <div className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-4">
              {[fabricDetails, collection1, journal2, collection3, journal1, phoneCase, journal3, embroideryHands].map(
                (src, i) => (
                  <FadeUp key={i} delay={i * 60}>
                    <div className="group relative aspect-square overflow-hidden bg-muted">
                      <img
                        src={src}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                      />
                    </div>
                  </FadeUp>
                )
              )}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
