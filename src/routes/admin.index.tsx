import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, MessagesSquare, LifeBuoy } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: Overview,
});

function Overview() {
  const [counts, setCounts] = useState({ students: 0, results: 0, enquiries: 0, support: 0 });

  useEffect(() => {
    (async () => {
      const [s, r, e, t] = await Promise.all([
        supabase.from("students").select("*", { count: "exact", head: true }),
        supabase.from("results").select("*", { count: "exact", head: true }),
        supabase.from("enquiries").select("*", { count: "exact", head: true }),
        supabase.from("support_tickets").select("*", { count: "exact", head: true }),
      ]);
      setCounts({
        students: s.count ?? 0,
        results: r.count ?? 0,
        enquiries: e.count ?? 0,
        support: t.count ?? 0,
      });
    })();
  }, []);

  const cards = [
    { label: "Students", value: counts.students, icon: Users },
    { label: "Result Records", value: counts.results, icon: FileText },
    { label: "Enquiries", value: counts.enquiries, icon: MessagesSquare },
    { label: "Support Tickets", value: counts.support, icon: LifeBuoy },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-primary mb-1">Dashboard Overview</h1>
      <p className="text-muted-foreground mb-6">Welcome to the Shree Management Autonomous admin console.</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Card key={c.label} className="shadow-elegant">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{c.label}</CardTitle>
              <c.icon className="h-5 w-5 text-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{c.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
