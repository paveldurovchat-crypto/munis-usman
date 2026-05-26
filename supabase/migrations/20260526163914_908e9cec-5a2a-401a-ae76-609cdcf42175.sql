DROP POLICY IF EXISTS "Admins manage roles" ON public.user_roles;
REVOKE INSERT, UPDATE, DELETE ON public.user_roles FROM authenticated;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND user_id = auth.uid()
      AND role = _role
  )
$$;