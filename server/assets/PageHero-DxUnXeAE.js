import { T as jsxRuntimeExports } from "./worker-entry-C7LP1yKX.js";
import { F as FadeUp } from "./FadeUp-Da8JNI6t.js";
function PageHero({ kicker, title, subtitle, align = "left" }) {
  const alignment = align === "center" ? "text-center items-center" : "text-left items-start";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-b border-border/50 bg-cream pt-36 pb-16 lg:pt-44 lg:pb-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `mx-auto flex max-w-5xl flex-col gap-6 px-6 lg:px-12 ${alignment}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FadeUp, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.4em] text-muted-foreground", children: kicker }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FadeUp, { delay: 100, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display whitespace-pre-line text-5xl leading-[1.02] text-foreground sm:text-6xl lg:text-7xl", children: title }) }),
    subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx(FadeUp, { delay: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-2xl text-base leading-relaxed text-muted-foreground", children: subtitle }) })
  ] }) });
}
export {
  PageHero as P
};
