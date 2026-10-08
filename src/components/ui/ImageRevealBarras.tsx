import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useMotionPreference } from './MotionContext';

export interface ImageRevealBarrasProps {
  src: string;
  alt: string;
  aspect?: '16/9' | '4/3' | '3/4' | '1/1';
  className?: string;
  priority?: boolean;
}

export function ImageRevealBarras({
  src,
  alt,
  aspect = '16/9',
  className = '',
}: ImageRevealBarrasProps) {
  const { isReducedMotion } = useMotionPreference();
  const [hasError, setHasError] = useState(false);

  const aspectClass =
    aspect === '16/9'
      ? 'aspect-[16/9]'
      : aspect === '4/3'
      ? 'aspect-[4/3]'
      : aspect === '3/4'
      ? 'aspect-[3/4]'
      : 'aspect-square';

  return (
    <div
      className={`relative overflow-hidden w-full ${aspectClass} ${className}`}
      style={{
        borderRadius: 'var(--tema-radius-lg)',
        borderWidth: 'var(--tema-border-width)',
        borderStyle: 'solid',
        borderColor: 'var(--tema-color-border)',
        backgroundColor: 'var(--tema-color-surface)',
      }}
    >
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className="w-full h-full object-cover block"
          loading="lazy"
        />
      ) : (
        <div
          className="w-full h-full flex flex-col items-center justify-center p-6 text-center select-none"
          style={{
            backgroundColor: 'var(--tema-color-surface)',
            color: 'var(--tema-color-text-muted)',
            fontFamily: 'var(--tema-font-mono)',
          }}
        >
          <span className="text-sm font-semibold">[detalhe fotográfico do ofício]</span>
          <span className="text-xs mt-1 text-[var(--tema-color-text-muted)]">{alt}</span>
        </div>
      )}

      {/* 3 Horizontal shutter bars that reveal in sequence */}
      {!isReducedMotion ? (
        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              initial={{ scaleX: 1 }}
              whileInView={{ scaleX: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                transformOrigin: 'right',
                backgroundColor: index % 2 === 0 ? 'var(--tema-color-surface)' : 'var(--tema-color-bg)',
                borderBottom: index < 2 ? '1px solid var(--tema-color-border)' : 'none',
              }}
              className="flex-1 w-full"
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
