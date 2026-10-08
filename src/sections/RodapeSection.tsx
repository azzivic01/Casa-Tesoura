import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import type { SiteContent } from '../content';
import { useMotionPreference } from '../components/ui/MotionContext';

export interface RodapeSectionProps {
  content: SiteContent['rodape'];
}

export function RodapeSection({ content }: RodapeSectionProps) {
  const { isReducedMotion, toggleReducedMotion } = useMotionPreference();

  if (!content.enabled) return null;

  return (
    <footer
      id="rodape"
      role="contentinfo"
      className="w-full py-12 border-t border-[var(--tema-color-border)]"
      style={{
        backgroundColor: 'var(--tema-color-bg)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[var(--tema-color-border)]">
          {/* Brand & Tagline */}
          <div className="space-y-2">
            <span
              className="text-2xl font-black tracking-tight"
              style={{
                fontFamily: 'var(--tema-font-display)',
                textTransform: 'var(--tema-display-transform)' as React.CSSProperties['textTransform'],
                color: 'var(--tema-color-text)',
              }}
            >
              {content.brand}
            </span>
            <p
              className="text-sm text-[var(--tema-color-text-muted)] max-w-sm"
              style={{
                fontFamily: 'var(--tema-font-body)',
              }}
            >
              {content.tagline}
            </p>
          </div>

          {/* Navigation Links */}
          <nav
            aria-label="Links do rodapé"
            className="flex flex-wrap items-center gap-6"
          >
            {content.navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs font-semibold py-2 transition-colors hover:text-[var(--tema-color-accent-ink)] focus-visible:outline-2 focus-visible:outline-[var(--tema-color-accent-ink)]"
                style={{
                  fontFamily: 'var(--tema-font-label)',
                  textTransform: 'var(--tema-label-transform)' as React.CSSProperties['textTransform'],
                  letterSpacing: 'var(--tema-label-tracking)',
                  color: 'var(--tema-color-text-muted)',
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Legal, Social & Accessibility Control */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-xs text-[var(--tema-color-text-muted)]">
          <div
            className="flex flex-wrap items-center gap-4"
            style={{
              fontFamily: 'var(--tema-font-mono)',
            }}
          >
            <span>CNPJ: {content.cnpj}</span>
            <span aria-hidden="true">·</span>
            <span>Redes: {content.social}</span>
          </div>

          {/* Botão acessível: Reduzir Animações */}
          <button
            type="button"
            onClick={toggleReducedMotion}
            aria-pressed={isReducedMotion}
            className="inline-flex items-center gap-2 px-3.5 py-2 cursor-pointer transition-all min-h-[44px] focus-visible:outline-2 focus-visible:outline-[var(--tema-color-accent-ink)] focus-visible:outline-offset-2"
            style={{
              borderRadius: 'var(--tema-radius)',
              borderWidth: 'var(--tema-border-width)',
              borderStyle: 'solid',
              borderColor: isReducedMotion ? 'var(--tema-color-accent)' : 'var(--tema-color-border)',
              backgroundColor: isReducedMotion
                ? 'color-mix(in srgb, var(--tema-color-accent) 20%, var(--tema-color-surface))'
                : 'var(--tema-color-surface)',
              color: isReducedMotion ? 'var(--tema-color-accent-ink)' : 'var(--tema-color-text-muted)',
              fontFamily: 'var(--tema-font-mono)',
            }}
          >
            {isReducedMotion ? (
              <EyeOff className="w-4 h-4 text-[var(--tema-color-accent)]" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
            <span>
              {content.reduceMotionLabel}: {isReducedMotion ? 'Ligado' : 'Desligado'}
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
