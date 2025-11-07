import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Expense } from "@/lib/types";

interface CategoryPieChartProps {
  expenses: Expense[];
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];

const processData = (expenses: Expense[]) => {
  const categoryTotals: Record<string, number> = {};
  expenses.forEach((expense) => {
    categoryTotals[expense.category] =
      (categoryTotals[expense.category] || 0) + expense.amount;
  });

  return Object.entries(categoryTotals).map(([category, total]) => ({
    name: category,
    value: total,
  }));
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const total = payload.reduce((sum: number, entry: any) => sum + entry.value, 0);
    const percentage = ((data.value / total) * 100).toFixed(1);

    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(amount);
    };

    return (
      <div className="p-2 bg-card border border-border rounded-md shadow-lg text-sm">
        <p className="font-semibold">{data.name}</p>
        <p>Amount: {formatCurrency(data.value)}</p>
        <p>Share: {percentage}%</p>
      </div>
    );
  }

  return null;
};

export const CategoryPieChart: React.FC<CategoryPieChartProps> = ({
  expenses,
}) => {
  const data = processData(expenses);

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            labelLine={false}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend layout="horizontal" verticalAlign="bottom" align="center" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};