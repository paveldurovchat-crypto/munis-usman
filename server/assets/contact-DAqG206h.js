import { r as reactExports, T as jsxRuntimeExports } from "./worker-entry-BkQn58Dh.js";
import { S as SiteNav, B as BRAND, a as SiteFooter, m as mailtoLink } from "./SiteFooter-Q9gOb6NG.js";
import { P as PageHero } from "./PageHero-6Q79tWGG.js";
import { F as FadeUp } from "./FadeUp-GqRARcou.js";
import { u as useI18n } from "./router-Bt0jznIB.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function ContactPage() {
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
    const subject = `Website inquiry — ${form.name.slice(0, 60)}`;
    const body = `Name: ${form.name}
Email: ${form.email}

${form.message}`;
    window.location.href = mailtoLink(subject, body);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PageHero, { kicker: t("contact.kicker"), title: t("contact.title"), subtitle: t("contact.subtitle") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-cream py-24 lg:py-32", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-6xl grid-cols-1 gap-16 px-6 lg:grid-cols-2 lg:gap-24 lg:px-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FadeUp, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "space-y-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs uppercase tracking-[0.3em] text-muted-foreground", children: t("contact.locationLabel") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-3 font-display text-2xl text-foreground", children: t("contact.locationValue") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs uppercase tracking-[0.3em] text-muted-foreground", children: t("contact.emailLabel") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("dd", { className: "mt-3 space-y-1 font-display text-xl text-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `mailto:${BRAND.emailPrimary}`, className: "block hover:text-accent", children: BRAND.emailPrimary }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `mailto:${BRAND.emailSecondary}`, className: "block hover:text-accent", children: BRAND.emailSecondary })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs uppercase tracking-[0.3em] text-muted-foreground", children: t("contact.instagramLabel") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-3 font-display text-xl text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: BRAND.instagram, target: "_blank", rel: "noreferrer noopener", className: "hover:text-accent", children: BRAND.instagramHandle }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs uppercase tracking-[0.3em] text-muted-foreground", children: t("contact.hoursLabel") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-3 font-display text-xl text-foreground", children: t("contact.hoursValue") })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FadeUp, { delay: 150, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl text-foreground", children: t("contact.formTitle") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", required: true, maxLength: 100, value: form.name, onChange: (e) => setForm({
            ...form,
            name: e.target.value
          }), placeholder: t("contact.formNamePlaceholder"), className: "w-full border-b border-border bg-transparent py-3 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", maxLength: 150, value: form.email, onChange: (e) => setForm({
            ...form,
            email: e.target.value
          }), placeholder: t("contact.formEmailPlaceholder"), className: "w-full border-b border-border bg-transparent py-3 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { required: true, maxLength: 2e3, rows: 5, value: form.message, onChange: (e) => setForm({
            ...form,
            message: e.target.value
          }), placeholder: t("contact.formMessagePlaceholder"), className: "w-full border-b border-border bg-transparent py-3 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", disabled: !canSubmit, className: "group inline-flex items-center gap-3 border border-forest/60 bg-forest px-8 py-4 text-[11px] uppercase tracking-[0.28em] text-cream transition-all hover:bg-forest-deep disabled:cursor-not-allowed disabled:opacity-40", children: [
            t("contact.formSubmit"),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "transition-transform group-hover:translate-x-1", children: "→" })
          ] })
        ] }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  ContactPage as component
};
