"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, Route } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getStoredBatch, type ProcurementBatch } from "@/lib/procurement-batch";

const statusProgress = {
  Uploaded: 25,
  Analyzing: 45,
  Analyzed: 65,
  Optimized: 86,
  Reported: 100
};

export function CurrentProcurementBatchCard() {
  const router = useRouter();
  const [batch, setBatch] = useState<ProcurementBatch | null>(null);

  useEffect(() => {
    const loadBatch = () => setBatch(getStoredBatch());
    loadBatch();
    window.addEventListener("storage", loadBatch);
    window.addEventListener("procurement-batch-updated", loadBatch);
    return () => {
      window.removeEventListener("storage", loadBatch);
      window.removeEventListener("procurement-batch-updated", loadBatch);
    };
  }, []);

  return (
    <Card className="glass-panel">
      <CardHeader className="flex-row items-center justify-between">
        <div>
          <CardTitle>Current Procurement Batch</CardTitle>
          <CardDescription>
            {batch ? `${batch.detectedItems.length} detected items flowing through the demo.` : "No supply list uploaded yet."}
          </CardDescription>
        </div>
        <Badge variant={batch ? "info" : "outline"}>{batch?.analysisStatus ?? "Empty"}</Badge>
      </CardHeader>
      <CardContent>
        {batch ? (
          <div className="space-y-4">
            <div className="flex items-start gap-3 rounded-lg border bg-white p-4">
              <FileText className="mt-0.5 h-5 w-5 text-cyan-700" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{batch.fileName}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {batch.fileType} - uploaded {new Date(batch.uploadDate).toLocaleString()}
                </p>
              </div>
            </div>
            <Progress value={statusProgress[batch.analysisStatus]} />
            <div className="flex flex-wrap gap-2">
              <Button size="sm" onClick={() => router.push("/ai-analysis")}>Analyze</Button>
              <Button size="sm" variant="outline" onClick={() => router.push("/optimization")}>Optimize</Button>
              <Button size="sm" variant="outline" onClick={() => router.push("/report-generation")}>Report</Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-3 rounded-lg border bg-white p-4">
            <div className="flex items-center gap-3">
              <Route className="h-5 w-5 text-cyan-700" />
              <p className="text-sm text-muted-foreground">Upload a CSV, Excel, or PDF requisition to start the connected demo flow.</p>
            </div>
            <Button size="sm" onClick={() => router.push("/upload")}>Upload</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
