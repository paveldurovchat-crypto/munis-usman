import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { useI18n } from "@/lib/i18n";
import { useJournalPostBySlug, pickLocalized } from "@/lib/site-data";
import { mediaUrl, youtubeEmbed, youtubeThumb, isYoutubeShort } from "@/lib/media";

export const Route = createFileRoute("/journal/$slug")({
  component: JournalPostPage,
});

const SITE = "https://munis-usman.uz";

function JournalPostPage() {
  const { slug } = useParams({ from: "/journal/$slug" });
  const { t, lang } = useI18n();
  const { data: post, isLoading } = useJournalPostBySlug(slug);

  const title = post ? pickLocalized(post, "title", lang) : "";
  const excerpt = post ? pickLocalized(post, "excerpt", lang) : "";
  const body = post ? pickLocalized(post, "body_md", lang) : "";
  const cover = mediaUrl(post?.cover_path);
  const ytEmbed = youtubeEmbed(post?.youtube_url);
  const ytThumb = youtubeThumb(post?.youtube_url);
  const heroImage = cover ?? ytThumb;
  const date = post?.published_at
    ? new Date(post.published_at).toLocaleDateString(lang === "ru" ? "ru-RU" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className="min-h-screen bg-background text-foreground">
      {post && (
        <SeoHead
          title={`${title} · MUNIS USMAN`}
          description={excerpt || title}
          image={heroImage}
          slug={post.slug}
          publishedAt={post.published_at}
          articleTitle={title}
        />
      )}
      <SiteNav />
      <main>
        {isLoading && (
          <div className="py-32 text-center text-sm text-muted-foreground">{t("journal.loading")}</div>
        )}
        {!isLoading && !post && (
          <div className="py-32 text-center">
            <p className="text-sm text-muted-foreground">{t("journal.empty")}</p>
            <Link to="/journal" className="mt-6 inline-block text-xs uppercase tracking-[0.28em] text-accent">
              ← {t("nav.journal")}
            </Link>
          </div>
        )}
        {post && (
          <article className="bg-cream pb-24 pt-12 lg:pb-32 lg:pt-20">
            <div className="mx-auto max-w-3xl px-5 lg:px-8">
              <Link
                to="/journal"
                className="mb-8 inline-block text-[11px] uppercase tracking-[0.28em] text-muted-foreground hover:text-accent"
              >
                ← {t("journal.title")}
              </Link>
              {date && (
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{date}</p>
              )}
              <h1 className="mt-4 font-display text-4xl leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
                {title}
              </h1>
              {excerpt && (
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground lg:text-xl">{excerpt}</p>
              )}

              {ytEmbed ? (
                <div className="mt-10 aspect-video w-full overflow-hidden bg-black">
                  <iframe
                    src={ytEmbed}
                    title={title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>
              ) : cover ? (
                <figure className="mt-10 overflow-hidden">
                  <img
                    src={cover}
                    alt={title}
                    loading="eager"
                    decoding="async"
                    className="h-auto w-full object-cover"
                  />
                </figure>
              ) : null}

              {body && (
                <div className="prose prose-neutral mt-12 max-w-none font-body text-base leading-relaxed text-foreground sm:text-lg">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({ children }) => (
                        <h2 className="mt-12 font-display text-3xl leading-tight text-foreground lg:text-4xl">{children}</h2>
                      ),
                      h2: ({ children }) => (
                        <h2 className="mt-12 font-display text-2xl leading-tight text-foreground lg:text-3xl">{children}</h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="mt-10 font-display text-xl leading-tight text-foreground lg:text-2xl">{children}</h3>
                      ),
                      p: ({ children }) => (
                        <p className="mt-5 leading-relaxed text-foreground/85">{children}</p>
                      ),
                      a: ({ href, children }) => (
                        <a href={href} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-4 hover:opacity-80">
                          {children}
                        </a>
                      ),
                      img: ({ src, alt }) => (
                        <figure className="my-10">
                          <img
                            src={typeof src === "string" ? src : ""}
                            alt={alt ?? ""}
                            loading="lazy"
                            decoding="async"
                            className="h-auto w-full object-cover"
                          />
                          {alt && (
                            <figcaption className="mt-3 text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
                              {alt}
                            </figcaption>
                          )}
                        </figure>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="my-8 border-l-2 border-accent pl-5 font-display text-xl italic text-foreground/80">
                          {children}
                        </blockquote>
                      ),
                      ul: ({ children }) => <ul className="mt-5 list-disc space-y-2 pl-6">{children}</ul>,
                      ol: ({ children }) => <ol className="mt-5 list-decimal space-y-2 pl-6">{children}</ol>,
                    }}
                  >
                    {body}
                  </ReactMarkdown>
                </div>
              )}

              <div className="mt-16 border-t border-border pt-8">
                <Link to="/journal" className="text-[11px] uppercase tracking-[0.28em] text-accent hover:underline">
                  ← {t("journal.title")}
                </Link>
              </div>
            </div>
          </article>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

function SeoHead({
  title,
  description,
  image,
  slug,
  publishedAt,
  articleTitle,
}: {
  title: string;
  description: string;
  image: string | null;
  slug: string;
  publishedAt: string | null;
  articleTitle: string;
}) {
  const url = `${SITE}/journal/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: articleTitle,
    description,
    image: image ? [image] : undefined,
    datePublished: publishedAt,
    author: { "@type": "Organization", name: "MUNIS USMAN" },
    publisher: { "@type": "Organization", name: "MUNIS USMAN" },
    mainEntityOfPage: url,
  };
  return (
    <>
      {/* Inline head tags — TanStack head() is static; we rely on dynamic data here */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={image} />}
      {image && <meta name="twitter:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <link rel="canonical" href={url} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
