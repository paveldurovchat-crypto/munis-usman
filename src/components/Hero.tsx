import heroRelief from "@/assets/home-hero-relief.jpg";
import logoGold from "@/assets/logo-gold.svg";
import { useI18n } from "@/lib/i18n";
import { useMediaLibrary, pickAssetBySlot, assetDisplayUrl } from "@/lib/media-slots";

export function Hero() {
  const { t } = useI18n();
  const { data: assets, isLoading } = useMediaLibrary();
  const heroAsset = pickAssetBySlot(assets, "hero");

  const isImage = heroAsset?.kind === "image";
  const url = assetDisplayUrl(heroAsset);
  // Show real asset if present; only fall back to bundled image after loading finishes.
  const displayUrl = isImage && url ? url : isLoading ? null : heroRelief;


  return (
    <section className="relative w-full overflow-hidden bg-[#b48264]">
      <div className="relative h-[50svh] min-h-[320px] w-full sm:h-screen sm:min-h-[600px]">
        {displayUrl && (
          <img
            src={displayUrl}
            alt=""
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
          />
        )}


        {/* Warm terracotta tint — keeps stone texture visible with warm sandy tone */}
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(180, 130, 100, 0.35)" }} />

        {/* Centered logo + tagline */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center text-white">
          <img
            src={logoGold}
            alt="MUNIS USMAN"
            className="h-[55px] w-auto sm:h-20 animate-fade-in"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <p className="mt-4 font-display text-white text-[22px] sm:text-[36px] tracking-[0.25em] uppercase font-light animate-fade-up">
            MUNIS USMAN
          </p>
          <p className="mt-2 font-sans text-white text-[9px] sm:text-[11px] tracking-[0.35em] uppercase font-light">
            Couture &amp; Accessories
          </p>
          <span className="my-3 block h-5 w-px bg-white/80 sm:h-6" />
          <p className="max-w-[18rem] text-white text-[12px] leading-[1.6] sm:max-w-md sm:text-[14px] font-light animate-fade-up">
            {t("home.heroIntro")}
          </p>
        </div>
      </div>
    </section>
  );
}

