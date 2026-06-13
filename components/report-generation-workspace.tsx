"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Download, FileBarChart, FileCheck2, FileText, Send } from "lucide-react";

import { useToast } from "@/components/providers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  calculateBatchMetrics,
  generateRecommendations,
  getStoredBatch,
  storeBatch,
  type ProcurementBatch
} from "@/lib/procurement-batch";

function downloadMockFile(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function ReportGenerationWorkspace() {
  const { notify } = useToast();
  const [batch, setBatch] = useState<ProcurementBatch | null>(null);
  const [generated, setGenerated] = useState(false);

  useEffect(() => {
    const stored = getStoredBatch();
    setBatch(stored);
    setGenerated(stored?.analysisStatus === "Reported");
  }, []);

  const recommendations = useMemo(() => {
    if (!batch) {
      return [];
    }
    return batch.recommendations ?? generateRecommendations(batch.detectedItems);
  }, [batch]);

  const metrics = batch?.metrics ?? calculateBatchMetrics(batch?.detectedItems.length ?? 5);
  const primarySupplier = recommendations[0]?.recommendedSupplier ?? "Atlas Ship Chandlers";
  const backupSupplier = recommendations[0]?.backupSupplier ?? "NordPort Marine";

  function generateReport() {
    setGenerated(true);
    if (batch) {
      const reportedBatch: ProcurementBatch = {
        ...batch,
        analysisStatus: "Reported",
        recommendations,
        metrics
      };
      setBatch(reportedBatch);
      storeBatch(reportedBatch);
    }
    notify("Procurement report generated.");
  }

  function exportPdf() {
    downloadMockFile(
      "smart-marine-procurement-report.pdf.txt",
      `SMART MARINE SUPPLY OPTIMIZATION SYSTEM\n\nMock PDF export\nFile: ${batch?.fileName ?? "No uploaded file"}\nItems analyzed: ${batch?.detectedItems.length ?? 0}\nSavings: ${metrics.expectedCostSaving}\nLead time reduction: ${metrics.leadTimeReduction}\nRecommended supplier: ${primarySupplier}`,
      "text/plain"
    );
    notify("Report exported successfully.");
  }

  function exportExcel() {
    downloadMockFile(
      "smart-marine-procurement-report.csv",
      `Metric,Value\nFile,${batch?.fileName ?? "No uploaded file"}\nItems,${batch?.detectedItems.length ?? 0}\nSavings,${metrics.expectedCostSaving}\nLead Time Reduction,${metrics.leadTimeReduction}\nPrimary Supplier,${primarySupplier}\nBackup Supplier,${backupSupplier}\nRisk Score,${metrics.riskScore}`,
      "text/csv"
    );
    notify("Excel export generated successfully.");
  }

  return (
    <section className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
      <Card className="glass-panel">
        <CardHeader>
          <CardTitle>Generate Report</CardTitle>
          <CardDescription>Select report type, period, and export destination.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "Report type", value: "Executive Procurement Summary", icon: FileText },
            { label: "Period", value: "Q4 2026", icon: CalendarDays },
            { label: "Format", value: "PDF + Excel", icon: Download },
            { label: "Distribution", value: "Fleet Ops, Finance, Compliance", icon: Send }
          ].map((field) => {
            const Icon = field.icon;
            return (
              <div key={field.label} className="flex items-center justify-between rounded-lg border bg-white p-4">
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-cyan-700" />
                  <span className="text-sm font-semibold">{field.label}</span>
                </div>
                <span className="max-w-48 truncate text-right text-sm text-muted-foreground">{field.value}</span>
              </div>
            );
          })}
          <Button className="w-full" onClick={generateReport}>
            <FileCheck2 className="h-4 w-4" />
            Generate Report
          </Button>
          <div className="grid gap-2 sm:grid-cols-2">
            <Button variant="outline" onClick={exportPdf} disabled={!generated}>
              <Download className="h-4 w-4" />
              Export PDF
            </Button>
            <Button variant="outline" onClick={exportExcel} disabled={!generated}>
              <Download className="h-4 w-4" />
              Export Excel
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-panel">
        <CardHeader className="flex-row items-center justify-between">
          <div>
            <CardTitle>{generated ? "Generated Report Preview" : "Report Library"}</CardTitle>
            <CardDescription>
              {generated
                ? batch
                  ? `Preview based on ${batch.fileName}.`
                  : "Mock procurement report ready for review."
                : "Audit-ready reports generated by the platform."}
            </CardDescription>
          </div>
          <Badge variant={generated ? "success" : "info"}>{generated ? "Ready" : "12 reports"}</Badge>
        </CardHeader>
        <CardContent>
          {generated ? (
            <div className="rounded-lg border bg-white p-5">
              <div className="border-b pb-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Executive Procurement Summary</p>
                <h2 className="mt-2 text-2xl font-semibold">Q4 Maritime Supply Optimization Report</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {batch ? `${batch.fileName} - ${batch.detectedItems.length} detected items` : "Generated for Fleet Ops, Finance, and Compliance."}
                </p>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {[
                  ["Total items analyzed", String(batch?.detectedItems.length ?? 0)],
                  ["Average cost saving", metrics.expectedCostSaving],
                  ["Lead time reduction", metrics.leadTimeReduction],
                  ["Primary supplier", primarySupplier],
                  ["Backup supplier", backupSupplier],
                  ["Risk score", metrics.riskScore],
                  ["AI confidence", "94%"]
                ].map(([label, value]) => (
                  <div key={label} className="rounded-md border bg-cyan-50/40 p-4">
                    <p className="text-xs uppercase tracking-[0.1em] text-muted-foreground">{label}</p>
                    <p className="mt-2 font-semibold">{value}</p>
                  </div>
                ))}
              </div>
              {recommendations.length ? (
                <div className="mt-5 overflow-hidden rounded-lg border">
                  <div className="grid grid-cols-4 bg-muted px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                    <span>Item</span>
                    <span>Supplier</span>
                    <span>Cost</span>
                    <span>Delivery</span>
                  </div>
                  {recommendations.slice(0, 5).map((recommendation) => (
                    <div key={`${recommendation.item}-${recommendation.recommendedSupplier}`} className="grid grid-cols-4 border-t px-4 py-3 text-sm">
                      <span className="font-semibold">{recommendation.item}</span>
                      <span>{recommendation.recommendedSupplier}</span>
                      <span>{recommendation.estimatedCost}</span>
                      <span>{recommendation.deliveryTime}</span>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ) : (
            <div className="overflow-hidden rounded-lg border bg-white">
              <div className="grid grid-cols-4 bg-muted px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                <span>Report</span>
                <span>Scope</span>
                <span>Status</span>
                <span>Action</span>
              </div>
              {[
                ["Savings Performance", "Fleet-wide", "Ready"],
                ["Supplier Scorecard", "Top 30 suppliers", "Ready"],
                ["Optimization Audit", "PO-7814 batch", "Draft"],
                ["Lead Time Reduction", "Northern Europe", "Ready"]
              ].map(([name, scope, status]) => (
                <div key={name} className="grid grid-cols-4 items-center border-t px-4 py-3 text-sm">
                  <span className="font-semibold">{name}</span>
                  <span className="truncate text-muted-foreground">{scope}</span>
                  <Badge variant={status === "Ready" ? "success" : "warning"}>{status}</Badge>
                  <Button variant="outline" size="sm" onClick={exportPdf}>
                    <FileBarChart className="h-4 w-4" />
                    Export
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
