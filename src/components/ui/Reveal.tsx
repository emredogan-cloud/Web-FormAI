'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { cn } from '@/lib/cn';

type Direction = 'up' | 'left' | 'right' | 'none';

export function Reveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  amount = 0.2,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  amount?: number;
  once?: boolean;
}) {
  const prefersReduced = useReducedMotion();
  const offset = prefersReduced ? 0 : 28;

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? offset : 0,
      x: direction === 'left' ? offset : direction === 'right' ? -offset : 0,
    },
    show: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: prefersReduced ? 0.01 : 0.85,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

export function RevealStagger({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  amount = 0.2,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  amount?: number;
}) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: prefersReduced ? 0 : stagger, delayChildren: delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  direction = 'up',
}: {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
}) {
  const prefersReduced = useReducedMotion();
  const offset = prefersReduced ? 0 : 24;
  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: {
          opacity: 0,
          y: direction === 'up' ? offset : 0,
          x: direction === 'left' ? offset : direction === 'right' ? -offset : 0,
        },
        show: { opacity: 1, y: 0, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}
