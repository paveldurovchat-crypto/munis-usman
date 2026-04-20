import { M as useRouter, r as reactExports, T as jsxRuntimeExports } from "./worker-entry-BkQn58Dh.js";
import { u as useI18n, L as Link } from "./router-Bt0jznIB.js";
function useLocation(opts) {
  const router = useRouter();
  {
    const location = router.stores.location.get();
    return location;
  }
}
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
  return false;
};
const Icon = reactExports.forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => reactExports.createElement(
    "svg",
    {
      ref,
      ...defaultAttributes,
      width: size,
      height: size,
      stroke: color,
      strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      className: mergeClasses("lucide", className),
      ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
      ...rest
    },
    [
      ...iconNode.map(([tag, attrs]) => reactExports.createElement(tag, attrs)),
      ...Array.isArray(children) ? children : [children]
    ]
  )
);
const createLucideIcon = (iconName, iconNode) => {
  const Component = reactExports.forwardRef(
    ({ className, ...props }, ref) => reactExports.createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        `lucide-${toKebabCase(toPascalCase(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component.displayName = toPascalCase(iconName);
  return Component;
};
const __iconNode$1 = [
  ["path", { d: "M4 5h16", key: "1tepv9" }],
  ["path", { d: "M4 12h16", key: "1lakjw" }],
  ["path", { d: "M4 19h16", key: "1djgab" }]
];
const Menu = createLucideIcon("menu", __iconNode$1);
const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode);
const logoGold = "/assets/logo-gold-BqLfu9MW.svg";
const logoGreen = "/assets/logo-green-DVIGvZlS.svg";
function SiteNav() {
  const { lang, setLang, t } = useI18n();
  const [scrolled, setScrolled] = reactExports.useState(false);
  const [open, setOpen] = reactExports.useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  reactExports.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  reactExports.useEffect(() => {
    setOpen(false);
  }, [pathname]);
  const links = [
    { to: "/collection", label: t("nav.collection") },
    { to: "/about", label: t("nav.about") },
    { to: "/custom", label: t("nav.custom") },
    { to: "/journal", label: t("nav.journal") },
    { to: "/contact", label: t("nav.contact") }
  ];
  const solid = !isHome || scrolled;
  const textClass = solid ? "text-foreground" : "text-cream";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "header",
    {
      className: `fixed inset-x-0 top-0 z-50 transition-all duration-500 ${solid ? "bg-cream/90 backdrop-blur-md border-b border-border/60 py-3" : "bg-transparent py-6"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 lg:px-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: `hidden items-center gap-8 text-[11px] uppercase tracking-[0.24em] lg:flex ${textClass}`, children: links.slice(0, 3).map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: l.to,
              className: "transition-colors hover:text-accent",
              activeProps: { className: "text-accent" },
              children: l.label
            },
            l.to
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: solid ? logoGreen : logoGold,
              alt: "MUNIS USMAN",
              className: "h-10 w-auto md:h-12"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `hidden items-center gap-8 text-[11px] uppercase tracking-[0.24em] lg:flex ${textClass}`, children: [
            links.slice(3).map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: l.to,
                className: "transition-colors hover:text-accent",
                activeProps: { className: "text-accent" },
                children: l.label
              },
              l.to
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsx(LangToggle, { lang, setLang, textClass, t })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 lg:hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LangToggle, { lang, setLang, textClass, t }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                "aria-label": "Toggle menu",
                onClick: () => setOpen((v) => !v),
                className: `${textClass} transition-colors`,
                children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-6 w-6" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-6 w-6" })
              }
            )
          ] })
        ] }),
        open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "border-t border-border/50 bg-cream/95 px-6 py-6 backdrop-blur-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "flex flex-col gap-5 text-sm uppercase tracking-[0.28em] text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "block py-1", activeProps: { className: "text-accent" }, children: t("nav.home") }) }),
          links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: l.to,
              className: "block py-1",
              activeProps: { className: "text-accent" },
              children: l.label
            }
          ) }, l.to))
        ] }) }) })
      ]
    }
  );
}
function LangToggle({
  lang,
  setLang,
  textClass,
  t
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-1 text-[11px] uppercase tracking-[0.24em] ${textClass}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => setLang("ru"),
        className: `transition-colors hover:text-accent ${lang === "ru" ? "text-accent" : "opacity-70"}`,
        "aria-label": "Russian",
        children: t("lang.ru")
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-40", children: "/" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => setLang("en"),
        className: `transition-colors hover:text-accent ${lang === "en" ? "text-accent" : "opacity-70"}`,
        "aria-label": "English",
        children: t("lang.en")
      }
    )
  ] });
}
const BRAND = {
  emailPrimary: "info@munisusman.com",
  emailSecondary: "info@munisusman.uz",
  instagram: "https://www.instagram.com/munisusman/",
  instagramHandle: "@munisusman",
  location: "Tashkent, Uzbekistan"
};
function mailtoLink(subject, body) {
  const params = new URLSearchParams({ subject, body });
  return `mailto:${BRAND.emailPrimary}?${params.toString()}`;
}
function SiteFooter() {
  const { t } = useI18n();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "bg-forest-deep text-cream/80", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 py-20 lg:px-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-12 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logoGold, alt: "MUNIS USMAN", className: "h-16 w-auto" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 max-w-sm text-sm leading-relaxed text-cream/60", children: t("footer.tagline") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-xs uppercase tracking-[0.3em] text-gold-soft", children: BRAND.location })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs uppercase tracking-[0.3em] text-gold-soft", children: t("footer.explore") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-6 space-y-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/collection", className: "transition-colors hover:text-gold", children: t("nav.collection") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", className: "transition-colors hover:text-gold", children: t("nav.about") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/custom", className: "transition-colors hover:text-gold", children: t("nav.custom") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/journal", className: "transition-colors hover:text-gold", children: t("nav.journal") }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs uppercase tracking-[0.3em] text-gold-soft", children: t("footer.atelier") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-6 space-y-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: `mailto:${BRAND.emailPrimary}`,
              className: "transition-colors hover:text-gold",
              children: BRAND.emailPrimary
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: `mailto:${BRAND.emailSecondary}`,
              className: "transition-colors hover:text-gold",
              children: BRAND.emailSecondary
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: BRAND.instagram,
              target: "_blank",
              rel: "noreferrer noopener",
              className: "transition-colors hover:text-gold",
              children: [
                "Instagram · ",
                BRAND.instagramHandle
              ]
            }
          ) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-16 flex flex-col items-start justify-between gap-4 border-t border-cream/10 pt-8 text-xs uppercase tracking-[0.25em] text-cream/40 sm:flex-row sm:items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " MUNIS USMAN · ",
        t("footer.rights")
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t("footer.crafted") })
    ] })
  ] }) });
}
export {
  BRAND as B,
  SiteNav as S,
  SiteFooter as a,
  logoGreen as l,
  mailtoLink as m
};
