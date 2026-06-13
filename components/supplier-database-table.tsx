"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supplierDatabase } from "@/lib/data";

type SortKey = "score" | "name" | "costIndex" | "deliveryTime";

export function SupplierDatabaseTable() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [stock, setStock] = useState("All");
  const [sortKey, setSortKey] = useState<SortKey>("score");

  const categories = ["All", ...Array.from(new Set(supplierDatabase.map((supplier) => supplier.category)))];
  const stockLevels = ["All", "High", "Medium", "Low"];

  const filteredSuppliers = useMemo(() => {
    return supplierDatabase
      .filter((supplier) => {
        const matchesQuery = `${supplier.name} ${supplier.port} ${supplier.category}`
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesCategory = category === "All" || supplier.category === category;
        const matchesStock = stock === "All" || supplier.stock === stock;
        return matchesQuery && matchesCategory && matchesStock;
      })
      .sort((a, b) => {
        if (sortKey === "name") {
          return a.name.localeCompare(b.name);
        }

        if (sortKey === "deliveryTime") {
          return Number.parseInt(a.deliveryTime, 10) - Number.parseInt(b.deliveryTime, 10);
        }

        return b[sortKey] - a[sortKey];
      });
  }, [category, query, sortKey, stock]);

  return (
    <Card className="glass-panel">
      <CardHeader className="gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <CardTitle>Verified Suppliers</CardTitle>
          <p className="mt-2 text-sm text-muted-foreground">Showing {filteredSuppliers.length} of 28 suppliers.</p>
        </div>
        <div className="grid gap-2 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
          <label className="flex items-center gap-2 rounded-md border bg-white px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              className="w-full bg-transparent text-sm outline-none"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search suppliers"
            />
          </label>
          <select className="rounded-md border bg-white px-3 py-2 text-sm" value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <select className="rounded-md border bg-white px-3 py-2 text-sm" value={stock} onChange={(event) => setStock(event.target.value)}>
            {stockLevels.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <select className="rounded-md border bg-white px-3 py-2 text-sm" value={sortKey} onChange={(event) => setSortKey(event.target.value as SortKey)}>
            <option value="score">Sort by score</option>
            <option value="costIndex">Sort by cost</option>
            <option value="deliveryTime">Sort by delivery</option>
            <option value="name">Sort by name</option>
          </select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto rounded-lg border bg-white">
          <div className="grid min-w-[860px] grid-cols-[1.5fr_0.9fr_0.9fr_0.8fr_0.8fr_0.8fr_0.7fr] bg-muted px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
            <span>Supplier</span>
            <span>Port</span>
            <span>Category</span>
            <span>Cost</span>
            <span>Delivery</span>
            <span>Stock</span>
            <span>Score</span>
          </div>
          {filteredSuppliers.map((supplier) => (
            <div key={supplier.name} className="grid min-w-[860px] grid-cols-[1.5fr_0.9fr_0.9fr_0.8fr_0.8fr_0.8fr_0.7fr] items-center border-t px-4 py-3 text-sm">
              <span className="font-semibold">{supplier.name}</span>
              <span className="text-muted-foreground">{supplier.port}</span>
              <span>{supplier.category}</span>
              <span>{supplier.costIndex}/100</span>
              <span>{supplier.deliveryTime}</span>
              <Badge variant={supplier.stock === "High" ? "success" : supplier.stock === "Low" ? "warning" : "info"}>
                {supplier.stock}
              </Badge>
              <span className="font-semibold text-cyan-700">{supplier.score}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="outline" size="sm">Search</Button>
          <Button variant="outline" size="sm">Filter</Button>
          <Button variant="outline" size="sm">Sort</Button>
        </div>
      </CardContent>
    </Card>
  );
}
