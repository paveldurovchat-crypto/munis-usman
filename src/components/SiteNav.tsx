import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ShoppingBag, User as UserIcon } from "lucide-react";
import logoGold from "@/assets/logo-gold.svg";
import logoGreen from "@/assets/logo-green.svg";
import { useI18n } from "@/lib/i18n";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { useAuth } from "@/lib/auth";
import { useCart } from "@/lib/cart";

export function SiteNav() {
  const { lang, setLang, t } = useI18n();
  const { user, isAdmin, signOut: doSignOut } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
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

  const links = [
    { to: "/collection", label: t("nav.collection") },
    { to: "/about", label: t("nav.about") },
    { to: "/custom", label: t("nav.custom") },
    { to: "/journal", label: t("nav.journal") },
    { to: "/contact", label: t("nav.contact") },
  ] as const;

  const solid = !isHome || scrolled;
  const textClass = solid ? "text-foreground" : "text-cream";

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${solid ? "bg-cream/90 backdrop-blur-md border-b border-border/60 py-3" : "bg-transparent py-6"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 lg:px-12">
          <nav className={`hidden items-center gap-8 text-[11px] uppercase tracking-[0.18em] font-sans font-light lg:flex ${textClass}`}>
            {links.slice(0, 3).map((l) => (
              <Link key={l.to} to={l.to} className="transition-colors hover:text-accent" activeProps={{ className: "text-accent" }}>{l.label}</Link>
            ))}
          </nav>

          <Link to="/" className="flex items-center justify-center">
            <img src={solid ? logoGreen : logoGold} alt="MUNIS USMAN" className="h-10 w-auto md:h-12" />
          </Link>

          <div className={`hidden items-center gap-6 text-[11px] uppercase tracking-[0.18em] font-sans font-light lg:flex ${textClass}`}>
            {links.slice(3).map((l) => (
              <Link key={l.to} to={l.to} className="transition-colors hover:text-accent" activeProps={{ className: "text-accent" }}>{l.label}</Link>
            ))}
            {isAdmin && (
              <Link to="/admin" className="transition-colors hover:text-accent" activeProps={{ className: "text-accent" }}>{t("nav.admin")}</Link>
            )}
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

          <div className="flex items-center gap-4 lg:hidden">
            <Link to="/cart" aria-label={t("nav.cart")} className={`relative ${textClass}`}>
              <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-accent px-1 text-[9px] font-semibold text-accent-foreground">{count}</span>
              )}
            </Link>
            <LangToggle lang={lang} setLang={setLang} textClass={textClass} t={t} />
            <button aria-label="Toggle menu" onClick={() => setOpen((v) => !v)} className={`${textClass} transition-colors`}>
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden">
            <nav className="border-t border-border/50 bg-cream/95 px-6 py-6 backdrop-blur-md">
              <ul className="flex flex-col gap-5 text-sm uppercase tracking-[0.18em] font-sans font-light text-foreground">
                <li><Link to="/" className="block py-1" activeProps={{ className: "text-accent" }}>{t("nav.home")}</Link></li>
                {links.map((l) => (
                  <li key={l.to}><Link to={l.to} className="block py-1" activeProps={{ className: "text-accent" }}>{l.label}</Link></li>
                ))}
                <li><Link to="/cart" className="block py-1" activeProps={{ className: "text-accent" }}>{t("nav.cart")}{count > 0 ? ` (${count})` : ""}</Link></li>
                {user && (
                  <li><Link to="/account" className="block py-1" activeProps={{ className: "text-accent" }}>{t("nav.account")}</Link></li>
                )}
                {isAdmin && (
                  <li><Link to="/admin" className="block py-1" activeProps={{ className: "text-accent" }}>{t("nav.admin")}</Link></li>
                )}
                <li>
                  {user ? (
                    <button onClick={signOut} className="block w-full py-1 text-left">{t("nav.signOut")}</button>
                  ) : (
                    <Link to="/login" className="block py-1" activeProps={{ className: "text-accent" }}>{t("nav.signIn")}</Link>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        )}
      </header>
      <MobileBottomNav />
    </>
  );
}

function LangToggle({ lang, setLang, textClass, t }: { lang: "ru" | "en"; setLang: (l: "ru" | "en") => void; textClass: string; t: (k: string) => string; }) {
  return (
    <div className={`flex items-center gap-1 text-[11px] uppercase tracking-[0.18em] font-sans font-light ${textClass}`}>
      <button onClick={() => setLang("ru")} className={`transition-colors hover:text-accent ${lang === "ru" ? "text-accent" : "opacity-70"}`} aria-label="Russian">{t("lang.ru")}</button>
      <span className="opacity-40">/</span>
      <button onClick={() => setLang("en")} className={`transition-colors hover:text-accent ${lang === "en" ? "text-accent" : "opacity-70"}`} aria-label="English">{t("lang.en")}</button>
    </div>
  );
}
