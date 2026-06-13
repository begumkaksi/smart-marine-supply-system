"use client";

import { useState } from "react";
import { ArrowRight, BrainCircuit, CheckCircle2, DollarSign, Gauge, TimerReset } from "lucide-react";

import { useToast } from "@/components/providers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { optimizationWeights } from "@/lib/data";

export function OptimizationWorkspace() {
  const { notify } = useToast();
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(false);

  function runOptimization() {
    if (running) {
      return;
    }
    setRunning(true);
    setComplete(false);
    setProgress(12);
    notify("Optimization started.");

    let next = 12;
    const timer = window.setInterval(() => {
      next += 22;
      setProgress(Math.min(next, 100));
      if (next >= 100) {
        window.clearInterval(timer);
        setRunning(false);
        setComplete(true);
        notify("Supplier recommendation generated.");
      }
    }, 420);
  }

  return (
    <>
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
              <CardTitle>Optimization Simulation</CardTitle>
              <CardDescription>Compare manual procurement against AI optimized purchasing.</CardDescription>
            </div>
            <Badge variant={complete ? "success" : "info"}>{complete ? "Optimized" : "Ready"}</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border bg-white p-4">
                <p className="text-sm font-semibold">Manual process</p>
                <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <p>Total cost: $420,000</p>
                  <p>Average lead time: 42 hours</p>
                  <p>Supplier split: 1 vendor</p>
                  <p>Risk posture: Medium</p>
                </div>
              </div>
              <div className="rounded-lg border bg-emerald-50 p-4">
                <p className="text-sm font-semibold text-emerald-800">AI optimized process</p>
                <div className="mt-4 space-y-3 text-sm text-emerald-700">
                  <p>Total cost: {complete ? "$320,040" : "Pending"}</p>
                  <p>Average lead time: {complete ? "29 hours" : "Pending"}</p>
                  <p>Supplier split: {complete ? "3 vendors" : "Pending"}</p>
                  <p>Risk posture: {complete ? "Low" : "Pending"}</p>
                </div>
              </div>
            </div>
            <Progress value={progress} />
            <Button onClick={runOptimization} disabled={running}>
              {running ? "Optimizing..." : "Run Optimization"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          complete ? "Expected savings: 23.8%" : "Expected savings: pending",
          complete ? "Lead time reduction: 31%" : "Lead time reduction: pending",
          complete ? "Recommended award: Atlas + NordPort backup" : "Recommended award: pending"
        ].map((item) => (
          <div key={item} className="flex items-center gap-3 rounded-lg border bg-white p-4 shadow-sm">
            <CheckCircle2 className={`h-5 w-5 ${complete ? "text-emerald-600" : "text-muted-foreground"}`} />
            <span className="text-sm font-semibold">{item}</span>
          </div>
        ))}
      </section>
    </>
  );
}
