import { Activity, AlertTriangle, CheckCircle2, Clock, Route } from "lucide-react";

import { ActionButton } from "@/components/action-button";
import { AppShell } from "@/components/app-shell";
import {
  CostSavingsTrendChart,
  MonthlyRequestsChart,
  SupplierPerformanceChart
} from "@/components/charts";
import { MetricCard } from "@/components/metric-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { kpis, purchaseOrders, routes } from "@/lib/data";

export default function DashboardPage() {
  return (
    <AppShell>
      <section className="mb-6 grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="rounded-lg bg-marine-navy p-6 text-white shadow-soft">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div>
              <Badge variant="info">Live procurement command center</Badge>
              <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-normal md:text-5xl">
                SMART MARINE SUPPLY OPTIMIZATION SYSTEM
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-200 md:text-base">
                AI-driven supplier selection, demand prediction, and supply chain visibility for fleet procurement teams handling 5,200+ annual requests.
              </p>
            </div>
            <div className="grid w-full gap-2 sm:grid-cols-2 md:w-auto md:grid-cols-1">
              <ActionButton
                variant="accent"
                className="w-full"
                iconName="check"
                message="Batch approved successfully."
              >
                Approve Batch
              </ActionButton>
              <ActionButton href="/upload" className="w-full" message="Opening supply list upload.">
                Upload Supply List
              </ActionButton>
              <ActionButton href="/supplier-database" className="w-full" variant="outline">
                View Suppliers
              </ActionButton>
              <ActionButton href="/report-generation" className="w-full" variant="outline">
                Generate Report
              </ActionButton>
            </div>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              ["Supplier network", "1,800+"],
              ["Cost saving band", "15-30%"],
              ["Lead time gain", "20-40%"]
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-white/10 bg-white/[0.08] p-4">
                <p className="text-xs uppercase tracking-[0.12em] text-cyan-100">{label}</p>
                <p className="mt-2 text-2xl font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-lg border bg-white p-5 shadow-soft">
          <div className="absolute right-[-96px] top-[-96px] h-64 w-64 rounded-full border border-cyan-200" />
          <div className="absolute right-[-54px] top-[-54px] h-44 w-44 rounded-full border border-cyan-300" />
          <div className="relative">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-50 text-cyan-700">
                <Route className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">Global route readiness</p>
                <p className="text-xs text-muted-foreground">4 vessel calls under procurement watch</p>
              </div>
            </div>
            <div className="mt-7 space-y-4">
              {routes.map((route) => (
                <div key={route.vessel}>
                  <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                    <span className="font-medium">{route.vessel}</span>
                    <span className="text-muted-foreground">{route.port}</span>
                  </div>
                  <Progress value={route.fill} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <MetricCard key={kpi.label} {...kpi} />
        ))}
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Card className="glass-panel">
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Monthly Procurement Requests Chart</CardTitle>
              <CardDescription>Request volume across the active fleet network.</CardDescription>
            </div>
            <Badge variant="info">5,200+ annualized</Badge>
          </CardHeader>
          <CardContent>
            <MonthlyRequestsChart />
          </CardContent>
        </Card>

        <Card className="glass-panel">
          <CardHeader>
            <CardTitle>Supplier Performance Chart</CardTitle>
            <CardDescription>Reliability and delivery quality for top supplier lanes.</CardDescription>
          </CardHeader>
          <CardContent>
            <SupplierPerformanceChart />
          </CardContent>
        </Card>
      </section>

      <section className="mt-6">
        <Card className="glass-panel">
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Cost Savings Trend</CardTitle>
              <CardDescription>Average realized savings percentage after AI optimization.</CardDescription>
            </div>
            <Badge variant="success">15-30% range</Badge>
          </CardHeader>
          <CardContent>
            <CostSavingsTrendChart />
          </CardContent>
        </Card>
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle>AI Recommendations</CardTitle>
            <CardDescription>Actions ranked by value, urgency, and confidence.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { icon: CheckCircle2, title: "Split provisions order across Rotterdam suppliers", note: "Saves $18,400 with no ETA risk." },
              { icon: AlertTriangle, title: "Review safety stock for Busan call", note: "One supplier has incomplete certificate metadata." },
              { icon: Clock, title: "Advance engine parts order by 18 hours", note: "Weather delay increases buffer requirement." }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex gap-3 rounded-lg border bg-white p-4">
                  <Icon className="mt-0.5 h-5 w-5 text-cyan-700" />
                  <div>
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.note}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="glass-panel">
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Purchase Order Queue</CardTitle>
              <CardDescription>Prioritized by value and vessel schedule.</CardDescription>
            </div>
            <Activity className="h-5 w-5 text-cyan-700" />
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-lg border bg-white">
              <div className="grid grid-cols-4 bg-muted px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                <span>Order</span>
                <span>Vessel</span>
                <span>Value</span>
                <span>Status</span>
              </div>
              {purchaseOrders.map((order) => (
                <div key={order.id} className="grid grid-cols-4 items-center border-t px-4 py-3 text-sm">
                  <span className="font-semibold">{order.id}</span>
                  <span className="truncate">{order.vessel}</span>
                  <span>{order.value}</span>
                  <Badge variant={order.status === "Ready" ? "success" : order.status === "Review" ? "warning" : "info"}>
                    {order.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </AppShell>
  );
}
