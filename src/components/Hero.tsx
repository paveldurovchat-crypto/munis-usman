import { Link } from "@tanstack/react-router";
import heroRelief from "@/assets/home-hero-relief.jpg";
import logoGreen from "@/assets/logo-green.svg";
import { useI18n } from "@/lib/i18n";

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative w-full overflow-hidden bg-sand">
      {/* Carved relief background — soft, cream */}
      <div className="relative h-[88vh] min-h-[560px] w-full">
        <img
          src={heroRelief}
          alt=""
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: "saturate(0.85) brightness(1.03)" }}
        />
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
