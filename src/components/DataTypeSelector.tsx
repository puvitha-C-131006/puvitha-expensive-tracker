import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ArrowDown, ArrowUp } from "lucide-react";

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
        if (value) {
          onTypeChange(value as DataType);
        }
      }}
      aria-label="Select data type"
      className="h-9"
    >
      <ToggleGroupItem value="expenses" aria-label="Toggle expenses">
        <ArrowDown className="h-4 w-4 text-destructive mr-1" />
        Expenses
      </ToggleGroupItem>
      <ToggleGroupItem value="income" aria-label="Toggle income">
        <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
        Income
      </ToggleGroupItem>
    </ToggleGroup>
  );
};