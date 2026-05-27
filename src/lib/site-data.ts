import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type ProductRow = {
  id: string;
  slug: string;
  name_ru: string;
  name_en: string;
  desc_ru: string | null;
  desc_en: string | null;
  price_uzs: number;
  category: string;
  tag: string;
  is_active: boolean;
  sort_order: number;
};

export type ProductColorRow = { id: string; name: string; hex: string; sort_order: number };
export type ProductSpecRow = { id: string; label: string; value: string; sort_order: number };
export type ProductImageRow = { id: string; storage_path: string; alt: string | null; sort_order: number };

export type ProductFull = ProductRow & {
  colors: ProductColorRow[];
  specs: ProductSpecRow[];
  images: ProductImageRow[];
};

export type JournalPostRow = {
  id: string;
  slug: string;
  title_ru: string;
  title_en: string;
  excerpt_ru: string | null;
  excerpt_en: string | null;
  body_md_ru: string | null;
  body_md_en: string | null;
  cover_path: string | null;
  youtube_url: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
};


export type OrderRow = {
  id: string;
  customer_name: string;
  phone: string;
  city: string | null;
  address: string | null;
  total_uzs: number;
  status: string;
  created_at: string;
};

export function useProducts(category?: string) {
  return useQuery({
    queryKey: ["products", category ?? "all"],
    queryFn: async () => {
      let q = supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });
      if (category) q = q.eq("category", category);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as ProductRow[];
    },
  });
}

export function useProductBySlug(slug: string) {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: async () => {
      const { data: product, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw error;
      if (!product) return null;
      const [colorsRes, specsRes, imagesRes] = await Promise.all([
        supabase.from("product_colors").select("*").eq("product_id", product.id).order("sort_order"),
        supabase.from("product_specs").select("*").eq("product_id", product.id).order("sort_order"),
        supabase.from("product_images").select("*").eq("product_id", product.id).order("sort_order"),
      ]);
      return {
        ...(product as ProductRow),
        colors: (colorsRes.data ?? []) as ProductColorRow[],
        specs: (specsRes.data ?? []) as ProductSpecRow[],
        images: (imagesRes.data ?? []) as ProductImageRow[],
      } as ProductFull;
    },
  });
}

export function useJournalPosts(publishedOnly = true) {
  return useQuery({
    queryKey: ["journal", publishedOnly],
    queryFn: async () => {
      let q = supabase.from("journal_posts").select("*").order("created_at", { ascending: false });
      if (publishedOnly) q = q.eq("is_published", true);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as JournalPostRow[];
    },
  });
}

export function useJournalPostBySlug(slug: string) {
  return useQuery({
    queryKey: ["journal-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("journal_posts")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();
      if (error) throw error;
      return data as JournalPostRow | null;
    },
  });
}

export function pickLocalized<T extends Record<string, unknown>>(
  row: T,
  field: string,
  lang: "ru" | "en"
): string {
  const key = `${field}_${lang}` as keyof T;
  const fallback = `${field}_ru` as keyof T;
  return ((row[key] as string) || (row[fallback] as string) || "") as string;
}

