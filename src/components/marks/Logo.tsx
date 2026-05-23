import { cn } from '@/lib/cn';

export function Logo({ className, withGlow = false }: { className?: string; withGlow?: boolean }) {
  return (
    <div className={cn('relative inline-flex items-center gap-2', className)}>
      {withGlow && (
        <div className="pointer-events-none absolute -inset-3 rounded-full bg-violet-500/30 blur-xl" aria-hidden />
      )}
      <LogoMark className="relative h-7 w-7" />
      <span className="relative font-display text-lg font-bold tracking-tight">
        <span className="text-white">Form</span>
        <span className="bg-gradient-to-br from-violet-300 to-violet-500 bg-clip-text text-transparent">AI</span>
      </span>
    </div>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A98AFF" />
          <stop offset="1" stopColor="#5230C2" />
        </linearGradient>
        <linearGradient id="logoGradAccent" x1="6" y1="22" x2="26" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C8FF00" />
          <stop offset="1" stopColor="#5FE3FF" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="30" height="30" rx="9" stroke="url(#logoGrad)" strokeWidth="1.5" />
      <path d="M9 21 V11 H22" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 16 H18" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="23" cy="21" r="2" fill="url(#logoGradAccent)" />
    </svg>
  );
}
