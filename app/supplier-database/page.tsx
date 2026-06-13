import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { SupplierDatabaseTable } from "@/components/supplier-database-table";
import { pageSummaries } from "@/lib/data";

export default function SupplierDatabasePage() {
  const summary = pageSummaries.supplierDatabase;

  return (
    <AppShell>
      <PageHeader {...summary} />
      <SupplierDatabaseTable />
    </AppShell>
  );
}
