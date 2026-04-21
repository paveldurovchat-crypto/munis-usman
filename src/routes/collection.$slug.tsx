import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { FadeUp } from "@/components/FadeUp";
import { useI18n } from "@/lib/i18n";
import { getProduct, products } from "@/lib/products";
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
              ← Collection
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

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  const subject = `Inquiry: ${product.slug}`;
  const body = `Hello MUNIS USMAN,\n\nI'm interested in "${product.slug}". Please share more details.\n\nThank you!`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="pt-28 lg:pt-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <Link to="/collection" className="text-xs uppercase tracking-[0.28em] text-muted-foreground hover:text-accent">
            {t("product.backToCollection")}
          </Link>
        </div>

        <section className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:gap-16 lg:px-12">
          <FadeUp className="lg:col-span-7">
            <div className="relative aspect-[4/5] overflow-hidden bg-muted">
              <img src={product.image} alt={t(product.nameKey)} className="h-full w-full object-cover" />
            </div>
          </FadeUp>

          <div className="flex flex-col justify-center lg:col-span-5">
            <FadeUp>
              <p className="text-[10px] uppercase tracking-[0.3em] text-accent">{t(product.tagKey)}</p>
              <h1 className="mt-4 font-display text-4xl leading-[1.05] text-foreground lg:text-5xl">
                {t(product.nameKey)}
              </h1>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">{t(product.descKey)}</p>
            </FadeUp>
            <FadeUp delay={120}>
              <div className="mt-10 border-t border-border pt-8 text-sm leading-relaxed text-muted-foreground">
                <p>{t("product.madeToOrderNote")}</p>
              </div>
            </FadeUp>
            <FadeUp delay={200}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={mailtoLink(subject, body)}
                  className="group inline-flex items-center gap-3 border border-forest/60 bg-forest px-8 py-4 text-[11px] uppercase tracking-[0.28em] text-cream transition-all hover:bg-forest-deep"
                >
                  {t("cta.inquire")}
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
                <a
                  href={BRAND.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-3 border border-forest/30 px-8 py-4 text-[11px] uppercase tracking-[0.28em] text-foreground transition-all hover:border-forest"
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
                      <img
                        src={p.image}
                        alt={t(p.nameKey)}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.05]"
                      />
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
