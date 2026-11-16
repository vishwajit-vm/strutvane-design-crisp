/**
 * The Crisp design, assembled with `defineDesign()` from `@strutvane/ui/design`.
 *
 * `crisp` is ready to use. `createCrisp({ icons })` builds the same design with extra icons, for
 * apps whose resources name Tabler icons outside Crisp's built-in set.
 *
 * @module
 */
import { type Design, defineDesign } from '@strutvane/ui/design'
import { CRISP_FONTS } from './fonts.ts'
import { CRISP_ICONS, type CrispIconComponent } from './icons.ts'
import { EmptyArt, ErrorArt, ForbiddenArt, NotFoundArt } from './illustrations.tsx'
import { AuthLayout } from './shell/auth-layout.tsx'
import { PageHeader, Shell, TopBar } from './shell/shell.tsx'
import { Sidebar } from './shell/sidebar.tsx'
import { createButton } from './skins/button.tsx'
import { Checkbox, Field, Input, Select, Textarea } from './skins/fields.tsx'
import { createIcon } from './skins/icon.tsx'
import { Dialog, Popover, Toast } from './skins/overlays.tsx'
import { Alert, Badge, Card, Chip, Skeleton, Table } from './skins/surfaces.tsx'
import { CRISP_STYLESHEET } from './styles/index.ts'
import { CRISP_DEFAULTS, crispChartPalette, crispDark, crispLight, crispScale } from './tokens.ts'

/** Options for {@link createCrisp}. */
export interface CrispOptions {
  /**
   * Extra icons by Tabler name, added to (or replacing) Crisp's built-in set. Use the icon
   * components of `@tabler/icons-react`, or any SVG component that accepts a `className`.
   *
   * @example
   * import IconTruckDelivery from '@tabler/icons-react/icons/IconTruckDelivery'
   * createCrisp({ icons: { 'truck-delivery': IconTruckDelivery } })
   */
  readonly icons?: Readonly<Record<string, CrispIconComponent>>
}

/** Thrown by {@link createCrisp} when its options can't be used; it lists every problem. */
export class CrispOptionsError extends Error {
  /** One readable line per problem. */
  readonly problems: readonly string[]
  constructor(problems: readonly string[]) {
    super(`Crisp options are invalid:\n- ${problems.join('\n- ')}`)
    this.name = 'CrispOptionsError'
    this.problems = problems
  }
}

const ICON_NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

/** Every problem with a set of extra icons, or `[]`. */
function iconProblems(icons: unknown): string[] {
  if (icons === undefined) return []
  if (typeof icons !== 'object' || icons === null || Array.isArray(icons))
    return ['icons must be an object of icon components by name']
  const problems: string[] = []
  for (const [name, component] of Object.entries(icons)) {
    if (!ICON_NAME.test(name))
      problems.push(`icon name "${name}" must be a Tabler name: lowercase words joined by dashes`)
    const drawable =
      typeof component === 'function' || (typeof component === 'object' && component !== null)
    if (!drawable) problems.push(`icons["${name}"] must be a component`)
  }
  return problems
}

/**
 * Build the Crisp design. Fails closed: options that can't be used throw a
 * {@link CrispOptionsError} instead of silently drawing nothing.
 *
 * @example
 * import { createCrisp } from '@strutvane/design-crisp'
 * import IconPlane from '@tabler/icons-react/icons/IconPlane'
 * export const design = createCrisp({ icons: { plane: IconPlane } })
 */
export function createCrisp(options: CrispOptions = {}): Design {
  const problems = iconProblems(options.icons)
  if (problems.length > 0) throw new CrispOptionsError(problems)
  const Icon = createIcon(Object.freeze({ ...CRISP_ICONS, ...options.icons }))
  return defineDesign({
    name: 'crisp',
    description: 'Clean, minimal and business-first: quiet neutrals, one accent, dense tables.',
    tokens: { light: crispLight, dark: crispDark },
    scale: crispScale,
    defaults: CRISP_DEFAULTS,
    fonts: CRISP_FONTS,
    shell: { Shell, Sidebar, TopBar, AuthLayout, PageHeader },
    skins: {
      Button: createButton(Icon),
      Input,
      Textarea,
      Select,
      Checkbox,
      Field,
      Card,
      Badge,
      Alert,
      Table,
      Dialog,
      Popover,
      Toast,
      Chip,
      Skeleton,
      Icon,
    },
    chartPalette: crispChartPalette,
    illustrations: {
      Empty: EmptyArt,
      NotFound: NotFoundArt,
      Forbidden: ForbiddenArt,
      Error: ErrorArt,
    },
    stylesheet: CRISP_STYLESHEET,
  })
}

/**
 * Crisp, the default Strutvane admin design: clean, minimal and business-first.
 *
 * @example
 * import { DesignProvider } from '@strutvane/ui/design'
 * import { crisp } from '@strutvane/design-crisp'
 * <DesignProvider design={crisp}><StrutvaneApp apiUrl="/api" /></DesignProvider>
 */
export const crisp: Design = createCrisp()
