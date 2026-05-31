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
    <section className="relative w-full overflow-hidden bg-forest-deep">
      <div className="relative h-[45svh] min-h-[300px] w-full sm:h-[78vh] sm:min-h-[520px]">
        <img
          src={isImage && url ? url : heroRelief}
          alt=""
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Subtle overlay for legibility while keeping stone texture visible */}
        <div className="absolute inset-0 bg-black/25" />

        {/* Centered logo + tagline */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
          <img
            src={logoGold}
            alt="MUNIS USMAN"
            className="h-16 w-auto sm:h-32 lg:h-40 animate-fade-in"
          />
          <p className="mt-2 font-display italic text-[var(--gold)] text-[10px] sm:text-xs tracking-[0.32em] uppercase animate-fade-up font-light">
            Couture &amp; Accessories
          </p>
          <p className="mt-4 max-w-[16rem] text-[11px] leading-relaxed text-[var(--gold)]/90 sm:max-w-md sm:text-sm animate-fade-up font-light">
            {t("home.heroIntro")}
          </p>
        </div>
      </div>
    </section>
  );
}
