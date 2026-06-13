"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, BrainCircuit, CheckCircle2, Clock3, Database, ListChecks, Sparkles, UploadCloud } from "lucide-react";

import { useToast } from "@/components/providers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const workflow = [
  { title: "Upload Supply List", icon: UploadCloud, note: "CSV, Excel, drag-and-drop, or manual entry." },
  { title: "Data Cleaning", icon: Database, note: "Normalize units, item names, quantities, and duplicate lines." },
  { title: "Demand Prediction", icon: BrainCircuit, note: "Forecast category demand by vessel, route, and seasonality." },
  { title: "Supplier Evaluation", icon: ListChecks, note: "Score suppliers on price, lead time, reliability, and stock depth." },
  { title: "Optimized Recommendation", icon: Sparkles, note: "Generate supplier split, expected savings, and delivery risk." }
];

export function AiAnalysisWorkflow() {
  const router = useRouter();
  const { notify } = useToast();
  const [running, setRunning] = useState(false);
  const [completedSteps, setCompletedSteps] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  function runAnalysis() {
    if (running) {
      return;
    }
    setRunning(true);
    setIsComplete(false);
    setCompletedSteps(0);
    notify("AI analysis started.");

    workflow.forEach((_, index) => {
      window.setTimeout(() => {
        setCompletedSteps(index + 1);
        if (index === workflow.length - 1) {
          setRunning(false);
          setIsComplete(true);
          notify("AI analysis completed.");
          notify("Supplier recommendation generated.");
        }
      }, 700 * (index + 1));
    });
  }

  return (
    <>
      <section className="grid gap-4 lg:grid-cols-5">
        {workflow.map((step, index) => {
          const Icon = step.icon;
          const done = completedSteps > index;
          const active = running && completedSteps === index;
          return (
            <Card key={step.title} className="glass-panel">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-50 text-cyan-700">
                    {done ? <CheckCircle2 className="h-5 w-5 text-emerald-600" /> : active ? <Clock3 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                  </div>
                  <Badge variant={done ? "success" : active ? "info" : "outline"}>{done ? "Done" : `Step ${index + 1}`}</Badge>
                </div>
                <p className="mt-5 min-h-10 text-sm font-semibold">{step.title}</p>
                <p className="mt-2 min-h-16 text-sm leading-5 text-muted-foreground">{step.note}</p>
                <Progress value={done ? 100 : active ? 55 : 0} className="mt-4" />
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Card className="glass-panel">
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Workflow Trace</CardTitle>
              <CardDescription>Every AI decision remains reviewable by procurement managers.</CardDescription>
            </div>
            <Button onClick={runAnalysis} disabled={running}>
              <BrainCircuit className="h-4 w-4" />
              {running ? "Running..." : "Run AI Analysis"}
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {workflow.map((step, index) => (
              <div key={step.title} className="flex items-center gap-3 rounded-lg border bg-white p-4">
                {completedSteps > index ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                ) : (
                  <Clock3 className="h-5 w-5 text-muted-foreground" />
                )}
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
            <Badge variant={isComplete ? "success" : "outline"}>{isComplete ? "94% confidence" : "Pending"}</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            {isComplete ? (
              <>
                {[
                  ["Primary supplier", "Atlas Ship Chandlers"],
                  ["Backup supplier", "NordPort Marine"],
                  ["Expected saving", "23.8%"],
                  ["Lead time reduction", "31%"],
                  ["Risk posture", "Low"],
                  ["Confidence score", "94%"]
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between rounded-lg border bg-white p-4 text-sm">
                    <span className="font-semibold">{label}</span>
                    <span className="text-muted-foreground">{value}</span>
                  </div>
                ))}
                <Button onClick={() => router.push("/optimization")}>
                  Send to Optimization
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <div className="rounded-lg border bg-white p-5 text-sm leading-6 text-muted-foreground">
                Run AI analysis to generate supplier recommendations, savings estimates, lead-time reduction, risk posture, and confidence score.
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </>
  );
}
