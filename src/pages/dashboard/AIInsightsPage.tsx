import { useMemo } from 'react';
import { useData } from '@/contexts/DataContext';
import { LineChart, DonutChart, BarChart } from '@/components/charts/Charts';
import { moodColors, confidenceColors } from '@/data/demoData';
import {
  Brain, Sparkles, TrendingUp, TrendingDown, Minus,
  Heart, Activity, Moon, Droplets, CheckCircle2, Info,
} from 'lucide-react';

export function AIInsightsPage() {
  const { dailyEntries, aiInsights } = useData();

  const recent14 = dailyEntries.slice(-14);

  const trendAnalysis = useMemo(() => {
    if (recent14.length < 2) return null;
    const first = recent14[0];
    const last = recent14[recent14.length - 1];
    return {
      weight: { change: (last.weight - first.weight).toFixed(1), direction: last.weight > first.weight ? 'up' : 'down' as 'up' | 'down' | 'stable' },
      heartRate: { change: String(last.heartRate - first.heartRate), direction: last.heartRate > first.heartRate ? 'up' : 'down' as 'up' | 'down' | 'stable' },
      sleep: { change: (last.sleepHours - first.sleepHours).toFixed(1), direction: last.sleepHours > first.sleepHours ? 'up' : 'down' as 'up' | 'down' | 'stable' },
      steps: { change: (last.steps - first.steps).toLocaleString(), direction: last.steps > first.steps ? 'up' : 'down' as 'up' | 'down' | 'stable' },
    };
  }, [recent14]);

  const moodData = recent14.map((e) => ({ label: new Date(e.date).toLocaleDateString('en', { day: 'numeric' }), value: { Happy: 5, Good: 4, Neutral: 3, Stressed: 2, Sad: 1 }[e.mood] || 3 }));

  const moodCounts: Record<string, number> = {};
  recent14.forEach((e) => { moodCounts[e.mood] = (moodCounts[e.mood] || 0) + 1; });
  const donutData = Object.entries(moodCounts).map(([label, value]) => ({ label, value, color: moodColors[label] || '#A8B0C2' }));

  const symptomCounts: Record<string, number> = {};
  dailyEntries.forEach((e) => e.symptoms.forEach((s) => { symptomCounts[s] = (symptomCounts[s] || 0) + 1; }));
  const symptomData = Object.entries(symptomCounts).slice(0, 6).map(([label, value]) => ({ label, value }));

  const lifestyleData = recent14.map((e) => ({ label: new Date(e.date).toLocaleDateString('en', { day: 'numeric' }), value: e.waterIntake }));

  const TrendIcon = ({ direction }: { direction: 'up' | 'down' | 'stable' }) => {
    if (direction === 'up') return <TrendingUp className="h-4 w-4 text-rose-500" />;
    if (direction === 'down') return <TrendingDown className="h-4 w-4 text-lavender-500" />;
    return <Minus className="h-4 w-4 text-ink-400" />;
  };

  const categoryColors: Record<string, string> = {
    Trend: 'bg-blue-50 text-blue-600',
    Mood: 'bg-emerald-50 text-emerald-600',
    Lifestyle: 'bg-lavender-50 text-lavender-600',
    Risk: 'bg-amber-50 text-amber-600',
  };

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="font-display text-2xl font-extrabold text-ink-800 sm:text-3xl">AI Insights</h1>
        <p className="mt-1 text-sm text-ink-500">AI-driven analysis of your health patterns and trends</p>
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-3 rounded-2xl border border-lavender-200 bg-lavender-50 p-4 animate-fade-in animate-delay-100">
        <Info className="h-5 w-5 flex-shrink-0 text-lavender-600" />
        <p className="text-sm text-lavender-800">
          <strong>Disclaimer:</strong> PHaRMiS provides informational insights based on entered health data and is not a substitute for professional medical advice. Always consult a qualified healthcare professional for medical concerns.
        </p>
      </div>

      {/* Overall Health Trend */}
      {trendAnalysis && (
        <div className="card-base p-5 animate-fade-in animate-delay-200">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-rose-500" />
            <h2 className="font-display text-lg font-bold text-ink-800">Overall Health Trend</h2>
            <span className="rounded-lg bg-rose-50 px-2 py-0.5 text-xs font-medium text-rose-600">Last 14 days</span>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: 'Weight', ...trendAnalysis.weight, unit: 'kg', icon: Activity },
              { label: 'Heart Rate', ...trendAnalysis.heartRate, unit: 'bpm', icon: Heart },
              { label: 'Sleep', ...trendAnalysis.sleep, unit: 'hrs', icon: Moon },
              { label: 'Steps', ...trendAnalysis.steps, unit: '', icon: TrendingUp },
            ].map((t) => (
              <div key={t.label} className="rounded-2xl border border-ink-100 p-4">
                <div className="flex items-center justify-between">
                  <t.icon className="h-4 w-4 text-ink-400" />
                  <TrendIcon direction={t.direction} />
                </div>
                <p className="mt-2 text-xs text-ink-400">{t.label}</p>
                <p className="text-lg font-bold text-ink-800">{t.direction === 'up' ? '+' : ''}{t.change}{t.unit}</p>
                <p className="text-xs text-ink-400">{t.direction === 'up' ? 'increased' : t.direction === 'down' ? 'decreased' : 'stable'}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card-base p-5 animate-fade-in animate-delay-300">
          <h3 className="font-display text-base font-bold text-ink-800">Mood Trend</h3>
          <p className="text-xs text-ink-400">Mood score over recent days (1=Sad, 5=Happy)</p>
          <div className="mt-4"><LineChart data={moodData} color="#10B981" height={220} min={0} max={6} /></div>
        </div>

        <div className="card-base p-5 animate-fade-in animate-delay-400">
          <h3 className="font-display text-base font-bold text-ink-800">Mood Distribution</h3>
          <p className="text-xs text-ink-400">How often you feel each mood</p>
          <div className="mt-6 flex justify-center">
            <DonutChart data={donutData} size={180} centerLabel="entries" centerValue={String(recent14.length)} />
          </div>
        </div>

        <div className="card-base p-5 animate-fade-in animate-delay-500">
          <h3 className="font-display text-base font-bold text-ink-800">Symptom Frequency</h3>
          <p className="text-xs text-ink-400">Most reported symptoms</p>
          <div className="mt-4">
            {symptomData.length > 0 ? (
              <BarChart data={symptomData} color="#F59E0B" height={220} />
            ) : (
              <div className="flex h-[220px] items-center justify-center text-sm text-ink-400">No symptoms reported recently</div>
            )}
          </div>
        </div>

        <div className="card-base p-5 animate-fade-in animate-delay-600">
          <h3 className="font-display text-base font-bold text-ink-800">Hydration Pattern</h3>
          <p className="text-xs text-ink-400">Daily water intake in liters</p>
          <div className="mt-4"><BarChart data={lifestyleData} color="#3B82F6" unit="L" height={220} /></div>
        </div>
      </div>

      {/* Personalized Recommendations */}
      <div className="card-base p-5 animate-fade-in animate-delay-600">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-lavender-500" />
          <h2 className="font-display text-lg font-bold text-ink-800">Personalized Recommendations</h2>
          <span className="rounded-lg bg-lavender-50 px-2 py-0.5 text-xs font-medium text-lavender-600">AI Generated</span>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            { icon: Moon, title: 'Maintain Sleep Schedule', desc: 'Your mood improves on days with 7+ hours of sleep. Aim for consistent 7-8 hours nightly.' },
            { icon: Droplets, title: 'Stay Hydrated', desc: 'Your water intake drops on busy days. Set reminders to drink at least 2L of water daily.' },
            { icon: Activity, title: 'Consistent Activity', desc: 'Your step count varies widely. Aim for at least 7,000 steps daily for cardiovascular health.' },
            { icon: Heart, title: 'Monitor Stress', desc: 'On stressful days, your BP and heart rate increase. Practice stress management techniques.' },
          ].map((r, i) => (
            <div key={i} className="rounded-2xl border border-ink-100 p-4 transition-all hover:shadow-soft">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-lavender text-lavender-600">
                  <r.icon className="h-4.5 w-4.5" style={{ width: '1.125rem', height: '1.125rem' }} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink-800">{r.title}</p>
                  <p className="mt-1 text-sm text-ink-500">{r.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Insights */}
      <div className="card-base p-5 animate-fade-in animate-delay-700">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-rose-500" />
          <h2 className="font-display text-lg font-bold text-ink-800">Recent Insights</h2>
        </div>
        <div className="mt-5 space-y-3">
          {aiInsights.map((insight) => (
            <div key={insight.id} className="rounded-2xl border border-ink-100 p-4 transition-all hover:shadow-soft">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className={`rounded-lg px-2 py-0.5 text-xs font-semibold ${categoryColors[insight.category]}`}>
                    {insight.category}
                  </span>
                  <p className="text-sm font-bold text-ink-800">{insight.title}</p>
                </div>
                <span className="text-xs text-ink-400">{insight.date}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{insight.insight}</p>
              <div className="mt-3 rounded-xl bg-lavender-50 p-3">
                <p className="text-xs font-semibold text-lavender-700">Recommendation</p>
                <p className="mt-1 text-sm text-ink-600">{insight.recommendation}</p>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                <span className={`rounded-lg px-2 py-0.5 text-xs font-medium ${confidenceColors[insight.confidence]}`}>
                  {insight.confidence} Confidence
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
