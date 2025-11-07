import { Layout } from "@/components/Layout.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, Wallet, CreditCard } from "lucide-react";
import { ExpenseTable } from "@/components/ExpenseTable";
import { mockExpenses } from "@/lib/types";

const Dashboard = () => {
  // Use a subset of mock expenses for recent transactions
  const recentExpenses = mockExpenses.slice(0, 3);

  // Mock calculations for display
  const totalMonthlyExpenses = mockExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const budgetRemaining = 5000 - totalMonthlyExpenses; // Assuming a $5000 budget
  const largestCategory = mockExpenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {} as Record<string, number>);
  
  const topCategory = Object.entries(largestCategory).sort(([, a], [, b]) => b - a)[0];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold tracking-tight">Expense Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Monthly Expenses
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalMonthlyExpenses)}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month (Mock Data)
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Budget Remaining
            </CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(budgetRemaining)}</div>
            <p className="text-xs text-muted-foreground">
              {((totalMonthlyExpenses / 5000) * 100).toFixed(0)}% of budget utilized (Mock Data)
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Largest Category
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{topCategory ? topCategory[0] : 'N/A'}</div>
            <p className="text-xs text-muted-foreground">
              {topCategory ? formatCurrency(topCategory[1]) : 'N/A'} spent this month (Mock Data)
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Savings Rate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+15%</div>
            <p className="text-xs text-muted-foreground">
              Compared to previous quarter (Mock Data)
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <ExpenseTable expenses={recentExpenses} />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;