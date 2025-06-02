import React from 'react';
import type { Expense } from '../types/expense';

interface ExpenseSummaryProps {
  expenses: Expense[];
}

export const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ expenses }) => {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const dailyAverage = total / 30; // Assuming 30 days per month
  const topExpenses = [...expenses]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3);

  return (
    <div className="flex justify-center w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-5xl">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-2xl p-10 text-white flex flex-col items-center justify-center min-h-[240px] mx-auto w-full max-w-xs">
          <h3 className="text-lg font-medium mb-8 uppercase tracking-wider">Total Expenses</h3>
          <p className="text-5xl font-bold">${total.toFixed(2)}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-2xl p-10 text-white flex flex-col items-center justify-center min-h-[240px] mx-auto w-full max-w-xs">
          <h3 className="text-lg font-medium mb-8 uppercase tracking-wider">Daily Average</h3>
          <p className="text-5xl font-bold">${dailyAverage.toFixed(2)}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-2xl p-10 text-white flex flex-col items-center min-h-[240px] mx-auto w-full max-w-xs">
          <h3 className="text-lg font-medium mb-8 uppercase tracking-wider">Top Expenses</h3>
          <ul className="w-full space-y-5">
            {topExpenses.map((expense) => (
              <li key={expense.id} className="flex justify-between items-center text-lg">
                <span className="opacity-90">{expense.category}</span>
                <span className="font-medium">${expense.amount.toFixed(2)}</span>
              </li>
            ))}
            {topExpenses.length === 0 && (
              <li className="text-lg opacity-75 text-center">No expenses recorded yet</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}; 