import { Link } from "@tanstack/react-router";
import logoGold from "@/assets/logo-gold.svg";
import { useI18n } from "@/lib/i18n";
import { BRAND } from "@/lib/brand";

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="bg-[#111111] text-white/85">
      {/* MOBILE */}
      <div className="px-6 pt-12 pb-28 lg:hidden">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 text-left">
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.24em] text-white/90 font-sans">СОТРУДНИЧЕСТВО</h4>
            <ul className="mt-4 space-y-2.5 text-[12px] text-white/65 font-sans font-light">
              <li><Link to="/custom" className="hover:text-[var(--gold)]">{t("nav.custom")}</Link></li>
              <li><Link to="/contact" className="hover:text-[var(--gold)]">{t("nav.contact")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.24em] text-white/90 font-sans">О НАС</h4>
            <ul className="mt-4 space-y-2.5 text-[12px] text-white/65 font-sans font-light">
              <li><Link to="/about" className="hover:text-[var(--gold)]">Философия бренда</Link></li>
              <li><Link to="/journal" className="hover:text-[var(--gold)]">История</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.24em] text-white/90 font-sans">ЦЕНТР ПОМОЩИ</h4>
            <ul className="mt-4 space-y-2.5 text-[12px] text-white/65 font-sans font-light">
              <li><Link to="/contact" className="hover:text-[var(--gold)]">Связаться с нами</Link></li>
              <li><Link to="/contact" className="hover:text-[var(--gold)]">Запрос на возврат</Link></li>
              <li><Link to="/account" className="hover:text-[var(--gold)]">Проверить заказ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.24em] text-white/90 font-sans">СТРАНА / ЯЗЫК</h4>
            <ul className="mt-4 space-y-2.5 text-[12px] text-white/65 font-sans font-light">
              <li>Uzbekistan / RU / EN</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center">
          <p className="font-display tracking-[0.32em] text-[12px] text-white">© MUNIS USMAN</p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.28em] text-white/45 font-sans">
            {new Date().getFullYear()} ВСЕ ПРАВА ЗАЩИЩЕНЫ
          </p>
          <div className="mt-6 flex items-center justify-center gap-6 text-white/70">
            <a href="https://munis-usman.uz" target="_blank" rel="noreferrer noopener" aria-label="Website" className="hover:text-[var(--gold)]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>
            </a>
            <a href={BRAND.instagram} target="_blank" rel="noreferrer noopener" aria-label="Instagram" className="hover:text-[var(--gold)]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer noopener" aria-label="YouTube" className="hover:text-[var(--gold)]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25"><rect x="2" y="5" width="20" height="14" rx="3"/><path d="m10 9 6 3-6 3z" fill="currentColor" stroke="none"/></svg>
            </a>
            <a href="https://t.me" target="_blank" rel="noreferrer noopener" aria-label="Telegram" className="hover:text-[var(--gold)]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25"><path d="m3 11 17-7-3 17-5-5-3 3v-5z"/></svg>
            </a>
          </div>
        </div>
      </div>

      {/* DESKTOP */}
      <div className="mx-auto hidden max-w-7xl px-6 py-20 lg:block lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <img src={logoGold} alt="MUNIS USMAN" className="h-16 w-auto" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">{t("footer.tagline")}</p>
            <p className="mt-4 text-xs uppercase tracking-[0.3em] text-[var(--gold)]">{BRAND.location}</p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">{t("footer.explore")}</h4>
            <ul className="mt-6 space-y-3 text-sm text-white/75">
              <li><Link to="/collection" className="hover:text-[var(--gold)]">{t("nav.collection")}</Link></li>
              <li><Link to="/about" className="hover:text-[var(--gold)]">{t("nav.about")}</Link></li>
              <li><Link to="/custom" className="hover:text-[var(--gold)]">{t("nav.custom")}</Link></li>
              <li><Link to="/journal" className="hover:text-[var(--gold)]">{t("nav.journal")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">{t("footer.atelier")}</h4>
            <ul className="mt-6 space-y-3 text-sm text-white/75">
              <li><a href={`mailto:${BRAND.emailPrimary}`} className="hover:text-[var(--gold)]">{BRAND.emailPrimary}</a></li>
              <li><a href={`mailto:${BRAND.emailSecondary}`} className="hover:text-[var(--gold)]">{BRAND.emailSecondary}</a></li>
              <li><a href={BRAND.instagram} target="_blank" rel="noreferrer noopener" className="hover:text-[var(--gold)]">Instagram · {BRAND.instagramHandle}</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs uppercase tracking-[0.18em] text-white/40 sm:flex-row">
          <span>© {new Date().getFullYear()} MUNIS USMAN · {t("footer.rights")}</span>
          <span>{BRAND.location}</span>
        </div>
      </div>
    </footer>
  );
}
