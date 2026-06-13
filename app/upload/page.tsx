import { FileSpreadsheet, Keyboard, ScanLine, ShieldCheck, Table, UploadCloud } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { pageSummaries } from "@/lib/data";

export default function UploadPage() {
  const summary = pageSummaries.upload;

  return (
    <AppShell>
      <PageHeader {...summary} />
      <section className="grid gap-4 md:grid-cols-4">
        {[
          { title: "CSV Upload", note: "Comma-separated requisition exports", icon: Table },
          { title: "Excel Upload", note: "XLSX order workbooks and templates", icon: FileSpreadsheet },
          { title: "Drag and Drop", note: "Multi-file intake for urgent calls", icon: UploadCloud },
          { title: "Manual Entry", note: "Add line items without a file", icon: Keyboard }
        ].map((method) => {
          const Icon = method.icon;
          return (
            <Card key={method.title} className="glass-panel">
              <CardContent className="p-5">
                <Icon className="h-6 w-6 text-cyan-700" />
                <p className="mt-4 font-semibold">{method.title}</p>
                <p className="mt-2 text-sm leading-5 text-muted-foreground">{method.note}</p>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle>Supply List Upload</CardTitle>
            <CardDescription>Accepts XLSX, CSV, PDF requisitions, and ERP exports.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed border-cyan-300 bg-cyan-50/55 p-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-white text-cyan-700 shadow-sm">
                <UploadCloud className="h-7 w-7" />
              </div>
              <h2 className="mt-5 text-xl font-semibold">Drop vessel supply lists here</h2>
              <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                The intake engine maps item descriptions, units, urgency, vessel, port, and delivery windows before optimization.
              </p>
              <Button className="mt-6">
                <FileSpreadsheet className="h-4 w-4" />
                Select Files
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel">
          <CardHeader>
            <CardTitle>Processing Pipeline</CardTitle>
            <CardDescription>Automated enrichment before supplier matching.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {[
              { label: "Item normalization", value: 96, icon: ScanLine },
              { label: "Duplicate detection", value: 88, icon: ShieldCheck },
              { label: "Supplier match readiness", value: 74, icon: UploadCloud }
            ].map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.label} className="rounded-lg border bg-white p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4 text-cyan-700" />
                      <span className="text-sm font-semibold">{step.label}</span>
                    </div>
                    <Badge variant="info">{step.value}%</Badge>
                  </div>
                  <Progress value={step.value} />
                </div>
              );
            })}
          </CardContent>
        </Card>
      </section>

      <section className="mt-6">
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle>Manual Entry</CardTitle>
            <CardDescription>Enter urgent items directly when a vessel call cannot wait for a spreadsheet.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-lg border bg-white">
              <div className="grid grid-cols-5 bg-muted px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                <span>Item</span>
                <span>Category</span>
                <span>Quantity</span>
                <span>Port</span>
                <span>Priority</span>
              </div>
              {[
                ["Fresh provisions", "Provisions", "420 kg", "Rotterdam", "High"],
                ["Main engine filters", "Engine", "36 units", "Singapore", "Critical"],
                ["Life raft service kit", "Safety", "12 kits", "Busan", "Medium"]
              ].map((row) => (
                <div key={row[0]} className="grid grid-cols-5 border-t px-4 py-3 text-sm">
                  {row.map((cell) => (
                    <span key={cell} className="truncate">{cell}</span>
                  ))}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </AppShell>
  );
}
