import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { GraduationCap, Award, Users, BookOpen, ArrowRight, CheckCircle2, Building2, Trophy } from "lucide-react";
import campus from "@/assets/campus-hero.jpg";
import classroom from "@/assets/students-classroom.jpg";
import grad from "@/assets/graduation.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shree Management Autonomous — Premier B-School in India" },
      { name: "description", content: "Shree Management Autonomous Institute offers AICTE-approved MBA & PGDM programs with world-class faculty, 100% placement assistance, and a vibrant campus." },
      { property: "og:title", content: "Shree Management Autonomous — Premier B-School" },
      { property: "og:description", content: "AICTE-approved MBA & PGDM programs with world-class faculty and excellent placements." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative">
        <img src={campus} alt="Shree Management campus" width={1920} height={1024} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ backgroundImage: "var(--gradient-hero)" }} />
        <div className="relative container-academic py-24 md:py-36 text-primary-foreground">
          <p className="inline-block px-3 py-1 rounded-full bg-gold text-gold-foreground text-xs font-semibold tracking-wider uppercase mb-5">
            Est. 1998 · Autonomous Institute
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold max-w-3xl leading-tight">
            Shaping Tomorrow's <span className="text-gradient-gold">Business Leaders</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-primary-foreground/85">
            A legacy of academic excellence, industry partnerships, and holistic
            development — preparing you for a successful career in management.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90 font-semibold">
              <Link to="/admissions">Apply for Admission <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground/40 hover:bg-primary-foreground/10">
              <Link to="/academics">Explore Programs</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-card border-b border-border">
        <div className="container-academic py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { n: "25+", l: "Years of Excellence" },
            { n: "12,000+", l: "Alumni Worldwide" },
            { n: "98%", l: "Placement Rate" },
            { n: "150+", l: "Recruiting Partners" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="font-serif text-3xl md:text-4xl font-bold text-primary">{s.n}</div>
              <div className="text-xs md:text-sm uppercase tracking-wider text-muted-foreground mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Programs */}
      <section className="container-academic py-20">
        <div className="text-center mb-12">
          <p className="text-gold font-semibold uppercase tracking-widest text-sm">Programs</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mt-2">Choose Your Path</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: GraduationCap, title: "MBA", desc: "Two-year full-time MBA with 8 specializations including Finance, Marketing, HR, and Analytics." },
            { icon: BookOpen, title: "PGDM", desc: "AICTE-approved Post Graduate Diploma in Management with industry-aligned curriculum." },
            { icon: Award, title: "Executive MBA", desc: "Weekend program designed for working professionals seeking career acceleration." },
          ].map((p) => (
            <div key={p.title} className="bg-card rounded-lg p-7 border border-border hover:border-gold transition-all hover:shadow-[var(--shadow-elegant)] group">
              <div className="h-12 w-12 rounded-lg bg-accent flex items-center justify-center text-primary group-hover:bg-gold group-hover:text-gold-foreground transition-colors">
                <p.icon className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-primary mt-5">{p.title}</h3>
              <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{p.desc}</p>
              <Link to="/academics" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-gold">
                Learn more <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* About strip */}
      <section className="bg-secondary">
        <div className="container-academic py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img src={classroom} alt="Students in classroom" width={1280} height={832} loading="lazy" className="rounded-lg shadow-[var(--shadow-elegant)] w-full" />
          </div>
          <div>
            <p className="text-gold font-semibold uppercase tracking-widest text-sm">About Us</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mt-2">A Legacy of Management Excellence</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Founded in 1998, Shree Management Autonomous Institute has been at the
              forefront of management education in India. Our pedagogy blends
              theoretical rigor with experiential learning to produce industry-ready
              graduates.
            </p>
            <ul className="mt-6 space-y-3">
              {["NAAC A+ Accredited", "AICTE Approved", "Industry-Integrated Curriculum", "Global Exchange Programs"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-foreground">
                  <CheckCircle2 className="h-5 w-5 text-gold shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <Button asChild className="mt-7 bg-primary hover:bg-primary-deep">
              <Link to="/about">Learn About Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="container-academic py-20">
        <div className="text-center mb-12">
          <p className="text-gold font-semibold uppercase tracking-widest text-sm">Why Shree</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mt-2">A Difference You Can Feel</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Users, t: "Eminent Faculty", d: "PhDs from IIMs, IITs and top global universities." },
            { icon: Building2, t: "Modern Campus", d: "Smart classrooms, library and residential facilities." },
            { icon: Trophy, t: "Award-Winning", d: "Ranked among top 50 B-schools nationally." },
            { icon: Award, t: "Strong Network", d: "12,000+ alumni in leadership roles globally." },
          ].map((f) => (
            <div key={f.t} className="text-center p-6 rounded-lg border border-border bg-card hover:shadow-[var(--shadow-card)] transition-shadow">
              <div className="mx-auto h-14 w-14 rounded-full bg-gold-soft flex items-center justify-center text-primary">
                <f.icon className="h-7 w-7" />
              </div>
              <h3 className="font-serif text-lg font-bold text-primary mt-4">{f.t}</h3>
              <p className="text-sm text-muted-foreground mt-2">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <img src={grad} alt="" width={1280} height={832} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-primary/85" />
        <div className="relative container-academic py-20 text-center text-primary-foreground">
          <h2 className="font-serif text-3xl md:text-4xl font-bold">Begin Your Journey With Us</h2>
          <p className="mt-3 text-primary-foreground/80 max-w-xl mx-auto">
            Admissions for the 2025-2027 batch are now open. Apply today and join India's leading B-school community.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90 font-semibold">
              <Link to="/admissions">Apply Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/enquiry">Make an Enquiry</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
