import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { Clock, Users, BookOpen, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/academics")({
  head: () => ({
    meta: [
      { title: "Academic Programs — MBA, PGDM, Executive MBA | Shree Management" },
      { name: "description", content: "Explore our AICTE-approved MBA, PGDM and Executive MBA programs with industry-aligned specializations." },
      { property: "og:title", content: "Academic Programs at Shree Management" },
      { property: "og:description", content: "MBA, PGDM and Executive MBA programs with multiple specializations." },
    ],
  }),
  component: Academics,
});

const programs = [
  {
    title: "Master of Business Administration (MBA)",
    duration: "2 Years · Full-Time",
    seats: "180 Seats",
    desc: "Our flagship MBA program offers rigorous training across core business disciplines with eight specialization tracks.",
    specs: ["Finance", "Marketing", "Human Resources", "Operations", "Business Analytics", "Strategy", "International Business", "Entrepreneurship"],
  },
  {
    title: "Post Graduate Diploma in Management (PGDM)",
    duration: "2 Years · Full-Time",
    seats: "120 Seats",
    desc: "AICTE-approved PGDM with a globally benchmarked curriculum, capstone projects and live industry case studies.",
    specs: ["Finance", "Marketing", "Digital Business", "Supply Chain"],
  },
  {
    title: "Executive MBA",
    duration: "15 Months · Weekends",
    seats: "60 Seats",
    desc: "Designed for working professionals with 5+ years of experience seeking leadership roles.",
    specs: ["General Management", "Strategy & Leadership"],
  },
];

function Academics() {
  return (
    <Layout>
      <PageHeader title="Academic Programs" subtitle="Industry-aligned, future-ready management programs designed for impact." />

      <section className="container-academic py-16 space-y-8">
        {programs.map((p) => (
          <div key={p.title} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-[var(--shadow-elegant)] transition-shadow">
            <div className="grid md:grid-cols-3 gap-0">
              <div className="bg-primary text-primary-foreground p-8 flex flex-col justify-center">
                <BookOpen className="h-10 w-10 text-gold" />
                <h3 className="font-serif text-2xl font-bold mt-4">{p.title}</h3>
                <div className="mt-5 space-y-2 text-sm text-primary-foreground/80">
                  <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-gold" /> {p.duration}</div>
                  <div className="flex items-center gap-2"><Users className="h-4 w-4 text-gold" /> {p.seats}</div>
                </div>
              </div>
              <div className="md:col-span-2 p-8">
                <p className="text-muted-foreground leading-relaxed">{p.desc}</p>
                <p className="mt-5 text-sm font-semibold text-primary uppercase tracking-wider">Specializations</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.specs.map((s) => (
                    <span key={s} className="px-3 py-1 rounded-full bg-gold-soft text-gold-foreground text-xs font-medium">{s}</span>
                  ))}
                </div>
                <Button asChild className="mt-6 bg-primary hover:bg-primary-deep">
                  <Link to="/admissions">Apply for this Program <ArrowRight className="ml-1 h-4 w-4" /></Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </Layout>
  );
}
