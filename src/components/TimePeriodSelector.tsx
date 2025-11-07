import React from "react";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

type TimePeriod = "monthly" | "yearly";

interface TimePeriodSelectorProps {
  selectedPeriod: TimePeriod;
  onPeriodChange: (period: TimePeriod) => void;
}

const activeGradientClasses = cn(
  "data-[state=on]:bg-gradient-to-r data-[state=on]:from-[hsl(var(--gradient-start))] data-[state=on]:to-[hsl(var(--gradient-end))]",
  "data-[state=on]:text-primary-foreground data-[state=on]:shadow-md",
  "data-[state=on]:hover:bg-gradient-to-r" // Prevent hover from overriding gradient
);

export const TimePeriodSelector: React.FC<TimePeriodSelectorProps> = ({
  selectedPeriod,
  onPeriodChange,
}) => {
  return (
    <ToggleGroup
      type="single"
      value={selectedPeriod}
      onValueChange={(value: string) => {
        if (value === "monthly" || value === "yearly") {
          onPeriodChange(value);
        }
      }}
      className="w-fit"
    >
      <ToggleGroupItem value="monthly" aria-label="Toggle monthly" className={activeGradientClasses}>
        Monthly
      </ToggleGroupItem>
      <ToggleGroupItem value="yearly" aria-label="Toggle yearly" className={activeGradientClasses}>
        Yearly
      </ToggleGroupItem>
    </ToggleGroup>
  );
};