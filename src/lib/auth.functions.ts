import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const SUPER_ADMIN_EMAILS = new Set([
  "nuriddinsamatov99@gmail.com",
  "pavel.durov.chat@gmail.com",
]);

/**
 * Returns true if the current authenticated user has the 'admin' role.
 * Throws Unauthorized if no session.
 */
export const checkIsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId, claims } = context;
    const claimEmail = (claims as Record<string, unknown>).email;
    const email = typeof claimEmail === "string" ? claimEmail.toLowerCase() : "";

    if (SUPER_ADMIN_EMAILS.has(email)) {
      return { isAdmin: true, userId };
    }

    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();
    if (error) {
      return { isAdmin: false, userId };
    }
    return { isAdmin: !!data, userId };
  });
