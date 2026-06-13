import { DatabaseZap, LockKeyhole, PlugZap, Workflow } from "lucide-react";

import { ActionButton } from "@/components/action-button";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { pageSummaries } from "@/lib/data";

export default function SettingsPage() {
  const summary = pageSummaries.settings;

  return (
    <AppShell>
      <PageHeader {...summary} badge="Admin" />
      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle>Decision Controls</CardTitle>
            <CardDescription>Govern how AI recommendations are scored and approved.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Cost weight", value: 42 },
              { label: "Lead time weight", value: 28 },
              { label: "Supplier risk weight", value: 19 },
              { label: "Port coverage weight", value: 11 }
            ].map((control) => (
              <div key={control.label} className="rounded-lg border bg-white p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-semibold">{control.label}</span>
                  <span className="text-sm text-muted-foreground">{control.value}%</span>
                </div>
                <Progress value={control.value} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass-panel">
          <CardHeader>
            <CardTitle>Integrations</CardTitle>
            <CardDescription>Connect procurement data with fleet and finance systems.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { title: "ERP procurement sync", note: "SAP, Oracle, Dynamics", icon: DatabaseZap, status: "Connected" },
              { title: "Supplier EDI gateway", note: "Order status and ASN updates", icon: PlugZap, status: "Live" },
              { title: "Approval workflow", note: "Multi-role spend approvals", icon: Workflow, status: "Enabled" },
              { title: "Security posture", note: "SSO, audit logs, and role controls", icon: LockKeyhole, status: "Compliant" }
            ].map((integration) => {
              const Icon = integration.icon;
              return (
                <div key={integration.title} className="flex flex-col gap-3 rounded-lg border bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-cyan-700" />
                    <div>
                      <p className="font-semibold">{integration.title}</p>
                      <p className="text-sm text-muted-foreground">{integration.note}</p>
                    </div>
                  </div>
                  <Badge variant="success">{integration.status}</Badge>
                </div>
              );
            })}
            <ActionButton iconName="sliders" message="Approval and scoring rules saved.">
              Configure Rules
            </ActionButton>
          </CardContent>
        </Card>
      </section>
    </AppShell>
  );
}
