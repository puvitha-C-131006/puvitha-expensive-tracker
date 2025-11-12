import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Income } from "@/lib/types";
import { format } from "date-fns";

interface IncomeTableProps {
  incomes: Income[];
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

export const IncomeTable: React.FC<IncomeTableProps> = ({ incomes }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Source</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {incomes.map((income) => (
            <TableRow key={income.id}>
              <TableCell className="font-medium">
                {format(new Date(income.date), "MMM dd, yyyy")}
              </TableCell>
              <TableCell>{income.source}</TableCell>
              <TableCell className="text-right font-semibold text-green-600 dark:text-green-400">
                {formatCurrency(income.amount)}
              </TableCell>
            </TableRow>
          ))}
          {incomes.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">
                No income records found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};