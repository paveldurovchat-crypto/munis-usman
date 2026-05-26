import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { FadeUp } from "@/components/FadeUp";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { useI18n } from "@/lib/i18n";
import { useProducts, pickLocalized } from "@/lib/site-data";
import { mediaUrl } from "@/lib/media";
import { formatUzs } from "@/lib/format";
import { supabase } from "@/integrations/supabase/client";

type Category = "accessories" | "cloth" | "home" | "couture";
type Search = { cat?: Category };

const validCats: Category[] = ["accessories", "cloth", "home", "couture"];

export const Route = createFileRoute("/collection/")({
  component: CollectionPage,
  validateSearch: (search: Record<string, unknown>): Search => {
    const cat = search.cat;
    return {
      cat: typeof cat === "string" && (validCats as string[]).includes(cat) ? (cat as Category) : "accessories",
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
  const { t, lang } = useI18n();
  const { cat } = Route.useSearch();
  const activeCat: Category = cat ?? "accessories";

  const tabs: { id: Category; labelKey: string }[] = [
    { id: "accessories", labelKey: "collection.tabAccessories" },
    { id: "cloth", labelKey: "collection.tabCloth" },
    { id: "home", labelKey: "collection.tabHome" },
    { id: "couture", labelKey: "collection.tabCouture" },
  ];

  const { data: products, isLoading } = useProducts(activeCat);

  const { data: covers } = useQuery({
    queryKey: ["cover-images", activeCat, (products ?? []).map((p) => p.id).join(",")],
    enabled: (products ?? []).length > 0,
    queryFn: async () => {
      const ids = (products ?? []).map((p) => p.id);
      const { data } = await supabase.from("product_images").select("product_id, storage_path, sort_order")
        .in("product_id", ids).order("sort_order");
      const map: Record<string, string> = {};
      (data ?? []).forEach((r: { product_id: string; storage_path: string }) => {
        if (!map[r.product_id]) map[r.product_id] = r.storage_path;
      });
      return map;
    },
  });

  // colors for product cards
  const { data: colorsMap } = useQuery({
    queryKey: ["cover-colors", activeCat, (products ?? []).map((p) => p.id).join(",")],
    enabled: (products ?? []).length > 0,
    queryFn: async () => {
      const ids = (products ?? []).map((p) => p.id);
      const { data } = await supabase.from("product_colors").select("product_id, name, hex, sort_order")
        .in("product_id", ids).order("sort_order");
      const map: Record<string, { name: string; hex: string }[]> = {};
      (data ?? []).forEach((c: { product_id: string; name: string; hex: string }) => {
        if (!map[c.product_id]) map[c.product_id] = [];
        map[c.product_id].push({ name: c.name, hex: c.hex });
      });
      return map;
    },
  });

  const list = products ?? [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="pb-24 lg:pb-0">
        <PageHero kicker={t("collection.kicker")} title={t("collection.title")} subtitle={t("collection.subtitle")} />

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
                  {isActive && <span className="absolute inset-x-0 bottom-0 h-[2px] bg-foreground" />}
                </Link>
              );
            })}
          </div>
        </div>

        <section className="bg-cream py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            {isLoading ? (
              <p className="py-20 text-center text-sm text-muted-foreground">…</p>
            ) : list.length === 0 ? (
              <p className="py-20 text-center text-sm text-muted-foreground">—</p>
            ) : (
              <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((p, i) => {
                  const cover = mediaUrl(covers?.[p.id] ?? null);
                  const colors = colorsMap?.[p.id] ?? [];
                  const name = pickLocalized(p, "name", lang);
                  const desc = pickLocalized(p, "desc", lang);
                  const tagLabel = p.tag === "madeToOrder" ? t("collection.madeToOrder") : t("collection.limited");
                  return (
                    <FadeUp key={p.slug} delay={(i % 3) * 100}>
                      <Link to="/collection/$slug" params={{ slug: p.slug }} className="group block">
                        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                          {cover ? (
                            <img src={cover} alt={name} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]" />
                          ) : (
                            <ImagePlaceholder variant="sand" label={tagLabel} />
                          )}
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-deep/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                          <span className="absolute bottom-3 right-3 bg-cream/90 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-foreground">
                            {formatUzs(p.price_uzs, lang)}
                          </span>
                        </div>
                        <div className="mt-5">
                          <p className="text-[10px] uppercase tracking-[0.3em] text-accent">{tagLabel}</p>
                          <h3 className="mt-2 font-display text-2xl text-foreground">{name}</h3>
                          {colors.length > 0 && (
                            <div className="mt-2 flex items-center gap-1.5">
                              {colors.map((c) => (
                                <span key={c.hex} title={c.name} className="block h-[10px] w-[10px] rounded-full border border-border/60" style={{ backgroundColor: c.hex }} />
                              ))}
                            </div>
                          )}
                          <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
                        </div>
                      </Link>
                    </FadeUp>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
