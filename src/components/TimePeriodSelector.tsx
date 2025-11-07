import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Calendar, Clock } from "lucide-react";

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
        if (value) {
          onPeriodChange(value as TimePeriod);
        }
      }}
      aria-label="Select time period"
      className="h-9"
    >
      <ToggleGroupItem value="monthly" aria-label="Toggle monthly">
        <Clock className="h-4 w-4 mr-1" />
        Monthly
      </ToggleGroupItem>
      <ToggleGroupItem value="yearly" aria-label="Toggle yearly">
        <Calendar className="h-4 w-4 mr-1" />
        Yearly
      </ToggleGroupItem>
    </ToggleGroup>
  );
};