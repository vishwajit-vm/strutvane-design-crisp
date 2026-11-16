/**
 * Crisp's illustrations: original line drawings for empty and error states, and the brand tile.
 *
 * Drawn for this package (no images or shapes copied from any product or template). They use
 * CSS classes only, never a colour: the stylesheet paints them from the theme tokens, so they are
 * quiet grey line art in both themes with a single accent detail (the "one confident accent"
 * rule). Every drawing is decorative (`aria-hidden`); the text next to it carries the meaning.
 *
 * @module
 */
import type { IllustrationProps } from '@strutvane/ui/design'
import type { ReactElement } from 'react'
import { cx } from './cx.ts'

/** The shared `<svg>` frame of an illustration: 120 × 96, decorative, never focusable. */
function Art(props: {
  readonly className?: string | undefined
  readonly children: ReactElement[]
}) {
  return (
    <svg
      viewBox="0 0 120 96"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cx('svc-art', props.className)}
    >
      {props.children}
    </svg>
  )
}

/**
 * "Nothing here yet": a stack of documents with an accent plus badge.
 *
 * @example
 * <EmptyArt />
 */
export function EmptyArt({ className }: IllustrationProps): ReactElement {
  return (
    <Art className={className}>
      <rect x="30" y="14" width="56" height="70" rx="6" className="svc-art-subtle svc-art-line" />
      <rect x="22" y="20" width="56" height="70" rx="6" className="svc-art-surface svc-art-line" />
      <path d="M32 34h22M32 42h36M32 50h30" className="svc-art-line svc-art-thick" />
      <path d="M32 70h16M58 70h10" className="svc-art-muted svc-art-thick" />
      <circle cx="84" cy="74" r="13" className="svc-art-accent" />
      <path d="M84 68v12M78 74h12" className="svc-art-on-accent" />
    </Art>
  )
}

/**
 * "This page doesn't exist": a magnifier over a page of dotted, empty rows.
 *
 * @example
 * <NotFoundArt />
 */
export function NotFoundArt({ className }: IllustrationProps): ReactElement {
  return (
    <Art className={className}>
      <rect x="18" y="18" width="84" height="60" rx="6" className="svc-art-surface svc-art-line" />
      <path d="M28 32h40M28 44h52M28 56h30" className="svc-art-line svc-art-dotted" />
      <circle cx="74" cy="54" r="14" className="svc-art-surface svc-art-muted svc-art-mid" />
      <path d="m84 64 10 10" className="svc-art-muted svc-art-thick" />
      <path d="M69 54h10" className="svc-art-accent-line" />
    </Art>
  )
}

/**
 * "You can't open this": a document behind a padlock with an accent shackle.
 *
 * @example
 * <ForbiddenArt />
 */
export function ForbiddenArt({ className }: IllustrationProps): ReactElement {
  return (
    <Art className={className}>
      <rect x="26" y="12" width="52" height="68" rx="6" className="svc-art-surface svc-art-line" />
      <path d="M36 26h24M36 34h32M36 42h18" className="svc-art-line svc-art-thick" />
      <path d="M72 52v-6a10 10 0 0 1 20 0v6" className="svc-art-accent-line" />
      <rect
        x="64"
        y="52"
        width="36"
        height="28"
        rx="5"
        className="svc-art-surface svc-art-muted svc-art-mid"
      />
      <path d="M82 62v8" className="svc-art-muted svc-art-thick" />
    </Art>
  )
}

/**
 * "Something went wrong": two cable ends that don't meet, with an accent spark between them.
 *
 * @example
 * <ErrorArt />
 */
export function ErrorArt({ className }: IllustrationProps): ReactElement {
  return (
    <Art className={className}>
      <rect x="14" y="38" width="30" height="20" rx="5" className="svc-art-surface svc-art-line" />
      <path d="M44 44h8M44 52h8M14 48H4" className="svc-art-muted svc-art-mid" />
      <rect x="76" y="38" width="30" height="20" rx="5" className="svc-art-surface svc-art-line" />
      <path d="M76 48h-6M106 48h10" className="svc-art-muted svc-art-mid" />
      <path d="m60 34-3 8h6l-3 8M60 62v2" className="svc-art-accent-line" />
    </Art>
  )
}

/**
 * The brand tile in the sidebar and above the sign-in card: a rounded square with an abstract
 * strut-and-vane stroke. Decorative; the app name next to it is real text.
 *
 * @example
 * <BrandMark />
 */
export function BrandMark(): ReactElement {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="svc-mark">
      <rect width="24" height="24" rx="6" className="svc-mark-tile" />
      <path d="M7.5 17.5 13.5 6.5" className="svc-mark-strut" />
      <path d="M13.5 6.5h4.2l-2.6 4.4h-4.1z" className="svc-mark-vane" />
    </svg>
  )
}
