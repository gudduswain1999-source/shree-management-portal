import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/site/Layout";
import { Target, Eye, Heart, Award } from "lucide-react";
import library from "@/assets/library.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Shree Management Autonomous" },
      { name: "description", content: "Learn about Shree Management Autonomous Institute — our history, vision, mission, and 25+ years of management education excellence." },
      { property: "og:title", content: "About Shree Management Autonomous" },
      { property: "og:description", content: "Our history, vision, mission, and legacy of management education excellence." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <Layout>
      <PageHeader title="About Our Institute" subtitle="A legacy of management education built on excellence, integrity, and innovation." />

      <section className="container-academic py-16 grid lg:grid-cols-2 gap-12 items-center">
        <img src={library} alt="Institute library" width={1280} height={832} loading="lazy" className="rounded-lg shadow-[var(--shadow-elegant)]" />
        <div>
          <p className="text-gold font-semibold uppercase tracking-widest text-sm">Our Story</p>
          <h2 className="font-serif text-3xl font-bold text-primary mt-2">Founded on a Vision of Excellence</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Established in 1998 by visionary educationists, Shree Management Autonomous Institute
            began with a simple promise — to deliver world-class management education that prepares
            students for the realities of the global business environment.
          </p>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Today, we are proud to be one of India's most respected autonomous institutes, with
            12,000+ alumni occupying leadership positions in top organizations across the world.
          </p>
        </div>
      </section>

      <section className="bg-secondary py-16">
        <div className="container-academic grid md:grid-cols-3 gap-6">
          {[
            { icon: Target, t: "Our Mission", d: "To develop ethical, responsible, and competent business leaders who create lasting value for society." },
            { icon: Eye, t: "Our Vision", d: "To be a globally recognized centre of excellence in management education and research by 2030." },
            { icon: Heart, t: "Our Values", d: "Integrity, excellence, innovation, inclusivity and social responsibility guide everything we do." },
          ].map((b) => (
            <div key={b.t} className="bg-card p-7 rounded-lg border border-border">
              <div className="h-12 w-12 rounded-lg bg-gold-soft text-primary flex items-center justify-center"><b.icon className="h-6 w-6" /></div>
              <h3 className="font-serif text-xl font-bold text-primary mt-4">{b.t}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-academic py-16">
        <h2 className="font-serif text-3xl font-bold text-primary text-center">Accreditations & Recognitions</h2>
        <div className="grid md:grid-cols-4 gap-5 mt-10">
          {["AICTE Approved", "NAAC A+", "UGC Recognized", "ISO 9001:2015"].map((a) => (
            <div key={a} className="flex flex-col items-center gap-3 p-6 rounded-lg border-2 border-gold/30 bg-gold-soft/30">
              <Award className="h-10 w-10 text-gold" />
              <span className="font-semibold text-primary text-center">{a}</span>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
