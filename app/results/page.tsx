import { Award, CircleDollarSign, Clock3, ShieldCheck } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { CostSavingsTrendChart, SupplierPerformanceChart } from "@/components/charts";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { pageSummaries } from "@/lib/data";

export default function ResultsPage() {
  const summary = pageSummaries.results;

  return (
    <AppShell>
      <PageHeader {...summary} />
      <section className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Awarded savings", value: "$486K", icon: CircleDollarSign },
          { label: "Fulfillment confidence", value: "94%", icon: ShieldCheck },
          { label: "Lead time reduced", value: "31%", icon: Clock3 },
          { label: "Best supplier score", value: "96", icon: Award }
        ].map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.label} className="glass-panel">
              <CardContent className="flex items-center justify-between p-5">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className="mt-2 text-3xl font-semibold">{metric.value}</p>
                </div>
                <Icon className="h-6 w-6 text-cyan-700" />
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle>Optimization Results</CardTitle>
            <CardDescription>Final recommendations and expected operational impact.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              ["NordPort Marine", "Provisions", "23% saving", 96],
              ["Atlas Ship Chandlers", "Engine", "28% saving", 94],
              ["Marisafe Technical", "Safety", "19% saving", 90],
              ["Harborline Logistics", "Deck", "21% saving", 89]
            ].map(([supplier, category, saving, score]) => (
              <div key={supplier} className="rounded-lg border bg-white p-4">
                <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold">{supplier}</p>
                    <p className="text-sm text-muted-foreground">{category} · {saving}</p>
                  </div>
                  <Badge variant="success">{score}/100</Badge>
                </div>
                <Progress value={Number(score)} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass-panel">
          <CardHeader>
            <CardTitle>Supplier Performance</CardTitle>
            <CardDescription>Results view of reliability and delivery strength.</CardDescription>
          </CardHeader>
          <CardContent>
            <SupplierPerformanceChart />
          </CardContent>
        </Card>
      </section>

      <section className="mt-6">
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle>Cost Savings Trend</CardTitle>
            <CardDescription>Captured savings after optimization approval.</CardDescription>
          </CardHeader>
          <CardContent>
            <CostSavingsTrendChart />
          </CardContent>
        </Card>
      </section>
    </AppShell>
  );
}
