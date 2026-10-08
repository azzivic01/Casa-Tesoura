import React from 'react';
import { motion } from 'motion/react';
import type { SiteContent } from '../content';
import { Accordion } from '../components/ui/Accordion';
import { useMotionPreference } from '../components/ui/MotionContext';

export interface FaqSectionProps {
  content: SiteContent['faq'];
}

export function FaqSection({ content }: FaqSectionProps) {
  const { isReducedMotion } = useMotionPreference();

  if (!content.enabled) return null;

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="py-16 sm:py-24 border-t border-[var(--tema-color-border)]"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--tema-color-bg) 70%, var(--tema-color-surface))',
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={isReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="space-y-4 mb-10 text-left"
        >
          <span
            className="text-xs font-bold tracking-widest text-[var(--tema-color-accent-ink)]"
            style={{
              fontFamily: 'var(--tema-font-mono)',
            }}
          >
            06. DÚVIDAS DO BALCÃO
          </span>

          <h2
            id="faq-title"
            className="text-3xl sm:text-4xl font-black tracking-tight text-[var(--tema-color-text)]"
            style={{
              fontFamily: 'var(--tema-font-display)',
              textTransform: 'var(--tema-display-transform)' as React.CSSProperties['textTransform'],
            }}
          >
            {content.title}
          </h2>

          <p
            className="text-base text-[var(--tema-color-text-muted)] max-w-xl"
            style={{
              fontFamily: 'var(--tema-font-body)',
            }}
          >
            {content.description}
          </p>
        </motion.div>

        {/* 5 Questions Accordion */}
        <motion.div
          initial={isReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.45,
            delay: 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <Accordion items={content.items} />
        </motion.div>
      </div>
    </section>
  );
}
