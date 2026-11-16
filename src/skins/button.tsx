/**
 * Crisp's `Button` skin: `primary` (accent with a top sheen), `secondary` (surface, hairline,
 * 1 px shadow), `ghost` (toolbars) and `danger` (only inside confirmations). 32 px by default,
 * 28 px small, both following `--density`.
 *
 * @module
 */
import type { ButtonProps, IconProps } from '@strutvane/ui/design'
import type { ComponentType, ReactElement, ReactNode } from 'react'
import { cx } from '../cx.ts'

/**
 * Whether a label is only a text glyph standing in for an icon (`☰`, `×`, `…`): no letter and no
 * digit. Designs without icons need that glyph; Crisp draws the icon instead, and the control's
 * `aria-label` names it either way.
 *
 * @example
 * isGlyphLabel('☰') // true
 * isGlyphLabel('Back') // false
 */
export function isGlyphLabel(children: ReactNode): boolean {
  return typeof children === 'string' && children.trim() !== '' && !/[\p{L}\p{N}]/u.test(children)
}

/**
 * Build the `Button` skin around the design's `Icon`, so `icon="plus"` draws Crisp's icon.
 * Renders a `<button>` (`type="button"` unless told otherwise) with every other prop spread on it.
 *
 * @example
 * const Button = createButton(Icon)
 * <Button variant="primary" icon="plus">New invoice</Button>
 */
export function createButton(Icon: ComponentType<IconProps>): ComponentType<ButtonProps> {
  function Button({
    variant = 'secondary',
    size = 'md',
    icon,
    className,
    type = 'button',
    children,
    ...rest
  }: ButtonProps): ReactElement {
    const iconOnly = icon !== undefined && isGlyphLabel(children)
    return (
      <button
        type={type}
        className={cx(
          'svc-button',
          `svc-button-${variant}`,
          size === 'sm' && 'svc-button-sm',
          iconOnly && 'svc-button-icon',
          className,
        )}
        {...rest}
      >
        {icon !== undefined ? <Icon name={icon} size={size === 'sm' ? 'sm' : 'md'} /> : null}
        {iconOnly ? null : children}
      </button>
    )
  }
  return Button
}
