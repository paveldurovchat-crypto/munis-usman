import logoGold from "@/assets/logo-gold.svg";

export function SiteFooter() {
  return (
    <footer id="contact" className="bg-forest-deep text-cream/80">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div>
            <img src={logoGold} alt="MUNIS USMAN" className="h-20 w-auto" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-cream/60">
              Дизайнерский бренд couture-одежды. Ручная работа, натуральные ткани,
              вечная элегантность.
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] text-gold-soft">
              Атélье
            </h4>
            <p className="mt-6 text-sm leading-relaxed text-cream/70">
              Запись на примерку
              <br />
              по предварительной договорённости
            </p>
            <a
              href="mailto:atelier@munisusman.com"
              className="mt-4 inline-block border-b border-gold/50 pb-1 text-sm text-cream transition-colors hover:text-gold"
            >
              atelier@munisusman.com
            </a>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] text-gold-soft">
              Следите
            </h4>
            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <a href="#" className="transition-colors hover:text-gold">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-gold">
                  Telegram
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-gold">
                  Pinterest
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-cream/10 pt-8 text-xs uppercase tracking-[0.25em] text-cream/40 sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} MUNIS USMAN</span>
          <span>Crafted by hand · Worn beyond seasons</span>
        </div>
      </div>
    </footer>
  );
}
