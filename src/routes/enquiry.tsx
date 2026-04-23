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
import { Loader2, MailQuestion } from "lucide-react";

const schema = z.object({
  full_name: z.string().trim().min(2, "Name is too short").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(7, "Invalid phone").max(20).regex(/^[0-9+\-\s()]+$/, "Invalid phone"),
  course: z.string().min(1, "Please select a course"),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

export const Route = createFileRoute("/enquiry")({
  head: () => ({
    meta: [
      { title: "Admission Enquiry — Shree Management Autonomous" },
      { name: "description", content: "Have questions about our MBA, PGDM or Executive MBA programs? Submit an enquiry and our admissions team will get back to you." },
      { property: "og:title", content: "Make an Enquiry — Shree Management" },
      { property: "og:description", content: "Submit an admission enquiry and our team will get back to you." },
    ],
  }),
  component: Enquiry,
});

function Enquiry() {
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", course: "", message: "" });
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from("enquiries").insert({
        full_name: parsed.data.full_name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        course: parsed.data.course,
        message: parsed.data.message || null,
      });
      if (error) throw error;
      toast.success("Enquiry submitted! Our team will reach out shortly.");
      setForm({ full_name: "", email: "", phone: "", course: "", message: "" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <PageHeader title="Admission Enquiry" subtitle="Tell us a bit about yourself and we'll be in touch." />

      <section className="container-academic py-12">
        <div className="max-w-2xl mx-auto bg-card border border-border rounded-lg p-6 md:p-8 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-11 w-11 rounded-lg bg-gold text-gold-foreground flex items-center justify-center"><MailQuestion className="h-5 w-5" /></div>
            <div>
              <h2 className="font-serif text-xl font-bold text-primary">Enquiry Form</h2>
              <p className="text-xs text-muted-foreground">All fields marked * are required</p>
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
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="p">Phone *</Label>
                <Input id="p" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required maxLength={20} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="c">Interested Course *</Label>
                <Select value={form.course} onValueChange={(v) => setForm({ ...form, course: v })}>
                  <SelectTrigger id="c" className="mt-1.5"><SelectValue placeholder="Select course" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MBA">MBA</SelectItem>
                    <SelectItem value="PGDM">PGDM</SelectItem>
                    <SelectItem value="Executive MBA">Executive MBA</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="m">Message</Label>
              <Textarea id="m" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} maxLength={1000} rows={4} className="mt-1.5" placeholder="Anything you'd like to ask?" />
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary-deep h-11 text-base font-semibold">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit Enquiry"}
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  );
}
