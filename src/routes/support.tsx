import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, LifeBuoy, Phone, Mail, MessageSquare } from "lucide-react";

const schema = z.object({
  full_name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  category: z.string().min(1),
  subject: z.string().trim().min(3).max(150),
  message: z.string().trim().min(10).max(2000),
});

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Student Support — Shree Management Autonomous" },
      { name: "description", content: "Need help? Reach our support team for academics, fees, hostel, IT, library and other queries." },
      { property: "og:title", content: "Student Support — Shree Management" },
      { property: "og:description", content: "Get help on academics, fees, hostel, IT, library and other queries." },
    ],
  }),
  component: Support,
});

function Support() {
  const [form, setForm] = useState({ full_name: "", email: "", category: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please fill all fields correctly");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from("support_tickets").insert(parsed.data);
      if (error) throw error;
      toast.success("Support ticket raised. We'll respond within 24 hours.");
      setForm({ full_name: "", email: "", category: "", subject: "", message: "" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <PageHeader title="Student Support" subtitle="We're here to help you, every step of the way." />

      <section className="container-academic py-12 grid md:grid-cols-3 gap-5">
        {[
          { icon: Phone, t: "Helpdesk", d: "+91 98765 43210", s: "Mon-Sat, 9 AM - 6 PM" },
          { icon: Mail, t: "Email Support", d: "support@shreemanagement.edu.in", s: "Reply within 24 hours" },
          { icon: MessageSquare, t: "Walk-In", d: "Admin Block, Ground Floor", s: "Mon-Sat, 10 AM - 5 PM" },
        ].map((c) => (
          <div key={c.t} className="bg-card border border-border rounded-lg p-6">
            <div className="h-11 w-11 rounded-lg bg-gold-soft text-primary flex items-center justify-center"><c.icon className="h-5 w-5" /></div>
            <h3 className="font-serif text-lg font-bold text-primary mt-4">{c.t}</h3>
            <p className="text-foreground font-medium mt-1">{c.d}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{c.s}</p>
          </div>
        ))}
      </section>

      <section className="container-academic pb-16">
        <div className="max-w-2xl mx-auto bg-card border border-border rounded-lg p-6 md:p-8 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-11 w-11 rounded-lg bg-primary text-primary-foreground flex items-center justify-center"><LifeBuoy className="h-5 w-5" /></div>
            <div>
              <h2 className="font-serif text-xl font-bold text-primary">Raise a Support Ticket</h2>
              <p className="text-xs text-muted-foreground">We'll get back to you within 24 hours</p>
            </div>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="n">Full Name *</Label>
                <Input id="n" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} required maxLength={100} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="e">Email *</Label>
                <Input id="e" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required maxLength={255} className="mt-1.5" />
              </div>
            </div>
            <div>
              <Label htmlFor="cat">Category *</Label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                <SelectTrigger id="cat" className="mt-1.5"><SelectValue placeholder="Select a category" /></SelectTrigger>
                <SelectContent>
                  {["Academics", "Examination & Results", "Fees & Accounts", "Hostel & Mess", "Library", "IT / Wi-Fi", "Placements", "Other"].map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="s">Subject *</Label>
              <Input id="s" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required maxLength={150} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="m">Describe your issue *</Label>
              <Textarea id="m" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required maxLength={2000} rows={5} className="mt-1.5" />
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary-deep h-11 text-base font-semibold">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit Ticket"}
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  );
}
