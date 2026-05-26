import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { formatUzs } from "@/lib/format";

type Order = {
  id: string; customer_name: string; phone: string; city: string | null;
  address: string | null; total_uzs: number; status: string; created_at: string; notes: string | null;
};

const STATUSES = ["pending", "paid", "fulfilled", "cancelled"] as const;
type OrderStatus = (typeof STATUSES)[number];

export function OrdersAdmin() {
  const qc = useQueryClient();
  const { data: orders, isLoading } = useQuery({
    queryKey: ["admin", "orders"],
    queryFn: async () => {
      const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as Order[];
    },
  });

  const setStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: OrderStatus }) => {
      const { error } = await supabase.from("orders").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "orders"] }),
  });

  return (
    <div>
      <h2 className="mb-6 font-display text-2xl">Orders ({orders?.length ?? 0})</h2>
      {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
      {orders?.length === 0 && <p className="text-sm text-muted-foreground">No orders yet.</p>}
      <div className="space-y-3">
        {orders?.map((o) => (
          <div key={o.id} className="border border-border bg-background p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-display text-lg">{o.customer_name}</p>
                <p className="text-sm text-muted-foreground">{o.phone}{o.city ? ` · ${o.city}` : ""}</p>
                {o.address && <p className="text-sm text-muted-foreground">{o.address}</p>}
                <p className="mt-1 text-xs text-muted-foreground">{new Date(o.created_at).toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="font-display text-lg">{formatUzs(o.total_uzs)}</p>
                <select value={o.status} onChange={(e) => setStatus.mutate({ id: o.id, status: e.target.value as OrderStatus })} className="mt-2 border border-border bg-background px-2 py-1 text-xs">
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            {o.notes && <p className="mt-3 border-t border-border pt-3 text-sm">{o.notes}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
