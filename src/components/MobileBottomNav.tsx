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

  const activeIndex = tabs.findIndex(
    (tab) => isCollection && (activeCat === tab.id || (!activeCat && tab.id === "accessories")),
  );

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-40 bg-[#111111] lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1 px-2 pt-3">
        {tabs.map((tab, idx) => {
          const active = idx === activeIndex;
          return (
            <li key={tab.id} className="flex">
              <Link
                to={tab.to}
                search={tab.search as never}
                className={`inline-flex items-center rounded-full px-3 py-1.5 transition-colors ${
                  active ? "bg-[#3a3a3a] text-white" : "text-white/70"
                }`}
              >
                <span
                  className="font-baskerville text-[15px] uppercase tracking-[0.14em] leading-none whitespace-nowrap"
                >
                  {t(tab.labelKey)}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <Link to="/" className="mt-2 block pb-3 text-center font-sans text-[10px] text-white/55">
        munisusman.uz
      </Link>
    </nav>
  );
}
