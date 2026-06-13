"use client";

import { useRouter } from "next/navigation";
import { CheckCircle2, Download, Filter, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/providers";

type ActionButtonProps = {
  children: React.ReactNode;
  href?: string;
  message?: string;
  iconName?: "check" | "download" | "filter" | "sliders";
  className?: string;
  variant?: "default" | "secondary" | "outline" | "ghost" | "accent";
  size?: "default" | "sm" | "icon";
};

const icons = {
  check: CheckCircle2,
  download: Download,
  filter: Filter,
  sliders: SlidersHorizontal
};

export function ActionButton({
  children,
  href,
  message,
  iconName,
  className,
  variant,
  size
}: ActionButtonProps) {
  const router = useRouter();
  const { notify } = useToast();
  const Icon = iconName ? icons[iconName] : null;

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={() => {
        if (message) {
          notify(message);
        }
        if (href) {
          router.push(href);
        }
      }}
    >
      {Icon ? <Icon className="h-4 w-4" /> : null}
      {children}
    </Button>
  );
}
