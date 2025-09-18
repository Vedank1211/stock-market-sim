import React, { useState } from 'react';
import { Target, Plus, Calendar, TrendingUp, DollarSign, Trash2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface SavingsGoal {
  id: number;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  category: string;
  monthlyContribution: number;
}

const SavingsGoals = () => {
  const { theme } = useTheme();
  const [goals, setGoals] = useState<SavingsGoal[]>([
    {
      id: 1,
      name: 'Emergency Fund',
      targetAmount: 10000,
      currentAmount: 6500,
      targetDate: '2024-12-31',
      category: 'Emergency',
      monthlyContribution: 500
    },
    {
      id: 2,
      name: 'Vacation to Europe',
      targetAmount: 5000,
      currentAmount: 2800,
      targetDate: '2024-08-15',
      category: 'Travel',
      monthlyContribution: 400
    },
    {
      id: 3,
      name: 'New Car Down Payment',
      targetAmount: 8000,
      currentAmount: 3200,
      targetDate: '2025-03-01',
      category: 'Transportation',
      monthlyContribution: 600
    },
    {
      id: 4,
      name: 'Home Down Payment',
      targetAmount: 50000,
      currentAmount: 15000,
      targetDate: '2026-06-01',
      category: 'Housing',
      monthlyContribution: 1200
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    currentAmount: '',
    targetDate: '',
    category: 'Emergency',
    monthlyContribution: ''
  });

  const categories = ['Emergency', 'Travel', 'Transportation', 'Housing', 'Education', 'Investment', 'Other'];

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

  const handleAddGoal = () => {
    if (newGoal.name && newGoal.targetAmount && newGoal.targetDate) {
      const goal: SavingsGoal = {
        id: Date.now(),
        name: newGoal.name,
        targetAmount: parseFloat(newGoal.targetAmount),
        currentAmount: parseFloat(newGoal.currentAmount) || 0,
        targetDate: newGoal.targetDate,
        category: newGoal.category,
        monthlyContribution: parseFloat(newGoal.monthlyContribution) || 0
      };
      setGoals([...goals, goal]);
      setNewGoal({
        name: '',
        targetAmount: '',
        currentAmount: '',
        targetDate: '',
        category: 'Emergency',
        monthlyContribution: ''
      });
      setShowAddForm(false);
    }
  };

  const deleteGoal = (id: number) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const calculateMonthsRemaining = (targetDate: string) => {
    const target = new Date(targetDate);
    const now = new Date();
    const diffTime = target.getTime() - now.getTime();
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
    return Math.max(diffMonths, 0);
  };

  const calculateRequiredMonthly = (goal: SavingsGoal) => {
    const remaining = goal.targetAmount - goal.currentAmount;
    const monthsLeft = calculateMonthsRemaining(goal.targetDate);
    return monthsLeft > 0 ? remaining / monthsLeft : 0;
  };

  const totalTargetAmount = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const totalCurrentAmount = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const totalProgress = (totalCurrentAmount / totalTargetAmount) * 100;

  return (
    <div className={`${currentTheme.bg} border ${currentTheme.border} rounded-xl p-6 shadow-lg`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Target className={`w-8 h-8 ${theme === 'zk' ? 'text-zk-coral' : 'text-blue-600'}`} />
          <h2 className={`text-2xl font-bold ${currentTheme.text}`}>Savings Goals</h2>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className={`${currentTheme.button} px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-all duration-300`}
        >
          <Plus className="w-4 h-4" />
          <span>Add Goal</span>
        </button>
      </div>

      {/* Overall Progress */}
      <div className={`${currentTheme.cardBg} rounded-lg p-6 mb-6 border ${currentTheme.border}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-semibold ${currentTheme.text}`}>Overall Progress</h3>
          <span className={`text-2xl font-bold ${theme === 'zk' ? 'text-zk-coral' : 'text-blue-600'}`}>
            {totalProgress.toFixed(1)}%
          </span>
        </div>
        <div className="mb-4">
          <div className={`w-full bg-gray-200 rounded-full h-3`}>
            <div 
              className={`h-3 rounded-full transition-all duration-500 ${theme === 'zk' ? 'bg-zk-coral' : 'bg-blue-600'}`}
              style={{ width: `${Math.min(totalProgress, 100)}%` }}
            ></div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className={`text-sm ${currentTheme.textSecondary}`}>Total Saved</div>
            <div className={`text-xl font-bold text-green-500`}>${totalCurrentAmount.toLocaleString()}</div>
          </div>
          <div>
            <div className={`text-sm ${currentTheme.textSecondary}`}>Total Target</div>
            <div className={`text-xl font-bold ${currentTheme.text}`}>${totalTargetAmount.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Add Goal Form */}
      {showAddForm && (
        <div className={`${currentTheme.cardBg} rounded-lg p-4 mb-6 border ${currentTheme.border}`}>
          <h3 className={`text-lg font-semibold ${currentTheme.text} mb-4`}>Add New Savings Goal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium ${currentTheme.textSecondary} mb-2`}>Goal Name</label>
              <input
                type="text"
                value={newGoal.name}
                onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
                className={`w-full p-2 border ${currentTheme.border} rounded-lg ${currentTheme.bg} ${currentTheme.text}`}
                placeholder="e.g., Emergency Fund"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${currentTheme.textSecondary} mb-2`}>Category</label>
              <select
                value={newGoal.category}
                onChange={(e) => setNewGoal({...newGoal, category: e.target.value})}
                className={`w-full p-2 border ${currentTheme.border} rounded-lg ${currentTheme.bg} ${currentTheme.text}`}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium ${currentTheme.textSecondary} mb-2`}>Target Amount</label>
              <input
                type="number"
                value={newGoal.targetAmount}
                onChange={(e) => setNewGoal({...newGoal, targetAmount: e.target.value})}
                className={`w-full p-2 border ${currentTheme.border} rounded-lg ${currentTheme.bg} ${currentTheme.text}`}
                placeholder="10000"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${currentTheme.textSecondary} mb-2`}>Current Amount</label>
              <input
                type="number"
                value={newGoal.currentAmount}
                onChange={(e) => setNewGoal({...newGoal, currentAmount: e.target.value})}
                className={`w-full p-2 border ${currentTheme.border} rounded-lg ${currentTheme.bg} ${currentTheme.text}`}
                placeholder="0"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${currentTheme.textSecondary} mb-2`}>Target Date</label>
              <input
                type="date"
                value={newGoal.targetDate}
                onChange={(e) => setNewGoal({...newGoal, targetDate: e.target.value})}
                className={`w-full p-2 border ${currentTheme.border} rounded-lg ${currentTheme.bg} ${currentTheme.text}`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${currentTheme.textSecondary} mb-2`}>Monthly Contribution</label>
              <input
                type="number"
                value={newGoal.monthlyContribution}
                onChange={(e) => setNewGoal({...newGoal, monthlyContribution: e.target.value})}
                className={`w-full p-2 border ${currentTheme.border} rounded-lg ${currentTheme.bg} ${currentTheme.text}`}
                placeholder="500"
              />
            </div>
          </div>
          <div className="flex space-x-3 mt-4">
            <button
              onClick={handleAddGoal}
              className={`${currentTheme.button} px-4 py-2 rounded-lg font-medium`}
            >
              Add Goal
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

      {/* Goals List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100;
          const monthsRemaining = calculateMonthsRemaining(goal.targetDate);
          const requiredMonthly = calculateRequiredMonthly(goal);
          const isOnTrack = goal.monthlyContribution >= requiredMonthly;
          
          return (
            <div key={goal.id} className={`${currentTheme.cardBg} rounded-lg p-4 border ${currentTheme.border}`}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className={`font-semibold ${currentTheme.text}`}>{goal.name}</h3>
                  <span className={`text-sm ${currentTheme.textSecondary}`}>{goal.category}</span>
                </div>
                <button
                  onClick={() => deleteGoal(goal.id)}
                  className={`p-1 ${currentTheme.textSecondary} hover:text-red-500 transition-colors`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className={currentTheme.textSecondary}>
                    ${goal.currentAmount.toLocaleString()} of ${goal.targetAmount.toLocaleString()}
                  </span>
                  <span className={`font-medium ${theme === 'zk' ? 'text-zk-coral' : 'text-blue-600'}`}>
                    {progress.toFixed(1)}%
                  </span>
                </div>
                <div className={`w-full bg-gray-200 rounded-full h-2`}>
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${theme === 'zk' ? 'bg-zk-coral' : 'bg-blue-600'}`}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className={currentTheme.textSecondary}>Target Date</span>
                  </div>
                  <span className={currentTheme.text}>{new Date(goal.targetDate).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-gray-400" />
                    <span className={currentTheme.textSecondary}>Months Left</span>
                  </div>
                  <span className={currentTheme.text}>{monthsRemaining}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <span className={currentTheme.textSecondary}>Required Monthly</span>
                  </div>
                  <span className={`font-medium ${isOnTrack ? 'text-green-500' : 'text-red-500'}`}>
                    ${requiredMonthly.toFixed(0)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-gray-400" />
                    <span className={currentTheme.textSecondary}>Current Monthly</span>
                  </div>
                  <span className={`font-medium ${isOnTrack ? 'text-green-500' : 'text-yellow-500'}`}>
                    ${goal.monthlyContribution.toFixed(0)}
                  </span>
                </div>
              </div>
              
              <div className={`mt-3 p-2 rounded text-center text-sm ${
                isOnTrack 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {isOnTrack ? '✓ On Track' : '⚠ Need to increase savings'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SavingsGoals;