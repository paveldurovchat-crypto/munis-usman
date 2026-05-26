import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { FadeUp } from "@/components/FadeUp";
import { useI18n } from "@/lib/i18n";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { useJournalPosts, pickLocalized } from "@/lib/site-data";
import { mediaUrl } from "@/lib/media";

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
  const { t, lang } = useI18n();
  const { data: posts, isLoading } = useJournalPosts(true);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>
        <PageHero kicker={t("journal.kicker")} title={t("journal.title")} subtitle={t("journal.subtitle")} />

        <section className="bg-cream py-20 lg:py-28">
          <div className="mx-auto max-w-6xl space-y-24 px-6 lg:px-12">
            {isLoading && <p className="text-center text-sm text-muted-foreground">…</p>}
            {!isLoading && (posts ?? []).length === 0 && (
              <p className="text-center text-sm text-muted-foreground">Скоро здесь появятся истории из мастерской.</p>
            )}
            {(posts ?? []).map((post, i) => {
              const title = pickLocalized(post, "title", lang);
              const excerpt = pickLocalized(post, "excerpt", lang);
              const cover = mediaUrl(post.cover_path);
              const date = post.published_at
                ? new Date(post.published_at).toLocaleDateString(lang === "ru" ? "ru-RU" : "en-US", { year: "numeric", month: "long" })
                : "";
              return (
                <FadeUp key={post.id}>
                  <article className={`grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                    <div className="relative aspect-[4/5] overflow-hidden">
                      {cover
                        ? <img src={cover} alt={title} className="h-full w-full object-cover" />
                        : <ImagePlaceholder variant={i % 2 ? "cream" : "sand"} label={date} />}
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{date}</p>
                      <h2 className="mt-4 font-display text-3xl leading-[1.1] text-foreground lg:text-5xl">{title}</h2>
                      <p className="mt-6 text-base leading-relaxed text-muted-foreground">{excerpt}</p>
                    </div>
                  </article>
                </FadeUp>
              );
            })}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
