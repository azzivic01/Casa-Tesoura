/**
 * Theme design tokens matching CSS variables in :root
 */
export const tokens = {
  colors: {
    bg: '#0F1E24',
    surface: '#16303A',
    border: '#2B4852',
    text: '#F2EEE3',
    textMuted: '#A9B8BA',
    accent: '#F26B3A',
    accentInk: '#FF8A5C',
    onAccent: '#0F1E24',
    deco1: '#F2EEE3',
    deco2: '#F26B3A',
    deco3: '#3FA7A0',
  },
  fonts: {
    display: "'Alfa Slab One', serif",
    body: "'Work Sans', sans-serif",
    label: "'Work Sans', sans-serif",
    mono: "'Courier Prime', monospace",
  },
  shape: {
    radius: '6px',
    radiusLg: '12px',
    borderWidth: '2px',
    shadowHard: 'none',
  },
  typography: {
    labelTransform: 'uppercase',
    labelTracking: '0.12em',
    displayTransform: 'uppercase',
  },
  motion: {
    durationFast: '150ms',
    durationBase: '300ms',
    durationSlow: '700ms',
    durationCinematic: '1000ms',
    durationFastSec: 0.15,
    durationBaseSec: 0.3,
    durationSlowSec: 0.7,
    durationCinematicSec: 1.0,
    easingBase: [0.4, 0, 0.2, 1] as const,
    easingCinematic: [0.16, 1, 0.3, 1] as const,
    staggerSec: 0.08,
  },
} as const;

export type Tokens = typeof tokens;
