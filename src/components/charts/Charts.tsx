import { useMemo } from 'react';

interface LineChartProps {
  data: { label: string; value: number }[];
  color?: string;
  height?: number;
  unit?: string;
  min?: number;
  max?: number;
}

export function LineChart({ data, color = '#F43F6E', height = 200, unit = '', min, max }: LineChartProps) {
  const { points, areaPath, linePath, chartMin, chartMax, gridLines } = useMemo(() => {
    if (data.length === 0) return { points: [], areaPath: '', linePath: '', chartMin: 0, chartMax: 0, gridLines: [] };
    const width = 600;
    const h = height;
    const padding = { top: 20, right: 20, bottom: 30, left: 45 };
    const innerW = width - padding.left - padding.right;
    const innerH = h - padding.top - padding.bottom;

    const values = data.map((d) => d.value);
    const dMin = min ?? Math.min(...values) - (Math.max(...values) - Math.min(...values)) * 0.15;
    const dMax = max ?? Math.max(...values) + (Math.max(...values) - Math.min(...values)) * 0.15;
    const range = dMax - dMin || 1;

    const pts = data.map((d, i) => ({
      x: padding.left + (innerW / Math.max(data.length - 1, 1)) * i,
      y: padding.top + innerH - ((d.value - dMin) / range) * innerH,
      value: d.value,
      label: d.label,
    }));

    const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
    const area = `${line} L ${pts[pts.length - 1].x.toFixed(1)} ${padding.top + innerH} L ${pts[0].x.toFixed(1)} ${padding.top + innerH} Z`;

    const grids = Array.from({ length: 5 }, (_, i) => {
      const y = padding.top + (innerH / 4) * i;
      const val = dMax - (range / 4) * i;
      return { y, val: Math.round(val * 10) / 10 };
    });

    return { points: pts, areaPath: area, linePath: line, chartMin: dMin, chartMax: dMax, gridLines: grids };
  }, [data, height, min, max]);

  if (data.length === 0) return null;

  return (
    <svg viewBox={`0 0 600 ${height}`} className="w-full" style={{ height }} preserveAspectRatio="none">
      <defs>
        <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {gridLines.map((g, i) => (
        <g key={i}>
          <line x1="45" y1={g.y} x2="580" y2={g.y} stroke="#E3E7EF" strokeWidth="1" strokeDasharray="4 4" />
          <text x="38" y={g.y + 4} textAnchor="end" fontSize="10" fill="#A8B0C2" fontWeight="500">
            {g.val}{unit}
          </text>
        </g>
      ))}
      <path d={areaPath} fill={`url(#grad-${color.replace('#', '')})`} />
      <path d={linePath} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 1500, strokeDashoffset: 1500, animation: 'draw-line 1.5s ease-out forwards' }} />
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="4" fill="white" stroke={color} strokeWidth="2.5" className="animate-fade-in" style={{ animationDelay: `${0.8 + i * 0.1}s`, opacity: 0 }} />
          <text x={p.x} y={height - 8} textAnchor="middle" fontSize="10" fill="#7C8499" fontWeight="500">
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

interface BarChartProps {
  data: { label: string; value: number }[];
  color?: string;
  height?: number;
  unit?: string;
}

export function BarChart({ data, color = '#9B6FFF', height = 200, unit = '' }: BarChartProps) {
  const maxVal = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="flex items-end justify-around gap-2 pt-4" style={{ height }}>
      {data.map((d, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-2">
          <span className="text-xs font-semibold text-ink-700">{d.value}{unit}</span>
          <div className="relative w-full max-w-[40px]" style={{ height: height - 50 }}>
            <div
              className="absolute bottom-0 w-full rounded-t-xl transition-all duration-700 animate-fade-in"
              style={{
                height: `${(d.value / maxVal) * 100}%`,
                background: `linear-gradient(180deg, ${color} 0%, ${color}88 100%)`,
                animationDelay: `${i * 0.1}s`,
                opacity: 0,
              }}
            />
          </div>
          <span className="text-xs text-ink-500">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

interface DonutChartProps {
  data: { label: string; value: number; color: string }[];
  size?: number;
  centerLabel?: string;
  centerValue?: string;
}

export function DonutChart({ data, size = 180, centerLabel, centerValue }: DonutChartProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;
  const radius = size / 2 - 18;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#F1F3F7" strokeWidth="14" />
          {data.map((d, i) => {
            const dash = (d.value / total) * circumference;
            const seg = (
              <circle
                key={i}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={d.color}
                strokeWidth="14"
                strokeLinecap="round"
                strokeDasharray={`${dash - 2} ${circumference - dash + 2}`}
                strokeDashoffset={-offset}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
                style={{ animation: 'fade-in 0.6s ease-out forwards', animationDelay: `${i * 0.15}s`, opacity: 0 }}
              />
            );
            offset += dash;
            return seg;
          })}
        </svg>
        {(centerLabel || centerValue) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {centerValue && <span className="text-2xl font-bold text-ink-800">{centerValue}</span>}
            {centerLabel && <span className="text-xs text-ink-500">{centerLabel}</span>}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full" style={{ background: d.color }} />
            <span className="text-sm font-medium text-ink-600">{d.label}</span>
            <span className="text-sm text-ink-400">({d.value})</span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface RadialProgressProps {
  value: number;
  max: number;
  size?: number;
  color?: string;
  label?: string;
  unit?: string;
}

export function RadialProgress({ value, max, size = 120, color = '#F43F6E', label, unit = '' }: RadialProgressProps) {
  const pct = Math.min(value / max, 1);
  const radius = size / 2 - 12;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#F1F3F7" strokeWidth="10" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - pct)}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold text-ink-800">{value}{unit}</span>
        {label && <span className="text-xs text-ink-400">{label}</span>}
      </div>
    </div>
  );
}
