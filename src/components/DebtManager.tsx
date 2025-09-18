import React, { useState } from 'react';
import { Briefcase, Plus, CreditCard, TrendingDown, Calculator, Trash2, AlertTriangle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface Debt {
  id: number;
  name: string;
  balance: number;
  interestRate: number;
  minimumPayment: number;
  type: 'credit_card' | 'loan' | 'mortgage' | 'student_loan' | 'other';
  dueDate: string;
}

const DebtManager = () => {
  const { theme } = useTheme();
  const [debts, setDebts] = useState<Debt[]>([
    {
      id: 1,
      name: 'Credit Card - Chase',
      balance: 3500,
      interestRate: 18.99,
      minimumPayment: 105,
      type: 'credit_card',
      dueDate: '2024-02-15'
    },
    {
      id: 2,
      name: 'Student Loan',
      balance: 25000,
      interestRate: 4.5,
      minimumPayment: 280,
      type: 'student_loan',
      dueDate: '2024-02-01'
    },
    {
      id: 3,
      name: 'Car Loan',
      balance: 18000,
      interestRate: 6.2,
      minimumPayment: 350,
      type: 'loan',
      dueDate: '2024-02-10'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [payoffStrategy, setPayoffStrategy] = useState<'avalanche' | 'snowball'>('avalanche');
  const [extraPayment, setExtraPayment] = useState(500);
  const [newDebt, setNewDebt] = useState({
    name: '',
    balance: '',
    interestRate: '',
    minimumPayment: '',
    type: 'credit_card' as Debt['type'],
    dueDate: ''
  });

  const debtTypes = [
    { value: 'credit_card', label: 'Credit Card' },
    { value: 'loan', label: 'Personal Loan' },
    { value: 'mortgage', label: 'Mortgage' },
    { value: 'student_loan', label: 'Student Loan' },
    { value: 'other', label: 'Other' }
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

  const handleAddDebt = () => {
    if (newDebt.name && newDebt.balance && newDebt.interestRate && newDebt.minimumPayment) {
      const debt: Debt = {
        id: Date.now(),
        name: newDebt.name,
        balance: parseFloat(newDebt.balance),
        interestRate: parseFloat(newDebt.interestRate),
        minimumPayment: parseFloat(newDebt.minimumPayment),
        type: newDebt.type,
        dueDate: newDebt.dueDate
      };
      setDebts([...debts, debt]);
      setNewDebt({
        name: '',
        balance: '',
        interestRate: '',
        minimumPayment: '',
        type: 'credit_card',
        dueDate: ''
      });
      setShowAddForm(false);
    }
  };

  const deleteDebt = (id: number) => {
    setDebts(debts.filter(debt => debt.id !== id));
  };

  const calculatePayoffTime = (debt: Debt, extraPayment: number = 0) => {
    const monthlyPayment = debt.minimumPayment + extraPayment;
    const monthlyRate = debt.interestRate / 100 / 12;
    
    if (monthlyRate === 0) {
      return Math.ceil(debt.balance / monthlyPayment);
    }
    
    const months = -Math.log(1 - (debt.balance * monthlyRate) / monthlyPayment) / Math.log(1 + monthlyRate);
    return Math.ceil(months);
  };

  const calculateTotalInterest = (debt: Debt, extraPayment: number = 0) => {
    const monthsToPayoff = calculatePayoffTime(debt, extraPayment);
    const monthlyPayment = debt.minimumPayment + extraPayment;
    const totalPaid = monthlyPayment * monthsToPayoff;
    return Math.max(totalPaid - debt.balance, 0);
  };

  const getDebtPriority = () => {
    if (payoffStrategy === 'avalanche') {
      return [...debts].sort((a, b) => b.interestRate - a.interestRate);
    } else {
      return [...debts].sort((a, b) => a.balance - b.balance);
    }
  };

  const totalDebt = debts.reduce((sum, debt) => sum + debt.balance, 0);
  const totalMinimumPayments = debts.reduce((sum, debt) => sum + debt.minimumPayment, 0);
  const weightedAverageRate = debts.reduce((sum, debt) => sum + (debt.interestRate * debt.balance), 0) / totalDebt;

  return (
    <div className={`${currentTheme.bg} border ${currentTheme.border} rounded-xl p-6 shadow-lg`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Briefcase className={`w-8 h-8 ${theme === 'zk' ? 'text-zk-coral' : 'text-blue-600'}`} />
          <h2 className={`text-2xl font-bold ${currentTheme.text}`}>Debt Manager</h2>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className={`${currentTheme.button} px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-all duration-300`}
        >
          <Plus className="w-4 h-4" />
          <span>Add Debt</span>
        </button>
      </div>

      {/* Debt Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className={`${currentTheme.cardBg} rounded-lg p-4 border ${currentTheme.border}`}>
          <div className="flex items-center space-x-2 mb-2">
            <TrendingDown className="w-5 h-5 text-red-500" />
            <span className={`text-sm ${currentTheme.textSecondary}`}>Total Debt</span>
          </div>
          <div className={`text-2xl font-bold text-red-500`}>
            ${totalDebt.toLocaleString()}
          </div>
        </div>

        <div className={`${currentTheme.cardBg} rounded-lg p-4 border ${currentTheme.border}`}>
          <div className="flex items-center space-x-2 mb-2">
            <Calculator className="w-5 h-5 text-blue-500" />
            <span className={`text-sm ${currentTheme.textSecondary}`}>Min. Payments</span>
          </div>
          <div className={`text-2xl font-bold ${currentTheme.text}`}>
            ${totalMinimumPayments.toLocaleString()}
          </div>
        </div>

        <div className={`${currentTheme.cardBg} rounded-lg p-4 border ${currentTheme.border}`}>
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            <span className={`text-sm ${currentTheme.textSecondary}`}>Avg. Interest</span>
          </div>
          <div className={`text-2xl font-bold text-yellow-500`}>
            {weightedAverageRate.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Payoff Strategy */}
      <div className={`${currentTheme.cardBg} rounded-lg p-4 mb-6 border ${currentTheme.border}`}>
        <h3 className={`text-lg font-semibold ${currentTheme.text} mb-4`}>Debt Payoff Strategy</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={`block text-sm font-medium ${currentTheme.textSecondary} mb-2`}>Strategy</label>
            <select
              value={payoffStrategy}
              onChange={(e) => setPayoffStrategy(e.target.value as 'avalanche' | 'snowball')}
              className={`w-full p-2 border ${currentTheme.border} rounded-lg ${currentTheme.bg} ${currentTheme.text}`}
            >
              <option value="avalanche">Debt Avalanche (Highest Interest First)</option>
              <option value="snowball">Debt Snowball (Smallest Balance First)</option>
            </select>
          </div>
          <div>
            <label className={`block text-sm font-medium ${currentTheme.textSecondary} mb-2`}>Extra Monthly Payment</label>
            <input
              type="number"
              value={extraPayment}
              onChange={(e) => setExtraPayment(parseFloat(e.target.value) || 0)}
              className={`w-full p-2 border ${currentTheme.border} rounded-lg ${currentTheme.bg} ${currentTheme.text}`}
              placeholder="500"
            />
          </div>
          <div className="flex items-end">
            <div className={`text-center p-2 ${theme === 'zk' ? 'bg-zk-coral/20' : 'bg-blue-100'} rounded-lg`}>
              <div className={`text-sm ${currentTheme.textSecondary}`}>Total Monthly</div>
              <div className={`text-lg font-bold ${theme === 'zk' ? 'text-zk-coral' : 'text-blue-600'}`}>
                ${(totalMinimumPayments + extraPayment).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Debt Form */}
      {showAddForm && (
        <div className={`${currentTheme.cardBg} rounded-lg p-4 mb-6 border ${currentTheme.border}`}>
          <h3 className={`text-lg font-semibold ${currentTheme.text} mb-4`}>Add New Debt</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium ${currentTheme.textSecondary} mb-2`}>Debt Name</label>
              <input
                type="text"
                value={newDebt.name}
                onChange={(e) => setNewDebt({...newDebt, name: e.target.value})}
                className={`w-full p-2 border ${currentTheme.border} rounded-lg ${currentTheme.bg} ${currentTheme.text}`}
                placeholder="e.g., Credit Card - Chase"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${currentTheme.textSecondary} mb-2`}>Type</label>
              <select
                value={newDebt.type}
                onChange={(e) => setNewDebt({...newDebt, type: e.target.value as Debt['type']})}
                className={`w-full p-2 border ${currentTheme.border} rounded-lg ${currentTheme.bg} ${currentTheme.text}`}
              >
                {debtTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium ${currentTheme.textSecondary} mb-2`}>Balance</label>
              <input
                type="number"
                value={newDebt.balance}
                onChange={(e) => setNewDebt({...newDebt, balance: e.target.value})}
                className={`w-full p-2 border ${currentTheme.border} rounded-lg ${currentTheme.bg} ${currentTheme.text}`}
                placeholder="5000"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${currentTheme.textSecondary} mb-2`}>Interest Rate (%)</label>
              <input
                type="number"
                step="0.01"
                value={newDebt.interestRate}
                onChange={(e) => setNewDebt({...newDebt, interestRate: e.target.value})}
                className={`w-full p-2 border ${currentTheme.border} rounded-lg ${currentTheme.bg} ${currentTheme.text}`}
                placeholder="18.99"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${currentTheme.textSecondary} mb-2`}>Minimum Payment</label>
              <input
                type="number"
                value={newDebt.minimumPayment}
                onChange={(e) => setNewDebt({...newDebt, minimumPayment: e.target.value})}
                className={`w-full p-2 border ${currentTheme.border} rounded-lg ${currentTheme.bg} ${currentTheme.text}`}
                placeholder="150"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${currentTheme.textSecondary} mb-2`}>Due Date</label>
              <input
                type="date"
                value={newDebt.dueDate}
                onChange={(e) => setNewDebt({...newDebt, dueDate: e.target.value})}
                className={`w-full p-2 border ${currentTheme.border} rounded-lg ${currentTheme.bg} ${currentTheme.text}`}
              />
            </div>
          </div>
          <div className="flex space-x-3 mt-4">
            <button
              onClick={handleAddDebt}
              className={`${currentTheme.button} px-4 py-2 rounded-lg font-medium`}
            >
              Add Debt
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

      {/* Debt List with Payoff Order */}
      <div className="space-y-4">
        <h3 className={`text-lg font-semibold ${currentTheme.text} mb-4`}>
          Payoff Order ({payoffStrategy === 'avalanche' ? 'Highest Interest First' : 'Smallest Balance First'})
        </h3>
        {getDebtPriority().map((debt, index) => {
          const payoffMonths = calculatePayoffTime(debt, index === 0 ? extraPayment : 0);
          const totalInterest = calculateTotalInterest(debt, index === 0 ? extraPayment : 0);
          const isPriority = index === 0;
          
          return (
            <div key={debt.id} className={`${currentTheme.cardBg} rounded-lg p-4 border ${isPriority ? (theme === 'zk' ? 'border-zk-coral' : 'border-blue-500') : currentTheme.border} ${isPriority ? 'ring-2 ring-opacity-20' : ''}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {isPriority && (
                    <div className={`px-2 py-1 rounded text-xs font-bold ${theme === 'zk' ? 'bg-zk-coral text-zk-eggshell' : 'bg-blue-500 text-white'}`}>
                      PRIORITY #{index + 1}
                    </div>
                  )}
                  <div>
                    <h3 className={`font-semibold ${currentTheme.text}`}>{debt.name}</h3>
                    <span className={`text-sm ${currentTheme.textSecondary} capitalize`}>{debt.type.replace('_', ' ')}</span>
                  </div>
                </div>
                <button
                  onClick={() => deleteDebt(debt.id)}
                  className={`p-1 ${currentTheme.textSecondary} hover:text-red-500 transition-colors`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className={`${currentTheme.textSecondary} mb-1`}>Balance</div>
                  <div className={`font-semibold text-red-500`}>${debt.balance.toLocaleString()}</div>
                </div>
                <div>
                  <div className={`${currentTheme.textSecondary} mb-1`}>Interest Rate</div>
                  <div className={`font-semibold text-yellow-500`}>{debt.interestRate}%</div>
                </div>
                <div>
                  <div className={`${currentTheme.textSecondary} mb-1`}>Min. Payment</div>
                  <div className={`font-semibold ${currentTheme.text}`}>${debt.minimumPayment}</div>
                </div>
                <div>
                  <div className={`${currentTheme.textSecondary} mb-1`}>Due Date</div>
                  <div className={`font-semibold ${currentTheme.text}`}>{new Date(debt.dueDate).toLocaleDateString()}</div>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-200 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className={`${currentTheme.textSecondary} mb-1`}>Payoff Time</div>
                  <div className={`font-semibold ${theme === 'zk' ? 'text-zk-coral' : 'text-blue-600'}`}>
                    {payoffMonths} months
                  </div>
                </div>
                <div>
                  <div className={`${currentTheme.textSecondary} mb-1`}>Total Interest</div>
                  <div className={`font-semibold text-red-500`}>
                    ${totalInterest.toLocaleString()}
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

export default DebtManager;