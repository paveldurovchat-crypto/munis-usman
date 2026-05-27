import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { useCart } from "@/lib/cart";
import { useI18n } from "@/lib/i18n";
import { formatUzs } from "@/lib/format";

export const Route = createFileRoute("/cart")({
  component: CartPage,
  head: () => ({
    meta: [
      { title: "Корзина · MUNIS USMAN" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
});

function CartPage() {
  const { t, lang } = useI18n();
  const { items, subtotal, setQty, remove } = useCart();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="mx-auto max-w-6xl px-6 pt-32 pb-24 lg:px-12">
        <p className="text-[10px] uppercase tracking-[0.3em] text-accent">{t("nav.cart")}</p>
        <h1 className="mt-3 font-display text-4xl text-foreground lg:text-5xl">{t("cart.title")}</h1>

        {items.length === 0 ? (
          <div className="mt-16 border-t border-border pt-16 text-center">
            <p className="text-sm text-muted-foreground">{t("cart.empty")}</p>
            <Link
              to="/collection"
              className="mt-8 inline-block bg-forest-deep px-8 py-4 text-[11px] uppercase tracking-[0.28em] text-cream hover:bg-forest"
            >
              {t("cart.emptyCta")}
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <ul className="divide-y divide-border border-y border-border">
                {items.map((it) => {
                  const name = lang === "ru" ? it.name_ru : it.name_en;
                  return (
                    <li key={`${it.productId}-${it.color ?? ""}`} className="flex gap-6 py-6">
                      <div className="h-24 w-20 shrink-0 bg-muted">
                        {it.image && <img src={it.image} alt={name} className="h-full w-full object-cover" />}
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <Link to="/collection/$slug" params={{ slug: it.slug }} className="font-display text-xl text-foreground hover:text-accent">
                              {name}
                            </Link>
                            {it.color && (
                              <p className="mt-1 text-xs text-muted-foreground">{t("collection.selectedColor")}: {it.color}</p>
                            )}
                          </div>
                          <button
                            onClick={() => remove(it.productId, it.color)}
                            aria-label={t("cart.remove")}
                            className="text-muted-foreground transition-colors hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-auto flex items-end justify-between pt-4">
                          <div className="inline-flex items-center border border-border">
                            <button
                              aria-label="-"
                              onClick={() => setQty(it.productId, it.color, it.qty - 1)}
                              className="px-3 py-2 text-foreground hover:bg-muted"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="min-w-[2rem] px-3 text-center text-sm">{it.qty}</span>
                            <button
                              aria-label="+"
                              onClick={() => setQty(it.productId, it.color, it.qty + 1)}
                              className="px-3 py-2 text-foreground hover:bg-muted"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <p className="font-display text-lg">{formatUzs(it.price_uzs * it.qty, lang)}</p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <aside className="lg:col-span-4">
              <div className="border border-border bg-cream/60 p-6">
                <h2 className="font-display text-2xl text-foreground">{t("checkout.summary")}</h2>
                <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-sm">
                  <span className="text-muted-foreground">{t("cart.subtotal")}</span>
                  <span className="font-display text-lg">{formatUzs(subtotal, lang)}</span>
                </div>
                <Link
                  to="/checkout"
                  className="mt-8 block w-full bg-forest-deep px-8 py-4 text-center text-[11px] uppercase tracking-[0.28em] text-cream hover:bg-forest"
                >
                  {t("cart.checkout")}
                </Link>
                <Link
                  to="/collection"
                  className="mt-3 block w-full border border-forest/30 px-8 py-4 text-center text-[11px] uppercase tracking-[0.28em] text-foreground hover:border-forest"
                >
                  {t("cart.continue")}
                </Link>
              </div>
            </aside>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
