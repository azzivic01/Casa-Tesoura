import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2 } from 'lucide-react';
import type { WorkItem } from '../../content';
import { Lightbox } from './Lightbox';
import { useMotionPreference } from './MotionContext';

export interface GaleriaFiltroProps {
  categories: Array<'Todos' | 'Cortes' | 'Barbas' | 'Ambiente'>;
  items: WorkItem[];
}

export function GaleriaFiltro({ categories, items }: GaleriaFiltroProps) {
  const { isReducedMotion } = useMotionPreference();
  const [activeCategory, setActiveCategory] = useState<'Todos' | 'Cortes' | 'Barbas' | 'Ambiente'>('Todos');
  const [selectedItem, setSelectedItem] = useState<WorkItem | null>(null);
  const activeTriggerRef = useRef<HTMLButtonElement | null>(null);

  const filteredItems = items.filter(
    (item) => activeCategory === 'Todos' || item.category === activeCategory
  );

  return (
    <div className="w-full space-y-6">
      {/* Category Filter Controls */}
      <div
        role="toolbar"
        aria-label="Filtrar galeria de trabalhos"
        className="flex flex-wrap items-center justify-center gap-2"
      >
        {categories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={isActive}
              className="min-h-[44px] px-5 py-2 text-xs font-semibold select-none cursor-pointer transition-all focus-visible:outline-2 focus-visible:outline-[var(--tema-color-accent-ink)] focus-visible:outline-offset-2"
              style={{
                borderRadius: 'var(--tema-radius)',
                borderWidth: 'var(--tema-border-width)',
                borderStyle: 'solid',
                borderColor: isActive ? 'var(--tema-color-accent)' : 'var(--tema-color-border)',
                backgroundColor: isActive
                  ? 'var(--tema-color-accent)'
                  : 'var(--tema-color-surface)',
                color: isActive ? 'var(--tema-color-on-accent)' : 'var(--tema-color-text)',
                fontFamily: 'var(--tema-font-label)',
                textTransform: 'var(--tema-label-transform)' as React.CSSProperties['textTransform'],
                letterSpacing: 'var(--tema-label-tracking)',
              }}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Grid of items */}
      <motion.div
        layout={!isReducedMotion}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout={!isReducedMotion}
              initial={isReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={isReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative flex flex-col overflow-hidden"
              style={{
                borderRadius: 'var(--tema-radius-lg)',
                borderWidth: 'var(--tema-border-width)',
                borderStyle: 'solid',
                borderColor: 'var(--tema-color-border)',
                backgroundColor: 'var(--tema-color-surface)',
              }}
            >
              {/* Image trigger container */}
              <button
                type="button"
                onClick={(e) => {
                  activeTriggerRef.current = e.currentTarget;
                  setSelectedItem(item);
                }}
                className="relative aspect-[4/3] w-full overflow-hidden text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--tema-color-accent-ink)] focus-visible:outline-offset-2"
                aria-label={`Ampliar imagem: ${item.title}`}
              >
                <motion.img
                  layoutId={isReducedMotion ? undefined : `work-img-${item.id}`}
                  src={item.image}
                  alt={item.alt}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  style={{
                    transitionDuration: 'var(--motion-duration-slow)',
                    transitionTimingFunction: 'var(--motion-easing-cinematic)',
                  }}
                />

                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none"
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--tema-color-bg) 60%, transparent)',
                    transitionDuration: 'var(--motion-duration-base)',
                  }}
                >
                  <div
                    className="p-3 rounded-full"
                    style={{
                      backgroundColor: 'var(--tema-color-accent)',
                      color: 'var(--tema-color-on-accent)',
                    }}
                  >
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>
              </button>

              {/* Information bar */}
              <div
                className="p-4 flex items-center justify-between"
                style={{
                  borderTop: '1px solid var(--tema-color-border)',
                }}
              >
                <div>
                  <span
                    className="text-[11px] font-bold block"
                    style={{
                      color: 'var(--tema-color-accent-ink)',
                      fontFamily: 'var(--tema-font-mono)',
                    }}
                  >
                    {item.category}
                  </span>
                  <h3
                    className="text-[14px] font-semibold text-[var(--tema-color-text)] mt-0.5"
                    style={{
                      fontFamily: 'var(--tema-font-body)',
                    }}
                  >
                    {item.title}
                  </h3>
                </div>

                <span
                  className="text-xs px-2 py-0.5"
                  style={{
                    fontFamily: 'var(--tema-font-mono)',
                    color: 'var(--tema-color-text-muted)',
                  }}
                >
                  [recorte]
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Modal with shared layoutId */}
      <Lightbox
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        triggerRef={activeTriggerRef}
      />
    </div>
  );
}
