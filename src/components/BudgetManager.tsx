import React, { useState } from 'react';
import { DollarSign, Plus, Edit3, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface Budget {
  id: number;
  category: string;
  budgeted: number;
  spent: number;
  period: 'monthly' | 'weekly' | 'yearly';
}

const BudgetManager = () => {
  const { theme } = useTheme();
  const [budgets, setBudgets] = useState<Budget[]>([
    { id: 1, category: 'Housing', budgeted: 1500, spent: 1200, period: 'monthly' },
    { id: 2, category: 'Food', budgeted: 600, spent: 450, period: 'monthly' },
    { id: 3, category: 'Transportation', budgeted: 300, spent: 280, period: 'monthly' },
    { id: 4, category: 'Entertainment', budgeted: 200, spent: 250, period: 'monthly' },
    { id: 5, category: 'Healthcare', budgeted: 150, spent: 75, period: 'monthly' },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newBudget, setNewBudget] = useState({
    category: '',
    budgeted: '',
    period: 'monthly' as 'monthly' | 'weekly' | 'yearly'
  });

  const categories = ['Housing', 'Food', 'Transportation', 'Healthcare', 'Entertainment', 'Shopping', 'Utilities', 'Savings', 'Other'];

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

  const handleAddBudget = () => {
    if (newBudget.category && newBudget.budgeted) {
      const budget: Budget = {
        id: Date.now(),
        category: newBudget.category,
        budgeted: parseFloat(newBudget.budgeted),
        spent: 0,
        period: newBudget.period
      };
      setBudgets([...budgets, budget]);
      setNewBudget({ category: '', budgeted: '', period: 'monthly' });
      setShowAddForm(false);
    }
  };

  const getBudgetStatus = (budget: Budget) => {
    const percentage = (budget.spent / budget.budgeted) * 100;
    if (percentage >= 100) return { status: 'over', color: 'text-red-500', icon: AlertTriangle };
    if (percentage >= 80) return { status: 'warning', color: 'text-yellow-500', icon: AlertTriangle };
    return { status: 'good', color: 'text-green-500', icon: CheckCircle };
  };

  const totalBudgeted = budgets.reduce((sum, b) => sum + b.budgeted, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const remainingBudget = totalBudgeted - totalSpent;

  return (
    <div className={`${currentTheme.bg} border ${currentTheme.border} rounded-xl p-6 shadow-lg`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <DollarSign className={`w-8 h-8 ${theme === 'zk' ? 'text-zk-coral' : 'text-blue-600'}`} />
          <h2 className={`text-2xl font-bold ${currentTheme.text}`}>Budget Manager</h2>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className={`${currentTheme.button} px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-all duration-300`}
        >
          <Plus className="w-4 h-4" />
          <span>Add Budget</span>
        </button>
      </div>

      {/* Budget Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className={`${currentTheme.cardBg} rounded-lg p-4 border ${currentTheme.border}`}>
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <span className={`text-sm ${currentTheme.textSecondary}`}>Total Budgeted</span>
          </div>
          <div className={`text-2xl font-bold ${currentTheme.text}`}>
            ${totalBudgeted.toLocaleString()}
          </div>
        </div>

        <div className={`${currentTheme.cardBg} rounded-lg p-4 border ${currentTheme.border}`}>
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="w-5 h-5 text-red-500" />
            <span className={`text-sm ${currentTheme.textSecondary}`}>Total Spent</span>
          </div>
          <div className={`text-2xl font-bold text-red-500`}>
            ${totalSpent.toLocaleString()}
          </div>
        </div>

        <div className={`${currentTheme.cardBg} rounded-lg p-4 border ${currentTheme.border}`}>
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className={`text-sm ${currentTheme.textSecondary}`}>Remaining</span>
          </div>
          <div className={`text-2xl font-bold ${remainingBudget >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            ${Math.abs(remainingBudget).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Add Budget Form */}
      {showAddForm && (
        <div className={`${currentTheme.cardBg} rounded-lg p-4 mb-6 border ${currentTheme.border}`}>
          <h3 className={`text-lg font-semibold ${currentTheme.text} mb-4`}>Add New Budget</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={`block text-sm font-medium ${currentTheme.textSecondary} mb-2`}>Category</label>
              <select
                value={newBudget.category}
                onChange={(e) => setNewBudget({...newBudget, category: e.target.value})}
                className={`w-full p-2 border ${currentTheme.border} rounded-lg ${currentTheme.bg} ${currentTheme.text}`}
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium ${currentTheme.textSecondary} mb-2`}>Budget Amount</label>
              <input
                type="number"
                value={newBudget.budgeted}
                onChange={(e) => setNewBudget({...newBudget, budgeted: e.target.value})}
                className={`w-full p-2 border ${currentTheme.border} rounded-lg ${currentTheme.bg} ${currentTheme.text}`}
                placeholder="0.00"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${currentTheme.textSecondary} mb-2`}>Period</label>
              <select
                value={newBudget.period}
                onChange={(e) => setNewBudget({...newBudget, period: e.target.value as 'monthly' | 'weekly' | 'yearly'})}
                className={`w-full p-2 border ${currentTheme.border} rounded-lg ${currentTheme.bg} ${currentTheme.text}`}
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>
          <div className="flex space-x-3 mt-4">
            <button
              onClick={handleAddBudget}
              className={`${currentTheme.button} px-4 py-2 rounded-lg font-medium`}
            >
              Add Budget
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

      {/* Budget List */}
      <div className="space-y-4">
        {budgets.map((budget) => {
          const { status, color, icon: StatusIcon } = getBudgetStatus(budget);
          const percentage = Math.min((budget.spent / budget.budgeted) * 100, 100);
          
          return (
            <div key={budget.id} className={`${currentTheme.cardBg} rounded-lg p-4 border ${currentTheme.border}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <h3 className={`font-semibold ${currentTheme.text}`}>{budget.category}</h3>
                  <span className={`text-sm ${currentTheme.textSecondary} capitalize`}>({budget.period})</span>
                </div>
                <div className="flex items-center space-x-2">
                  <StatusIcon className={`w-4 h-4 ${color}`} />
                  <span className={`text-sm font-medium ${color}`}>
                    {status === 'over' ? 'Over Budget' : status === 'warning' ? 'Near Limit' : 'On Track'}
                  </span>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className={currentTheme.textSecondary}>
                    ${budget.spent.toLocaleString()} of ${budget.budgeted.toLocaleString()}
                  </span>
                  <span className={`font-medium ${color}`}>
                    {percentage.toFixed(0)}%
                  </span>
                </div>
                <div className={`w-full bg-gray-200 rounded-full h-2`}>
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      status === 'over' ? 'bg-red-500' : 
                      status === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className={`text-sm ${currentTheme.textSecondary}`}>
                  Remaining: ${Math.max(budget.budgeted - budget.spent, 0).toLocaleString()}
                </span>
                <button className={`p-1 ${currentTheme.textSecondary} hover:${currentTheme.text} transition-colors`}>
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetManager;