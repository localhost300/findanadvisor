import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { createClient } from "@/lib/supabase/server";
export const dynamic = "force-dynamic";
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sb = await createClient();
  if (sb) {
    const {
      data: { user },
    } = await sb.auth.getUser();
    if (!user) redirect("/login?next=/admin");
    const { data } = await sb
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();
    if (data?.role !== "admin") redirect("/?error=unauthorized");
  }
  return (
    <AdminShell>
      {!sb && (
        <div className="notice" style={{ marginBottom: 20 }}>
          Preview mode: connect Supabase to enable secure admin authentication
          and database writes.
        </div>
      )}
      {children}
    </AdminShell>
  );
}
