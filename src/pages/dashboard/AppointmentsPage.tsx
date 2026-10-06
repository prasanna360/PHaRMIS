import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/contexts/ToastContext';
import { Calendar, Plus, Clock, X, CheckCircle2, XCircle, CalendarClock, Stethoscope } from 'lucide-react';
import type { Appointment } from '@/types';

export function AppointmentsPage() {
  const { appointments, addAppointment, cancelAppointment } = useData();
  const { showToast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [tab, setTab] = useState<'upcoming' | 'previous'>('upcoming');

  const [form, setForm] = useState({
    date: '',
    time: '',
    provider: '',
    purpose: '',
  });

  const upcoming = appointments.filter((a) => a.status === 'Upcoming').sort((a, b) => a.date.localeCompare(b.date));
  const previous = appointments.filter((a) => a.status !== 'Upcoming').sort((a, b) => b.date.localeCompare(a.date));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.date || !form.time || !form.provider.trim()) {
      showToast('Please fill in date, time, and provider', 'error');
      return;
    }
    const apt: Appointment = {
      id: crypto.randomUUID(),
      date: form.date,
      time: form.time,
      provider: form.provider,
      purpose: form.purpose || 'General consultation',
      status: 'Upcoming',
    };
    addAppointment(apt);
    showToast('Appointment scheduled successfully', 'success');
    setShowForm(false);
    setForm({ date: '', time: '', provider: '', purpose: '' });
  };

  const statusStyle: Record<string, { bg: string; text: string; icon: React.ComponentType<{ className?: string }> }> = {
    Upcoming: { bg: 'bg-blue-50', text: 'text-blue-600', icon: CalendarClock },
    Completed: { bg: 'bg-emerald-50', text: 'text-emerald-600', icon: CheckCircle2 },
    Cancelled: { bg: 'bg-rose-50', text: 'text-rose-600', icon: XCircle },
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 animate-fade-in">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-ink-800 sm:text-3xl">Appointments</h1>
          <p className="mt-1 text-sm text-ink-500">Schedule and track your healthcare appointments</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary">
          <Plus className="h-4 w-4" /> Schedule Appointment
        </button>
      </div>

      {/* Tabs */}
      <div className="inline-flex rounded-xl border border-ink-200 bg-white p-1 animate-fade-in animate-delay-100">
        {([
          { key: 'upcoming', label: `Upcoming (${upcoming.length})` },
          { key: 'previous', label: `Previous (${previous.length})` },
        ] as const).map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${tab === t.key ? 'bg-rose-500 text-white shadow-soft' : 'text-ink-500 hover:text-ink-700'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Appointment list */}
      <div className="space-y-3">
        {tab === 'upcoming' && upcoming.length === 0 && (
          <div className="card-base py-12 text-center">
            <Calendar className="mx-auto h-10 w-10 text-ink-300" />
            <p className="mt-3 text-sm text-ink-400">No upcoming appointments</p>
            <button onClick={() => setShowForm(true)} className="mt-3 btn-secondary text-xs">Schedule One Now</button>
          </div>
        )}
        {tab === 'previous' && previous.length === 0 && (
          <div className="card-base py-12 text-center">
            <Clock className="mx-auto h-10 w-10 text-ink-300" />
            <p className="mt-3 text-sm text-ink-400">No previous appointments</p>
          </div>
        )}
        {(tab === 'upcoming' ? upcoming : previous).map((apt, i) => {
          const sc = statusStyle[apt.status];
          return (
            <div key={apt.id} className="card-base p-5 animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  {/* Date block */}
                  <div className="flex h-14 w-14 flex-shrink-0 flex-col items-center justify-center rounded-2xl bg-gradient-rose">
                    <span className="text-xs font-medium text-rose-400">{new Date(apt.date).toLocaleDateString('en', { month: 'short' })}</span>
                    <span className="text-xl font-bold text-ink-800">{new Date(apt.date).getDate()}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-ink-800">{apt.purpose}</p>
                      <span className={`inline-flex items-center gap-1 rounded-lg px-2 py-0.5 text-xs font-semibold ${sc.bg} ${sc.text}`}>
                        <sc.icon className="h-3 w-3" /> {apt.status}
                      </span>
                    </div>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-500">
                      <Stethoscope className="h-3.5 w-3.5" /> {apt.provider}
                    </p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-xs text-ink-400">
                      <Clock className="h-3.5 w-3.5" /> {apt.time} · {new Date(apt.date).toLocaleDateString('en', { weekday: 'long', year: 'numeric' })}
                    </p>
                  </div>
                </div>
                {apt.status === 'Upcoming' && (
                  <button
                    onClick={() => { cancelAppointment(apt.id); showToast('Appointment cancelled', 'info'); }}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-ink-200 px-3 py-2 text-xs font-medium text-ink-500 transition-all hover:border-rose-200 hover:text-rose-500"
                  >
                    <X className="h-3.5 w-3.5" /> Cancel
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink-800/30 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-card-lg animate-fade-in-scale">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-ink-800">Schedule Appointment</h3>
              <button onClick={() => setShowForm(false)} className="rounded-lg p-1.5 text-ink-400 hover:bg-ink-50">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink-700">Date</label>
                  <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink-700">Time</label>
                  <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="input-field" />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-700">Healthcare Provider</label>
                <input value={form.provider} onChange={(e) => setForm({ ...form, provider: e.target.value })} className="input-field" placeholder="e.g., Dr. Meera Nair — General Physician" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-700">Purpose</label>
                <input value={form.purpose} onChange={(e) => setForm({ ...form, purpose: e.target.value })} className="input-field" placeholder="e.g., Routine checkup" />
              </div>
              <button type="submit" className="btn-primary w-full">
                <Calendar className="h-4 w-4" /> Schedule Appointment
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
