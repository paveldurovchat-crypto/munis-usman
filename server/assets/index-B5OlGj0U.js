import { T as jsxRuntimeExports } from "./worker-entry-BkQn58Dh.js";
import { u as useI18n, L as Link, e as embroideryHands, f as fabricDetails, a as collection1, c as collection3, p as phoneCase, j as journal3, b as products } from "./router-Bt0jznIB.js";
import { S as SiteNav, l as logoGreen, a as SiteFooter } from "./SiteFooter-Q9gOb6NG.js";
import { F as FadeUp } from "./FadeUp-GqRARcou.js";
import { a as journal2, j as journal1 } from "./journal-2-B9mFl-uL.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const heroGif = "/assets/hero-9_jSB8D1.gif";
function Hero() {
  const { t } = useI18n();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative h-screen min-h-[720px] w-full overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: heroGif,
        alt: "MUNIS USMAN — Wearable Art",
        className: "absolute inset-0 h-full w-full object-cover object-center animate-kenburns"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-forest-deep/30 via-forest-deep/20 to-forest-deep/80" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-forest-deep/60 via-transparent to-forest-deep/30" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 flex h-full flex-col justify-end px-6 pb-24 lg:px-20 lg:pb-32", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl animate-fade-up", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-6 text-[11px] uppercase tracking-[0.4em] text-gold-soft", children: t("home.heroKicker") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-5xl leading-[0.95] text-cream sm:text-6xl lg:text-[7.5rem]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block", children: "Wearable Art." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "not-italic text-gold-gradient", children: "Crafted in Tashkent." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 max-w-md text-base font-light leading-relaxed text-cream/85", children: t("brand.tagline") === "Wearable Art. Crafted in Tashkent." ? "Designer brand of hand-embroidered, limited-edition pieces. Since 2014." : "Дизайнерский бренд ручной работы. Ограниченные серии и изделия на заказ — с 2014 года." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex flex-wrap gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/collection",
            className: "group inline-flex items-center gap-3 border border-gold/70 bg-transparent px-8 py-4 text-[11px] uppercase tracking-[0.28em] text-cream transition-all hover:bg-gold hover:text-forest-deep",
            children: [
              t("cta.explore"),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "transition-transform group-hover:translate-x-1", children: "→" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/custom",
            className: "inline-flex items-center gap-3 border border-cream/30 bg-transparent px-8 py-4 text-[11px] uppercase tracking-[0.28em] text-cream transition-all hover:border-cream/80",
            children: t("cta.customOrder")
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-8 right-8 z-10 hidden flex-col items-end gap-2 text-cream/60 lg:flex", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-px bg-cream/40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-[0.3em]", children: "Scroll" })
    ] })
  ] });
}
function Index() {
  const {
    t
  } = useI18n();
  const featured = products.slice(0, 3);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "philosophy", className: "relative overflow-hidden bg-cream py-28 lg:py-40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-12 lg:gap-20 lg:px-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(FadeUp, { className: "lg:col-span-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-6 text-xs uppercase tracking-[0.4em] text-muted-foreground", children: t("home.philosophyKicker") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logoGreen, alt: "MUNIS USMAN", className: "h-40 w-auto opacity-90 lg:h-56", loading: "lazy" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FadeUp, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "whitespace-pre-line font-display text-4xl leading-[1.05] text-foreground sm:text-5xl lg:text-6xl", children: t("home.philosophyTitle") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 grid gap-10 border-t border-border pt-10 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FadeUp, { delay: 100, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base leading-relaxed text-muted-foreground", children: t("home.philosophyBody1") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FadeUp, { delay: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base leading-relaxed text-muted-foreground", children: t("home.philosophyBody2") }) })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-ivory py-28 lg:py-40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 lg:px-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FadeUp, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4 text-xs uppercase tracking-[0.4em] text-muted-foreground", children: t("home.featuredKicker") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FadeUp, { delay: 80, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end justify-between gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-5xl leading-[1.05] text-foreground lg:text-7xl", children: t("home.featuredTitle") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-sm text-sm text-muted-foreground", children: t("home.featuredSubtitle") })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 grid grid-cols-1 gap-8 md:grid-cols-3", children: featured.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(FadeUp, { delay: i * 120, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/collection/$slug", params: {
          slug: p.slug
        }, className: "group block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-[3/4] overflow-hidden bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.image, alt: t(p.nameKey), loading: "lazy", className: "h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-accent", children: t(p.tagKey) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 font-display text-2xl text-foreground", children: t(p.nameKey) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: t(p.descKey) })
          ] })
        ] }) }, p.slug)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FadeUp, { delay: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/collection", className: "group inline-flex items-center gap-3 border border-forest/40 px-8 py-4 text-[11px] uppercase tracking-[0.28em] text-foreground transition-all hover:bg-forest hover:text-cream", children: [
          t("cta.explore"),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "transition-transform group-hover:translate-x-1", children: "→" })
        ] }) }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-burgundy text-cream", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-[4/5] overflow-hidden lg:aspect-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: embroideryHands, alt: "Hand embroidery", loading: "lazy", className: "h-full w-full object-cover" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-center px-6 py-20 lg:px-16 lg:py-28", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FadeUp, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-6 text-xs uppercase tracking-[0.4em] text-gold-soft", children: t("home.processKicker") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FadeUp, { delay: 80, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl", children: t("home.processTitle") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FadeUp, { delay: 160, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 max-w-md text-base leading-relaxed text-cream/80", children: t("home.processBody") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FadeUp, { delay: 240, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/custom", className: "mt-10 inline-flex items-center gap-3 border border-gold/70 px-8 py-4 text-[11px] uppercase tracking-[0.28em] text-cream transition-all hover:bg-gold hover:text-forest-deep", children: [
            t("cta.customOrder"),
            " →"
          ] }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-cream py-28 lg:py-40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 lg:px-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FadeUp, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4 text-xs uppercase tracking-[0.4em] text-muted-foreground", children: t("home.galleryKicker") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FadeUp, { delay: 80, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end justify-between gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl leading-[1.05] text-foreground lg:text-6xl", children: t("home.galleryTitle") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-sm text-sm text-muted-foreground", children: t("home.gallerySubtitle") })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 grid grid-cols-2 gap-3 md:grid-cols-4", children: [fabricDetails, collection1, journal2, collection3, journal1, phoneCase, journal3, embroideryHands].map((src, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(FadeUp, { delay: i * 60, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "group relative aspect-square overflow-hidden bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src, alt: "", loading: "lazy", className: "h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]" }) }) }, i)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  Index as component
};
