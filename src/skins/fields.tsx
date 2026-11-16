/**
 * Crisp's form skins: inputs, textarea, select, checkbox and the field wrapper.
 *
 * Controls are 32 px with an `input` outline that reaches 3:1 against the surface (WCAG 1.4.11);
 * focus is an accent border plus the 2 px ring; `aria-invalid` turns the outline danger. Each
 * skin renders the native element and spreads every prop onto it, so the behaviour's ids,
 * `aria-*` wiring and refs arrive intact.
 *
 * @module
 */

import type {
  CheckboxProps,
  FieldProps,
  InputProps,
  SelectProps,
  TextareaProps,
} from '@strutvane/ui/design'
import IconAlertCircle from '@tabler/icons-react/icons/IconAlertCircle'
import IconChevronDown from '@tabler/icons-react/icons/IconChevronDown'
import type { ReactElement } from 'react'
import { cx } from '../cx.ts'

/**
 * A text-like input (text, email, password, number, date…).
 *
 * @example
 * <Input id="email" type="email" aria-describedby="email-help" />
 */
export function Input({ className, ...rest }: InputProps): ReactElement {
  return <input className={cx('svc-control', className)} {...rest} />
}

/**
 * A multi-line input; it grows with the page width and can be resized vertically.
 *
 * @example
 * <Textarea id="notes" rows={4} />
 */
export function Textarea({ className, ...rest }: TextareaProps): ReactElement {
  return <textarea className={cx('svc-control', 'svc-textarea', className)} {...rest} />
}

/**
 * A native select with Crisp's chevron. The chevron is a decorative sibling, so the `<select>`
 * keeps every native behaviour (keyboard, mobile pickers, form submission).
 *
 * @example
 * <Select id="status"><option>Open</option></Select>
 */
export function Select({ className, ...rest }: SelectProps): ReactElement {
  return (
    <span className="svc-select">
      <select className={cx('svc-control', className)} {...rest} />
      <IconChevronDown className="svc-select-chevron" aria-hidden="true" focusable="false" />
    </span>
  )
}

/**
 * A native checkbox in the accent colour.
 *
 * @example
 * <Checkbox id="paid" checked={paid} onChange={toggle} />
 */
export function Checkbox({ className, ...rest }: CheckboxProps): ReactElement {
  return <input type="checkbox" className={cx('svc-checkbox', className)} {...rest} />
}

/**
 * Label (13 px, medium), the control, then one line of help or an inline error with an icon.
 * The help and error carry the ids the control's `aria-describedby` points at.
 *
 * @example
 * <Field label="Due date" htmlFor="due" required error="Choose a date" errorId="due-error">…</Field>
 */
export function Field(props: FieldProps): ReactElement {
  return (
    <div className="svc-field" data-sv-field={props.name}>
      <label htmlFor={props.htmlFor} className="svc-label">
        {props.label}
        {props.required ? (
          <span className="svc-required" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      {props.children}
      {props.help ? (
        <p id={props.helpId} className="svc-help">
          {props.help}
        </p>
      ) : null}
      {props.error ? (
        <p id={props.errorId} className="svc-error">
          <IconAlertCircle className="svc-icon svc-icon-sm" aria-hidden="true" focusable="false" />
          <span>{props.error}</span>
        </p>
      ) : null}
    </div>
  )
}
