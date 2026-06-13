import { ArrowRight, BrainCircuit, CheckCircle2, Database, ListChecks, Sparkles, UploadCloud } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { pageSummaries } from "@/lib/data";

export default function AiAnalysisPage() {
  const summary = pageSummaries.aiAnalysis;
  const workflow = [
    { title: "Upload Supply List", icon: UploadCloud, progress: 100, note: "CSV, Excel, drag-and-drop, or manual entry." },
    { title: "Data Cleaning", icon: Database, progress: 96, note: "Normalize units, item names, quantities, and duplicate lines." },
    { title: "Demand Prediction", icon: BrainCircuit, progress: 91, note: "Forecast category demand by vessel, route, and seasonality." },
    { title: "Supplier Evaluation", icon: ListChecks, progress: 88, note: "Score suppliers on price, lead time, reliability, and stock depth." },
    { title: "Optimized Recommendation", icon: Sparkles, progress: 94, note: "Generate supplier split, expected savings, and delivery risk." }
  ];

  return (
    <AppShell>
      <PageHeader {...summary} />
      <section className="grid gap-4 lg:grid-cols-5">
        {workflow.map((step, index) => {
          const Icon = step.icon;
          return (
            <Card key={step.title} className="glass-panel">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-50 text-cyan-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <Badge variant="info">Step {index + 1}</Badge>
                </div>
                <p className="mt-5 min-h-10 text-sm font-semibold">{step.title}</p>
                <p className="mt-2 min-h-16 text-sm leading-5 text-muted-foreground">{step.note}</p>
                <Progress value={step.progress} className="mt-4" />
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle>Workflow Trace</CardTitle>
            <CardDescription>Every AI decision remains reviewable by procurement managers.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {workflow.map((step, index) => (
              <div key={step.title} className="flex items-center gap-3 rounded-lg border bg-white p-4">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <span className="text-sm font-semibold">{step.title}</span>
                {index < workflow.length - 1 ? <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" /> : null}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass-panel">
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Optimized Recommendation</CardTitle>
              <CardDescription>Best current award plan for the active requisition batch.</CardDescription>
            </div>
            <Badge variant="success">94% confidence</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              ["Primary supplier", "Atlas Ship Chandlers"],
              ["Backup supplier", "NordPort Marine"],
              ["Expected saving", "23.8%"],
              ["Lead time reduction", "31%"],
              ["Risk posture", "Low"]
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between rounded-lg border bg-white p-4 text-sm">
                <span className="font-semibold">{label}</span>
                <span className="text-muted-foreground">{value}</span>
              </div>
            ))}
            <Button>
              Send to Optimization
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </section>
    </AppShell>
  );
}
