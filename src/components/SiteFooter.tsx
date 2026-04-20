import { Link } from "@tanstack/react-router";
import logoGold from "@/assets/logo-gold.svg";
import { useI18n } from "@/lib/i18n";
import { BRAND } from "@/lib/brand";

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="bg-forest-deep text-cream/80">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
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
              <li>
                <Link to="/collection" className="transition-colors hover:text-gold">
                  {t("nav.collection")}
                </Link>
              </li>
              <li>
                <Link to="/about" className="transition-colors hover:text-gold">
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link to="/custom" className="transition-colors hover:text-gold">
                  {t("nav.custom")}
                </Link>
              </li>
              <li>
                <Link to="/journal" className="transition-colors hover:text-gold">
                  {t("nav.journal")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] text-gold-soft">
              {t("footer.atelier")}
            </h4>
            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${BRAND.emailPrimary}`}
                  className="transition-colors hover:text-gold"
                >
                  {BRAND.emailPrimary}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BRAND.emailSecondary}`}
                  className="transition-colors hover:text-gold"
                >
                  {BRAND.emailSecondary}
                </a>
              </li>
              <li>
                <a
                  href={BRAND.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="transition-colors hover:text-gold"
                >
                  Instagram · {BRAND.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-cream/10 pt-8 text-xs uppercase tracking-[0.25em] text-cream/40 sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} MUNIS USMAN · {t("footer.rights")}</span>
          <span>{t("footer.crafted")}</span>
        </div>
      </div>
    </footer>
  );
}
