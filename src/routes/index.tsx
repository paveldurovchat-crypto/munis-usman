import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { Hero } from "@/components/Hero";
import { SiteFooter } from "@/components/SiteFooter";
import { FadeUp } from "@/components/FadeUp";
import { useI18n } from "@/lib/i18n";
import { useMediaLibrary, pickAssetBySlot, assetDisplayUrl, type MediaSlot } from "@/lib/media-slots";
import heroReliefWebp from "@/assets/home-hero-relief.webp";


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

  const artOfHandsImg = pick("art-of-hands");
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
        <section className="bg-sand pt-0 pb-6 lg:mt-[2px] lg:pb-12">
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
                  <div className="absolute inset-x-0 bottom-0 px-1.5 pb-1.5 text-left text-white">
                    <p className="font-display text-[10px] leading-none tracking-[0.02em] uppercase font-normal truncate">{tile.label}</p>
                    <p className="mt-0.5 font-display italic text-[8px] text-white/80 truncate">/ {t(tile.subKey)}</p>
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
                      <p className="font-display text-xl tracking-wide sm:text-2xl uppercase">{tile.label}</p>
                      <p className="mt-1 font-display italic text-xs text-sand/80 sm:text-sm">
                        / {t(tile.subKey)}
                      </p>
                    </div>
                  </Link>
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={200}>
              <div className="mt-10 flex items-center justify-center gap-4 px-6">
                <span className="h-px w-12 bg-[var(--green)]/40" />
                <p className="font-display italic text-[var(--green-deep)]/80 text-sm sm:text-base">
                  {t("home.detailLine")}
                </p>
                <span className="h-px w-12 bg-[var(--green)]/40" />
              </div>
            </FadeUp>

          </div>
        </section>

        {/* The Art of Hands — wide editorial image with overlaid title */}
        <section className="relative bg-sand">
          <div className="relative h-[58vh] min-h-[360px] w-full overflow-hidden">
            {artOfHandsImg && (
              <img
                src={artOfHandsImg}
                alt={t("home.artHandsTitle").replace("\n", " ")}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-r from-[var(--green-deep)]/55 via-transparent to-transparent" />
            <FadeUp className="absolute inset-y-0 left-0 z-10 flex items-center px-6 sm:px-12 lg:px-20">
              <h2
                className="whitespace-pre-line font-display text-sand text-5xl leading-[0.95] tracking-wide sm:text-6xl lg:text-7xl"
                style={{ textShadow: "0 2px 18px rgba(0,0,0,0.25)" }}
              >
                {t("home.artHandsTitle")}
              </h2>
            </FadeUp>
          </div>
        </section>

        {/* About the brand */}
        <section id="philosophy" className="bg-[var(--white-warm)] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="text-center lg:col-span-7 lg:text-left">
                <FadeUp>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-[var(--green)]/70">
                    {t("home.aboutKicker")}
                  </p>
                </FadeUp>
                <FadeUp delay={80}>
                  <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:items-baseline sm:gap-4 lg:items-baseline">
                    <p className="font-display text-3xl text-[var(--green-deep)] sm:text-4xl">
                      MUNIS USMAN
                    </p>
                    <span className="hidden h-px flex-1 bg-[var(--green)]/30 sm:block" />
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--gold)]">
                      {t("home.aboutSince")}
                    </p>
                  </div>
                </FadeUp>
                <FadeUp delay={140}>
                  <p className="mt-8 font-display text-2xl leading-[1.25] text-foreground sm:text-3xl">
                    {t("home.aboutLine1")}
                    <br />
                    {t("home.aboutLine2")}
                    <br />
                    <span className="italic text-[var(--green-deep)]/85">{t("home.aboutLine3")}</span>
                  </p>
                </FadeUp>
                <FadeUp delay={220}>
                  <p className="mt-8 max-w-lg text-base leading-relaxed text-muted-foreground mx-auto lg:mx-0">
                    {t("home.aboutBody")}
                  </p>
                </FadeUp>
              </div>

              <div className="lg:col-span-5">
                <FadeUp delay={120}>
                  <div className="relative aspect-[4/5] overflow-hidden bg-[var(--sand-dark)]">
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

            {/* Craft trio */}
            <div className="mt-14 grid grid-cols-3 gap-3 sm:gap-4 lg:mt-20 lg:gap-6">
              {craftImgs.map((src, i) => (
                <FadeUp key={i} delay={i * 100}>
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
          </div>
        </section>

        {/* Quote */}
        <section className="bg-[var(--white-warm)] pt-10 pb-16 lg:py-28">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center lg:px-12">
            <FadeUp>
              <p className="font-display text-xl leading-[1.5] text-[var(--green-deep)] sm:text-2xl">
                <span className="mr-1 align-top text-[var(--gold)]">“</span>
                {t("home.quoteText")}
                <span className="ml-1 align-top text-[var(--gold)]">”</span>
              </p>
            </FadeUp>
            <FadeUp delay={120}>
              <p className="text-base leading-relaxed text-muted-foreground">{t("home.quoteSub")}</p>
            </FadeUp>
            <FadeUp delay={200}>
              <p className="font-display italic text-[var(--gold)] text-lg">
                — {t("home.quoteAuthor")}
              </p>
            </FadeUp>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
