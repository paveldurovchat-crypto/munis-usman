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
      <ul className="relative flex items-stretch justify-around px-2 pt-3">
        {tabs.map((tab) => {
          const active = isActive(tab);
          return (
            <li key={tab.id} className="relative flex-1">
              <Link
                to={tab.to}
                search={tab.search as never}
                className="relative flex items-center justify-center px-2 py-3"
              >
                {active && (
                  <svg
                    aria-hidden
                    viewBox="0 0 160 50"
                    preserveAspectRatio="none"
                    className="pointer-events-none absolute left-1/2 -translate-x-1/2"
                    style={{ width: "calc(100% + 60px)", height: "calc(100% + 8px)", top: "-6px" }}
                  >
                    <path
                      d="M 0 50 L 16 50 C 26 50 30 50 30 44 L 30 20 Q 30 0 50 0 L 110 0 Q 130 0 130 20 L 130 44 C 130 50 134 50 144 50 L 160 50 Z"
                      fill="#2a2a2a"
                    />
                  </svg>
                )}
                <span
                  className={`relative z-10 font-sans text-[10px] uppercase tracking-[0.18em] ${
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
      <Link to="/" className="mt-1 block pb-3 text-center font-sans text-[10px] text-white/55">
        munisusman.uz
      </Link>
    </nav>
  );
}
