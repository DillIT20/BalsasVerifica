import { cn } from "@/lib/utils";
import { PostCategory } from "@/types";
import { Badge } from "./badge";
import { categories } from "@/lib/mockData";

interface CategoryBadgeProps {
  category: PostCategory;
  className?: string;
  showIcon?: boolean;
}

export function CategoryBadge({
  category,
  className,
  showIcon = true,
}: CategoryBadgeProps) {
  const categoryData = categories.find((c) => c.value === category);

  if (!categoryData) return null;

  return (
    <Badge variant="outline" className={cn("text-xs", className)}>
      {showIcon && <span className="mr-1">{categoryData.icon}</span>}
      {categoryData.label}
    </Badge>
  );
}
