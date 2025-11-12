import { Layout } from "@/components/Layout.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getIncomes, addIncome } from "@/lib/types";
import { AddIncomeDialog } from "@/components/AddIncomeDialog";
import { IncomeTable } from "@/components/IncomeTable";
import { IncomeBarChart } from "@/components/IncomeBarChart";
import React from "react";

const IncomePage = () => {
  // Use a state variable to force re-render when data changes in the store
  const [dataVersion, setDataVersion] = React.useState(0);

  const incomes = getIncomes();

  const handleIncomeAdded = (newIncomeData: any) => {
    addIncome(newIncomeData);
    setDataVersion(v => v + 1); // Force re-render
  };

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Income Management</h1>
        <AddIncomeDialog onIncomeAdded={handleIncomeAdded} />
      </div>
      
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Income Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Reusing IncomeBarChart for visualization */}
            <IncomeBarChart incomes={incomes} />
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>All Income Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <IncomeTable incomes={incomes} />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default IncomePage;