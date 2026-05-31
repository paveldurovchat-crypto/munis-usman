import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
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

type SortKey = "newest" | "priceAsc" | "priceDesc";
type FilterKey = "all" | "limited" | "madeToOrder";

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

  const [sort, setSort] = useState<SortKey>("newest");
  const [filter, setFilter] = useState<FilterKey>("all");
  const [openMenu, setOpenMenu] = useState<"sort" | "filter" | null>(null);

  const list = useMemo(() => {
    let arr = products ?? [];
    if (filter === "limited") arr = arr.filter((p) => p.tag !== "madeToOrder");
    else if (filter === "madeToOrder") arr = arr.filter((p) => p.tag === "madeToOrder");
    arr = [...arr];
    if (sort === "priceAsc") arr.sort((a, b) => a.price_uzs - b.price_uzs);
    else if (sort === "priceDesc") arr.sort((a, b) => b.price_uzs - a.price_uzs);
    return arr;
  }, [products, filter, sort]);


  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="pb-28 lg:pb-0">
        {/* Mobile banner */}
        <section className="relative w-full overflow-hidden lg:hidden pt-14">
          <div className="relative h-[34vh] min-h-[220px] w-full">
            <img src="/og-image.jpg" alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-black/45" />
            <div className="absolute inset-0 flex flex-col justify-center px-6 text-white">
              <p className="absolute right-6 top-6 text-[10px] uppercase tracking-[0.28em] text-white/90 font-display">
                {t(`collection.tab${activeCat.charAt(0).toUpperCase() + activeCat.slice(1)}`)}
              </p>
              <h1 className="font-display text-3xl leading-[1.05] tracking-[0.02em] uppercase font-light max-w-[14rem] whitespace-pre-line">
                {t("collection.bannerTitle")}
              </h1>
              <p className="mt-3 font-display italic text-[11px] text-white/85 max-w-[18rem]">
                {t("collection.bannerSubtitle")}
              </p>
            </div>
          </div>
          <div className="relative flex items-center justify-between border-b border-border/60 px-6 py-4">
            <button
              type="button"
              onClick={() => setOpenMenu(openMenu === "sort" ? null : "sort")}
              className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-foreground font-sans"
            >
              {t("collection.filter")}
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.25"><path d="M0 1h14M2 5h10M5 9h4"/></svg>
            </button>
            <button
              type="button"
              onClick={() => setOpenMenu(openMenu === "filter" ? null : "filter")}
              className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-foreground font-sans"
            >
              {t(`collection.filter${filter === "all" ? "All" : filter === "limited" ? "Limited" : "MadeToOrder"}`)}
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.25"><path d="m1 1 4 4 4-4"/></svg>
            </button>

            {openMenu === "sort" && (
              <div className="absolute left-4 top-full z-40 mt-1 min-w-[220px] border border-border/60 bg-background shadow-lg">
                {(["newest", "priceAsc", "priceDesc"] as SortKey[]).map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => { setSort(k); setOpenMenu(null); }}
                    className={`block w-full px-4 py-3 text-left text-[11px] uppercase tracking-[0.18em] font-sans hover:bg-muted ${sort === k ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    {t(`collection.sort${k === "newest" ? "Newest" : k === "priceAsc" ? "PriceAsc" : "PriceDesc"}`)}
                  </button>
                ))}
              </div>
            )}
            {openMenu === "filter" && (
              <div className="absolute right-4 top-full z-40 mt-1 min-w-[220px] border border-border/60 bg-background shadow-lg">
                {(["all", "limited", "madeToOrder"] as FilterKey[]).map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => { setFilter(k); setOpenMenu(null); }}
                    className={`block w-full px-4 py-3 text-left text-[11px] uppercase tracking-[0.18em] font-sans hover:bg-muted ${filter === k ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    {t(`collection.filter${k === "all" ? "All" : k === "limited" ? "Limited" : "MadeToOrder"}`)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Desktop hero + sticky tabs */}
        <div className="hidden lg:block">
          <PageHero kicker={t("collection.kicker")} title={t("collection.title")} subtitle={t("collection.subtitle")} />
          <div className="sticky top-[80px] z-30 border-b border-border/60 bg-cream/95 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-12">
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
        </div>

        <section className="bg-background py-6 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-12">
            {isLoading ? (
              <p className="py-20 text-center text-sm text-muted-foreground">…</p>
            ) : list.length === 0 ? (
              <p className="py-20 text-center text-sm text-muted-foreground">—</p>
            ) : (
              <div className="grid grid-cols-2 gap-x-2 gap-y-8 sm:gap-x-8 sm:gap-y-14 lg:grid-cols-3">
                {list.map((p, i) => {
                  const cover = mediaUrl(covers?.[p.id] ?? null);
                  const colors = colorsMap?.[p.id] ?? [];
                  const name = pickLocalized(p, "name", lang);
                  const tagLabel = p.tag === "madeToOrder" ? t("collection.madeToOrder") : t("collection.limited");
                  return (
                    <FadeUp key={p.slug} delay={(i % 3) * 80}>
                      <Link to="/collection/$slug" params={{ slug: p.slug }} className="group block">
                        <div className="relative aspect-square overflow-hidden bg-muted">
                          {cover ? (
                            <img src={cover} alt={name} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]" />
                          ) : (
                            <ImagePlaceholder variant="sand" label={tagLabel} />
                          )}
                        </div>
                        <div className="mt-3 px-1">
                          {colors.length > 0 && (
                            <div className="flex items-center gap-1">
                              {colors.map((c) => (
                                <span key={c.hex} title={c.name} className="block h-2 w-2 rounded-full" style={{ backgroundColor: c.hex }} />
                              ))}
                            </div>
                          )}
                          <div className="mt-2 flex items-start justify-between gap-2">
                            <h3 className="font-sans text-[11px] uppercase tracking-[0.1em] text-foreground leading-[1.35]">{name}</h3>
                            <p className="font-display text-[13px] text-foreground whitespace-nowrap shrink-0">{formatUzs(p.price_uzs, lang)}</p>
                          </div>
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
