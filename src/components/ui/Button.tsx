import React from 'react';
import { useMotionPreference } from './MotionContext';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'md' | 'lg';
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', size = 'md', className = '', ...props }, ref) => {
    const { isReducedMotion } = useMotionPreference();

    const isPrimary = variant === 'primary';
    const isOutline = variant === 'outline';

    const baseStyles =
      'group relative inline-flex items-center justify-center font-semibold overflow-hidden select-none transition-all cursor-pointer whitespace-nowrap min-h-[44px] min-w-[44px] focus-visible:outline-2 focus-visible:outline-[var(--tema-color-accent-ink)] focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const sizeStyles =
      size === 'lg'
        ? 'px-6 py-3.5 text-[15px]'
        : 'px-5 py-2.5 text-[14px]';

    return (
      <button
        ref={ref}
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
      </button>
    );
  }
);

Button.displayName = 'Button';
