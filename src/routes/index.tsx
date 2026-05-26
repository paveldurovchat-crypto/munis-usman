import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { Hero } from "@/components/Hero";
import { SiteFooter } from "@/components/SiteFooter";
import { FadeUp } from "@/components/FadeUp";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { useI18n } from "@/lib/i18n";
import logoGreen from "@/assets/logo-green.svg";
import logoGold from "@/assets/logo-gold.svg";
import { products } from "@/lib/products";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "MUNIS USMAN. Handmade accessories and clothing from Tashkent" },
      {
        name: "description",
        content:
          "MUNIS USMAN is a handcraft studio in Tashkent making embroidered accessories, phone cases and wearable art since 2014. Limited editions and made to order.",
      },
      { property: "og:title", content: "MUNIS USMAN. Handmade accessories and clothing from Tashkent" },
      {
        property: "og:description",
        content:
          "Handcraft studio in Tashkent. Embroidered accessories, phone cases and wearable art since 2014.",
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

        {/* Signature accent */}
        <section className="bg-forest-deep py-20 lg:py-28">
          <div className="mx-auto max-w-4xl px-6 text-center lg:px-12">
            <FadeUp>
              <p className="font-display italic text-gold-soft text-3xl sm:text-4xl lg:text-5xl">
                {t("home.philosophyAccent")}
              </p>
            </FadeUp>
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
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={t(p.nameKey)}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                        />
                      ) : (
                        <ImagePlaceholder variant="sand" label={t(p.tagKey)} />
                      )}
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

        {/* Process — burgundy section, no photo */}
        <section className="bg-burgundy text-cream">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative flex items-center justify-center px-6 py-20 lg:py-0 lg:aspect-auto lg:min-h-[520px]">
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 30% 30%, #C4992D 1.5px, transparent 1.5px), radial-gradient(circle at 70% 70%, #C4992D 1px, transparent 1px)",
                  backgroundSize: "40px 40px, 28px 28px",
                }}
              />
              <img src={logoGold} alt="" className="relative h-32 w-auto opacity-80 lg:h-44" loading="lazy" />
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

        {/* Collaboration */}
        <section className="bg-cream py-28 lg:py-40">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:gap-16 lg:px-12">
            <div className="lg:col-span-5">
              <FadeUp>
                <p className="mb-4 text-xs uppercase tracking-[0.4em] text-muted-foreground">
                  {t("home.collaborationKicker")}
                </p>
              </FadeUp>
              <FadeUp delay={80}>
                <h2 className="font-display text-4xl leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
                  {t("home.collaborationTitle")}
                </h2>
              </FadeUp>
            </div>
            <div className="lg:col-span-7">
              <FadeUp delay={120}>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {t("home.collaborationBody")}
                </p>
              </FadeUp>
              <FadeUp delay={200}>
                <Link
                  to="/contact"
                  className="group mt-10 inline-flex items-center gap-3 border border-forest/40 px-8 py-4 text-[11px] uppercase tracking-[0.18em] text-foreground transition-all hover:bg-forest hover:text-cream font-sans"
                >
                  {t("home.collaborationCta")}
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </FadeUp>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
