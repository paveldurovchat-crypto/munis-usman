import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { FadeUp } from "@/components/FadeUp";
import { useI18n } from "@/lib/i18n";
import collection3 from "@/assets/collection-3.jpg";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "О бренде · MUNIS USMAN" },
      { name: "description", content: "История дизайнерского бренда MUNIS USMAN — Ташкент, с 2014 года." },
      { property: "og:title", content: "About · MUNIS USMAN" },
      { property: "og:description", content: "A heritage, handwoven since 2014. Tashkent, Uzbekistan." },
    ],
  }),
});

function AboutPage() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>
        <PageHero kicker={t("about.kicker")} title={t("about.title")} subtitle={t("about.intro")} />

        <section className="bg-cream py-24 lg:py-32">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 px-6 lg:grid-cols-2 lg:gap-24 lg:px-12">
            <FadeUp>
              <div className="relative aspect-[3/4] overflow-hidden">
                <img src={collection3} alt="Atelier" loading="lazy" className="h-full w-full object-cover" />
              </div>
            </FadeUp>
            <div className="flex flex-col justify-center gap-8">
              <FadeUp delay={100}>
                <p className="text-base leading-relaxed text-muted-foreground">{t("about.story1")}</p>
              </FadeUp>
              <FadeUp delay={200}>
                <p className="text-base leading-relaxed text-muted-foreground">{t("about.story2")}</p>
              </FadeUp>
              <FadeUp delay={300}>
                <p className="text-base leading-relaxed text-muted-foreground">{t("about.story3")}</p>
              </FadeUp>
            </div>
          </div>
        </section>

        <section className="bg-burgundy py-24 text-cream lg:py-32">
          <div className="mx-auto max-w-6xl px-6 lg:px-12">
            <FadeUp>
              <p className="mb-4 text-xs uppercase tracking-[0.4em] text-gold-soft">
                {t("about.valuesTitle")}
              </p>
            </FadeUp>
            <div className="mt-12 grid grid-cols-1 gap-10 border-t border-cream/15 pt-12 md:grid-cols-3">
              {[
                ["01", t("about.value1Title"), t("about.value1Body")],
                ["02", t("about.value2Title"), t("about.value2Body")],
                ["03", t("about.value3Title"), t("about.value3Body")],
              ].map(([n, title, body], i) => (
                <FadeUp key={n} delay={i * 120}>
                  <div>
                    <span className="font-display text-3xl text-gold">{n}</span>
                    <h3 className="mt-4 font-display text-2xl">{title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-cream/75">{body}</p>
                  </div>
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
