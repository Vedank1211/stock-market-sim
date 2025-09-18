import React, { useState } from 'react';
import { Lightbulb, TrendingUp, TrendingDown, AlertTriangle, Target, DollarSign, Calendar, BarChart3 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface Insight {
  id: number;
  type: 'opportunity' | 'warning' | 'achievement' | 'trend';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: 'spending' | 'saving' | 'investing' | 'debt' | 'income';
  actionable: boolean;
  recommendation?: string;
  potentialSavings?: number;
}

const FinancialInsights = () => {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [insights] = useState<Insight[]>([
    {
      id: 1,
      type: 'opportunity',
      title: 'Subscription Optimization',
      description: 'You have 8 active subscriptions totaling $127/month. 3 subscriptions haven\'t been used in 60+ days.',
      impact: 'high',
      category: 'spending',
      actionable: true,
      recommendation: 'Cancel unused subscriptions to save $45/month',
      potentialSavings: 540
    },
    {
      id: 2,
      type: 'achievement',
      title: 'Savings Goal Progress',
      description: 'You\'re ahead of schedule on your emergency fund goal by 2 months!',
      impact: 'medium',
      category: 'saving',
      actionable: false
    },
    {
      id: 3,
      type: 'warning',
      title: 'Dining Out Spike',
      description: 'Your restaurant spending increased 45% this month compared to your 6-month average.',
      impact: 'medium',
      category: 'spending',
      actionable: true,
      recommendation: 'Set a dining budget of $300/month to stay on track',
      potentialSavings: 200
    },
    {
      id: 4,
      type: 'opportunity',
      title: 'Investment Rebalancing',
      description: 'Your portfolio has drifted from target allocation. Tech stocks are now 35% vs 25% target.',
      impact: 'high',
      category: 'investing',
      actionable: true,
      recommendation: 'Rebalance by moving $2,500 from tech to bonds'
    },
    {
      id: 5,
      type: 'trend',
      title: 'Income Growth Pattern',
      description: 'Your freelance income has grown consistently for 6 months, averaging 12% monthly growth.',
      impact: 'high',
      category: 'income',
      actionable: true,
      recommendation: 'Consider increasing retirement contributions by 2%'
    },
    {
      id: 6,
      type: 'opportunity',
      title: 'Credit Card Optimization',
      description: 'You could save $180/year by switching to a cashback card for your spending patterns.',
      impact: 'medium',
      category: 'spending',
      actionable: true,
      recommendation: 'Apply for a 2% cashback card for all purchases',
      potentialSavings: 180
    },
    {
      id: 7,
      type: 'warning',
      title: 'Debt Payoff Delay',
      description: 'At current payment rate, your credit card debt will take 18 months longer than optimal.',
      impact: 'high',
      category: 'debt',
      actionable: true,
      recommendation: 'Increase monthly payment by $150 to save $800 in interest'
    },
    {
      id: 8,
      type: 'achievement',
      title: 'Expense Tracking Consistency',
      description: 'You\'ve successfully tracked expenses for 90 consecutive days! Your accuracy has improved 40%.',
      impact: 'low',
      category: 'spending',
      actionable: false
    }
  ]);

  const categories = [
    { value: 'all', label: 'All Insights' },
    { value: 'spending', label: 'Spending' },
    { value: 'saving', label: 'Saving' },
    { value: 'investing', label: 'Investing' },
    { value: 'debt', label: 'Debt' },
    { value: 'income', label: 'Income' }
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

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return TrendingUp;
      case 'warning': return AlertTriangle;
      case 'achievement': return Target;
      case 'trend': return BarChart3;
      default: return Lightbulb;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'opportunity': return 'text-green-500';
      case 'warning': return 'text-red-500';
      case 'achievement': return 'text-blue-500';
      case 'trend': return 'text-purple-500';
      default: return 'text-gray-500';
    }
  };

  const getInsightBgColor = (type: string) => {
    switch (type) {
      case 'opportunity': return 'bg-green-100 border-green-200';
      case 'warning': return 'bg-red-100 border-red-200';
      case 'achievement': return 'bg-blue-100 border-blue-200';
      case 'trend': return 'bg-purple-100 border-purple-200';
      default: return 'bg-gray-100 border-gray-200';
    }
  };

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredInsights = selectedCategory === 'all' 
    ? insights 
    : insights.filter(insight => insight.category === selectedCategory);

  const totalPotentialSavings = insights
    .filter(insight => insight.potentialSavings)
    .reduce((sum, insight) => sum + (insight.potentialSavings || 0), 0);

  const insightCounts = {
    opportunities: insights.filter(i => i.type === 'opportunity').length,
    warnings: insights.filter(i => i.type === 'warning').length,
    achievements: insights.filter(i => i.type === 'achievement').length,
    actionable: insights.filter(i => i.actionable).length
  };

  return (
    <div className={`${currentTheme.bg} border ${currentTheme.border} rounded-xl p-6 shadow-lg`}>
      <div className="flex items-center space-x-3 mb-6">
        <Lightbulb className={`w-8 h-8 ${theme === 'zk' ? 'text-zk-coral' : 'text-blue-600'}`} />
        <h2 className={`text-2xl font-bold ${currentTheme.text}`}>Financial Insights</h2>
      </div>

      {/* Insights Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className={`${currentTheme.cardBg} rounded-lg p-4 border ${currentTheme.border}`}>
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <span className={`text-sm ${currentTheme.textSecondary}`}>Opportunities</span>
          </div>
          <div className={`text-2xl font-bold text-green-500`}>
            {insightCounts.opportunities}
          </div>
        </div>

        <div className={`${currentTheme.cardBg} rounded-lg p-4 border ${currentTheme.border}`}>
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <span className={`text-sm ${currentTheme.textSecondary}`}>Warnings</span>
          </div>
          <div className={`text-2xl font-bold text-red-500`}>
            {insightCounts.warnings}
          </div>
        </div>

        <div className={`${currentTheme.cardBg} rounded-lg p-4 border ${currentTheme.border}`}>
          <div className="flex items-center space-x-2 mb-2">
            <Target className="w-5 h-5 text-blue-500" />
            <span className={`text-sm ${currentTheme.textSecondary}`}>Achievements</span>
          </div>
          <div className={`text-2xl font-bold text-blue-500`}>
            {insightCounts.achievements}
          </div>
        </div>

        <div className={`${currentTheme.cardBg} rounded-lg p-4 border ${currentTheme.border}`}>
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="w-5 h-5 text-purple-500" />
            <span className={`text-sm ${currentTheme.textSecondary}`}>Potential Savings</span>
          </div>
          <div className={`text-2xl font-bold text-purple-500`}>
            ${totalPotentialSavings.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => setSelectedCategory(category.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              selectedCategory === category.value
                ? (theme === 'zk' ? 'bg-zk-coral text-zk-eggshell' : 'bg-blue-100 text-blue-700 border border-blue-300')
                : `${currentTheme.textSecondary} hover:${currentTheme.text} border ${currentTheme.border}`
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Insights List */}
      <div className="space-y-4">
        {filteredInsights.map((insight) => {
          const Icon = getInsightIcon(insight.type);
          const iconColor = getInsightColor(insight.type);
          
          return (
            <div key={insight.id} className={`${currentTheme.cardBg} rounded-lg p-4 border ${currentTheme.border} hover:shadow-md transition-all duration-300`}>
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-lg ${getInsightBgColor(insight.type)}`}>
                  <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`font-semibold ${currentTheme.text}`}>{insight.title}</h3>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded ${getImpactBadge(insight.impact)}`}>
                        {insight.impact} impact
                      </span>
                      <span className={`text-xs px-2 py-1 rounded ${theme === 'zk' ? 'bg-zk-leather/20 text-zk-eggshell' : 'bg-gray-100 text-gray-800'} capitalize`}>
                        {insight.category}
                      </span>
                    </div>
                  </div>
                  
                  <p className={`text-sm ${currentTheme.textSecondary} mb-3`}>
                    {insight.description}
                  </p>
                  
                  {insight.recommendation && (
                    <div className={`p-3 rounded-lg ${theme === 'zk' ? 'bg-zk-navy border border-zk-leather/30' : 'bg-blue-50 border border-blue-200'} mb-3`}>
                      <div className="flex items-start space-x-2">
                        <Lightbulb className={`w-4 h-4 ${theme === 'zk' ? 'text-zk-coral' : 'text-blue-600'} mt-0.5`} />
                        <div>
                          <div className={`text-sm font-medium ${theme === 'zk' ? 'text-zk-eggshell' : 'text-blue-800'}`}>
                            Recommendation
                          </div>
                          <div className={`text-sm ${theme === 'zk' ? 'text-zk-eggshell/80' : 'text-blue-700'}`}>
                            {insight.recommendation}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm">
                      {insight.potentialSavings && (
                        <div className="flex items-center space-x-1">
                          <DollarSign className="w-4 h-4 text-green-500" />
                          <span className="text-green-500 font-medium">
                            ${insight.potentialSavings}/year savings
                          </span>
                        </div>
                      )}
                      {insight.actionable && (
                        <div className="flex items-center space-x-1">
                          <Target className="w-4 h-4 text-blue-500" />
                          <span className={`${theme === 'zk' ? 'text-zk-coral' : 'text-blue-500'} font-medium`}>
                            Action Required
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {insight.actionable && (
                      <button className={`${currentTheme.button} px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300`}>
                        Take Action
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI-Powered Insights Summary */}
      <div className={`${currentTheme.cardBg} rounded-lg p-4 mt-6 border ${currentTheme.border}`}>
        <h3 className={`text-lg font-semibold ${currentTheme.text} mb-3`}>AI Analysis Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className={`font-medium ${currentTheme.text} mb-2`}>Top Priority Actions</h4>
            <ul className={`text-sm ${currentTheme.textSecondary} space-y-1`}>
              <li>• Cancel 3 unused subscriptions ($540/year savings)</li>
              <li>• Increase debt payments by $150/month</li>
              <li>• Rebalance investment portfolio</li>
            </ul>
          </div>
          <div>
            <h4 className={`font-medium ${currentTheme.text} mb-2`}>Financial Health Trends</h4>
            <ul className={`text-sm ${currentTheme.textSecondary} space-y-1`}>
              <li>• Spending patterns are 85% predictable</li>
              <li>• Income stability has improved 20%</li>
              <li>• Savings rate trending upward (+3% vs last quarter)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialInsights;