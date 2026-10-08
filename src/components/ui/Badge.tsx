import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'outline';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const isAccent = variant === 'accent';
  const isOutline = variant === 'outline';

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 text-[12px] font-semibold select-none ${className}`}
      style={{
        borderRadius: 'var(--tema-radius)',
        borderWidth: 'var(--tema-border-width)',
        borderStyle: 'solid',
        borderColor: isAccent
          ? 'var(--tema-color-accent)'
          : isOutline
          ? 'var(--tema-color-border)'
          : 'var(--tema-color-border)',
        backgroundColor: isAccent
          ? 'color-mix(in srgb, var(--tema-color-accent) 15%, var(--tema-color-surface))'
          : 'var(--tema-color-surface)',
        color: isAccent ? 'var(--tema-color-accent-ink)' : 'var(--tema-color-text-muted)',
        fontFamily: 'var(--tema-font-label)',
        textTransform: 'var(--tema-label-transform)' as React.CSSProperties['textTransform'],
        letterSpacing: 'var(--tema-label-tracking)',
      }}
    >
      {children}
    </span>
  );
}
