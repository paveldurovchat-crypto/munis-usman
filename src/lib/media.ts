import { supabase } from "@/integrations/supabase/client";

export function mediaUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Build a srcset for responsive loading. Falls back to raw URL when not a
 * Supabase-served asset. Uses Supabase storage render transform (?width=).
 * Works for buckets that allow public render; harmless otherwise (browsers
 * will fall back).
 */
export function mediaSrcSet(path: string | null | undefined, widths = [480, 800, 1200, 1600]): string | undefined {
  const base = mediaUrl(path);
  if (!base) return undefined;
  // Supabase render endpoint
  const rendered = base.includes("/storage/v1/object/public/")
    ? base.replace("/storage/v1/object/public/", "/storage/v1/render/image/public/")
    : base;
  return widths.map((w) => `${rendered}${rendered.includes("?") ? "&" : "?"}width=${w}&quality=75 ${w}w`).join(", ");
}

/** Extract a YouTube video id from common URL shapes. */
export function youtubeId(url: string | null | undefined): string | null {
  if (!url) return null;
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/))([A-Za-z0-9_-]{6,})/);
  return m ? m[1] : null;
}

export function youtubeThumb(url: string | null | undefined): string | null {
  const id = youtubeId(url);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;
}

/** True if the URL is a YouTube Shorts link (vertical 9:16 video). */
export function isYoutubeShort(url: string | null | undefined): boolean {
  return !!url && /youtube\.com\/shorts\//i.test(url);
}

export function youtubeEmbed(url: string | null | undefined): string | null {
  const id = youtubeId(url);
  return id ? `https://www.youtube.com/embed/${id}` : null;
}
