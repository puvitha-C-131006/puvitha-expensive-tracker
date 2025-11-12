import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ExpenseFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const ExpenseFilterBar: React.FC<ExpenseFilterBarProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="relative w-full max-w-lg">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search by category or description..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-9"
      />
    </div>
  );
};