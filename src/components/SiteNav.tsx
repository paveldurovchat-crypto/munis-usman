import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logoGold from "@/assets/logo-gold.svg";

const links = [
  { label: "Коллекция", href: "#collection" },
  { label: "Философия", href: "#about" },
  { label: "Ремесло", href: "#craft" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cream/85 backdrop-blur-md border-b border-border/60 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-3 items-center px-6 lg:px-12">
        <nav className="hidden items-center gap-10 text-xs uppercase tracking-[0.22em] md:flex">
          {links.slice(0, 2).map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`transition-colors hover:text-accent ${
                scrolled ? "text-foreground" : "text-cream"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <Link to="/" className="flex items-center justify-center">
          <img
            src={logoGold}
            alt="MUNIS USMAN"
            className="h-12 w-auto md:h-14"
          />
        </Link>

        <div className="hidden items-center justify-end gap-10 text-xs uppercase tracking-[0.22em] md:flex">
          <a
            href="#craft"
            className={`transition-colors hover:text-accent ${
              scrolled ? "text-foreground" : "text-cream"
            }`}
          >
            Ремесло
          </a>
          <a
            href="#contact"
            className={`transition-colors hover:text-accent ${
              scrolled ? "text-foreground" : "text-cream"
            }`}
          >
            Контакты
          </a>
        </div>
      </div>
    </header>
  );
}
