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

export type UserProfile = {
  name: string;
  email: string;
  dateOfBirth: string; // ISO date string
};

export type BudgetSettings = {
  monthlyBudgetLimit: number;
  budgetCategory: string; // e.g., "Total" or a specific category
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

// Mutable in-memory stores
let expensesStore: Expense[] = baseMockExpenses.map(expense => ({
  ...expense,
  amount: randomizeAmount(expense.amount),
}));

let incomesStore: Income[] = baseMockIncomes.map(income => ({
  ...income,
  amount: randomizeAmount(income.amount),
}));

let userProfileStore: UserProfile = {
  name: "Jane Doe",
  email: "jane.doe@example.com",
  dateOfBirth: "1990-01-01",
};

let budgetSettingsStore: BudgetSettings = {
  monthlyBudgetLimit: 2000,
  budgetCategory: "Total",
};

// Observer pattern for User Profile
type ProfileListener = (profile: UserProfile) => void;
const profileListeners: ProfileListener[] = [];

export const subscribeToProfileChanges = (listener: ProfileListener) => {
  profileListeners.push(listener);
  return () => {
    const index = profileListeners.indexOf(listener);
    if (index > -1) {
      profileListeners.splice(index, 1);
    }
  };
};

const notifyProfileChange = () => {
  profileListeners.forEach(listener => listener(userProfileStore));
};


// Functions to access and mutate the store
export const getExpenses = () => expensesStore;
export const addExpense = (expense: Omit<Expense, 'id'>) => {
  const newExpense: Expense = {
    ...expense,
    id: `exp_${Date.now()}`,
    date: new Date(expense.date).toISOString().split('T')[0],
  };
  expensesStore = [newExpense, ...expensesStore];
  return newExpense;
};

export const getIncomes = () => incomesStore;
export const addIncome = (income: Omit<Income, 'id'>) => {
  const newIncome: Income = {
    ...income,
    id: `inc_${Date.now()}`,
    date: new Date(income.date).toISOString().split('T')[0],
  };
  incomesStore = [newIncome, ...incomesStore];
  return newIncome;
};

export const getUserProfile = () => userProfileStore;
export const updateUserProfile = (profile: UserProfile) => {
  userProfileStore = profile;
  notifyProfileChange(); // Notify listeners upon update
  return userProfileStore;
};

export const getBudgetSettings = () => budgetSettingsStore;
export const updateBudgetSettings = (settings: BudgetSettings) => {
  budgetSettingsStore = settings;
  return budgetSettingsStore;
};

// Helper for expense categories
export const expenseCategories = [
  "Groceries",
  "Utilities",
  "Entertainment",
  "Transportation",
  "Housing",
  "Food & Dining",
  "Health",
  "Shopping",
  "Other",
];