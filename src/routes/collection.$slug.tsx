import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { FadeUp } from "@/components/FadeUp";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { useI18n } from "@/lib/i18n";
import { useProductBySlug, useProducts, pickLocalized } from "@/lib/site-data";
import { mediaUrl } from "@/lib/media";
import { formatUzs } from "@/lib/format";
import { BRAND } from "@/lib/brand";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";

export const Route = createFileRoute("/collection/$slug")({
  component: ProductPage,
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug} · MUNIS USMAN` },
      { name: "description", content: "Изделие ручной работы. Ограниченная серия или изготовление на заказ." },
    ],
  }),
});

function ProductPage() {
  const { t, lang } = useI18n();
  const { slug } = Route.useParams();
  const { data: product, isLoading } = useProductBySlug(slug);
  const { data: allProducts } = useProducts();
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const cart = useCart();
  const wishlist = useWishlist();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <SiteNav />
        <div className="flex min-h-[60vh] items-center justify-center"><p className="text-sm text-muted-foreground">…</p></div>
        <SiteFooter />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <SiteNav />
        <div className="flex min-h-[60vh] items-center justify-center px-6 pt-32 text-center">
          <div>
            <h1 className="font-display text-4xl text-foreground">{t("collection.notFound")}</h1>
            <Link to="/collection" className="mt-6 inline-block text-sm uppercase tracking-[0.28em] text-accent">{t("collection.kicker")}</Link>
          </div>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const name = pickLocalized(product, "name", lang);
  const desc = pickLocalized(product, "desc", lang);
  const tagLabel = product.tag === "madeToOrder" ? t("collection.madeToOrder") : t("collection.limited");
  const isMadeToOrder = product.tag === "madeToOrder";
  const cover = mediaUrl(product.images[0]?.storage_path ?? null);
  const selectedColor = product.colors[selectedColorIdx];

  const related = (allProducts ?? []).filter((p) => p.slug !== product.slug).slice(0, 3);
  const liked = wishlist.has(product.id);

  const handleAddToCart = () => {
    cart.add(
      {
        productId: product.id,
        slug: product.slug,
        name_ru: product.name_ru,
        name_en: product.name_en,
        price_uzs: product.price_uzs,
        image: product.images[0]?.storage_path ?? null,
        color: selectedColor?.name ?? null,
      },
      1,
    );
    toast.success(t("product.addedToCart"));
  };

  const handleToggleWishlist = async () => {
    await wishlist.toggle(product.id);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="pt-28 pb-24 lg:pt-36 lg:pb-0">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <Link to="/collection" className="text-xs uppercase tracking-[0.28em] text-muted-foreground hover:text-accent">
            {t("product.backToCollection")}
          </Link>
        </div>

        <section className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:gap-16 lg:px-12">
          <FadeUp className="lg:col-span-7">
            <div className="relative aspect-[4/5] overflow-hidden bg-muted">
              {cover ? (
                <img src={cover} alt={name} className="h-full w-full object-cover" />
              ) : (
                <ImagePlaceholder variant="sand" label={tagLabel} />
              )}
            </div>
            {product.images.length > 1 && (
              <div className="mt-3 grid grid-cols-5 gap-2">
                {product.images.map((img) => (
                  <div key={img.id} className="aspect-square overflow-hidden bg-muted">
                    <img src={mediaUrl(img.storage_path) ?? ""} alt="" className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </FadeUp>

          <div className="flex flex-col justify-center lg:col-span-5">
            <FadeUp>
              <p className="text-[10px] uppercase tracking-[0.3em] text-accent">{tagLabel}</p>
              <div className="mt-4 flex items-start justify-between gap-4">
                <h1 className="font-display text-4xl leading-[1.05] text-foreground lg:text-5xl">{name}</h1>
                <button aria-label="Wishlist" onClick={handleToggleWishlist} className="mt-2 shrink-0 text-foreground transition-colors hover:text-accent">
                  <Heart className="h-5 w-5" fill={liked ? "currentColor" : "none"} strokeWidth={1.5} />
                </button>
              </div>
              <p className="mt-3 font-display text-2xl text-foreground">{formatUzs(product.price_uzs, lang)}</p>

              {product.colors.length > 0 && (
                <div className="mt-5">
                  <div className="flex items-center gap-3">
                    {product.colors.map((c, idx) => {
                      const isSel = idx === selectedColorIdx;
                      return (
                        <button key={c.id} aria-label={c.name} onClick={() => setSelectedColorIdx(idx)}
                          className={`block h-5 w-5 rounded-full transition-all ${isSel ? "scale-110 border-2 border-foreground" : "border border-border/60"}`}
                          style={{ backgroundColor: c.hex }} />
                      );
                    })}
                    {selectedColor && <span className="text-xs text-muted-foreground">{selectedColor.name}</span>}
                  </div>
                </div>
              )}

              <p className="mt-6 text-base leading-relaxed text-muted-foreground">{desc}</p>
            </FadeUp>

            {product.specs.length > 0 && (
              <FadeUp delay={80}>
                <div className="mt-8">
                  {product.specs.map((s) => (
                    <div key={s.id} className="flex items-center justify-between border-b border-border py-3">
                      <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">{s.label}</span>
                      <span className="text-sm text-foreground">{s.value}</span>
                    </div>
                  ))}
                </div>
              </FadeUp>
            )}

            <FadeUp delay={120}>
              <div className="mt-8 border-t border-border pt-6 text-sm leading-relaxed text-muted-foreground">
                <p>{t("product.madeToOrderNote")}</p>
              </div>
            </FadeUp>

            <FadeUp delay={200}>
              <div className="mt-8 flex flex-col gap-3">
                <button onClick={handleAddToCart} className="group inline-flex w-full items-center justify-center gap-3 bg-forest-deep px-8 py-4 text-[11px] uppercase tracking-[0.28em] text-cream transition-all hover:bg-forest">
                  {isMadeToOrder ? t("product.orderNow") : t("product.addToCart")}
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </button>
                <a href={BRAND.instagram} target="_blank" rel="noreferrer noopener" className="inline-flex w-full items-center justify-center gap-3 border border-forest/30 px-8 py-4 text-[11px] uppercase tracking-[0.28em] text-foreground transition-all hover:border-forest">
                  Instagram
                </a>
              </div>
            </FadeUp>
          </div>
        </section>

        <section className="mt-32 bg-cream py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <h2 className="font-display text-3xl text-foreground lg:text-4xl">{t("collection.related")}</h2>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {related.map((p, i) => {
                const rName = pickLocalized(p, "name", lang);
                const rTag = p.tag === "madeToOrder" ? t("collection.madeToOrder") : t("collection.limited");
                return (
                  <FadeUp key={p.slug} delay={i * 100}>
                    <Link to="/collection/$slug" params={{ slug: p.slug }} className="group block">
                      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                        <ImagePlaceholder variant="sand" label={rTag} />
                      </div>
                      <h3 className="mt-4 font-display text-xl text-foreground">{rName}</h3>
                    </Link>
                  </FadeUp>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
