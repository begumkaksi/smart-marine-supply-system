import { CalendarClock, PackageSearch, TrendingUp } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { DemandChart } from "@/components/charts";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { pageSummaries } from "@/lib/data";

export default function DemandPage() {
  const summary = pageSummaries.demand;

  return (
    <AppShell>
      <PageHeader {...summary} />
      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <Card className="glass-panel">
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Route-Based Forecast</CardTitle>
              <CardDescription>Projected demand by category for upcoming vessel calls.</CardDescription>
            </div>
            <Badge variant="info">6-week horizon</Badge>
          </CardHeader>
          <CardContent>
            <DemandChart />
          </CardContent>
        </Card>

        <Card className="glass-panel">
          <CardHeader>
            <CardTitle>Forecast Drivers</CardTitle>
            <CardDescription>Signals influencing the current prediction.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Crew count variance", value: 82, icon: TrendingUp },
              { label: "Seasonal consumption", value: 73, icon: CalendarClock },
              { label: "Historical order match", value: 91, icon: PackageSearch }
            ].map((driver) => {
              const Icon = driver.icon;
              return (
                <div key={driver.label} className="rounded-lg border bg-white p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4 text-cyan-700" />
                      <span className="text-sm font-semibold">{driver.label}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{driver.value}%</span>
                  </div>
                  <Progress value={driver.value} />
                </div>
              );
            })}
          </CardContent>
        </Card>
      </section>
    </AppShell>
  );
}
