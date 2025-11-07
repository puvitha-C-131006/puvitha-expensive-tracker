export type Expense = {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
};

export const mockExpenses: Expense[] = [
  {
    id: "exp_001",
    date: "2024-10-25",
    category: "Groceries",
    description: "Weekly shopping at local supermarket",
    amount: 125.50,
  },
  {
    id: "exp_002",
    date: "2024-10-24",
    category: "Utilities",
    description: "Electricity bill payment",
    amount: 85.00,
  },
  {
    id: "exp_003",
    date: "2024-10-23",
    category: "Entertainment",
    description: "Movie tickets and snacks",
    amount: 45.75,
  },
  {
    id: "exp_004",
    date: "2024-10-22",
    category: "Transportation",
    description: "Gas refill",
    amount: 60.00,
  },
  {
    id: "exp_005",
    date: "2024-10-21",
    category: "Housing",
    description: "Monthly rent payment",
    amount: 1500.00,
  },
];