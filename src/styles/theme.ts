import type { ColorScheme, FontConfig, Settings } from '../types/resume'

// ============================================================
// Color Schemes
// ============================================================

export interface ColorSchemeDefinition {
  primary: string
  accent: string
  body: string
  divider: string
  bg: string
  muted: string
}

export const colorSchemes: Record<ColorScheme, ColorSchemeDefinition> = {
  navy: {
    primary: '#1a365d',
    accent: '#2b6cb0',
    body: '#333333',
    divider: '#1a365d',
    bg: '#ffffff',
    muted: '#718096',
  },
  slate: {
    primary: '#2d3748',
    accent: '#4a5568',
    body: '#1a202c',
    divider: '#2d3748',
    bg: '#ffffff',
    muted: '#718096',
  },
}

// ============================================================
// Typography
// ============================================================

export const typography = {
  name: {
    fontSize: '24pt',
    fontWeight: 700,
    lineHeight: 1.3,
  },
  sectionTitle: {
    fontSize: '13pt',
    fontWeight: 600,
    lineHeight: 1.4,
  },
  itemTitle: {
    fontSize: '11pt',
    fontWeight: 600,
    lineHeight: 1.4,
  },
  body: {
    fontSize: '9.5pt',
    fontWeight: 400,
    lineHeight: 1.5,
  },
  small: {
    fontSize: '8pt',
    fontWeight: 400,
    lineHeight: 1.4,
  },
}

// ============================================================
// Default Fonts
// ============================================================

export const defaultFonts: FontConfig = {
  chinese: 'sans-serif',
  english: 'sans-serif',
}

// ============================================================
// CSS Variables Builder
// ============================================================

export function buildCSSVariables(settings: Settings): Record<string, string> {
  const scheme = colorSchemes[settings.color_scheme || 'navy']
  const font = settings.font || defaultFonts

  return {
    '--font-cn': font.chinese,
    '--font-en': font.english,
    '--font-body': `${font.english}, ${font.chinese}`,

    '--color-primary': scheme.primary,
    '--color-accent': scheme.accent,
    '--color-body': scheme.body,
    '--color-divider': scheme.divider,
    '--color-bg': scheme.bg,
    '--color-muted': scheme.muted,

    '--fs-name': typography.name.fontSize,
    '--fw-name': String(typography.name.fontWeight),
    '--lh-name': String(typography.name.lineHeight),

    '--fs-section': typography.sectionTitle.fontSize,
    '--fw-section': String(typography.sectionTitle.fontWeight),
    '--lh-section': String(typography.sectionTitle.lineHeight),

    '--fs-item': typography.itemTitle.fontSize,
    '--fw-item': String(typography.itemTitle.fontWeight),
    '--lh-item': String(typography.itemTitle.lineHeight),

    '--fs-body': typography.body.fontSize,
    '--fw-body': String(typography.body.fontWeight),
    '--lh-body': String(typography.body.lineHeight),

    '--fs-small': typography.small.fontSize,
    '--fw-small': String(typography.small.fontWeight),
    '--lh-small': String(typography.small.lineHeight),
  }
}
