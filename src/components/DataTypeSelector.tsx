import React from "react";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";

type DataType = "expenses" | "income";

interface DataTypeSelectorProps {
  selectedType: DataType;
  onTypeChange: (type: DataType) => void;
}

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
      <ToggleGroupItem value="expenses" aria-label="Toggle expenses">
        Expenses
      </ToggleGroupItem>
      <ToggleGroupItem value="income" aria-label="Toggle income">
        Income
      </ToggleGroupItem>
    </ToggleGroup>
  );
};