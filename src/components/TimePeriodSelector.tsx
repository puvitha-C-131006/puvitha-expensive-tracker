import React from "react";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";

type TimePeriod = "monthly" | "yearly";

interface TimePeriodSelectorProps {
  selectedPeriod: TimePeriod;
  onPeriodChange: (period: TimePeriod) => void;
}

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
      <ToggleGroupItem value="monthly" aria-label="Toggle monthly">
        Monthly
      </ToggleGroupItem>
      <ToggleGroupItem value="yearly" aria-label="Toggle yearly">
        Yearly
      </ToggleGroupItem>
    </ToggleGroup>
  );
};