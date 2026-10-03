"use client";

import { motion, type HTMLMotionProps } from 'framer-motion';
import type { PropsWithChildren } from 'react';

type FadeInProps = PropsWithChildren<
  HTMLMotionProps<'div'> & {
    delay?: number;
  }
>;

export function FadeIn({ children, delay = 0, className = '', ...props }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease: 'easeOut', delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
