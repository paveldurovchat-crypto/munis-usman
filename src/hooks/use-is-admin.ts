import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./use-auth";

const SUPER_ADMIN_EMAILS = new Set([
  "nuriddinsamatov99@gmail.com",
  "pavel.durov.chat@gmail.com",
]);

export function useIsAdmin() {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let cancelled = false;
    if (loading) return;
    if (!user) {
      setIsAdmin(false);
      setChecking(false);
      return;
    }
    const email = (user.email ?? "").toLowerCase();
    if (SUPER_ADMIN_EMAILS.has(email)) {
      setIsAdmin(true);
      setChecking(false);
      return;
    }
    setChecking(true);
    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle()
      .then(({ data }) => {
        if (!cancelled) {
          setIsAdmin(!!data);
          setChecking(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [user, loading]);

  return { isAdmin, checking: checking || loading };
}
