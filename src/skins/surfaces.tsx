/**
 * Crisp's surface skins: card, badge, alert, table, chip and skeleton.
 *
 * Borders, not shadows: content surfaces are a hairline on the surface colour; status is a small
 * dot plus a word, never a filled block (DESIGN.md §1, §7).
 *
 * @module
 */
import type {
  AlertProps,
  BadgeProps,
  CardProps,
  ChipProps,
  SkeletonProps,
  TableProps,
} from '@strutvane/ui/design'
import type { ReactElement } from 'react'
import { cx } from '../cx.ts'

/**
 * A surface for a group of content: hairline, 9 px radius, 16 px padding, no shadow.
 *
 * @example
 * <Card heading={<h2>Details</h2>}>…</Card>
 */
export function Card({ heading, className, children, ...rest }: CardProps): ReactElement {
  return (
    <section className={cx('svc-card', className)} {...rest}>
      {heading}
      {children}
    </section>
  )
}

/**
 * A quiet status pill: a 6 px dot in the tone's colour, then the word. The word carries the
 * meaning, so status is never conveyed by colour alone.
 *
 * @example
 * <Badge tone="success">Paid</Badge>
 */
export function Badge({ tone, children }: BadgeProps): ReactElement {
  return (
    <span className={cx('svc-badge', `svc-tone-${tone}`)}>
      <span className="svc-dot" aria-hidden="true" />
      {children}
    </span>
  )
}

/**
 * A message block in a status tint. Every other prop (`role`, `tabIndex`, the ref) is spread on
 * it, so the behaviour can focus a form's error banner.
 *
 * @example
 * <Alert tone="danger" role="alert">Fix 3 fields</Alert>
 */
export function Alert({ tone, className, ...rest }: AlertProps): ReactElement {
  return <div className={cx('svc-alert', `svc-tone-${tone}`, className)} {...rest} />
}

/**
 * A dense table inside its own positioned scroll box, so a wide table scrolls sideways inside
 * the panel and never widens the page (no overflow at 375 px). The header row is sticky.
 *
 * @example
 * <Table regionProps={region} tableProps={{}} density="default"><thead>…</thead></Table>
 */
export function Table({ regionProps, tableProps, density, children }: TableProps): ReactElement {
  return (
    <div className="svc-table-scroll" data-sv-part="table-scroll" {...regionProps}>
      <table className="svc-table" data-sv-density={density} {...tableProps}>
        {children}
      </table>
    </div>
  )
}

/**
 * An active filter with its (already labelled) remove button.
 *
 * @example
 * <Chip remove={<button aria-label="Remove status filter">×</button>}>Status: Open</Chip>
 */
export function Chip({ children, remove }: ChipProps): ReactElement {
  return (
    <span className="svc-chip" data-sv-part="chip">
      <span className="svc-chip-label">{children}</span>
      {remove}
    </span>
  )
}

/**
 * Loading lines (1 to 20) that gently pulse; decorative, because the region says `aria-busy`.
 *
 * @example
 * <Skeleton lines={5} />
 */
export function Skeleton({ lines }: SkeletonProps): ReactElement {
  const count = Number.isFinite(lines) ? Math.max(1, Math.min(Math.trunc(lines), 20)) : 1
  return (
    <div className="svc-skeleton" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: placeholder lines have no identity.
        <span key={i} />
      ))}
    </div>
  )
}
