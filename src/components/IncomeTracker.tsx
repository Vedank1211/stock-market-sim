import React, { useState } from 'react';
import { PiggyBank, Plus, TrendingUp, Calendar, DollarSign, Trash2, Edit3 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface IncomeSource {
  id: number;
  name: string;
  amount: number;
  frequency: 'weekly' | 'bi-weekly' | 'monthly' | 'quarterly' | 'yearly' | 'one-time';
  category: string;
  nextPayment: string;
  isActive: boolean;
  taxable: boolean;
}

const IncomeTracker = () => {
  const { theme } = useTheme();
  const [incomeSources, setIncomeSources] = useState<IncomeSource[]>([
    {
      id: 1,
      name: 'Software Engineer Salary',
      amount: 8500,
      frequency: 'monthly',
      category: 'Salary',
      nextPayment: '2024-02-01',
      isActive: true,
      taxable: true
    },
    {
      id: 2,
      name: 'Freelance Web Development',
      amount: 1200,
      frequency: 'monthly',
      category: 'Freelance',
      nextPayment: '2024-02-15',
      isActive: true,
      taxable: true
    },
    {
      id: 3,
      name: 'Stock Dividends',
      amount: 450,
      frequency: 'quarterly',
      category: 'Investment',
      nextPayment: '2024-03-01',
      isActive: true,
      taxable: true
    },
    {
      id: 4,
      name: 'Rental Property',
      amount: 1800,
      frequency: 'monthly',
      category: 'Rental',
      nextPayment: '2024-02-01',
      isActive: true,
      taxable: true
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newIncome, setNewIncome] = useState({
    name: '',
    amount: '',
    frequency: 'monthly' as IncomeSource['frequency'],
    category: 'Salary',
    nextPayment: '',
    taxable: true
  });

  const categories = ['Salary', 'Freelance', 'Business', 'Investment', 'Rental', 'Side Hustle', 'Other'];
  const frequencies = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'bi-weekly', label: 'Bi-weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'yearly', label: 'Yearly' },
    { value: 'one-time', label: 'One-time' }
  ];

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

  const handleAddIncome = () => {
    if (newIncome.name && newIncome.amount) {
      const income: IncomeSource = {
        id: Date.now(),
        name: newIncome.name,
        amount: parseFloat(newIncome.amount),
        frequency: newIncome.frequency,
        category: newIncome.category,
        nextPayment: newIncome.nextPayment,
        isActive: true,
        taxable: newIncome.taxable
      };
      setIncomeSources([...incomeSources, income]);
      setNewIncome({
        name: '',
        amount: '',
        frequency: 'monthly',
        category: 'Salary',
        nextPayment: '',
        taxable: true
      });
      setShowAddForm(false);
    }
  };

  const deleteIncome = (id: number) => {
    setIncomeSources(incomeSources.filter(income => income.id !== id));
  };

  const toggleIncomeStatus = (id: number) => {
    setIncomeSources(incomeSources.map(income => 
      income.id === id ? { ...income, isActive: !income.isActive } : income
    ));
  };

  const calculateMonthlyEquivalent = (amount: number, frequency: IncomeSource['frequency']) => {
    switch (frequency) {
      case 'weekly': return amount * 4.33;
      case 'bi-weekly': return amount * 2.17;
      case 'monthly': return amount;
      case 'quarterly': return amount / 3;
      case 'yearly': return amount / 12;
      case 'one-time': return 0;
      default: return amount;
    }
  };

  const calculateYearlyEquivalent = (amount: number, frequency: IncomeSource['frequency']) => {
    switch (frequency) {
      case 'weekly': return amount * 52;
      case 'bi-weekly': return amount * 26;
      case 'monthly': return amount * 12;
      case 'quarterly': return amount * 4;
      case 'yearly': return amount;
      case 'one-time': return amount;
      default: return amount * 12;
    }
  };

  const activeIncome = incomeSources.filter(income => income.isActive);
  const totalMonthlyIncome = activeIncome.reduce((sum, income) => sum + calculateMonthlyEquivalent(income.amount, income.frequency), 0);
  const totalYearlyIncome = activeIncome.reduce((sum, income) => sum + calculateYearlyEquivalent(income.amount, income.frequency), 0);
  const taxableIncome = activeIncome.filter(income => income.taxable).reduce((sum, income) => sum + calculateYearlyEquivalent(income.amount, income.frequency), 0);
  const estimatedTax = taxableIncome * 0.25; // Rough 25% tax estimate

  // Group by category
  const incomeByCategory = activeIncome.reduce((acc, income) => {
    const monthlyAmount = calculateMonthlyEquivalent(income.amount, income.frequency);
    acc[income.category] = (acc[income.category] || 0) + monthlyAmount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className={`${currentTheme.bg} border ${currentTheme.border} rounded-xl p-6 shadow-lg`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <PiggyBank className={`w-8 h-8 ${theme === 'zk' ? 'text-zk-coral' : 'text-blue-600'}`} />
          <h2 className={`text-2xl font-bold ${currentTheme.text}`}>Income Tracker</h2>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className={`${currentTheme.button} px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-all duration-300`}
        >
          <Plus className="w-4 h-4" />
          <span>Add Income</span>
        </button>
      </div>

      {/* Income Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className={`${currentTheme.cardBg} rounded-lg p-4 border ${currentTheme.border}`}>
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <span className={`text-sm ${currentTheme.textSecondary}`}>Monthly Income</span>
          </div>
          <div className={`text-2xl font-bold text-green-500`}>
            ${totalMonthlyIncome.toLocaleString()}
          </div>
        </div>

        <div className={`${currentTheme.cardBg} rounded-lg p-4 border ${currentTheme.border}`}>
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            <span className={`text-sm ${currentTheme.textSecondary}`}>Yearly Income</span>
          </div>
          <div className={`text-2xl font-bold text-blue-500`}>
            ${totalYearlyIncome.toLocaleString()}
          </div>
        </div>

        <div className={`${currentTheme.cardBg} rounded-lg p-4 border ${currentTheme.border}`}>
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="w-5 h-5 text-yellow-500" />
            <span className={`text-sm ${currentTheme.textSecondary}`}>Taxable Income</span>
          </div>
          <div className={`text-2xl font-bold text-yellow-500`}>
            ${taxableIncome.toLocaleString()}
          </div>
        </div>

        <div className={`${currentTheme.cardBg} rounded-lg p-4 border ${currentTheme.border}`}>
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-5 h-5 text-red-500" />
            <span className={`text-sm ${currentTheme.textSecondary}`}>Est. Tax (25%)</span>
          </div>
          <div className={`text-2xl font-bold text-red-500`}>
            ${estimatedTax.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Income by Category */}
      <div className={`${currentTheme.cardBg} rounded-lg p-4 mb-6 border ${currentTheme.border}`}>
        <h3 className={`text-lg font-semibold ${currentTheme.text} mb-4`}>Income by Category (Monthly)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(incomeByCategory).map(([category, amount]) => (
            <div key={category} className="text-center">
              <div className={`text-lg font-bold ${currentTheme.text}`}>${amount.toLocaleString()}</div>
              <div className={`text-sm ${currentTheme.textSecondary}`}>{category}</div>
              <div className={`text-xs ${currentTheme.textSecondary}`}>
                {((amount / totalMonthlyIncome) * 100).toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Income Form */}
      {showAddForm && (
        <div className={`${currentTheme.cardBg} rounded-lg p-4 mb-6 border ${currentTheme.border}`}>
          <h3 className={`text-lg font-semibold ${currentTheme.text} mb-4`}>Add New Income Source</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium ${currentTheme.textSecondary} mb-2`}>Income Source Name</label>
              <input
                type="text"
                value={newIncome.name}
                onChange={(e) => setNewIncome({...newIncome, name: e.target.value})}
                className={`w-full p-2 border ${currentTheme.border} rounded-lg ${currentTheme.bg} ${currentTheme.text}`}
                placeholder="e.g., Software Engineer Salary"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${currentTheme.textSecondary} mb-2`}>Category</label>
              <select
                value={newIncome.category}
                onChange={(e) => setNewIncome({...newIncome, category: e.target.value})}
                className={`w-full p-2 border ${currentTheme.border} rounded-lg ${currentTheme.bg} ${currentTheme.text}`}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium ${currentTheme.textSecondary} mb-2`}>Amount</label>
              <input
                type="number"
                value={newIncome.amount}
                onChange={(e) => setNewIncome({...newIncome, amount: e.target.value})}
                className={`w-full p-2 border ${currentTheme.border} rounded-lg ${currentTheme.bg} ${currentTheme.text}`}
                placeholder="5000"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${currentTheme.textSecondary} mb-2`}>Frequency</label>
              <select
                value={newIncome.frequency}
                onChange={(e) => setNewIncome({...newIncome, frequency: e.target.value as IncomeSource['frequency']})}
                className={`w-full p-2 border ${currentTheme.border} rounded-lg ${currentTheme.bg} ${currentTheme.text}`}
              >
                {frequencies.map(freq => (
                  <option key={freq.value} value={freq.value}>{freq.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium ${currentTheme.textSecondary} mb-2`}>Next Payment</label>
              <input
                type="date"
                value={newIncome.nextPayment}
                onChange={(e) => setNewIncome({...newIncome, nextPayment: e.target.value})}
                className={`w-full p-2 border ${currentTheme.border} rounded-lg ${currentTheme.bg} ${currentTheme.text}`}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="taxable"
                checked={newIncome.taxable}
                onChange={(e) => setNewIncome({...newIncome, taxable: e.target.checked})}
                className="rounded"
              />
              <label htmlFor="taxable" className={`text-sm ${currentTheme.textSecondary}`}>
                Taxable Income
              </label>
            </div>
          </div>
          <div className="flex space-x-3 mt-4">
            <button
              onClick={handleAddIncome}
              className={`${currentTheme.button} px-4 py-2 rounded-lg font-medium`}
            >
              Add Income Source
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

      {/* Income Sources List */}
      <div className="space-y-4">
        <h3 className={`text-lg font-semibold ${currentTheme.text} mb-4`}>Income Sources</h3>
        {incomeSources.map((income) => {
          const monthlyEquivalent = calculateMonthlyEquivalent(income.amount, income.frequency);
          const yearlyEquivalent = calculateYearlyEquivalent(income.amount, income.frequency);
          
          return (
            <div key={income.id} className={`${currentTheme.cardBg} rounded-lg p-4 border ${currentTheme.border} ${!income.isActive ? 'opacity-60' : ''}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div>
                    <h3 className={`font-semibold ${currentTheme.text}`}>{income.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm ${currentTheme.textSecondary}`}>{income.category}</span>
                      <span className={`text-xs px-2 py-1 rounded ${income.taxable ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                        {income.taxable ? 'Taxable' : 'Tax-Free'}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded ${income.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {income.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleIncomeStatus(income.id)}
                    className={`p-1 ${currentTheme.textSecondary} hover:${currentTheme.text} transition-colors`}
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteIncome(income.id)}
                    className={`p-1 ${currentTheme.textSecondary} hover:text-red-500 transition-colors`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className={`${currentTheme.textSecondary} mb-1`}>Amount ({income.frequency})</div>
                  <div className={`font-semibold text-green-500`}>${income.amount.toLocaleString()}</div>
                </div>
                <div>
                  <div className={`${currentTheme.textSecondary} mb-1`}>Monthly Equivalent</div>
                  <div className={`font-semibold ${currentTheme.text}`}>${monthlyEquivalent.toLocaleString()}</div>
                </div>
                <div>
                  <div className={`${currentTheme.textSecondary} mb-1`}>Yearly Equivalent</div>
                  <div className={`font-semibold ${currentTheme.text}`}>${yearlyEquivalent.toLocaleString()}</div>
                </div>
                <div>
                  <div className={`${currentTheme.textSecondary} mb-1`}>Next Payment</div>
                  <div className={`font-semibold ${currentTheme.text}`}>
                    {income.nextPayment ? new Date(income.nextPayment).toLocaleDateString() : 'N/A'}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IncomeTracker;