import { ArrowDown, ArrowUp, MinusIcon } from "lucide-react";
import { cn, formatNumber, formatPercentChange } from "@/app/lib/utils";
import { Metric } from "@/app/types";

interface MetricCardProps {
  metric: Metric;
  className?: string;
}

export function MetricCard({ metric, className }: MetricCardProps) {
  const { name, value, unit, change, trend } = metric;
  
  const getTrendIcon = () => {
    if (!trend) return null;
    
    switch (trend) {
      case "up":
        return <ArrowUp className={cn("h-4 w-4", change && change > 0 ? "text-green-500" : "text-red-500")} />;
      case "down":
        return <ArrowDown className={cn("h-4 w-4", change && change < 0 ? "text-green-500" : "text-red-500")} />;
      case "neutral":
        return <MinusIcon className="h-4 w-4 text-gray-500" />;
      default:
        return null;
    }
  };
  
  const getTrendColor = () => {
    if (!trend) return "text-gray-500";
    
    switch (trend) {
      case "up":
        return change && change > 0 ? "text-green-600" : "text-red-600";
      case "down":
        return change && change < 0 ? "text-green-600" : "text-red-600";
      case "neutral":
        return "text-gray-500";
      default:
        return "text-gray-500";
    }
  };
  
  return (
    <div className={cn("bg-white rounded-lg border border-gray-200 p-6", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500">{name}</h3>
        {trend && change && (
          <div className={cn("flex items-center gap-1 text-sm font-medium", getTrendColor())}>
            {getTrendIcon()}
            <span>{formatPercentChange(change)}</span>
          </div>
        )}
      </div>
      
      <div className="mt-2 flex items-baseline">
        <div className="text-3xl font-semibold text-gray-900">
          {unit === '€' ? `${unit}${formatNumber(value)}` : formatNumber(value)}
        </div>
        {unit !== '€' && unit && <div className="ml-1 text-lg text-gray-500">{unit}</div>}
      </div>
    </div>
  );
} 