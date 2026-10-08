import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Scissors } from 'lucide-react';
import type { SiteContent } from '../content';
import { LinkAnimado } from '../components/ui/LinkAnimado';
import { ImageRevealBarras } from '../components/ui/ImageRevealBarras';
import { useMotionPreference } from '../components/ui/MotionContext';

export interface HeroSectionProps {
  content: SiteContent['hero'];
}

export function HeroSection({ content }: HeroSectionProps) {
  const { isReducedMotion } = useMotionPreference();

  if (!content.enabled) return null;

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative w-full py-12 sm:py-20 lg:py-28 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Typography & CTAs */}
          <motion.div
            initial={isReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.45,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="lg:col-span-7 flex flex-col items-start space-y-6"
          >
            {/* Kicker */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1 text-xs select-none"
              style={{
                fontFamily: 'var(--tema-font-mono)',
                backgroundColor: 'color-mix(in srgb, var(--tema-color-surface) 90%, var(--tema-color-bg))',
                borderWidth: 'var(--tema-border-width)',
                borderStyle: 'solid',
                borderColor: 'var(--tema-color-border)',
                borderRadius: 'var(--tema-radius)',
                color: 'var(--tema-color-accent-ink)',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-[var(--tema-color-accent)] animate-pulse" />
              <span>{content.kicker}</span>
            </div>

            {/* ONLY H1 ON THE PAGE */}
            <h1
              id="hero-title"
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-[var(--tema-color-text)] text-balance"
              style={{
                fontFamily: 'var(--tema-font-display)',
                textTransform: 'var(--tema-display-transform)' as React.CSSProperties['textTransform'],
              }}
            >
              {content.title}
            </h1>

            {/* Description */}
            <p
              className="text-base sm:text-lg max-w-xl leading-relaxed text-[var(--tema-color-text-muted)]"
              style={{
                fontFamily: 'var(--tema-font-body)',
              }}
            >
              {content.description}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <LinkAnimado
                href={content.primaryAction.href}
                variant="primary"
                size="lg"
                aria-label={`${content.primaryAction.label}: agendar atendimento`}
              >
                <Calendar className="w-5 h-5" />
                <span>{content.primaryAction.label}</span>
              </LinkAnimado>

              <LinkAnimado
                href={content.secondaryAction.href}
                variant="outline"
                size="lg"
                aria-label={`${content.secondaryAction.label}: rolar para tabela de serviços`}
              >
                <Scissors className="w-5 h-5" />
                <span>{content.secondaryAction.label}</span>
              </LinkAnimado>
            </div>
          </motion.div>

          {/* Right Column: Image with horizontal shutter reveal bars */}
          <div className="lg:col-span-5 w-full">
            <ImageRevealBarras
              src={content.image.src}
              alt={content.image.alt}
              aspect="4/3"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
