import { createFileRoute, Outlet, Link, useNavigate, useLocation } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users, FileText, MessagesSquare, LifeBuoy, LogOut, ShieldAlert } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Dashboard — Shree Management" }] }),
  component: AdminLayout,
});

const sidebar = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/students", label: "Students", icon: Users, exact: false },
  { to: "/admin/results", label: "Results", icon: FileText, exact: false },
  { to: "/admin/enquiries", label: "Enquiries", icon: MessagesSquare, exact: false },
  { to: "/admin/support", label: "Support", icon: LifeBuoy, exact: false },
] as const;

function AdminLayout() {
  const { isAdmin, loading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !isAdmin && location.pathname !== "/admin/login") {
      navigate({ to: "/admin/login" });
    }
  }, [isAdmin, loading, navigate, location.pathname]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <ShieldAlert className="h-12 w-12 text-destructive mx-auto mb-3" />
          <h1 className="text-xl font-bold">Access denied</h1>
          <p className="text-muted-foreground text-sm mt-2">You need admin privileges to view this area.</p>
          <Button className="mt-4" onClick={() => navigate({ to: "/admin/login" })}>Go to admin login</Button>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate({ to: "/admin/login" });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-muted/30">
      <aside className="md:w-64 md:shrink-0 bg-primary text-primary-foreground md:min-h-screen">
        <div className="p-5 border-b border-primary-foreground/10">
          <Link to="/" className="font-serif text-lg font-bold">Shree Management</Link>
          <div className="text-[10px] uppercase tracking-widest opacity-70">Admin Console</div>
        </div>
        <nav className="p-3 space-y-1">
          {sidebar.map((s) => (
            <Link
              key={s.to}
              to={s.to}
              activeOptions={{ exact: s.exact }}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-primary-foreground/10 transition-colors"
              activeProps={{ className: "flex items-center gap-2 px-3 py-2 rounded-md text-sm bg-primary-foreground/15 font-semibold" }}
            >
              <s.icon className="h-4 w-4" />
              {s.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 mt-auto border-t border-primary-foreground/10 text-xs">
          <div className="px-3 py-2 truncate opacity-80">{user?.email}</div>
          <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-primary-foreground/10">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 p-4 md:p-8 overflow-x-auto">
        <Outlet />
      </main>
    </div>
  );
}
