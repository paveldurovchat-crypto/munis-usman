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
                className="relative flex items-center justify-center px-2 py-2"
              >
                {active && (
                  <svg
                    aria-hidden
                    viewBox="0 0 120 50"
                    preserveAspectRatio="none"
                    className="absolute left-1/2 top-[-6px] -translate-x-1/2"
                    style={{ width: "calc(100% + 28px)", height: "calc(100% + 12px)" }}
                  >
                    {/* Organic pill: rounded top, concave notches curving into bottom-left/right */}
                    <path
                      d="M 0 50 Q 12 50 12 38 L 12 20 Q 12 4 28 4 L 92 4 Q 108 4 108 20 L 108 38 Q 108 50 120 50 Z"
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
