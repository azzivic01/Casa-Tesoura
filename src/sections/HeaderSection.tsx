import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import type { SiteContent } from '../content';
import { LinkAnimado } from '../components/ui/LinkAnimado';

export interface HeaderSectionProps {
  content: SiteContent['header'];
}

export function HeaderSection({ content }: HeaderSectionProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!content.enabled) return null;

  return (
    <header
      id="header"
      className="sticky top-0 z-40 w-full backdrop-blur-md transition-colors"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--tema-color-bg) 92%, transparent)',
        borderBottom: 'var(--tema-border-width) solid var(--tema-color-border)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark (Single text element in display face) */}
        <a
          href="#header"
          className="text-xl sm:text-2xl font-black tracking-tight select-none focus-visible:outline-2 focus-visible:outline-[var(--tema-color-accent-ink)] min-h-[44px] flex items-center"
          style={{
            fontFamily: 'var(--tema-font-display)',
            textTransform: 'var(--tema-display-transform)' as React.CSSProperties['textTransform'],
            color: 'var(--tema-color-text)',
          }}
        >
          {content.brand}
        </a>

        {/* Zone 2: Navigation Links (Clean text links with hover underline) */}
        <nav
          aria-label="Navegação principal"
          className="hidden md:flex items-center gap-6"
        >
          {content.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-semibold transition-colors py-2 px-1 focus-visible:outline-2 focus-visible:outline-[var(--tema-color-accent-ink)]"
              style={{
                fontFamily: 'var(--tema-font-label)',
                textTransform: 'var(--tema-label-transform)' as React.CSSProperties['textTransform'],
                letterSpacing: 'var(--tema-label-tracking)',
                color: 'var(--tema-color-text-muted)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--tema-color-accent-ink)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--tema-color-text-muted)';
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <LinkAnimado
            href={content.primaryAction.href}
            variant="primary"
            size="md"
            aria-label={`${content.primaryAction.label}: abrir agendamento`}
          >
            <span>{content.primaryAction.label}</span>
            <ArrowUpRight className="w-4 h-4" />
          </LinkAnimado>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
            aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            className="md:hidden p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer rounded focus-visible:outline-2 focus-visible:outline-[var(--tema-color-accent-ink)]"
            style={{
              color: 'var(--tema-color-text)',
              borderWidth: 'var(--tema-border-width)',
              borderStyle: 'solid',
              borderColor: 'var(--tema-color-border)',
              backgroundColor: 'var(--tema-color-surface)',
            }}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Menu móvel"
          className="md:hidden px-4 pt-3 pb-6 flex flex-col gap-2"
          style={{
            borderTop: '1px solid var(--tema-color-border)',
            backgroundColor: 'var(--tema-color-surface)',
          }}
        >
          {content.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 px-3 text-sm font-semibold rounded flex items-center justify-between min-h-[44px] focus-visible:outline-2 focus-visible:outline-[var(--tema-color-accent-ink)]"
              style={{
                fontFamily: 'var(--tema-font-label)',
                textTransform: 'var(--tema-label-transform)' as React.CSSProperties['textTransform'],
                letterSpacing: 'var(--tema-label-tracking)',
                color: 'var(--tema-color-text)',
                backgroundColor: 'color-mix(in srgb, var(--tema-color-bg) 40%, var(--tema-color-surface))',
              }}
            >
              <span>{item.label}</span>
              <span className="text-[var(--tema-color-accent-ink)] text-xs">→</span>
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
