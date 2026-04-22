import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logoGold from "@/assets/logo-gold.svg";
import logoGreen from "@/assets/logo-green.svg";
import { useI18n } from "@/lib/i18n";

export function SiteNav() {
  const { lang, setLang, t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const links = [
    { to: "/collection", label: t("nav.collection") },
    { to: "/about", label: t("nav.about") },
    { to: "/custom", label: t("nav.custom") },
    { to: "/journal", label: t("nav.journal") },
    { to: "/contact", label: t("nav.contact") },
  ] as const;

  // On home: transparent over hero, light text. On inner pages: always solid cream bg.
  const solid = !isHome || scrolled;
  const textClass = solid ? "text-foreground" : "text-cream";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? "bg-cream/90 backdrop-blur-md border-b border-border/60 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 lg:px-12">
        {/* Left: desktop nav */}
        <nav className={`hidden items-center gap-8 text-[11px] uppercase tracking-[0.18em] font-sans font-light lg:flex ${textClass}`}>
          {links.slice(0, 3).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="transition-colors hover:text-accent"
              activeProps={{ className: "text-accent" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Center: logo */}
        <Link to="/" className="flex items-center justify-center">
          <img
            src={solid ? logoGreen : logoGold}
            alt="MUNIS USMAN"
            className="h-10 w-auto md:h-12"
          />
        </Link>

        {/* Right: desktop nav + lang */}
        <div className={`hidden items-center gap-8 text-[11px] uppercase tracking-[0.18em] font-sans font-light lg:flex ${textClass}`}>
          {links.slice(3).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="transition-colors hover:text-accent"
              activeProps={{ className: "text-accent" }}
            >
              {l.label}
            </Link>
          ))}
          <LangToggle lang={lang} setLang={setLang} textClass={textClass} t={t} />
        </div>

        {/* Mobile: burger */}
        <div className="flex items-center gap-4 lg:hidden">
          <LangToggle lang={lang} setLang={setLang} textClass={textClass} t={t} />
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className={`${textClass} transition-colors`}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden">
          <nav className="border-t border-border/50 bg-cream/95 px-6 py-6 backdrop-blur-md">
            <ul className="flex flex-col gap-5 text-sm uppercase tracking-[0.18em] font-sans font-light text-foreground">
              <li>
                <Link to="/" className="block py-1" activeProps={{ className: "text-accent" }}>
                  {t("nav.home")}
                </Link>
              </li>
              {links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="block py-1"
                    activeProps={{ className: "text-accent" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}

function LangToggle({
  lang,
  setLang,
  textClass,
  t,
}: {
  lang: "ru" | "en";
  setLang: (l: "ru" | "en") => void;
  textClass: string;
  t: (k: string) => string;
}) {
  return (
    <div className={`flex items-center gap-1 text-[11px] uppercase tracking-[0.18em] font-sans font-light ${textClass}`}>
      <button
        onClick={() => setLang("ru")}
        className={`transition-colors hover:text-accent ${lang === "ru" ? "text-accent" : "opacity-70"}`}
        aria-label="Russian"
      >
        {t("lang.ru")}
      </button>
      <span className="opacity-40">/</span>
      <button
        onClick={() => setLang("en")}
        className={`transition-colors hover:text-accent ${lang === "en" ? "text-accent" : "opacity-70"}`}
        aria-label="English"
      >
        {t("lang.en")}
      </button>
    </div>
  );
}
