import { Layout } from "@/components/Layout.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ExpenseTable } from "@/components/ExpenseTable";
import { mockExpenses } from "@/lib/types";
import { CategoryPieChart } from "@/components/CategoryPieChart";

const Expenses = () => {
  // In a real app, this data would come from a state management solution or API
  const expenses = mockExpenses;

  return (
    <Layout>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Expense
        </Button>
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