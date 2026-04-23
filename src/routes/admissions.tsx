import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle2, FileText, Calendar, IndianRupee } from "lucide-react";

export const Route = createFileRoute("/admissions")({
  head: () => ({
    meta: [
      { title: "Admissions 2025-27 — Apply to Shree Management Autonomous" },
      { name: "description", content: "Admissions open for MBA, PGDM and Executive MBA programs (Batch 2025-27). Eligibility, process, fees and important dates." },
      { property: "og:title", content: "Admissions 2025-27 at Shree Management" },
      { property: "og:description", content: "Apply now for MBA, PGDM and Executive MBA programs." },
    ],
  }),
  component: Admissions,
});

function Admissions() {
  return (
    <Layout>
      <PageHeader title="Admissions 2025-2027" subtitle="Take the first step towards a transformative management education." />

      <section className="container-academic py-16 grid md:grid-cols-3 gap-6">
        {[
          { icon: Calendar, t: "Application Window", d: "1 Aug 2025 — 31 Jan 2026" },
          { icon: FileText, t: "Entrance Exams", d: "CAT / XAT / MAT / CMAT / GMAT" },
          { icon: IndianRupee, t: "Total Fees (2 Yrs)", d: "₹ 6.5 Lakhs (MBA)" },
        ].map((s) => (
          <div key={s.t} className="bg-card border border-border rounded-lg p-6 text-center">
            <s.icon className="h-9 w-9 text-gold mx-auto" />
            <h3 className="font-serif text-lg font-bold text-primary mt-3">{s.t}</h3>
            <p className="text-muted-foreground mt-1">{s.d}</p>
          </div>
        ))}
      </section>

      <section className="bg-secondary py-16">
        <div className="container-academic grid lg:grid-cols-2 gap-10">
          <div>
            <p className="text-gold font-semibold uppercase tracking-widest text-sm">Eligibility</p>
            <h2 className="font-serif text-3xl font-bold text-primary mt-2">Who Can Apply</h2>
            <ul className="mt-6 space-y-3">
              {[
                "Bachelor's degree in any discipline with minimum 50% marks (45% for SC/ST/OBC).",
                "Valid score in CAT / XAT / MAT / CMAT / GMAT.",
                "Final-year graduation candidates may apply provisionally.",
                "Executive MBA: Min. 5 years of full-time work experience.",
              ].map((e) => (
                <li key={e} className="flex gap-3"><CheckCircle2 className="h-5 w-5 text-gold shrink-0 mt-0.5" /><span className="text-foreground">{e}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-gold font-semibold uppercase tracking-widest text-sm">Process</p>
            <h2 className="font-serif text-3xl font-bold text-primary mt-2">5-Step Admission Process</h2>
            <ol className="mt-6 space-y-4">
              {[
                "Fill the online application form.",
                "Submit entrance exam score.",
                "Shortlisted candidates appear for Group Discussion.",
                "Personal Interview with academic panel.",
                "Final selection & fee payment.",
              ].map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className="h-8 w-8 shrink-0 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-serif font-bold">{i + 1}</span>
                  <span className="text-foreground pt-1">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="container-academic py-16 text-center">
        <h2 className="font-serif text-3xl font-bold text-primary">Ready to apply?</h2>
        <p className="text-muted-foreground mt-2">Have questions? Make an enquiry and our admissions team will reach out.</p>
        <div className="mt-6 flex justify-center gap-3 flex-wrap">
          <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90 font-semibold">
            <Link to="/enquiry">Start Application</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/contact">Contact Admissions</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
