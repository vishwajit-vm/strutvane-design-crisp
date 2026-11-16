/**
 * Crisp's whole stylesheet (the `stylesheet` of the design), in cascade order: base, shell,
 * controls, surfaces, then the behaviour's parts. `@strutvane/ui` prepends the tokens and the
 * font defaults, so this text holds only rules, and only `var(--sv-*)` colours.
 *
 * @module
 */
import { BASE_CSS } from './base.ts'
import { CONTROLS_CSS } from './controls.ts'
import { PARTS_CSS } from './parts.ts'
import { SHELL_CSS } from './shell.ts'
import { SURFACES_CSS } from './surfaces.ts'

/** The stylesheet text, scoped to `[data-sv-design="crisp"]`. */
export const CRISP_STYLESHEET: string = [BASE_CSS, SHELL_CSS, CONTROLS_CSS, SURFACES_CSS, PARTS_CSS]
  .map((part) => part.trim())
  .join('\n')
