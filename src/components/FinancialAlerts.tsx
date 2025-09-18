import React, { useState, useEffect } from 'react';
import { AlertTriangle, TrendingUp, TrendingDown, DollarSign, X, Bell, Calendar } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface Alert {
  id: number;
  type: 'budget' | 'goal' | 'bill' | 'investment' | 'debt' | 'income';
  severity: 'high' | 'medium' | 'low';
  title: string;
  message: string;
  time: string;
  actionable: boolean;
  dismissed: boolean;
}

const FinancialAlerts = () => {
  const { theme } = useTheme();
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 1,
      type: 'budget',
      severity: 'high',
      title: 'Budget Exceeded',
      message: 'Entertainment budget exceeded by $85 this month',
      time: '5 min ago',
      actionable: true,
      dismissed: false
    },
    {
      id: 2,
      type: 'bill',
      severity: 'medium',
      title: 'Bill Due Soon',
      message: 'Credit card payment of $450 due in 3 days',
      time: '1 hour ago',
      actionable: true,
      dismissed: false
    },
    {
      id: 3,
      type: 'goal',
      severity: 'low',
      title: 'Savings Goal Progress',
      message: 'Emergency fund goal 75% complete - great progress!',
      time: '2 hours ago',
      actionable: false,
      dismissed: false
    },
    {
      id: 4,
      type: 'investment',
      severity: 'medium',
      title: 'Portfolio Rebalancing',
      message: 'Your portfolio has drifted 5% from target allocation',
      time: '1 day ago',
      actionable: true,
      dismissed: false
    },
    {
      id: 5,
      type: 'debt',
      severity: 'high',
      title: 'High Interest Debt',
      message: 'Credit card balance growing - consider debt consolidation',
      time: '2 days ago',
      actionable: true,
      dismissed: false
    },
    {
      id: 6,
      type: 'income',
      severity: 'low',
      title: 'Income Received',
      message: 'Freelance payment of $1,200 deposited',
      time: '3 days ago',
      actionable: false,
      dismissed: false
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

  const dismissAlert = (id: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, dismissed: true } : alert
    ));
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'budget': return DollarSign;
      case 'goal': return TrendingUp;
      case 'bill': return Calendar;
      case 'investment': return TrendingUp;
      case 'debt': return TrendingDown;
      case 'income': return TrendingUp;
      default: return AlertTriangle;
    }
  };

  const getAlertColors = (severity: string) => {
    switch (severity) {
      case 'high': return {
        border: theme === 'zk' ? 'border-zk-coral/50' : 'border-red-200',
        bg: theme === 'zk' ? 'bg-zk-coral/10' : 'bg-red-50',
        icon: theme === 'zk' ? 'text-zk-coral' : 'text-red-500',
        text: theme === 'zk' ? 'text-zk-eggshell' : 'text-red-800'
      };
      case 'medium': return {
        border: theme === 'zk' ? 'border-zk-leather/50' : 'border-yellow-200',
        bg: theme === 'zk' ? 'bg-zk-leather/10' : 'bg-yellow-50',
        icon: theme === 'zk' ? 'text-zk-leather' : 'text-yellow-500',
        text: theme === 'zk' ? 'text-zk-eggshell' : 'text-yellow-800'
      };
      case 'low': return {
        border: 'border-green-200',
        bg: 'bg-green-50',
        icon: 'text-green-500',
        text: 'text-green-800'
      };
      default: return {
        border: currentTheme.border,
        bg: currentTheme.cardBg,
        icon: currentTheme.textSecondary,
        text: currentTheme.text
      };
    }
  };

  const activeAlerts = alerts.filter(alert => !alert.dismissed);
  const highPriorityCount = activeAlerts.filter(alert => alert.severity === 'high').length;
  const actionableCount = activeAlerts.filter(alert => alert.actionable).length;

  // Simulate new alerts
  useEffect(() => {
    const interval = setInterval(() => {
      const newAlert: Alert = {
        id: Date.now(),
        type: 'budget',
        severity: 'medium',
        title: 'Spending Alert',
        message: 'Daily spending limit reached',
        time: 'Just now',
        actionable: true,
        dismissed: false
      };
      
      setAlerts(prev => [newAlert, ...prev.slice(0, 9)]); // Keep only 10 alerts
    }, 45000); // New alert every 45 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${currentTheme.bg} border ${currentTheme.border} rounded-xl p-6 shadow-lg`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Bell className={`w-8 h-8 ${theme === 'zk' ? 'text-zk-coral' : 'text-blue-600'}`} />
          <h2 className={`text-2xl font-bold ${currentTheme.text}`}>Financial Alerts</h2>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 ${theme === 'zk' ? 'bg-zk-coral' : 'bg-red-500'} rounded-full animate-pulse`}></div>
          <span className={`text-sm ${theme === 'zk' ? 'text-zk-coral' : 'text-red-500'}`}>
            {activeAlerts.length} Active
          </span>
        </div>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className={`${currentTheme.cardBg} rounded-lg p-3 border ${currentTheme.border} text-center`}>
          <div className={`text-lg font-bold ${theme === 'zk' ? 'text-zk-coral' : 'text-red-500'}`}>
            {highPriorityCount}
          </div>
          <div className={`text-sm ${currentTheme.textSecondary}`}>High Priority</div>
        </div>
        <div className={`${currentTheme.cardBg} rounded-lg p-3 border ${currentTheme.border} text-center`}>
          <div className={`text-lg font-bold ${theme === 'zk' ? 'text-zk-leather' : 'text-blue-500'}`}>
            {actionableCount}
          </div>
          <div className={`text-sm ${currentTheme.textSecondary}`}>Action Needed</div>
        </div>
        <div className={`${currentTheme.cardBg} rounded-lg p-3 border ${currentTheme.border} text-center`}>
          <div className={`text-lg font-bold ${currentTheme.text}`}>
            {activeAlerts.length}
          </div>
          <div className={`text-sm ${currentTheme.textSecondary}`}>Total Alerts</div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {activeAlerts.map((alert) => {
          const Icon = getAlertIcon(alert.type);
          const colors = getAlertColors(alert.severity);
          
          return (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border ${colors.border} ${colors.bg} transition-all duration-200 hover:shadow-md`}
            >
              <div className="flex items-start space-x-3">
                <Icon className={`w-5 h-5 mt-0.5 ${colors.icon}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`font-semibold ${colors.text} text-sm`}>
                      {alert.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded ${
                        alert.severity === 'high' ? (theme === 'zk' ? 'bg-zk-coral/20 text-zk-coral' : 'bg-red-100 text-red-800') :
                        alert.severity === 'medium' ? (theme === 'zk' ? 'bg-zk-leather/20 text-zk-leather' : 'bg-yellow-100 text-yellow-800') :
                        'bg-green-100 text-green-800'
                      }`}>
                        {alert.severity}
                      </span>
                      <span className={`text-xs ${currentTheme.textSecondary}`}>{alert.time}</span>
                      <button
                        onClick={() => dismissAlert(alert.id)}
                        className={`${currentTheme.textSecondary} hover:${currentTheme.text} transition-colors`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <p className={`text-sm ${colors.text} opacity-90 mb-2`}>
                    {alert.message}
                  </p>
                  
                  {alert.actionable && (
                    <div className="flex items-center space-x-2">
                      <button className={`text-xs px-3 py-1 rounded ${
                        theme === 'zk' ? 'bg-zk-coral text-zk-eggshell hover:bg-zk-coral/90' : 'bg-blue-600 text-white hover:bg-blue-700'
                      } transition-colors`}>
                        Take Action
                      </button>
                      <span className={`text-xs ${currentTheme.textSecondary}`}>
                        Action required
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {activeAlerts.length === 0 && (
          <div className={`text-center ${currentTheme.textSecondary} py-12`}>
            <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No active alerts</p>
            <p className="text-sm">Your finances are looking good!</p>
          </div>
        )}
      </div>

      {/* Alert Settings */}
      <div className={`${currentTheme.cardBg} rounded-lg p-4 mt-6 border ${currentTheme.border}`}>
        <h3 className={`text-lg font-semibold ${currentTheme.text} mb-3`}>Alert Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className={currentTheme.textSecondary}>Budget overruns</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className={currentTheme.textSecondary}>Bill due dates</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className={currentTheme.textSecondary}>Goal milestones</span>
            </label>
          </div>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className={currentTheme.textSecondary}>Investment changes</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className={currentTheme.textSecondary}>Debt warnings</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className={currentTheme.textSecondary}>Income notifications</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialAlerts;