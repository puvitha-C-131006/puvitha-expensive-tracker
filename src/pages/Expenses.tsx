import { Layout } from "@/components/Layout.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getExpenses, addExpense, Expense } from "@/lib/types";
import { CategoryPieChart } from "@/components/CategoryPieChart";
import { AddExpenseDialog } from "@/components/AddExpenseDialog";
import { ExpenseTable } from "@/components/ExpenseTable";
import { ExpenseFilterBar } from "@/components/ExpenseFilterBar";
import { MonthlyExpenseBarChart } from "@/components/MonthlyExpenseBarChart"; // Import new chart
import React from "react";

const Expenses = () => {
  // State to force re-render when data changes in the store (add/edit/delete)
  const [dataVersion, setDataVersion] = React.useState(0);
  // State for search query
  const [searchQuery, setSearchQuery] = React.useState("");

  const allExpenses = getExpenses();

  const handleDataChange = () => {
    setDataVersion(v => v + 1); // Force re-render
  };

  const handleExpenseAdded = (newExpenseData: any) => {
    addExpense(newExpenseData);
    handleDataChange();
  };

  // Filtering Logic
  const filteredExpenses: Expense[] = React.useMemo(() => {
    if (!searchQuery) {
      return allExpenses;
    }
    const query = searchQuery.toLowerCase();
    return allExpenses.filter(
      (expense) =>
        expense.category.toLowerCase().includes(query) ||
        expense.description.toLowerCase().includes(query)
    );
  }, [allExpenses, searchQuery]);


  return (
    <Layout>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Expense Transactions</h1>
        <div className="flex space-x-2">
          <AddExpenseDialog onExpenseAdded={handleExpenseAdded} />
        </div>
      </div>
      
      {/* Filter Bar */}
      <div className="mb-6">
        <ExpenseFilterBar 
          searchQuery={searchQuery} 
          onSearchChange={setSearchQuery} 
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Spending Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Chart uses filtered data */}
            <CategoryPieChart expenses={filteredExpenses} />
          </CardContent>
        </Card>
        
        {/* New Monthly Trend Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Spending Trend (Last 12 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Chart uses ALL expenses, not filtered ones, to show overall trend */}
            <MonthlyExpenseBarChart expenses={allExpenses} />
          </CardContent>
        </Card>
      </div>
      
      {/* Expense Table Section */}
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>All Expense Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Table uses filtered data */}
            <ExpenseTable expenses={filteredExpenses} onDataChange={handleDataChange} />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Expenses;