import craft from "@/assets/craft.jpg";
import fabric from "@/assets/fabric.jpg";

const pillars = [
  {
    n: "01",
    title: "Ручная работа",
    text: "Каждое изделие создаётся руками мастеров — стежок за стежком, без компромиссов в исполнении.",
  },
  {
    n: "02",
    title: "Качество материалов",
    text: "Натуральные ткани премиум-класса: шёлк, шерсть, лён — отобранные у проверенных поставщиков.",
  },
  {
    n: "03",
    title: "Вне времени",
    text: "Силуэты, которые не подчиняются сезонным трендам и остаются актуальными годами.",
  },
];

export function Craft() {
  return (
    <section id="craft" className="bg-forest text-cream">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden lg:aspect-auto">
          <img
            src={craft}
            alt="Ручная вышивка золотой нитью"
            className="h-full w-full object-cover"
            loading="lazy"
            width={1536}
            height={1024}
          />
        </div>

        <div className="flex flex-col justify-center px-6 py-20 lg:px-16 lg:py-28">
          <p className="mb-6 text-xs uppercase tracking-[0.4em] text-gold-soft">
            Философия ремесла
          </p>
          <h2 className="font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            Совершенство —
            <br />
            <em className="text-gold-gradient">в каждом стежке</em>
          </h2>

          <div className="mt-14 space-y-10">
            {pillars.map((p) => (
              <div
                key={p.n}
                className="grid grid-cols-[auto_1fr] gap-6 border-t border-cream/15 pt-8"
              >
                <span className="font-display text-2xl text-gold">{p.n}</span>
                <div>
                  <h3 className="font-display text-2xl text-cream">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream/70">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="collection" className="grid grid-cols-1 lg:grid-cols-2">
        <div className="order-2 flex flex-col justify-center px-6 py-20 lg:order-1 lg:px-16 lg:py-28">
          <p className="mb-6 text-xs uppercase tracking-[0.4em] text-gold-soft">
            #since2014
          </p>
          <h2 className="font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            Десятилетие
            <br />
            <em className="text-gold-gradient">мастерства</em>
          </h2>
          <p className="mt-8 max-w-md text-base leading-relaxed text-cream/75">
            С 2014 года мы создаём вещи, в которых традиция встречает современность.
            Каждая коллекция — это история о том, как руки мастера превращают ткань
            в произведение искусства.
          </p>
        </div>

        <div className="order-1 relative aspect-[4/5] overflow-hidden lg:order-2 lg:aspect-auto">
          <img
            src={fabric}
            alt="Шёлк цвета камня и зелёной хвои"
            className="h-full w-full object-cover"
            loading="lazy"
            width={1280}
            height={1600}
          />
        </div>
      </div>
    </section>
  );
}
