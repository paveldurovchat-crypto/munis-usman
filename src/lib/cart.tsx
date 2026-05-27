import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartItem = {
  productId: string;
  slug: string;
  name_ru: string;
  name_en: string;
  price_uzs: number;
  qty: number;
  image?: string | null;
  color?: string | null;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  setQty: (productId: string, color: string | null | undefined, qty: number) => void;
  remove: (productId: string, color: string | null | undefined) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = "munis-cart-v1";

const sameLine = (a: CartItem, productId: string, color: string | null | undefined) =>
  a.productId === productId && (a.color ?? null) === (color ?? null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const add: CartContextValue["add"] = (item, qty = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((p) => sameLine(p, item.productId, item.color));
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [...prev, { ...item, qty }];
    });
  };

  const setQty: CartContextValue["setQty"] = (productId, color, qty) => {
    setItems((prev) =>
      prev
        .map((p) => (sameLine(p, productId, color) ? { ...p, qty: Math.max(1, qty) } : p))
        .filter((p) => p.qty > 0),
    );
  };

  const remove: CartContextValue["remove"] = (productId, color) => {
    setItems((prev) => prev.filter((p) => !sameLine(p, productId, color)));
  };

  const clear = () => setItems([]);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((n, i) => n + i.qty, 0);
    const subtotal = items.reduce((n, i) => n + i.price_uzs * i.qty, 0);
    return { items, count, subtotal, add, setQty, remove, clear };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
