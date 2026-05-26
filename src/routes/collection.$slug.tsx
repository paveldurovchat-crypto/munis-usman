import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Heart } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { FadeUp } from "@/components/FadeUp";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { useI18n } from "@/lib/i18n";
import { getProduct, products, type ProductColor, type ProductSpec } from "@/lib/products";
import { BRAND, mailtoLink } from "@/lib/brand";

export const Route = createFileRoute("/collection/$slug")({
  component: ProductPage,
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  notFoundComponent: () => {
    return (
      <div className="min-h-screen bg-background">
        <SiteNav />
        <div className="flex min-h-[60vh] items-center justify-center px-6 pt-32 text-center">
          <div>
            <h1 className="font-display text-4xl text-foreground">Не найдено</h1>
            <Link to="/collection" className="mt-6 inline-block text-sm uppercase tracking-[0.28em] text-accent">
              Collection
            </Link>
          </div>
        </div>
        <SiteFooter />
      </div>
    );
  },
  head: ({ params }) => {
    const product = getProduct(params.slug);
    return {
      meta: [
        { title: product ? `${params.slug} · MUNIS USMAN` : "MUNIS USMAN" },
        {
          name: "description",
          content: "Изделие ручной работы. Ограниченная серия или изготовление на заказ.",
        },
      ],
    };
  },
});

function ProductPage() {
  const { t } = useI18n();
  const { product } = Route.useLoaderData();
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [liked, setLiked] = useState(false);

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);
  const selectedColor = product.colors?.[selectedColorIdx];

  const subject = `Inquiry: ${product.slug}`;
  const body = `Hello MUNIS USMAN,\n\nI'm interested in "${product.slug}". Please share more details.\n\nThank you!`;

  const isMadeToOrder = product.tagKey === "collection.madeToOrder";

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
              {product.image ? (
                <img src={product.image} alt={t(product.nameKey)} className="h-full w-full object-cover" />
              ) : (
                <ImagePlaceholder variant="sand" label={t(product.tagKey)} />
              )}
            </div>
          </FadeUp>

          <div className="flex flex-col justify-center lg:col-span-5">
            <FadeUp>
              <p className="text-[10px] uppercase tracking-[0.3em] text-accent">{t(product.tagKey)}</p>
              <div className="mt-4 flex items-start justify-between gap-4">
                <h1 className="font-display text-4xl leading-[1.05] text-foreground lg:text-5xl">
                  {t(product.nameKey)}
                </h1>
                <button
                  aria-label="Wishlist"
                  onClick={() => setLiked((v) => !v)}
                  className="mt-2 shrink-0 text-foreground transition-colors hover:text-accent"
                >
                  <Heart className="h-5 w-5" fill={liked ? "currentColor" : "none"} strokeWidth={1.5} />
                </button>
              </div>
              <p className="mt-3 font-display text-2xl text-foreground">${product.price}</p>

              {product.colors && product.colors.length > 0 && (
                <div className="mt-5">
                  <div className="flex items-center gap-3">
                    {product.colors.map((c: ProductColor, idx: number) => {
                      const isSel = idx === selectedColorIdx;
                      return (
                        <button
                          key={c.hex}
                          aria-label={c.name}
                          onClick={() => setSelectedColorIdx(idx)}
                          className={`block h-5 w-5 rounded-full transition-all ${
                            isSel ? "scale-110 border-2 border-foreground" : "border border-border/60"
                          }`}
                          style={{ backgroundColor: c.hex }}
                        />
                      );
                    })}
                    {selectedColor && (
                      <span className="text-xs text-muted-foreground">
                        {selectedColor.name}
                      </span>
                    )}
                  </div>
                </div>
              )}

              <p className="mt-6 text-base leading-relaxed text-muted-foreground">{t(product.descKey)}</p>
            </FadeUp>

            {product.specs && product.specs.length > 0 && (
              <FadeUp delay={80}>
                <div className="mt-8">
                  {product.specs.map((s: ProductSpec) => (
                    <div key={s.label} className="flex items-center justify-between border-b border-border py-3">
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
                {isMadeToOrder ? (
                  <a
                    href={mailtoLink(subject, body)}
                    className="group inline-flex w-full items-center justify-center gap-3 bg-forest-deep px-8 py-4 text-[11px] uppercase tracking-[0.28em] text-cream transition-all hover:bg-forest"
                  >
                    {t("product.orderNow")}
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </a>
                ) : (
                  <button
                    onClick={() => {
                      // TODO: wire up cart
                    }}
                    className="group inline-flex w-full items-center justify-center gap-3 bg-forest-deep px-8 py-4 text-[11px] uppercase tracking-[0.28em] text-cream transition-all hover:bg-forest"
                  >
                    {t("product.addToCart")}
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </button>
                )}
                <a
                  href={BRAND.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex w-full items-center justify-center gap-3 border border-forest/30 px-8 py-4 text-[11px] uppercase tracking-[0.28em] text-foreground transition-all hover:border-forest"
                >
                  Instagram
                </a>
              </div>
            </FadeUp>
          </div>
        </section>

        <section className="mt-32 bg-cream py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <h2 className="font-display text-3xl text-foreground lg:text-4xl">You may also like</h2>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {related.map((p, i) => (
                <FadeUp key={p.slug} delay={i * 100}>
                  <Link to="/collection/$slug" params={{ slug: p.slug }} className="group block">
                    <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={t(p.nameKey)}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.05]"
                        />
                      ) : (
                        <ImagePlaceholder variant="sand" label={t(p.tagKey)} />
                      )}
                    </div>
                    <h3 className="mt-4 font-display text-xl text-foreground">{t(p.nameKey)}</h3>
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
