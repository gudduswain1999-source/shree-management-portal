import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, FileSearch, CheckCircle2, XCircle, Printer } from "lucide-react";

type Student = {
  id: string;
  hall_ticket_no: string;
  full_name: string;
  course: string;
  semester: string;
  batch_year: string;
};
type Result = {
  subject_code: string;
  subject_name: string;
  max_marks: number;
  marks_obtained: number;
  grade: string | null;
  status: "Pass" | "Fail";
};

export const Route = createFileRoute("/result")({
  head: () => ({
    meta: [
      { title: "Check Result — Shree Management Autonomous" },
      { name: "description", content: "Check your semester results online. Enter your hall ticket number and date of birth to view subject-wise marks." },
      { property: "og:title", content: "Result Portal — Shree Management" },
      { property: "og:description", content: "Check your semester results online with your hall ticket number." },
    ],
  }),
  component: ResultPage,
});

function ResultPage() {
  const [hallTicket, setHallTicket] = useState("");
  const [dob, setDob] = useState("");
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState<Student | null>(null);
  const [results, setResults] = useState<Result[]>([]);

  async function onCheck(e: React.FormEvent) {
    e.preventDefault();
    if (!hallTicket.trim() || !dob) {
      toast.error("Please enter both Hall Ticket Number and Date of Birth");
      return;
    }
    setLoading(true);
    setStudent(null);
    setResults([]);
    try {
      const { data: stu, error: e1 } = await supabase
        .from("students")
        .select("id, hall_ticket_no, full_name, course, semester, batch_year, date_of_birth")
        .eq("hall_ticket_no", hallTicket.trim().toUpperCase())
        .eq("date_of_birth", dob)
        .maybeSingle();
      if (e1) throw e1;
      if (!stu) {
        toast.error("No record found. Please check your details and try again.");
        return;
      }
      const { data: res, error: e2 } = await supabase
        .from("results")
        .select("subject_code, subject_name, max_marks, marks_obtained, grade, status")
        .eq("student_id", stu.id)
        .order("subject_code");
      if (e2) throw e2;
      setStudent(stu);
      setResults((res ?? []) as Result[]);
      toast.success("Result loaded");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  const total = results.reduce((s, r) => s + r.marks_obtained, 0);
  const max = results.reduce((s, r) => s + r.max_marks, 0);
  const pct = max ? ((total / max) * 100).toFixed(2) : "0";
  const overall = results.length > 0 && results.every((r) => r.status === "Pass") ? "PASS" : "FAIL";

  return (
    <Layout>
      <PageHeader title="Result Portal" subtitle="View your semester examination results online." />

      <section className="container-academic py-12">
        <div className="max-w-2xl mx-auto bg-card border-2 border-gold/30 rounded-lg p-6 md:p-8 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-11 w-11 rounded-lg bg-primary text-primary-foreground flex items-center justify-center"><FileSearch className="h-5 w-5" /></div>
            <div>
              <h2 className="font-serif text-xl font-bold text-primary">Check Your Result</h2>
              <p className="text-xs text-muted-foreground">Enter your credentials below</p>
            </div>
          </div>
          <form onSubmit={onCheck} className="space-y-4">
            <div>
              <Label htmlFor="ht">Hall Ticket Number *</Label>
              <Input id="ht" value={hallTicket} onChange={(e) => setHallTicket(e.target.value)} placeholder="e.g. SMA2024001" required maxLength={20} className="mt-1.5 uppercase" />
            </div>
            <div>
              <Label htmlFor="dob">Date of Birth *</Label>
              <Input id="dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} required className="mt-1.5" />
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary-deep h-11 text-base font-semibold">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Check Result"}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Try sample: <span className="font-mono font-semibold">SMA2024001</span> / 14-05-2002
            </p>
          </form>
        </div>

        {student && (
          <div className="max-w-4xl mx-auto mt-10 bg-card border border-border rounded-lg shadow-[var(--shadow-elegant)] overflow-hidden print:shadow-none print:border-0">
            <div className="bg-primary text-primary-foreground p-6 flex flex-wrap justify-between items-center gap-3">
              <div>
                <p className="text-xs uppercase tracking-widest text-gold">Statement of Marks</p>
                <h3 className="font-serif text-2xl font-bold mt-1">{student.full_name}</h3>
              </div>
              <Button variant="outline" size="sm" onClick={() => window.print()} className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 print:hidden">
                <Printer className="h-4 w-4 mr-1" /> Print
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border-b border-border bg-secondary/50">
              <Info label="Hall Ticket No." value={student.hall_ticket_no} />
              <Info label="Course" value={student.course} />
              <Info label="Semester" value={student.semester} />
              <Info label="Batch" value={student.batch_year} />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gold-soft text-primary">
                  <tr>
                    <th className="text-left p-3 font-semibold">Code</th>
                    <th className="text-left p-3 font-semibold">Subject</th>
                    <th className="text-right p-3 font-semibold">Max</th>
                    <th className="text-right p-3 font-semibold">Obtained</th>
                    <th className="text-center p-3 font-semibold">Grade</th>
                    <th className="text-center p-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r) => (
                    <tr key={r.subject_code} className="border-t border-border">
                      <td className="p-3 font-mono text-xs">{r.subject_code}</td>
                      <td className="p-3 font-medium">{r.subject_name}</td>
                      <td className="p-3 text-right">{r.max_marks}</td>
                      <td className="p-3 text-right font-semibold">{r.marks_obtained}</td>
                      <td className="p-3 text-center">{r.grade ?? "-"}</td>
                      <td className="p-3 text-center">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${r.status === "Pass" ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}`}>
                          {r.status === "Pass" ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-6 bg-secondary/30 grid sm:grid-cols-3 gap-4 text-center border-t border-border">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Total</p>
                <p className="font-serif text-xl font-bold text-primary mt-1">{total} / {max}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Percentage</p>
                <p className="font-serif text-xl font-bold text-primary mt-1">{pct}%</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Overall Result</p>
                <p className={`font-serif text-xl font-bold mt-1 ${overall === "PASS" ? "text-success" : "text-destructive"}`}>{overall}</p>
              </div>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="font-semibold text-foreground mt-0.5">{value}</p>
    </div>
  );
}
