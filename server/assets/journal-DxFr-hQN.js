import { T as jsxRuntimeExports } from "./worker-entry-C7LP1yKX.js";
import { S as SiteNav, a as SiteFooter } from "./SiteFooter-MBQLa_Ev.js";
import { P as PageHero } from "./PageHero-DxUnXeAE.js";
import { F as FadeUp } from "./FadeUp-Da8JNI6t.js";
import { u as useI18n, j as journal3 } from "./router-BKP1cpJb.js";
import { j as journal1, a as journal2 } from "./journal-2-B9mFl-uL.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function JournalPage() {
  const {
    t
  } = useI18n();
  const posts = [{
    img: journal1,
    title: t("journal.post1Title"),
    excerpt: t("journal.post1Excerpt"),
    date: t("journal.post1Date")
  }, {
    img: journal2,
    title: t("journal.post2Title"),
    excerpt: t("journal.post2Excerpt"),
    date: t("journal.post2Date")
  }, {
    img: journal3,
    title: t("journal.post3Title"),
    excerpt: t("journal.post3Excerpt"),
    date: t("journal.post3Date")
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PageHero, { kicker: t("journal.kicker"), title: t("journal.title"), subtitle: t("journal.subtitle") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-cream py-20 lg:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-6xl space-y-24 px-6 lg:px-12", children: posts.map((post, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(FadeUp, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: `grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-[4/5] overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: post.img, alt: post.title, loading: "lazy", className: "h-full w-full object-cover" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-muted-foreground", children: post.date }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 font-display text-3xl leading-[1.1] text-foreground lg:text-5xl", children: post.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-base leading-relaxed text-muted-foreground", children: post.excerpt }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "mt-8 w-fit text-xs uppercase tracking-[0.28em] text-accent transition-colors hover:text-forest", children: [
            t("journal.readMore"),
            " →"
          ] })
        ] })
      ] }) }, post.title)) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  JournalPage as component
};
