
-- Link orders to authenticated users (nullable so guest checkouts still work)
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS user_id uuid;
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);

-- Extend profile with shipping info reused at checkout
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS address text,
  ADD COLUMN IF NOT EXISTS city text;

-- Allow shoppers to read their own orders + insert with their user_id
DROP POLICY IF EXISTS "Users read own orders" ON public.orders;
CREATE POLICY "Users read own orders"
  ON public.orders FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Anyone can place order" ON public.orders;
CREATE POLICY "Anyone can place order"
  ON public.orders FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    (length(customer_name) >= 2 AND length(customer_name) <= 120)
    AND (length(phone) >= 6 AND length(phone) <= 32)
    AND total_uzs >= 0
    AND status = 'pending'::order_status
    AND (user_id IS NULL OR user_id = auth.uid())
  );

-- Users can read items of their own orders
DROP POLICY IF EXISTS "Users read own order items" ON public.order_items;
CREATE POLICY "Users read own order items"
  ON public.order_items FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.orders o
    WHERE o.id = order_items.order_id AND o.user_id = auth.uid()
  ));

-- Wishlists
CREATE TABLE IF NOT EXISTS public.wishlists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  product_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, product_id)
);

GRANT SELECT, INSERT, DELETE ON public.wishlists TO authenticated;
GRANT ALL ON public.wishlists TO service_role;

ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own wishlist"
  ON public.wishlists FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());
