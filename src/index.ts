/**
 * `@strutvane/design-crisp`: Crisp, the default Strutvane admin design.
 *
 * Clean, minimal and business-first: quiet zinc neutrals, one confident accent that follows
 * `--brand-hue`, hairlines instead of shadows, dense readable tables, and equal light and dark
 * themes. It implements the `@strutvane/ui` Design contract and passes `designConformance()`.
 *
 * ```tsx
 * import '@strutvane/design-crisp/fonts.css' // optional: Inter and Geist Mono
 * import { DesignProvider } from '@strutvane/ui/design'
 * import { crisp } from '@strutvane/design-crisp'
 *
 * <DesignProvider design={crisp} overrides={{ brandHue: 150 }} nonce={cspNonce}>…</DesignProvider>
 * ```
 *
 * With a strict CSP and no nonce, serve `@strutvane/design-crisp/crisp.css` as a file and pass
 * `injectStyles={false}`. The guide is DESIGN.md.
 *
 * @module
 */
export { type CrispOptions, CrispOptionsError, createCrisp, crisp } from './design.ts'
export { CRISP_FONTS } from './fonts.ts'
export {
  CRISP_ICON_NAMES,
  CRISP_ICONS,
  type CrispIconComponent,
  type CrispIconProps,
} from './icons.ts'
export {
  BrandMark,
  EmptyArt,
  ErrorArt,
  ForbiddenArt,
  NotFoundArt,
} from './illustrations.tsx'
export { CRISP_STYLESHEET } from './styles/index.ts'
export {
  CRISP_DEFAULTS,
  crispChartPalette,
  crispDark,
  crispLight,
  crispScale,
} from './tokens.ts'
