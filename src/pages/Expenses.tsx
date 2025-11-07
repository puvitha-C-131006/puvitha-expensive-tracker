import { Layout } from "@/components/Layout.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpenseTable } from "@/components/ExpenseTable";
import { getExpenses, getIncomes, addExpense, addIncome } from "@/lib/types";
import { CategoryPieChart } from "@/components/CategoryPieChart";
import { AddExpenseDialog } from "@/components/AddExpenseDialog";
import { AddIncomeDialog } from "@/components/AddIncomeDialog";
import React from "react";

const Expenses = () => {
  // Use a state variable to force re-render when data changes in the store
  const [dataVersion, setDataVersion] = React.useState(0);

  const expenses = getExpenses();
  const incomes = getIncomes();

  const handleExpenseAdded = (newExpenseData: any) => {
    addExpense(newExpenseData);
    setDataVersion(v => v + 1); // Force re-render
  };

  const handleIncomeAdded = (newIncomeData: any) => {
    addIncome(newIncomeData);
    setDataVersion(v => v + 1); // Force re-render
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