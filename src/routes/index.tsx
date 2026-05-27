import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { Hero } from "@/components/Hero";
import { SiteFooter } from "@/components/SiteFooter";
import { FadeUp } from "@/components/FadeUp";
import { useI18n } from "@/lib/i18n";
import tileAccessories from "@/assets/home-tile-accessories.jpg";
import tileCloth from "@/assets/home-tile-cloth.jpg";
import tileHome from "@/assets/home-tile-home.jpg";
import tileCouture from "@/assets/home-tile-couture.jpg";
import artOfHands from "@/assets/home-art-of-hands.jpg";
import aboutPortrait from "@/assets/home-about-portrait.jpg";
import craft1 from "@/assets/home-craft-1.jpg";
import craft2 from "@/assets/home-craft-2.jpg";
import craft3 from "@/assets/home-craft-3.jpg";

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
  }),
});

type Tile = {
  cat: "accessories" | "cloth" | "home" | "couture";
  label: string;
  subKey: string;
  image: string;
};

function Index() {
  const { t } = useI18n();

  const tiles: Tile[] = [
    { cat: "accessories", label: t("collection.tabAccessories"), subKey: "home.tileAccessoriesSub", image: tileAccessories },
    { cat: "cloth", label: t("collection.tabCloth"), subKey: "home.tileClothSub", image: tileCloth },
    { cat: "home", label: t("collection.tabHome"), subKey: "home.tileHomeSub", image: tileHome },
    { cat: "couture", label: t("collection.tabCouture"), subKey: "home.tileCoutureSub", image: tileCouture },
  ];

  return (
    <div className="min-h-screen bg-sand text-foreground">
      <SiteNav />
      <main className="pb-20 lg:pb-0">
        <Hero />

        {/* Category tiles */}
        <section className="bg-sand pt-10 pb-6 lg:pt-16 lg:pb-12">
          <div className="mx-auto max-w-7xl px-4 lg:px-12">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
              {tiles.map((tile, i) => (
                <FadeUp key={tile.cat} delay={i * 90}>
                  <Link
                    to="/collection"
                    search={{ cat: tile.cat } as never}
                    className="group relative block aspect-[3/4] overflow-hidden bg-[var(--sand-dark)]"
                  >
                    <img
                      src={tile.image}
                      alt={tile.label}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--green-deep)]/75 via-[var(--green-deep)]/15 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 px-4 pb-4 text-sand">
                      <p className="font-display text-xl tracking-wide sm:text-2xl">{tile.label}</p>
                      <p className="mt-1 font-display italic text-xs text-sand/80 sm:text-sm">
                        / {t(tile.subKey)}
                      </p>
                    </div>
                  </Link>
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={200}>
              <div className="mt-10 flex items-center justify-center gap-4">
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
            <img
              src={artOfHands}
              alt={t("home.artHandsTitle").replace("\n", " ")}
              loading="lazy"
              className="h-full w-full object-cover"
            />
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
              <div className="lg:col-span-7">
                <FadeUp>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-[var(--green)]/70">
                    {t("home.aboutKicker")}
                  </p>
                </FadeUp>
                <FadeUp delay={80}>
                  <div className="mt-4 flex items-baseline gap-4">
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
                  <p className="mt-8 max-w-lg text-base leading-relaxed text-muted-foreground">
                    {t("home.aboutBody")}
                  </p>
                </FadeUp>
              </div>

              <div className="lg:col-span-5">
                <FadeUp delay={120}>
                  <div className="relative aspect-[4/5] overflow-hidden bg-[var(--sand-dark)]">
                    <img
                      src={aboutPortrait}
                      alt="MUNIS USMAN — studio portrait"
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </FadeUp>
              </div>
            </div>

            {/* Craft trio */}
            <div className="mt-14 grid grid-cols-3 gap-3 sm:gap-4 lg:mt-20 lg:gap-6">
              {[craft1, craft2, craft3].map((src, i) => (
                <FadeUp key={i} delay={i * 100}>
                  <div className="relative aspect-square overflow-hidden bg-[var(--sand-dark)]">
                    <img
                      src={src}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out hover:scale-105"
                    />
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Quote */}
        <section className="bg-sand py-20 lg:py-28">
          <div className="mx-auto max-w-3xl px-6 text-center lg:px-12">
            <FadeUp>
              <p className="font-display text-2xl leading-[1.5] text-[var(--green-deep)] sm:text-3xl">
                <span className="mr-2 align-top text-[var(--gold)]">“</span>
                {t("home.quoteText")}
                <span className="ml-2 align-top text-[var(--gold)]">”</span>
              </p>
            </FadeUp>
            <FadeUp delay={120}>
              <p className="mt-6 text-sm italic text-muted-foreground">{t("home.quoteSub")}</p>
            </FadeUp>
            <FadeUp delay={200}>
              <p className="mt-8 font-display italic text-[var(--gold)] text-lg">
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
