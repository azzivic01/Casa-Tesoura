import React from 'react';
import { motion } from 'motion/react';
import type { SiteContent } from '../content';
import { CartaoEquipe } from '../components/ui/CartaoEquipe';
import { useMotionPreference } from '../components/ui/MotionContext';

export interface EquipeSectionProps {
  content: SiteContent['equipe'];
}

export function EquipeSection({ content }: EquipeSectionProps) {
  const { isReducedMotion } = useMotionPreference();

  if (!content.enabled) return null;

  return (
    <section
      id="equipe"
      aria-labelledby="equipe-title"
      className="py-16 sm:py-24 border-t border-[var(--tema-color-border)]"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--tema-color-bg) 70%, var(--tema-color-surface))',
      }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
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
            02. PROFISSIONAIS
          </span>

          <h2
            id="equipe-title"
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

        {/* 3 Team Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.items.map((member, index) => (
            <motion.div
              key={member.id}
              initial={isReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <CartaoEquipe member={member} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
