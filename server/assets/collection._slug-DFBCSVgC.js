import { T as jsxRuntimeExports } from "./worker-entry-C7LP1yKX.js";
import { u as useI18n, R as Route, b as products, L as Link } from "./router-BKP1cpJb.js";
import { S as SiteNav, m as mailtoLink, B as BRAND, a as SiteFooter } from "./SiteFooter-MBQLa_Ev.js";
import { F as FadeUp } from "./FadeUp-Da8JNI6t.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function ProductPage() {
  const {
    t
  } = useI18n();
  const {
    product
  } = Route.useLoaderData();
  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);
  const subject = `Inquiry: ${product.slug}`;
  const body = `Hello MUNIS USMAN,

I'm interested in "${product.slug}". Please share more details.

Thank you!`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "pt-28 lg:pt-36", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-6 lg:px-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/collection", className: "text-xs uppercase tracking-[0.28em] text-muted-foreground hover:text-accent", children: t("product.backToCollection") }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:gap-16 lg:px-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FadeUp, { className: "lg:col-span-7", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-[4/5] overflow-hidden bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: product.image, alt: t(product.nameKey), className: "h-full w-full object-cover" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-center lg:col-span-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(FadeUp, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-accent", children: t(product.tagKey) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 font-display text-4xl leading-[1.05] text-foreground lg:text-5xl", children: t(product.nameKey) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-base leading-relaxed text-muted-foreground", children: t(product.descKey) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FadeUp, { delay: 120, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 border-t border-border pt-8 text-sm leading-relaxed text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: t("product.madeToOrderNote") }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FadeUp, { delay: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: mailtoLink(subject, body), className: "group inline-flex items-center gap-3 border border-forest/60 bg-forest px-8 py-4 text-[11px] uppercase tracking-[0.28em] text-cream transition-all hover:bg-forest-deep", children: [
              t("cta.inquire"),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "transition-transform group-hover:translate-x-1", children: "→" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: BRAND.instagram, target: "_blank", rel: "noreferrer noopener", className: "inline-flex items-center gap-3 border border-forest/30 px-8 py-4 text-[11px] uppercase tracking-[0.28em] text-foreground transition-all hover:border-forest", children: "Instagram DM" })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mt-32 bg-cream py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 lg:px-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl text-foreground lg:text-4xl", children: "You may also like" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3", children: related.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(FadeUp, { delay: i * 100, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/collection/$slug", params: {
          slug: p.slug
        }, className: "group block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-[3/4] overflow-hidden bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.image, alt: t(p.nameKey), loading: "lazy", className: "h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.05]" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 font-display text-xl text-foreground", children: t(p.nameKey) })
        ] }) }, p.slug)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  ProductPage as component
};
