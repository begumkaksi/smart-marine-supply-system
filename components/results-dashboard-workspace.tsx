"use client";

import { useEffect, useMemo, useState } from "react";
import { Award, CircleDollarSign, Clock3, ShieldCheck } from "lucide-react";

import { CostSavingsTrendChart, SupplierPerformanceChart } from "@/components/charts";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  calculateBatchMetrics,
  generateRecommendations,
  getStoredBatch,
  type ProcurementBatch
} from "@/lib/procurement-batch";

export function ResultsDashboardWorkspace() {
  const [batch, setBatch] = useState<ProcurementBatch | null>(null);

  useEffect(() => {
    setBatch(getStoredBatch());
  }, []);

  const recommendations = useMemo(() => {
    if (!batch) {
      return [];
    }
    return batch.recommendations ?? generateRecommendations(batch.detectedItems);
  }, [batch]);

  const metrics = batch?.metrics ?? calculateBatchMetrics(batch?.detectedItems.length ?? 5);
  const supplierCount = new Set(recommendations.map((recommendation) => recommendation.recommendedSupplier)).size;

  return (
    <>
      <section className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Total items analyzed", value: String(batch?.detectedItems.length ?? 0), icon: Award },
          { label: "Recommended suppliers", value: String(supplierCount), icon: ShieldCheck },
          { label: "Expected cost saving", value: metrics.expectedCostSaving, icon: CircleDollarSign },
          { label: "Lead time reduction", value: metrics.leadTimeReduction, icon: Clock3 }
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
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Optimization Results</CardTitle>
              <CardDescription>
                {batch ? `Results generated from ${batch.fileName}` : "Upload a supply list to populate dynamic results."}
              </CardDescription>
            </div>
            <Badge variant="info">Risk score {metrics.riskScore}</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendations.length ? (
              recommendations.slice(0, 6).map((recommendation, index) => (
                <div key={`${recommendation.item}-${recommendation.recommendedSupplier}`} className="rounded-lg border bg-white p-4">
                  <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold">{recommendation.recommendedSupplier}</p>
                      <p className="text-sm text-muted-foreground">
                        {recommendation.item} - {recommendation.estimatedCost} - {recommendation.deliveryTime}
                      </p>
                    </div>
                    <Badge variant={recommendation.riskLevel === "Low" ? "success" : "warning"}>{recommendation.riskLevel}</Badge>
                  </div>
                  <Progress value={94 - index * 4} />
                </div>
              ))
            ) : (
              <div className="rounded-lg border bg-white p-5 text-sm text-muted-foreground">
                No procurement batch has been uploaded yet.
              </div>
            )}
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
    </>
  );
}
