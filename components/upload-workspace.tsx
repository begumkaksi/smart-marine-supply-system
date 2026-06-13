"use client";

import { ChangeEvent, DragEvent, FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FileSpreadsheet, Keyboard, ScanLine, ShieldCheck, Table, Trash2, UploadCloud } from "lucide-react";

import { useToast } from "@/components/providers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type ManualItem = {
  id: number;
  itemName: string;
  category: string;
  quantity: string;
  port: string;
  priority: string;
};

const detectedItems = [
  ["Fresh provisions", "Provisions", "420 kg", "Rotterdam", "High"],
  ["Main engine filters", "Engine", "36 units", "Singapore", "Critical"],
  ["Life raft service kit", "Safety", "12 kits", "Busan", "Medium"]
];

const initialManualItems: ManualItem[] = [
  { id: 1, itemName: "Fresh provisions", category: "Provisions", quantity: "420 kg", port: "Rotterdam", priority: "High" },
  { id: 2, itemName: "Main engine filters", category: "Engine", quantity: "36 units", port: "Singapore", priority: "Critical" },
  { id: 3, itemName: "Life raft service kit", category: "Safety", quantity: "12 kits", port: "Busan", priority: "Medium" }
];

function formatBytes(size: number) {
  if (size < 1024) {
    return `${size} B`;
  }
  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }
  return `${(size / 1024 / 1024).toFixed(1)} MB`;
}

export function UploadWorkspace() {
  const router = useRouter();
  const { notify } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Waiting for file");
  const [manualItems, setManualItems] = useState<ManualItem[]>(initialManualItems);
  const [form, setForm] = useState({
    itemName: "",
    category: "Provisions",
    quantity: "",
    port: "",
    priority: "Medium"
  });

  function simulateUpload(selectedFile: File) {
    setFile(selectedFile);
    setProgress(8);
    setStatus("Uploading");
    notify("File upload started.");

    let nextProgress = 8;
    const timer = window.setInterval(() => {
      nextProgress += 18;
      setProgress(Math.min(nextProgress, 100));
      if (nextProgress >= 100) {
        window.clearInterval(timer);
        setStatus("Upload complete");
        notify("File uploaded successfully.");
      }
    }, 320);
  }

  function handleFiles(files: FileList | null) {
    const selectedFile = files?.[0];
    if (!selectedFile) {
      return;
    }
    simulateUpload(selectedFile);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    handleFiles(event.dataTransfer.files);
  }

  function addManualItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.itemName.trim() || !form.quantity.trim() || !form.port.trim()) {
      notify("Please complete item name, quantity, and port.");
      return;
    }
    setManualItems((current) => [
      ...current,
      {
        id: Date.now(),
        itemName: form.itemName,
        category: form.category,
        quantity: form.quantity,
        port: form.port,
        priority: form.priority
      }
    ]);
    setForm({ itemName: "", category: "Provisions", quantity: "", port: "", priority: "Medium" });
    notify("Manual supply item added.");
  }

  function analyzeList(message: string) {
    notify(message);
    router.push("/ai-analysis");
  }

  return (
    <>
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
          <CardContent className="space-y-5">
            <div
              onDragOver={(event) => event.preventDefault()}
              onDrop={handleDrop}
              className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed border-cyan-300 bg-cyan-50/55 p-8 text-center"
            >
              <input
                ref={inputRef}
                className="hidden"
                type="file"
                accept=".csv,.xlsx,.xls,.pdf"
                onChange={(event: ChangeEvent<HTMLInputElement>) => handleFiles(event.target.files)}
              />
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-white text-cyan-700 shadow-sm">
                <UploadCloud className="h-7 w-7" />
              </div>
              <h2 className="mt-5 text-xl font-semibold">Drop vessel supply lists here</h2>
              <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                The intake engine maps item descriptions, units, urgency, vessel, port, and delivery windows before optimization.
              </p>
              <Button className="mt-6" onClick={() => inputRef.current?.click()}>
                <FileSpreadsheet className="h-4 w-4" />
                Select Files
              </Button>
            </div>

            {file ? (
              <div className="rounded-lg border bg-white p-4">
                <div className="grid gap-3 text-sm sm:grid-cols-4">
                  <div>
                    <p className="text-muted-foreground">File name</p>
                    <p className="font-semibold">{file.name}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">File type</p>
                    <p className="font-semibold">{file.type || file.name.split(".").pop()?.toUpperCase()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">File size</p>
                    <p className="font-semibold">{formatBytes(file.size)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Upload status</p>
                    <Badge variant={progress === 100 ? "success" : "info"}>{status}</Badge>
                  </div>
                </div>
                <Progress value={progress} className="mt-4" />
                {progress === 100 ? (
                  <Button className="mt-4" onClick={() => analyzeList("Supply list sent to AI analysis.")}>
                    Analyze List
                  </Button>
                ) : null}
              </div>
            ) : null}
          </CardContent>
        </Card>

        <Card className="glass-panel">
          <CardHeader>
            <CardTitle>Processing Pipeline</CardTitle>
            <CardDescription>Automated enrichment before supplier matching.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {[
              { label: "Item normalization", value: progress === 100 ? 96 : 24, icon: ScanLine },
              { label: "Duplicate detection", value: progress === 100 ? 88 : 12, icon: ShieldCheck },
              { label: "Supplier match readiness", value: progress === 100 ? 74 : 8, icon: UploadCloud }
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

      {progress === 100 ? (
        <section className="mt-6">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle>Mock Detected Items</CardTitle>
              <CardDescription>Detected from the uploaded supply list.</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable rows={detectedItems} />
            </CardContent>
          </Card>
        </section>
      ) : null}

      <section className="mt-6">
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle>Manual Entry</CardTitle>
            <CardDescription>Enter urgent items directly when a vessel call cannot wait for a spreadsheet.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <form className="grid gap-3 lg:grid-cols-[1.2fr_0.9fr_0.8fr_0.9fr_0.8fr_auto]" onSubmit={addManualItem}>
              <input className="rounded-md border bg-white px-3 py-2 text-sm" placeholder="Item Name" value={form.itemName} onChange={(event) => setForm((current) => ({ ...current, itemName: event.target.value }))} />
              <select className="rounded-md border bg-white px-3 py-2 text-sm" value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}>
                {["Provisions", "Engine", "Deck", "Safety", "Cabin"].map((category) => <option key={category}>{category}</option>)}
              </select>
              <input className="rounded-md border bg-white px-3 py-2 text-sm" placeholder="Quantity" value={form.quantity} onChange={(event) => setForm((current) => ({ ...current, quantity: event.target.value }))} />
              <input className="rounded-md border bg-white px-3 py-2 text-sm" placeholder="Port" value={form.port} onChange={(event) => setForm((current) => ({ ...current, port: event.target.value }))} />
              <select className="rounded-md border bg-white px-3 py-2 text-sm" value={form.priority} onChange={(event) => setForm((current) => ({ ...current, priority: event.target.value }))}>
                {["Low", "Medium", "High", "Critical"].map((priority) => <option key={priority}>{priority}</option>)}
              </select>
              <Button type="submit">Add Item</Button>
            </form>

            <div className="overflow-hidden rounded-lg border bg-white">
              <div className="grid grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_0.8fr_0.3fr] bg-muted px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                <span>Item</span>
                <span>Category</span>
                <span>Quantity</span>
                <span>Port</span>
                <span>Priority</span>
                <span />
              </div>
              {manualItems.map((item) => (
                <div key={item.id} className="grid grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_0.8fr_0.3fr] items-center border-t px-4 py-3 text-sm">
                  <span className="truncate font-semibold">{item.itemName}</span>
                  <span>{item.category}</span>
                  <span>{item.quantity}</span>
                  <span>{item.port}</span>
                  <span>{item.priority}</span>
                  <button
                    className="text-muted-foreground hover:text-red-600"
                    type="button"
                    aria-label={`Remove ${item.itemName}`}
                    onClick={() => {
                      setManualItems((current) => current.filter((row) => row.id !== item.id));
                      notify("Manual supply item removed.");
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <Button onClick={() => analyzeList("Manual list sent to AI analysis.")}>Analyze Manual List</Button>
          </CardContent>
        </Card>
      </section>
    </>
  );
}

function DataTable({ rows }: { rows: string[][] }) {
  return (
    <div className="overflow-hidden rounded-lg border bg-white">
      <div className="grid grid-cols-5 bg-muted px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
        <span>Item</span>
        <span>Category</span>
        <span>Quantity</span>
        <span>Port</span>
        <span>Priority</span>
      </div>
      {rows.map((row) => (
        <div key={row[0]} className="grid grid-cols-5 border-t px-4 py-3 text-sm">
          {row.map((cell) => (
            <span key={cell} className="truncate">{cell}</span>
          ))}
        </div>
      ))}
    </div>
  );
}
