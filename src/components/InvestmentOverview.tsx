import React, { useState } from 'react';
import { TrendingUp, PieChart, DollarSign, Target, Plus, BarChart3 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface Investment {
  id: number;
  name: string;
  type: 'stocks' | 'bonds' | 'etf' | 'mutual_fund' | 'crypto' | 'real_estate';
  amount: number;
  currentValue: number;
  allocation: number;
  returnRate: number;
  riskLevel: 'low' | 'medium' | 'high';
}

const InvestmentOverview = () => {
  const { theme } = useTheme();
  const [investments, setInvestments] = useState<Investment[]>([
    {
      id: 1,
      name: 'S&P 500 Index Fund',
      type: 'etf',
      amount: 15000,
      currentValue: 18500,
      allocation: 40,
      returnRate: 23.3,
      riskLevel: 'medium'
    },
    {
      id: 2,
      name: 'Total Bond Market',
      type: 'bonds',
      amount: 8000,
      currentValue: 8200,
      allocation: 20,
      returnRate: 2.5,
      riskLevel: 'low'
    },
    {
      id: 3,
      name: 'International Stocks',
      type: 'etf',
      amount: 6000,
      currentValue: 6800,
      allocation: 15,
      returnRate: 13.3,
      riskLevel: 'medium'
    },
    {
      id: 4,
      name: 'Tech Growth Fund',
      type: 'mutual_fund',
      amount: 5000,
      currentValue: 5900,
      allocation: 15,
      returnRate: 18.0,
      riskLevel: 'high'
    },
    {
      id: 5,
      name: 'REIT Portfolio',
      type: 'real_estate',
      amount: 4000,
      currentValue: 4300,
      allocation: 10,
      returnRate: 7.5,
      riskLevel: 'medium'
    }
  ]);

  const [selectedTimeframe, setSelectedTimeframe] = useState('1Y');
  const timeframes = ['1M', '3M', '6M', '1Y', '5Y', 'All'];

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

  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalCurrentValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
  const totalGainLoss = totalCurrentValue - totalInvested;
  const totalReturnPercentage = ((totalCurrentValue - totalInvested) / totalInvested) * 100;

  const getTypeColor = (type: string) => {
    const colors = {
      stocks: '#ef4444',
      bonds: '#3b82f6',
      etf: '#10b981',
      mutual_fund: '#8b5cf6',
      crypto: '#f59e0b',
      real_estate: '#06b6d4'
    };
    return colors[type as keyof typeof colors] || '#6b7280';
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'high': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Asset allocation by type
  const allocationByType = investments.reduce((acc, inv) => {
    acc[inv.type] = (acc[inv.type] || 0) + inv.allocation;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className={`${currentTheme.bg} border ${currentTheme.border} rounded-xl p-6 shadow-lg`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <TrendingUp className={`w-8 h-8 ${theme === 'zk' ? 'text-zk-coral' : 'text-blue-600'}`} />
          <h2 className={`text-2xl font-bold ${currentTheme.text}`}>Investment Overview</h2>
        </div>
        <div className="flex items-center space-x-2">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setSelectedTimeframe(tf)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedTimeframe === tf
                  ? (theme === 'zk' ? 'bg-zk-coral text-zk-eggshell' : 'bg-blue-100 text-blue-700')
                  : `${currentTheme.textSecondary} hover:${currentTheme.text}`
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className={`${currentTheme.cardBg} rounded-lg p-4 border ${currentTheme.border}`}>
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="w-5 h-5 text-blue-500" />
            <span className={`text-sm ${currentTheme.textSecondary}`}>Total Invested</span>
          </div>
          <div className={`text-2xl font-bold ${currentTheme.text}`}>
            ${totalInvested.toLocaleString()}
          </div>
        </div>

        <div className={`${currentTheme.cardBg} rounded-lg p-4 border ${currentTheme.border}`}>
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <span className={`text-sm ${currentTheme.textSecondary}`}>Current Value</span>
          </div>
          <div className={`text-2xl font-bold text-green-500`}>
            ${totalCurrentValue.toLocaleString()}
          </div>
        </div>

        <div className={`${currentTheme.cardBg} rounded-lg p-4 border ${currentTheme.border}`}>
          <div className="flex items-center space-x-2 mb-2">
            <BarChart3 className="w-5 h-5 text-purple-500" />
            <span className={`text-sm ${currentTheme.textSecondary}`}>Total Gain/Loss</span>
          </div>
          <div className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {totalGainLoss >= 0 ? '+' : ''}${totalGainLoss.toLocaleString()}
          </div>
        </div>

        <div className={`${currentTheme.cardBg} rounded-lg p-4 border ${currentTheme.border}`}>
          <div className="flex items-center space-x-2 mb-2">
            <Target className="w-5 h-5 text-yellow-500" />
            <span className={`text-sm ${currentTheme.textSecondary}`}>Return %</span>
          </div>
          <div className={`text-2xl font-bold ${totalReturnPercentage >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {totalReturnPercentage >= 0 ? '+' : ''}{totalReturnPercentage.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Asset Allocation Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className={`${currentTheme.cardBg} rounded-lg p-4 border ${currentTheme.border}`}>
          <h3 className={`text-lg font-semibold ${currentTheme.text} mb-4`}>Asset Allocation</h3>
          <div className="flex justify-center mb-4">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                {Object.entries(allocationByType).map(([type, allocation], index) => {
                  const startAngle = Object.entries(allocationByType).slice(0, index).reduce((acc, [, alloc]) => acc + (alloc / 100) * 360, 0);
                  const endAngle = startAngle + (allocation / 100) * 360;
                  const largeArcFlag = allocation > 50 ? 1 : 0;
                  
                  const x1 = 60 + 35 * Math.cos((startAngle * Math.PI) / 180);
                  const y1 = 60 + 35 * Math.sin((startAngle * Math.PI) / 180);
                  const x2 = 60 + 35 * Math.cos((endAngle * Math.PI) / 180);
                  const y2 = 60 + 35 * Math.sin((endAngle * Math.PI) / 180);
                  
                  return (
                    <path
                      key={type}
                      d={`M 60,60 L ${x1},${y1} A 35,35 0 ${largeArcFlag},1 ${x2},${y2} z`}
                      fill={getTypeColor(type)}
                      className="hover:opacity-80 transition-opacity cursor-pointer"
                    />
                  );
                })}
              </svg>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(allocationByType).map(([type, allocation]) => (
              <div key={type} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getTypeColor(type) }}
                ></div>
                <span className={`text-sm ${currentTheme.textSecondary} capitalize`}>
                  {type.replace('_', ' ')} ({allocation}%)
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={`${currentTheme.cardBg} rounded-lg p-4 border ${currentTheme.border}`}>
          <h3 className={`text-lg font-semibold ${currentTheme.text} mb-4`}>Performance Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className={`text-sm ${currentTheme.textSecondary}`}>Best Performer</span>
              <span className={`font-semibold text-green-500`}>
                S&P 500 (+23.3%)
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-sm ${currentTheme.textSecondary}`}>Worst Performer</span>
              <span className={`font-semibold text-yellow-500`}>
                Bonds (+2.5%)
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-sm ${currentTheme.textSecondary}`}>Portfolio Beta</span>
              <span className={`font-semibold ${currentTheme.text}`}>0.85</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-sm ${currentTheme.textSecondary}`}>Sharpe Ratio</span>
              <span className={`font-semibold ${currentTheme.text}`}>1.42</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-sm ${currentTheme.textSecondary}`}>Expense Ratio</span>
              <span className={`font-semibold ${currentTheme.text}`}>0.08%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Investment Holdings */}
      <div>
        <h3 className={`text-lg font-semibold ${currentTheme.text} mb-4`}>Holdings</h3>
        <div className="space-y-3">
          {investments.map((investment) => {
            const gainLoss = investment.currentValue - investment.amount;
            const gainLossPercentage = ((investment.currentValue - investment.amount) / investment.amount) * 100;
            
            return (
              <div key={investment.id} className={`${currentTheme.cardBg} rounded-lg p-4 border ${currentTheme.border}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                      style={{ backgroundColor: getTypeColor(investment.type) }}
                    >
                      {investment.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className={`font-semibold ${currentTheme.text}`}>{investment.name}</h4>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm ${currentTheme.textSecondary} capitalize`}>
                          {investment.type.replace('_', ' ')}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${getRiskBadgeColor(investment.riskLevel)}`}>
                          {investment.riskLevel} risk
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-semibold ${currentTheme.text}`}>
                      ${investment.currentValue.toLocaleString()}
                    </div>
                    <div className={`text-sm ${gainLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {gainLoss >= 0 ? '+' : ''}${gainLoss.toLocaleString()} ({gainLossPercentage >= 0 ? '+' : ''}{gainLossPercentage.toFixed(1)}%)
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className={`${currentTheme.textSecondary} mb-1`}>Invested</div>
                    <div className={`font-semibold ${currentTheme.text}`}>${investment.amount.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className={`${currentTheme.textSecondary} mb-1`}>Allocation</div>
                    <div className={`font-semibold ${currentTheme.text}`}>{investment.allocation}%</div>
                  </div>
                  <div>
                    <div className={`${currentTheme.textSecondary} mb-1`}>Return</div>
                    <div className={`font-semibold ${investment.returnRate >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {investment.returnRate >= 0 ? '+' : ''}{investment.returnRate.toFixed(1)}%
                    </div>
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className={`w-full bg-gray-200 rounded-full h-2`}>
                    <div 
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${investment.allocation}%`,
                        backgroundColor: getTypeColor(investment.type)
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Investment Strategy Recommendations */}
      <div className={`${currentTheme.cardBg} rounded-lg p-4 mt-6 border ${currentTheme.border}`}>
        <h3 className={`text-lg font-semibold ${currentTheme.text} mb-3`}>AI Investment Recommendations</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <Target className="w-5 h-5 text-blue-500 mt-0.5" />
            <div>
              <div className={`font-medium ${currentTheme.text}`}>Rebalancing Needed</div>
              <div className={`text-sm ${currentTheme.textSecondary}`}>
                Your S&P 500 allocation is above target (40% vs 35% target). Consider rebalancing.
              </div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <PieChart className="w-5 h-5 text-green-500 mt-0.5" />
            <div>
              <div className={`font-medium ${currentTheme.text}`}>Diversification Opportunity</div>
              <div className={`text-sm ${currentTheme.textSecondary}`}>
                Consider adding emerging markets exposure (5-10%) to improve diversification.
              </div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <DollarSign className="w-5 h-5 text-purple-500 mt-0.5" />
            <div>
              <div className={`font-medium ${currentTheme.text}`}>Tax Optimization</div>
              <div className={`text-sm ${currentTheme.textSecondary}`}>
                Move high-growth investments to tax-advantaged accounts to minimize tax impact.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentOverview;