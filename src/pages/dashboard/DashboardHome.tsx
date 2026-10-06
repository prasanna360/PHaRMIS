import { useState, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { LineChart, RadialProgress } from '@/components/charts/Charts';
import {
  HeartPulse, Activity, FileText, ShieldAlert, Moon,
  Droplets, Footprints, Scale, Smile, TrendingUp,
  Sparkles, ArrowRight, CheckCircle2, AlertTriangle,
} from 'lucide-react';
import { moodColors, severityColors } from '@/data/demoData';

interface DashboardHomeProps {
  onNavigate: (page: string) => void;
}

export function DashboardHome({ onNavigate }: DashboardHomeProps) {
  const { user } = useAuth();
  const { dailyEntries, medicalHistory, medications, allergies, riskAlerts, aiInsights } = useData();
  const [chartMetric, setChartMetric] = useState<'weight' | 'heartRate' | 'bloodPressure' | 'mood'>('weight');

  const today = dailyEntries[dailyEntries.length - 1] || dailyEntries[0];
  const recent7 = dailyEntries.slice(-7);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  const chartData = useMemo(() => {
    return recent7.map((e) => {
      const d = new Date(e.date);
      const label = d.toLocaleDateString('en', { weekday: 'short' });
      let value = 0;
      if (chartMetric === 'weight') value = e.weight;
      else if (chartMetric === 'heartRate') value = e.heartRate;
      else if (chartMetric === 'bloodPressure') value = e.bloodPressureSystolic;
      else if (chartMetric === 'mood') {
        const moodMap: Record<string, number> = { Happy: 5, Good: 4, Neutral: 3, Stressed: 2, Sad: 1 };
        value = moodMap[e.mood] || 3;
      }
      return { label, value };
    });
  }, [recent7, chartMetric]);

  const chartConfig = {
    weight: { color: '#F43F6E', unit: 'kg', label: 'Weight (kg)' },
    heartRate: { color: '#9B6FFF', unit: ' bpm', label: 'Heart Rate (bpm)' },
    bloodPressure: { color: '#3B82F6', unit: '', label: 'Blood Pressure (Systolic)' },
    mood: { color: '#10B981', unit: '', label: 'Mood Score (1-5)' },
  };

  const activeAlerts = riskAlerts.filter((a) => a.status === 'Active');
  const topAlert = activeAlerts[0] || riskAlerts[0];
  const latestInsight = aiInsights[0];

  const snapshotCards = [
    { icon: Footprints, label: 'Steps', value: today?.steps.toLocaleString() || '—', unit: 'steps', color: 'rose', target: 10000 },
    { icon: HeartPulse, label: 'Blood Pressure', value: today ? `${today.bloodPressureSystolic}/${today.bloodPressureDiastolic}` : '—', unit: 'mmHg', color: 'lavender' },
    { icon: Activity, label: 'Heart Rate', value: today?.heartRate || '—', unit: 'bpm', color: 'rose' },
    { icon: Scale, label: 'Weight', value: today?.weight || '—', unit: 'kg', color: 'lavender' },
    { icon: Moon, label: 'Sleep', value: today?.sleepHours || '—', unit: 'hrs', color: 'rose' },
    { icon: Droplets, label: 'Water Intake', value: today?.waterIntake || '—', unit: 'L', color: 'lavender' },
  ];

  const summaryCards = [
    { icon: HeartPulse, label: 'Health Status', value: 'Stable', sub: 'All vitals normal', color: 'emerald' },
    { icon: Smile, label: "Today's Mood", value: today?.mood || '—', sub: 'Feeling good', color: 'rose', moodColor: today ? moodColors[today.mood] : '#A8B0C2' },
    { icon: FileText, label: 'Active Health Records', value: String(medicalHistory.length + medications.length + allergies.length), sub: `${medicalHistory.length} conditions, ${medications.length} meds`, color: 'lavender' },
    { icon: ShieldAlert, label: 'Risk Level', value: topAlert?.severity || 'Low', sub: topAlert?.status || 'No active alerts', color: 'amber' },
  ];

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div className="animate-fade-in">
        <h1 className="font-display text-2xl font-extrabold text-ink-800 sm:text-3xl">
          {greeting}, {user?.fullName?.split(' ')[0] || 'User'}!
        </h1>
        <p className="mt-1 text-sm text-ink-500">Here's your health overview for today.</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card, i) => (
          <div
            key={card.label}
            className="card-base card-hover p-5 animate-fade-in"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div className="flex items-center justify-between">
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                card.color === 'emerald' ? 'bg-emerald-50 text-emerald-500' :
                card.color === 'rose' ? 'bg-rose-50 text-rose-500' :
                card.color === 'lavender' ? 'bg-lavender-50 text-lavender-500' :
                'bg-amber-50 text-amber-500'
              }`}>
                <card.icon className="h-5 w-5" />
              </div>
              {card.label === "Today's Mood" && card.moodColor && (
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: card.moodColor }} />
              )}
            </div>
            <p className="mt-3 text-xs font-medium text-ink-400">{card.label}</p>
            <p className="mt-0.5 text-xl font-bold text-ink-800">{card.value}</p>
            <p className="mt-0.5 text-xs text-ink-400">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Today's Health Snapshot */}
      <div className="card-base p-5 animate-fade-in animate-delay-200">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-ink-800">Today's Health Snapshot</h2>
          <button onClick={() => onNavigate('tracker')} className="text-sm font-medium text-rose-500 hover:text-rose-600">
            View Tracker →
          </button>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {snapshotCards.map((s, i) => (
            <div
              key={s.label}
              className="rounded-2xl border border-ink-100 p-4 text-center transition-all hover:shadow-soft animate-fade-in"
              style={{ animationDelay: `${0.3 + i * 0.06}s` }}
            >
              <div className={`mx-auto flex h-10 w-10 items-center justify-center rounded-xl ${
                s.color === 'rose' ? 'bg-rose-50 text-rose-500' : 'bg-lavender-50 text-lavender-500'
              }`}>
                <s.icon className="h-5 w-5" />
              </div>
              <p className="mt-2.5 text-xs text-ink-400">{s.label}</p>
              <p className="mt-0.5 text-lg font-bold text-ink-800">{s.value}</p>
              <p className="text-xs text-ink-400">{s.unit}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Health overview chart */}
        <div className="card-base p-5 lg:col-span-2 animate-fade-in animate-delay-300">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-lg font-bold text-ink-800">Health Overview</h2>
            <div className="flex flex-wrap gap-1.5">
              {([
                { key: 'weight', label: 'Weight' },
                { key: 'heartRate', label: 'Heart Rate' },
                { key: 'bloodPressure', label: 'Blood Pressure' },
                { key: 'mood', label: 'Mood' },
              ] as const).map((m) => (
                <button
                  key={m.key}
                  onClick={() => setChartMetric(m.key)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                    chartMetric === m.key
                      ? 'bg-rose-500 text-white shadow-soft'
                      : 'bg-ink-50 text-ink-500 hover:bg-ink-100'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
          <p className="mt-1 text-xs text-ink-400">Last 7 days · {chartConfig[chartMetric].label}</p>
          <div className="mt-4">
            <LineChart
              data={chartData}
              color={chartConfig[chartMetric].color}
              unit={chartConfig[chartMetric].unit}
              height={240}
            />
          </div>
        </div>

        {/* Daily goal progress */}
        <div className="card-base p-5 animate-fade-in animate-delay-400">
          <h2 className="font-display text-lg font-bold text-ink-800">Daily Goals</h2>
          <p className="text-xs text-ink-400">Today's progress</p>
          <div className="mt-5 flex flex-col items-center gap-4">
            <RadialProgress
              value={today?.steps || 0}
              max={10000}
              size={140}
              color="#F43F6E"
              label="of 10K steps"
            />
            <div className="grid w-full grid-cols-2 gap-3">
              <div className="rounded-xl bg-gradient-rose p-3 text-center">
                <Droplets className="mx-auto h-5 w-5 text-rose-400" />
                <p className="mt-1.5 text-sm font-bold text-ink-800">{today?.waterIntake || 0}L</p>
                <p className="text-xs text-ink-400">of 2.5L</p>
              </div>
              <div className="rounded-xl bg-gradient-lavender p-3 text-center">
                <Moon className="mx-auto h-5 w-5 text-lavender-400" />
                <p className="mt-1.5 text-sm font-bold text-ink-800">{today?.sleepHours || 0}h</p>
                <p className="text-xs text-ink-400">of 8h</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insight + Risk Alert */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* AI Insight */}
        <div className="card-base overflow-hidden animate-fade-in animate-delay-500">
          <div className="flex items-center gap-3 border-b border-ink-100 bg-gradient-lavender px-5 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lavender-100">
              <Sparkles className="h-5 w-5 text-lavender-600" />
            </div>
            <div>
              <h2 className="font-display text-base font-bold text-ink-800">Today's AI Insight</h2>
              <p className="text-xs text-ink-400">Demo insight · Not medical advice</p>
            </div>
          </div>
          <div className="p-5">
            <h3 className="text-sm font-bold text-ink-800">{latestInsight?.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">{latestInsight?.insight}</p>
            <div className="mt-4 rounded-xl bg-lavender-50 p-3.5">
              <p className="text-xs font-semibold text-lavender-700">Recommendation</p>
              <p className="mt-1 text-sm text-ink-600">{latestInsight?.recommendation}</p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">
                <CheckCircle2 className="h-3.5 w-3.5" /> {latestInsight?.confidence} Confidence
              </span>
              <button onClick={() => onNavigate('ai-insights')} className="text-sm font-medium text-lavender-600 hover:text-lavender-700">
                View All Insights <ArrowRight className="inline h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Risk Alert */}
        <div className="card-base overflow-hidden animate-fade-in animate-delay-500">
          <div className="flex items-center gap-3 border-b border-ink-100 bg-gradient-rose px-5 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100">
              <ShieldAlert className="h-5 w-5 text-rose-600" />
            </div>
            <div>
              <h2 className="font-display text-base font-bold text-ink-800">Risk Alert</h2>
              <p className="text-xs text-ink-400">{activeAlerts.length} active alert(s)</p>
            </div>
          </div>
          {topAlert && (
            <div className="p-5">
              <div className="flex items-start gap-3">
                <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${
                  severityColors[topAlert.severity].bg
                } ${severityColors[topAlert.severity].text}`}>
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`rounded-lg px-2 py-0.5 text-xs font-semibold ${severityColors[topAlert.severity].bg} ${severityColors[topAlert.severity].text}`}>
                      {topAlert.severity} Risk
                    </span>
                    <span className="text-xs text-ink-400">{topAlert.type}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{topAlert.reason}</p>
                  <div className="mt-3 rounded-xl bg-rose-50 p-3">
                    <p className="text-xs font-semibold text-rose-700">Recommendation</p>
                    <p className="mt-1 text-sm text-ink-600">{topAlert.recommendation}</p>
                  </div>
                </div>
              </div>
              <button onClick={() => onNavigate('risk-alerts')} className="mt-4 text-sm font-medium text-rose-500 hover:text-rose-600">
                View All Alerts <ArrowRight className="inline h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div className="card-base p-5 animate-fade-in animate-delay-600">
        <h2 className="font-display text-lg font-bold text-ink-800">Quick Actions</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Add Health Entry', icon: Activity, page: 'tracker' },
            { label: 'Upload Record', icon: FileText, page: 'ehr' },
            { label: 'Schedule Appointment', icon: HeartPulse, page: 'appointments' },
            { label: 'Ask Chatbot', icon: Sparkles, page: 'chatbot' },
          ].map((a) => (
            <button
              key={a.label}
              onClick={() => onNavigate(a.page)}
              className="flex flex-col items-center gap-2.5 rounded-2xl border border-ink-100 p-4 transition-all hover:border-rose-200 hover:shadow-soft hover:-translate-y-0.5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand-soft text-rose-500">
                <a.icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium text-ink-700">{a.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
