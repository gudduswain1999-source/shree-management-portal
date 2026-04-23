import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, Mail } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/support")({
  component: AdminSupport,
});

type Ticket = {
  id: string;
  full_name: string;
  email: string;
  category: string;
  subject: string;
  message: string;
  created_at: string;
};

function AdminSupport() {
  const [rows, setRows] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("support_tickets").select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setRows(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const remove = async (id: string) => {
    if (!confirm("Delete this support ticket?")) return;
    const { error } = await supabase.from("support_tickets").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    load();
  };

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-primary mb-1">Support Tickets</h1>
      <p className="text-muted-foreground text-sm mb-6">Help requests from students and visitors</p>

      <Card className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Message</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground">Loading...</TableCell></TableRow>
            ) : rows.length === 0 ? (
              <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground">No tickets yet</TableCell></TableRow>
            ) : rows.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="text-xs whitespace-nowrap">{new Date(r.created_at).toLocaleDateString()}</TableCell>
                <TableCell className="font-medium">{r.full_name}</TableCell>
                <TableCell><a href={`mailto:${r.email}`} className="text-xs text-primary hover:underline flex items-center gap-1"><Mail className="h-3 w-3" />{r.email}</a></TableCell>
                <TableCell><span className="text-xs bg-accent px-2 py-1 rounded">{r.category}</span></TableCell>
                <TableCell className="font-medium">{r.subject}</TableCell>
                <TableCell className="max-w-xs text-sm text-muted-foreground">{r.message}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => remove(r.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
