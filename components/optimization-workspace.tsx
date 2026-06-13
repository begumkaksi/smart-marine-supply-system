"use client";

import { useEffect, useState } from "react";
import { ArrowRight, BrainCircuit, CheckCircle2, DollarSign, Gauge, TimerReset } from "lucide-react";

import { useToast } from "@/components/providers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { optimizationWeights } from "@/lib/data";
import {
  calculateBatchMetrics,
  generateRecommendations,
  getStoredBatch,
  storeBatch,
  type ProcurementBatch,
  type SupplierRecommendation
} from "@/lib/procurement-batch";

export function OptimizationWorkspace() {
  const { notify } = useToast();
  const [batch, setBatch] = useState<ProcurementBatch | null>(null);
  const [recommendations, setRecommendations] = useState<SupplierRecommendation[]>([]);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const stored = getStoredBatch();
    setBatch(stored);
    setRecommendations(stored?.recommendations ?? []);
    setComplete(stored?.analysisStatus === "Optimized" || stored?.analysisStatus === "Reported");
    setProgress(stored?.recommendations?.length ? 100 : 0);
  }, []);

  function runOptimization() {
    if (running) {
      return;
    }
    if (!batch) {
      notify("Upload a supply list before running optimization.");
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
        const sourceItems = batch?.detectedItems ?? [];
        const nextRecommendations = generateRecommendations(sourceItems);
        const metrics = calculateBatchMetrics(sourceItems.length || 5);
        if (batch) {
          const optimizedBatch: ProcurementBatch = {
            ...batch,
            analysisStatus: "Optimized",
            recommendations: nextRecommendations,
            metrics
          };
          setBatch(optimizedBatch);
          storeBatch(optimizedBatch);
        }
        setRecommendations(nextRecommendations);
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
                  <p>Average lead time: {batch ? `${42 + batch.detectedItems.length} hours` : "42 hours"}</p>
                  <p>Supplier split: 1 vendor</p>
                  <p>Risk posture: Medium</p>
                </div>
              </div>
              <div className="rounded-lg border bg-emerald-50 p-4">
                <p className="text-sm font-semibold text-emerald-800">AI optimized process</p>
                <div className="mt-4 space-y-3 text-sm text-emerald-700">
                  <p>Total cost: {complete ? "$320,040" : "Pending"}</p>
                  <p>Average lead time: {complete ? "29 hours" : "Pending"}</p>
                  <p>Supplier split: {complete ? `${Math.min(4, Math.max(2, recommendations.length))} vendors` : "Pending"}</p>
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
          complete ? `Expected savings: ${batch?.metrics?.expectedCostSaving ?? "23.8%"}` : "Expected savings: pending",
          complete ? `Lead time reduction: ${batch?.metrics?.leadTimeReduction ?? "31%"}` : "Lead time reduction: pending",
          complete ? `Recommended items: ${recommendations.length || batch?.detectedItems.length || 0}` : "Recommended award: pending"
        ].map((item) => (
          <div key={item} className="flex items-center gap-3 rounded-lg border bg-white p-4 shadow-sm">
            <CheckCircle2 className={`h-5 w-5 ${complete ? "text-emerald-600" : "text-muted-foreground"}`} />
            <span className="text-sm font-semibold">{item}</span>
          </div>
        ))}
      </section>

      <section className="mt-6">
        <Card className="glass-panel">
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Item-Level Supplier Recommendations</CardTitle>
              <CardDescription>
                {batch ? `Generated from ${batch.fileName}` : "Upload a supply list to generate item-level recommendations."}
              </CardDescription>
            </div>
            <Badge variant={recommendations.length ? "success" : "outline"}>
              {recommendations.length ? `${recommendations.length} items` : "Pending"}
            </Badge>
          </CardHeader>
          <CardContent>
            {recommendations.length ? (
              <div className="overflow-x-auto rounded-lg border bg-white">
                <div className="grid min-w-[980px] grid-cols-[1.1fr_1.2fr_1.1fr_0.8fr_0.8fr_0.8fr_0.8fr] bg-muted px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  <span>Item</span>
                  <span>Recommended Supplier</span>
                  <span>Backup Supplier</span>
                  <span>Cost</span>
                  <span>Delivery</span>
                  <span>Stock</span>
                  <span>Risk</span>
                </div>
                {recommendations.map((recommendation) => (
                  <div key={`${recommendation.item}-${recommendation.recommendedSupplier}`} className="grid min-w-[980px] grid-cols-[1.1fr_1.2fr_1.1fr_0.8fr_0.8fr_0.8fr_0.8fr] border-t px-4 py-3 text-sm">
                    <span className="font-semibold">{recommendation.item}</span>
                    <span>{recommendation.recommendedSupplier}</span>
                    <span>{recommendation.backupSupplier}</span>
                    <span>{recommendation.estimatedCost}</span>
                    <span>{recommendation.deliveryTime}</span>
                    <span>{recommendation.stockAvailability}</span>
                    <span>{recommendation.riskLevel}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border bg-white p-5 text-sm text-muted-foreground">
                Run optimization to convert detected supply items into supplier recommendations.
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </>
  );
}
