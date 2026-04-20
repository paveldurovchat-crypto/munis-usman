import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { FadeUp } from "@/components/FadeUp";
import { useI18n } from "@/lib/i18n";
import { BRAND, mailtoLink } from "@/lib/brand";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Контакты · MUNIS USMAN" },
      { name: "description", content: "Ташкент, Узбекистан. info@munisusman.com · Instagram @munisusman" },
      { property: "og:title", content: "Contact · MUNIS USMAN" },
      { property: "og:description", content: "Tashkent, Uzbekistan. Let's talk." },
    ],
  }),
});

function ContactPage() {
  const { t } = useI18n();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const canSubmit = form.name.trim().length > 0 && form.message.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    const subject = `Website inquiry — ${form.name.slice(0, 60)}`;
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
    window.location.href = mailtoLink(subject, body);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>
        <PageHero kicker={t("contact.kicker")} title={t("contact.title")} subtitle={t("contact.subtitle")} />

        <section className="bg-cream py-24 lg:py-32">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 px-6 lg:grid-cols-2 lg:gap-24 lg:px-12">
            <FadeUp>
              <dl className="space-y-10">
                <div>
                  <dt className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    {t("contact.locationLabel")}
                  </dt>
                  <dd className="mt-3 font-display text-2xl text-foreground">{t("contact.locationValue")}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    {t("contact.emailLabel")}
                  </dt>
                  <dd className="mt-3 space-y-1 font-display text-xl text-foreground">
                    <a href={`mailto:${BRAND.emailPrimary}`} className="block hover:text-accent">
                      {BRAND.emailPrimary}
                    </a>
                    <a href={`mailto:${BRAND.emailSecondary}`} className="block hover:text-accent">
                      {BRAND.emailSecondary}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    {t("contact.instagramLabel")}
                  </dt>
                  <dd className="mt-3 font-display text-xl text-foreground">
                    <a href={BRAND.instagram} target="_blank" rel="noreferrer noopener" className="hover:text-accent">
                      {BRAND.instagramHandle}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    {t("contact.hoursLabel")}
                  </dt>
                  <dd className="mt-3 font-display text-xl text-foreground">{t("contact.hoursValue")}</dd>
                </div>
              </dl>
            </FadeUp>

            <FadeUp delay={150}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="font-display text-3xl text-foreground">{t("contact.formTitle")}</h2>
                <input
                  type="text"
                  required
                  maxLength={100}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={t("contact.formNamePlaceholder")}
                  className="w-full border-b border-border bg-transparent py-3 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
                />
                <input
                  type="email"
                  maxLength={150}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder={t("contact.formEmailPlaceholder")}
                  className="w-full border-b border-border bg-transparent py-3 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
                />
                <textarea
                  required
                  maxLength={2000}
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder={t("contact.formMessagePlaceholder")}
                  className="w-full border-b border-border bg-transparent py-3 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="group inline-flex items-center gap-3 border border-forest/60 bg-forest px-8 py-4 text-[11px] uppercase tracking-[0.28em] text-cream transition-all hover:bg-forest-deep disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {t("contact.formSubmit")}
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </button>
              </form>
            </FadeUp>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
