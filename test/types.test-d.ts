/**
 * Type-level tests: the public types accept what they should and reject misuse at compile time.
 */
import type { Design, ThemeTokens } from '@strutvane/ui/design'
import IconPlane from '@tabler/icons-react/icons/IconPlane'
import { describe, expectTypeOf, it } from 'vitest'
import {
  type CrispIconComponent,
  type CrispOptions,
  createCrisp,
  crisp,
  crispLight,
} from '../src/index.ts'

describe('public types', () => {
  it('crisp and createCrisp() are Designs', () => {
    expectTypeOf(crisp).toEqualTypeOf<Design>()
    expectTypeOf(createCrisp).returns.toEqualTypeOf<Design>()
    expectTypeOf(crispLight).toEqualTypeOf<ThemeTokens>()
  })

  it('a Tabler icon is a CrispIconComponent', () => {
    expectTypeOf(IconPlane).toExtend<CrispIconComponent>()
    createCrisp({ icons: { plane: IconPlane } })
  })

  it('rejects icons that are not components, and unknown options', () => {
    // @ts-expect-error a string is not an icon component
    createCrisp({ icons: { plane: 'IconPlane' } })
    // @ts-expect-error an icon map is not an array
    createCrisp({ icons: [IconPlane] })
    // @ts-expect-error Crisp has no `accent` option: rebrand with the --brand-hue override
    createCrisp({ accent: '#ff0000' })
    expectTypeOf<CrispOptions>().toHaveProperty('icons')
  })

  it('tokens are read-only', () => {
    // @ts-expect-error a theme's colours can't be reassigned
    crispLight.color.accent = 'oklch(0.5 0.1 var(--brand-hue))'
  })
})
