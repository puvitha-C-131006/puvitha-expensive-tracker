import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Expense } from "@/lib/types";
import { format, subMonths, startOfMonth, isAfter } from "date-fns";

interface MonthlyExpenseBarChartProps {
  expenses: Expense[];
}

const COLORS = "#EF4444"; // Red color for expenses

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const processData = (expenses: Expense[]) => {
  const today = new Date();
  const twelveMonthsAgo = startOfMonth(subMonths(today, 11));
  
  // Initialize data structure for the last 12 months
  const monthlyDataMap: Record<string, { monthYear: string; total: number }> = {};
  
  for (let i = 0; i < 12; i++) {
    const date = subMonths(today, i);
    const monthYear = format(date, "MMM yyyy");
    monthlyDataMap[monthYear] = { monthYear, total: 0 };
  }

  // Aggregate expenses
  expenses.forEach((expense) => {
    const expenseDate = new Date(expense.date);
    
    // Only include expenses within the last 12 months
    if (isAfter(expenseDate, twelveMonthsAgo) || format(expenseDate, "MMM yyyy") === format(today, "MMM yyyy")) {
      const monthYear = format(expenseDate, "MMM yyyy");
      if (monthlyDataMap[monthYear]) {
        monthlyDataMap[monthYear].total += expense.amount;
      }
    }
  });

  // Convert map to array and sort chronologically
  const data = Object.values(monthlyDataMap).sort((a, b) => {
    const dateA = new Date(a.monthYear);
    const dateB = new Date(b.monthYear);
    return dateA.getTime() - dateB.getTime();
  });

  return data;
};

export const MonthlyExpenseBarChart: React.FC<MonthlyExpenseBarChartProps> = ({
  expenses,
}) => {
  const data = processData(expenses);

  if (data.length === 0) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center text-muted-foreground">
        No expense data available for the last 12 months.
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="monthYear" stroke="hsl(var(--foreground))" />
          <YAxis
            tickFormatter={(value) => formatCurrency(value as number)}
            stroke="hsl(var(--foreground))"
          />
          <Tooltip
            formatter={(value) => [formatCurrency(value as number), "Total Expenses"]}
            labelFormatter={(label) => `Month: ${label}`}
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
          />
          <Bar dataKey="total" fill={COLORS} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};