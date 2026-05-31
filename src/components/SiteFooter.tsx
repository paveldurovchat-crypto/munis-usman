import { Link } from "@tanstack/react-router";
import logoGold from "@/assets/logo-gold.svg";
import { useI18n } from "@/lib/i18n";
import { BRAND } from "@/lib/brand";

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="bg-forest-deep text-cream/80">
      {/* MOBILE */}
      <div className="px-6 py-12 lg:hidden">
        <div className="grid grid-cols-2 gap-8 text-left">
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.28em] text-gold-soft">
              {t("footer.explore")}
            </h4>
            <ul className="mt-5 space-y-3 text-[13px] text-cream/80">
              <li><Link to="/collection" className="hover:text-gold">{t("nav.collection")}</Link></li>
              <li><Link to="/custom" className="hover:text-gold">{t("nav.custom")}</Link></li>
              <li><Link to="/contact" className="hover:text-gold">{t("nav.contact")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.28em] text-gold-soft">
              {t("nav.about")}
            </h4>
            <ul className="mt-5 space-y-3 text-[13px] text-cream/80">
              <li><Link to="/about" className="hover:text-gold">{t("nav.about")}</Link></li>
              <li><Link to="/journal" className="hover:text-gold">{t("nav.journal")}</Link></li>
              <li>
                <a href={`mailto:${BRAND.emailPrimary}`} className="hover:text-gold">
                  {BRAND.emailPrimary}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-cream/10 pt-8 text-center">
          <p className="text-[11px] uppercase tracking-[0.32em] text-cream/70">© MUNIS USMAN</p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.28em] text-cream/40">
            {new Date().getFullYear()} · {t("footer.rights")}
          </p>
          <div className="mt-5 flex items-center justify-center gap-5 text-cream/60">
            <a href={BRAND.instagram} target="_blank" rel="noreferrer noopener" className="hover:text-gold" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>
            </a>
            <a href={`mailto:${BRAND.emailPrimary}`} className="hover:text-gold" aria-label="Email">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
            </a>
          </div>
        </div>
      </div>

      {/* DESKTOP */}
      <div className="mx-auto hidden max-w-7xl px-6 py-20 lg:block lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <img src={logoGold} alt="MUNIS USMAN" className="h-16 w-auto" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream/60">
              {t("footer.tagline")}
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.3em] text-gold-soft">
              {BRAND.location}
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] text-gold-soft">
              {t("footer.explore")}
            </h4>
            <ul className="mt-6 space-y-3 text-sm">
              <li><Link to="/collection" className="hover:text-gold">{t("nav.collection")}</Link></li>
              <li><Link to="/about" className="hover:text-gold">{t("nav.about")}</Link></li>
              <li><Link to="/custom" className="hover:text-gold">{t("nav.custom")}</Link></li>
              <li><Link to="/journal" className="hover:text-gold">{t("nav.journal")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] text-gold-soft">
              {t("footer.atelier")}
            </h4>
            <ul className="mt-6 space-y-3 text-sm">
              <li><a href={`mailto:${BRAND.emailPrimary}`} className="hover:text-gold">{BRAND.emailPrimary}</a></li>
              <li><a href={`mailto:${BRAND.emailSecondary}`} className="hover:text-gold">{BRAND.emailSecondary}</a></li>
              <li><a href={BRAND.instagram} target="_blank" rel="noreferrer noopener" className="hover:text-gold">Instagram · {BRAND.instagramHandle}</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-cream/10 pt-8 text-xs uppercase tracking-[0.18em] text-cream/40 sm:flex-row" style={{ fontFamily: "Jost, system-ui, sans-serif" }}>
          <span>© {new Date().getFullYear()} MUNIS USMAN · {t("footer.rights")} · {t("footer.crafted")}</span>
          <span>{BRAND.location}</span>
        </div>
      </div>
    </footer>
  );
}
