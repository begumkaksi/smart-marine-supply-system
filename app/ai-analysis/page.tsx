import { AppShell } from "@/components/app-shell";
import { AiAnalysisWorkflow } from "@/components/ai-analysis-workflow";
import { PageHeader } from "@/components/page-header";
import { pageSummaries } from "@/lib/data";

export default function AiAnalysisPage() {
  const summary = pageSummaries.aiAnalysis;

  return (
    <AppShell>
      <PageHeader {...summary} />
      <AiAnalysisWorkflow />
    </AppShell>
  );
}
