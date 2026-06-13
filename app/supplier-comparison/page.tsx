import { CheckCircle2, GitCompareArrows } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { comparisonSuppliers, pageSummaries } from "@/lib/data";

export default function SupplierComparisonPage() {
  const summary = pageSummaries.supplierComparison;

  return (
    <AppShell>
      <PageHeader {...summary} />
      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle>Supplier Comparison Matrix</CardTitle>
            <CardDescription>Cost, delivery, reliability, stock availability, and overall score.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-lg border bg-white">
              <div className="grid min-w-[820px] grid-cols-[1.4fr_0.7fr_0.9fr_0.9fr_1fr_0.8fr] bg-muted px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                <span>Supplier</span>
                <span>Cost</span>
                <span>Delivery Time</span>
                <span>Reliability</span>
                <span>Stock Availability</span>
                <span>Overall Score</span>
              </div>
              {comparisonSuppliers.map((supplier) => (
                <div key={supplier.supplier} className="grid min-w-[820px] grid-cols-[1.4fr_0.7fr_0.9fr_0.9fr_1fr_0.8fr] items-center border-t px-4 py-3 text-sm">
                  <span className="font-semibold">{supplier.supplier}</span>
                  <span>{supplier.cost}</span>
                  <span>{supplier.deliveryTime}</span>
                  <span>{supplier.reliability}</span>
                  <Badge variant={supplier.stockAvailability === "High" ? "success" : "info"}>
                    {supplier.stockAvailability}
                  </Badge>
                  <span className="font-semibold text-cyan-700">{supplier.overallScore}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel">
          <CardHeader>
            <CardTitle>Best Match</CardTitle>
            <CardDescription>Recommended supplier based on the comparison table.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border bg-white p-5">
              <div className="flex items-center gap-3">
                <GitCompareArrows className="h-5 w-5 text-cyan-700" />
                <p className="font-semibold">NordPort Marine</p>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Highest overall score with strong reliability, high stock availability, and competitive delivery time.
              </p>
            </div>
            {[
              ["Cost", 91],
              ["Delivery Time", 92],
              ["Reliability", 96],
              ["Stock Availability", 95]
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border bg-white p-4">
                <div className="mb-3 flex items-center justify-between text-sm">
                  <span className="font-semibold">{label}</span>
                  <span className="text-muted-foreground">{value}%</span>
                </div>
                <Progress value={Number(value)} />
              </div>
            ))}
            <div className="flex items-center gap-2 rounded-lg border bg-emerald-50 p-4 text-sm font-semibold text-emerald-700">
              <CheckCircle2 className="h-5 w-5" />
              Ready for procurement approval
            </div>
          </CardContent>
        </Card>
      </section>
    </AppShell>
  );
}
