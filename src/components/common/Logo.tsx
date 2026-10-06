import { HeartPulse } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showFull?: boolean;
}

export function Logo({ size = 'md', showFull = true }: LogoProps) {
  const sizes = {
    sm: { icon: 'h-7 w-7', text: 'text-lg', gap: 'gap-2' },
    md: { icon: 'h-9 w-9', text: 'text-xl', gap: 'gap-2.5' },
    lg: { icon: 'h-12 w-12', text: 'text-3xl', gap: 'gap-3' },
  };
  const s = sizes[size];

  return (
    <div className={`flex items-center ${s.gap}`}>
      <div className={`${s.icon} relative flex items-center justify-center rounded-xl bg-gradient-to-br from-rose-400 to-rose-600 text-white shadow-glow-rose`}>
        <HeartPulse className="h-1/2 w-1/2" fill="white" />
      </div>
      {showFull && (
        <span className={`${s.text} font-display font-extrabold tracking-tight text-ink-800`}>
          PHaR<span className="text-gradient-rose">MiS</span>
        </span>
      )}
    </div>
  );
}
