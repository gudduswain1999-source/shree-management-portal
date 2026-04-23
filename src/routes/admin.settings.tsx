import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Plus, ShieldCheck, Mail } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({ meta: [{ title: "Settings — Admin Console" }] }),
  component: SettingsPage,
});

const emailSchema = z.string().trim().toLowerCase().email("Enter a valid email address").max(255);

type AllowlistRow = { email: string; created_at: string };

function SettingsPage() {
  const [rows, setRows] = useState<AllowlistRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [newEmail, setNewEmail] = useState("");
  const [busy, setBusy] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("admin_email_allowlist")
      .select("email, created_at")
      .order("created_at", { ascending: true });
    if (error) toast.error(error.message);
    else setRows(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const onAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = emailSchema.safeParse(newEmail);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setBusy(true);
    const { error } = await supabase
      .from("admin_email_allowlist")
      .insert({ email: parsed.data });
    setBusy(false);
    if (error) {
      toast.error(error.message.includes("duplicate") ? "Email already in allowlist" : error.message);
      return;
    }
    toast.success("Email added to allowlist");
    setNewEmail("");
    load();
  };

  const onRemove = async (email: string) => {
    if (!confirm(`Remove ${email} from the admin allowlist?\n\nNote: existing admin users keep access until their role is removed from the user_roles table.`)) return;
    const { error } = await supabase.from("admin_email_allowlist").delete().eq("email", email);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Removed from allowlist");
    load();
  };

  return (
    <div className="max-w-3xl">
      <h1 className="font-serif text-3xl font-bold text-primary mb-1">Settings</h1>
      <p className="text-muted-foreground mb-6">Manage who can sign up as an administrator.</p>

      <Card className="shadow-elegant">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-gold" />
            <CardTitle className="font-serif">Admin Email Allowlist</CardTitle>
          </div>
          <CardDescription>
            Only emails on this list become admins automatically when they sign up at <code className="text-xs bg-muted px-1.5 py-0.5 rounded">/admin/login</code>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onAdd} className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="flex-1 space-y-1.5">
              <Label htmlFor="email" className="sr-only">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="newadmin@example.com"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                disabled={busy}
              />
            </div>
            <Button type="submit" disabled={busy}>
              <Plus className="h-4 w-4 mr-1" /> {busy ? "Adding..." : "Add admin"}
            </Button>
          </form>

          <div className="border rounded-md divide-y">
            {loading ? (
              <div className="p-6 text-center text-sm text-muted-foreground">Loading...</div>
            ) : rows.length === 0 ? (
              <div className="p-6 text-center text-sm text-muted-foreground">No emails in the allowlist yet.</div>
            ) : (
              rows.map((r) => (
                <div key={r.email} className="flex items-center justify-between gap-3 px-4 py-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-sm font-medium truncate">{r.email}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => onRemove(r.email)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>

          <p className="text-xs text-muted-foreground mt-4">
            Tip: Removing an email from this list prevents <em>future</em> signups from getting admin access. To revoke an existing admin, also delete their row from the <code className="bg-muted px-1 rounded">user_roles</code> table.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
