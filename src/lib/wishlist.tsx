import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

type WishlistContextValue = {
  ids: Set<string>;
  has: (productId: string) => boolean;
  toggle: (productId: string) => Promise<void>;
};

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);
const STORAGE_KEY = "munis-wishlist-v1";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [ids, setIds] = useState<Set<string>>(new Set());

  // Load: from DB if signed in, else from localStorage
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (user) {
        const { data } = await supabase.from("wishlists").select("product_id").eq("user_id", user.id);
        if (cancelled) return;
        const dbIds = new Set<string>((data ?? []).map((r: { product_id: string }) => r.product_id));
        // Merge local guest wishlist into DB on first sign in
        try {
          const raw = window.localStorage.getItem(STORAGE_KEY);
          if (raw) {
            const local: string[] = JSON.parse(raw);
            const toInsert = local.filter((id) => !dbIds.has(id));
            if (toInsert.length) {
              await supabase
                .from("wishlists")
                .insert(toInsert.map((product_id) => ({ user_id: user.id, product_id })));
              toInsert.forEach((id) => dbIds.add(id));
            }
            window.localStorage.removeItem(STORAGE_KEY);
          }
        } catch {
          /* ignore */
        }
        setIds(dbIds);
      } else {
        try {
          const raw = window.localStorage.getItem(STORAGE_KEY);
          setIds(new Set<string>(raw ? JSON.parse(raw) : []));
        } catch {
          setIds(new Set());
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user]);

  const persistLocal = useCallback((next: Set<string>) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
  }, []);

  const toggle = useCallback(
    async (productId: string) => {
      const has = ids.has(productId);
      const next = new Set(ids);
      if (has) next.delete(productId);
      else next.add(productId);
      setIds(next);

      if (user) {
        if (has) {
          await supabase.from("wishlists").delete().eq("user_id", user.id).eq("product_id", productId);
        } else {
          await supabase.from("wishlists").insert({ user_id: user.id, product_id: productId });
        }
      } else {
        persistLocal(next);
      }
    },
    [ids, user, persistLocal],
  );

  const value = useMemo<WishlistContextValue>(
    () => ({ ids, has: (id) => ids.has(id), toggle }),
    [ids, toggle],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
