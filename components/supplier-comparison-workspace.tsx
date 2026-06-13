"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, GitCompareArrows } from "lucide-react";

import { useToast } from "@/components/providers";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { supplierDatabase } from "@/lib/data";

const supplierOptions = supplierDatabase.slice(0, 8);

function deliveryScore(deliveryTime: string) {
  const hours = Number.parseInt(deliveryTime, 10);
  return Math.max(60, 110 - hours);
}

function stockScore(stock: string) {
  if (stock === "High") {
    return 95;
  }
  if (stock === "Medium") {
    return 80;
  }
  return 62;
}

function finalScore(supplier: (typeof supplierDatabase)[number]) {
  return Math.round(
    supplier.costIndex * 0.4 +
      deliveryScore(supplier.deliveryTime) * 0.25 +
      supplier.reliability * 0.2 +
      stockScore(supplier.stock) * 0.15
  );
}

export function SupplierComparisonWorkspace() {
  const { notify } = useToast();
  const [selected, setSelected] = useState<string[]>([
    supplierOptions[0].name,
    supplierOptions[1].name,
    supplierOptions[2].name
  ]);

  const comparedSuppliers = useMemo(
    () => supplierOptions.filter((supplier) => selected.includes(supplier.name)),
    [selected]
  );

  const recommended = comparedSuppliers.reduce((best, supplier) => {
    if (!best || finalScore(supplier) > finalScore(best)) {
      return supplier;
    }
    return best;
  }, comparedSuppliers[0]);

  function toggleSupplier(name: string) {
    setSelected((current) => {
      if (current.includes(name)) {
        if (current.length <= 2) {
          notify("Select at least 2 suppliers for comparison.");
          return current;
        }
        return current.filter((item) => item !== name);
      }
      if (current.length >= 3) {
        notify("You can compare up to 3 suppliers.");
        return current;
      }
      notify("Supplier added to comparison.");
      return [...current, name];
    });
  }

  return (
    <section className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
      <Card className="glass-panel">
        <CardHeader>
          <CardTitle>Supplier Comparison Matrix</CardTitle>
          <CardDescription>Select 2-3 suppliers, then compare weighted AI scores.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex flex-wrap gap-2">
            {supplierOptions.map((supplier) => (
              <label key={supplier.name} className="flex cursor-pointer items-center gap-2 rounded-md border bg-white px-3 py-2 text-sm">
                <input
                  type="checkbox"
                  checked={selected.includes(supplier.name)}
                  onChange={() => toggleSupplier(supplier.name)}
                />
                {supplier.name}
              </label>
            ))}
          </div>
          <div className="overflow-x-auto rounded-lg border bg-white">
            <div className="grid min-w-[860px] grid-cols-[1.4fr_0.7fr_0.9fr_0.9fr_1fr_0.8fr] bg-muted px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              <span>Supplier</span>
              <span>Cost</span>
              <span>Delivery Time</span>
              <span>Reliability</span>
              <span>Stock Availability</span>
              <span>Overall Score</span>
            </div>
            {comparedSuppliers.map((supplier) => {
              const score = finalScore(supplier);
              const isRecommended = supplier.name === recommended?.name;
              return (
                <div
                  key={supplier.name}
                  className={`grid min-w-[860px] grid-cols-[1.4fr_0.7fr_0.9fr_0.9fr_1fr_0.8fr] items-center border-t px-4 py-3 text-sm ${isRecommended ? "bg-emerald-50" : ""}`}
                >
                  <span className="font-semibold">
                    {supplier.name}
                    {isRecommended ? <Badge className="ml-2" variant="success">Recommended</Badge> : null}
                  </span>
                  <span>{supplier.costIndex}/100</span>
                  <span>{supplier.deliveryTime}</span>
                  <span>{supplier.reliability}%</span>
                  <Badge variant={supplier.stock === "High" ? "success" : supplier.stock === "Low" ? "warning" : "info"}>
                    {supplier.stock}
                  </Badge>
                  <span className="font-semibold text-cyan-700">{score}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="glass-panel">
        <CardHeader>
          <CardTitle>Final Score Calculation</CardTitle>
          <CardDescription>Weighted model: 40% cost, 25% delivery, 20% reliability, 15% stock.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {recommended ? (
            <div className="rounded-lg border bg-white p-5">
              <div className="flex items-center gap-3">
                <GitCompareArrows className="h-5 w-5 text-cyan-700" />
                <p className="font-semibold">{recommended.name}</p>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Recommended supplier based on weighted score and stock availability.
              </p>
            </div>
          ) : null}
          {recommended
            ? [
                ["40% Cost", recommended.costIndex],
                ["25% Delivery Time", deliveryScore(recommended.deliveryTime)],
                ["20% Reliability", recommended.reliability],
                ["15% Stock Availability", stockScore(recommended.stock)]
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border bg-white p-4">
                  <div className="mb-3 flex items-center justify-between text-sm">
                    <span className="font-semibold">{label}</span>
                    <span className="text-muted-foreground">{value}%</span>
                  </div>
                  <Progress value={Number(value)} />
                </div>
              ))
            : null}
          <div className="flex items-center gap-2 rounded-lg border bg-emerald-50 p-4 text-sm font-semibold text-emerald-700">
            <CheckCircle2 className="h-5 w-5" />
            Recommendation ready for procurement approval
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
