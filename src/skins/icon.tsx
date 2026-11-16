/**
 * Crisp's `Icon` skin: draws a Tabler icon by name, decorative, or nothing.
 *
 * The behaviour names icons (`arrow-left`, `plus`, a resource's `ui.icon`); it never depends on
 * one being drawn, because every icon sits next to a text label or inside a control with an
 * accessible name. So an unknown name draws nothing instead of failing.
 *
 * @module
 */
import type { IconProps } from '@strutvane/ui/design'
import type { ComponentType, ReactElement } from 'react'
import type { CrispIconComponent } from '../icons.ts'

/**
 * Build the `Icon` skin for a set of icons (Crisp's own, plus any an app added).
 *
 * @example
 * const Icon = createIcon({ home: IconHome })
 * <Icon name="home" /> // <svg class="svc-icon svc-icon-md" aria-hidden="true">…</svg>
 */
export function createIcon(
  icons: Readonly<Record<string, CrispIconComponent>>,
): ComponentType<IconProps> {
  // biome-ignore lint/correctness/noComponentHookFactories: built once per design (createCrisp), never per render, so its identity is stable.
  function Icon({ name, size = 'md' }: IconProps): ReactElement | null {
    // Own properties only: a name such as "constructor" must not reach Object.prototype.
    const Drawn = Object.hasOwn(icons, name) ? icons[name] : undefined
    if (!Drawn) return null
    return <Drawn className={`svc-icon svc-icon-${size}`} aria-hidden="true" focusable="false" />
  }
  return Icon
}
