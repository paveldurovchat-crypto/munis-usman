CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
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