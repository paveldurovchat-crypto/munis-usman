import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { X, Search as SearchIcon } from "lucide-react";
import { products } from "@/lib/products";
import { useI18n } from "@/lib/i18n";

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useI18n();
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const id = window.setTimeout(() => inputRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.clearTimeout(id);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => { if (!open) setQ(""); }, [open]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return products
      .filter((p) => {
        const name = t(p.nameKey).toLowerCase();
        const desc = t(p.descKey).toLowerCase();
        return name.includes(term) || desc.includes(term) || p.slug.includes(term) || p.category.includes(term);
      })
      .slice(0, 20);
  }, [q, t]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute inset-x-0 top-0 max-h-[100vh] overflow-y-auto bg-cream shadow-2xl">
        <div className="mx-auto flex max-w-4xl items-center gap-3 px-6 py-5 lg:px-8">
          <SearchIcon className="h-5 w-5 text-foreground/70" strokeWidth={1.5} />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("search.placeholder")}
            className="flex-1 bg-transparent py-2 text-base font-light tracking-wide text-foreground placeholder:text-foreground/40 focus:outline-none"
          />
          <button onClick={onClose} aria-label="Close search" className="text-foreground/70 hover:text-foreground">
            <X className="h-6 w-6" strokeWidth={1.5} />
          </button>
        </div>

        <div className="mx-auto max-w-4xl px-6 pb-10 lg:px-8">
          {q.trim() === "" ? (
            <p className="py-12 text-center text-sm uppercase tracking-[0.22em] text-foreground/50">
              {t("search.hint")}
            </p>
          ) : results.length === 0 ? (
            <p className="py-12 text-center text-sm uppercase tracking-[0.22em] text-foreground/60">
              {t("search.empty")}
            </p>
          ) : (
            <ul className="divide-y divide-border/60">
              {results.map((p) => (
                <li key={p.slug}>
                  <Link
                    to="/collection/$slug"
                    params={{ slug: p.slug }}
                    onClick={onClose}
                    className="flex items-center justify-between gap-4 py-4 transition-colors hover:bg-sand/60"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-display text-lg text-foreground">{t(p.nameKey)}</p>
                      <p className="mt-1 truncate text-xs uppercase tracking-[0.22em] text-foreground/50">
                        {p.category} · €{p.price}
                      </p>
                    </div>
                    <span className="text-xs uppercase tracking-[0.28em] text-accent">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
