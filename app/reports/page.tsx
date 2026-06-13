import { Download, FileText, PieChart, TrendingUp } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { CategorySpendChart, SavingsChart } from "@/components/charts";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { pageSummaries } from "@/lib/data";

export default function ReportsPage() {
  const summary = pageSummaries.reports;

  return (
    <AppShell>
      <PageHeader {...summary} />
      <section className="mb-6 grid gap-4 md:grid-cols-3">
        {[
          { label: "Savings capture", value: "84%", icon: TrendingUp },
          { label: "Forecast accuracy", value: "91%", icon: PieChart },
          { label: "Export-ready reports", value: "12", icon: FileText }
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.label} className="glass-panel">
              <CardContent className="flex items-center justify-between p-5">
                <div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="mt-2 text-3xl font-semibold">{item.value}</p>
                </div>
                <Icon className="h-6 w-6 text-cyan-700" />
              </CardContent>
            </Card>
          );
        })}
      </section>
      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <Card className="glass-panel">
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Executive Spend Report</CardTitle>
              <CardDescription>Baseline versus optimized procurement by month.</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </CardHeader>
          <CardContent>
            <SavingsChart />
          </CardContent>
        </Card>
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle>Spend Mix</CardTitle>
            <CardDescription>Procurement performance by category.</CardDescription>
          </CardHeader>
          <CardContent>
            <CategorySpendChart />
            <Badge variant="success">Engine parts savings improved 12%</Badge>
          </CardContent>
        </Card>
      </section>
    </AppShell>
  );
}
