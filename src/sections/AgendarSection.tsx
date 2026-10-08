import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, ArrowUpRight } from 'lucide-react';
import type { SiteContent } from '../content';
import { LinkAnimado } from '../components/ui/LinkAnimado';
import { SeletorHorario } from '../components/ui/SeletorHorario';
import { useMotionPreference } from '../components/ui/MotionContext';

export interface AgendarSectionProps {
  content: SiteContent['agendar'];
}

export function AgendarSection({ content }: AgendarSectionProps) {
  const { isReducedMotion } = useMotionPreference();

  if (!content.enabled) return null;

  return (
    <section
      id="agendar"
      aria-labelledby="agendar-title"
      className="py-16 sm:py-24 border-t border-[var(--tema-color-border)]"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--tema-color-bg) 60%, var(--tema-color-surface))',
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
            04. HORA MARCADA
          </span>

          <h2
            id="agendar-title"
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Forma 1: Botão direto para WhatsApp */}
          <motion.div
            initial={isReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="lg:col-span-5 p-6 flex flex-col justify-between space-y-6"
            style={{
              borderRadius: 'var(--tema-radius-lg)',
              borderWidth: 'var(--tema-border-width)',
              borderStyle: 'solid',
              borderColor: 'var(--tema-color-border)',
              backgroundColor: 'var(--tema-color-surface)',
            }}
          >
            <div className="space-y-4">
              <div
                className="w-12 h-12 flex items-center justify-center rounded"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--tema-color-accent) 15%, var(--tema-color-surface))',
                  border: 'var(--tema-border-width) solid var(--tema-color-accent)',
                  color: 'var(--tema-color-accent-ink)',
                }}
              >
                <MessageSquare className="w-6 h-6" />
              </div>

              <h3
                className="text-lg font-bold text-[var(--tema-color-text)]"
                style={{
                  fontFamily: 'var(--tema-font-label)',
                  textTransform: 'var(--tema-label-transform)' as React.CSSProperties['textTransform'],
                  letterSpacing: 'var(--tema-label-tracking)',
                }}
              >
                Agendamento Direto
              </h3>

              <p
                className="text-sm leading-relaxed text-[var(--tema-color-text-muted)]"
                style={{
                  fontFamily: 'var(--tema-font-body)',
                }}
              >
                Envie uma mensagem pelo WhatsApp informando o dia desejado e o serviço. Respondemos prontamente com os horários livres na bancada.
              </p>
            </div>

            <div>
              <LinkAnimado
                href={content.whatsappAction.href}
                variant="primary"
                size="lg"
                className="w-full"
                aria-label={`${content.whatsappAction.label}: agendar atendimento no WhatsApp`}
              >
                <span>{content.whatsappAction.label}</span>
                <ArrowUpRight className="w-4 h-4" />
              </LinkAnimado>
            </div>
          </motion.div>

          {/* Forma 2: Seletor de horário de EXEMPLO (ilustrativo com AnimatePresence) */}
          <motion.div
            initial={isReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.45,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="lg:col-span-7"
          >
            <SeletorHorario
              notice={content.notice}
              days={content.days}
              slotsPerDay={content.slotsPerDay}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
