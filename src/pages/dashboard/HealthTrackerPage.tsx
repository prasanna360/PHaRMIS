import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/contexts/ToastContext';
import { LineChart, BarChart, DonutChart } from '@/components/charts/Charts';
import { moodColors } from '@/data/demoData';
import { Activity, Plus, Calendar, TrendingUp, Footprints, HeartPulse, Moon, Droplets, Scale, X } from 'lucide-react';
import type { DailyHealthEntry } from '@/types';

export function HealthTrackerPage() {
  const { dailyEntries, addDailyEntry } = useData();
  const { showToast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [view, setView] = useState<'history' | 'charts'>('history');

  const today = new Date().toISOString().split('T')[0];
  const [form, setForm] = useState({
    date: today,
    mood: 'Good' as DailyHealthEntry['mood'],
    symptoms: '',
    weight: '',
    bpSys: '',
    bpDia: '',
    heartRate: '',
    sleepHours: '',
    waterIntake: '',
    physicalActivity: '',
    steps: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.weight || !form.heartRate) {
      showToast('Please enter at least weight and heart rate', 'error');
      return;
    }
    const entry: DailyHealthEntry = {
      id: crypto.randomUUID(),
      date: form.date,
      mood: form.mood,
      symptoms: form.symptoms.split(',').map((s) => s.trim()).filter(Boolean),
      weight: parseFloat(form.weight) || 0,
      bloodPressureSystolic: parseInt(form.bpSys) || 120,
      bloodPressureDiastolic: parseInt(form.bpDia) || 80,
      heartRate: parseInt(form.heartRate) || 72,
      sleepHours: parseFloat(form.sleepHours) || 0,
      waterIntake: parseFloat(form.waterIntake) || 0,
      physicalActivity: form.physicalActivity || 'None',
      steps: parseInt(form.steps) || 0,
      notes: form.notes,
    };
    addDailyEntry(entry);
    showToast('Health entry saved successfully', 'success');
    setShowForm(false);
    setForm({ date: today, mood: 'Good', symptoms: '', weight: '', bpSys: '', bpDia: '', heartRate: '', sleepHours: '', waterIntake: '', physicalActivity: '', steps: '', notes: '' });
  };

  const recent7 = dailyEntries.slice(-7).reverse();
  const chartData = dailyEntries.slice(-7);

  const moodData = chartData.map((e) => ({ label: new Date(e.date).toLocaleDateString('en', { weekday: 'short' }), value: e.weight }));
  const heartData = chartData.map((e) => ({ label: new Date(e.date).toLocaleDateString('en', { weekday: 'short' }), value: e.heartRate }));
  const bpData = chartData.map((e) => ({ label: new Date(e.date).toLocaleDateString('en', { weekday: 'short' }), value: e.bloodPressureSystolic }));
  const stepsData = chartData.map((e) => ({ label: new Date(e.date).toLocaleDateString('en', { weekday: 'short' }), value: e.steps }));

  const moodCounts: Record<string, number> = {};
  dailyEntries.slice(-14).forEach((e) => { moodCounts[e.mood] = (moodCounts[e.mood] || 0) + 1; });
  const donutData = Object.entries(moodCounts).map(([label, value]) => ({ label, value, color: moodColors[label] || '#A8B0C2' }));

  const moodOptions: DailyHealthEntry['mood'][] = ['Happy', 'Good', 'Neutral', 'Stressed', 'Sad'];
  const moodEmojis: Record<string, string> = { Happy: '😄', Good: '🙂', Neutral: '😐', Stressed: '😣', Sad: '😔' };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 animate-fade-in">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-ink-800 sm:text-3xl">Daily Health Tracker</h1>
          <p className="mt-1 text-sm text-ink-500">Record and monitor your daily health information</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary">
          <Plus className="h-4 w-4" /> Add Today's Entry
        </button>
      </div>

      {/* Toggle */}
      <div className="inline-flex rounded-xl border border-ink-200 bg-white p-1">
        {(['history', 'charts'] as const).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${view === v ? 'bg-rose-500 text-white shadow-soft' : 'text-ink-500 hover:text-ink-700'}`}
          >
            {v === 'history' ? 'Entry History' : 'Charts & Trends'}
          </button>
        ))}
      </div>

      {view === 'history' ? (
        <div className="space-y-3">
          {recent7.length === 0 ? (
            <div className="card-base py-12 text-center">
              <Activity className="mx-auto h-10 w-10 text-ink-300" />
              <p className="mt-3 text-sm text-ink-400">No health entries yet</p>
              <button onClick={() => setShowForm(true)} className="mt-3 btn-secondary text-xs">Add Your First Entry</button>
            </div>
          ) : (
            recent7.map((entry, i) => (
              <div key={entry.id} className="card-base p-5 animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand-soft">
                      <span className="text-2xl">{moodEmojis[entry.mood]}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-ink-800">{new Date(entry.date).toLocaleDateString('en', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
                      <p className="text-xs text-ink-400">Mood: {entry.mood}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 rounded-lg bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-600">
                      <HeartPulse className="h-3 w-3" /> {entry.heartRate} bpm
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-lg bg-lavender-50 px-2.5 py-1 text-xs font-medium text-lavender-600">
                      <Scale className="h-3 w-3" /> {entry.weight} kg
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600">
                      {entry.bloodPressureSystolic}/{entry.bloodPressureDiastolic}
                    </span>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6">
                  {[
                    { icon: Moon, label: 'Sleep', value: `${entry.sleepHours}h` },
                    { icon: Droplets, label: 'Water', value: `${entry.waterIntake}L` },
                    { icon: Footprints, label: 'Steps', value: entry.steps.toLocaleString() },
                    { icon: Activity, label: 'Activity', value: entry.physicalActivity === 'None' ? 'Rest day' : entry.physicalActivity },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl bg-ink-50 p-2.5">
                      <div className="flex items-center gap-1.5 text-ink-400">
                        <s.icon className="h-3.5 w-3.5" />
                        <span className="text-xs">{s.label}</span>
                      </div>
                      <p className="mt-0.5 text-sm font-semibold text-ink-700 truncate">{s.value}</p>
                    </div>
                  ))}
                </div>
                {entry.symptoms.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {entry.symptoms.map((s) => (
                      <span key={s} className="rounded-lg bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-600">{s}</span>
                    ))}
                  </div>
                )}
                {entry.notes && <p className="mt-3 text-sm text-ink-500 italic">"{entry.notes}"</p>}
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="card-base p-5 animate-fade-in">
              <h3 className="font-display text-base font-bold text-ink-800">Weight Trend (7 days)</h3>
              <p className="text-xs text-ink-400">Weight in kilograms</p>
              <div className="mt-4"><LineChart data={moodData} color="#F43F6E" unit=" kg" height={220} /></div>
            </div>
            <div className="card-base p-5 animate-fade-in animate-delay-100">
              <h3 className="font-display text-base font-bold text-ink-800">Heart Rate Trend</h3>
              <p className="text-xs text-ink-400">Resting heart rate in bpm</p>
              <div className="mt-4"><LineChart data={heartData} color="#9B6FFF" unit=" bpm" height={220} /></div>
            </div>
            <div className="card-base p-5 animate-fade-in animate-delay-200">
              <h3 className="font-display text-base font-bold text-ink-800">Blood Pressure (Systolic)</h3>
              <p className="text-xs text-ink-400">Systolic mmHg</p>
              <div className="mt-4"><LineChart data={bpData} color="#3B82F6" height={220} /></div>
            </div>
            <div className="card-base p-5 animate-fade-in animate-delay-300">
              <h3 className="font-display text-base font-bold text-ink-800">Daily Steps</h3>
              <p className="text-xs text-ink-400">Steps per day</p>
              <div className="mt-4"><BarChart data={stepsData} color="#10B981" height={220} /></div>
            </div>
          </div>
          <div className="card-base p-5 animate-fade-in animate-delay-400">
            <h3 className="font-display text-base font-bold text-ink-800">Mood Distribution (Last 14 days)</h3>
            <p className="text-xs text-ink-400">Your mood patterns over time</p>
            <div className="mt-6 flex justify-center">
              <DonutChart data={donutData} size={200} centerLabel="entries" centerValue={String(dailyEntries.slice(-14).length)} />
            </div>
          </div>
        </div>
      )}

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink-800/30 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative w-full max-w-2xl rounded-3xl bg-white p-6 shadow-card-lg animate-fade-in-scale max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-bold text-ink-800">Add Daily Health Entry</h3>
                <p className="text-xs text-ink-400">Record today's health information</p>
              </div>
              <button onClick={() => setShowForm(false)} className="rounded-lg p-1.5 text-ink-400 hover:bg-ink-50">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink-700">Date</label>
                  <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink-700">Mood</label>
                  <div className="flex gap-1.5">
                    {moodOptions.map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setForm({ ...form, mood: m })}
                        className={`flex-1 rounded-xl border px-2 py-2 text-center text-xl transition-all ${form.mood === m ? 'border-rose-400 bg-rose-50 scale-105' : 'border-ink-200 hover:border-ink-300'}`}
                        title={m}
                      >
                        {moodEmojis[m]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-700">Symptoms (comma-separated)</label>
                <input value={form.symptoms} onChange={(e) => setForm({ ...form, symptoms: e.target.value })} className="input-field" placeholder="e.g., Headache, Fatigue" />
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink-700">Weight (kg)</label>
                  <input type="number" step="0.1" value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} className="input-field" placeholder="58.0" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink-700">BP (Systolic)</label>
                  <input type="number" value={form.bpSys} onChange={(e) => setForm({ ...form, bpSys: e.target.value })} className="input-field" placeholder="120" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink-700">BP (Diastolic)</label>
                  <input type="number" value={form.bpDia} onChange={(e) => setForm({ ...form, bpDia: e.target.value })} className="input-field" placeholder="80" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink-700">Heart Rate (bpm)</label>
                  <input type="number" value={form.heartRate} onChange={(e) => setForm({ ...form, heartRate: e.target.value })} className="input-field" placeholder="72" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink-700">Sleep (hrs)</label>
                  <input type="number" step="0.5" value={form.sleepHours} onChange={(e) => setForm({ ...form, sleepHours: e.target.value })} className="input-field" placeholder="7.5" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink-700">Water (L)</label>
                  <input type="number" step="0.1" value={form.waterIntake} onChange={(e) => setForm({ ...form, waterIntake: e.target.value })} className="input-field" placeholder="2.5" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink-700">Steps</label>
                  <input type="number" value={form.steps} onChange={(e) => setForm({ ...form, steps: e.target.value })} className="input-field" placeholder="8000" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink-700">Physical Activity</label>
                  <input value={form.physicalActivity} onChange={(e) => setForm({ ...form, physicalActivity: e.target.value })} className="input-field" placeholder="Walking 30min" />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-700">Notes</label>
                <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="input-field min-h-[70px] resize-none" placeholder="How did you feel today?" />
              </div>

              <button type="submit" className="btn-primary w-full">
                <TrendingUp className="h-4 w-4" /> Save Entry
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
