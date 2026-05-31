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
      className="mbn-root fixed inset-x-0 bottom-0 z-40 bg-[#111111] lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)", overflow: "visible" }}
    >
      <style>{`
        .nav-tab.active {
          color: #fff;
          background-color: #3a3a3a;
          height: 44px;
          border-top-left-radius: 22px;
          border-bottom-left-radius: 22px;
          position: relative;
          overflow: visible;
          padding-right: 20px;
          padding-left: 16px;
          z-index: 2;
        }
        .nav-tab.active::after {
          content: '';
          position: absolute;
          top: -6px;
          right: -30px;
          width: 70px;
          height: 70px;
          background-color: #111111;
          border-radius: 50%;
          z-index: 3;
        }
        .nav-tab.after-active {
          z-index: 4;
          position: relative;
        }
      `}</style>
      <ul
        className="relative flex items-center justify-around px-2 pt-3"
        style={{ overflow: "visible" }}
      >
        {tabs.map((tab, idx) => {
          const active = idx === activeIndex;
          const afterActive = idx === activeIndex + 1;
          const classes = ["nav-tab", "inline-flex", "items-center"];
          if (active) classes.push("active");
          if (afterActive) classes.push("after-active");
          else if (!active) classes.push("px-3", "py-2");
          return (
            <li key={tab.id} className="flex flex-1 justify-center" style={{ overflow: "visible" }}>
              <Link to={tab.to} search={tab.search as never} className={classes.join(" ")}>
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
