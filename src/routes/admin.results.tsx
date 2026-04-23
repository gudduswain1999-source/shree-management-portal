import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/results")({
  component: AdminResults,
});

type Result = {
  id: string;
  student_id: string;
  subject_code: string;
  subject_name: string;
  marks_obtained: number;
  max_marks: number;
  grade: string | null;
  status: string;
};

type Student = { id: string; full_name: string; hall_ticket_no: string };

const empty = {
  student_id: "",
  subject_code: "",
  subject_name: "",
  marks_obtained: 0,
  max_marks: 100,
  grade: "",
  status: "Pass",
};

function AdminResults() {
  const [rows, setRows] = useState<Result[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Result | null>(null);
  const [form, setForm] = useState(empty);
  const [filterStudent, setFilterStudent] = useState<string>("all");

  const load = async () => {
    setLoading(true);
    const [r, s] = await Promise.all([
      supabase.from("results").select("*").order("created_at", { ascending: false }),
      supabase.from("students").select("id, full_name, hall_ticket_no").order("full_name"),
    ]);
    if (r.error) toast.error(r.error.message);
    setRows(r.data ?? []);
    setStudents(s.data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const startCreate = () => { setEditing(null); setForm(empty); setOpen(true); };
  const startEdit = (r: Result) => {
    setEditing(r);
    setForm({
      student_id: r.student_id,
      subject_code: r.subject_code,
      subject_name: r.subject_name,
      marks_obtained: r.marks_obtained,
      max_marks: r.max_marks,
      grade: r.grade ?? "",
      status: r.status,
    });
    setOpen(true);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.student_id) return toast.error("Select a student");
    const payload = { ...form, grade: form.grade || null };
    if (editing) {
      const { error } = await supabase.from("results").update(payload).eq("id", editing.id);
      if (error) return toast.error(error.message);
      toast.success("Result updated");
    } else {
      const { error } = await supabase.from("results").insert(payload);
      if (error) return toast.error(error.message);
      toast.success("Result added");
    }
    setOpen(false);
    load();
  };

  const remove = async (r: Result) => {
    if (!confirm("Delete this result entry?")) return;
    const { error } = await supabase.from("results").delete().eq("id", r.id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    load();
  };

  const studentLabel = (id: string) => {
    const s = students.find((x) => x.id === id);
    return s ? `${s.full_name} (${s.hall_ticket_no})` : id;
  };

  const filtered = filterStudent === "all" ? rows : rows.filter((r) => r.student_id === filterStudent);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="font-serif text-3xl font-bold text-primary">Results</h1>
          <p className="text-muted-foreground text-sm">Subject-wise marks and grades</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={startCreate}><Plus className="h-4 w-4 mr-2" /> Add Result</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>{editing ? "Edit Result" : "Add Result"}</DialogTitle></DialogHeader>
            <form onSubmit={save} className="space-y-3">
              <div>
                <Label>Student</Label>
                <Select value={form.student_id} onValueChange={(v) => setForm({ ...form, student_id: v })}>
                  <SelectTrigger><SelectValue placeholder="Select student" /></SelectTrigger>
                  <SelectContent>
                    {students.map((s) => (
                      <SelectItem key={s.id} value={s.id}>{s.full_name} — {s.hall_ticket_no}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Subject Code</Label><Input required value={form.subject_code} onChange={(e) => setForm({ ...form, subject_code: e.target.value })} /></div>
                <div><Label>Subject Name</Label><Input required value={form.subject_name} onChange={(e) => setForm({ ...form, subject_name: e.target.value })} /></div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div><Label>Marks</Label><Input type="number" required value={form.marks_obtained} onChange={(e) => setForm({ ...form, marks_obtained: Number(e.target.value) })} /></div>
                <div><Label>Max Marks</Label><Input type="number" required value={form.max_marks} onChange={(e) => setForm({ ...form, max_marks: Number(e.target.value) })} /></div>
                <div><Label>Grade</Label><Input value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })} placeholder="A+, B..." /></div>
              </div>
              <div>
                <Label>Status</Label>
                <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pass">Pass</SelectItem>
                    <SelectItem value="Fail">Fail</SelectItem>
                  </SelectContent>
                </Select>
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
        <Label className="text-xs text-muted-foreground">Filter by student</Label>
        <Select value={filterStudent} onValueChange={setFilterStudent}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All students</SelectItem>
            {students.map((s) => (
              <SelectItem key={s.id} value={s.id}>{s.full_name} — {s.hall_ticket_no}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Marks</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground">Loading...</TableCell></TableRow>
            ) : filtered.length === 0 ? (
              <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground">No results yet</TableCell></TableRow>
            ) : filtered.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="text-sm">{studentLabel(r.student_id)}</TableCell>
                <TableCell className="font-mono text-xs">{r.subject_code}</TableCell>
                <TableCell>{r.subject_name}</TableCell>
                <TableCell>{r.marks_obtained}/{r.max_marks}</TableCell>
                <TableCell>{r.grade ?? "—"}</TableCell>
                <TableCell>
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${r.status === "Pass" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {r.status}
                  </span>
                </TableCell>
                <TableCell className="text-right whitespace-nowrap">
                  <Button variant="ghost" size="icon" onClick={() => startEdit(r)}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => remove(r)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
