import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import { formatUzs } from "@/lib/format";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
  head: () => ({
    meta: [
      { title: "Оформление заказа · MUNIS USMAN" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
});

function CheckoutPage() {
  const { t, lang } = useI18n();
  const { items, subtotal, clear } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  // Prefill from profile
  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase
        .from("profiles")
        .select("name, phone, city, address")
        .eq("id", user.id)
        .maybeSingle();
      if (data) {
        setName(data.name ?? "");
        setPhone(data.phone ?? "");
        setCity(data.city ?? "");
        setAddress(data.address ?? "");
      }
    })();
  }, [user]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (items.length === 0) return;
    setSubmitting(true);
    try {
      const { data: order, error: orderErr } = await supabase
        .from("orders")
        .insert({
          customer_name: name.trim(),
          phone: phone.trim(),
          city: city.trim() || null,
          address: address.trim() || null,
          notes: notes.trim() || null,
          subtotal_uzs: subtotal,
          total_uzs: subtotal,
          status: "pending",
          user_id: user?.id ?? null,
        })
        .select("id")
        .single();
      if (orderErr) throw orderErr;

      const itemRows = items.map((it) => ({
        order_id: order.id,
        product_id: it.productId,
        name_snapshot: lang === "ru" ? it.name_ru : it.name_en,
        unit_price_uzs: it.price_uzs,
        qty: it.qty,
        color: it.color ?? null,
      }));
      const { error: itemsErr } = await supabase.from("order_items").insert(itemRows);
      if (itemsErr) throw itemsErr;

      // Save updated profile info for signed-in users
      if (user) {
        await supabase
          .from("profiles")
          .update({ name, phone, city, address })
          .eq("id", user.id);
      }

      clear();
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("common.error"));
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <SiteNav />
        <main className="mx-auto max-w-2xl px-6 pt-40 pb-24 text-center lg:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-accent">{t("nav.cart")}</p>
          <h1 className="mt-3 font-display text-4xl text-foreground lg:text-5xl">{t("checkout.success")}</h1>
          <p className="mt-4 text-base text-muted-foreground">{t("checkout.successBody")}</p>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            {user && (
              <button
                onClick={() => navigate({ to: "/account" })}
                className="bg-forest-deep px-8 py-4 text-[11px] uppercase tracking-[0.28em] text-cream hover:bg-forest"
              >
                {t("checkout.viewOrders")}
              </button>
            )}
            <Link to="/" className="border border-forest/30 px-8 py-4 text-[11px] uppercase tracking-[0.28em] hover:border-forest">
              {t("checkout.backHome")}
            </Link>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <SiteNav />
        <main className="mx-auto max-w-2xl px-6 pt-40 pb-24 text-center lg:px-12">
          <h1 className="font-display text-3xl">{t("cart.empty")}</h1>
          <Link to="/collection" className="mt-8 inline-block bg-forest-deep px-8 py-4 text-[11px] uppercase tracking-[0.28em] text-cream hover:bg-forest">
            {t("cart.emptyCta")}
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="mx-auto max-w-6xl px-6 pt-32 pb-24 lg:px-12">
        <p className="text-[10px] uppercase tracking-[0.3em] text-accent">{t("nav.cart")}</p>
        <h1 className="mt-3 font-display text-4xl text-foreground lg:text-5xl">{t("checkout.title")}</h1>
        <p className="mt-3 max-w-xl text-sm text-muted-foreground">{t("checkout.subtitle")}</p>

        <form onSubmit={onSubmit} className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-10 lg:col-span-7">
            <section>
              <h2 className="font-display text-xl text-foreground">{t("checkout.contactTitle")}</h2>
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label={t("checkout.name")} value={name} onChange={setName} required minLength={2} maxLength={120} />
                <Field label={t("checkout.phone")} value={phone} onChange={setPhone} required minLength={6} maxLength={32} type="tel" />
              </div>
            </section>

            <section>
              <h2 className="font-display text-xl text-foreground">{t("checkout.shippingTitle")}</h2>
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label={t("checkout.city")} value={city} onChange={setCity} />
                <Field label={t("checkout.address")} value={address} onChange={setAddress} />
              </div>
            </section>

            <section>
              <h2 className="font-display text-xl text-foreground">{t("checkout.notesTitle")}</h2>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t("checkout.notesPlaceholder")}
                rows={4}
                maxLength={1000}
                className="mt-3 w-full border border-border bg-background px-4 py-3 text-sm focus:border-accent focus:outline-none"
              />
            </section>

            {error && (
              <div className="border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>
            )}
          </div>

          <aside className="lg:col-span-5">
            <div className="border border-border bg-cream/60 p-6">
              <h2 className="font-display text-2xl">{t("checkout.summary")}</h2>
              <ul className="mt-6 divide-y divide-border border-y border-border">
                {items.map((it) => {
                  const itName = lang === "ru" ? it.name_ru : it.name_en;
                  return (
                    <li key={`${it.productId}-${it.color ?? ""}`} className="flex items-center justify-between gap-4 py-3 text-sm">
                      <div>
                        <p className="text-foreground">{itName}</p>
                        <p className="text-xs text-muted-foreground">× {it.qty}{it.color ? ` · ${it.color}` : ""}</p>
                      </div>
                      <span className="font-display">{formatUzs(it.price_uzs * it.qty, lang)}</span>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t("cart.subtotal")}</span>
                <span className="font-display text-xl">{formatUzs(subtotal, lang)}</span>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="mt-8 w-full bg-forest-deep px-8 py-4 text-[11px] uppercase tracking-[0.28em] text-cream hover:bg-forest disabled:opacity-60"
              >
                {submitting ? t("checkout.placing") : t("checkout.place")}
              </button>
            </div>
          </aside>
        </form>
      </main>
      <SiteFooter />
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
  type = "text",
  minLength,
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
  minLength?: number;
  maxLength?: number;
}) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm focus:border-accent focus:outline-none"
      />
    </label>
  );
}
