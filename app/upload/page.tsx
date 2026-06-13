import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { UploadWorkspace } from "@/components/upload-workspace";
import { pageSummaries } from "@/lib/data";

export default function UploadPage() {
  const summary = pageSummaries.upload;

  return (
    <AppShell>
      <PageHeader {...summary} />
      <UploadWorkspace />
    </AppShell>
  );
}
