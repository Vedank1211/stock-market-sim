import React, { useState, useEffect } from 'react';
import { Shield, TrendingUp, AlertTriangle, CheckCircle, Target, DollarSign } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface HealthMetric {
  name: string;
  score: number;
  maxScore: number;
  status: 'excellent' | 'good' | 'fair' | 'poor';
  description: string;
  recommendation: string;
}

const FinancialHealthScore = () => {
  const { theme } = useTheme();
  const [overallScore, setOverallScore] = useState(0);
  const [metrics, setMetrics] = useState<HealthMetric[]>([
    {
      name: 'Emergency Fund',
      score: 75,
      maxScore: 100,
      status: 'good',
      description: '4.5 months of expenses saved',
      recommendation: 'Aim for 6 months of expenses'
    },
    {
      name: 'Debt-to-Income Ratio',
      score: 60,
      maxScore: 100,
      status: 'fair',
      description: '35% of income goes to debt',
      recommendation: 'Try to keep below 30%'
    },
    {
      name: 'Savings Rate',
      score: 85,
      maxScore: 100,
      status: 'excellent',
      description: 'Saving 22% of income',
      recommendation: 'Excellent! Keep it up'
    },
    {
      name: 'Investment Diversification',
      score: 70,
      maxScore: 100,
      status: 'good',
      description: 'Well diversified portfolio',
      recommendation: 'Consider adding international exposure'
    },
    {
      name: 'Credit Utilization',
      score: 90,
      maxScore: 100,
      status: 'excellent',
      description: '15% credit utilization',
      recommendation: 'Excellent! Keep below 30%'
    },
    {
      name: 'Retirement Readiness',
      score: 55,
      maxScore: 100,
      status: 'fair',
      description: 'On track for 65% of retirement goal',
      recommendation: 'Increase 401k contributions'
    }
  ]);

  const themeClasses = {
    light: {
      bg: 'bg-white',
      cardBg: 'bg-gray-50',
      border: 'border-gray-200',
      text: 'text-gray-900',
      textSecondary: 'text-gray-600'
    },
    zk: {
      bg: 'bg-zk-charcoal',
      cardBg: 'bg-zk-navy',
      border: 'border-zk-leather/30',
      text: 'text-zk-eggshell',
      textSecondary: 'text-zk-eggshell/70'
    }
  };

  const currentTheme = themeClasses[theme];

  useEffect(() => {
    const totalScore = metrics.reduce((sum, metric) => sum + metric.score, 0);
    const maxTotalScore = metrics.reduce((sum, metric) => sum + metric.maxScore, 0);
    setOverallScore(Math.round((totalScore / maxTotalScore) * 100));
  }, [metrics]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    if (score >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return CheckCircle;
      case 'good': return TrendingUp;
      case 'fair': return AlertTriangle;
      case 'poor': return AlertTriangle;
      default: return AlertTriangle;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-500';
      case 'good': return 'text-blue-500';
      case 'fair': return 'text-yellow-500';
      case 'poor': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getOverallHealthStatus = (score: number) => {
    if (score >= 80) return { status: 'Excellent', color: 'text-green-500', description: 'Your financial health is outstanding!' };
    if (score >= 70) return { status: 'Good', color: 'text-blue-500', description: 'Your finances are in good shape with room for improvement.' };
    if (score >= 60) return { status: 'Fair', color: 'text-yellow-500', description: 'Your financial health needs attention in some areas.' };
    return { status: 'Needs Improvement', color: 'text-red-500', description: 'Focus on improving key financial metrics.' };
  };

  const healthStatus = getOverallHealthStatus(overallScore);

  return (
    <div className={`${currentTheme.bg} border ${currentTheme.border} rounded-xl p-6 shadow-lg`}>
      <div className="flex items-center space-x-3 mb-6">
        <Shield className={`w-8 h-8 ${theme === 'zk' ? 'text-zk-coral' : 'text-blue-600'}`} />
        <h2 className={`text-2xl font-bold ${currentTheme.text}`}>Financial Health Score</h2>
      </div>

      {/* Overall Score Circle */}
      <div className="flex items-center justify-center mb-8">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="45"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="8"
            />
            <circle
              cx="60"
              cy="60"
              r="45"
              fill="none"
              stroke={theme === 'zk' ? '#FF533D' : '#3b82f6'}
              strokeWidth="8"
              strokeDasharray={`${(overallScore / 100) * 283} 283`}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={`text-4xl font-bold ${getScoreColor(overallScore)}`}>
                {overallScore}
              </div>
              <div className={`text-lg font-semibold ${healthStatus.color}`}>
                {healthStatus.status}
              </div>
              <div className={`text-sm ${currentTheme.textSecondary} mt-1`}>
                {healthStatus.description}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className={`${currentTheme.cardBg} rounded-lg p-3 border ${currentTheme.border} text-center`}>
          <div className={`text-lg font-bold text-green-500`}>6.5M</div>
          <div className={`text-sm ${currentTheme.textSecondary}`}>Emergency Fund</div>
        </div>
        <div className={`${currentTheme.cardBg} rounded-lg p-3 border ${currentTheme.border} text-center`}>
          <div className={`text-lg font-bold text-blue-500`}>22%</div>
          <div className={`text-sm ${currentTheme.textSecondary}`}>Savings Rate</div>
        </div>
        <div className={`${currentTheme.cardBg} rounded-lg p-3 border ${currentTheme.border} text-center`}>
          <div className={`text-lg font-bold text-yellow-500`}>35%</div>
          <div className={`text-sm ${currentTheme.textSecondary}`}>Debt Ratio</div>
        </div>
        <div className={`${currentTheme.cardBg} rounded-lg p-3 border ${currentTheme.border} text-center`}>
          <div className={`text-lg font-bold text-purple-500`}>750</div>
          <div className={`text-sm ${currentTheme.textSecondary}`}>Credit Score</div>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="space-y-4">
        <h3 className={`text-lg font-semibold ${currentTheme.text} mb-4`}>Health Breakdown</h3>
        {metrics.map((metric, index) => {
          const StatusIcon = getStatusIcon(metric.status);
          const percentage = (metric.score / metric.maxScore) * 100;
          
          return (
            <div key={index} className={`${currentTheme.cardBg} rounded-lg p-4 border ${currentTheme.border}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <StatusIcon className={`w-5 h-5 ${getStatusColor(metric.status)}`} />
                  <div>
                    <h4 className={`font-semibold ${currentTheme.text}`}>{metric.name}</h4>
                    <p className={`text-sm ${currentTheme.textSecondary}`}>{metric.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getScoreColor(metric.score)}`}>
                    {metric.score}
                  </div>
                  <div className={`text-sm ${currentTheme.textSecondary}`}>
                    /{metric.maxScore}
                  </div>
                </div>
              </div>
              
              <div className="mb-3">
                <div className={`w-full bg-gray-200 rounded-full h-2`}>
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${getScoreBgColor(metric.score)}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
              
              <div className={`text-sm ${currentTheme.textSecondary} italic`}>
                💡 {metric.recommendation}
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Recommendations */}
      <div className={`${currentTheme.cardBg} rounded-lg p-4 mt-6 border ${currentTheme.border}`}>
        <h3 className={`text-lg font-semibold ${currentTheme.text} mb-3`}>AI-Powered Recommendations</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <Target className="w-5 h-5 text-blue-500 mt-0.5" />
            <div>
              <div className={`font-medium ${currentTheme.text}`}>Priority Action</div>
              <div className={`text-sm ${currentTheme.textSecondary}`}>
                Focus on reducing debt-to-income ratio by paying extra $200/month toward highest interest debt
              </div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <DollarSign className="w-5 h-5 text-green-500 mt-0.5" />
            <div>
              <div className={`font-medium ${currentTheme.text}`}>Savings Opportunity</div>
              <div className={`text-sm ${currentTheme.textSecondary}`}>
                You could save an additional $150/month by optimizing your subscription services
              </div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <TrendingUp className="w-5 h-5 text-purple-500 mt-0.5" />
            <div>
              <div className={`font-medium ${currentTheme.text}`}>Investment Tip</div>
              <div className={`text-sm ${currentTheme.textSecondary}`}>
                Consider increasing 401k contribution to 15% to maximize employer match and tax benefits
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialHealthScore;