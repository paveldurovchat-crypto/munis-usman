import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { FadeUp } from "@/components/FadeUp";
import { useI18n } from "@/lib/i18n";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { useJournalPosts, pickLocalized } from "@/lib/site-data";
import { mediaUrl, youtubeThumb } from "@/lib/media";

export const Route = createFileRoute("/journal/")({
  component: JournalPage,
  head: () => ({
    meta: [
      { title: "Журнал · MUNIS USMAN - Notes from the studio" },
      { name: "description", content: "Истории из мастерской MUNIS USMAN - о ремесле, вдохновении и процессе создания каждой вещи. Stories from the studio - on craft, inspiration and process." },
      { property: "og:title", content: "Journal · MUNIS USMAN" },
      { property: "og:description", content: "Stories from the studio - on craft, inspiration and process." },
      { property: "og:url", content: "https://munis-usman.uz/journal" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Journal · MUNIS USMAN" },
      { name: "twitter:description", content: "Stories from the studio - on craft, inspiration and process." },
    ],
    links: [{ rel: "canonical", href: "https://munis-usman.uz/journal" }],
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

        <section className="bg-cream py-16 lg:py-28">
          <div className="mx-auto max-w-6xl space-y-20 px-5 sm:px-6 lg:space-y-24 lg:px-12">
            {isLoading && <p className="text-center text-sm text-muted-foreground">{t("journal.loading")}</p>}
            {!isLoading && (posts ?? []).length === 0 && (
              <p className="text-center text-sm text-muted-foreground">{t("journal.empty")}</p>
            )}
            {(posts ?? []).map((post, i) => {
              const title = pickLocalized(post, "title", lang);
              const excerpt = pickLocalized(post, "excerpt", lang);
              const cover = mediaUrl(post.cover_path) ?? youtubeThumb(post.youtube_url);
              const date = post.published_at
                ? new Date(post.published_at).toLocaleDateString(lang === "ru" ? "ru-RU" : "en-US", { year: "numeric", month: "long" })
                : "";
              return (
                <FadeUp key={post.id}>
                  <article className={`grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                    <Link
                      to="/journal/$slug"
                      params={{ slug: post.slug }}
                      className="group relative block aspect-[4/5] overflow-hidden bg-muted"
                      aria-label={title}
                    >
                      {cover ? (
                        <img
                          src={cover}
                          alt={title}
                          loading={i < 2 ? "eager" : "lazy"}
                          decoding="async"
                          fetchPriority={i === 0 ? "high" : "auto"}
                          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                        />
                      ) : (
                        <ImagePlaceholder variant={i % 2 ? "cream" : "sand"} label={date} />
                      )}
                      {post.youtube_url && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/20">
                          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-background/90 shadow-lg sm:h-20 sm:w-20">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-6 w-6 text-foreground sm:h-8 sm:w-8">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </span>
                        </div>
                      )}
                    </Link>
                    <div className="flex flex-col justify-center">
                      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{date}</p>
                      <h2 className="mt-3 font-display text-3xl leading-[1.1] text-foreground sm:text-4xl lg:text-5xl">
                        <Link to="/journal/$slug" params={{ slug: post.slug }} className="transition-colors hover:text-accent">
                          {title}
                        </Link>
                      </h2>
                      <p className="mt-5 text-base leading-relaxed text-muted-foreground lg:text-lg">{excerpt}</p>
                      <div className="mt-7">
                        <Link
                          to="/journal/$slug"
                          params={{ slug: post.slug }}
                          className="inline-flex items-center gap-3 border-b border-accent pb-1 text-[11px] uppercase tracking-[0.28em] text-foreground transition-colors hover:text-accent"
                        >
                          {t("journal.readMore")}
                          <span aria-hidden>→</span>
                        </Link>
                      </div>
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
