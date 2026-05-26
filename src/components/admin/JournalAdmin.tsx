import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { mediaUrl } from "@/lib/media";
import type { JournalPostRow } from "@/lib/site-data";

type Draft = Partial<JournalPostRow> & { id?: string };

export function JournalAdmin() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Draft | null>(null);

  const { data: posts } = useQuery({
    queryKey: ["admin", "journal"],
    queryFn: async () => {
      const { data, error } = await supabase.from("journal_posts").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as JournalPostRow[];
    },
  });

  const save = useMutation({
    mutationFn: async (d: Draft) => {
      const payload = {
        slug: d.slug!,
        title_ru: d.title_ru!,
        title_en: d.title_en ?? d.title_ru!,
        excerpt_ru: d.excerpt_ru ?? null,
        excerpt_en: d.excerpt_en ?? null,
        body_md_ru: d.body_md_ru ?? null,
        body_md_en: d.body_md_en ?? null,
        cover_path: d.cover_path ?? null,
        is_published: d.is_published ?? false,
        published_at: d.is_published ? (d.published_at ?? new Date().toISOString()) : null,
      };
      if (d.id) {
        const { error } = await supabase.from("journal_posts").update(payload).eq("id", d.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("journal_posts").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "journal"] });
      qc.invalidateQueries({ queryKey: ["journal"] });
      setEditing(null);
    },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("journal_posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "journal"] }),
  });

  if (editing) return <PostForm draft={editing} onCancel={() => setEditing(null)} onSave={(d) => save.mutate(d)} saving={save.isPending} />;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-2xl">Journal ({posts?.length ?? 0})</h2>
        <button onClick={() => setEditing({ is_published: false })} className="bg-forest-deep px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-cream hover:bg-forest">+ New post</button>
      </div>
      <div className="space-y-3">
        {posts?.length === 0 && <p className="text-sm text-muted-foreground">No posts yet.</p>}
        {posts?.map((p) => (
          <div key={p.id} className="flex items-center justify-between border border-border bg-background p-4">
            <div>
              <p className="font-display text-lg">{p.title_ru}</p>
              <p className="text-xs text-muted-foreground">{p.slug} · {p.is_published ? "Published" : "Draft"}</p>
            </div>
            <div className="flex gap-3 text-sm">
              <button onClick={() => setEditing(p)} className="text-accent hover:underline">Edit</button>
              <button onClick={() => { if (confirm("Delete post?")) remove.mutate(p.id); }} className="text-red-600 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PostForm({ draft, onCancel, onSave, saving }: { draft: Draft; onCancel: () => void; onSave: (d: Draft) => void; saving: boolean }) {
  const [d, setD] = useState<Draft>(draft);
  const update = (patch: Partial<Draft>) => setD({ ...d, ...patch });

  const onUploadCover = async (file: File) => {
    const path = `journal/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    const { error } = await supabase.storage.from("media").upload(path, file, { upsert: false });
    if (error) { alert(error.message); return; }
    update({ cover_path: path });
  };

  return (
    <div>
      <button onClick={onCancel} className="mb-6 text-xs uppercase tracking-[0.28em] text-muted-foreground hover:text-accent">← Back</button>
      <h2 className="mb-6 font-display text-2xl">{draft.id ? "Edit post" : "New post"}</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Title (RU)"><input className={inputCls} value={d.title_ru ?? ""} onChange={(e) => update({ title_ru: e.target.value })} /></Field>
        <Field label="Title (EN)"><input className={inputCls} value={d.title_en ?? ""} onChange={(e) => update({ title_en: e.target.value })} /></Field>
        <Field label="Slug"><input className={inputCls} value={d.slug ?? ""} onChange={(e) => update({ slug: e.target.value })} /></Field>
        <Field label="Published">
          <label className="flex items-center gap-2 pt-2"><input type="checkbox" checked={d.is_published ?? false} onChange={(e) => update({ is_published: e.target.checked })} /><span className="text-sm">Visible on /journal</span></label>
        </Field>
        <Field label="Excerpt (RU)" full><textarea rows={2} className={inputCls} value={d.excerpt_ru ?? ""} onChange={(e) => update({ excerpt_ru: e.target.value })} /></Field>
        <Field label="Excerpt (EN)" full><textarea rows={2} className={inputCls} value={d.excerpt_en ?? ""} onChange={(e) => update({ excerpt_en: e.target.value })} /></Field>
        <Field label="Body markdown (RU)" full><textarea rows={8} className={inputCls + " font-mono"} value={d.body_md_ru ?? ""} onChange={(e) => update({ body_md_ru: e.target.value })} /></Field>
        <Field label="Body markdown (EN)" full><textarea rows={8} className={inputCls + " font-mono"} value={d.body_md_en ?? ""} onChange={(e) => update({ body_md_en: e.target.value })} /></Field>
        <Field label="Cover image" full>
          {d.cover_path && <img src={mediaUrl(d.cover_path) ?? ""} alt="" className="mb-2 h-48 w-auto object-cover" />}
          <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) onUploadCover(f); }} />
        </Field>
      </div>
      <div className="mt-8 flex gap-3">
        <button onClick={() => onSave(d)} disabled={saving || !d.slug || !d.title_ru} className="bg-forest-deep px-6 py-3 text-[11px] uppercase tracking-[0.28em] text-cream hover:bg-forest disabled:opacity-50">{saving ? "Saving…" : "Save"}</button>
        <button onClick={onCancel} className="border border-border px-6 py-3 text-[11px] uppercase tracking-[0.28em]">Cancel</button>
      </div>
    </div>
  );
}

const inputCls = "w-full border border-border bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none";
function Field({ label, full, children }: { label: string; full?: boolean; children: React.ReactNode }) {
  return (<div className={full ? "md:col-span-2" : ""}><label className="mb-1 block text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{label}</label>{children}</div>);
}

// avoid unused import lint
void useEffect;
