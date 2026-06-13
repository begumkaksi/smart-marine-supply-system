import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { ResultsDashboardWorkspace } from "@/components/results-dashboard-workspace";
import { pageSummaries } from "@/lib/data";

export default function ResultsPage() {
  const summary = pageSummaries.results;

  return (
    <AppShell>
      <PageHeader {...summary} />
      <ResultsDashboardWorkspace />
    </AppShell>
  );
}
