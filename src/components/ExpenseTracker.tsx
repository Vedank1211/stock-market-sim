import React, { useState, useEffect } from 'react';
import { CreditCard, Plus, Trash2, Edit3, Calendar, TrendingDown, TrendingUp, PieChart } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface Expense {
  id: number;
  amount: number;
  category: string;
  description: string;
  date: string;
  type: 'expense' | 'income';
}

const ExpenseTracker = () => {
  const { theme } = useTheme();
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 1, amount: 1200, category: 'Housing', description: 'Monthly Rent', date: '2024-01-01', type: 'expense' },
    { id: 2, amount: 350, category: 'Food', description: 'Groceries', date: '2024-01-02', type: 'expense' },
    { id: 3, amount: 5000, category: 'Salary', description: 'Monthly Salary', date: '2024-01-01', type: 'income' },
    { id: 4, amount: 80, category: 'Transportation', description: 'Gas', date: '2024-01-03', type: 'expense' },
    { id: 5, amount: 150, category: 'Entertainment', description: 'Movies & Dining', date: '2024-01-04', type: 'expense' },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newExpense, setNewExpense] = useState({
    amount: '',
    category: 'Food',
    description: '',
    date: new Date().toISOString().split('T')[0],
    type: 'expense' as 'expense' | 'income'
  });

  const categories = {
    expense: ['Housing', 'Food', 'Transportation', 'Healthcare', 'Entertainment', 'Shopping', 'Utilities', 'Other'],
    income: ['Salary', 'Freelance', 'Investment', 'Business', 'Other']
  };

  const categoryColors = {
    'Housing': '#ef4444',
    'Food': '#f97316',
    'Transportation': '#eab308',
    'Healthcare': '#22c55e',
    'Entertainment': '#8b5cf6',
    'Shopping': '#ec4899',
    'Utilities': '#06b6d4',
    'Salary': '#10b981',
    'Freelance': '#3b82f6',
    'Investment': '#6366f1',
    'Business': '#84cc16',
    'Other': '#6b7280'
  };

  const themeClasses = {
    light: {
      bg: 'bg-white',
      cardBg: 'bg-gray-50',
      border: 'border-gray-200',
      text: 'text-gray-900',
      textSecondary: 'text-gray-600',
      button: 'bg-blue-600 hover:bg-blue-700 text-white'
    },
    zk: {
      bg: 'bg-zk-charcoal',
      cardBg: 'bg-zk-navy',
      border: 'border-zk-leather/30',
      text: 'text-zk-eggshell',
      textSecondary: 'text-zk-eggshell/70',
      button: 'bg-zk-coral hover:bg-zk-coral/90 text-zk-eggshell'
    }
  };

  const currentTheme = themeClasses[theme];

  const handleAddExpense = () => {
    if (newExpense.amount && newExpense.description) {
      const expense: Expense = {
        id: Date.now(),
        amount: parseFloat(newExpense.amount),
        category: newExpense.category,
        description: newExpense.description,
        date: newExpense.date,
        type: newExpense.type
      };
      setExpenses([expense, ...expenses]);
      setNewExpense({
        amount: '',
        category: 'Food',
        description: '',
        date: new Date().toISOString().split('T')[0],
        type: 'expense'
      });
      setShowAddForm(false);
    }
  };

  const deleteExpense = (id: number) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const totalExpenses = expenses.filter(e => e.type === 'expense').reduce((sum, e) => sum + e.amount, 0);
  const totalIncome = expenses.filter(e => e.type === 'income').reduce((sum, e) => sum + e.amount, 0);
  const netAmount = totalIncome - totalExpenses;

  // Category breakdown
  const categoryTotals = expenses.reduce((acc, expense) => {
    if (expense.type === 'expense') {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className={`${currentTheme.bg} border ${currentTheme.border} rounded-xl p-6 shadow-lg`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <CreditCard className={`w-8 h-8 ${theme === 'zk' ? 'text-zk-coral' : 'text-blue-600'}`} />
          <h2 className={`text-2xl font-bold ${currentTheme.text}`}>Expense Tracker</h2>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className={`${currentTheme.button} px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-all duration-300`}
        >
          <Plus className="w-4 h-4" />
          <span>Add Transaction</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className={`${currentTheme.cardBg} rounded-lg p-4 border ${currentTheme.border}`}>
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <span className={`text-sm ${currentTheme.textSecondary}`}>Total Income</span>
          </div>
          <div className={`text-2xl font-bold text-green-500`}>
            ${totalIncome.toLocaleString()}
          </div>
        </div>

        <div className={`${currentTheme.cardBg} rounded-lg p-4 border ${currentTheme.border}`}>
          <div className="flex items-center space-x-2 mb-2">
            <TrendingDown className="w-5 h-5 text-red-500" />
            <span className={`text-sm ${currentTheme.textSecondary}`}>Total Expenses</span>
          </div>
          <div className={`text-2xl font-bold text-red-500`}>
            ${totalExpenses.toLocaleString()}
          </div>
        </div>

        <div className={`${currentTheme.cardBg} rounded-lg p-4 border ${currentTheme.border}`}>
          <div className="flex items-center space-x-2 mb-2">
            <PieChart className="w-5 h-5 text-blue-500" />
            <span className={`text-sm ${currentTheme.textSecondary}`}>Net Amount</span>
          </div>
          <div className={`text-2xl font-bold ${netAmount >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            ${Math.abs(netAmount).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className={`${currentTheme.cardBg} rounded-lg p-4 mb-6 border ${currentTheme.border}`}>
          <h3 className={`text-lg font-semibold ${currentTheme.text} mb-4`}>Add New Transaction</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium ${currentTheme.textSecondary} mb-2`}>Type</label>
              <select
                value={newExpense.type}
                onChange={(e) => setNewExpense({...newExpense, type: e.target.value as 'expense' | 'income', category: categories[e.target.value as 'expense' | 'income'][0]})}
                className={`w-full p-2 border ${currentTheme.border} rounded-lg ${currentTheme.bg} ${currentTheme.text}`}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium ${currentTheme.textSecondary} mb-2`}>Amount</label>
              <input
                type="number"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                className={`w-full p-2 border ${currentTheme.border} rounded-lg ${currentTheme.bg} ${currentTheme.text}`}
                placeholder="0.00"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${currentTheme.textSecondary} mb-2`}>Category</label>
              <select
                value={newExpense.category}
                onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                className={`w-full p-2 border ${currentTheme.border} rounded-lg ${currentTheme.bg} ${currentTheme.text}`}
              >
                {categories[newExpense.type].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium ${currentTheme.textSecondary} mb-2`}>Date</label>
              <input
                type="date"
                value={newExpense.date}
                onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                className={`w-full p-2 border ${currentTheme.border} rounded-lg ${currentTheme.bg} ${currentTheme.text}`}
              />
            </div>
            <div className="md:col-span-2">
              <label className={`block text-sm font-medium ${currentTheme.textSecondary} mb-2`}>Description</label>
              <input
                type="text"
                value={newExpense.description}
                onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                className={`w-full p-2 border ${currentTheme.border} rounded-lg ${currentTheme.bg} ${currentTheme.text}`}
                placeholder="Enter description"
              />
            </div>
          </div>
          <div className="flex space-x-3 mt-4">
            <button
              onClick={handleAddExpense}
              className={`${currentTheme.button} px-4 py-2 rounded-lg font-medium`}
            >
              Add Transaction
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className={`px-4 py-2 rounded-lg font-medium border ${currentTheme.border} ${currentTheme.text}`}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Category Breakdown */}
      <div className={`${currentTheme.cardBg} rounded-lg p-4 mb-6 border ${currentTheme.border}`}>
        <h3 className={`text-lg font-semibold ${currentTheme.text} mb-4`}>Expense Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(categoryTotals).map(([category, amount]) => (
            <div key={category} className="text-center">
              <div 
                className="w-4 h-4 rounded-full mx-auto mb-2"
                style={{ backgroundColor: categoryColors[category as keyof typeof categoryColors] }}
              ></div>
              <div className={`text-sm ${currentTheme.textSecondary}`}>{category}</div>
              <div className={`font-semibold ${currentTheme.text}`}>${amount.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <h3 className={`text-lg font-semibold ${currentTheme.text} mb-4`}>Recent Transactions</h3>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {expenses.slice(0, 10).map((expense) => (
            <div key={expense.id} className={`flex items-center justify-between p-3 ${currentTheme.cardBg} rounded-lg border ${currentTheme.border}`}>
              <div className="flex items-center space-x-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: categoryColors[expense.category as keyof typeof categoryColors] }}
                >
                  {expense.category.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className={`font-semibold ${currentTheme.text}`}>{expense.description}</div>
                  <div className={`text-sm ${currentTheme.textSecondary}`}>{expense.category} • {expense.date}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className={`font-semibold ${expense.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                  {expense.type === 'income' ? '+' : '-'}${expense.amount.toLocaleString()}
                </div>
                <button
                  onClick={() => deleteExpense(expense.id)}
                  className={`p-1 ${currentTheme.textSecondary} hover:text-red-500 transition-colors`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;