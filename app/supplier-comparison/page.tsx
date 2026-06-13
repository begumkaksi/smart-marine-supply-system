import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { SupplierComparisonWorkspace } from "@/components/supplier-comparison-workspace";
import { pageSummaries } from "@/lib/data";

export default function SupplierComparisonPage() {
  const summary = pageSummaries.supplierComparison;

  return (
    <AppShell>
      <PageHeader {...summary} />
      <SupplierComparisonWorkspace />
    </AppShell>
  );
}
