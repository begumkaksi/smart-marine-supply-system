import { LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";

type PageHeaderProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
};

export function PageHeader({ title, description, icon: Icon, badge = "AI-assisted" }: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 rounded-lg border bg-marine-navy p-5 text-white shadow-soft md:flex-row md:items-center md:justify-between">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent text-marine-navy">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-normal md:text-3xl">{title}</h1>
            <Badge variant="info">{badge}</Badge>
          </div>
          <p className="max-w-3xl text-sm leading-6 text-slate-200">{description}</p>
        </div>
      </div>
    </div>
  );
}
