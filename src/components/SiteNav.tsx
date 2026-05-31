import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ShoppingBag, User as UserIcon, Search, Heart } from "lucide-react";
import logoGold from "@/assets/logo-gold.svg";
import logoGreen from "@/assets/logo-green.svg";
import logoWhite from "@/assets/logo-white.svg";
import { useI18n } from "@/lib/i18n";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { SearchOverlay } from "@/components/SearchOverlay";
import { useAuth } from "@/lib/auth";
import { useCart } from "@/lib/cart";

export function SiteNav() {
  const { lang, setLang, t } = useI18n();
  const { user, isAdmin, signOut: doSignOut } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const signOut = async () => { await doSignOut(); navigate({ to: "/" }); };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  // Lock body scroll while drawer open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  const links = [
    { to: "/collection", label: t("nav.collection") },
    { to: "/about", label: t("nav.about") },
    { to: "/custom", label: t("nav.custom") },
    { to: "/journal", label: t("nav.journal") },
    { to: "/contact", label: t("nav.contact") },
  ] as const;

  const solid = !isHome || scrolled;
  const textClass = solid ? "text-foreground" : "text-cream";
  const mobileLogo = solid ? logoGreen : logoWhite;
  const desktopLogo = solid ? logoGreen : logoGold;

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${solid ? "bg-cream/90 backdrop-blur-md border-b border-border/60 py-3" : "bg-transparent py-4 lg:py-6"}`}>
        {/* DESKTOP */}
        <div className="mx-auto hidden max-w-7xl items-center justify-between gap-6 px-6 lg:flex lg:px-12">
          <nav className={`flex items-center gap-8 text-[11px] uppercase tracking-[0.18em] font-sans font-light ${textClass}`}>
            {links.slice(0, 3).map((l) => (
              <Link key={l.to} to={l.to} className="transition-colors hover:text-accent" activeProps={{ className: "text-accent" }}>{l.label}</Link>
            ))}
          </nav>

          <Link to="/" className="flex items-center justify-center">
            <img src={desktopLogo} alt="MUNIS USMAN" className="h-10 w-auto md:h-12" />
          </Link>

          <div className={`flex items-center gap-6 text-[11px] uppercase tracking-[0.18em] font-sans font-light ${textClass}`}>
            {links.slice(3).map((l) => (
              <Link key={l.to} to={l.to} className="transition-colors hover:text-accent" activeProps={{ className: "text-accent" }}>{l.label}</Link>
            ))}
            {isAdmin && (
              <Link to="/admin" className="transition-colors hover:text-accent" activeProps={{ className: "text-accent" }}>{t("nav.admin")}</Link>
            )}
            <button onClick={() => setSearchOpen(true)} aria-label="Search" className="transition-colors hover:text-accent">
              <Search className="h-4 w-4" strokeWidth={1.5} />
            </button>
            {user ? (
              <Link to="/account" aria-label={t("nav.account")} className="transition-colors hover:text-accent" activeProps={{ className: "text-accent" }}>
                <UserIcon className="h-4 w-4" strokeWidth={1.5} />
              </Link>
            ) : (
              <Link to="/login" className="transition-colors hover:text-accent">{t("nav.signIn")}</Link>
            )}
            <Link to="/cart" aria-label={t("nav.cart")} className="relative transition-colors hover:text-accent">
              <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-accent px-1 text-[9px] font-semibold text-accent-foreground">{count}</span>
              )}
            </Link>
            {user && (
              <button onClick={signOut} className="transition-colors hover:text-accent">{t("nav.signOut")}</button>
            )}
            <LangToggle lang={lang} setLang={setLang} textClass={textClass} t={t} />
          </div>
        </div>

        {/* MOBILE */}
        <div className="mx-auto grid grid-cols-3 items-center px-4 lg:hidden">
          <div className="flex items-center justify-start">
            <button aria-label="Open menu" onClick={() => setOpen(true)} className={textClass}>
              <Menu className="h-6 w-6" strokeWidth={1.5} />
            </button>
          </div>
          <Link to="/" className="flex items-center justify-center">
            <img src={mobileLogo} alt="MUNIS USMAN" className="h-9 w-auto" />
          </Link>
          <div className={`flex items-center justify-end gap-4 ${textClass}`}>
            <Link to="/collection" aria-label="Search" className="transition-colors hover:text-accent">
              <Search className="h-5 w-5" strokeWidth={1.5} />
            </Link>
            <Link to="/account" aria-label="Wishlist" className="transition-colors hover:text-accent">
              <Heart className="h-5 w-5" strokeWidth={1.5} />
            </Link>
            <Link to="/cart" aria-label={t("nav.cart")} className="relative transition-colors hover:text-accent">
              <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-accent px-1 text-[9px] font-semibold text-accent-foreground">{count}</span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* MOBILE FULL-SCREEN DRAWER */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
        <aside
          className={`absolute inset-y-0 left-0 flex h-full w-full max-w-sm flex-col bg-cream shadow-2xl transition-transform duration-300 ease-out ${open ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-border/50">
            <Link to="/" onClick={() => setOpen(false)}>
              <img src={logoGreen} alt="MUNIS USMAN" className="h-9 w-auto" />
            </Link>
            <button aria-label="Close menu" onClick={() => setOpen(false)} className="text-foreground">
              <X className="h-6 w-6" strokeWidth={1.5} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-6 py-8">
            <ul className="flex flex-col gap-6 text-base uppercase tracking-[0.22em] font-sans font-light text-foreground">
              {links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} onClick={() => setOpen(false)} className="block py-1" activeProps={{ className: "text-accent" }}>
                    {l.label}
                  </Link>
                </li>
              ))}
              {user && (
                <li><Link to="/account" onClick={() => setOpen(false)} className="block py-1">{t("nav.account")}</Link></li>
              )}
              {isAdmin && (
                <li><Link to="/admin" onClick={() => setOpen(false)} className="block py-1">{t("nav.admin")}</Link></li>
              )}
              <li>
                {user ? (
                  <button onClick={signOut} className="block w-full py-1 text-left">{t("nav.signOut")}</button>
                ) : (
                  <Link to="/login" onClick={() => setOpen(false)} className="block py-1">{t("nav.signIn")}</Link>
                )}
              </li>
            </ul>
          </nav>

          <div className="border-t border-border/50 px-6 py-5">
            <LangToggle lang={lang} setLang={setLang} textClass="text-foreground" t={t} />
          </div>
        </aside>
      </div>

      <MobileBottomNav />
    </>
  );
}

function LangToggle({ lang, setLang, textClass, t }: { lang: "ru" | "en"; setLang: (l: "ru" | "en") => void; textClass: string; t: (k: string) => string; }) {
  return (
    <div className={`flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] font-sans font-light ${textClass}`}>
      <button onClick={() => setLang("ru")} className={`transition-colors hover:text-accent ${lang === "ru" ? "text-accent" : "opacity-70"}`} aria-label="Russian">{t("lang.ru")}</button>
      <span className="opacity-40">/</span>
      <button onClick={() => setLang("en")} className={`transition-colors hover:text-accent ${lang === "en" ? "text-accent" : "opacity-70"}`} aria-label="English">{t("lang.en")}</button>
    </div>
  );
}
