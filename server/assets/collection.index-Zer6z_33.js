import { T as jsxRuntimeExports } from "./worker-entry-BkQn58Dh.js";
import { u as useI18n, b as products, L as Link } from "./router-Bt0jznIB.js";
import { S as SiteNav, a as SiteFooter } from "./SiteFooter-Q9gOb6NG.js";
import { P as PageHero } from "./PageHero-6Q79tWGG.js";
import { F as FadeUp } from "./FadeUp-GqRARcou.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function CollectionPage() {
  const {
    t
  } = useI18n();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PageHero, { kicker: t("collection.kicker"), title: t("collection.title"), subtitle: t("collection.subtitle") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-cream py-20 lg:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-6 lg:px-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3", children: products.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(FadeUp, { delay: i % 3 * 100, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/collection/$slug", params: {
        slug: p.slug
      }, className: "group block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[3/4] overflow-hidden bg-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.image, alt: t(p.nameKey), loading: "lazy", className: "h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-deep/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-accent", children: t(p.tagKey) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 font-display text-2xl text-foreground", children: t(p.nameKey) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: t(p.descKey) })
        ] })
      ] }) }, p.slug)) }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  CollectionPage as component
};
