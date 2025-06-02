import { useEffect, useState } from 'react';
import type { Expense } from './types/expense';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { ExpenseSummary } from './components/ExpenseSummary';

const STORAGE_KEY = 'expenses';

function App() {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  const handleAddExpense = (expense: Expense) => {
    setExpenses((prev) => [...prev, expense]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
        {/* Header (already centered with text-center) */}
        <div className="text-center mb-16 w-full">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Expense Calculator
          </h1>
          <p className="text-xl text-gray-600">
            Track and manage your expenses with ease
          </p>
        </div>

        {/* Summary (already flex justify-center) */}
        <div className="flex justify-center mb-16 w-full">
          <ExpenseSummary expenses={expenses} />
        </div>

        {/* Main cards: switch items-start → items-center & drop child w-full */}
        <div className="flex flex-col lg:flex-row justify-center items-center gap-8 w-full">
          <div className="max-w-xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Add New Expense
              </h2>
              <ExpenseForm onAddExpense={handleAddExpense} />
            </div>
          </div>

          <div className="max-w-xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Your Expenses
              </h2>
              <ExpenseList
                expenses={expenses}
                onDeleteExpense={handleDeleteExpense}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
