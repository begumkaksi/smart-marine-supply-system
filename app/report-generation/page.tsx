import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { ReportGenerationWorkspace } from "@/components/report-generation-workspace";
import { pageSummaries } from "@/lib/data";

export default function ReportGenerationPage() {
  const summary = pageSummaries.reportGeneration;

  return (
    <AppShell>
      <PageHeader {...summary} />
      <ReportGenerationWorkspace />
    </AppShell>
  );
}
