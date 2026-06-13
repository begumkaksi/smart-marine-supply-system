"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import {
  categorySpend,
  costSavingsTrend,
  demandForecast,
  monthlyProcurementRequests,
  savingsTrend,
  supplierPerformance
} from "@/lib/data";

const chartColors = ["#0f4c81", "#3ddbd9", "#6aa6c8", "#b6f7e4", "#d8e0e8"];

export function SavingsChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={savingsTrend} margin={{ left: -20, right: 10, top: 10, bottom: 0 }}>
        <defs>
          <linearGradient id="optimized" x1="0" x2="0" y1="0" y2="1">
            <stop offset="5%" stopColor="#3ddbd9" stopOpacity={0.38} />
            <stop offset="95%" stopColor="#3ddbd9" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="baseline" x1="0" x2="0" y1="0" y2="1">
            <stop offset="5%" stopColor="#0f4c81" stopOpacity={0.22} />
            <stop offset="95%" stopColor="#0f4c81" stopOpacity={0.01} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#d8e0e8" strokeDasharray="4 4" vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
        <YAxis tickLine={false} axisLine={false} fontSize={12} />
        <Tooltip
          contentStyle={{
            borderRadius: 8,
            borderColor: "#d8e0e8",
            boxShadow: "0 14px 36px rgba(8,25,47,0.12)"
          }}
        />
        <Area type="monotone" dataKey="baseline" stroke="#0f4c81" fill="url(#baseline)" strokeWidth={2} />
        <Area type="monotone" dataKey="optimized" stroke="#3ddbd9" fill="url(#optimized)" strokeWidth={3} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function CategorySpendChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie data={categorySpend} dataKey="value" nameKey="name" innerRadius={58} outerRadius={94} paddingAngle={3}>
          {categorySpend.map((entry, index) => (
            <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            borderRadius: 8,
            borderColor: "#d8e0e8"
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function DemandChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={demandForecast} margin={{ left: -18, right: 10, top: 10 }}>
        <CartesianGrid stroke="#d8e0e8" strokeDasharray="4 4" vertical={false} />
        <XAxis dataKey="week" tickLine={false} axisLine={false} fontSize={12} />
        <YAxis tickLine={false} axisLine={false} fontSize={12} />
        <Tooltip contentStyle={{ borderRadius: 8, borderColor: "#d8e0e8" }} />
        <Line type="monotone" dataKey="provisions" stroke="#0f4c81" strokeWidth={3} dot={false} />
        <Line type="monotone" dataKey="engine" stroke="#3ddbd9" strokeWidth={3} dot={false} />
        <Line type="monotone" dataKey="safety" stroke="#6aa6c8" strokeWidth={3} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function SupplierScoreChart() {
  const data = [
    { factor: "Cost", score: 92 },
    { factor: "Lead time", score: 88 },
    { factor: "Port fit", score: 96 },
    { factor: "Compliance", score: 91 },
    { factor: "Inventory", score: 84 }
  ];

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} layout="vertical" margin={{ left: 8, right: 16, top: 8 }}>
        <CartesianGrid stroke="#d8e0e8" strokeDasharray="4 4" horizontal={false} />
        <XAxis type="number" hide domain={[0, 100]} />
        <YAxis dataKey="factor" type="category" tickLine={false} axisLine={false} width={86} fontSize={12} />
        <Tooltip contentStyle={{ borderRadius: 8, borderColor: "#d8e0e8" }} />
        <Bar dataKey="score" fill="#0f4c81" radius={[0, 6, 6, 0]} barSize={18} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function MonthlyRequestsChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={monthlyProcurementRequests} margin={{ left: -18, right: 12, top: 8 }}>
        <CartesianGrid stroke="#d8e0e8" strokeDasharray="4 4" vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
        <YAxis tickLine={false} axisLine={false} fontSize={12} />
        <Tooltip contentStyle={{ borderRadius: 8, borderColor: "#d8e0e8" }} />
        <Bar dataKey="requests" fill="#0f4c81" radius={[6, 6, 0, 0]} barSize={22} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function SupplierPerformanceChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={supplierPerformance} margin={{ left: -18, right: 12, top: 8 }}>
        <CartesianGrid stroke="#d8e0e8" strokeDasharray="4 4" vertical={false} />
        <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} />
        <YAxis tickLine={false} axisLine={false} fontSize={12} domain={[70, 100]} />
        <Tooltip contentStyle={{ borderRadius: 8, borderColor: "#d8e0e8" }} />
        <Bar dataKey="reliability" fill="#0f4c81" radius={[6, 6, 0, 0]} barSize={18} />
        <Bar dataKey="delivery" fill="#3ddbd9" radius={[6, 6, 0, 0]} barSize={18} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function CostSavingsTrendChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={costSavingsTrend} margin={{ left: -18, right: 12, top: 8 }}>
        <CartesianGrid stroke="#d8e0e8" strokeDasharray="4 4" vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
        <YAxis tickLine={false} axisLine={false} fontSize={12} domain={[10, 32]} tickFormatter={(value) => `${value}%`} />
        <Tooltip contentStyle={{ borderRadius: 8, borderColor: "#d8e0e8" }} formatter={(value) => [`${value}%`, "Savings"]} />
        <Line type="monotone" dataKey="savings" stroke="#0f4c81" strokeWidth={3} dot={{ r: 3, fill: "#3ddbd9" }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
