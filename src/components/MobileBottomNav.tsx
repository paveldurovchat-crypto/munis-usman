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
      className="mbn-root fixed inset-x-0 bottom-0 z-40 bg-[#111111] lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <style>{`
        .mbn-tab-active {
          background: #2a2a2a;
          border-radius: 20px 20px 0 0;
          position: relative;
          padding: 8px 18px 10px;
          margin-bottom: -2px;
        }
        .mbn-tab-active::before,
        .mbn-tab-active::after {
          content: '';
          position: absolute;
          bottom: 0;
          width: 16px;
          height: 16px;
          background: transparent;
        }
        .mbn-tab-active::before {
          left: -16px;
          border-bottom-right-radius: 16px;
          box-shadow: 4px 4px 0 4px #2a2a2a;
        }
        .mbn-tab-active::after {
          right: -16px;
          border-bottom-left-radius: 16px;
          box-shadow: -4px 4px 0 4px #2a2a2a;
        }
      `}</style>
      <ul className="relative flex items-end justify-around px-2 pt-4">
        {tabs.map((tab) => {
          const active = isActive(tab);
          return (
            <li key={tab.id} className="flex flex-1 justify-center">
              <Link
                to={tab.to}
                search={tab.search as never}
                className={active ? "mbn-tab-active" : "px-3 py-2"}
              >
                <span
                  className={`font-sans text-[10px] uppercase tracking-[0.18em] ${
                    active ? "text-white" : "text-white/70"
                  }`}
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
