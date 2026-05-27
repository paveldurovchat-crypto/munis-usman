import { Link } from "@tanstack/react-router";
import heroRelief from "@/assets/home-hero-relief.jpg";
import heroVideo from "@/assets/hero-video.mp4";
import logoGold from "@/assets/logo-gold.svg";
import { useI18n } from "@/lib/i18n";
import { useMediaLibrary, pickAssetBySlot, assetDisplayUrl, assetYoutubeId } from "@/lib/media-slots";

export function Hero() {
  const { t } = useI18n();
  const { data: assets } = useMediaLibrary();
  const heroAsset = pickAssetBySlot(assets, "hero");

  const isVideo = heroAsset?.kind === "video";
  const isYoutube = heroAsset?.kind === "youtube";
  const isImage = heroAsset?.kind === "image";
  const ytId = assetYoutubeId(heroAsset);
  const url = assetDisplayUrl(heroAsset);

  return (
    <section className="relative w-full overflow-hidden bg-sand">
      <div className="relative h-[88vh] min-h-[560px] w-full">
        {isVideo && url ? (
          <video
            src={url}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : isYoutube && ytId ? (
          <div className="absolute inset-0 h-full w-full overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&modestbranding=1&playlist=${ytId}&playsinline=1`}
              title="Hero video"
              allow="autoplay; encrypted-media"
              className="absolute left-1/2 top-1/2 h-[120vh] w-[200vw] -translate-x-1/2 -translate-y-1/2 max-w-none border-0"
            />
          </div>
        ) : isImage && url ? (
          <img
            src={url}
            alt=""
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <video
            src={heroVideo}
            autoPlay
            muted
            loop
            playsInline
            poster={heroRelief}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        {/* Gentle cream wash so logo reads */}
        <div className="absolute inset-0 bg-gradient-to-b from-sand/40 via-sand/10 to-sand/55" />

        {/* Centered logo + tagline */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
          <img
            src={logoGreen}
            alt="MUNIS USMAN"
            className="h-32 w-auto sm:h-40 lg:h-52 animate-fade-in"
          />
          <p className="mt-2 font-display italic text-[var(--green-deep)]/80 text-sm sm:text-base tracking-[0.2em] uppercase animate-fade-up">
            Couture &amp; Accessories
          </p>
          <p className="mt-8 max-w-md text-sm leading-relaxed text-[var(--green-deep)]/75 sm:max-w-lg sm:text-base animate-fade-up">
            {t("home.heroIntro")}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 animate-fade-up">
            <Link
              to="/collection"
              className="inline-flex items-center gap-3 border border-[var(--green-deep)]/70 bg-sand/70 px-7 py-3.5 text-[11px] uppercase tracking-[0.18em] text-[var(--green-deep)] backdrop-blur-sm transition-all duration-500 hover:bg-[var(--green-deep)] hover:text-sand"
              style={{ fontFamily: "Jost, system-ui, sans-serif" }}
            >
              {t("home.heroCta1")}
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
