// @vitest-environment jsdom
/**
 * `crisp` and `createCrisp()`: the design is a checked, frozen `defineDesign` result; extra icons
 * are added by Tabler name; options that can't be used fail closed with every problem listed.
 */
import { DesignError } from '@strutvane/ui/design'
import IconPlane from '@tabler/icons-react/icons/IconPlane'
import { cleanup, render } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import {
  CRISP_FONTS,
  CRISP_ICON_NAMES,
  CRISP_ICONS,
  type CrispOptions,
  CrispOptionsError,
  createCrisp,
  crisp,
} from '../src/index.ts'

afterEach(cleanup)

describe('crisp', () => {
  it('is a frozen design named crisp, with Crisp’s fonts and description', () => {
    expect(crisp.name).toBe('crisp')
    expect(crisp.__strutvaneDesign).toBe(1)
    expect(Object.isFrozen(crisp)).toBe(true)
    expect(crisp.fonts).toBe(CRISP_FONTS)
    expect(crisp.fonts.sans.startsWith("'Inter Variable'")).toBe(true)
    expect(crisp.fonts.mono.startsWith("'Geist Mono'")).toBe(true)
    expect(crisp.description).toMatch(/minimal/)
  })

  it('draws every behaviour icon (home, file, menu, search, plus, arrow-left)', () => {
    for (const name of ['home', 'file', 'menu', 'search', 'plus', 'arrow-left'])
      expect(CRISP_ICON_NAMES).toContain(name)
  })

  it('lists its icon names sorted and frozen, one per icon', () => {
    expect([...CRISP_ICON_NAMES]).toEqual(Object.keys(CRISP_ICONS).sort())
    expect(Object.isFrozen(CRISP_ICON_NAMES)).toBe(true)
    expect(Object.isFrozen(CRISP_ICONS)).toBe(true)
  })

  it('renders every built-in icon as a decorative svg', () => {
    const { Icon } = crisp.skins
    const { container } = render(
      <div>
        {CRISP_ICON_NAMES.map((name) => (
          <Icon key={name} name={name} />
        ))}
      </div>,
    )
    const svgs = container.querySelectorAll('svg')
    expect(svgs).toHaveLength(CRISP_ICON_NAMES.length)
    for (const svg of svgs) expect(svg.getAttribute('aria-hidden')).toBe('true')
  })
})

describe('createCrisp', () => {
  it('without options builds a design equal in shape to crisp', () => {
    const design = createCrisp()
    expect(design.name).toBe('crisp')
    expect(design.tokens).toEqual(crisp.tokens)
    expect(design.stylesheet).toBe(crisp.stylesheet)
  })

  it('adds an app’s own icons by Tabler name, keeping the built-in ones', () => {
    const { Icon } = createCrisp({ icons: { plane: IconPlane } }).skins
    const { container } = render(
      <>
        <Icon name="plane" />
        <Icon name="home" />
      </>,
    )
    expect(container.querySelectorAll('svg')).toHaveLength(2)
    expect(container.querySelector('.tabler-icon-plane')).not.toBeNull()
  })

  it('an added icon is drawn by the Button skin too', () => {
    const { Button } = createCrisp({ icons: { plane: IconPlane } }).skins
    const { container } = render(<Button icon="plane">Fly</Button>)
    expect(container.querySelector('.tabler-icon-plane')).not.toBeNull()
  })

  it('fails closed on unusable options, listing every problem', () => {
    const bad = {
      icons: { 'Not A Name': IconPlane, plane: 'IconPlane', ok: IconPlane },
    } as unknown as CrispOptions
    try {
      createCrisp(bad)
      expect.unreachable('createCrisp should have thrown')
    } catch (error) {
      expect(error).toBeInstanceOf(CrispOptionsError)
      const problems = (error as CrispOptionsError).problems
      expect(problems).toHaveLength(2)
      expect(problems[0]).toMatch(/"Not A Name" must be a Tabler name/)
      expect(problems[1]).toMatch(/icons\["plane"\] must be a component/)
      expect((error as Error).name).toBe('CrispOptionsError')
      expect((error as Error).message).toContain('Crisp options are invalid')
    }
  })

  it('refuses icons that are not an object of components', () => {
    for (const icons of [null, [], 'plane', 5]) {
      expect(() => createCrisp({ icons } as unknown as CrispOptions)).toThrow(
        /icons must be an object of icon components by name/,
      )
    }
  })

  it('is still checked by defineDesign, so a broken design can never be returned', () => {
    // Every slot and token passed defineDesign's runtime check (it throws DesignError otherwise).
    expect(() => createCrisp()).not.toThrow(DesignError)
  })
})
