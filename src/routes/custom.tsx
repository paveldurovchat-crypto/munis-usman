import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { FadeUp } from "@/components/FadeUp";
import { useI18n } from "@/lib/i18n";
import { BRAND, mailtoLink } from "@/lib/brand";

export const Route = createFileRoute("/custom")({
  component: CustomPage,
  head: () => ({
    meta: [
      { title: "Индивидуальный заказ · MUNIS USMAN" },
      { name: "description", content: "Создаём изделия на заказ. Консультация, эскизы, ручная работа." },
      { property: "og:title", content: "Custom Order · MUNIS USMAN" },
      { property: "og:description", content: "Made especially for you — consultation, sketches, handwork." },
    ],
  }),
});

function CustomPage() {
  const { t } = useI18n();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const canSubmit = form.name.trim().length > 0 && form.message.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    const subject = `Custom order inquiry — ${form.name.slice(0, 60)}`;
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
    window.location.href = mailtoLink(subject, body);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>
        <PageHero kicker={t("custom.kicker")} title={t("custom.title")} subtitle={t("custom.intro")} />

        <section className="bg-cream py-24 lg:py-32">
          <div className="mx-auto max-w-6xl px-6 lg:px-12">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              {[
                [t("custom.step1Title"), t("custom.step1Body")],
                [t("custom.step2Title"), t("custom.step2Body")],
                [t("custom.step3Title"), t("custom.step3Body")],
                [t("custom.step4Title"), t("custom.step4Body")],
              ].map(([title, body], i) => (
                <FadeUp key={title} delay={i * 100}>
                  <div className="border-t border-border pt-8">
                    <h3 className="font-display text-2xl text-foreground">{title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{body}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-burgundy py-24 text-cream lg:py-32">
          <div className="mx-auto max-w-3xl px-6 lg:px-12">
            <FadeUp>
              <h2 className="font-display text-4xl leading-[1.05] lg:text-5xl">{t("custom.formTitle")}</h2>
              <p className="mt-4 text-sm leading-relaxed text-cream/80">{t("custom.formBody")}</p>
            </FadeUp>
            <FadeUp delay={120}>
              <form onSubmit={handleSubmit} className="mt-10 space-y-6">
                <input
                  type="text"
                  required
                  maxLength={100}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={t("custom.formNamePlaceholder")}
                  className="w-full border-b border-cream/30 bg-transparent py-3 text-cream placeholder:text-cream/50 focus:border-gold focus:outline-none"
                />
                <input
                  type="email"
                  maxLength={150}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder={t("custom.formEmailPlaceholder")}
                  className="w-full border-b border-cream/30 bg-transparent py-3 text-cream placeholder:text-cream/50 focus:border-gold focus:outline-none"
                />
                <textarea
                  required
                  maxLength={2000}
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder={t("custom.formMessagePlaceholder")}
                  className="w-full border-b border-cream/30 bg-transparent py-3 text-cream placeholder:text-cream/50 focus:border-gold focus:outline-none"
                />
                <div className="flex flex-wrap items-center gap-6 pt-4">
                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className="group inline-flex items-center gap-3 border border-gold/70 bg-transparent px-8 py-4 text-[11px] uppercase tracking-[0.28em] text-cream transition-all hover:bg-gold hover:text-forest-deep disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {t("custom.formSubmit")}
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </button>
                  <span className="text-xs text-cream/60">{t("custom.formOr")}</span>
                  <a
                    href={BRAND.instagram}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-xs uppercase tracking-[0.28em] text-gold-soft transition-colors hover:text-gold"
                  >
                    Instagram
                  </a>
                </div>
              </form>
            </FadeUp>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
