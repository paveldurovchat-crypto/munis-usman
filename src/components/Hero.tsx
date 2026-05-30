import heroRelief from "@/assets/home-hero-relief.jpg";
import logoGold from "@/assets/logo-gold.svg";
import { useI18n } from "@/lib/i18n";
import { useMediaLibrary, pickAssetBySlot, assetDisplayUrl } from "@/lib/media-slots";

export function Hero() {
  const { t } = useI18n();
  const { data: assets } = useMediaLibrary();
  const heroAsset = pickAssetBySlot(assets, "hero");

  const isImage = heroAsset?.kind === "image";
  const url = assetDisplayUrl(heroAsset);

  return (
    <section className="relative w-full overflow-hidden bg-sand">
      <div className="relative aspect-[3/4] w-full sm:aspect-auto sm:h-[78vh] sm:min-h-[520px]">
        {isImage && url ? (
          <img
            src={url}
            alt=""
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <img
            src={heroRelief}
            alt=""
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        {/* Soft sand wash for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-sand/30 via-sand/5 to-sand/45" />

        {/* Centered logo + tagline (no CTAs — matches mockup) */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
          <img
            src={logoGold}
            alt="MUNIS USMAN"
            className="h-28 w-auto sm:h-36 lg:h-44 animate-fade-in"
          />
          <p className="mt-3 font-display italic text-gold/90 text-[11px] sm:text-xs tracking-[0.32em] uppercase animate-fade-up">
            Couture &amp; Accessories
          </p>
          <p className="mt-6 max-w-[18rem] text-[12px] leading-relaxed text-gold/85 sm:max-w-md sm:text-sm animate-fade-up">
            {t("home.heroIntro")}
          </p>
        </div>
      </div>
    </section>
  );
}
