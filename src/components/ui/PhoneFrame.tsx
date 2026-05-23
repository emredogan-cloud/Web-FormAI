import Image from 'next/image';
import { cn } from '@/lib/cn';

export function PhoneFrame({
  src,
  alt,
  className,
  priority = false,
  width = 320,
  height = 692,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}) {
  return (
    <div className={cn('relative inline-block', className)}>
      {/* Outer glow */}
      <div className="pointer-events-none absolute -inset-8 rounded-[3.5rem] bg-violet-500/20 blur-3xl" aria-hidden />
      {/* Frame */}
      <div
        className="relative rounded-[2.6rem] bg-gradient-to-b from-ink-700 to-ink-900 p-[3px] shadow-[0_30px_120px_-20px_rgba(124,92,255,0.5),0_0_0_1px_rgba(124,92,255,0.25)]"
        style={{ width: width + 22, height: height + 22 }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[2.4rem] bg-ink-950">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            className="h-full w-full object-cover"
          />
          {/* Notch */}
          <div
            aria-hidden
            className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-ink-950 ring-1 ring-white/5"
          />
          {/* Glass reflection */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[2.4rem] bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.06]"
          />
        </div>
      </div>
    </div>
  );
}
