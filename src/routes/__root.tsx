import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { useState } from "react";

import appCss from "../styles.css?url";
import { LanguageProvider } from "@/lib/i18n";
import { AuthProvider } from "@/lib/auth";
import { CartProvider } from "@/lib/cart";
import { WishlistProvider } from "@/lib/wishlist";


function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl text-foreground">404</h1>
        <h2 className="mt-4 font-display text-2xl text-foreground">Страница не найдена</h2>
        <p className="mt-2 text-sm text-muted-foreground">The page you're looking for doesn't exist.</p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center border border-accent/70 px-6 py-3 text-xs uppercase tracking-[0.28em] text-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
            Вернуться
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "MUNIS USMAN — Wearable Art. Crafted in Tashkent." },
      { name: "description", content: "MUNIS USMAN — дизайнерский бренд носимого искусства из Ташкента. Ручная вышивка, ограниченные серии, изделия на заказ с 2014 года." },
      { name: "author", content: "MUNIS USMAN" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "MUNIS USMAN" },
      { property: "og:title", content: "MUNIS USMAN" },
      { property: "og:description", content: "Ташкентский бренд. Аксессуары, предметы и носимое искусство. С 2014 года." },
      { property: "og:url", content: "https://munis-usman.uz/" },
      { property: "og:image", content: "https://munis-usman.uz/og-image.jpg" },
      { property: "og:image:secure_url", content: "https://munis-usman.uz/og-image.jpg" },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "MUNIS USMAN — Wearable Art. Crafted in Tashkent." },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "MUNIS USMAN" },
      { name: "twitter:description", content: "Ташкентский бренд. Аксессуары, предметы и носимое искусство. С 2014 года." },
      { name: "twitter:image", content: "https://munis-usman.uz/og-image.jpg" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
    ],

  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: { queries: { staleTime: 30_000, refetchOnWindowFocus: false } },
  }));
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <LanguageProvider>
              <Outlet />
              <Toaster position="bottom-right" richColors />
            </LanguageProvider>
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
