import { Layout } from "@/components/Layout.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getExpenses, addExpense } from "@/lib/types";
import { CategoryPieChart } from "@/components/CategoryPieChart";
import { AddExpenseDialog } from "@/components/AddExpenseDialog";
import { ExpenseTable } from "@/components/ExpenseTable";
import React from "react";

const Expenses = () => {
  // Use a state variable to force re-render when data changes in the store
  const [dataVersion, setDataVersion] = React.useState(0);

  const expenses = getExpenses();

  const handleDataChange = () => {
    setDataVersion(v => v + 1); // Force re-render
  };

  const handleExpenseAdded = (newExpenseData: any) => {
    addExpense(newExpenseData);
    handleDataChange();
  };

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Expense Transactions</h1>
        <div className="flex space-x-2">
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
            <CardTitle>All Expense Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <ExpenseTable expenses={expenses} onDataChange={handleDataChange} />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Expenses;