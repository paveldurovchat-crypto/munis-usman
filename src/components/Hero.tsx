import { useEffect, useRef, useState } from "react";
import heroReliefWebp from "@/assets/home-hero-relief.webp";
import logoGold from "@/assets/logo-gold.svg";
import { useI18n } from "@/lib/i18n";
import { useMediaLibrary, pickAssetBySlot, assetDisplayUrl } from "@/lib/media-slots";

export function Hero() {
  const { t } = useI18n();
  const { data: assets } = useMediaLibrary();
  const heroAsset = pickAssetBySlot(assets, "hero");
  const overrideUrl = heroAsset?.kind === "image" ? assetDisplayUrl(heroAsset) : null;

  // Bundled hero loads instantly. If admin uploaded a custom hero, swap in once ready.
  const displayUrl = overrideUrl ?? heroReliefWebp;

  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Cached images may finish before React attaches onLoad — check on mount and after src change.
  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [displayUrl]);

  return (
    <section className="relative w-full overflow-hidden bg-[#b48264]">
      <div className="relative aspect-[26/21] w-full sm:aspect-auto sm:h-screen sm:min-h-[600px]">

        <img
          ref={imgRef}
          key={displayUrl}
          src={displayUrl}
          alt=""
          fetchPriority="high"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />


        {/* Warm terracotta tint — keeps stone texture visible with warm sandy tone */}
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(180, 130, 100, 0.35)" }} />

        {/* Centered logo + tagline */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center text-white">
          <img
            src={logoGold}
            alt="MUNIS USMAN"
            className="h-[76px] w-auto animate-fade-in sm:h-20"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <p className="mt-3 font-aboreto text-[24px] font-normal uppercase tracking-[0.12em] text-white animate-fade-up sm:mt-4 sm:text-[36px] sm:tracking-[0.16em]">
            MUNIS USMAN
          </p>
          <p className="mt-2 font-optima text-[9px] font-normal uppercase tracking-[0.24em] text-white sm:text-[11px]">
            Couture &amp; Accessories
          </p>
          <span className="my-3 block h-5 w-px bg-white/80 sm:h-6" />
          <p className="max-w-[18rem] font-optima text-[12px] font-normal leading-[1.45] text-white animate-fade-up sm:max-w-md sm:text-[14px]">
            {t("home.heroIntro")}
          </p>
        </div>
      </div>
    </section>
  );
}
