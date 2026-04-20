import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Craft } from "@/components/Craft";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "MUNIS USMAN — Couture с 2014 года" },
      {
        name: "description",
        content:
          "Дизайнерский бренд MUNIS USMAN: ручная работа, натуральные ткани, вечная элегантность. Каждая деталь коллекции — отражение неподдельного стиля.",
      },
      { property: "og:title", content: "MUNIS USMAN — Couture с 2014 года" },
      {
        property: "og:description",
        content: "Философия, воплощённая в каждом изделии. Ручная работа, вне времени.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>
        <Hero />
        <About />
        <Craft />
      </main>
      <SiteFooter />
    </div>
  );
}
