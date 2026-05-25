import { Link, useLocation } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

type Tab = {
  id: "accessories" | "cloth" | "home" | "couture" | "homepage";
  labelKey: string;
  to: string;
  search?: Record<string, string>;
};

export function MobileBottomNav() {
  const { t } = useI18n();
  const location = useLocation();
  const search = location.search as Record<string, string>;
  const activeCat = search?.cat;
  const isHome = location.pathname === "/";
  const isCollection = location.pathname.startsWith("/collection");

  const tabs: Tab[] = [
    { id: "accessories", labelKey: "collection.tabAccessories", to: "/collection", search: { cat: "accessories" } },
    { id: "cloth", labelKey: "collection.tabCloth", to: "/collection", search: { cat: "cloth" } },
    { id: "homepage", labelKey: "", to: "/" },
    { id: "home", labelKey: "collection.tabHome", to: "/collection", search: { cat: "home" } },
    { id: "couture", labelKey: "collection.tabCouture", to: "/collection", search: { cat: "couture" } },
  ];

  const isActive = (tab: Tab) => {
    if (tab.id === "homepage") return isHome;
    if (!isCollection) return false;
    return activeCat === tab.id || (!activeCat && tab.id === "accessories");
  };

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-40 bg-forest-deep/95 backdrop-blur-md lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-70" />
      <ul className="flex items-stretch">
        {tabs.map((tab) => {
          const active = isActive(tab);
          const isCenter = tab.id === "homepage";
          return (
            <li key={tab.id} className="flex-1">
              <Link
                to={tab.to}
                search={tab.search as never}
                className={`relative flex h-16 flex-col items-center justify-center gap-1 text-cream transition-opacity ${
                  active ? "opacity-100" : "opacity-50"
                }`}
              >
                {active && !isCenter && (
                  <span className="absolute inset-x-3 top-0 h-[2px] bg-[var(--gold)]" />
                )}
                {isCenter ? (
                  <>
                    <span className="h-2 w-2 rounded-full bg-[var(--gold)]" aria-hidden />
                    <span className="font-display italic text-[11px] leading-none text-cream">
                      munis.usman.uz
                    </span>
                  </>
                ) : (
                  <span className="font-sans text-[10px] uppercase tracking-[0.18em]">
                    {t(tab.labelKey)}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
