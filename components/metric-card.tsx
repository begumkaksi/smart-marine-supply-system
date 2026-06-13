import { ArrowUpRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type MetricCardProps = {
  label: string;
  value: string;
  change: string;
  tone: string;
};

export function MetricCard({ label, value, change, tone }: MetricCardProps) {
  return (
    <Card className="glass-panel">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <ArrowUpRight className={cn("h-4 w-4", tone)} />
        </div>
        <div className="mt-4 flex items-end justify-between gap-3">
          <p className="text-3xl font-semibold tracking-normal">{value}</p>
          <p className={cn("text-sm font-semibold", tone)}>{change}</p>
        </div>
      </CardContent>
    </Card>
  );
}
