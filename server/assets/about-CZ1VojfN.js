import { T as jsxRuntimeExports } from "./worker-entry-C7LP1yKX.js";
import { S as SiteNav, a as SiteFooter } from "./SiteFooter-MBQLa_Ev.js";
import { P as PageHero } from "./PageHero-DxUnXeAE.js";
import { F as FadeUp } from "./FadeUp-Da8JNI6t.js";
import { u as useI18n, c as collection3 } from "./router-BKP1cpJb.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function AboutPage() {
  const {
    t
  } = useI18n();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PageHero, { kicker: t("about.kicker"), title: t("about.title"), subtitle: t("about.intro") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-cream py-24 lg:py-32", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-6xl grid-cols-1 gap-16 px-6 lg:grid-cols-2 lg:gap-24 lg:px-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FadeUp, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-[3/4] overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: collection3, alt: "Atelier", loading: "lazy", className: "h-full w-full object-cover" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-center gap-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FadeUp, { delay: 100, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base leading-relaxed text-muted-foreground", children: t("about.story1") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FadeUp, { delay: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base leading-relaxed text-muted-foreground", children: t("about.story2") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FadeUp, { delay: 300, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base leading-relaxed text-muted-foreground", children: t("about.story3") }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-burgundy py-24 text-cream lg:py-32", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-6 lg:px-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FadeUp, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4 text-xs uppercase tracking-[0.4em] text-gold-soft", children: t("about.valuesTitle") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid grid-cols-1 gap-10 border-t border-cream/15 pt-12 md:grid-cols-3", children: [["01", t("about.value1Title"), t("about.value1Body")], ["02", t("about.value2Title"), t("about.value2Body")], ["03", t("about.value3Title"), t("about.value3Body")]].map(([n, title, body], i) => /* @__PURE__ */ jsxRuntimeExports.jsx(FadeUp, { delay: i * 120, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-3xl text-gold", children: n }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 font-display text-2xl", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm leading-relaxed text-cream/75", children: body })
        ] }) }, n)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  AboutPage as component
};
