import { Link } from "@tanstack/react-router";
import heroVideo from "@/assets/hero-video.mp4";
import { useI18n } from "@/lib/i18n";

export function Hero() {
  const { t, lang } = useI18n();

  const sub = t("home.heroSubtitle");

  return (
    <section className="relative h-screen min-h-[720px] w-full overflow-hidden bg-forest-deep">
      {/* Background video */}
      <video
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
        aria-label="MUNIS USMAN — wearable art from Tashkent"
        className="absolute inset-0 h-full w-full object-cover object-center animate-kenburns"
      />

      {/* Soft, layered washes — keep the image breathing */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/45 via-forest-deep/20 to-forest-deep/85" />
      <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/55 via-transparent to-forest-deep/25" />
      {/* very subtle vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.35) 100%)",
        }}
      />

      {/* Massive wordmark over the video */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
        <p className="mb-6 text-[10px] uppercase tracking-[0.55em] text-gold-soft/90 animate-fade-in">
          {t("home.heroKicker")}
        </p>

        <h1 className="font-display text-cream leading-[0.86] animate-fade-up">
          <span
            className="block text-gold-gradient"
            style={{
              fontSize: "clamp(3.25rem, 14vw, 14rem)",
              letterSpacing: "0.02em",
              fontWeight: 400,
            }}
          >
            Munis
          </span>
          <span
            className="mt-1 block italic text-cream/95"
            style={{
              fontSize: "clamp(3rem, 13vw, 13rem)",
              letterSpacing: "0.04em",
              fontWeight: 300,
            }}
          >
            Usman
          </span>
        </h1>

        <p className="mt-10 max-w-xl text-sm font-light leading-relaxed text-cream/80 sm:text-base animate-fade-up">
          {sub}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4 animate-fade-up">
          <Link
            to="/collection"
            className="group inline-flex items-center gap-3 border border-gold/60 bg-cream/[0.04] px-7 py-3.5 text-[11px] uppercase tracking-[0.18em] text-cream backdrop-blur-sm transition-all duration-500 hover:bg-gold hover:text-forest-deep hover:border-gold"
            style={{ fontFamily: "Jost, system-ui, sans-serif" }}
          >
            {t("home.heroCta1")}
            <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </Link>
          <Link
            to="/custom"
            className="inline-flex items-center gap-3 border border-cream/25 px-7 py-3.5 text-[11px] uppercase tracking-[0.18em] text-cream/90 transition-all duration-500 hover:border-cream/70 hover:text-cream"
            style={{ fontFamily: "Jost, system-ui, sans-serif" }}
          >
            {t("home.heroCta2")}
          </Link>
        </div>
      </div>

      {/* Quiet scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex-col items-center gap-2 text-cream/55 hidden lg:flex">
        <span className="text-[9px] uppercase tracking-[0.4em]" style={{ fontFamily: "Jost, system-ui, sans-serif" }}>
          {lang === "en" ? "Scroll" : "Листать"}
        </span>
        <span className="block h-12 w-px animate-scroll-line bg-cream/40" />
      </div>
    </section>
  );
}
