import React, { useState, useMemo } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import type { ServiceItem } from '../../content';

export interface TabelaServicosProps {
  caption: string;
  items: ServiceItem[];
  note: string;
}

type SortField = 'name' | 'price' | null;
type SortOrder = 'ascending' | 'descending' | 'none';

export function TabelaServicos({ caption, items, note }: TabelaServicosProps) {
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('none');

  const handleSort = (field: SortField) => {
    if (sortField !== field) {
      setSortField(field);
      setSortOrder('ascending');
    } else if (sortOrder === 'ascending') {
      setSortOrder('descending');
    } else {
      setSortField(null);
      setSortOrder('none');
    }
  };

  const sortedItems = useMemo(() => {
    if (!sortField || sortOrder === 'none') return items;
    return [...items].sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      const cmp = valA.localeCompare(valB, 'pt-BR');
      return sortOrder === 'ascending' ? cmp : -cmp;
    });
  }, [items, sortField, sortOrder]);

  const getAriaSort = (field: SortField): React.AriaAttributes['aria-sort'] => {
    if (sortField !== field) return 'none';
    return sortOrder === 'ascending' ? 'ascending' : 'descending';
  };

  return (
    <div className="w-full space-y-3">
      {/* Scrollable table container */}
      <div
        tabIndex={0}
        role="region"
        aria-label="Tabela de serviços e valores"
        className="overflow-x-auto focus-visible:outline-2 focus-visible:outline-[var(--tema-color-accent-ink)] focus-visible:outline-offset-2"
        style={{
          borderRadius: 'var(--tema-radius-lg)',
          borderWidth: 'var(--tema-border-width)',
          borderStyle: 'solid',
          borderColor: 'var(--tema-color-border)',
          backgroundColor: 'var(--tema-color-surface)',
        }}
      >
        <table className="w-full min-w-[540px] text-left border-collapse">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr
              style={{
                borderBottom: 'var(--tema-border-width) solid var(--tema-color-border)',
                backgroundColor: 'color-mix(in srgb, var(--tema-color-bg) 60%, var(--tema-color-surface))',
              }}
            >
              <th
                scope="col"
                aria-sort={getAriaSort('name')}
                className="py-3.5 px-4 text-xs font-semibold select-none"
                style={{
                  fontFamily: 'var(--tema-font-label)',
                  textTransform: 'var(--tema-label-transform)' as React.CSSProperties['textTransform'],
                  letterSpacing: 'var(--tema-label-tracking)',
                  color: 'var(--tema-color-text)',
                }}
              >
                <button
                  type="button"
                  onClick={() => handleSort('name')}
                  className="inline-flex items-center gap-2 cursor-pointer min-h-[44px] px-1 hover:text-[var(--tema-color-accent-ink)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--tema-color-accent-ink)]"
                  aria-label="Ordenar por nome do serviço"
                >
                  <span>Serviço</span>
                  {sortField === 'name' ? (
                    sortOrder === 'ascending' ? (
                      <ArrowUp className="w-4 h-4 text-[var(--tema-color-accent)]" />
                    ) : (
                      <ArrowDown className="w-4 h-4 text-[var(--tema-color-accent)]" />
                    )
                  ) : (
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-60" />
                  )}
                </button>
              </th>

              <th
                scope="col"
                className="py-3.5 px-4 text-xs font-semibold select-none"
                style={{
                  fontFamily: 'var(--tema-font-label)',
                  textTransform: 'var(--tema-label-transform)' as React.CSSProperties['textTransform'],
                  letterSpacing: 'var(--tema-label-tracking)',
                  color: 'var(--tema-color-text-muted)',
                }}
              >
                Tempo estimado
              </th>

              <th
                scope="col"
                aria-sort={getAriaSort('price')}
                className="py-3.5 px-4 text-xs font-semibold select-none text-right"
                style={{
                  fontFamily: 'var(--tema-font-label)',
                  textTransform: 'var(--tema-label-transform)' as React.CSSProperties['textTransform'],
                  letterSpacing: 'var(--tema-label-tracking)',
                  color: 'var(--tema-color-text)',
                }}
              >
                <button
                  type="button"
                  onClick={() => handleSort('price')}
                  className="inline-flex items-center gap-2 cursor-pointer min-h-[44px] px-1 ml-auto hover:text-[var(--tema-color-accent-ink)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--tema-color-accent-ink)]"
                  aria-label="Ordenar por valor do serviço"
                >
                  <span>Valor</span>
                  {sortField === 'price' ? (
                    sortOrder === 'ascending' ? (
                      <ArrowUp className="w-4 h-4 text-[var(--tema-color-accent)]" />
                    ) : (
                      <ArrowDown className="w-4 h-4 text-[var(--tema-color-accent)]" />
                    )
                  ) : (
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-60" />
                  )}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedItems.map((item, index) => (
              <tr
                key={item.id}
                className="transition-colors hover:bg-[color-mix(in_srgb,var(--tema-color-accent)_6%,var(--tema-color-surface))]"
                style={{
                  borderBottom:
                    index < sortedItems.length - 1
                      ? '1px solid var(--tema-color-border)'
                      : 'none',
                }}
              >
                <td
                  className="py-4 px-4 text-[15px] font-medium"
                  style={{
                    color: 'var(--tema-color-text)',
                    fontFamily: 'var(--tema-font-body)',
                  }}
                >
                  {item.name}
                </td>
                <td
                  className="py-4 px-4 text-[14px]"
                  style={{
                    color: 'var(--tema-color-text-muted)',
                    fontFamily: 'var(--tema-font-mono)',
                  }}
                >
                  {item.duration}
                </td>
                <td
                  className="py-4 px-4 text-[15px] font-bold text-right tabular-nums"
                  style={{
                    color: 'var(--tema-color-accent-ink)',
                    fontFamily: 'var(--tema-font-mono)',
                  }}
                >
                  {item.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Observação fixa */}
      <p
        className="text-xs text-right pr-2"
        style={{
          color: 'var(--tema-color-text-muted)',
          fontFamily: 'var(--tema-font-mono)',
        }}
      >
        * {note}
      </p>
    </div>
  );
}
