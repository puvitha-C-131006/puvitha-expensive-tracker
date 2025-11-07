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
import { PlusCircle } from "lucide-react";
import { AddExpenseForm } from "./AddExpenseForm";

interface AddExpenseDialogProps {
  onExpenseAdded: (expense: any) => void;
}

export const AddExpenseDialog: React.FC<AddExpenseDialogProps> = ({ onExpenseAdded }) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Expense
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Expense</DialogTitle>
          <DialogDescription>
            Enter the details for your new expense below.
          </DialogDescription>
        </DialogHeader>
        <AddExpenseForm 
          onExpenseAdded={onExpenseAdded} 
          onClose={handleClose} 
        />
      </DialogContent>
    </Dialog>
  );
};