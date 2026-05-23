'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/marks/Logo';
import { Button } from '@/components/ui/Button';
import { primaryNav } from '@/lib/nav';
import { cn } from '@/lib/cn';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled ? 'pt-2' : 'pt-4'
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav
          className={cn(
            'flex items-center justify-between rounded-full border px-3 py-2 transition-all duration-500',
            scrolled
              ? 'border-white/[0.08] bg-ink-950/70 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]'
              : 'border-white/[0.06] bg-ink-950/40 backdrop-blur-md'
          )}
        >
          <Link href="/" className="flex items-center gap-2 pl-3" aria-label="FormAI ana sayfa">
            <Logo />
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {primaryNav.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'group relative inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all',
                      active ? 'text-white' : 'text-white/65 hover:text-white'
                    )}
                  >
                    <span className="font-mono text-[9px] text-violet-400/70">{item.mono}</span>
                    {item.label}
                    {active && (
                      <span className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-violet-400 to-transparent" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-2 md:flex">
            <Button href="/baslat#waitlist" variant="primary" size="sm" arrow>
              Erken erişim
            </Button>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden mr-1 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-white/80"
            aria-label="Menüyü aç"
            aria-expanded={open}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="transition-transform" style={{ transform: open ? 'rotate(90deg)' : 'none' }}>
              {open ? (
                <path d="M4 4 L14 14 M14 4 L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              ) : (
                <>
                  <path d="M3 6 H15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M3 12 H15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile menu */}
        <div
          className={cn(
            'md:hidden overflow-hidden transition-all duration-500',
            open ? 'mt-3 max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="rounded-3xl border border-white/[0.06] bg-ink-950/85 backdrop-blur-xl p-4">
            <ul className="grid gap-1">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center justify-between rounded-2xl px-4 py-3 text-sm transition-colors',
                      pathname === item.href
                        ? 'bg-violet-500/15 text-white'
                        : 'text-white/75 hover:bg-white/[0.04] hover:text-white'
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span className="font-mono text-[9px] text-violet-400/70">{item.mono}</span>
                      {item.label}
                    </span>
                    <span className="text-white/30">›</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 px-1">
              <Button href="/baslat#waitlist" variant="primary" size="md" arrow className="w-full">
                Erken erişim
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
