import { r as reactExports, T as jsxRuntimeExports } from "./worker-entry-C7LP1yKX.js";
import { S as SiteNav, B as BRAND, a as SiteFooter, m as mailtoLink } from "./SiteFooter-MBQLa_Ev.js";
import { P as PageHero } from "./PageHero-DxUnXeAE.js";
import { F as FadeUp } from "./FadeUp-Da8JNI6t.js";
import { u as useI18n } from "./router-BKP1cpJb.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function CustomPage() {
  const {
    t
  } = useI18n();
  const [form, setForm] = reactExports.useState({
    name: "",
    email: "",
    message: ""
  });
  const canSubmit = form.name.trim().length > 0 && form.message.trim().length > 0;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    const subject = `Custom order inquiry — ${form.name.slice(0, 60)}`;
    const body = `Name: ${form.name}
Email: ${form.email}

${form.message}`;
    window.location.href = mailtoLink(subject, body);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PageHero, { kicker: t("custom.kicker"), title: t("custom.title"), subtitle: t("custom.intro") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-cream py-24 lg:py-32", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-6xl px-6 lg:px-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-12 md:grid-cols-2", children: [[t("custom.step1Title"), t("custom.step1Body")], [t("custom.step2Title"), t("custom.step2Body")], [t("custom.step3Title"), t("custom.step3Body")], [t("custom.step4Title"), t("custom.step4Body")]].map(([title, body], i) => /* @__PURE__ */ jsxRuntimeExports.jsx(FadeUp, { delay: i * 100, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl text-foreground", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm leading-relaxed text-muted-foreground", children: body })
      ] }) }, title)) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-burgundy py-24 text-cream lg:py-32", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl px-6 lg:px-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(FadeUp, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl leading-[1.05] lg:text-5xl", children: t("custom.formTitle") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm leading-relaxed text-cream/80", children: t("custom.formBody") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FadeUp, { delay: 120, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "mt-10 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", required: true, maxLength: 100, value: form.name, onChange: (e) => setForm({
            ...form,
            name: e.target.value
          }), placeholder: t("custom.formNamePlaceholder"), className: "w-full border-b border-cream/30 bg-transparent py-3 text-cream placeholder:text-cream/50 focus:border-gold focus:outline-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", maxLength: 150, value: form.email, onChange: (e) => setForm({
            ...form,
            email: e.target.value
          }), placeholder: t("custom.formEmailPlaceholder"), className: "w-full border-b border-cream/30 bg-transparent py-3 text-cream placeholder:text-cream/50 focus:border-gold focus:outline-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { required: true, maxLength: 2e3, rows: 5, value: form.message, onChange: (e) => setForm({
            ...form,
            message: e.target.value
          }), placeholder: t("custom.formMessagePlaceholder"), className: "w-full border-b border-cream/30 bg-transparent py-3 text-cream placeholder:text-cream/50 focus:border-gold focus:outline-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-6 pt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", disabled: !canSubmit, className: "group inline-flex items-center gap-3 border border-gold/70 bg-transparent px-8 py-4 text-[11px] uppercase tracking-[0.28em] text-cream transition-all hover:bg-gold hover:text-forest-deep disabled:cursor-not-allowed disabled:opacity-40", children: [
              t("custom.formSubmit"),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "transition-transform group-hover:translate-x-1", children: "→" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-cream/60", children: t("custom.formOr") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: BRAND.instagram, target: "_blank", rel: "noreferrer noopener", className: "text-xs uppercase tracking-[0.28em] text-gold-soft transition-colors hover:text-gold", children: "Instagram DM" })
          ] })
        ] }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  CustomPage as component
};
