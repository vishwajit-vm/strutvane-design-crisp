/**
 * Crisp's floating layers: dialog, popover and toast. Only floating layers cast a shadow, and
 * they pop in quickly (140 ms, 2 px, 0.98 scale); `prefers-reduced-motion` turns that off.
 *
 * Focus trapping, Escape and the live region are the behaviour's; these skins spread the prop
 * bags they receive and place the ids, nothing more.
 *
 * @module
 */
import type { DialogProps, PopoverProps, ToastProps } from '@strutvane/ui/design'
import type { ReactElement } from 'react'
import { cx } from '../cx.ts'

/**
 * A modal over a scrim: title, optional description, content, then the footer with the primary
 * button last. `lg` (640 px, 12 vh from the top) is also the command palette's frame.
 *
 * @example
 * <Dialog overlayProps={o} panelProps={p} title="Delete invoice?" titleId="t" footer={buttons} />
 */
export function Dialog(props: DialogProps): ReactElement {
  return (
    <div className="svc-overlay" data-sv-part="overlay" {...props.overlayProps}>
      <div
        className={cx('svc-dialog', `svc-dialog-${props.size ?? 'md'}`)}
        data-sv-part="dialog"
        {...props.panelProps}
      >
        <h2 id={props.titleId} className="svc-dialog-title">
          {props.title}
        </h2>
        {props.description ? (
          <p id={props.descriptionId} className="svc-dialog-description">
            {props.description}
          </p>
        ) : null}
        {props.children}
        {props.footer ? <div className="svc-dialog-footer">{props.footer}</div> : null}
      </div>
    </div>
  )
}

/**
 * A floating panel for menus and the column picker.
 *
 * @example
 * <Popover panelProps={{ role: 'menu', id: 'cols' }}>…</Popover>
 */
export function Popover({ panelProps, children }: PopoverProps): ReactElement {
  return (
    <div className="svc-popover" data-sv-part="popover" {...panelProps}>
      {children}
    </div>
  )
}

/**
 * One toast: a tone bar, the message, an optional action (Undo) and the dismiss button.
 * Bottom-right on desktop, full width at the bottom on phones.
 *
 * @example
 * <Toast tone="success" action={undo} dismiss={close}>Invoice deleted</Toast>
 */
export function Toast({ tone, children, action, dismiss }: ToastProps): ReactElement {
  return (
    <div className={cx('svc-toast', `svc-tone-${tone}`)} data-sv-part="toast">
      <span className="svc-dot" aria-hidden="true" />
      <span className="svc-toast-message">{children}</span>
      {action}
      {dismiss}
    </div>
  )
}
