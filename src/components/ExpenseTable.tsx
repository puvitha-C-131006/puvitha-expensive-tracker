import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Expense, deleteExpense, updateExpense } from "@/lib/types";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { showSuccess } from "@/utils/toast";
import { EditExpenseDialog } from "./EditExpenseDialog";

interface ExpenseTableProps {
  expenses: Expense[];
  onDataChange: () => void; // Callback to notify parent when data is modified
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

export const ExpenseTable: React.FC<ExpenseTableProps> = ({ expenses, onDataChange }) => {
  
  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      deleteExpense(id);
      showSuccess("Expense deleted successfully.");
      onDataChange();
    }
  };

  const handleUpdate = (updatedExpense: Expense) => {
    updateExpense(updatedExpense);
    onDataChange();
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-center w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell className="font-medium">
                {format(new Date(expense.date), "MMM dd, yyyy")}
              </TableCell>
              <TableCell>{expense.category}</TableCell>
              <TableCell>{expense.description}</TableCell>
              <TableCell className="text-right font-semibold text-destructive">
                {formatCurrency(expense.amount)}
              </TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center space-x-1">
                  <EditExpenseDialog 
                    expense={expense} 
                    onExpenseUpdated={handleUpdate} 
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                    onClick={() => handleDelete(expense.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete Expense</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {expenses.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                No expenses found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};