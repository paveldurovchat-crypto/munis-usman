import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { mediaUrl, youtubeId, youtubeThumb, youtubeEmbed } from "@/lib/media";
import { MEDIA_SLOTS } from "@/lib/media-slots";

type Asset = { id: string; storage_path: string; label: string | null; kind: string; used_for: string | null };

export function MediaAdmin() {
  const qc = useQueryClient();
  const [label, setLabel] = useState("");
  const [usedFor, setUsedFor] = useState("");
  const [ytLabel, setYtLabel] = useState("");
  const [ytUsedFor, setYtUsedFor] = useState("");
  const [ytUrl, setYtUrl] = useState("");
  const [saving, setSaving] = useState(false);

  const { data: assets } = useQuery({
    queryKey: ["admin", "media"],
    queryFn: async () => {
      const { data, error } = await supabase.from("media_assets").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as Asset[];
    },
  });

  const onUpload = async (file: File) => {
    const path = `assets/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    const { error } = await supabase.storage.from("media").upload(path, file);
    if (error) { alert(error.message); return; }
    const kind = file.type.startsWith("video") ? "video" : "image";
    const { error: e2 } = await supabase.from("media_assets").insert({
      storage_path: path, kind, label: label || null, used_for: usedFor || null,
    });
    if (e2) { alert(e2.message); return; }
    setLabel(""); setUsedFor("");
    qc.invalidateQueries({ queryKey: ["admin", "media"] });
  };

  const addYoutube = async () => {
    const id = youtubeId(ytUrl);
    if (!id) { alert("Please paste a valid YouTube URL"); return; }
    setSaving(true);
    const { error } = await supabase.from("media_assets").insert({
      storage_path: ytUrl.trim(), kind: "youtube", label: ytLabel || null, used_for: ytUsedFor || null,
    });
    setSaving(false);
    if (error) { alert(error.message); return; }
    setYtUrl(""); setYtLabel(""); setYtUsedFor("");
    qc.invalidateQueries({ queryKey: ["admin", "media"] });
  };

  const remove = async (a: Asset) => {
    if (!confirm("Delete asset?")) return;
    if (a.kind !== "youtube") {
      await supabase.storage.from("media").remove([a.storage_path]);
    }
    await supabase.from("media_assets").delete().eq("id", a.id);
    qc.invalidateQueries({ queryKey: ["admin", "media"] });
  };

  return (
    <div>
      <h2 className="mb-2 font-display text-2xl">Media library</h2>
      <p className="mb-6 text-xs text-muted-foreground">
        To place a file on the homepage, set <span className="font-mono">Used for</span> to one of:&nbsp;
        <span className="font-mono">{MEDIA_SLOTS.join(", ")}</span>. The hero accepts image, video, or YouTube (Shorts work too).
      </p>

      <datalist id="media-slots">
        {MEDIA_SLOTS.map((s) => <option key={s} value={s} />)}
      </datalist>

      <div className="mb-6 border border-border bg-background p-4">
        <p className="mb-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Upload new asset</p>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <input placeholder="Label (optional)" className="border border-border bg-background px-3 py-2 text-sm" value={label} onChange={(e) => setLabel(e.target.value)} />
          <input placeholder="Used for, e.g. hero-video, about-photo (optional)" className="border border-border bg-background px-3 py-2 text-sm" value={usedFor} onChange={(e) => setUsedFor(e.target.value)} />
          <input type="file" accept="image/*,video/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) onUpload(f); }} className="text-sm" />
        </div>
      </div>

      <div className="mb-6 border border-border bg-background p-4">
        <p className="mb-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Add YouTube video</p>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
          <input placeholder="YouTube URL" className="border border-border bg-background px-3 py-2 text-sm md:col-span-2" value={ytUrl} onChange={(e) => setYtUrl(e.target.value)} />
          <input placeholder="Label (optional)" className="border border-border bg-background px-3 py-2 text-sm" value={ytLabel} onChange={(e) => setYtLabel(e.target.value)} />
          <input placeholder="Used for (optional)" className="border border-border bg-background px-3 py-2 text-sm" value={ytUsedFor} onChange={(e) => setYtUsedFor(e.target.value)} />
        </div>
        <button
          onClick={addYoutube}
          disabled={saving || !ytUrl}
          className="mt-3 bg-forest-deep px-5 py-2 text-[11px] uppercase tracking-[0.28em] text-cream disabled:opacity-50"
        >
          {saving ? "Adding…" : "Add video"}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {assets?.map((a) => (
          <div key={a.id} className="border border-border bg-background p-2">
            <div className="aspect-square overflow-hidden bg-muted">
              {a.kind === "youtube" ? (
                <a href={a.storage_path} target="_blank" rel="noreferrer" className="block h-full w-full">
                  <img src={youtubeThumb(a.storage_path) ?? ""} alt={a.label ?? "YouTube video"} className="h-full w-full object-cover" />
                </a>
              ) : a.kind === "video" ? (
                <video src={mediaUrl(a.storage_path) ?? ""} className="h-full w-full object-cover" muted />
              ) : (
                <img src={mediaUrl(a.storage_path) ?? ""} alt={a.label ?? ""} className="h-full w-full object-cover" />
              )}
            </div>
            <p className="mt-2 truncate text-xs">
              {a.kind === "youtube" ? "▶ " : ""}{a.label ?? (a.kind === "youtube" ? a.storage_path : a.storage_path.split("/").pop())}
            </p>
            {a.used_for && <p className="text-[10px] text-accent">{a.used_for}</p>}
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => {
                  const url = a.kind === "youtube" ? (youtubeEmbed(a.storage_path) ?? a.storage_path) : (mediaUrl(a.storage_path) ?? "");
                  navigator.clipboard.writeText(url);
                }}
                className="text-[10px] text-accent hover:underline"
              >
                Copy URL
              </button>
              <button onClick={() => remove(a)} className="text-[10px] text-red-600 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
