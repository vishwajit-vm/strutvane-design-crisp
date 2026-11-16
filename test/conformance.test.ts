// @vitest-environment jsdom
/**
 * The Design contract's conformance suite (blueprint §5.1): slots, WCAG AA contrast in both
 * themes at every brand hue, no hard-coded colours outside src/tokens.ts, the four public
 * override tokens, no overflow at 375 px, and axe with 0 violations on every reference screen.
 */
import { designConformance } from '@strutvane/ui/testing'
import { crisp } from '../src/index.ts'

designConformance(crisp, { sources: ['src'], tokenFiles: ['src/tokens.ts'] })
