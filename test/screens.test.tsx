// @vitest-environment jsdom
/**
 * Beyond the kit's light-theme pass: every reference screen in DARK, and with every public
 * override applied, still has 0 axe violations and nothing that can overflow a 375 px phone.
 * Crisp's slots also never write an inline `style` attribute (a strict CSP blocks those; only
 * the injected `<style nonce>` is allowed).
 */
import {
  axeViolations,
  checkOverflowDom,
  REFERENCE_SCREENS,
  renderReferenceScreen,
} from '@strutvane/ui/testing'
import { describe, expect, it } from 'vitest'
import { crisp } from '../src/index.ts'

describe('reference screens in the dark theme', () => {
  for (const name of REFERENCE_SCREENS) {
    it(`${name}: 0 axe violations, no overflow, no inline styles`, async () => {
      const screen = await renderReferenceScreen(crisp, name, { theme: 'dark' })
      try {
        const root = screen.container.querySelector('[data-sv-design="crisp"]')
        expect(root?.getAttribute('data-sv-theme')).toBe('dark')
        expect(await axeViolations(screen.container)).toEqual([])
        expect(checkOverflowDom(screen.container)).toEqual([])
        expect(screen.container.querySelectorAll('[style]')).toHaveLength(0)
      } finally {
        await screen.unmount()
      }
    })
  }
})

describe('reference screens with every override applied', () => {
  for (const name of ['list', 'form-errors'] as const) {
    it(`${name}: brand hue, font, radius and density overrides keep it accessible`, async () => {
      const screen = await renderReferenceScreen(crisp, name, {
        overrides: { brandHue: 150, fontSans: 'Georgia, serif', radius: '2px', density: 0.75 },
      })
      try {
        const css = screen.container.querySelector('style')?.textContent ?? ''
        expect(css).toContain('[data-sv-design="crisp"]{--brand-hue:150;')
        expect(await axeViolations(screen.container)).toEqual([])
        expect(checkOverflowDom(screen.container)).toEqual([])
      } finally {
        await screen.unmount()
      }
    })
  }
})
