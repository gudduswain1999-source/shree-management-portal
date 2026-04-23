import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/students")({
  component: AdminStudents,
});

type Student = {
  id: string;
  hall_ticket_no: string;
  full_name: string;
  date_of_birth: string;
  course: string;
  semester: string;
  batch_year: string;
};

const empty: Omit<Student, "id"> = {
  hall_ticket_no: "",
  full_name: "",
  date_of_birth: "",
  course: "MBA",
  semester: "I",
  batch_year: new Date().getFullYear().toString(),
};

function AdminStudents() {
  const [rows, setRows] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Student | null>(null);
  const [form, setForm] = useState(empty);
  const [search, setSearch] = useState("");

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("students")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setRows(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const startCreate = () => { setEditing(null); setForm(empty); setOpen(true); };
  const startEdit = (s: Student) => {
    setEditing(s);
    setForm({
      hall_ticket_no: s.hall_ticket_no,
      full_name: s.full_name,
      date_of_birth: s.date_of_birth,
      course: s.course,
      semester: s.semester,
      batch_year: s.batch_year,
    });
    setOpen(true);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      const { error } = await supabase.from("students").update(form).eq("id", editing.id);
      if (error) return toast.error(error.message);
      toast.success("Student updated");
    } else {
      const { error } = await supabase.from("students").insert(form);
      if (error) return toast.error(error.message);
      toast.success("Student added");
    }
    setOpen(false);
    load();
  };

  const remove = async (s: Student) => {
    if (!confirm(`Delete ${s.full_name}? This will also delete their results.`)) return;
    // Delete results first
    await supabase.from("results").delete().eq("student_id", s.id);
    const { error } = await supabase.from("students").delete().eq("id", s.id);
    if (error) return toast.error(error.message);
    toast.success("Student deleted");
    load();
  };

  const filtered = rows.filter((r) =>
    [r.full_name, r.hall_ticket_no, r.course].some((v) => v.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="font-serif text-3xl font-bold text-primary">Students</h1>
          <p className="text-muted-foreground text-sm">Manage student records</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={startCreate}><Plus className="h-4 w-4 mr-2" /> Add Student</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>{editing ? "Edit Student" : "Add Student"}</DialogTitle></DialogHeader>
            <form onSubmit={save} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Hall Ticket No</Label><Input required value={form.hall_ticket_no} onChange={(e) => setForm({ ...form, hall_ticket_no: e.target.value })} /></div>
                <div><Label>Date of Birth</Label><Input type="date" required value={form.date_of_birth} onChange={(e) => setForm({ ...form, date_of_birth: e.target.value })} /></div>
              </div>
              <div><Label>Full Name</Label><Input required value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} /></div>
              <div className="grid grid-cols-3 gap-3">
                <div><Label>Course</Label><Input required value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} /></div>
                <div><Label>Semester</Label><Input required value={form.semester} onChange={(e) => setForm({ ...form, semester: e.target.value })} /></div>
                <div><Label>Batch Year</Label><Input required value={form.batch_year} onChange={(e) => setForm({ ...form, batch_year: e.target.value })} /></div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="submit">{editing ? "Save" : "Create"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-4 max-w-sm">
        <Input placeholder="Search by name, hall ticket, course..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <Card className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Hall Ticket</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>DOB</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Sem</TableHead>
              <TableHead>Batch</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground">Loading...</TableCell></TableRow>
            ) : filtered.length === 0 ? (
              <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground">No students yet</TableCell></TableRow>
            ) : filtered.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-mono">{s.hall_ticket_no}</TableCell>
                <TableCell className="font-medium">{s.full_name}</TableCell>
                <TableCell>{s.date_of_birth}</TableCell>
                <TableCell>{s.course}</TableCell>
                <TableCell>{s.semester}</TableCell>
                <TableCell>{s.batch_year}</TableCell>
                <TableCell className="text-right whitespace-nowrap">
                  <Button variant="ghost" size="icon" onClick={() => startEdit(s)}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => remove(s)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
