import { T as jsxRuntimeExports } from "./worker-entry-BkQn58Dh.js";
import { L as Link } from "./router-Bt0jznIB.js";
import { S as SiteNav, a as SiteFooter } from "./SiteFooter-Q9gOb6NG.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const SplitNotFoundComponent = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-[60vh] items-center justify-center px-6 pt-32 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl text-foreground", children: "Не найдено" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/collection", className: "mt-6 inline-block text-sm uppercase tracking-[0.28em] text-accent", children: "← Collection" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
};
export {
  SplitNotFoundComponent as notFoundComponent
};
