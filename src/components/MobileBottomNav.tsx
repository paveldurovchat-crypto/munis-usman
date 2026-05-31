import { Link, useLocation } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

type Tab = {
  id: "accessories" | "cloth" | "home" | "couture";
  labelKey: string;
  to: string;
  search?: Record<string, string>;
};

export function MobileBottomNav() {
  const { t } = useI18n();
  const location = useLocation();
  const search = location.search as Record<string, string>;
  const activeCat = search?.cat;
  const isCollection = location.pathname.startsWith("/collection");

  const tabs: Tab[] = [
    { id: "accessories", labelKey: "collection.tabAccessories", to: "/collection", search: { cat: "accessories" } },
    { id: "cloth", labelKey: "collection.tabCloth", to: "/collection", search: { cat: "cloth" } },
    { id: "home", labelKey: "collection.tabHome", to: "/collection", search: { cat: "home" } },
    { id: "couture", labelKey: "collection.tabCouture", to: "/collection", search: { cat: "couture" } },
  ];

  const isActive = (tab: Tab) =>
    isCollection && (activeCat === tab.id || (!activeCat && tab.id === "accessories"));

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-40 bg-[#111111] lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="flex items-center justify-around px-3 pt-3">
        {tabs.map((tab) => {
          const active = isActive(tab);
          return (
            <li key={tab.id}>
              <Link
                to={tab.to}
                search={tab.search as never}
                className={`block rounded-full px-3 py-1.5 font-sans text-[10px] uppercase tracking-[0.18em] transition-colors ${
                  active ? "bg-white/10 text-white" : "text-white/70"
                }`}
              >
                {t(tab.labelKey)}
              </Link>
            </li>
          );
        })}
      </ul>
      <Link to="/" className="mt-1 block pb-3 text-center font-sans text-[10px] text-white/55">
        munis.usman.uz
      </Link>
    </nav>
  );
}
