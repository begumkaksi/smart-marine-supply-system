import { Anchor, MapPin, ShieldCheck } from "lucide-react";

import { ActionButton } from "@/components/action-button";
import { AppShell } from "@/components/app-shell";
import { SupplierScoreChart } from "@/components/charts";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { pageSummaries, suppliers } from "@/lib/data";

export default function SuppliersPage() {
  const summary = pageSummaries.suppliers;

  return (
    <AppShell>
      <PageHeader {...summary} />
      <section className="mb-6 flex flex-col gap-3 rounded-lg border bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {["All ports", "Preferred", "Low risk", "Fast lead time"].map((filter) => (
            <ActionButton key={filter} variant="outline" size="sm" iconName="filter" message={`${filter} supplier filter applied.`}>
              {filter}
            </ActionButton>
          ))}
        </div>
        <ActionButton iconName="sliders" href="/optimization" message="Opening AI scoring weights.">
          Scoring Weights
        </ActionButton>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle>Supplier Shortlist</CardTitle>
            <CardDescription>AI-ranked commercial and operational fit.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {suppliers.map((supplier) => (
              <div key={supplier.name} className="rounded-lg border bg-white p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Anchor className="h-4 w-4 text-cyan-700" />
                      <p className="font-semibold">{supplier.name}</p>
                      <Badge variant={supplier.status === "Watch" ? "warning" : "success"}>{supplier.status}</Badge>
                    </div>
                    <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      {supplier.region} supply network
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <span>{supplier.lead}</span>
                    <span>{supplier.savings}</span>
                    <span>{supplier.score}/100</span>
                  </div>
                </div>
                <div className="mt-4">
                  <Progress value={supplier.score} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass-panel">
          <CardHeader>
            <CardTitle>Selection Factors</CardTitle>
            <CardDescription>Weighted score for the top supplier match.</CardDescription>
          </CardHeader>
          <CardContent>
            <SupplierScoreChart />
            <div className="mt-5 rounded-lg border bg-white p-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                <div>
                  <p className="text-sm font-semibold">Compliance verified</p>
                  <p className="text-sm text-muted-foreground">ISO, hazmat, and port documentation checked.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </AppShell>
  );
}
