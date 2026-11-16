/**
 * Crisp's stylesheet: scoped to the design root, safe to inject under a strict CSP, free of
 * colour literals and remote loads, and using every public override token.
 */
import { designStylesheet, validateDesign } from '@strutvane/ui/design'
import {
  checkOverflowStylesheet,
  checkOverrides,
  findHardCodedColours,
} from '@strutvane/ui/testing'
import { describe, expect, it } from 'vitest'
import { CRISP_STYLESHEET, crisp } from '../src/index.ts'

const ROOT = '[data-sv-design="crisp"]'

/** The selectors of every plain rule (at-rule preludes and keyframe steps excluded). */
function ruleSelectors(css: string): string[] {
  const withoutKeyframes = css.replace(/@keyframes[^{]*\{(?:[^{}]*\{[^{}]*\})*[^{}]*\}/g, '')
  const out: string[] = []
  for (const m of withoutKeyframes.matchAll(/([^{}]+)\{[^{}]*\}/g)) {
    const prelude = (m[1] ?? '').trim()
    // Inside @media the prelude text starts after the at-rule's own brace.
    const selector = prelude.includes('@media') ? (prelude.split('{').pop() ?? '') : prelude
    for (const s of selector.split(',')) if (s.trim() !== '') out.push(s.trim())
  }
  return out
}

describe('the stylesheet', () => {
  it('scopes every rule to the Crisp root, so it never styles the rest of the page', () => {
    const selectors = ruleSelectors(CRISP_STYLESHEET)
    expect(selectors.length).toBeGreaterThan(100)
    expect(selectors.filter((s) => !s.startsWith(ROOT))).toEqual([])
  })

  it('has no colour literal: every colour is a var(--sv-*) role', () => {
    expect(findHardCodedColours('crisp stylesheet', CRISP_STYLESHEET)).toEqual([])
  })

  it('is safe to inject: no style tag, no !important, no imports, urls or expressions', () => {
    expect(CRISP_STYLESHEET).not.toMatch(/<\/?\s*style/i)
    expect(CRISP_STYLESHEET).not.toContain('!important')
    expect(CRISP_STYLESHEET).not.toMatch(/@import|url\(|expression\(|javascript:/i)
    expect(validateDesign(crisp)).toEqual([])
  })

  it('has no fixed width wider than a 375 px phone', () => {
    expect(checkOverflowStylesheet(crisp)).toEqual([])
  })

  it('uses every public override token through the scale and colour roles', () => {
    expect(checkOverrides(crisp)).toEqual([])
    for (const v of ['--sv-accent', '--sv-font-sans', '--sv-radius-md', '--sv-control-height'])
      expect(CRISP_STYLESHEET).toContain(`var(${v}`)
  })

  it('keeps braces balanced, so one bad rule can never swallow the next', () => {
    let depth = 0
    for (const ch of CRISP_STYLESHEET) {
      if (ch === '{') depth++
      if (ch === '}') depth--
      expect(depth).toBeGreaterThanOrEqual(0)
    }
    expect(depth).toBe(0)
  })

  it('turns motion off for people who ask for reduced motion', () => {
    expect(CRISP_STYLESHEET).toContain('@media (prefers-reduced-motion:reduce)')
  })

  it('the generated file (crisp.css) holds both themes, the defaults and Crisp’s rules', () => {
    const css = designStylesheet(crisp)
    expect(css).toContain(':where(:root){--brand-hue:272;')
    expect(css).toContain(`${ROOT}[data-sv-theme="light"]{color-scheme:light;`)
    expect(css).toContain(`${ROOT}[data-sv-theme="dark"]{color-scheme:dark;`)
    expect(css).toContain(CRISP_STYLESHEET)
    expect(designStylesheet(crisp, { overrides: { brandHue: 150 } })).toContain(
      `${ROOT}{--brand-hue:150;}`,
    )
  })
})
