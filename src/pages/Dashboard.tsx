import { Layout } from "@/components/Layout.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpenseTable } from "@/components/ExpenseTable";
import { mockExpenses, mockIncomes, Expense } from "@/lib/types";
import { CategoryBarChart } from "@/components/CategoryBarChart";
import { DollarSign, TrendingUp, Wallet, CreditCard, ArrowDown, ArrowUp, Scale } from "lucide-react";
import { isSameMonth, isSameYear, parseISO } from "date-fns";
import React from "react";
import { TimePeriodSelector } from "@/components/TimePeriodSelector";

const Dashboard = () => {
  const today = new Date();
  const [timePeriod, setTimePeriod] = React.useState<"monthly" | "yearly">(
    "monthly",
  );

  // Helper function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  // --- Data Filtering ---

  // Filter expenses for the current month
  const currentMonthExpenses: Expense[] = mockExpenses.filter((exp) =>
    isSameMonth(parseISO(exp.date), today) && isSameYear(parseISO(exp.date), today)
  );

  // Filter expenses for the current year
  const currentYearExpenses: Expense[] = mockExpenses.filter((exp) =>
    isSameYear(parseISO(exp.date), today)
  );

  // Expenses displayed in the chart based on selected time period
  const chartExpenses =
    timePeriod === "monthly" ? currentMonthExpenses : currentYearExpenses;

  // --- Calculations ---

  const totalMonthlyExpenses = currentMonthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const totalYearlyExpenses = currentYearExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  // Total Income (Current Month)
  const currentMonthIncomes = mockIncomes.filter((inc) =>
    isSameMonth(parseISO(inc.date), today) && isSameYear(parseISO(inc.date), today)
  );
  const totalMonthlyIncome = currentMonthIncomes.reduce((sum, inc) => sum + inc.amount, 0);

  // Net Balance (Current Month)
  const netMonthlyBalance = totalMonthlyIncome - totalMonthlyExpenses;

  // Largest Category (Current Month)
  const largestCategory = currentMonthExpenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {} as Record<string, number>);

  const topCategory = Object.entries(largestCategory).sort(
    ([, a], [, b]) => b - a,
  )[0];

  // Use a subset of mock expenses for recent transactions
  const recentExpenses = mockExpenses.slice(0, 5);

  return (
    <Layout>
      <h1 className="text-3xl font-bold tracking-tight">Expense Dashboard</h1>

      {/* Financial Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {/* Total Income (Monthly) */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Income (Mo)
            </CardTitle>
            <ArrowUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {formatCurrency(totalMonthlyIncome)}
            </div>
            <p className="text-xs text-muted-foreground">
              Based on current month data
            </p>
          </CardContent>
        </Card>

        {/* Total Expenses (Monthly) */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Expenses (Mo)
            </CardTitle>
            <ArrowDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {formatCurrency(totalMonthlyExpenses)}
            </div>
            <p className="text-xs text-muted-foreground">
              Based on current month data
            </p>
          </CardContent>
        </Card>

        {/* Net Balance (Monthly) */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Net Balance (Mo)
            </CardTitle>
            <Scale className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${
                netMonthlyBalance >= 0
                  ? "text-green-600 dark:text-green-400"
                  : "text-destructive"
              }`}
            >
              {formatCurrency(netMonthlyBalance)}
            </div>
            <p className="text-xs text-muted-foreground">Income minus Expenses</p>
          </CardContent>
        </Card>

        {/* Total Yearly Spending */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Yearly Spending
            </CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalYearlyExpenses)}
            </div>
            <p className="text-xs text-muted-foreground">
              Total expenses this year
            </p>
          </CardContent>
        </Card>

        {/* Largest Category (Monthly) */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Top Category (Mo)
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {topCategory ? topCategory[0] : "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">
              {topCategory ? formatCurrency(topCategory[1]) : "N/A"} spent this
              month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Chart Section */}
      <div className="grid gap-4 md:grid-cols-1">
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Spending by Category</CardTitle>
            <TimePeriodSelector
              selectedPeriod={timePeriod}
              onPeriodChange={setTimePeriod}
            />
          </CardHeader>
          <CardContent>
            <CategoryBarChart expenses={chartExpenses} />
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions Section */}
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