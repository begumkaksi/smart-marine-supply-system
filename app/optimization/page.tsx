import { AppShell } from "@/components/app-shell";
import { OptimizationWorkspace } from "@/components/optimization-workspace";
import { PageHeader } from "@/components/page-header";
import { pageSummaries } from "@/lib/data";

export default function OptimizationPage() {
  const summary = pageSummaries.optimization;

  return (
    <AppShell>
      <PageHeader {...summary} />
      <OptimizationWorkspace />
    </AppShell>
  );
}
