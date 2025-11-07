import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Income } from "@/lib/types";

interface IncomeBarChartProps {
  incomes: Income[];
}

// Color palette for income (e.g., green/teal shades)
const COLORS = [
  "#10B981", // Emerald
  "#06B6D4", // Cyan
  "#4F46E5", // Indigo
  "#F59E0B", // Amber
];

const processData = (incomes: Income[]) => {
  const sourceTotals: Record<string, number> = {};
  incomes.forEach((income) => {
    sourceTotals[income.source] =
      (sourceTotals[income.source] || 0) + income.amount;
  });

  return Object.entries(sourceTotals).map(([source, total]) => ({
    source,
    total,
  }));
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const IncomeBarChart: React.FC<IncomeBarChartProps> = ({
  incomes,
}) => {
  const data = processData(incomes);

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
          {/* SVG Definitions for Glow Effect */}
          <defs>
            <filter id="incomeBarGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="source" stroke="hsl(var(--foreground))" />
          <YAxis
            tickFormatter={(value) => formatCurrency(value as number)}
            stroke="hsl(var(--foreground))"
          />
          <Tooltip
            formatter={(value) => [formatCurrency(value as number), "Amount"]}
            labelFormatter={(label) => `Source: ${label}`}
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
          />
          <Bar dataKey="total" radius={[4, 4, 0, 0]}>
            {data.map((_, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
                style={{ filter: 'url(#incomeBarGlow)' }} // Apply glow filter
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};