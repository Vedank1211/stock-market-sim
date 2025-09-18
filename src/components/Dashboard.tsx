import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import ExpenseTracker from './ExpenseTracker';
import BudgetManager from './BudgetManager';
import SavingsGoals from './SavingsGoals';
import DebtManager from './DebtManager';
import IncomeTracker from './IncomeTracker';
import FinancialHealthScore from './FinancialHealthScore';
import InvestmentOverview from './InvestmentOverview';
import FinancialInsights from './FinancialInsights';
import Portfolio from './Portfolio';
import FinancialAlerts from './FinancialAlerts';
import ReportSection from './ReportSection';
import MobileNavigation from './MobileNavigation';
import NotificationPanel from './NotificationPanel';
import UserProfile from './UserProfile';
import { useTheme } from '../contexts/ThemeContext';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const { theme } = useTheme();

  const themeClasses = {
    light: {
      bg: 'bg-gray-50',
      text: 'text-gray-900'
    },
    zk: {
      bg: 'bg-zk-navy',
      text: 'text-zk-eggshell'
    }
  };

  const currentTheme = themeClasses[theme];

  return (
    <div className={`min-h-screen ${currentTheme.bg} flex font-space`}>
      {/* Sidebar - Hidden on mobile */}
      <div className="hidden lg:block">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <TopNavbar 
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
          showUserProfile={showUserProfile}
          setShowUserProfile={setShowUserProfile}
        />
        
        {/* Notification Panel */}
        {showNotifications && (
          <NotificationPanel onClose={() => setShowNotifications(false)} />
        )}

        {/* User Profile Panel */}
        {showUserProfile && (
          <UserProfile onClose={() => setShowUserProfile(false)} />
        )}
        
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <FinancialHealthScore />
                <ExpenseTracker />
              </div>
              <div className="space-y-6">
                <BudgetManager />
                <FinancialAlerts />
              </div>
            </div>
          )}
          
          {activeTab === 'expenses' && (
            <div className="max-w-6xl mx-auto">
              <ExpenseTracker />
            </div>
          )}

          {activeTab === 'budget' && (
            <div className="max-w-6xl mx-auto">
              <BudgetManager />
            </div>
          )}

          {activeTab === 'savings' && (
            <div className="max-w-6xl mx-auto">
              <SavingsGoals />
            </div>
          )}

          {activeTab === 'debt' && (
            <div className="max-w-6xl mx-auto">
              <DebtManager />
            </div>
          )}

          {activeTab === 'income' && (
            <div className="max-w-6xl mx-auto">
              <IncomeTracker />
            </div>
          )}

          {activeTab === 'investments' && (
            <div className="max-w-6xl mx-auto">
              <InvestmentOverview />
            </div>
          )}

          {activeTab === 'insights' && (
            <div className="max-w-6xl mx-auto">
              <FinancialInsights />
            </div>
          )}
          
          {activeTab === 'portfolio' && (
            <div className="max-w-6xl mx-auto">
              <Portfolio />
            </div>
          )}
          
          {activeTab === 'reports' && (
            <div className="max-w-4xl mx-auto">
              <ReportSection />
            </div>
          )}
        </main>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <MobileNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};

export default Dashboard;