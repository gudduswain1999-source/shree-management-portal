import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, Mail, Phone } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/enquiries")({
  component: AdminEnquiries,
});

type Enquiry = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  course: string | null;
  message: string | null;
  created_at: string;
};

function AdminEnquiries() {
  const [rows, setRows] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("enquiries").select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setRows(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const remove = async (id: string) => {
    if (!confirm("Delete this enquiry?")) return;
    const { error } = await supabase.from("enquiries").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    load();
  };

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-primary mb-1">Enquiries</h1>
      <p className="text-muted-foreground text-sm mb-6">Prospective student enquiries from the website</p>

      <Card className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Message</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground">Loading...</TableCell></TableRow>
            ) : rows.length === 0 ? (
              <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground">No enquiries yet</TableCell></TableRow>
            ) : rows.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="text-xs whitespace-nowrap">{new Date(r.created_at).toLocaleDateString()}</TableCell>
                <TableCell className="font-medium">{r.full_name}</TableCell>
                <TableCell>
                  <div className="text-xs space-y-1">
                    <a href={`mailto:${r.email}`} className="flex items-center gap-1 text-primary hover:underline"><Mail className="h-3 w-3" /> {r.email}</a>
                    <a href={`tel:${r.phone}`} className="flex items-center gap-1 text-muted-foreground hover:text-primary"><Phone className="h-3 w-3" /> {r.phone}</a>
                  </div>
                </TableCell>
                <TableCell>{r.course ?? "—"}</TableCell>
                <TableCell className="max-w-xs text-sm text-muted-foreground">{r.message ?? "—"}</TableCell>
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
