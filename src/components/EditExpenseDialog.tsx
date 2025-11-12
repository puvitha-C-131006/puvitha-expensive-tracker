import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { AddExpenseForm } from "./AddExpenseForm";
import { Expense } from "@/lib/types";

interface EditExpenseDialogProps {
  expense: Expense;
  onExpenseUpdated: (expense: Expense) => void;
}

export const EditExpenseDialog: React.FC<EditExpenseDialogProps> = ({ expense, onExpenseUpdated }) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);

  const handleUpdate = (updatedValues: Omit<Expense, 'id'>) => {
    const updatedExpense: Expense = {
      ...updatedValues,
      id: expense.id,
    };
    onExpenseUpdated(updatedExpense);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 p-0 text-muted-foreground hover:text-primary">
          <Pencil className="h-4 w-4" />
          <span className="sr-only">Edit Expense</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Expense</DialogTitle>
          <DialogDescription>
            Modify the details for this expense.
          </DialogDescription>
        </DialogHeader>
        <AddExpenseForm 
          initialData={{
            date: new Date(expense.date),
            category: expense.category,
            description: expense.description,
            amount: expense.amount,
          }}
          onExpenseAdded={handleUpdate} 
          onClose={handleClose} 
        />
      </DialogContent>
    </Dialog>
  );
};