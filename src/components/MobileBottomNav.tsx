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
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-[-6px] -translate-x-1/2 bg-[#2a2a2a]"
                    style={{
                      width: "calc(100% + 24px)",
                      height: "calc(100% + 10px)",
                      // Organic pill with concave cutouts at bottom-left & bottom-right
                      // using radial gradients to "subtract" curves from the corners.
                      WebkitMaskImage:
                        "radial-gradient(circle 10px at 0% 100%, transparent 99%, #000 100%), radial-gradient(circle 10px at 100% 100%, transparent 99%, #000 100%), linear-gradient(#000, #000)",
                      WebkitMaskComposite: "source-in, source-in, source-over",
                      maskImage:
                        "radial-gradient(circle 10px at 0% 100%, transparent 99%, #000 100%), radial-gradient(circle 10px at 100% 100%, transparent 99%, #000 100%), linear-gradient(#000, #000)",
                      maskComposite: "intersect",
                      borderRadius: "22px 22px 14px 14px",
                    }}
                  />
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
