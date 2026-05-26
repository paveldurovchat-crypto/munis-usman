
-- Fix function search_path
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

-- Restrict EXECUTE on SECURITY DEFINER functions
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.touch_updated_at() FROM PUBLIC, anon, authenticated;
-- has_role must be callable by RLS evaluator (postgres role); revoke from public clients
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC;
-- Keep authenticated/anon ability to be evaluated within policies (they are evaluated as the function owner regardless, but execute privilege is needed for direct calls in policies)
GRANT EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) TO authenticated, anon;

-- Tighten guest checkout: require non-empty fields
DROP POLICY IF EXISTS "Anyone can place order" ON public.orders;
CREATE POLICY "Anyone can place order" ON public.orders
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(customer_name) BETWEEN 2 AND 120
    AND length(phone) BETWEEN 6 AND 32
    AND total_uzs >= 0
    AND status = 'pending'
  );

DROP POLICY IF EXISTS "Anyone can insert order items" ON public.order_items;
CREATE POLICY "Anyone can insert order items" ON public.order_items
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    qty > 0 AND qty <= 99
    AND unit_price_uzs >= 0
    AND length(name_snapshot) BETWEEN 1 AND 200
  );

-- Remove broad listing on media bucket; rely on public bucket flag for direct file URLs
DROP POLICY IF EXISTS "Anyone reads media bucket" ON storage.objects;
-- Public buckets serve files via public URL without needing SELECT policy.
-- Admins still need SELECT to list files in admin UI:
CREATE POLICY "Admins list media" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));
