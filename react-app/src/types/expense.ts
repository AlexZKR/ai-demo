export interface Expense {
  id: string;
  category: string;
  amount: number;
  date: string;
}

export interface ExpenseSummary {
  total: number;
  dailyAverage: number;
  topExpenses: Expense[];
} 