import { useEffect } from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { DataProvider } from '@/contexts/DataContext';
import { ToastProvider } from '@/contexts/ToastContext';
import { LandingPage } from '@/pages/LandingPage';
import { AuthPage } from '@/pages/AuthPage';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { DashboardHome } from '@/pages/dashboard/DashboardHome';
import { EHRRecordsPage } from '@/pages/dashboard/EHRRecordsPage';
import { HealthTrackerPage } from '@/pages/dashboard/HealthTrackerPage';
import { AIInsightsPage } from '@/pages/dashboard/AIInsightsPage';
import { RiskAlertsPage } from '@/pages/dashboard/RiskAlertsPage';
import { AppointmentsPage } from '@/pages/dashboard/AppointmentsPage';
import { HealthChatbotPage } from '@/pages/dashboard/HealthChatbotPage';
import { ProfilePage } from '@/pages/dashboard/ProfilePage';
import { SettingsPage } from '@/pages/dashboard/SettingsPage';

type Page = 'landing' | 'login' | 'signup' | 'dashboard' | 'profile' | 'ehr' | 'tracker' | 'ai-insights' | 'risk-alerts' | 'appointments' | 'chatbot' | 'settings';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [page, setPage] = useState<Page>('landing');

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [page]);

  const navigate = (p: string) => {
    // Guard dashboard pages
    const dashboardPages = ['dashboard', 'profile', 'ehr', 'tracker', 'ai-insights', 'risk-alerts', 'appointments', 'chatbot', 'settings'];
    if (dashboardPages.includes(p) && !isAuthenticated) {
      setPage('login');
      return;
    }
    setPage(p as Page);
  };

  // Landing page
  if (page === 'landing') {
    return <LandingPage onNavigate={navigate} />;
  }

  // Auth pages
  if (page === 'login' || page === 'signup') {
    if (isAuthenticated) {
      return (
        <DataProvider>
          <DashboardLayout activePage="dashboard" onNavigate={navigate}>
            <DashboardHome onNavigate={navigate} />
          </DashboardLayout>
        </DataProvider>
      );
    }
    return <AuthPage mode={page} onNavigate={navigate} />;
  }

  // Dashboard pages
  if (isAuthenticated) {
    return (
      <DataProvider>
        <DashboardLayout activePage={page} onNavigate={navigate}>
          {page === 'dashboard' && <DashboardHome onNavigate={navigate} />}
          {page === 'profile' && <ProfilePage />}
          {page === 'ehr' && <EHRRecordsPage />}
          {page === 'tracker' && <HealthTrackerPage />}
          {page === 'ai-insights' && <AIInsightsPage />}
          {page === 'risk-alerts' && <RiskAlertsPage />}
          {page === 'appointments' && <AppointmentsPage />}
          {page === 'chatbot' && <HealthChatbotPage />}
          {page === 'settings' && <SettingsPage />}
        </DashboardLayout>
      </DataProvider>
    );
  }

  // Default: redirect to landing
  return <LandingPage onNavigate={navigate} />;
}

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ToastProvider>
  );
}

import { useState } from 'react';

export default App;
