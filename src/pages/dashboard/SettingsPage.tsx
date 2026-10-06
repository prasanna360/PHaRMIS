import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { useData } from '@/contexts/DataContext';
import {
  Settings as SettingsIcon, Bell, Shield, Moon, Globe,
  Trash2, LogOut, Info, Download,
} from 'lucide-react';

export function SettingsPage() {
  const { logout } = useAuth();
  const { showToast } = useToast();
  const { dailyEntries, medicalHistory, medications, allergies, checkups, uploadedRecords, appointments } = useData();
  const [notifications, setNotifications] = useState({ alerts: true, insights: true, appointments: true, weekly: false });
  const [darkMode, setDarkMode] = useState(false);
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric');

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
    showToast(`${key} notifications ${!notifications[key] ? 'enabled' : 'disabled'}`, 'info');
  };

  const handleExport = () => {
    const data = { dailyEntries, medicalHistory, medications, allergies, checkups, uploadedRecords, appointments };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pharmis-data-export.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Data exported successfully', 'success');
  };

  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all your health data? This action cannot be undone.')) {
      localStorage.removeItem('pharmis_daily');
      localStorage.removeItem('pharmis_medical');
      localStorage.removeItem('pharmis_medications');
      localStorage.removeItem('pharmis_allergies');
      localStorage.removeItem('pharmis_checkups');
      localStorage.removeItem('pharmis_uploads');
      localStorage.removeItem('pharmis_appointments');
      localStorage.removeItem('pharmis_alerts');
      showToast('All health data cleared. Reload to see demo data.', 'info');
    }
  };

  const Toggle = ({ on, onClick }: { on: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`relative h-6 w-11 rounded-full transition-all ${on ? 'bg-rose-500' : 'bg-ink-200'}`}
    >
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all ${on ? 'left-[22px]' : 'left-0.5'}`} />
    </button>
  );

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="font-display text-2xl font-extrabold text-ink-800 sm:text-3xl">Settings</h1>
        <p className="mt-1 text-sm text-ink-500">Manage your account and application preferences</p>
      </div>

      {/* Notifications */}
      <div className="card-base p-5 animate-fade-in animate-delay-100">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-rose-500" />
          <h2 className="font-display text-lg font-bold text-ink-800">Notifications</h2>
        </div>
        <div className="mt-4 space-y-1">
          {[
            { key: 'alerts' as const, label: 'Risk Alerts', desc: 'Get notified about health risk alerts' },
            { key: 'insights' as const, label: 'AI Insights', desc: 'Receive daily AI-generated health insights' },
            { key: 'appointments' as const, label: 'Appointment Reminders', desc: 'Reminders for upcoming appointments' },
            { key: 'weekly' as const, label: 'Weekly Summary', desc: 'Weekly health summary report' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between rounded-xl px-3 py-3 transition-all hover:bg-ink-50">
              <div>
                <p className="text-sm font-medium text-ink-800">{item.label}</p>
                <p className="text-xs text-ink-400">{item.desc}</p>
              </div>
              <Toggle on={notifications[item.key]} onClick={() => handleToggle(item.key)} />
            </div>
          ))}
        </div>
      </div>

      {/* Preferences */}
      <div className="card-base p-5 animate-fade-in animate-delay-200">
        <div className="flex items-center gap-2">
          <SettingsIcon className="h-5 w-5 text-lavender-500" />
          <h2 className="font-display text-lg font-bold text-ink-800">Preferences</h2>
        </div>
        <div className="mt-4 space-y-1">
          <div className="flex items-center justify-between rounded-xl px-3 py-3 transition-all hover:bg-ink-50">
            <div className="flex items-center gap-3">
              <Moon className="h-4 w-4 text-ink-400" />
              <div>
                <p className="text-sm font-medium text-ink-800">Dark Mode</p>
                <p className="text-xs text-ink-400">Switch to dark theme</p>
              </div>
            </div>
            <Toggle on={darkMode} onClick={() => { setDarkMode(!darkMode); showToast('Dark mode is not available in this demo', 'info'); }} />
          </div>
          <div className="flex items-center justify-between rounded-xl px-3 py-3 transition-all hover:bg-ink-50">
            <div className="flex items-center gap-3">
              <Globe className="h-4 w-4 text-ink-400" />
              <div>
                <p className="text-sm font-medium text-ink-800">Measurement Units</p>
                <p className="text-xs text-ink-400">Choose metric or imperial</p>
              </div>
            </div>
            <div className="flex gap-1.5">
              {(['metric', 'imperial'] as const).map((u) => (
                <button key={u} onClick={() => { setUnits(u); showToast(`Units set to ${u}`, 'info'); }} className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${units === u ? 'bg-rose-500 text-white' : 'bg-ink-50 text-ink-500'}`}>
                  {u === 'metric' ? 'Metric' : 'Imperial'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Privacy & Data */}
      <div className="card-base p-5 animate-fade-in animate-delay-300">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-emerald-500" />
          <h2 className="font-display text-lg font-bold text-ink-800">Privacy & Data</h2>
        </div>
        <div className="mt-4 space-y-2">
          <button onClick={handleExport} className="flex w-full items-center justify-between rounded-xl border border-ink-100 p-3.5 transition-all hover:border-lavender-200 hover:shadow-soft">
            <div className="flex items-center gap-3">
              <Download className="h-4 w-4 text-lavender-500" />
              <div className="text-left">
                <p className="text-sm font-medium text-ink-800">Export My Data</p>
                <p className="text-xs text-ink-400">Download all your health data as JSON</p>
              </div>
            </div>
          </button>
          <button onClick={handleClearData} className="flex w-full items-center justify-between rounded-xl border border-ink-100 p-3.5 transition-all hover:border-rose-200 hover:shadow-soft">
            <div className="flex items-center gap-3">
              <Trash2 className="h-4 w-4 text-rose-500" />
              <div className="text-left">
                <p className="text-sm font-medium text-ink-800">Clear All Health Data</p>
                <p className="text-xs text-ink-400">Remove all stored health entries and records</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* About */}
      <div className="card-base p-5 animate-fade-in animate-delay-400">
        <div className="flex items-center gap-2">
          <Info className="h-5 w-5 text-blue-500" />
          <h2 className="font-display text-lg font-bold text-ink-800">About PHaRMiS</h2>
        </div>
        <div className="mt-4 space-y-2 text-sm text-ink-500">
          <p><strong className="text-ink-700">Full Name:</strong> Personal Health and Record Monitoring Intelligence System</p>
          <p><strong className="text-ink-700">Version:</strong> 1.0.0 (Academic Project)</p>
          <p><strong className="text-ink-700">Purpose:</strong> Personal health record management, daily monitoring, AI insights, and risk alerts.</p>
          <p className="mt-3 rounded-xl bg-amber-50 p-3 text-xs text-amber-700">
            PHaRMiS is an academic project. Insights and alerts are informational and not a substitute for professional medical advice.
          </p>
        </div>
      </div>

      {/* Logout */}
      <div className="card-base p-5 animate-fade-in animate-delay-500">
        <button onClick={() => { logout(); showToast('Logged out successfully', 'success'); }} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-rose-50 py-3.5 text-sm font-semibold text-rose-600 transition-all hover:bg-rose-100">
          <LogOut className="h-4 w-4" /> Logout from PHaRMiS
        </button>
      </div>
    </div>
  );
}
