import { ArrowRight, BrainCircuit, CheckCircle2, DollarSign, Gauge, TimerReset } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { optimizationWeights, pageSummaries } from "@/lib/data";

export default function OptimizationPage() {
  const summary = pageSummaries.optimization;
  const scenarios = [
    { name: "Lowest landed cost", score: 91, savings: "$118K", risk: "Medium" },
    { name: "Balanced resilience", score: 96, savings: "$96K", risk: "Low" },
    { name: "Fastest fulfillment", score: 87, savings: "$61K", risk: "Low" }
  ];

  return (
    <AppShell>
      <PageHeader {...summary} />
      <section className="grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle>AI Scoring</CardTitle>
            <CardDescription>Weighted decision model used to rank supplier recommendations.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {optimizationWeights.map((input) => {
              const icons = {
                Cost: DollarSign,
                "Delivery Time": TimerReset,
                Reliability: Gauge,
                "Stock Availability": BrainCircuit
              };
              const Icon = icons[input.label as keyof typeof icons];
              return (
                <div key={input.label} className="rounded-lg border bg-white p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-cyan-700" />
                      <span className="text-sm font-semibold">{input.label}</span>
                    </div>
                    <span className="text-sm font-semibold text-cyan-700">{input.value}%</span>
                  </div>
                  <Progress value={input.value} />
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="glass-panel">
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Recommended Scenario</CardTitle>
              <CardDescription>Balanced resilience is currently the best commercial decision.</CardDescription>
            </div>
            <Badge variant="success">Recommended</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            {scenarios.map((scenario) => (
              <div key={scenario.name} className="rounded-lg border bg-white p-4">
                <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold">{scenario.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Savings {scenario.savings} · {scenario.risk} risk
                    </p>
                  </div>
                  <Badge variant={scenario.name === "Balanced resilience" ? "success" : "outline"}>
                    {scenario.score}/100
                  </Badge>
                </div>
                <Progress value={scenario.score} />
              </div>
            ))}
            <Button className="mt-2">
              Generate Purchase Plan
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {["Reduce duplicate vendor lines", "Split critical parts by port", "Lock price holds for 48 hours"].map((item) => (
          <div key={item} className="flex items-center gap-3 rounded-lg border bg-white p-4 shadow-sm">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            <span className="text-sm font-semibold">{item}</span>
          </div>
        ))}
      </section>
    </AppShell>
  );
}
