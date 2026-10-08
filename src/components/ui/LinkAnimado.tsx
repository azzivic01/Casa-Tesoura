import React from 'react';
import { useMotionPreference } from './MotionContext';

export interface LinkAnimadoProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'inline';
  size?: 'md' | 'lg';
}

export function LinkAnimado({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: LinkAnimadoProps) {
  const { isReducedMotion } = useMotionPreference();

  const isPrimary = variant === 'primary';
  const isOutline = variant === 'outline';
  const isInline = variant === 'inline';

  if (isInline) {
    return (
      <a
        className={`group relative inline-flex items-center gap-1 font-medium transition-colors focus-visible:outline-2 focus-visible:outline-[var(--tema-color-accent-ink)] focus-visible:outline-offset-2 min-h-[44px] ${className}`}
        style={{
          color: 'var(--tema-color-accent-ink)',
          fontFamily: 'var(--tema-font-body)',
        }}
        {...props}
      >
        <span>{children}</span>
        <span
          aria-hidden="true"
          className="absolute bottom-1 left-0 w-full h-[2px] transition-transform origin-left group-hover:scale-x-100 scale-x-0"
          style={{
            backgroundColor: 'var(--tema-color-accent)',
            transitionDuration: 'var(--motion-duration-fast)',
            transitionTimingFunction: 'var(--motion-easing-base)',
          }}
        />
      </a>
    );
  }

  const baseStyles =
    'group relative inline-flex items-center justify-center font-semibold overflow-hidden select-none transition-all cursor-pointer whitespace-nowrap min-h-[44px] min-w-[44px] focus-visible:outline-2 focus-visible:outline-[var(--tema-color-accent-ink)] focus-visible:outline-offset-2 no-underline';

  const sizeStyles =
    size === 'lg'
      ? 'px-6 py-3.5 text-[15px]'
      : 'px-5 py-2.5 text-[14px]';

  return (
    <a
      className={`${baseStyles} ${sizeStyles} ${className}`}
      style={{
        borderRadius: 'var(--tema-radius)',
        borderWidth: 'var(--tema-border-width)',
        borderStyle: 'solid',
        borderColor: isPrimary
          ? 'var(--tema-color-accent)'
          : 'var(--tema-color-border)',
        backgroundColor: isPrimary
          ? 'var(--tema-color-accent)'
          : isOutline
          ? 'transparent'
          : 'var(--tema-color-surface)',
        color: isPrimary
          ? 'var(--tema-color-on-accent)'
          : 'var(--tema-color-text)',
        fontFamily: 'var(--tema-font-label)',
        textTransform: 'var(--tema-label-transform)' as React.CSSProperties['textTransform'],
        letterSpacing: 'var(--tema-label-tracking)',
      }}
      {...props}
    >
      {/* Diagonal sweep fill overlay on hover */}
      {!isReducedMotion ? (
        <span
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none transform -translate-x-[115%] skew-x-[-20deg] transition-transform group-hover:translate-x-0"
          style={{
            backgroundColor: isPrimary
              ? 'var(--tema-color-accent-ink)'
              : 'color-mix(in srgb, var(--tema-color-accent) 20%, transparent)',
            transitionDuration: 'var(--motion-duration-base)',
            transitionTimingFunction: 'var(--motion-easing-cinematic)',
            width: '140%',
          }}
        />
      ) : null}

      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </a>
  );
}
