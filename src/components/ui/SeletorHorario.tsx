import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Info, Check } from 'lucide-react';
import { useMotionPreference } from './MotionContext';

export interface SeletorHorarioProps {
  notice: string;
  days: string[];
  slotsPerDay: Record<string, string[]>;
}

export function SeletorHorario({ notice, days, slotsPerDay }: SeletorHorarioProps) {
  const { isReducedMotion } = useMotionPreference();
  const [selectedDay, setSelectedDay] = useState<string>(days[0] || 'Seg');
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(null);

  const currentSlots = slotsPerDay[selectedDay] || ['[horário]', '[horário]', '[horário]', '[horário]'];

  return (
    <div
      className="w-full p-6 space-y-6"
      style={{
        borderRadius: 'var(--tema-radius-lg)',
        borderWidth: 'var(--tema-border-width)',
        borderStyle: 'solid',
        borderColor: 'var(--tema-color-border)',
        backgroundColor: 'var(--tema-color-surface)',
      }}
    >
      <div className="flex items-start gap-3">
        <Clock className="w-5 h-5 text-[var(--tema-color-accent)] shrink-0 mt-0.5" />
        <div>
          <h3
            className="text-base font-bold text-[var(--tema-color-text)]"
            style={{
              fontFamily: 'var(--tema-font-label)',
              textTransform: 'var(--tema-label-transform)' as React.CSSProperties['textTransform'],
              letterSpacing: 'var(--tema-label-tracking)',
            }}
          >
            Grade de Horários (Simulação)
          </h3>
          <p className="text-xs text-[var(--tema-color-text-muted)] mt-1">
            Escolha o dia da semana para visualizar a dinâmica dos intervalos de atendimento.
          </p>
        </div>
      </div>

      {/* Days buttons */}
      <div
        role="tablist"
        aria-label="Dias da semana para simulação"
        className="grid grid-cols-3 sm:grid-cols-6 gap-2"
      >
        {days.map((day) => {
          const isActive = selectedDay === day;
          return (
            <button
              key={day}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                setSelectedDay(day);
                setSelectedSlotIndex(null);
              }}
              className="min-h-[44px] py-2 px-3 text-xs font-semibold cursor-pointer select-none transition-all focus-visible:outline-2 focus-visible:outline-[var(--tema-color-accent-ink)] focus-visible:outline-offset-2"
              style={{
                borderRadius: 'var(--tema-radius)',
                borderWidth: 'var(--tema-border-width)',
                borderStyle: 'solid',
                borderColor: isActive ? 'var(--tema-color-accent)' : 'var(--tema-color-border)',
                backgroundColor: isActive
                  ? 'var(--tema-color-accent)'
                  : 'color-mix(in srgb, var(--tema-color-bg) 50%, var(--tema-color-surface))',
                color: isActive ? 'var(--tema-color-on-accent)' : 'var(--tema-color-text)',
                fontFamily: 'var(--tema-font-mono)',
              }}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Animated Slots Container via AnimatePresence */}
      <div className="relative min-h-[90px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDay}
            initial={isReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={isReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{
              duration: 0.25,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            {currentSlots.map((slot, index) => {
              const isSelected = selectedSlotIndex === index;
              return (
                <button
                  key={`${selectedDay}-${index}`}
                  type="button"
                  onClick={() => setSelectedSlotIndex(index)}
                  aria-pressed={isSelected}
                  className="min-h-[44px] px-3 py-2 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all focus-visible:outline-2 focus-visible:outline-[var(--tema-color-accent-ink)] focus-visible:outline-offset-2"
                  style={{
                    borderRadius: 'var(--tema-radius)',
                    borderWidth: 'var(--tema-border-width)',
                    borderStyle: 'solid',
                    borderColor: isSelected ? 'var(--tema-color-accent)' : 'var(--tema-color-border)',
                    backgroundColor: isSelected
                      ? 'color-mix(in srgb, var(--tema-color-accent) 20%, var(--tema-color-surface))'
                      : 'var(--tema-color-bg)',
                    color: isSelected ? 'var(--tema-color-accent-ink)' : 'var(--tema-color-text)',
                    fontFamily: 'var(--tema-font-mono)',
                  }}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 text-[var(--tema-color-accent)]" />}
                  <span>{slot}</span>
                </button>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mandatory Notice */}
      <div
        className="p-3.5 flex items-start gap-2.5 text-xs select-none"
        style={{
          borderRadius: 'var(--tema-radius)',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'var(--tema-color-border)',
          backgroundColor: 'color-mix(in srgb, var(--tema-color-bg) 70%, var(--tema-color-surface))',
          color: 'var(--tema-color-text-muted)',
          fontFamily: 'var(--tema-font-body)',
        }}
      >
        <Info className="w-4 h-4 text-[var(--tema-color-accent-ink)] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-[var(--tema-color-text)]">Aviso: </strong>
          {notice}
        </p>
      </div>
    </div>
  );
}
