import hero from "@/assets/hero.jpg";

export function Hero() {
  return (
    <section className="relative h-screen min-h-[720px] w-full overflow-hidden">
      <img
        src={hero}
        alt="Куратурная коллекция MUNIS USMAN"
        className="absolute inset-0 h-full w-full object-cover object-center"
        width={1536}
        height={1920}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/40 via-transparent to-forest-deep/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/60 via-transparent to-transparent" />

      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-24 lg:px-20 lg:pb-32">
        <div className="max-w-2xl animate-fade-up">
          <p className="mb-6 text-xs uppercase tracking-[0.4em] text-gold-soft">
            Couture · Since 2014
          </p>
          <h1 className="font-display text-5xl leading-[0.95] text-cream sm:text-6xl lg:text-8xl">
            Вне
            <br />
            <em className="not-italic text-gold-gradient">времени</em>
          </h1>
          <p className="mt-8 max-w-md text-base font-light leading-relaxed text-cream/80">
            Дизайнерский бренд — это целая философия, воплощённая в каждом изделии,
            а не просто имя на этикетке.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#about"
              className="group inline-flex items-center gap-3 border border-gold/70 bg-transparent px-8 py-4 text-xs uppercase tracking-[0.28em] text-cream transition-all hover:bg-gold hover:text-forest-deep"
            >
              О бренде
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 z-10 hidden flex-col items-end gap-2 text-cream/60 lg:flex">
        <div className="h-12 w-px bg-cream/40" />
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
      </div>
    </section>
  );
}
