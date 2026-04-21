import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { FadeUp } from "@/components/FadeUp";
import { useI18n } from "@/lib/i18n";
import { products } from "@/lib/products";

export const Route = createFileRoute("/collection/")({
  component: CollectionPage,
  head: () => ({
    meta: [
      { title: "Коллекция · MUNIS USMAN" },
      { name: "description", content: "Ограниченные серии и изделия на заказ. Ручная вышивка, шёлк, шерсть." },
      { property: "og:title", content: "Collection · MUNIS USMAN" },
      { property: "og:description", content: "Limited editions and made-to-order wearable art." },
    ],
  }),
});

function CollectionPage() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>
        <PageHero
          kicker={t("collection.kicker")}
          title={t("collection.title")}
          subtitle={t("collection.subtitle")}
        />

        <section className="bg-cream py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            {/* Phone Cases */}
            <div className="mb-6">
              <p className="text-[10px] uppercase tracking-[0.3em] text-accent">{t("collection.categoryCasesKicker")}</p>
              <h2 className="mt-2 font-display text-3xl text-foreground lg:text-4xl">{t("collection.categoryCases")}</h2>
            </div>
            <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {products.filter(p => p.category === "cases").map((p, i) => (
                <FadeUp key={p.slug} delay={(i % 3) * 100}>
                  <Link to="/collection/$slug" params={{ slug: p.slug }} className="group block">
                    <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                      <img
                        src={p.image}
                        alt={t(p.nameKey)}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-deep/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </div>
                    <div className="mt-5">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-accent">{t(p.tagKey)}</p>
                      <h3 className="mt-2 font-display text-2xl text-foreground">{t(p.nameKey)}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{t(p.descKey)}</p>
                    </div>
                  </Link>
                </FadeUp>
              ))}
            </div>

            {/* Wearable Art */}
            <div className="mb-6 mt-24">
              <p className="text-[10px] uppercase tracking-[0.3em] text-accent">{t("collection.categoryArtKicker")}</p>
              <h2 className="mt-2 font-display text-3xl text-foreground lg:text-4xl">{t("collection.categoryArt")}</h2>
            </div>
            <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {products.filter(p => p.category === "art").map((p, i) => (
                <FadeUp key={p.slug} delay={(i % 3) * 100}>
                  <Link to="/collection/$slug" params={{ slug: p.slug }} className="group block">
                    <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                      <img
                        src={p.image}
                        alt={t(p.nameKey)}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-deep/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </div>
                    <div className="mt-5">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-accent">{t(p.tagKey)}</p>
                      <h3 className="mt-2 font-display text-2xl text-foreground">{t(p.nameKey)}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{t(p.descKey)}</p>
                    </div>
                  </Link>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
