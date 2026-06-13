"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/providers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supplierDatabase } from "@/lib/data";

type SortKey = "score" | "name" | "costIndex" | "deliveryTime";

const countryByPort: Record<string, string> = {
  Rotterdam: "Netherlands",
  Singapore: "Singapore",
  Busan: "South Korea",
  "Jebel Ali": "UAE",
  Hamburg: "Germany",
  Antwerp: "Belgium",
  Shanghai: "China",
  Gdansk: "Poland",
  Piraeus: "Greece",
  Doha: "Qatar",
  Oslo: "Norway",
  Valencia: "Spain",
  Kaohsiung: "Taiwan",
  "Cape Town": "South Africa",
  "Los Angeles": "USA",
  Panama: "Panama",
  Lisbon: "Portugal",
  Bergen: "Norway",
  Jeddah: "Saudi Arabia",
  Tokyo: "Japan",
  Vancouver: "Canada",
  Houston: "USA",
  Constanta: "Romania",
  Jakarta: "Indonesia",
  "Abu Dhabi": "UAE",
  Alexandria: "Egypt",
  "New York": "USA",
  Montreal: "Canada"
};

function getRating(score: number) {
  if (score >= 92) {
    return "A";
  }
  if (score >= 85) {
    return "B";
  }
  return "C";
}

export function SupplierDatabaseTable() {
  const { notify } = useToast();
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("All");
  const [category, setCategory] = useState("All");
  const [rating, setRating] = useState("All");
  const [availability, setAvailability] = useState("All");
  const [sortKey, setSortKey] = useState<SortKey>("score");

  const categories = ["All", ...Array.from(new Set(supplierDatabase.map((supplier) => supplier.category)))];
  const countries = ["All", ...Array.from(new Set(supplierDatabase.map((supplier) => countryByPort[supplier.port] ?? "Other"))).sort()];
  const ratings = ["All", "A", "B", "C"];
  const availabilityLevels = ["All", "High", "Medium", "Low"];

  const filteredSuppliers = useMemo(() => {
    return supplierDatabase
      .filter((supplier) => {
        const supplierCountry = countryByPort[supplier.port] ?? "Other";
        const supplierRating = getRating(supplier.score);
        const matchesQuery = `${supplier.name} ${supplier.port} ${supplier.category} ${supplierCountry}`
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesCountry = country === "All" || supplierCountry === country;
        const matchesCategory = category === "All" || supplier.category === category;
        const matchesRating = rating === "All" || supplierRating === rating;
        const matchesAvailability = availability === "All" || supplier.stock === availability;
        return matchesQuery && matchesCountry && matchesCategory && matchesRating && matchesAvailability;
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
  }, [availability, category, country, query, rating, sortKey]);

  return (
    <Card className="glass-panel">
      <CardHeader className="gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <CardTitle>Verified Suppliers</CardTitle>
          <p className="mt-2 text-sm text-muted-foreground">Showing {filteredSuppliers.length} of 28 suppliers.</p>
        </div>
        <div className="grid gap-2 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.7fr_0.8fr_0.8fr]">
          <label className="flex items-center gap-2 rounded-md border bg-white px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              className="w-full bg-transparent text-sm outline-none"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search suppliers"
            />
          </label>
          <select className="rounded-md border bg-white px-3 py-2 text-sm" value={country} onChange={(event) => setCountry(event.target.value)}>
            {countries.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <select className="rounded-md border bg-white px-3 py-2 text-sm" value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <select className="rounded-md border bg-white px-3 py-2 text-sm" value={rating} onChange={(event) => setRating(event.target.value)}>
            {ratings.map((item) => (
              <option key={item} value={item}>{item === "All" ? "All ratings" : `Rating ${item}`}</option>
            ))}
          </select>
          <select className="rounded-md border bg-white px-3 py-2 text-sm" value={availability} onChange={(event) => setAvailability(event.target.value)}>
            {availabilityLevels.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <select className="rounded-md border bg-white px-3 py-2 text-sm" value={sortKey} onChange={(event) => setSortKey(event.target.value as SortKey)}>
            <option value="score">Sort by score</option>
            <option value="costIndex">Sort by cost</option>
            <option value="deliveryTime">Sort by delivery</option>
          </select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto rounded-lg border bg-white">
          <div className="grid min-w-[1020px] grid-cols-[1.5fr_0.9fr_0.9fr_0.8fr_0.7fr_0.8fr_0.8fr_0.7fr] bg-muted px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
            <span>Supplier</span>
            <span>Country</span>
            <span>Port</span>
            <span>Category</span>
            <span>Rating</span>
            <span>Cost</span>
            <span>Delivery</span>
            <span>Score</span>
          </div>
          {filteredSuppliers.map((supplier) => (
            <div key={supplier.name} className="grid min-w-[1020px] grid-cols-[1.5fr_0.9fr_0.9fr_0.8fr_0.7fr_0.8fr_0.8fr_0.7fr] items-center border-t px-4 py-3 text-sm">
              <span className="font-semibold">{supplier.name}</span>
              <span className="text-muted-foreground">{countryByPort[supplier.port] ?? "Other"}</span>
              <span className="text-muted-foreground">{supplier.port}</span>
              <span>{supplier.category}</span>
              <Badge variant={getRating(supplier.score) === "A" ? "success" : getRating(supplier.score) === "B" ? "info" : "warning"}>
                {getRating(supplier.score)}
              </Badge>
              <span>{supplier.costIndex}/100</span>
              <span>{supplier.deliveryTime}</span>
              <span className="font-semibold text-cyan-700">{supplier.score}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => notify("Supplier search applied.")}>Search</Button>
          <Button variant="outline" size="sm" onClick={() => notify("Supplier filters applied.")}>Filter</Button>
          <Button variant="outline" size="sm" onClick={() => notify("Supplier list sorted.")}>Sort</Button>
        </div>
      </CardContent>
    </Card>
  );
}
