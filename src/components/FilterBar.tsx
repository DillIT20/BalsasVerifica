import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Filter, PostCategory, PostStatus, InstitutionType } from "@/types";
import { categories, postStatuses } from "@/lib/mockData";
import { Search, X, Filter as FilterIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
  className?: string;
}

export function FilterBar({
  filter,
  onFilterChange,
  className,
}: FilterBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const updateFilter = (updates: Partial<Filter>) => {
    onFilterChange({ ...filter, ...updates });
  };

  const toggleCategory = (category: PostCategory) => {
    const categories = filter.categories.includes(category)
      ? filter.categories.filter((c) => c !== category)
      : [...filter.categories, category];
    updateFilter({ categories });
  };

  const toggleStatus = (status: PostStatus) => {
    const statuses = filter.status.includes(status)
      ? filter.status.filter((s) => s !== status)
      : [...filter.status, status];
    updateFilter({ status: statuses });
  };

  const toggleInstitutionType = (type: InstitutionType) => {
    const types = filter.institutionTypes.includes(type)
      ? filter.institutionTypes.filter((t) => t !== type)
      : [...filter.institutionTypes, type];
    updateFilter({ institutionTypes: types });
  };

  const clearAllFilters = () => {
    onFilterChange({
      categories: [],
      status: [],
      institutionTypes: [],
      search: "",
    });
  };

  const activeFiltersCount =
    filter.categories.length +
    filter.status.length +
    filter.institutionTypes.length +
    (filter.search ? 1 : 0);

  return (
    <Card className={cn("p-4 space-y-4", className)}>
      {/* Search and Toggle */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar posts..."
            value={filter.search || ""}
            onChange={(e) => updateFilter({ search: e.target.value })}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="gap-2"
        >
          <FilterIcon className="h-4 w-4" />
          Filtros
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="gap-2 text-muted-foreground"
          >
            <X className="h-4 w-4" />
            Limpar
          </Button>
        )}
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="space-y-4 border-t pt-4">
          {/* Categories */}
          <div>
            <h4 className="text-sm font-medium mb-2">Categorias</h4>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant={
                    filter.categories.includes(category.value)
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  onClick={() => toggleCategory(category.value)}
                  className="h-8 gap-1 text-xs"
                >
                  <span>{category.icon}</span>
                  {category.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <h4 className="text-sm font-medium mb-2">Status</h4>
            <div className="flex flex-wrap gap-2">
              {postStatuses.map((status) => (
                <Button
                  key={status.value}
                  variant={
                    filter.status.includes(status.value) ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => toggleStatus(status.value)}
                  className={cn(
                    "h-8 text-xs",
                    filter.status.includes(status.value)
                      ? ""
                      : `hover:${status.bgColor} ${status.color}`,
                  )}
                >
                  {status.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Institution Types */}
          <div>
            <h4 className="text-sm font-medium mb-2">Tipo de Instituição</h4>
            <div className="flex gap-2">
              <Button
                variant={
                  filter.institutionTypes.includes("empresa")
                    ? "default"
                    : "outline"
                }
                size="sm"
                onClick={() => toggleInstitutionType("empresa")}
                className="h-8 text-xs"
              >
                🏢 Empresas
              </Button>
              <Button
                variant={
                  filter.institutionTypes.includes("prefeitura")
                    ? "default"
                    : "outline"
                }
                size="sm"
                onClick={() => toggleInstitutionType("prefeitura")}
                className="h-8 text-xs"
              >
                🏛️ Prefeituras
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
