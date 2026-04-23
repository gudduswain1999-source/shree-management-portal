import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/site/Layout";
import { TrendingUp, Briefcase, IndianRupee, Building2 } from "lucide-react";
import grad from "@/assets/graduation.jpg";

export const Route = createFileRoute("/placements")({
  head: () => ({
    meta: [
      { title: "Placements — 98% Placement Rate | Shree Management" },
      { name: "description", content: "Our placement record: 98% placement, ₹14.5 LPA average package, 150+ recruiters from leading Indian and global firms." },
      { property: "og:title", content: "Placements at Shree Management" },
      { property: "og:description", content: "98% placements, ₹14.5 LPA average, 150+ recruiters." },
      { property: "og:image", content: grad },
    ],
  }),
  component: Placements,
});

const recruiters = [
  "TCS", "Infosys", "Wipro", "Deloitte", "EY", "KPMG", "PwC", "Accenture",
  "ICICI Bank", "HDFC Bank", "Axis Bank", "Kotak", "Reliance", "Tata Steel",
  "Asian Paints", "HUL", "ITC", "Nestle", "Amazon", "Flipkart", "Microsoft", "Google",
];

function Placements() {
  return (
    <Layout>
      <PageHeader title="Placements" subtitle="Our students are sought after by India's top employers." />

      <section className="container-academic py-16 grid md:grid-cols-4 gap-5">
        {[
          { icon: TrendingUp, n: "98%", l: "Placement Rate" },
          { icon: IndianRupee, n: "₹ 28 LPA", l: "Highest Package" },
          { icon: Briefcase, n: "₹ 14.5 LPA", l: "Average Package" },
          { icon: Building2, n: "150+", l: "Recruiters" },
        ].map((s) => (
          <div key={s.l} className="bg-card border border-border rounded-lg p-6 text-center">
            <s.icon className="h-9 w-9 text-gold mx-auto" />
            <div className="font-serif text-3xl font-bold text-primary mt-3">{s.n}</div>
            <div className="text-sm text-muted-foreground mt-1 uppercase tracking-wider">{s.l}</div>
          </div>
        ))}
      </section>

      <section className="bg-secondary py-16">
        <div className="container-academic">
          <h2 className="font-serif text-3xl font-bold text-primary text-center">Our Recruiting Partners</h2>
          <p className="text-center text-muted-foreground mt-2">Where our graduates begin their careers</p>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {recruiters.map((r) => (
              <div key={r} className="bg-card border border-border rounded-lg py-5 text-center font-semibold text-primary hover:border-gold transition-colors">
                {r}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-academic py-16">
        <h2 className="font-serif text-3xl font-bold text-primary text-center mb-10">Sector-wise Recruitment</h2>
        <div className="space-y-4 max-w-2xl mx-auto">
          {[
            { s: "Consulting", v: 28 },
            { s: "BFSI", v: 24 },
            { s: "IT & Technology", v: 18 },
            { s: "FMCG / Retail", v: 14 },
            { s: "Manufacturing", v: 9 },
            { s: "Others", v: 7 },
          ].map((b) => (
            <div key={b.s}>
              <div className="flex justify-between text-sm font-medium text-foreground"><span>{b.s}</span><span>{b.v}%</span></div>
              <div className="h-2.5 bg-muted rounded-full mt-1.5 overflow-hidden">
                <div className="h-full bg-gold rounded-full" style={{ width: `${b.v * 3}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
