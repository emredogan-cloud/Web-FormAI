import { cn } from '@/lib/cn';

type Tone = 'violet' | 'lime' | 'scan' | 'ember' | 'mix';
type Size = 'sm' | 'md' | 'lg' | 'xl';

export function GlowOrb({
  className,
  tone = 'violet',
  size = 'md',
  blur = 'lg',
}: {
  className?: string;
  tone?: Tone;
  size?: Size;
  blur?: 'md' | 'lg' | 'xl';
}) {
  const tones: Record<Tone, string> = {
    violet: 'bg-violet-500',
    lime: 'bg-lime-500',
    scan: 'bg-scan-500',
    ember: 'bg-ember-500',
    mix: 'bg-gradient-to-br from-violet-500 via-scan-500 to-lime-500',
  };
  const sizes: Record<Size, string> = {
    sm: 'h-40 w-40',
    md: 'h-72 w-72',
    lg: 'h-[28rem] w-[28rem]',
    xl: 'h-[44rem] w-[44rem]',
  };
  const blurs = {
    md: 'blur-3xl',
    lg: 'blur-[100px]',
    xl: 'blur-[140px]',
  };
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute rounded-full opacity-40 will-change-transform',
        tones[tone],
        sizes[size],
        blurs[blur],
        className
      )}
    />
  );
}
