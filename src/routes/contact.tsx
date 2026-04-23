import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/site/Layout";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Shree Management Autonomous" },
      { name: "description", content: "Get in touch with Shree Management Autonomous Institute. Address, phone, email and office hours." },
      { property: "og:title", content: "Contact Shree Management" },
      { property: "og:description", content: "Address, phone, email and office hours." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <Layout>
      <PageHeader title="Contact Us" subtitle="We'd love to hear from you." />

      <section className="container-academic py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { icon: MapPin, t: "Address", d: "Shree Campus Road, Pune, Maharashtra 411001" },
          { icon: Phone, t: "Phone", d: "+91 98765 43210\n+91 20 1234 5678" },
          { icon: Mail, t: "Email", d: "info@shreemanagement.edu.in\nadmissions@shreemanagement.edu.in" },
          { icon: Clock, t: "Office Hours", d: "Mon - Sat\n9:00 AM — 6:00 PM" },
        ].map((c) => (
          <div key={c.t} className="bg-card border border-border rounded-lg p-6 text-center">
            <div className="h-12 w-12 rounded-full bg-gold-soft text-primary mx-auto flex items-center justify-center"><c.icon className="h-6 w-6" /></div>
            <h3 className="font-serif text-lg font-bold text-primary mt-4">{c.t}</h3>
            <p className="text-sm text-muted-foreground mt-2 whitespace-pre-line">{c.d}</p>
          </div>
        ))}
      </section>

      <section className="container-academic pb-20">
        <div className="rounded-lg overflow-hidden border border-border shadow-[var(--shadow-card)]">
          <iframe
            title="Campus map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=73.83%2C18.51%2C73.88%2C18.55&layer=mapnik"
            className="w-full h-96"
          />
        </div>
      </section>
    </Layout>
  );
}
