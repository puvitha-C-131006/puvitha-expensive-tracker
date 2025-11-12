import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getBudgetSettings, getExpenses, Expense } from "@/lib/types";
import { isSameMonth, isSameYear, parseISO } from "date-fns";
import { PiggyBank } from "lucide-react";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const calculateMonthlySpending = (expenses: Expense[], category: string): number => {
  const today = new Date();
  
  const currentMonthExpenses = expenses.filter((exp) => {
    const expDate = parseISO(exp.date);
    const matchesMonth = isSameMonth(expDate, today) && isSameYear(expDate, today);
    
    if (category === "Total") {
      return matchesMonth;
    }
    
    return matchesMonth && exp.category === category;
  });

  return currentMonthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
};

export const BudgetRemainingCard: React.FC = () => {
  const settings = getBudgetSettings();
  const allExpenses = getExpenses();
  
  const { monthlyBudgetLimit, budgetCategory } = settings;

  const totalSpent = calculateMonthlySpending(allExpenses, budgetCategory);
  const remaining = monthlyBudgetLimit - totalSpent;
  
  const percentageUsed = Math.min(100, (totalSpent / monthlyBudgetLimit) * 100);
  
  const progressColor = percentageUsed > 90 ? "bg-destructive" : percentageUsed > 70 ? "bg-yellow-500" : "bg-primary";
  const textColor = remaining < 0 ? "text-destructive" : "text-green-600 dark:text-green-400";
  const statusText = remaining < 0 ? "Overspent" : "Remaining";

  return (
    <Card className="lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Monthly Budget ({budgetCategory})
        </CardTitle>
        <PiggyBank className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold mb-2">
          {formatCurrency(Math.abs(remaining))}
        </div>
        <p className={`text-sm font-medium ${textColor} mb-4`}>
          {statusText} out of {formatCurrency(monthlyBudgetLimit)}
        </p>
        
        <div className="space-y-1">
          <Progress 
            value={percentageUsed} 
            className="h-2" 
            indicatorClassName={progressColor}
          />
          <p className="text-xs text-muted-foreground">
            {percentageUsed.toFixed(0)}% of budget used this month.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};