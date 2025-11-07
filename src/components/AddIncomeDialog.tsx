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
import { AddIncomeForm } from "./AddIncomeForm";

interface AddIncomeDialogProps {
  onIncomeAdded: (income: any) => void;
}

export const AddIncomeDialog: React.FC<AddIncomeDialogProps> = ({ onIncomeAdded }) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Income
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Income</DialogTitle>
          <DialogDescription>
            Enter the details for your new income below.
          </DialogDescription>
        </DialogHeader>
        <AddIncomeForm 
          onIncomeAdded={onIncomeAdded} 
          onClose={handleClose} 
        />
      </DialogContent>
    </Dialog>
  );
};