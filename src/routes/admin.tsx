import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { checkIsAdmin } from "@/lib/auth.functions";
import { useAuth } from "@/hooks/use-auth";

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

function AdminPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const checkAdmin = useServerFn(checkIsAdmin);
  const [state, setState] = useState<AdminState>("checking");

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setState("no-session");
      navigate({ to: "/login" });
      return;
    }
    checkAdmin()
      .then((res) => setState(res.isAdmin ? "ok" : "not-admin"))
      .catch(() => setState("not-admin"));
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
          <p className="mt-3 text-sm text-muted-foreground">
            Signed in as {user?.email}. This account does not have admin access.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={signOut}
            className="border border-forest/30 px-6 py-3 text-[11px] uppercase tracking-[0.28em] hover:border-forest"
          >
            Sign out
          </button>
          <Link to="/" className="bg-forest-deep px-6 py-3 text-[11px] uppercase tracking-[0.28em] text-cream hover:bg-forest">
            Back to site
          </Link>
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
            <Link to="/" className="text-xs uppercase tracking-[0.28em] text-muted-foreground hover:text-accent">
              Site
            </Link>
            <button onClick={signOut} className="text-xs uppercase tracking-[0.28em] text-muted-foreground hover:text-accent">
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <PanelCard title="Products" description="Catalogue, prices, photos, colors, specs." status="Coming in next deploy" />
          <PanelCard title="Journal" description="Editorial posts in RU and EN with markdown." status="Coming in next deploy" />
          <PanelCard title="Media" description="Hero video, about photos, brand assets." status="Coming in next deploy" />
          <PanelCard title="Orders" description="Incoming orders, status, customer details." status="Coming in next deploy" />
          <PanelCard title="Site settings" description="Homepage copy, contact info, social links." status="Coming in next deploy" />
          <PanelCard title="Payments" description="Click & Payme sandbox configuration." status="Coming in next deploy" />
        </div>

        <div className="mt-12 border border-border bg-background p-6">
          <p className="text-[10px] uppercase tracking-[0.28em] text-accent">Phase 1 complete</p>
          <h2 className="mt-2 font-display text-2xl text-foreground">Backend foundation is live</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Database, admin authentication, role gates and the storage bucket are ready. The catalogue has been
            seeded with the current 14 products (prices in UZS). The full content management tabs and cart /
            checkout flow ship in the next deploys.
          </p>
        </div>
      </main>
    </div>
  );
}

function PanelCard({ title, description, status }: { title: string; description: string; status: string }) {
  return (
    <div className="border border-border bg-background p-6">
      <h3 className="font-display text-xl text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      <p className="mt-4 text-[10px] uppercase tracking-[0.28em] text-accent">{status}</p>
    </div>
  );
}
