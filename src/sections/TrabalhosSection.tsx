import React from 'react';
import { motion } from 'motion/react';
import type { SiteContent } from '../content';
import { GaleriaFiltro } from '../components/ui/GaleriaFiltro';
import { useMotionPreference } from '../components/ui/MotionContext';

export interface TrabalhosSectionProps {
  content: SiteContent['trabalhos'];
}

export function TrabalhosSection({ content }: TrabalhosSectionProps) {
  const { isReducedMotion } = useMotionPreference();

  if (!content.enabled) return null;

  return (
    <section
      id="trabalhos"
      aria-labelledby="trabalhos-title"
      className="py-16 sm:py-24 border-t border-[var(--tema-color-border)]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={isReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="space-y-4 mb-10 text-center max-w-2xl mx-auto"
        >
          <span
            className="text-xs font-bold tracking-widest text-[var(--tema-color-accent-ink)]"
            style={{
              fontFamily: 'var(--tema-font-mono)',
            }}
          >
            03. GALERIA DE OFÍCIO
          </span>

          <h2
            id="trabalhos-title"
            className="text-3xl sm:text-4xl font-black tracking-tight text-[var(--tema-color-text)]"
            style={{
              fontFamily: 'var(--tema-font-display)',
              textTransform: 'var(--tema-display-transform)' as React.CSSProperties['textTransform'],
            }}
          >
            {content.title}
          </h2>

          <p
            className="text-base text-[var(--tema-color-text-muted)]"
            style={{
              fontFamily: 'var(--tema-font-body)',
            }}
          >
            {content.description}
          </p>
        </motion.div>

        {/* Filterable gallery with layoutId Lightbox */}
        <GaleriaFiltro
          categories={content.categories}
          items={content.items}
        />
      </div>
    </section>
  );
}
