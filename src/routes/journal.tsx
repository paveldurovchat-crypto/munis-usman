import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { FadeUp } from "@/components/FadeUp";
import { useI18n } from "@/lib/i18n";
import journal1 from "@/assets/journal-1.jpg";
import journal2 from "@/assets/journal-2.jpg";
import journal3 from "@/assets/journal-3.jpg";

export const Route = createFileRoute("/journal")({
  component: JournalPage,
  head: () => ({
    meta: [
      { title: "Дневник · MUNIS USMAN" },
      { name: "description", content: "Истории из мастерской — о ремесле, вдохновении и процессе." },
      { property: "og:title", content: "Journal · MUNIS USMAN" },
      { property: "og:description", content: "Stories from the studio — on craft, inspiration and process." },
    ],
  }),
});

function JournalPage() {
  const { t } = useI18n();
  const posts = [
    { img: journal1, title: t("journal.post1Title"), excerpt: t("journal.post1Excerpt"), date: t("journal.post1Date") },
    { img: journal2, title: t("journal.post2Title"), excerpt: t("journal.post2Excerpt"), date: t("journal.post2Date") },
    { img: journal3, title: t("journal.post3Title"), excerpt: t("journal.post3Excerpt"), date: t("journal.post3Date") },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>
        <PageHero kicker={t("journal.kicker")} title={t("journal.title")} subtitle={t("journal.subtitle")} />

        <section className="bg-cream py-20 lg:py-28">
          <div className="mx-auto max-w-6xl space-y-24 px-6 lg:px-12">
            {posts.map((post, i) => (
              <FadeUp key={post.title}>
                <article className={`grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img src={post.img} alt={post.title} loading="lazy" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{post.date}</p>
                    <h2 className="mt-4 font-display text-3xl leading-[1.1] text-foreground lg:text-5xl">
                      {post.title}
                    </h2>
                    <p className="mt-6 text-base leading-relaxed text-muted-foreground">{post.excerpt}</p>
                    <button className="mt-8 w-fit text-xs uppercase tracking-[0.28em] text-accent transition-colors hover:text-forest">
                      {t("journal.readMore")} →
                    </button>
                  </div>
                </article>
              </FadeUp>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
