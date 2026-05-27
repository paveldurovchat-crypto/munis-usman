import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { mediaUrl, youtubeEmbed, isYoutubeShort, youtubeId } from "./media";

export type MediaAsset = {
  id: string;
  kind: "image" | "video" | "youtube" | string;
  storage_path: string;
  label: string | null;
  used_for: string | null;
};

/** Canonical slot names the homepage and other pages look for. */
export const MEDIA_SLOTS = [
  "hero",
  "tile-accessories",
  "tile-cloth",
  "tile-home",
  "tile-couture",
  "art-of-hands",
  "about-portrait",
  "craft-1",
  "craft-2",
  "craft-3",
] as const;

export type MediaSlot = (typeof MEDIA_SLOTS)[number] | string;

/** Fetch all media assets once, then resolve by slot client-side. */
export function useMediaLibrary() {
  return useQuery({
    queryKey: ["media-library"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("media_assets")
        .select("id, kind, storage_path, label, used_for")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as MediaAsset[];
    },
    staleTime: 60_000,
  });
}

export function pickAssetBySlot(assets: MediaAsset[] | undefined, slot: MediaSlot): MediaAsset | undefined {
  if (!assets) return undefined;
  return assets.find((a) => (a.used_for ?? "").trim().toLowerCase() === slot.toLowerCase());
}

export function assetDisplayUrl(asset: MediaAsset | undefined): string | null {
  if (!asset) return null;
  if (asset.kind === "youtube") return asset.storage_path;
  return mediaUrl(asset.storage_path);
}

export function assetEmbedUrl(asset: MediaAsset | undefined): string | null {
  if (!asset) return null;
  if (asset.kind === "youtube") return youtubeEmbed(asset.storage_path);
  return mediaUrl(asset.storage_path);
}

export function assetIsVertical(asset: MediaAsset | undefined): boolean {
  if (!asset) return false;
  if (asset.kind === "youtube") return isYoutubeShort(asset.storage_path);
  return false;
}

export function assetYoutubeId(asset: MediaAsset | undefined): string | null {
  if (!asset || asset.kind !== "youtube") return null;
  return youtubeId(asset.storage_path);
}
