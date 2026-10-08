import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import type { FaqItem } from '../../content';
import { useMotionPreference } from './MotionContext';

export interface AccordionProps {
  items: FaqItem[];
}

export function Accordion({ items }: AccordionProps) {
  const { isReducedMotion } = useMotionPreference();
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full space-y-3">
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);

        return (
          <div
            key={item.id}
            className="overflow-hidden transition-colors"
            style={{
              borderRadius: 'var(--tema-radius)',
              borderWidth: 'var(--tema-border-width)',
              borderStyle: 'solid',
              borderColor: isOpen ? 'var(--tema-color-accent)' : 'var(--tema-color-border)',
              backgroundColor: 'var(--tema-color-surface)',
            }}
          >
            <h3>
              <button
                type="button"
                id={`accordion-btn-${item.id}`}
                aria-expanded={isOpen}
                aria-controls={`accordion-panel-${item.id}`}
                onClick={() => toggleItem(item.id)}
                className="w-full min-h-[48px] py-3.5 px-5 flex items-center justify-between text-left cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-[var(--tema-color-accent-ink)] focus-visible:outline-offset-2"
                style={{
                  fontFamily: 'var(--tema-font-label)',
                  color: 'var(--tema-color-text)',
                }}
              >
                <span className="text-[15px] font-semibold pr-4">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 shrink-0 text-[var(--tema-color-accent-ink)] transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  style={{
                    transitionDuration: 'var(--motion-duration-base)',
                  }}
                />
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`accordion-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`accordion-btn-${item.id}`}
                  initial={isReducedMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
                  animate={isReducedMotion ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                  exit={isReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{
                    duration: 0.25,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="overflow-hidden"
                >
                  <div
                    className="p-5 pt-0 text-[14px] leading-relaxed"
                    style={{
                      color: 'var(--tema-color-text-muted)',
                      fontFamily: 'var(--tema-font-body)',
                      borderTop: '1px solid var(--tema-color-border)',
                      marginTop: '4px',
                    }}
                  >
                    <div className="pt-3">{item.answer}</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
