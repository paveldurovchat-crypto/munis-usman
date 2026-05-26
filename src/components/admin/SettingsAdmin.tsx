import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type Setting = { key: string; value: Record<string, unknown> | string | null };

const DEFAULT_KEYS = ["contact_email", "contact_phone", "instagram_url", "homepage_kicker"];

export function SettingsAdmin() {
  const qc = useQueryClient();
  const { data: settings } = useQuery({
    queryKey: ["admin", "settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("*");
      if (error) throw error;
      return data as Setting[];
    },
  });

  const [draft, setDraft] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!settings) return;
    const init: Record<string, string> = {};
    DEFAULT_KEYS.forEach((k) => {
      const found = settings.find((s) => s.key === k);
      init[k] = typeof found?.value === "string" ? found.value : (found?.value ? JSON.stringify(found.value) : "");
    });
    setDraft(init);
  }, [settings]);

  const save = useMutation({
    mutationFn: async () => {
      const rows = DEFAULT_KEYS.map((k) => ({ key: k, value: draft[k] ?? "" }));
      const { error } = await supabase.from("site_settings").upsert(rows);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "settings"] }),
  });

  return (
    <div>
      <h2 className="mb-6 font-display text-2xl">Site settings</h2>
      <div className="max-w-xl space-y-4">
        {DEFAULT_KEYS.map((k) => (
          <div key={k}>
            <label className="mb-1 block text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{k.replace(/_/g, " ")}</label>
            <input className="w-full border border-border bg-background px-3 py-2 text-sm" value={draft[k] ?? ""} onChange={(e) => setDraft({ ...draft, [k]: e.target.value })} />
          </div>
        ))}
      </div>
      <button onClick={() => save.mutate()} disabled={save.isPending} className="mt-6 bg-forest-deep px-6 py-3 text-[11px] uppercase tracking-[0.28em] text-cream hover:bg-forest disabled:opacity-50">{save.isPending ? "Saving…" : "Save settings"}</button>
    </div>
  );
}
