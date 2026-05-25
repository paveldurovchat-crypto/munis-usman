import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { FadeUp } from "@/components/FadeUp";
import { useI18n } from "@/lib/i18n";
import { products, type ProductCategory } from "@/lib/products";

type Search = { cat?: ProductCategory };

const validCats: ProductCategory[] = ["accessories", "cloth", "home", "couture"];

export const Route = createFileRoute("/collection/")({
  component: CollectionPage,
  validateSearch: (search: Record<string, unknown>): Search => {
    const cat = search.cat;
    return {
      cat: typeof cat === "string" && (validCats as string[]).includes(cat) ? (cat as ProductCategory) : "accessories",
    };
  },
  head: () => ({
    meta: [
      { title: "Коллекция · MUNIS USMAN" },
      { name: "description", content: "Аксессуары, одежда и носимое искусство ручной работы из Ташкента." },
      { property: "og:title", content: "Collection · MUNIS USMAN" },
      { property: "og:description", content: "Handmade accessories, clothing and wearable art from Tashkent." },
    ],
  }),
});

function CollectionPage() {
  const { t } = useI18n();
  const { cat } = Route.useSearch();
  const activeCat: ProductCategory = cat ?? "accessories";

  const tabs: { id: ProductCategory; labelKey: string }[] = [
    { id: "accessories", labelKey: "collection.tabAccessories" },
    { id: "cloth", labelKey: "collection.tabCloth" },
    { id: "home", labelKey: "collection.tabHome" },
    { id: "couture", labelKey: "collection.tabCouture" },
  ];

  const filtered = products.filter((p) => p.category === activeCat);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="pb-24 lg:pb-0">
        <PageHero
          kicker={t("collection.kicker")}
          title={t("collection.title")}
          subtitle={t("collection.subtitle")}
        />

        {/* Sticky tab bar */}
        <div className="sticky top-[64px] z-30 border-b border-border/60 bg-cream/95 backdrop-blur-md lg:top-[80px]">
          <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-6 lg:px-12">
            {tabs.map((tab) => {
              const isActive = tab.id === activeCat;
              return (
                <Link
                  key={tab.id}
                  to="/collection"
                  search={{ cat: tab.id }}
                  className={`relative whitespace-nowrap py-4 text-[11px] uppercase tracking-[0.18em] font-sans transition-colors ${
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t(tab.labelKey)}
                  {isActive && (
                    <span className="absolute inset-x-0 bottom-0 h-[2px] bg-foreground" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        <section className="bg-cream py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            {filtered.length === 0 ? (
              <p className="py-20 text-center text-sm text-muted-foreground">—</p>
            ) : (
              <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((p, i) => (
                  <FadeUp key={p.slug} delay={(i % 3) * 100}>
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
                          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-deep/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        <span className="absolute bottom-3 right-3 bg-cream/90 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-foreground">
                          ${p.price}
                        </span>
                      </div>
                      <div className="mt-5">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-accent">{t(p.tagKey)}</p>
                        <h3 className="mt-2 font-display text-2xl text-foreground">{t(p.nameKey)}</h3>
                        {p.colors && p.colors.length > 0 && (
                          <div className="mt-2 flex items-center gap-1.5">
                            {p.colors.map((c) => (
                              <span
                                key={c.hex}
                                title={c.name}
                                className="block h-[10px] w-[10px] rounded-full border border-border/60"
                                style={{ backgroundColor: c.hex }}
                              />
                            ))}
                          </div>
                        )}
                        <p className="mt-2 text-sm text-muted-foreground">{t(p.descKey)}</p>
                      </div>
                    </Link>
                  </FadeUp>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
