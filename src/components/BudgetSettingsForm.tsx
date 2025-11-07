import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { showSuccess } from "@/utils/toast";
import { getBudgetSettings, updateBudgetSettings, BudgetSettings, expenseCategories } from "@/lib/types";

const budgetCategories = ["Total", ...expenseCategories];

const formSchema = z.object({
  monthlyBudgetLimit: z.coerce.number().positive({
    message: "Budget limit must be a positive number.",
  }),
  budgetCategory: z.string({
    required_error: "Budget category is required.",
  }),
});

type BudgetFormValues = z.infer<typeof formSchema>;

export function BudgetSettingsForm() {
  const initialSettings = getBudgetSettings();

  const form = useForm<BudgetFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      monthlyBudgetLimit: initialSettings.monthlyBudgetLimit,
      budgetCategory: initialSettings.budgetCategory,
    },
  });

  function onSubmit(values: BudgetFormValues) {
    const updatedSettings: BudgetSettings = {
      monthlyBudgetLimit: values.monthlyBudgetLimit,
      budgetCategory: values.budgetCategory,
    };
    
    updateBudgetSettings(updatedSettings);
    showSuccess("Budget settings updated successfully!");
  }

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Budget Settings</CardTitle>
        <CardDescription>Set your monthly spending limits.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Monthly Budget Limit Field */}
            <FormField
              control={form.control}
              name="monthlyBudgetLimit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Budget Limit (INR)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="2000.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Budget Category Field */}
            <FormField
              control={form.control}
              name="budgetCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apply Budget To</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {budgetCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end pt-4">
              <Button type="submit">
                Save Budget
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}