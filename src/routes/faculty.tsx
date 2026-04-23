import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/site/Layout";
import { Mail, GraduationCap } from "lucide-react";

export const Route = createFileRoute("/faculty")({
  head: () => ({
    meta: [
      { title: "Faculty — Shree Management Autonomous" },
      { name: "description", content: "Meet our distinguished faculty — academicians and industry practitioners with PhDs from IIMs, IITs and top global universities." },
      { property: "og:title", content: "Faculty at Shree Management" },
      { property: "og:description", content: "Distinguished faculty with PhDs from top global universities." },
    ],
  }),
  component: Faculty,
});

const faculty = [
  { name: "Dr. Anjali Mehra", role: "Director & Professor of Strategy", qual: "PhD, IIM Ahmedabad", email: "anjali.m@shreemanagement.edu.in" },
  { name: "Prof. Rajesh Iyer", role: "Dean - Academics, Marketing", qual: "PhD, IIT Bombay", email: "rajesh.i@shreemanagement.edu.in" },
  { name: "Dr. Sunita Rao", role: "Professor of Finance", qual: "PhD, FMS Delhi", email: "sunita.r@shreemanagement.edu.in" },
  { name: "Dr. Vikram Joshi", role: "Professor of Operations", qual: "PhD, XLRI Jamshedpur", email: "vikram.j@shreemanagement.edu.in" },
  { name: "Dr. Neha Kapoor", role: "Associate Professor - HR & OB", qual: "PhD, TISS Mumbai", email: "neha.k@shreemanagement.edu.in" },
  { name: "Dr. Arjun Desai", role: "Associate Professor - Analytics", qual: "PhD, IIM Bangalore", email: "arjun.d@shreemanagement.edu.in" },
  { name: "Prof. Meera Nair", role: "Asst. Professor - Economics", qual: "PhD, JNU Delhi", email: "meera.n@shreemanagement.edu.in" },
  { name: "Dr. Karan Bhatia", role: "Asst. Professor - Entrepreneurship", qual: "PhD, ISB Hyderabad", email: "karan.b@shreemanagement.edu.in" },
];

function Faculty() {
  return (
    <Layout>
      <PageHeader title="Our Faculty" subtitle="Scholars and practitioners committed to your success." />

      <section className="container-academic py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {faculty.map((f) => (
            <div key={f.name} className="bg-card border border-border rounded-lg p-6 hover:shadow-[var(--shadow-card)] hover:border-gold/50 transition-all">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-primary-deep text-primary-foreground flex items-center justify-center font-serif text-2xl font-bold mx-auto">
                {f.name.split(" ")[1][0]}{f.name.split(" ")[2]?.[0] ?? ""}
              </div>
              <h3 className="font-serif text-lg font-bold text-primary mt-4 text-center">{f.name}</h3>
              <p className="text-sm text-muted-foreground text-center mt-1">{f.role}</p>
              <div className="mt-4 pt-4 border-t border-border space-y-1.5 text-xs text-muted-foreground">
                <p className="flex items-center gap-1.5"><GraduationCap className="h-3.5 w-3.5 text-gold" /> {f.qual}</p>
                <p className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5 text-gold" /> <span className="truncate">{f.email}</span></p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
