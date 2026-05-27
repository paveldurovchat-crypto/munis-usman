import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import { useWishlist } from "@/lib/wishlist";
import { supabase } from "@/integrations/supabase/client";
import { formatUzs } from "@/lib/format";
import { pickLocalized, type ProductRow } from "@/lib/site-data";
import { mediaUrl } from "@/lib/media";

export const Route = createFileRoute("/account")({
  component: AccountPage,
  head: () => ({
    meta: [
      { title: "Личный кабинет · MUNIS USMAN" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
});

type Tab = "overview" | "orders" | "wishlist" | "profile";

function AccountPage() {
  const { t } = useI18n();
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("overview");

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-background">
        <SiteNav />
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">{t("common.loading")}</p>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: t("account.tabs.overview") },
    { id: "orders", label: t("account.tabs.orders") },
    { id: "wishlist", label: t("account.tabs.wishlist") },
    { id: "profile", label: t("account.tabs.profile") },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="mx-auto max-w-6xl px-6 pt-32 pb-24 lg:px-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-accent">{t("account.welcome")}</p>
            <h1 className="mt-3 font-display text-4xl text-foreground lg:text-5xl">{t("account.title")}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{user.email}</p>
          </div>
          <button
            onClick={async () => { await signOut(); navigate({ to: "/" }); }}
            className="hidden text-xs uppercase tracking-[0.28em] text-muted-foreground hover:text-accent sm:inline"
          >
            {t("nav.signOut")}
          </button>
        </div>

        <nav className="mt-10 flex gap-1 overflow-x-auto border-b border-border">
          {tabs.map((tb) => (
            <button
              key={tb.id}
              onClick={() => setTab(tb.id)}
              className={`relative whitespace-nowrap px-4 py-3 text-[11px] uppercase tracking-[0.18em] transition-colors ${
                tab === tb.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tb.label}
              {tab === tb.id && <span className="absolute inset-x-0 bottom-0 h-[2px] bg-foreground" />}
            </button>
          ))}
        </nav>

        <div className="mt-10">
          {tab === "overview" && <Overview onJump={setTab} />}
          {tab === "orders" && <OrdersTab />}
          {tab === "wishlist" && <WishlistTab />}
          {tab === "profile" && <ProfileTab />}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function Overview({ onJump }: { onJump: (t: Tab) => void }) {
  const { t } = useI18n();
  const cards: { id: Tab; title: string; body: string }[] = [
    { id: "orders", title: t("account.overview.ordersCard"), body: t("account.overview.ordersBody") },
    { id: "wishlist", title: t("account.overview.wishlistCard"), body: t("account.overview.wishlistBody") },
    { id: "profile", title: t("account.overview.profileCard"), body: t("account.overview.profileBody") },
  ];
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      {cards.map((c) => (
        <button
          key={c.id}
          onClick={() => onJump(c.id)}
          className="border border-border bg-cream/60 p-6 text-left transition-colors hover:border-accent"
        >
          <h3 className="font-display text-2xl text-foreground">{c.title}</h3>
          <p className="mt-3 text-sm text-muted-foreground">{c.body}</p>
        </button>
      ))}
    </div>
  );
}

type OrderRow = {
  id: string;
  created_at: string;
  status: string;
  total_uzs: number;
  order_items: { name_snapshot: string; qty: number; color: string | null }[];
};

function OrdersTab() {
  const { t, lang } = useI18n();
  const { user } = useAuth();
  const [orders, setOrders] = useState<OrderRow[] | null>(null);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase
        .from("orders")
        .select("id, created_at, status, total_uzs, order_items(name_snapshot, qty, color)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      setOrders((data ?? []) as OrderRow[]);
    })();
  }, [user]);

  if (orders === null) return <p className="text-sm text-muted-foreground">{t("common.loading")}</p>;

  if (orders.length === 0) {
    return (
      <div className="border border-border bg-cream/60 p-10 text-center">
        <p className="text-sm text-muted-foreground">{t("account.orders.empty")}</p>
        <Link to="/collection" className="mt-6 inline-block bg-forest-deep px-8 py-3 text-[11px] uppercase tracking-[0.28em] text-cream hover:bg-forest">
          {t("account.orders.emptyCta")}
        </Link>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {orders.map((o) => {
        const date = new Date(o.created_at).toLocaleDateString(lang === "ru" ? "ru-RU" : "en-GB", { year: "numeric", month: "short", day: "numeric" });
        const statusKey = `status.${o.status}` as const;
        const statusLabel = t(statusKey);
        return (
          <li key={o.id} className="border border-border bg-cream/60 p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-accent">{t("account.orders.orderNumber")} · {o.id.slice(0, 8)}</p>
                <p className="mt-2 text-sm text-muted-foreground">{date}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">{t("account.orders.status")}</p>
                <p className="mt-1 text-sm text-foreground">{statusLabel === statusKey ? o.status : statusLabel}</p>
              </div>
            </div>
            <ul className="mt-5 divide-y divide-border border-y border-border">
              {(o.order_items ?? []).map((it, i) => (
                <li key={i} className="flex items-center justify-between py-2 text-sm">
                  <span>{it.name_snapshot}{it.color ? ` · ${it.color}` : ""}</span>
                  <span className="text-muted-foreground">× {it.qty}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.28em] text-muted-foreground">{t("account.orders.total")}</span>
              <span className="font-display text-xl">{formatUzs(o.total_uzs, lang)}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function WishlistTab() {
  const { t, lang } = useI18n();
  const { ids, toggle } = useWishlist();
  const [products, setProducts] = useState<(ProductRow & { cover: string | null })[] | null>(null);

  useEffect(() => {
    const idArr = [...ids];
    if (idArr.length === 0) { setProducts([]); return; }
    (async () => {
      const { data: prods } = await supabase.from("products").select("*").in("id", idArr);
      const { data: imgs } = await supabase.from("product_images").select("product_id, storage_path, sort_order").in("product_id", idArr).order("sort_order");
      const coverMap: Record<string, string> = {};
      (imgs ?? []).forEach((r: { product_id: string; storage_path: string }) => { if (!coverMap[r.product_id]) coverMap[r.product_id] = r.storage_path; });
      setProducts((prods ?? []).map((p) => ({ ...(p as ProductRow), cover: coverMap[(p as ProductRow).id] ?? null })));
    })();
  }, [ids]);

  if (products === null) return <p className="text-sm text-muted-foreground">{t("common.loading")}</p>;
  if (products.length === 0) {
    return (
      <div className="border border-border bg-cream/60 p-10 text-center">
        <p className="text-sm text-muted-foreground">{t("account.wishlist.empty")}</p>
        <Link to="/collection" className="mt-6 inline-block bg-forest-deep px-8 py-3 text-[11px] uppercase tracking-[0.28em] text-cream hover:bg-forest">
          {t("account.wishlist.emptyCta")}
        </Link>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => {
        const name = pickLocalized(p, "name", lang);
        const cover = mediaUrl(p.cover);
        return (
          <div key={p.id}>
            <Link to="/collection/$slug" params={{ slug: p.slug }} className="block">
              <div className="aspect-[3/4] overflow-hidden bg-muted">
                {cover && <img src={cover} alt={name} className="h-full w-full object-cover" />}
              </div>
              <h3 className="mt-3 font-display text-lg text-foreground">{name}</h3>
              <p className="text-sm text-muted-foreground">{formatUzs(p.price_uzs, lang)}</p>
            </Link>
            <button onClick={() => toggle(p.id)} className="mt-2 text-xs uppercase tracking-[0.28em] text-muted-foreground hover:text-destructive">
              {t("cart.remove")}
            </button>
          </div>
        );
      })}
    </div>
  );
}

function ProfileTab() {
  const { t } = useI18n();
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase.from("profiles").select("name, phone, city, address").eq("id", user.id).maybeSingle();
      if (data) {
        setName(data.name ?? ""); setPhone(data.phone ?? ""); setCity(data.city ?? ""); setAddress(data.address ?? "");
      }
    })();
  }, [user]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true); setSaved(false);
    await supabase.from("profiles").upsert({ id: user.id, email: user.email, name, phone, city, address });
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <form onSubmit={onSubmit} className="max-w-xl">
      <h2 className="font-display text-2xl text-foreground">{t("account.profile.title")}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{t("account.profile.subtitle")}</p>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ProfileField label={t("checkout.name")} value={name} onChange={setName} />
        <ProfileField label={t("checkout.phone")} value={phone} onChange={setPhone} />
        <ProfileField label={t("checkout.city")} value={city} onChange={setCity} />
        <ProfileField label={t("checkout.address")} value={address} onChange={setAddress} />
      </div>
      <button type="submit" disabled={saving} className="mt-8 bg-forest-deep px-8 py-4 text-[11px] uppercase tracking-[0.28em] text-cream hover:bg-forest disabled:opacity-60">
        {saving ? t("account.profile.saving") : saved ? t("account.profile.saved") : t("account.profile.save")}
      </button>
    </form>
  );
}

function ProfileField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm focus:border-accent focus:outline-none" />
    </label>
  );
}
