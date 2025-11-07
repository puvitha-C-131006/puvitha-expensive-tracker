import React from "react";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

type DataType = "expenses" | "income";

interface DataTypeSelectorProps {
  selectedType: DataType;
  onTypeChange: (type: DataType) => void;
}

const activeGradientClasses = cn(
  "data-[state=on]:bg-gradient-to-r data-[state=on]:from-[hsl(var(--gradient-start))] data-[state=on]:to-[hsl(var(--gradient-end))]",
  "data-[state=on]:text-primary-foreground data-[state=on]:shadow-md",
  "data-[state=on]:hover:bg-gradient-to-r" // Prevent hover from overriding gradient
);

export const DataTypeSelector: React.FC<DataTypeSelectorProps> = ({
  selectedType,
  onTypeChange,
}) => {
  return (
    <ToggleGroup
      type="single"
      value={selectedType}
      onValueChange={(value: string) => {
        if (value === "expenses" || value === "income") {
          onTypeChange(value);
        }
      }}
      className="w-fit"
    >
      <ToggleGroupItem value="expenses" aria-label="Toggle expenses" className={activeGradientClasses}>
        Expenses
      </ToggleGroupItem>
      <ToggleGroupItem value="income" aria-label="Toggle income" className={activeGradientClasses}>
        Income
      </ToggleGroupItem>
    </ToggleGroup>
  );
};