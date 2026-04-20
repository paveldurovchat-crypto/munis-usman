import logoGreen from "@/assets/logo-green.svg";

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-cream py-28 lg:py-40">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-12 lg:gap-20 lg:px-12">
        <div className="lg:col-span-4">
          <p className="mb-6 text-xs uppercase tracking-[0.4em] text-muted-foreground">
            О бренде
          </p>
          <img
            src={logoGreen}
            alt="MUNIS USMAN monogram"
            className="h-40 w-auto opacity-90 lg:h-56"
            loading="lazy"
          />
        </div>

        <div className="lg:col-span-8">
          <h2 className="font-display text-4xl leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
            Каждая деталь —
            <br />
            <em className="text-accent">отражение стиля</em>,
            <br />
            гармония инноваций
            <br />и классических традиций.
          </h2>

          <div className="mt-12 grid gap-10 border-t border-border pt-10 sm:grid-cols-2">
            <p className="text-base leading-relaxed text-muted-foreground">
              Цель бренда <span className="font-medium text-foreground">MUNIS USMAN</span> —
              чтобы каждая деталь коллекции отражала неподдельный стиль и гармонично сочетала
              инновационные идеи с классическими традициями. Мы создаём вещи, которые остаются
              «вне времени».
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              Особое значение для нас имеет ручная работа. Мы ценим её уникальность, стремимся
              к совершенству в исполнении и неизменно ставим во главу угла качество — основу
              бренда.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
