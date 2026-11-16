/**
 * Crisp's tokens: the two known gaps from the mockup audit are fixed and stay fixed, the accent
 * follows `--brand-hue` everywhere, the defaults land on Crisp's cobalt, and the scales follow the
 * public `--radius` and `--density` tokens.
 */
import { contrastRatio, parseColor, resolveDesignTokens } from '@strutvane/ui/design'
import { checkContrast, HUE_STEPS } from '@strutvane/ui/testing'
import { describe, expect, it } from 'vitest'
import {
  CRISP_DEFAULTS,
  crisp,
  crispChartPalette,
  crispDark,
  crispLight,
  crispScale,
} from '../src/index.ts'

const THEMES = [
  ['light', crispLight],
  ['dark', crispDark],
] as const

/** Contrast of two resolved custom properties at one hue and theme. */
function ratio(theme: 'light' | 'dark', fg: string, bg: string, brandHue: number): number {
  const tokens = resolveDesignTokens(crisp, theme, { brandHue })
  const a = parseColor(tokens.get(fg) ?? '')
  const b = parseColor(tokens.get(bg) ?? '')
  if (!a || !b) throw new Error(`${fg} or ${bg} is not a colour`)
  return contrastRatio(a, b)
}

describe('known gap 1: the input outline reaches 3:1 against its surface (WCAG 1.4.11)', () => {
  for (const theme of ['light', 'dark'] as const) {
    it(`${theme}: --sv-input on --sv-surface and on --sv-bg`, () => {
      expect(ratio(theme, '--sv-input', '--sv-surface', 272)).toBeGreaterThanOrEqual(3)
      expect(ratio(theme, '--sv-input', '--sv-bg', 272)).toBeGreaterThanOrEqual(3)
    })
  }
})

describe('known gap 2: no hex accents; every accent role follows --brand-hue', () => {
  const accentRoles = ['accent', 'accentHover', 'accentSubtle', 'accentText', 'ring'] as const
  for (const [name, theme] of THEMES) {
    it(`${name}: accent roles and chart series 1–2 are oklch() of var(--brand-hue)`, () => {
      for (const role of accentRoles) expect(theme.color[role]).toMatch(/var\(--brand-hue\)\)$/)
      const palette = crispChartPalette[name]
      expect(palette[0]).toMatch(/var\(--brand-hue\)\)$/)
      expect(palette[1]).toMatch(/var\(--brand-hue\)\)$/)
    })
  }

  it('changing --brand-hue changes every accent role in both themes', () => {
    for (const theme of ['light', 'dark'] as const) {
      const cobalt = resolveDesignTokens(crisp, theme)
      const green = resolveDesignTokens(crisp, theme, { brandHue: 150 })
      for (const v of ['--sv-accent', '--sv-accent-hover', '--sv-accent-text', '--sv-ring'])
        expect(green.get(v)).not.toBe(cobalt.get(v))
    }
  })
})

describe('contrast', () => {
  it('every required pair meets WCAG AA at all 24 hues, in both themes', () => {
    expect(HUE_STEPS).toHaveLength(24)
    expect(checkContrast(crisp)).toEqual([])
  })

  it('white on the accent stays readable at teal, the hardest hue', () => {
    expect(ratio('light', '--sv-accent-fg', '--sv-accent', 195)).toBeGreaterThanOrEqual(4.5)
    expect(ratio('dark', '--sv-accent-fg', '--sv-accent', 195)).toBeGreaterThanOrEqual(4.5)
  })

  it('the lead chart series keeps 3:1 against the surface at every hue', () => {
    for (const theme of ['light', 'dark'] as const)
      for (const hue of HUE_STEPS)
        expect(ratio(theme, '--sv-chart-1', '--sv-surface', hue)).toBeGreaterThanOrEqual(3)
  })
})

describe('defaults and scales', () => {
  it('defaults to cobalt (272°), a 6 px radius and density 1', () => {
    expect(CRISP_DEFAULTS).toEqual({ brandHue: 272, radius: '6px', density: 1 })
    expect(resolveDesignTokens(crisp, 'light').get('--sv-accent')).toBe('oklch(0.51 0.195 272)')
  })

  it('radii follow --radius and control and row heights follow --density', () => {
    for (const r of ['radiusSm', 'radiusMd', 'radiusLg'] as const)
      expect(crispScale[r]).toContain('var(--radius)')
    for (const d of ['controlHeight', 'rowHeight', 'space'] as const)
      expect(crispScale[d]).toContain('var(--density)')
  })

  it('a density override and the compact list both shrink controls and rows', () => {
    const base = resolveDesignTokens(crisp, 'light')
    const dense = resolveDesignTokens(crisp, 'light', { density: 0.75 })
    const compact = resolveDesignTokens(crisp, 'light', {}, 'compact')
    expect(base.get('--sv-control-height')).not.toBe(dense.get('--sv-control-height'))
    expect(compact.get('--sv-row-height')).toContain('0.8')
  })

  it('tokens are frozen, so an app cannot mutate the shared design by accident', () => {
    expect(Object.isFrozen(crispLight.color)).toBe(true)
    expect(Object.isFrozen(crispDark.shadow)).toBe(true)
    expect(Object.isFrozen(crispScale)).toBe(true)
    expect(Object.isFrozen(crispChartPalette.light)).toBe(true)
  })
})
