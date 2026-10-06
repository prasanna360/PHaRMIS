import { useState } from 'react';
import { Logo } from '@/components/common/Logo';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard, User, FileText, Activity, Brain,
  ShieldAlert, Calendar, MessageCircle, Settings, LogOut,
  Menu, X, Bell,
} from 'lucide-react';

interface DashboardLayoutProps {
  activePage: string;
  onNavigate: (page: string) => void;
  children: React.ReactNode;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'profile', label: 'My Profile', icon: User },
  { id: 'ehr', label: 'EHR Records', icon: FileText },
  { id: 'tracker', label: 'Health Tracker', icon: Activity },
  { id: 'ai-insights', label: 'AI Insights', icon: Brain },
  { id: 'risk-alerts', label: 'Risk Alerts', icon: ShieldAlert },
  { id: 'appointments', label: 'Appointments', icon: Calendar },
  { id: 'chatbot', label: 'Health Chatbot', icon: MessageCircle },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function DashboardLayout({ activePage, onNavigate, children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (page: string) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  const handleLogout = () => {
    logout();
    onNavigate('landing');
  };

  return (
    <div className="min-h-screen bg-ink-50">
      {/* Sidebar (desktop) */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-ink-100 bg-white lg:flex">
        <div className="flex h-16 items-center border-b border-ink-100 px-5">
          <button onClick={() => handleNav('landing')}>
            <Logo size="sm" />
          </button>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                activePage === item.id
                  ? 'bg-gradient-rose text-rose-600 shadow-soft'
                  : 'text-ink-600 hover:bg-ink-50'
              }`}
            >
              <item.icon className={`h-4.5 w-4.5 ${activePage === item.id ? 'text-rose-500' : 'text-ink-400'}`} style={{ width: '1.125rem', height: '1.125rem' }} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="border-t border-ink-100 p-3">
          <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-rose-500 transition-all hover:bg-rose-50">
            <LogOut className="h-4.5 w-4.5" style={{ width: '1.125rem', height: '1.125rem' }} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink-800/30 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 bg-white shadow-card-lg animate-slide-in-left">
            <div className="flex h-16 items-center justify-between border-b border-ink-100 px-5">
              <Logo size="sm" />
              <button onClick={() => setMobileOpen(false)} className="rounded-lg p-2 text-ink-400 hover:bg-ink-50">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="space-y-1 overflow-y-auto p-3" style={{ maxHeight: 'calc(100vh - 8rem)' }}>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-all ${
                    activePage === item.id ? 'bg-gradient-rose text-rose-600' : 'text-ink-600 hover:bg-ink-50'
                  }`}
                >
                  <item.icon className="h-5 w-5" style={{ width: '1.125rem', height: '1.125rem' }} />
                  {item.label}
                </button>
              ))}
              <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium text-rose-500 hover:bg-rose-50">
                <LogOut className="h-5 w-5" style={{ width: '1.125rem', height: '1.125rem' }} />
                Logout
              </button>
            </nav>
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-ink-100 bg-white/80 px-4 backdrop-blur-lg sm:px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="rounded-xl p-2 text-ink-600 hover:bg-ink-50 lg:hidden">
              <Menu className="h-5 w-5" />
            </button>
            <div className="lg:hidden">
              <Logo size="sm" showFull={false} />
            </div>
            <span className="hidden text-sm font-medium text-ink-400 sm:block">
              {navItems.find((n) => n.id === activePage)?.label}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative rounded-xl p-2 text-ink-500 hover:bg-ink-50">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500" />
            </button>
            <button onClick={() => handleNav('profile')} className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-rose-600 text-sm font-bold text-white">
                {user?.fullName?.charAt(0) || 'U'}
              </div>
              <div className="hidden text-left sm:block">
                <p className="text-sm font-semibold text-ink-800 leading-tight">{user?.fullName || 'User'}</p>
                <p className="text-xs text-ink-400">{user?.email}</p>
              </div>
            </button>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
