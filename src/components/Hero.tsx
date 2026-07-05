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

  return (
    <section className="relative w-full overflow-hidden bg-[#b48264]">
      <div className="relative h-[50svh] min-h-[320px] w-full sm:h-screen sm:min-h-[600px]">
        <img
          key={displayUrl}
          src={displayUrl}
          alt=""
          fetchPriority="high"
          decoding="async"
          onLoad={() => setLoaded(true)}
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
