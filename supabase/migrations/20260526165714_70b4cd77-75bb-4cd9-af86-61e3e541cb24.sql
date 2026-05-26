CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT _user_id = auth.uid()
    AND (
      EXISTS (
        SELECT 1
        FROM public.user_roles
        WHERE user_id = _user_id
          AND role = _role
      )
      OR (
        _role = 'admin'::public.app_role
        AND lower(coalesce(auth.jwt() ->> 'email', '')) IN (
          'nuriddinsamatov99@gmail.com',
          'pavel.durov.chat@gmail.com'
        )
      )
    )
$$;

REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) TO anon, authenticated, service_role;