import { Layout } from "@/components/Layout.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpenseTable } from "@/components/ExpenseTable";
import { mockExpenses, mockIncomes, Expense, Income } from "@/lib/types";
import { CategoryPieChart } from "@/components/CategoryPieChart";
import { AddExpenseDialog } from "@/components/AddExpenseDialog";
import { AddIncomeDialog } from "@/components/AddIncomeDialog";
import React from "react";

const Expenses = () => {
  // Initialize state with mock data
  const [expenses, setExpenses] = React.useState<Expense[]>(mockExpenses);
  const [incomes, setIncomes] = React.useState<Income[]>(mockIncomes);

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

  const handleIncomeAdded = (newIncomeData: any) => {
    // Create a new Income object with a unique ID and correct structure
    const newIncome: Income = {
      id: `inc_${Date.now()}`, // Simple unique ID generation
      date: new Date(newIncomeData.date).toISOString().split('T')[0], // Format date to YYYY-MM-DD string
      source: newIncomeData.source,
      amount: newIncomeData.amount,
    };
    
    // Add the new income to the beginning of the list
    setIncomes((prevIncomes) => [newIncome, ...prevIncomes]);
  };

  // For the table display, we will show expenses for now, but we could add a toggle later.
  // For the pie chart, we still use expenses as it's a spending distribution chart.

  return (
    <Layout>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <div className="flex space-x-2">
          <AddIncomeDialog onIncomeAdded={handleIncomeAdded} />
          <AddExpenseDialog onExpenseAdded={handleExpenseAdded} />
        </div>
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
            <CardTitle>Recent Expenses</CardTitle>
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