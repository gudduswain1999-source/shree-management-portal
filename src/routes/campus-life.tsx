import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/site/Layout";
import library from "@/assets/library.jpg";
import classroom from "@/assets/students-classroom.jpg";
import grad from "@/assets/graduation.jpg";
import campus from "@/assets/campus-hero.jpg";
import { Home, BookOpen, Trophy, Utensils, Wifi, Heart } from "lucide-react";

export const Route = createFileRoute("/campus-life")({
  head: () => ({
    meta: [
      { title: "Campus Life — Shree Management Autonomous" },
      { name: "description", content: "Discover life on the Shree Management campus — hostels, library, sports, clubs, fests and more." },
      { property: "og:title", content: "Campus Life at Shree Management" },
      { property: "og:description", content: "Hostels, library, sports, clubs and student festivals." },
      { property: "og:image", content: campus },
    ],
  }),
  component: CampusLife,
});

const features = [
  { icon: Home, t: "Residential Halls", d: "Modern, safe and comfortable hostels for boys and girls with 24/7 security." },
  { icon: BookOpen, t: "Library", d: "Over 50,000 books, e-journals and digital resources across business disciplines." },
  { icon: Trophy, t: "Sports Complex", d: "Cricket, football, basketball, tennis courts, and a fully-equipped gymnasium." },
  { icon: Utensils, t: "Food Court", d: "Multi-cuisine dining hall with hygienic and affordable meals." },
  { icon: Wifi, t: "Wi-Fi Campus", d: "High-speed internet across the entire campus including hostels." },
  { icon: Heart, t: "Wellness", d: "On-campus health center, counseling and mental wellness support." },
];

function CampusLife() {
  return (
    <Layout>
      <PageHeader title="Campus Life" subtitle="A vibrant community where learning extends beyond the classroom." />

      <section className="container-academic py-16">
        <div className="grid md:grid-cols-3 gap-3">
          {[campus, classroom, library, grad, classroom, library].map((src, i) => (
            <img key={i} src={src} alt="Campus moment" loading="lazy" className={`rounded-lg w-full h-56 object-cover ${i === 0 ? "md:col-span-2 md:h-72" : ""}`} />
          ))}
        </div>
      </section>

      <section className="bg-secondary py-16">
        <div className="container-academic">
          <h2 className="font-serif text-3xl font-bold text-primary text-center">Facilities & Amenities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {features.map((f) => (
              <div key={f.t} className="bg-card border border-border rounded-lg p-6">
                <div className="h-11 w-11 rounded-lg bg-gold-soft text-primary flex items-center justify-center"><f.icon className="h-5 w-5" /></div>
                <h3 className="font-serif text-lg font-bold text-primary mt-4">{f.t}</h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-academic py-16">
        <h2 className="font-serif text-3xl font-bold text-primary text-center">Student Clubs & Festivals</h2>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {["Marketing Club", "Finance Forum", "Consulting Cell", "Entrepreneurship Cell", "Cultural Club", "Sports Council", "Literary Society", "Social Impact Club"].map((c) => (
            <div key={c} className="border-2 border-dashed border-gold/40 rounded-lg p-5 text-center bg-gold-soft/20">
              <p className="font-serif text-lg font-bold text-primary">{c}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
