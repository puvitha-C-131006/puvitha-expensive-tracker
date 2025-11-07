import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { showSuccess } from "@/utils/toast";
import { Income } from "@/lib/types";

const incomeSources = [
  "Salary",
  "Freelance",
  "Investment",
  "Gift",
  "Other",
];

const formSchema = z.object({
  date: z.date({
    required_error: "Date is required.",
  }),
  source: z.string({
    required_error: "Source is required.",
  }),
  amount: z.coerce.number().positive({
    message: "Amount must be a positive number.",
  }),
});

type IncomeFormValues = z.infer<typeof formSchema>;

interface AddIncomeFormProps {
  onIncomeAdded: (income: IncomeFormValues) => void;
  onClose: () => void;
}

export function AddIncomeForm({ onIncomeAdded, onClose }: AddIncomeFormProps) {
  const form = useForm<IncomeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      source: incomeSources[0],
      amount: 0,
    },
  });

  function onSubmit(values: IncomeFormValues) {
    console.log("New Income Submitted:", values);
    
    onIncomeAdded(values);
    showSuccess("Income added successfully!");
    onClose();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Date Field */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Source Field */}
        <FormField
          control={form.control}
          name="source"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Source</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select income source" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {incomeSources.map((source) => (
                    <SelectItem key={source} value={source}>
                      {source}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Amount Field */}
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount (INR)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            Save Income
          </Button>
        </div>
      </form>
    </Form>
  );
}