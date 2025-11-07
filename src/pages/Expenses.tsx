import { Layout } from "@/components/Layout.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpenseTable } from "@/components/ExpenseTable";
import { mockExpenses, Expense } from "@/lib/types";
import { CategoryPieChart } from "@/components/CategoryPieChart";
import { AddExpenseDialog } from "@/components/AddExpenseDialog";
import React from "react";

const Expenses = () => {
  // Initialize state with mock data
  const [expenses, setExpenses] = React.useState<Expense[]>(mockExpenses);

  const handleExpenseAdded = (newExpenseData: any) => {
    // Create a new Expense object with a unique ID and correct structure
    const newExpense: Expense = {
      id: `exp_${Date.now()}`, // Simple unique ID generation
      date: new Date(newExpenseData.date).toISOString().split('T')[0], // Format date to YYYY-MM-DD string
      category: newExpenseData.category,
      description: newExpenseData.description,
      amount: newExpenseData.amount,
    };
    
    // Add the new expense to the beginning of the list
    setExpenses((prevExpenses) => [newExpense, ...prevExpenses]);
  };

  return (
    <Layout>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>
        <AddExpenseDialog onExpenseAdded={handleExpenseAdded} />
      </div>
      
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Spending Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <CategoryPieChart expenses={expenses} />
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>All Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <ExpenseTable expenses={expenses} />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Expenses;