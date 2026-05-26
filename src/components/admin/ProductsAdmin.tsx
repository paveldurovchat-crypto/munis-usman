import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { mediaUrl } from "@/lib/media";
import { formatUzs } from "@/lib/format";
import type { ProductRow } from "@/lib/site-data";

type Draft = Partial<ProductRow> & { id?: string };

const CATEGORIES = ["accessories", "cloth", "home", "couture"];
const TAGS = ["limited", "madeToOrder"];

export function ProductsAdmin() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Draft | null>(null);

  const { data: products, isLoading } = useQuery({
    queryKey: ["admin", "products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as ProductRow[];
    },
  });

  const save = useMutation({
    mutationFn: async (draft: Draft) => {
      const payload = {
        slug: draft.slug!,
        name_ru: draft.name_ru!,
        name_en: draft.name_en ?? draft.name_ru!,
        desc_ru: draft.desc_ru ?? null,
        desc_en: draft.desc_en ?? null,
        category: draft.category ?? "accessories",
        tag: draft.tag ?? "limited",
        price_uzs: draft.price_uzs ?? 0,
        is_active: draft.is_active ?? true,
        sort_order: draft.sort_order ?? 0,
      };
      if (draft.id) {
        const { error } = await supabase.from("products").update(payload).eq("id", draft.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("products").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "products"] });
      qc.invalidateQueries({ queryKey: ["products"] });
      setEditing(null);
    },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "products"] }),
  });

  if (editing) {
    return <ProductForm draft={editing} onCancel={() => setEditing(null)} onSave={(d) => save.mutate(d)} saving={save.isPending} />;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-2xl">Products ({products?.length ?? 0})</h2>
        <button
          onClick={() => setEditing({ is_active: true, sort_order: (products?.length ?? 0) + 1 })}
          className="bg-forest-deep px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-cream hover:bg-forest"
        >
          + New product
        </button>
      </div>
      {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
      <div className="overflow-x-auto border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            <tr>
              <th className="px-3 py-2 text-left">Order</th>
              <th className="px-3 py-2 text-left">Name</th>
              <th className="px-3 py-2 text-left">Slug</th>
              <th className="px-3 py-2 text-left">Category</th>
              <th className="px-3 py-2 text-right">Price</th>
              <th className="px-3 py-2 text-left">Active</th>
              <th className="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {products?.map((p) => (
              <tr key={p.id} className="border-t border-border">
                <td className="px-3 py-2">{p.sort_order}</td>
                <td className="px-3 py-2">{p.name_ru}</td>
                <td className="px-3 py-2 text-muted-foreground">{p.slug}</td>
                <td className="px-3 py-2">{p.category}</td>
                <td className="px-3 py-2 text-right">{formatUzs(p.price_uzs)}</td>
                <td className="px-3 py-2">{p.is_active ? "✓" : "—"}</td>
                <td className="px-3 py-2 text-right">
                  <button onClick={() => setEditing(p)} className="mr-3 text-accent hover:underline">Edit</button>
                  <button
                    onClick={() => { if (confirm(`Delete ${p.name_ru}?`)) remove.mutate(p.id); }}
                    className="text-red-600 hover:underline"
                  >Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProductForm({ draft, onCancel, onSave, saving }: {
  draft: Draft; onCancel: () => void; onSave: (d: Draft) => void; saving: boolean;
}) {
  const [d, setD] = useState<Draft>(draft);
  const update = (patch: Partial<Draft>) => setD({ ...d, ...patch });

  const [images, setImages] = useState<{ id: string; storage_path: string }[]>([]);
  const productId = draft.id;

  useState(() => {
    if (productId) {
      supabase.from("product_images").select("*").eq("product_id", productId).order("sort_order")
        .then(({ data }) => setImages((data ?? []) as { id: string; storage_path: string }[]));
    }
    return 0;
  });

  const onUpload = async (file: File) => {
    if (!productId) { alert("Save the product first to attach images."); return; }
    const path = `products/${productId}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    const { error } = await supabase.storage.from("media").upload(path, file, { upsert: false });
    if (error) { alert(error.message); return; }
    const { data: inserted, error: e2 } = await supabase
      .from("product_images")
      .insert({ product_id: productId, storage_path: path, sort_order: images.length })
      .select()
      .single();
    if (e2) { alert(e2.message); return; }
    setImages([...images, inserted as { id: string; storage_path: string }]);
  };

  const removeImage = async (id: string, path: string) => {
    await supabase.storage.from("media").remove([path]);
    await supabase.from("product_images").delete().eq("id", id);
    setImages(images.filter((i) => i.id !== id));
  };

  return (
    <div>
      <button onClick={onCancel} className="mb-6 text-xs uppercase tracking-[0.28em] text-muted-foreground hover:text-accent">← Back</button>
      <h2 className="font-display text-2xl mb-6">{draft.id ? "Edit product" : "New product"}</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Name (RU)"><input className={inputCls} value={d.name_ru ?? ""} onChange={(e) => update({ name_ru: e.target.value })} /></Field>
        <Field label="Name (EN)"><input className={inputCls} value={d.name_en ?? ""} onChange={(e) => update({ name_en: e.target.value })} /></Field>
        <Field label="Slug"><input className={inputCls} value={d.slug ?? ""} onChange={(e) => update({ slug: e.target.value })} placeholder="e.g. case-bukhara" /></Field>
        <Field label="Price (UZS)"><input type="number" className={inputCls} value={d.price_uzs ?? 0} onChange={(e) => update({ price_uzs: Number(e.target.value) })} /></Field>
        <Field label="Category">
          <select className={inputCls} value={d.category ?? "accessories"} onChange={(e) => update({ category: e.target.value })}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Tag">
          <select className={inputCls} value={d.tag ?? "limited"} onChange={(e) => update({ tag: e.target.value })}>
            {TAGS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </Field>
        <Field label="Sort order"><input type="number" className={inputCls} value={d.sort_order ?? 0} onChange={(e) => update({ sort_order: Number(e.target.value) })} /></Field>
        <Field label="Active">
          <label className="flex items-center gap-2 pt-2"><input type="checkbox" checked={d.is_active ?? true} onChange={(e) => update({ is_active: e.target.checked })} /><span className="text-sm">Visible on site</span></label>
        </Field>
        <Field label="Description (RU)" full><textarea rows={3} className={inputCls} value={d.desc_ru ?? ""} onChange={(e) => update({ desc_ru: e.target.value })} /></Field>
        <Field label="Description (EN)" full><textarea rows={3} className={inputCls} value={d.desc_en ?? ""} onChange={(e) => update({ desc_en: e.target.value })} /></Field>
      </div>

      {productId && (
        <div className="mt-8 border-t border-border pt-6">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em]">Images</h3>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {images.map((img) => (
              <div key={img.id} className="relative aspect-square overflow-hidden bg-muted">
                <img src={mediaUrl(img.storage_path) ?? ""} className="h-full w-full object-cover" alt="" />
                <button onClick={() => removeImage(img.id, img.storage_path)} className="absolute right-1 top-1 bg-black/70 px-2 py-1 text-[10px] text-white">×</button>
              </div>
            ))}
          </div>
          <input type="file" accept="image/*" className="mt-3 text-sm" onChange={(e) => { const f = e.target.files?.[0]; if (f) onUpload(f); }} />
        </div>
      )}

      <div className="mt-8 flex gap-3">
        <button onClick={() => onSave(d)} disabled={saving || !d.slug || !d.name_ru} className="bg-forest-deep px-6 py-3 text-[11px] uppercase tracking-[0.28em] text-cream hover:bg-forest disabled:opacity-50">{saving ? "Saving…" : "Save"}</button>
        <button onClick={onCancel} className="border border-border px-6 py-3 text-[11px] uppercase tracking-[0.28em]">Cancel</button>
      </div>
    </div>
  );
}

const inputCls = "w-full border border-border bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none";

function Field({ label, full, children }: { label: string; full?: boolean; children: React.ReactNode }) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <label className="mb-1 block text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{label}</label>
      {children}
    </div>
  );
}
