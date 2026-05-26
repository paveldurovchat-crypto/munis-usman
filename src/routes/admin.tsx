import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { checkIsAdmin } from "@/lib/auth.functions";
import { useAuth } from "@/hooks/use-auth";
import { ProductsAdmin } from "@/components/admin/ProductsAdmin";
import { JournalAdmin } from "@/components/admin/JournalAdmin";
import { MediaAdmin } from "@/components/admin/MediaAdmin";
import { OrdersAdmin } from "@/components/admin/OrdersAdmin";
import { SettingsAdmin } from "@/components/admin/SettingsAdmin";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({
    meta: [
      { title: "Admin · MUNIS USMAN" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
});

type AdminState = "checking" | "no-session" | "not-admin" | "ok";
type Tab = "products" | "journal" | "media" | "orders" | "settings";

const TABS: { id: Tab; label: string }[] = [
  { id: "products", label: "Products" },
  { id: "journal", label: "Journal" },
  { id: "media", label: "Media" },
  { id: "orders", label: "Orders" },
  { id: "settings", label: "Settings" },
];

function AdminPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const checkAdmin = useServerFn(checkIsAdmin);
  const [state, setState] = useState<AdminState>("checking");
  const [tab, setTab] = useState<Tab>("products");

  useEffect(() => {
    if (authLoading) return;
    if (!user) { setState("no-session"); navigate({ to: "/login" }); return; }
    checkAdmin().then((res) => setState(res.isAdmin ? "ok" : "not-admin")).catch(() => setState("not-admin"));
  }, [user, authLoading, checkAdmin, navigate]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  };

  if (state === "checking" || authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (state === "not-admin") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6 text-center">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-accent">403</p>
          <h1 className="mt-3 font-display text-4xl text-foreground">Not an admin</h1>
          <p className="mt-3 text-sm text-muted-foreground">Signed in as {user?.email}. This account does not have admin access.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button onClick={signOut} className="border border-forest/30 px-6 py-3 text-[11px] uppercase tracking-[0.28em] hover:border-forest">Sign out</button>
          <Link to="/" className="bg-forest-deep px-6 py-3 text-[11px] uppercase tracking-[0.28em] text-cream hover:bg-forest">Back to site</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream text-foreground">
      <header className="border-b border-border/60 bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-accent">Admin</p>
            <h1 className="mt-1 font-display text-2xl text-foreground">MUNIS USMAN</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-xs text-muted-foreground sm:inline">{user?.email}</span>
            <Link to="/" className="text-xs uppercase tracking-[0.28em] text-muted-foreground hover:text-accent">Site</Link>
            <button onClick={signOut} className="text-xs uppercase tracking-[0.28em] text-muted-foreground hover:text-accent">Sign out</button>
          </div>
        </div>
        <nav className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-6 lg:px-12">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`relative whitespace-nowrap py-3 px-4 text-[11px] uppercase tracking-[0.18em] transition-colors ${
                tab === t.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
              {tab === t.id && <span className="absolute inset-x-0 bottom-0 h-[2px] bg-foreground" />}
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-12">
        {tab === "products" && <ProductsAdmin />}
        {tab === "journal" && <JournalAdmin />}
        {tab === "media" && <MediaAdmin />}
        {tab === "orders" && <OrdersAdmin />}
        {tab === "settings" && <SettingsAdmin />}
      </main>
    </div>
  );
}
