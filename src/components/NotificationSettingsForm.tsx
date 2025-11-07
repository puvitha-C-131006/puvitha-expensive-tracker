import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { showSuccess } from "@/utils/toast";
import { getNotificationSettings, updateNotificationSettings, NotificationSettings } from "@/lib/types";

const formSchema = z.object({
  highSpendingAlerts: z.boolean(),
  alertThresholdPercentage: z.coerce.number().min(1).max(100, {
    message: "Threshold must be between 1 and 100.",
  }),
  notificationType: z.enum(["email", "popup"]),
});

type NotificationFormValues = z.infer<typeof formSchema>;

export function NotificationSettingsForm() {
  const initialSettings = getNotificationSettings();

  const form = useForm<NotificationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      highSpendingAlerts: initialSettings.highSpendingAlerts,
      alertThresholdPercentage: initialSettings.alertThresholdPercentage,
      notificationType: initialSettings.notificationType,
    },
  });

  const highSpendingAlerts = form.watch("highSpendingAlerts");

  function onSubmit(values: NotificationFormValues) {
    const updatedSettings: NotificationSettings = {
      highSpendingAlerts: values.highSpendingAlerts,
      alertThresholdPercentage: values.alertThresholdPercentage,
      notificationType: values.notificationType,
    };
    
    updateNotificationSettings(updatedSettings);
    showSuccess("Notification settings updated successfully!");
  }

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>Manage how you receive alerts about your spending.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            {/* High Spending Alerts Toggle */}
            <FormField
              control={form.control}
              name="highSpendingAlerts"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      High Spending Alerts
                    </FormLabel>
                    <FormDescription>
                      Receive alerts when your spending approaches your monthly budget limit.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Alert Threshold Percentage Field (Conditional) */}
            {highSpendingAlerts && (
              <FormField
                control={form.control}
                name="alertThresholdPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alert Threshold (%)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="80" 
                        {...field} 
                        min={1} 
                        max={100}
                        className="w-24"
                      />
                    </FormControl>
                    <FormDescription>
                      Trigger an alert when spending reaches this percentage of the budget.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Notification Type Radio Group (Conditional) */}
            {highSpendingAlerts && (
              <FormField
                control={form.control}
                name="notificationType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Notification Type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="popup" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Pop-up (In-app notification)
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="email" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Email
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="flex justify-end pt-4">
              <Button type="submit">
                Save Notifications
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}