export type Expense = {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
};

export type Income = {
  id: string;
  date: string;
  source: string;
  amount: number;
};

// Function to apply a small random variance (up to +/- 10%)
const randomizeAmount = (baseAmount: number): number => {
  const variance = baseAmount * 0.1 * (Math.random() * 2 - 1); // Random number between -0.1 and +0.1 of baseAmount
  return parseFloat((baseAmount + variance).toFixed(2));
};

const baseMockExpenses = [
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
  {
    id: "exp_006",
    date: "2024-09-15",
    category: "Groceries",
    description: "Previous month shopping",
    amount: 110.00,
  },
  {
    id: "exp_007",
    date: "2023-12-01",
    category: "Housing",
    description: "Yearly expense example",
    amount: 1200.00,
  },
];

export const mockExpenses: Expense[] = baseMockExpenses.map(expense => ({
  ...expense,
  amount: randomizeAmount(expense.amount),
}));

const baseMockIncomes = [
  {
    id: "inc_001",
    date: "2024-10-01",
    source: "Salary",
    amount: 5000.00,
  },
  {
    id: "inc_002",
    date: "2024-09-01",
    source: "Salary",
    amount: 5000.00,
  },
  {
    id: "inc_003",
    date: "2023-12-01",
    source: "Bonus",
    amount: 1000.00,
  },
];

export const mockIncomes: Income[] = baseMockIncomes.map(income => ({
  ...income,
  amount: randomizeAmount(income.amount),
}));