import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { Hero } from "@/components/Hero";
import { SiteFooter } from "@/components/SiteFooter";
import { FadeUp } from "@/components/FadeUp";
import { useI18n } from "@/lib/i18n";
import { useMediaLibrary, pickAssetBySlot, assetDisplayUrl, type MediaSlot } from "@/lib/media-slots";
import heroReliefWebp from "@/assets/home-hero-relief.webp";
import artOfHandsVideo from "@/assets/art-of-hands.mp4";
import artOfHandsPoster from "@/assets/art-of-hands-poster.jpg";


export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "MUNIS USMAN. Handmade accessories and clothing from Tashkent" },
      {
        name: "description",
        content:
          "MUNIS USMAN is a handcraft studio in Tashkent making embroidered accessories, phone cases and wearable art since 2014. Limited editions and made to order.",
      },
      { property: "og:title", content: "MUNIS USMAN. Handmade accessories and clothing from Tashkent" },
      {
        property: "og:description",
        content:
          "Handcraft studio in Tashkent. Embroidered accessories, phone cases and wearable art since 2014.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preload", as: "image", href: heroReliefWebp, type: "image/webp" },
    ],
  }),
});

type Tile = {
  cat: "accessories" | "cloth" | "home" | "couture";
  label: string;
  subKey: string;
  image: string | null;
  slot: MediaSlot;
};

function Index() {
  const { t } = useI18n();
  const { data: mediaAssets, isLoading: mediaLoading } = useMediaLibrary();
  const pick = (slot: MediaSlot) => assetDisplayUrl(pickAssetBySlot(mediaAssets, slot));
  void mediaLoading;


  const tiles: Tile[] = [
    { cat: "accessories", label: t("collection.tabAccessories"), subKey: "home.tileAccessoriesSub", image: pick("tile-accessories"), slot: "tile-accessories" },
    { cat: "cloth", label: t("collection.tabCloth"), subKey: "home.tileClothSub", image: pick("tile-cloth"), slot: "tile-cloth" },
    { cat: "home", label: t("collection.tabHome"), subKey: "home.tileHomeSub", image: pick("tile-home"), slot: "tile-home" },
    { cat: "couture", label: t("collection.tabCouture"), subKey: "home.tileCoutureSub", image: pick("tile-couture"), slot: "tile-couture" },
  ];

  
  const aboutPortraitImg = pick("about-portrait");
  const craftImgs = [
    pick("craft-1"),
    pick("craft-2"),
    pick("craft-3"),
  ];


  return (
    <div className="min-h-screen bg-sand text-foreground">
      <SiteNav />
      <main className="pt-[60px] pb-20 lg:pt-[72px] lg:pb-0">
        <Hero />

        {/* Category tiles — mobile horizontal scroll, desktop 4-up grid */}
        <section className="bg-sand pt-0 lg:mt-[2px]">
          <div className="w-full">
            {/* Mobile: static 4-column grid, edge to edge, all four visible */}
            <div className="grid grid-cols-4 gap-[2px] lg:hidden">
              {tiles.map((tile) => (
                <Link
                  key={tile.cat}
                  to="/collection"
                  search={{ cat: tile.cat } as never}
                  className="group relative block aspect-[19/33] overflow-hidden bg-[var(--sand-dark)]"
                >
                  {tile.image && <img src={tile.image} alt={tile.label} loading="lazy" className="h-full w-full object-cover" />}
                  <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/75 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 px-1.5 pb-2 text-left text-white">
                    <p className="font-optima text-[10px] font-normal leading-[1.05] uppercase">{tile.label}</p>
                    <p className="mt-0.5 font-optima text-[9px] leading-none text-white/80">/ {t(tile.subKey)}</p>
                  </div>
                </Link>
              ))}
            </div>



            {/* Desktop: 4-up grid, 2px gap */}
            <div className="hidden lg:grid lg:grid-cols-4 lg:gap-[2px]">
              {tiles.map((tile, i) => (
                <FadeUp key={tile.cat} delay={i * 90}>
                  <Link
                    to="/collection"
                    search={{ cat: tile.cat } as never}
                    className="group relative block aspect-[3/4] overflow-hidden bg-[var(--sand-dark)]"
                  >
                    {tile.image && (
                      <img
                        src={tile.image}
                        alt={tile.label}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                      />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 px-4 pb-4 text-left text-sand">
                      <p className="font-optima text-2xl font-normal uppercase sm:text-[26px]">{tile.label}</p>
                      <p className="mt-1 font-optima text-sm text-sand/80 sm:text-[15px]">
                        / {t(tile.subKey)}
                      </p>
                    </div>
                  </Link>
                </FadeUp>
              ))}
            </div>

          </div>
        </section>

        {/* The Art of Hands — background video with overlaid title */}
        <section className="relative bg-sand">
          <div className="relative aspect-[390/315] w-full overflow-hidden bg-[var(--green-deep)] lg:aspect-[16/7]">
            <ArtOfHandsVideo
              src={artOfHandsVideo}
              poster={artOfHandsPoster}
              alt={t("home.artHandsTitle").replace("\n", " ")}
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[var(--green-deep)]/55 via-transparent to-transparent" />
            <FadeUp className="absolute inset-0 z-10 flex items-center justify-center px-5 text-center sm:px-12 lg:px-20">
              <h2
                className="font-optima text-[25px] font-normal uppercase leading-none tracking-[0.18em] text-sand sm:text-4xl lg:text-5xl"
                style={{ textShadow: "0 2px 18px rgba(0,0,0,0.25)" }}
              >
                {t("home.artHandsTitle").replace("\n", " ")}
              </h2>
            </FadeUp>
          </div>
        </section>

        {/* About the brand */}
        <section id="philosophy" className="bg-[var(--white-warm)] pt-[56px] pb-[64px] lg:py-28">
          {/* Mobile layout */}
          <div className="px-6 lg:hidden">
            <FadeUp>
              <h2 className="font-optima text-[28px] leading-tight text-[#4a5044]">
                {t("home.aboutKicker")}
              </h2>
            </FadeUp>
            <FadeUp delay={80}>
              <div className="mt-4 flex items-baseline gap-3">
                <p className="font-aboreto text-[18px] tracking-[0.08em] text-[#4a5044]">
                  MUNIS USMAN
                </p>
                <p className="font-aboreto text-[11px] tracking-[0.16em] text-[#4a5044]/80">
                  SINCE 2017
                </p>
              </div>
            </FadeUp>
            <div className="mt-6 flex items-start gap-4">
              <FadeUp delay={140} className="flex-1 min-w-0">
                <p className="font-optima text-[17px] leading-[1.4] text-[#4a5044]">
                  {t("home.aboutLine1")}
                  <br />
                  {t("home.aboutLine2")}
                  <br />
                  {t("home.aboutLine3")}
                </p>
              </FadeUp>
              <FadeUp delay={120} className="-mr-6">
                <div className="relative h-[150px] w-[179px] shrink-0 overflow-hidden rounded-l-[18px] bg-[var(--sand-dark)]">
                  {aboutPortraitImg && (
                    <img
                      src={aboutPortraitImg}
                      alt="MUNIS USMAN — studio portrait"
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
              </FadeUp>
            </div>
            <FadeUp delay={220}>
              <p className="mt-6 font-optima text-[15px] leading-relaxed text-[#4a5044]">
                {t("home.aboutBody")}
              </p>
            </FadeUp>
            <div className="-mx-6 mt-8 grid grid-cols-3 gap-[3px]">
              {craftImgs.map((src, i) => (
                <FadeUp key={i} delay={i * 100}>
                  <div className="relative aspect-square overflow-hidden bg-[var(--sand-dark)]">
                    {src && (
                      <img
                        src={src}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                </FadeUp>
              ))}
            </div>

            {/* Quote block — mobile */}
            <FadeUp delay={120}>
              <div className="relative mt-8 px-2">
                <span
                  aria-hidden
                  className="absolute left-0 top-0 font-baskerville text-[48px] leading-none tracking-[-0.05em] text-[#4a5044] translate-y-[0.2em]"
                >
                  &#8220;
                </span>
                <div className="px-7 pt-4 text-center">
                  <p className="font-optima text-[14px] leading-[1.45] text-[#4a5044]">
                    {t("home.quoteText")}
                  </p>
                  <p className="mt-2 font-optima text-[13px] leading-[1.45] text-[#4a5044]">
                    {t("home.quoteSub")}
                  </p>
                </div>
                <span
                  aria-hidden
                  className="absolute right-0 bottom-5 font-baskerville text-[48px] leading-none tracking-[-0.05em] text-[#4a5044] translate-y-[0.2em]"
                >
                  &#8221;
                </span>

                <p className="mt-5 pr-3 text-right font-andantino text-[20px] leading-none text-[#4a5044]">
                  {t("home.quoteSignature")}
                </p>
              </div>
            </FadeUp>
          </div>

          {/* Desktop layout */}
          <div className="mx-auto hidden max-w-7xl px-6 lg:block lg:px-12">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7 lg:text-left">
                <FadeUp>
                  <h2 className="font-optima text-4xl text-[#4a5044] sm:text-5xl">
                    {t("home.aboutKicker")}
                  </h2>
                </FadeUp>
                <FadeUp delay={80}>
                  <div className="mt-6 flex flex-col items-start gap-2 sm:flex-row sm:items-baseline sm:gap-4">
                    <p className="font-aboreto text-3xl tracking-[0.08em] text-[var(--green-deep)] sm:text-4xl">
                      MUNIS USMAN
                    </p>
                    <span className="hidden h-px flex-1 bg-[var(--green)]/30 sm:block" />
                    <p className="font-aboreto text-xs tracking-[0.16em] text-[var(--gold)] sm:text-sm">
                      SINCE 2017
                    </p>
                  </div>
                </FadeUp>
                <FadeUp delay={140}>
                  <p className="mt-8 font-optima text-2xl leading-[1.3] text-foreground sm:text-3xl">
                    {t("home.aboutLine1")}
                    <br />
                    {t("home.aboutLine2")}
                    <br />
                    {t("home.aboutLine3")}
                  </p>
                </FadeUp>
                <FadeUp delay={220}>
                  <p className="mt-8 max-w-lg font-optima text-base leading-relaxed text-muted-foreground">
                    {t("home.aboutBody")}
                  </p>
                </FadeUp>
              </div>

              <div className="lg:col-span-5">
                <FadeUp delay={120}>
                  <div className="relative w-full aspect-[4/5] overflow-hidden rounded-l-[18px] bg-[var(--sand-dark)]">
                    {aboutPortraitImg && (
                      <img
                        src={aboutPortraitImg}
                        alt="MUNIS USMAN — studio portrait"
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                </FadeUp>
              </div>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-[3px]">
              {craftImgs.map((src, i) => (
                <FadeUp key={`d-${i}`} delay={i * 100}>
                  <div className="relative aspect-square overflow-hidden bg-[var(--sand-dark)]">
                    {src && (
                      <img
                        src={src}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out hover:scale-105"
                      />
                    )}
                  </div>
                </FadeUp>
              ))}
            </div>

            {/* Quote block — desktop */}
            <FadeUp delay={120}>
              <div className="relative mx-auto mt-16 max-w-3xl px-6">
                <span
                  aria-hidden
                  className="absolute left-0 top-0 font-baskerville text-[64px] leading-none tracking-[-0.05em] text-[#4a5044] translate-y-[0.2em]"
                >
                  &#8220;
                </span>
                <div className="px-10 pt-6 text-center">
                  <p className="font-optima text-lg leading-[1.45] text-[#4a5044]">
                    {t("home.quoteText")}
                  </p>
                  <p className="mt-3 font-optima text-base leading-[1.45] text-[#4a5044]">
                    {t("home.quoteSub")}
                  </p>
                </div>
                <span
                  aria-hidden
                  className="absolute right-0 bottom-8 font-baskerville text-[64px] leading-none tracking-[-0.05em] text-[#4a5044] translate-y-[0.2em]"
                >
                  &#8221;
                </span>

                <p className="mt-6 pr-6 text-right font-andantino text-[28px] leading-none text-[#4a5044]">
                  {t("home.quoteSignature")}
                </p>
              </div>
            </FadeUp>
          </div>
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}

function ArtOfHandsVideo({ src, poster, alt }: { src: string; poster: string; alt: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {
      // Autoplay blocked — poster stays visible via the <img> fallback.
    });
  }, [inView]);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <img
        src={poster}
        alt={alt}
        className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${ready ? "opacity-0" : "opacity-100"}`}
      />
      {inView && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onCanPlay={() => setReady(true)}
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
}
