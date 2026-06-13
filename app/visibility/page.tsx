import { AlertTriangle, CheckCircle2, MapPinned, RadioTower, Ship } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { pageSummaries, routes } from "@/lib/data";

export default function VisibilityPage() {
  const summary = pageSummaries.visibility;

  return (
    <AppShell>
      <PageHeader {...summary} />
      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="glass-panel overflow-hidden">
          <CardHeader>
            <CardTitle>Fleet Supply Visibility</CardTitle>
            <CardDescription>Port call readiness and delivery exposure across active vessels.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative min-h-[390px] overflow-hidden rounded-lg border bg-marine-navy p-6 text-white">
              <div className="absolute inset-0 opacity-25 marine-grid" />
              <div className="absolute left-[18%] top-[30%] h-3 w-3 rounded-full bg-accent shadow-[0_0_0_10px_rgba(61,219,217,0.16)]" />
              <div className="absolute left-[46%] top-[48%] h-3 w-3 rounded-full bg-accent shadow-[0_0_0_10px_rgba(61,219,217,0.16)]" />
              <div className="absolute left-[70%] top-[25%] h-3 w-3 rounded-full bg-accent shadow-[0_0_0_10px_rgba(61,219,217,0.16)]" />
              <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/35" />
              <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/35" />
              <div className="absolute left-1/2 top-1/2 h-32 w-1 origin-top animate-sweep bg-gradient-to-b from-accent to-transparent" />
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-cyan-100">Maritime visibility layer</p>
                  <p className="mt-2 max-w-md text-2xl font-semibold">Procurement readiness across open port calls</p>
                </div>
                <RadioTower className="h-8 w-8 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel">
          <CardHeader>
            <CardTitle>Port Call Milestones</CardTitle>
            <CardDescription>Supply chain status by vessel.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {routes.map((route, index) => (
              <div key={route.vessel} className="rounded-lg border bg-white p-4">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    {index === 2 ? (
                      <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-600" />
                    ) : (
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
                    )}
                    <div>
                      <p className="font-semibold">{route.vessel}</p>
                      <p className="text-sm text-muted-foreground">
                        <MapPinned className="mr-1 inline h-3.5 w-3.5" />
                        {route.port} · ETA {route.eta}
                      </p>
                    </div>
                  </div>
                  <Ship className="h-5 w-5 text-cyan-700" />
                </div>
                <Progress value={route.fill} />
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </AppShell>
  );
}
