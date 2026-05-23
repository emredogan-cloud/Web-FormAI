import { cn } from '@/lib/cn';

export function StatRing({
  value,
  label,
  size = 120,
  stroke = 8,
  tone = 'violet',
  className,
}: {
  value: number;
  label?: string;
  size?: number;
  stroke?: number;
  tone?: 'violet' | 'lime' | 'scan' | 'ember';
  className?: string;
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const toneMap = {
    violet: { stroke: '#7C5CFF', glow: 'drop-shadow(0 0 12px rgba(124,92,255,0.6))', text: 'text-violet-300' },
    lime: { stroke: '#C8FF00', glow: 'drop-shadow(0 0 12px rgba(200,255,0,0.6))', text: 'text-lime-400' },
    scan: { stroke: '#1FCFFF', glow: 'drop-shadow(0 0 12px rgba(31,207,255,0.6))', text: 'text-scan-400' },
    ember: { stroke: '#FF7A1A', glow: 'drop-shadow(0 0 12px rgba(255,122,26,0.6))', text: 'text-ember-400' },
  }[tone];

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={toneMap.stroke}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ filter: toneMap.glow, transition: 'stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn('font-display text-xl font-semibold', toneMap.text)}>{value}%</span>
        {label && <span className="font-mono text-[9px] uppercase tracking-widest text-white/45 mt-0.5">{label}</span>}
      </div>
    </div>
  );
}
