/**
 * Crisp's fonts: Inter Variable for the UI and Geist Mono for ids, amounts and code, both under
 * the SIL Open Font License 1.1 and self-hosted through `@fontsource`.
 *
 * The stacks fall back to the system UI and monospace fonts, so Crisp reads well before the font
 * files load, or when an app doesn't import `@strutvane/design-crisp/fonts.css` at all. An app
 * changes the UI font with the public `--font-sans` token; this stack is only its default.
 *
 * @module
 */
import type { DesignFonts } from '@strutvane/ui/design'

/**
 * The font stacks Crisp declares (no `@font-face` here: the font files come from the
 * `fonts.css` entry, which a bundler resolves to the `@fontsource` packages).
 *
 * @example
 * CRISP_FONTS.sans // "'Inter Variable', ui-sans-serif, system-ui, …"
 */
export const CRISP_FONTS: DesignFonts = Object.freeze({
  sans: "'Inter Variable', 'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  mono: "'Geist Mono', ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace",
})
