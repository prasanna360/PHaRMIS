import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/contexts/ToastContext';
import { severityColors } from '@/data/demoData';
import { ShieldAlert, CheckCircle2, AlertTriangle, Filter, X, Info } from 'lucide-react';

export function RiskAlertsPage() {
  const { riskAlerts, resolveAlert } = useData();
  const { showToast } = useToast();
  const [filter, setFilter] = useState<'All' | 'Low' | 'Moderate' | 'High'>('All');

  const filtered = filter === 'All' ? riskAlerts : riskAlerts.filter((a) => a.severity === filter);

  const counts = {
    All: riskAlerts.length,
    Low: riskAlerts.filter((a) => a.severity === 'Low').length,
    Moderate: riskAlerts.filter((a) => a.severity === 'Moderate').length,
    High: riskAlerts.filter((a) => a.severity === 'High').length,
  };

  const statusColors: Record<string, string> = {
    Active: 'bg-rose-50 text-rose-600',
    Monitoring: 'bg-blue-50 text-blue-600',
    Resolved: 'bg-emerald-50 text-emerald-600',
  };

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="font-display text-2xl font-extrabold text-ink-800 sm:text-3xl">Risk Alerts</h1>
        <p className="mt-1 text-sm text-ink-500">Health risk notifications and recommendations</p>
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 animate-fade-in animate-delay-100">
        <Info className="h-5 w-5 flex-shrink-0 text-amber-600" />
        <p className="text-sm text-amber-800">
          Risk alerts are informational and based on entered health data. For high-risk alerts, consider contacting a qualified healthcare professional. PHaRMiS does not provide medical diagnoses.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 animate-fade-in animate-delay-200">
        {([
          { key: 'All', label: 'Total Alerts', color: 'bg-ink-50 text-ink-700' },
          { key: 'Low', label: 'Low Risk', color: 'bg-emerald-50 text-emerald-600' },
          { key: 'Moderate', label: 'Moderate Risk', color: 'bg-amber-50 text-amber-600' },
          { key: 'High', label: 'High Risk', color: 'bg-rose-50 text-rose-600' },
        ] as const).map((c) => (
          <div key={c.key} className={`rounded-2xl p-4 ${c.color}`}>
            <p className="text-2xl font-bold">{counts[c.key]}</p>
            <p className="text-xs">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 animate-fade-in animate-delay-300">
        <Filter className="h-4 w-4 text-ink-400" />
        {(['All', 'Low', 'Moderate', 'High'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all ${
              filter === f ? 'bg-rose-500 text-white shadow-soft' : 'bg-white border border-ink-200 text-ink-500 hover:border-ink-300'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Alerts list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="card-base py-12 text-center">
            <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-400" />
            <p className="mt-3 text-sm text-ink-400">No {filter !== 'All' ? `${filter.toLowerCase()} risk ` : ''}alerts found</p>
          </div>
        ) : (
          filtered.map((alert, i) => {
            const sc = severityColors[alert.severity];
            return (
              <div
                key={alert.id}
                className={`card-base overflow-hidden animate-fade-in ${alert.status === 'Active' ? 'ring-1 ring-rose-100' : ''}`}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start">
                  <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${sc.bg} ${sc.text}`}>
                    {alert.severity === 'High' ? <AlertTriangle className="h-6 w-6" /> : <ShieldAlert className="h-6 w-6" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-bold text-ink-800">{alert.type}</p>
                      <span className={`rounded-lg px-2 py-0.5 text-xs font-semibold ${sc.bg} ${sc.text}`}>
                        {alert.severity} Risk
                      </span>
                      <span className={`rounded-lg px-2 py-0.5 text-xs font-medium ${statusColors[alert.status]}`}>
                        {alert.status}
                      </span>
                      <span className="text-xs text-ink-400">{alert.date}</span>
                    </div>
                    <p className="mt-2.5 text-sm leading-relaxed text-ink-600">
                      <span className="font-semibold text-ink-700">Reason: </span>{alert.reason}
                    </p>
                    <div className={`mt-3 rounded-xl p-3.5 ${sc.bg} ${sc.border} border`}>
                      <p className={`text-xs font-semibold ${sc.text}`}>Recommendation</p>
                      <p className="mt-1 text-sm text-ink-600">{alert.recommendation}</p>
                    </div>
                    {alert.status === 'Active' && (
                      <button
                        onClick={() => { resolveAlert(alert.id); showToast('Alert marked as resolved', 'success'); }}
                        className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-600 transition-all hover:bg-emerald-100"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" /> Mark as Resolved
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
