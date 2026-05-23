import { cn } from '@/lib/cn';

export function Section({
  children,
  className,
  id,
  spacing = 'default',
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  spacing?: 'default' | 'tight' | 'loose' | 'none';
}) {
  const padding = {
    default: 'py-24 sm:py-32 lg:py-40',
    tight: 'py-16 sm:py-24',
    loose: 'py-32 sm:py-40 lg:py-56',
    none: '',
  }[spacing];
  return (
    <section id={id} className={cn('relative isolate', padding, className)}>
      {children}
    </section>
  );
}
