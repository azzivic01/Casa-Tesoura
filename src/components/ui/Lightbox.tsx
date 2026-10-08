import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import type { WorkItem } from '../../content';
import { useMotionPreference } from './MotionContext';

export interface LightboxProps {
  item: WorkItem | null;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
}

export function Lightbox({ item, onClose, triggerRef }: LightboxProps) {
  const { isReducedMotion } = useMotionPreference();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!item) return;

    // Focus close button on mount
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    // Keyboard handlers: Escape to close, Tab focus lock
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      // Return focus to trigger button
      triggerRef?.current?.focus();
    };
  }, [item, onClose, triggerRef]);

  return (
    <AnimatePresence>
      {item && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: isReducedMotion ? 0.1 : 0.25 }}
            onClick={onClose}
            aria-label="Fechar ampliação"
            className="absolute inset-0 cursor-pointer"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--tema-color-bg) 88%, transparent)',
              backdropFilter: 'blur(4px)',
            }}
          />

          {/* Modal Content */}
          <div
            ref={modalRef}
            className="relative z-10 w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col"
            style={{
              borderRadius: 'var(--tema-radius-lg)',
              borderWidth: 'var(--tema-border-width)',
              borderStyle: 'solid',
              borderColor: 'var(--tema-color-border)',
              backgroundColor: 'var(--tema-color-surface)',
            }}
          >
            {/* Top Bar with title and close button */}
            <div
              className="flex items-center justify-between px-5 py-3.5"
              style={{
                borderBottom: 'var(--tema-border-width) solid var(--tema-color-border)',
                backgroundColor: 'color-mix(in srgb, var(--tema-color-bg) 50%, var(--tema-color-surface))',
              }}
            >
              <div>
                <span
                  className="text-xs uppercase font-bold tracking-wider"
                  style={{
                    color: 'var(--tema-color-accent-ink)',
                    fontFamily: 'var(--tema-font-mono)',
                  }}
                >
                  {item.category}
                </span>
                <h3
                  id="lightbox-title"
                  className="text-base font-bold text-[var(--tema-color-text)] mt-0.5"
                  style={{
                    fontFamily: 'var(--tema-font-label)',
                    textTransform: 'var(--tema-label-transform)' as React.CSSProperties['textTransform'],
                  }}
                >
                  {item.title}
                </h3>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Fechar imagem ampliada"
                className="p-2 cursor-pointer transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center rounded focus-visible:outline-2 focus-visible:outline-[var(--tema-color-accent-ink)]"
                style={{
                  color: 'var(--tema-color-text)',
                  backgroundColor: 'color-mix(in srgb, var(--tema-color-border) 40%, transparent)',
                }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Shared transition image container */}
            <div className="relative w-full aspect-[4/3] bg-[var(--tema-color-bg)] flex items-center justify-center overflow-hidden">
              <motion.img
                layoutId={isReducedMotion ? undefined : `work-img-${item.id}`}
                src={item.image}
                alt={item.alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover select-none"
              />
            </div>

            {/* Caption */}
            <div className="p-4 text-xs flex items-center justify-between text-[var(--tema-color-text-muted)] border-t border-[var(--tema-color-border)]">
              <span>{item.alt}</span>
              <span className="font-mono text-[11px]">[registro da casa]</span>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
