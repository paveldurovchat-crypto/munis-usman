import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Вход · MUNIS USMAN" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
});

function LoginPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "signin") {
        const { error: err } = await supabase.auth.signInWithPassword({ email, password });
        if (err) throw err;
      } else {
        const { error: err } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/` },
        });
        if (err) throw err;
      }
      navigate({ to: "/account" });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t("common.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="flex min-h-[calc(100vh-200px)] items-center justify-center px-6 pt-32 pb-16">
        <div className="w-full max-w-md">
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-accent">MUNIS USMAN</p>
            <h1 className="mt-3 font-display text-4xl text-foreground">
              {mode === "signin" ? t("auth.signInTitle") : t("auth.signUpTitle")}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {mode === "signin" ? t("auth.signInSubtitle") : t("auth.signUpSubtitle")}
            </p>
          </div>

          <form onSubmit={onSubmit} className="mt-10 space-y-4">
            <div>
              <label htmlFor="email" className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">{t("auth.email")}</label>
              <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none" autoComplete="email" />
            </div>
            <div>
              <label htmlFor="password" className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">{t("auth.password")}</label>
              <input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none"
                autoComplete={mode === "signin" ? "current-password" : "new-password"} />
            </div>

            {error && <div className="border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>}

            <button type="submit" disabled={loading}
              className="group inline-flex w-full items-center justify-center gap-3 bg-forest-deep px-8 py-4 text-[11px] uppercase tracking-[0.28em] text-cream transition-all hover:bg-forest disabled:opacity-60">
              {loading ? t("auth.waiting") : mode === "signin" ? t("auth.submitSignIn") : t("auth.submitSignUp")}
            </button>

            <button type="button" onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="block w-full text-center text-xs uppercase tracking-[0.28em] text-muted-foreground hover:text-accent">
              {mode === "signin" ? t("auth.switchToSignUp") : t("auth.switchToSignIn")}
            </button>

            <Link to="/" className="block text-center text-[10px] uppercase tracking-[0.28em] text-muted-foreground hover:text-accent">
              ← {t("auth.backToSite")}
            </Link>
          </form>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
