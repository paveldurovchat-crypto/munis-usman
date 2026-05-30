import { Link } from "@tanstack/react-router";
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
      <div className="relative h-[88vh] min-h-[560px] w-full">
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

        {/* Gentle cream wash so logo reads */}
        <div className="absolute inset-0 bg-gradient-to-b from-sand/40 via-sand/10 to-sand/55" />

        {/* Centered logo + tagline */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
          <img
            src={logoGold}
            alt="MUNIS USMAN"
            className="h-32 w-auto sm:h-40 lg:h-52 animate-fade-in"
          />
          <p className="mt-2 font-display italic text-gold/90 text-sm sm:text-base tracking-[0.2em] uppercase animate-fade-up">
            Couture &amp; Accessories
          </p>
          <p className="mt-8 max-w-md text-sm leading-relaxed text-gold/85 sm:max-w-lg sm:text-base animate-fade-up">
            {t("home.heroIntro")}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 animate-fade-up">
            <Link
              to="/collection"
              className="group inline-flex items-center gap-3 border border-gold/70 bg-transparent/30 px-7 py-3.5 text-[11px] uppercase tracking-[0.18em] text-gold backdrop-blur-sm transition-all duration-500 hover:bg-gold/20 hover:border-gold"
              style={{ fontFamily: "Jost, system-ui, sans-serif" }}
            >
              {t("home.heroCta1")}
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </Link>
            <Link
              to="/custom"
              className="group inline-flex items-center gap-3 border border-gold/70 bg-transparent/30 px-7 py-3.5 text-[11px] uppercase tracking-[0.18em] text-gold backdrop-blur-sm transition-all duration-500 hover:bg-gold/20 hover:border-gold"
              style={{ fontFamily: "Jost, system-ui, sans-serif" }}
            >
              {t("home.heroCta2")}
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
