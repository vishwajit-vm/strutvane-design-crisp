/**
 * Crisp's tokens: every colour, shadow and size of the design, for light and dark.
 *
 * This is the ONLY file of the package that may hold colour literals. The conformance kit's
 * "no hard-coded colours" rule scans every other source file and the generated stylesheet, so
 * the shell, the skins and the illustrations can only name a role (`var(--sv-surface)`), never a
 * colour. That is what lets dark mode, an app's brand hue and the contrast check reach every
 * colour on screen.
 *
 * Why the accent is `oklch(L C var(--brand-hue))` and not a hex value: an app rebrands Crisp by
 * setting one number (`--brand-hue`), and every accent role follows. The lightness and chroma
 * below were chosen so that every pair the behaviour renders stays WCAG AA at EVERY hue
 * (0–345° in 15° steps, the conformance kit's sweep), not only at Crisp's own cobalt (272°). The
 * hardest hue is teal (195°), which is why the light accent is a touch darker than the mockup's.
 *
 * Why `input` is darker than the mockup's hairline: a form control's outline must reach 3:1
 * against the surface it sits on (WCAG 1.4.11). The mockup's calm `#d4d4d8` was 1.5:1; Crisp now
 * uses a mid grey that meets 3:1 in both themes and keeps the quiet hairlines for structure.
 *
 * @module
 */
import type { ChartPalette, PublicDefaults, ScaleTokens, ThemeTokens } from '@strutvane/ui/design'

/**
 * Crisp's defaults for the public override tokens: cobalt (272°), 6 px controls, density 1.
 *
 * @example
 * CRISP_DEFAULTS.brandHue // 272
 */
export const CRISP_DEFAULTS: PublicDefaults = Object.freeze({
  brandHue: 272,
  radius: '6px',
  density: 1,
})

/**
 * The light theme: zinc-tinted neutrals, one cobalt accent, quiet status tints.
 *
 * @example
 * crispLight.color.surface // '#ffffff'
 */
export const crispLight: ThemeTokens = Object.freeze({
  color: Object.freeze({
    bg: '#f7f7f8',
    surface: '#ffffff',
    surfaceSubtle: '#f4f4f5',
    surfaceMuted: '#ebebed',
    fg: '#0b0b0f',
    fgMuted: '#52525b',
    border: '#e6e6e9',
    input: '#8a8a93',
    accent: 'oklch(0.51 0.195 var(--brand-hue))',
    accentHover: 'oklch(0.46 0.19 var(--brand-hue))',
    accentFg: '#ffffff',
    accentSubtle: 'oklch(0.957 0.018 var(--brand-hue))',
    accentText: 'oklch(0.48 0.19 var(--brand-hue))',
    ring: 'oklch(0.51 0.195 var(--brand-hue))',
    danger: '#c9372c',
    dangerHover: '#b22d23',
    dangerFg: '#ffffff',
    dangerSubtle: '#fdeceb',
    dangerText: '#b42318',
    success: '#1f9d55',
    successSubtle: '#e9f6ef',
    successText: '#157046',
    warning: '#d98b00',
    warningSubtle: '#fdf4e3',
    warningText: '#8a5300',
    overlay: 'rgb(9 9 11 / 0.32)',
    mark: '#fdf0c4',
    markFg: '#0b0b0f',
  }),
  shadow: Object.freeze({
    sm: '0 1px 2px rgb(16 16 24 / 0.06), 0 1px 1px rgb(16 16 24 / 0.03)',
    pop: '0 0 0 1px rgb(16 16 24 / 0.04), 0 4px 8px -2px rgb(16 16 24 / 0.08), 0 16px 32px -8px rgb(16 16 24 / 0.14)',
  }),
})

/**
 * The dark theme: designed, not inverted. Its own surfaces, a lighter ring and accent text, and
 * deep status tints, each contrast-checked.
 *
 * @example
 * crispDark.color.surface // '#111113'
 */
export const crispDark: ThemeTokens = Object.freeze({
  color: Object.freeze({
    bg: '#09090b',
    surface: '#111113',
    surfaceSubtle: '#18181b',
    surfaceMuted: '#222226',
    fg: '#ededef',
    fgMuted: '#a1a1aa',
    border: '#232327',
    input: '#65656d',
    accent: 'oklch(0.52 0.165 var(--brand-hue))',
    accentHover: 'oklch(0.48 0.16 var(--brand-hue))',
    accentFg: '#ffffff',
    accentSubtle: 'oklch(0.248 0.053 var(--brand-hue))',
    accentText: 'oklch(0.75 0.13 var(--brand-hue))',
    ring: 'oklch(0.68 0.17 var(--brand-hue))',
    danger: '#d4392e',
    dangerHover: '#bd3128',
    dangerFg: '#ffffff',
    dangerSubtle: '#2c1313',
    dangerText: '#ff8a80',
    success: '#30a46c',
    successSubtle: '#0f2419',
    successText: '#4cc38a',
    warning: '#e5a000',
    warningSubtle: '#2a1f0b',
    warningText: '#f2b84b',
    overlay: 'rgb(0 0 0 / 0.6)',
    mark: '#4a3b00',
    markFg: '#fff6cc',
  }),
  shadow: Object.freeze({
    sm: '0 1px 2px rgb(0 0 0 / 0.5)',
    pop: '0 0 0 1px rgb(255 255 255 / 0.06), 0 8px 16px -4px rgb(0 0 0 / 0.5), 0 24px 48px -12px rgb(0 0 0 / 0.6)',
  }),
})

/**
 * Crisp's sizes. Radii follow `--radius` (6 px by default: 3 / 6 / 9 px), controls and rows
 * follow `--density` (32 px controls and 40 px rows at density 1), on a strict 4 px grid.
 *
 * @example
 * crispScale.controlHeight // 'calc(32px * var(--density))'
 */
export const crispScale: ScaleTokens = Object.freeze({
  radiusSm: 'calc(var(--radius) * 0.5)',
  radiusMd: 'var(--radius)',
  radiusLg: 'calc(var(--radius) * 1.5)',
  controlHeight: 'calc(32px * var(--density))',
  rowHeight: 'calc(40px * var(--density))',
  space: 'calc(4px * var(--density))',
  sidebarWidth: '240px',
  fontSizeSm: '0.75rem',
  fontSize: '0.8125rem',
  fontSizeLg: '1.25rem',
})

/**
 * Chart colours: the accent leads, then quiet neutrals, so one series always stands out
 * (DESIGN.md §6). Series 1 follows `--brand-hue` and keeps 3:1 against the surface.
 *
 * @example
 * crispChartPalette.light[0] // 'oklch(0.51 0.195 var(--brand-hue))'
 */
export const crispChartPalette: ChartPalette = Object.freeze({
  light: Object.freeze([
    'oklch(0.51 0.195 var(--brand-hue))',
    'oklch(0.78 0.09 var(--brand-hue))',
    '#a1a1aa',
    '#d4d4d8',
  ] as const),
  dark: Object.freeze([
    'oklch(0.68 0.17 var(--brand-hue))',
    'oklch(0.43 0.12 var(--brand-hue))',
    '#71717a',
    '#3a3a41',
  ] as const),
})
