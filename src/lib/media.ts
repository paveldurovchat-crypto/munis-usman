import { supabase } from "@/integrations/supabase/client";

export function mediaUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  // Allow absolute URLs (e.g. external/static assets)
  if (/^https?:\/\//i.test(path)) return path;
  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return data.publicUrl;
}
