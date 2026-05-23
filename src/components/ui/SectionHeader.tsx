import { cn } from '@/lib/cn';
import { Mono } from './Mono';
import { Reveal } from './Reveal';

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  monoTone = 'violet',
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
  monoTone?: 'violet' | 'lime' | 'scan' | 'ember';
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-5',
        align === 'center' && 'items-center text-center',
        align === 'center' ? 'mx-auto max-w-3xl' : 'max-w-3xl',
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <div className="flex items-center gap-2">
            <span className={cn('h-px w-8', monoTone === 'lime' ? 'bg-lime-500/70' : monoTone === 'scan' ? 'bg-scan-500/70' : monoTone === 'ember' ? 'bg-ember-500/70' : 'bg-violet-400/70')} />
            <Mono tone={monoTone}>{eyebrow}</Mono>
          </div>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="text-display-lg font-display text-gradient text-balance">{title}</h2>
      </Reveal>
      {description && (
        <Reveal delay={0.12}>
          <p className="max-w-2xl text-pretty text-base text-white/60 sm:text-lg">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
