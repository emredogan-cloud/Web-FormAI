import Link from 'next/link';
import { cn } from '@/lib/cn';
import { forwardRef } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'lime';
type Size = 'sm' | 'md' | 'lg';

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 whitespace-nowrap';

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-[15px]',
  lg: 'h-14 px-8 text-base',
};

const variants: Record<Variant, string> = {
  primary:
    'bg-gradient-to-b from-violet-400 to-violet-600 text-white shadow-[0_8px_30px_-8px_rgba(124,92,255,0.7),0_0_0_1px_rgba(255,255,255,0.1)_inset] hover:shadow-[0_12px_44px_-8px_rgba(124,92,255,0.9),0_0_0_1px_rgba(255,255,255,0.15)_inset] hover:-translate-y-px',
  secondary:
    'bg-white/[0.04] text-white border border-white/[0.1] backdrop-blur-md hover:bg-white/[0.08] hover:border-white/[0.18] hover:shadow-glow-subtle',
  ghost:
    'text-white/80 hover:text-white hover:bg-white/[0.04]',
  lime:
    'bg-lime-500 text-ink-950 font-semibold shadow-[0_8px_30px_-8px_rgba(200,255,0,0.7),0_0_0_1px_rgba(0,0,0,0.2)_inset] hover:shadow-[0_12px_44px_-8px_rgba(200,255,0,0.9)] hover:-translate-y-px',
};

interface ButtonProps {
  href?: string;
  variant?: Variant;
  size?: Size;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  arrow?: boolean;
  external?: boolean;
  disabled?: boolean;
  ariaBusy?: boolean;
}

export const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonProps>(
  ({ href, variant = 'primary', size = 'md', children, className, arrow, external, disabled, ariaBusy, ...props }, ref) => {
    const classes = cn(
      base,
      sizes[size],
      variants[variant],
      disabled && 'cursor-not-allowed opacity-60 hover:translate-y-0 hover:shadow-none',
      className
    );
    const content = (
      <>
        <span className="relative z-10 flex items-center gap-2">{children}</span>
        {arrow && (
          <svg
            className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path d="M3 8h10m0 0L8 3m5 5l-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        {variant === 'primary' && (
          <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-t from-white/0 via-white/0 to-white/20 opacity-60" />
        )}
      </>
    );
    if (href) {
      const linkProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
      return (
        <Link
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          {...linkProps}
        >
          {content}
        </Link>
      );
    }
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        disabled={disabled}
        aria-busy={ariaBusy}
        {...props}
      >
        {content}
      </button>
    );
  }
);
Button.displayName = 'Button';
