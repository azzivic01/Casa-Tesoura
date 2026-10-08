import React from 'react';
import type { TeamMember } from '../../content';

export interface CartaoEquipeProps {
  member: TeamMember;
}

export function CartaoEquipe({ member }: CartaoEquipeProps) {
  return (
    <div
      className="p-5 flex flex-col items-center text-center transition-transform hover:-translate-y-1"
      style={{
        borderRadius: 'var(--tema-radius-lg)',
        borderWidth: 'var(--tema-border-width)',
        borderStyle: 'solid',
        borderColor: 'var(--tema-color-border)',
        backgroundColor: 'var(--tema-color-surface)',
        transitionDuration: 'var(--motion-duration-base)',
        transitionTimingFunction: 'var(--motion-easing-cinematic)',
      }}
    >
      {/* Square photo placeholder with dashed border */}
      <div
        className="w-full aspect-square max-w-[200px] flex items-center justify-center mb-4 select-none"
        style={{
          borderRadius: 'var(--tema-radius)',
          borderWidth: 'var(--tema-border-width)',
          borderStyle: 'dashed',
          borderColor: 'var(--tema-color-border)',
          backgroundColor: 'color-mix(in srgb, var(--tema-color-bg) 60%, var(--tema-color-surface))',
          color: 'var(--tema-color-text-muted)',
          fontFamily: 'var(--tema-font-mono)',
        }}
      >
        <span className="text-sm font-semibold">{member.photoPlaceholder}</span>
      </div>

      <h3
        className="text-[17px] font-bold mb-1"
        style={{
          fontFamily: 'var(--tema-font-label)',
          textTransform: 'var(--tema-label-transform)' as React.CSSProperties['textTransform'],
          letterSpacing: 'var(--tema-label-tracking)',
          color: 'var(--tema-color-text)',
        }}
      >
        {member.name}
      </h3>

      <p
        className="text-[14px]"
        style={{
          color: 'var(--tema-color-text-muted)',
          fontFamily: 'var(--tema-font-body)',
        }}
      >
        {member.specialty}
      </p>
    </div>
  );
}
