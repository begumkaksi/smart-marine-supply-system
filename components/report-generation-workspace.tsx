"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Download, FileBarChart, FileCheck2, FileText, Send } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { useToast } from "@/components/providers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  calculateBatchMetrics,
  generateRecommendations,
  getStoredBatch,
  storeBatch,
  type ProcurementBatch,
  type SupplierRecommendation
} from "@/lib/procurement-batch";

function downloadExcelWorkbook(filename: string, content: string) {
  const url = `data:application/vnd.ms-excel;charset=utf-8,${encodeURIComponent(content)}`;
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
}

function hasScoringFields(recommendations: SupplierRecommendation[]) {
  return recommendations.every((recommendation) => typeof recommendation.overallScore === "number");
}

function getSupplierRows(recommendations: SupplierRecommendation[]) {
  const rows = new Map<string, SupplierRecommendation>();
  recommendations.forEach((recommendation) => {
    const existing = rows.get(recommendation.recommendedSupplier);
    if (!existing || recommendation.overallScore > existing.overallScore) {
      rows.set(recommendation.recommendedSupplier, recommendation);
    }
  });

  return Array.from(rows.values()).sort((a, b) => b.overallScore - a.overallScore);
}

function escapeXml(value: string | number) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function worksheet(name: string, rows: Array<Array<string | number>>) {
  const body = rows
    .map(
      (row) =>
        `<Row>${row
          .map((cell) => `<Cell><Data ss:Type="${typeof cell === "number" ? "Number" : "String"}">${escapeXml(cell)}</Data></Cell>`)
          .join("")}</Row>`
    )
    .join("");

  return `<Worksheet ss:Name="${escapeXml(name)}"><Table>${body}</Table></Worksheet>`;
}

type AutoTableDoc = {
  lastAutoTable?: {
    finalY: number;
  };
};

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
    if (batch.recommendations && hasScoringFields(batch.recommendations)) {
      return batch.recommendations;
    }
    return generateRecommendations(batch.detectedItems);
  }, [batch]);

  const metrics = batch?.metrics ?? calculateBatchMetrics(batch?.detectedItems.length ?? 5);
  const supplierRows = getSupplierRows(recommendations);
  const recommendedSupplier = supplierRows[0];
  const primarySupplier = recommendedSupplier?.recommendedSupplier ?? "Atlas Ship Chandlers";
  const backupSupplier = recommendedSupplier?.backupSupplier ?? "NordPort Marine";
  const recommendationReason =
    recommendedSupplier?.reason ??
    "Supplier B is recommended because it provides the best overall balance between cost, delivery time, reliability, and stock availability.";

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

  function exportSupplierPDF() {
    const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });

    doc.setFontSize(16);
    doc.text("Smart Marine Supply Optimization Report", 14, 18);
    doc.setFontSize(9);
    doc.text(`Uploaded file: ${batch?.fileName ?? "No uploaded file"} | Generated: ${new Date().toLocaleString()}`, 14, 25);

    autoTable(doc, {
      startY: 34,
      head: [["Uploaded Supply List"]],
      body: [],
      theme: "plain",
      styles: { fontStyle: "bold", fontSize: 11 }
    });

    autoTable(doc, {
      startY: ((doc as unknown as AutoTableDoc).lastAutoTable?.finalY ?? 34) + 2,
      head: [["Item Name", "Category", "Quantity", "Port", "Priority"]],
      body: (batch?.detectedItems ?? []).map((item) => [item.item, item.category, item.quantity, item.port, item.priority]),
      theme: "grid",
      headStyles: { fillColor: [8, 25, 47] }
    });

    autoTable(doc, {
      startY: ((doc as unknown as AutoTableDoc).lastAutoTable?.finalY ?? 60) + 8,
      head: [["Supplier Recommendation Table"]],
      body: [],
      theme: "plain",
      styles: { fontStyle: "bold", fontSize: 11 }
    });

    autoTable(doc, {
      startY: ((doc as unknown as AutoTableDoc).lastAutoTable?.finalY ?? 70) + 2,
      head: [[
        "Supplier Name",
        "Country / Port",
        "Cost Score",
        "Delivery Time Score",
        "Reliability Score",
        "Stock Availability Score",
        "Overall Score",
        "Estimated Delivery Time",
        "Stock Status",
        "Risk Level"
      ]],
      body: supplierRows.map((supplier, index) => [
        `${supplier.recommendedSupplier}${index === 0 ? " (Recommended)" : ""}`,
        supplier.countryPort,
        supplier.costScore,
        supplier.deliveryTimeScore,
        supplier.reliabilityScore,
        supplier.stockAvailabilityScore,
        supplier.overallScore,
        supplier.deliveryTime,
        supplier.stockAvailability,
        supplier.riskLevel
      ]),
      theme: "grid",
      headStyles: { fillColor: [8, 25, 47] },
      styles: { fontSize: 7 },
      columnStyles: { 0: { cellWidth: 38 }, 1: { cellWidth: 34 } }
    });

    const summaryY = ((doc as unknown as AutoTableDoc).lastAutoTable?.finalY ?? 120) + 12;
    if (summaryY > 175) {
      doc.addPage();
    }
    const finalY = summaryY > 175 ? 20 : summaryY;
    doc.setFontSize(11);
    doc.text("Scoring Formula", 14, finalY);
    doc.setFontSize(9);
    doc.text("Overall Score = 40% Cost + 25% Delivery Time + 20% Reliability + 15% Stock Availability", 14, finalY + 7);
    doc.setFontSize(11);
    doc.text("Recommendation Summary", 14, finalY + 18);
    doc.setFontSize(9);
    doc.text(`Recommended Supplier: ${primarySupplier}`, 14, finalY + 26);
    doc.text(`Backup Supplier: ${backupSupplier}`, 14, finalY + 33);
    doc.text(`Reason: ${recommendationReason}`, 14, finalY + 40, { maxWidth: 260 });

    doc.save("supplier_recommendation_report.pdf");
    notify("Report exported successfully.");
  }

  function exportExcel() {
    const uploadedRows = [
      ["Item Name", "Category", "Quantity", "Port", "Priority"],
      ...(batch?.detectedItems ?? []).map((item) => [item.item, item.category, item.quantity, item.port, item.priority])
    ];
    const scoringRows = [
      [
        "Supplier Name",
        "Country / Port",
        "Cost Score",
        "Delivery Time Score",
        "Reliability Score",
        "Stock Availability Score",
        "Overall Score",
        "Estimated Delivery Time",
        "Stock Status",
        "Risk Level"
      ],
      ...supplierRows.map((supplier, index) => [
        `${supplier.recommendedSupplier}${index === 0 ? " (Recommended)" : ""}`,
        supplier.countryPort,
        supplier.costScore,
        supplier.deliveryTimeScore,
        supplier.reliabilityScore,
        supplier.stockAvailabilityScore,
        supplier.overallScore,
        supplier.deliveryTime,
        supplier.stockAvailability,
        supplier.riskLevel
      ])
    ];
    const summaryRows = [
      ["Field", "Value"],
      ["Recommended Supplier", primarySupplier],
      ["Backup Supplier", backupSupplier],
      ["Reason", recommendationReason],
      ["Scoring Formula", "Overall Score = 40% Cost + 25% Delivery Time + 20% Reliability + 15% Stock Availability"],
      ["Expected Cost Saving", metrics.expectedCostSaving],
      ["Lead Time Reduction", metrics.leadTimeReduction]
    ];
    const workbook = `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
 ${worksheet("Uploaded Supply List", uploadedRows)}
 ${worksheet("Supplier Scoring", scoringRows)}
 ${worksheet("Recommendation Summary", summaryRows)}
</Workbook>`;

    downloadExcelWorkbook("procurement_supplier_report.xls", workbook);
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
            <Button variant="outline" onClick={exportSupplierPDF} disabled={!generated}>
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
            <div className="space-y-5 rounded-lg border bg-white p-5">
              <div className="border-b pb-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Supplier Recommendation Report</p>
                <h2 className="mt-2 text-2xl font-semibold">Smart Marine Supply Optimization Report</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {batch ? `${batch.fileName} - ${batch.detectedItems.length} detected items` : "Generated for Fleet Ops, Finance, and Compliance."}
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold">Section 1: Uploaded Supply List</h3>
                <div className="mt-3 overflow-x-auto rounded-lg border">
                  <div className="grid min-w-[760px] grid-cols-5 bg-muted px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                    <span>Item Name</span>
                    <span>Category</span>
                    <span>Quantity</span>
                    <span>Port</span>
                    <span>Priority</span>
                  </div>
                  {(batch?.detectedItems ?? []).map((item) => (
                    <div key={`${item.item}-${item.port}`} className="grid min-w-[760px] grid-cols-5 border-t px-4 py-3 text-sm">
                      <span className="font-semibold">{item.item}</span>
                      <span>{item.category}</span>
                      <span>{item.quantity}</span>
                      <span>{item.port}</span>
                      <span>{item.priority}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold">Section 2: Supplier Recommendation Table</h3>
                <div className="mt-3 overflow-x-auto rounded-lg border">
                  <div className="grid min-w-[1280px] grid-cols-[1.2fr_1fr_0.65fr_0.8fr_0.8fr_0.9fr_0.7fr_0.8fr_0.7fr_0.7fr] bg-muted px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                    <span>Supplier Name</span>
                    <span>Country / Port</span>
                    <span>Cost</span>
                    <span>Delivery</span>
                    <span>Reliability</span>
                    <span>Stock Score</span>
                    <span>Overall</span>
                    <span>ETA</span>
                    <span>Stock</span>
                    <span>Risk</span>
                  </div>
                  {supplierRows.map((supplier, index) => (
                    <div
                      key={`${supplier.recommendedSupplier}-${supplier.countryPort}`}
                      className={`grid min-w-[1280px] grid-cols-[1.2fr_1fr_0.65fr_0.8fr_0.8fr_0.9fr_0.7fr_0.8fr_0.7fr_0.7fr] items-center border-t px-4 py-3 text-sm ${index === 0 ? "bg-emerald-50" : ""}`}
                    >
                      <span className="font-semibold">
                        {supplier.recommendedSupplier}
                        {index === 0 ? <Badge className="ml-2" variant="success">Recommended</Badge> : null}
                      </span>
                      <span>{supplier.countryPort}</span>
                      <span>{supplier.costScore}</span>
                      <span>{supplier.deliveryTimeScore}</span>
                      <span>{supplier.reliabilityScore}</span>
                      <span>{supplier.stockAvailabilityScore}</span>
                      <span className="font-semibold text-cyan-700">{supplier.overallScore}</span>
                      <span>{supplier.deliveryTime}</span>
                      <span>{supplier.stockAvailability}</span>
                      <span>{supplier.riskLevel}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border bg-cyan-50/40 p-4">
                <h3 className="text-base font-semibold">Section 3: Scoring Method</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Overall Score = 40% Cost + 25% Delivery Time + 20% Reliability + 15% Stock Availability
                </p>
              </div>

              <div className="rounded-lg border bg-white p-4">
                <h3 className="text-base font-semibold">Section 4: Recommendation Summary</h3>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.1em] text-muted-foreground">Recommended Supplier</p>
                    <p className="mt-1 font-semibold">{primarySupplier}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.1em] text-muted-foreground">Backup Supplier</p>
                    <p className="mt-1 font-semibold">{backupSupplier}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{recommendationReason}</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <Badge variant="info">Cost saving {metrics.expectedCostSaving}</Badge>
                  <Badge variant="info">Lead time {metrics.leadTimeReduction}</Badge>
                  <Badge variant="info">Risk {metrics.riskScore}</Badge>
                </div>
              </div>
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
                  <Button variant="outline" size="sm" onClick={exportSupplierPDF}>
                    <FileBarChart className="h-4 w-4" />
                    Export PDF
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
