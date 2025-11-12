import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Expense } from "@/lib/types";
import { showSuccess, showError } from "@/utils/toast";

interface ExportDataButtonProps {
  data: Expense[];
  filename: string;
}

const convertToCSV = (data: Expense[]): string => {
  if (data.length === 0) return "";

  // Define CSV headers based on Expense type keys
  const headers = ["Date", "Category", "Description", "Amount"];
  
  // Map data objects to CSV rows
  const rows = data.map(item => [
    item.date,
    item.category,
    `"${item.description.replace(/"/g, '""')}"`, // Handle quotes in description
    item.amount.toFixed(2),
  ].join(","));

  return [
    headers.join(","),
    ...rows
  ].join("\n");
};

export const ExportDataButton: React.FC<ExportDataButtonProps> = ({ data, filename }) => {
  const handleExport = () => {
    if (data.length === 0) {
      showError("No data to export.");
      return;
    }

    try {
      const csvString = convertToCSV(data);
      
      const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      showSuccess(`Successfully exported ${data.length} records to CSV.`);
    } catch (error) {
      console.error("CSV Export failed:", error);
      showError("Failed to export data.");
    }
  };

  return (
    <Button variant="outline" onClick={handleExport}>
      <Download className="mr-2 h-4 w-4" />
      Download CSV
    </Button>
  );
};