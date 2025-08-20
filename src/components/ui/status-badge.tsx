import { cn } from "@/lib/utils";
import { PostStatus } from "@/types";
import { Badge } from "./badge";

interface StatusBadgeProps {
  status: PostStatus;
  className?: string;
}

const statusConfig = {
  pending: {
    label: "Pendente",
    variant: "secondary" as const,
    className: "bg-amber-100 text-amber-700 hover:bg-amber-200",
  },
  in_progress: {
    label: "Em Andamento",
    variant: "secondary" as const,
    className: "bg-blue-100 text-blue-700 hover:bg-blue-200",
  },
  resolved: {
    label: "Resolvido",
    variant: "secondary" as const,
    className: "bg-green-100 text-green-700 hover:bg-green-200",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} className={cn(config.className, className)}>
      {config.label}
    </Badge>
  );
}
