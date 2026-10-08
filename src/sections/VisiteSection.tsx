import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, CreditCard, Navigation } from 'lucide-react';
import type { SiteContent } from '../content';
import { useMotionPreference } from '../components/ui/MotionContext';

export interface VisiteSectionProps {
  content: SiteContent['visite'];
}

export function VisiteSection({ content }: VisiteSectionProps) {
  const { isReducedMotion } = useMotionPreference();

  if (!content.enabled) return null;

  return (
    <section
      id="visite"
      aria-labelledby="visite-title"
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
          className="space-y-4 mb-10 text-left"
        >
          <span
            className="text-xs font-bold tracking-widest text-[var(--tema-color-accent-ink)]"
            style={{
              fontFamily: 'var(--tema-font-mono)',
            }}
          >
            05. LOCALIZAÇÃO E FUNCIONAMENTO
          </span>

          <h2
            id="visite-title"
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Information Column */}
          <motion.div
            initial={isReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="lg:col-span-6 space-y-6 flex flex-col justify-between"
          >
            {/* Endereço */}
            <div
              className="p-5"
              style={{
                borderRadius: 'var(--tema-radius-lg)',
                borderWidth: 'var(--tema-border-width)',
                borderStyle: 'solid',
                borderColor: 'var(--tema-color-border)',
                backgroundColor: 'var(--tema-color-surface)',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-[var(--tema-color-accent)]" />
                <h3
                  className="text-sm font-bold"
                  style={{
                    fontFamily: 'var(--tema-font-label)',
                    textTransform: 'var(--tema-label-transform)' as React.CSSProperties['textTransform'],
                    letterSpacing: 'var(--tema-label-tracking)',
                    color: 'var(--tema-color-text)',
                  }}
                >
                  Endereço
                </h3>
              </div>
              <p
                className="text-[15px] font-mono text-[var(--tema-color-text)]"
                style={{
                  fontFamily: 'var(--tema-font-mono)',
                }}
              >
                {content.address}
              </p>
            </div>

            {/* 4 Linhas de Horário */}
            <div
              className="p-5"
              style={{
                borderRadius: 'var(--tema-radius-lg)',
                borderWidth: 'var(--tema-border-width)',
                borderStyle: 'solid',
                borderColor: 'var(--tema-color-border)',
                backgroundColor: 'var(--tema-color-surface)',
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-[var(--tema-color-accent)]" />
                <h3
                  className="text-sm font-bold"
                  style={{
                    fontFamily: 'var(--tema-font-label)',
                    textTransform: 'var(--tema-label-transform)' as React.CSSProperties['textTransform'],
                    letterSpacing: 'var(--tema-label-tracking)',
                    color: 'var(--tema-color-text)',
                  }}
                >
                  Horários de Atendimento
                </h3>
              </div>
              <ul className="space-y-2">
                {content.hours.map((line, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between py-1.5 border-b border-[var(--tema-color-border)] last:border-b-0 text-[14px]"
                    style={{
                      fontFamily: 'var(--tema-font-mono)',
                      color: 'var(--tema-color-text)',
                    }}
                  >
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Forma de Pagamento */}
            <div
              className="p-5"
              style={{
                borderRadius: 'var(--tema-radius-lg)',
                borderWidth: 'var(--tema-border-width)',
                borderStyle: 'solid',
                borderColor: 'var(--tema-color-border)',
                backgroundColor: 'var(--tema-color-surface)',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-5 h-5 text-[var(--tema-color-accent)]" />
                <h3
                  className="text-sm font-bold"
                  style={{
                    fontFamily: 'var(--tema-font-label)',
                    textTransform: 'var(--tema-label-transform)' as React.CSSProperties['textTransform'],
                    letterSpacing: 'var(--tema-label-tracking)',
                    color: 'var(--tema-color-text)',
                  }}
                >
                  Formas de Pagamento
                </h3>
              </div>
              <p
                className="text-[14px] text-[var(--tema-color-text-muted)]"
                style={{
                  fontFamily: 'var(--tema-font-mono)',
                }}
              >
                {content.payment}
              </p>
            </div>
          </motion.div>

          {/* Bloco [mapa] como retângulo com borda */}
          <motion.div
            initial={isReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.45,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="lg:col-span-6 min-h-[340px] flex flex-col items-center justify-center p-8 text-center select-none"
            style={{
              borderRadius: 'var(--tema-radius-lg)',
              borderWidth: 'var(--tema-border-width)',
              borderStyle: 'dashed',
              borderColor: 'var(--tema-color-border)',
              backgroundColor: 'color-mix(in srgb, var(--tema-color-bg) 60%, var(--tema-color-surface))',
            }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--tema-color-accent) 20%, var(--tema-color-surface))',
                border: 'var(--tema-border-width) solid var(--tema-color-accent)',
                color: 'var(--tema-color-accent-ink)',
              }}
            >
              <Navigation className="w-6 h-6" />
            </div>

            <span
              className="text-lg font-bold mb-2 tracking-wider"
              style={{
                fontFamily: 'var(--tema-font-mono)',
                color: 'var(--tema-color-text)',
              }}
            >
              {content.mapPlaceholder}
            </span>

            <p
              className="text-xs max-w-xs text-[var(--tema-color-text-muted)]"
              style={{
                fontFamily: 'var(--tema-font-body)',
              }}
            >
              Localização aproximada em {content.address}. Acesso simplificado a pé e transporte coletivo do bairro.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
