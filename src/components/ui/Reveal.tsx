'use client';

import React, { createContext, useContext } from 'react';
import { cn } from '@/lib/cn';
import { useIntersect } from '@/lib/use-intersect';

// ─────────────────────────────────────────────────────────────────────────────
// Reveal — scroll-triggered fade-up.
//
// PR 4.3 — rewritten to drop Framer Motion. The 80% case (fade up when the
// element enters the viewport) doesn't need a 50 KB animation library; an
// IntersectionObserver hook + CSS transitions do it in ~50 lines of client JS.
//
// API preserved from the prior Framer Motion implementation so consumers
// (every page) need no changes:
//   <Reveal delay={0.1}>...</Reveal>
//   <RevealStagger stagger={0.08}>
//     <RevealItem>...</RevealItem>
//     <RevealItem>...</RevealItem>
//   </RevealStagger>
//
// The accompanying CSS lives in src/app/globals.css under .reveal /
// .reveal--{direction} / .reveal--in-view. prefers-reduced-motion is
// respected globally via the @media block in globals.css that zeros all
// transition durations.
// ─────────────────────────────────────────────────────────────────────────────

type Direction = 'up' | 'left' | 'right' | 'none';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  amount?: number;
  once?: boolean;
}

export function Reveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  amount = 0.2,
  once = true,
}: RevealProps) {
  const { ref, inView } = useIntersect({ once, amount });
  return (
    <div
      ref={ref}
      className={cn('reveal', `reveal--${direction}`, inView && 'reveal--in-view', className)}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}

// ── Staggered children ─────────────────────────────────────────────────────

const StaggerCtx = createContext<{ inView: boolean } | null>(null);

interface RevealStaggerProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  amount?: number;
  once?: boolean;
}

export function RevealStagger({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  amount = 0.2,
  once = true,
}: RevealStaggerProps) {
  const { ref, inView } = useIntersect({ once, amount });

  // Inject transitionDelay into each direct child via cloneElement so the
  // children stagger their reveal as the parent enters the viewport. Children
  // that aren't React elements (strings, null) are passed through untouched.
  const enhanced = React.Children.map(children, (child, i) => {
    if (!React.isValidElement<{ style?: React.CSSProperties }>(child)) return child;
    const existing = child.props.style ?? {};
    return React.cloneElement(child, {
      style: { ...existing, transitionDelay: `${delay + stagger * i}s` },
    });
  });

  return (
    <div ref={ref} className={className}>
      <StaggerCtx.Provider value={{ inView }}>{enhanced}</StaggerCtx.Provider>
    </div>
  );
}

interface RevealItemProps {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
  // Passed via cloneElement from RevealStagger — do not pass directly.
  style?: React.CSSProperties;
}

export function RevealItem({ children, className, direction = 'up', style }: RevealItemProps) {
  const ctx = useContext(StaggerCtx);
  // If used outside RevealStagger, behave like a vanilla Reveal so it never
  // stays hidden — defensive fallback for misuse.
  const fallbackInView = useIntersect({ once: true, amount: 0.2 });
  const inView = ctx ? ctx.inView : fallbackInView.inView;
  return (
    <div
      ref={ctx ? undefined : fallbackInView.ref}
      className={cn('reveal', `reveal--${direction}`, inView && 'reveal--in-view', className)}
      style={style}
    >
      {children}
    </div>
  );
}
