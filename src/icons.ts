/**
 * The Tabler icons Crisp draws by name (decision 57: Strutvane's icons are Tabler, MIT licence).
 *
 * Why a curated set and not all of Tabler: the `Icon` skin receives a NAME at runtime (from the
 * behaviour and from each resource's `ui.icon`), so every icon it can draw must be imported up
 * front. Importing all ~5,000 would put megabytes into every admin bundle. This set covers the
 * behaviour's own icons and the common business nouns; an app adds others with
 * `createCrisp({ icons })`. Each icon is a deep import, so only these modules are loaded.
 *
 * @module
 */
import IconActivity from '@tabler/icons-react/icons/IconActivity'
import IconAdjustmentsHorizontal from '@tabler/icons-react/icons/IconAdjustmentsHorizontal'
import IconAlertCircle from '@tabler/icons-react/icons/IconAlertCircle'
import IconAlertTriangle from '@tabler/icons-react/icons/IconAlertTriangle'
import IconArchive from '@tabler/icons-react/icons/IconArchive'
import IconArrowLeft from '@tabler/icons-react/icons/IconArrowLeft'
import IconArrowRight from '@tabler/icons-react/icons/IconArrowRight'
import IconArrowsSort from '@tabler/icons-react/icons/IconArrowsSort'
import IconBell from '@tabler/icons-react/icons/IconBell'
import IconBook from '@tabler/icons-react/icons/IconBook'
import IconBookmark from '@tabler/icons-react/icons/IconBookmark'
import IconBox from '@tabler/icons-react/icons/IconBox'
import IconBriefcase from '@tabler/icons-react/icons/IconBriefcase'
import IconBuilding from '@tabler/icons-react/icons/IconBuilding'
import IconBuildingStore from '@tabler/icons-react/icons/IconBuildingStore'
import IconCalendar from '@tabler/icons-react/icons/IconCalendar'
import IconCash from '@tabler/icons-react/icons/IconCash'
import IconChartBar from '@tabler/icons-react/icons/IconChartBar'
import IconChartLine from '@tabler/icons-react/icons/IconChartLine'
import IconChartPie from '@tabler/icons-react/icons/IconChartPie'
import IconCheck from '@tabler/icons-react/icons/IconCheck'
import IconChevronDown from '@tabler/icons-react/icons/IconChevronDown'
import IconChevronLeft from '@tabler/icons-react/icons/IconChevronLeft'
import IconChevronRight from '@tabler/icons-react/icons/IconChevronRight'
import IconChevronsLeft from '@tabler/icons-react/icons/IconChevronsLeft'
import IconChevronsRight from '@tabler/icons-react/icons/IconChevronsRight'
import IconChevronUp from '@tabler/icons-react/icons/IconChevronUp'
import IconCircleCheck from '@tabler/icons-react/icons/IconCircleCheck'
import IconClock from '@tabler/icons-react/icons/IconClock'
import IconColumns from '@tabler/icons-react/icons/IconColumns'
import IconCopy from '@tabler/icons-react/icons/IconCopy'
import IconCreditCard from '@tabler/icons-react/icons/IconCreditCard'
import IconCurrencyDollar from '@tabler/icons-react/icons/IconCurrencyDollar'
import IconDatabase from '@tabler/icons-react/icons/IconDatabase'
import IconDeviceDesktop from '@tabler/icons-react/icons/IconDeviceDesktop'
import IconDots from '@tabler/icons-react/icons/IconDots'
import IconDotsVertical from '@tabler/icons-react/icons/IconDotsVertical'
import IconDownload from '@tabler/icons-react/icons/IconDownload'
import IconExternalLink from '@tabler/icons-react/icons/IconExternalLink'
import IconEye from '@tabler/icons-react/icons/IconEye'
import IconEyeOff from '@tabler/icons-react/icons/IconEyeOff'
import IconFile from '@tabler/icons-react/icons/IconFile'
import IconFileInvoice from '@tabler/icons-react/icons/IconFileInvoice'
import IconFiles from '@tabler/icons-react/icons/IconFiles'
import IconFileText from '@tabler/icons-react/icons/IconFileText'
import IconFilter from '@tabler/icons-react/icons/IconFilter'
import IconFolder from '@tabler/icons-react/icons/IconFolder'
import IconHelp from '@tabler/icons-react/icons/IconHelp'
import IconHelpCircle from '@tabler/icons-react/icons/IconHelpCircle'
import IconHistory from '@tabler/icons-react/icons/IconHistory'
import IconHome from '@tabler/icons-react/icons/IconHome'
import IconId from '@tabler/icons-react/icons/IconId'
import IconInbox from '@tabler/icons-react/icons/IconInbox'
import IconInfoCircle from '@tabler/icons-react/icons/IconInfoCircle'
import IconKey from '@tabler/icons-react/icons/IconKey'
import IconKeyboard from '@tabler/icons-react/icons/IconKeyboard'
import IconLayoutDashboard from '@tabler/icons-react/icons/IconLayoutDashboard'
import IconLayoutSidebar from '@tabler/icons-react/icons/IconLayoutSidebar'
import IconLink from '@tabler/icons-react/icons/IconLink'
import IconList from '@tabler/icons-react/icons/IconList'
import IconLock from '@tabler/icons-react/icons/IconLock'
import IconLogin from '@tabler/icons-react/icons/IconLogin'
import IconLogout from '@tabler/icons-react/icons/IconLogout'
import IconMail from '@tabler/icons-react/icons/IconMail'
import IconMenu from '@tabler/icons-react/icons/IconMenu'
import IconMenu2 from '@tabler/icons-react/icons/IconMenu2'
import IconMessage from '@tabler/icons-react/icons/IconMessage'
import IconMinus from '@tabler/icons-react/icons/IconMinus'
import IconMoon from '@tabler/icons-react/icons/IconMoon'
import IconNotes from '@tabler/icons-react/icons/IconNotes'
import IconPackage from '@tabler/icons-react/icons/IconPackage'
import IconPaperclip from '@tabler/icons-react/icons/IconPaperclip'
import IconPencil from '@tabler/icons-react/icons/IconPencil'
import IconPhoto from '@tabler/icons-react/icons/IconPhoto'
import IconPlus from '@tabler/icons-react/icons/IconPlus'
import IconReceipt from '@tabler/icons-react/icons/IconReceipt'
import IconRefresh from '@tabler/icons-react/icons/IconRefresh'
import IconReportMoney from '@tabler/icons-react/icons/IconReportMoney'
import IconSearch from '@tabler/icons-react/icons/IconSearch'
import IconSelector from '@tabler/icons-react/icons/IconSelector'
import IconServer from '@tabler/icons-react/icons/IconServer'
import IconSettings from '@tabler/icons-react/icons/IconSettings'
import IconShield from '@tabler/icons-react/icons/IconShield'
import IconShoppingCart from '@tabler/icons-react/icons/IconShoppingCart'
import IconSortAscending from '@tabler/icons-react/icons/IconSortAscending'
import IconSortDescending from '@tabler/icons-react/icons/IconSortDescending'
import IconStar from '@tabler/icons-react/icons/IconStar'
import IconSun from '@tabler/icons-react/icons/IconSun'
import IconTable from '@tabler/icons-react/icons/IconTable'
import IconTag from '@tabler/icons-react/icons/IconTag'
import IconTrash from '@tabler/icons-react/icons/IconTrash'
import IconTruck from '@tabler/icons-react/icons/IconTruck'
import IconUpload from '@tabler/icons-react/icons/IconUpload'
import IconUser from '@tabler/icons-react/icons/IconUser'
import IconUserCircle from '@tabler/icons-react/icons/IconUserCircle'
import IconUsers from '@tabler/icons-react/icons/IconUsers'
import IconWorld from '@tabler/icons-react/icons/IconWorld'
import IconX from '@tabler/icons-react/icons/IconX'
import type { ComponentType } from 'react'

/** Props Crisp passes to an icon component: a class, and the attributes that hide it from AT. */
export interface CrispIconProps {
  readonly className?: string
  readonly 'aria-hidden'?: boolean | 'true' | 'false'
  readonly focusable?: boolean | 'true' | 'false'
}

/**
 * An icon component Crisp can draw: any Tabler icon from `@tabler/icons-react`, or your own
 * SVG component that accepts {@link CrispIconProps}.
 */
export type CrispIconComponent = ComponentType<CrispIconProps>

/** Crisp's built-in icons, by Tabler name (`arrow-left`, `layout-dashboard`, …). */
export const CRISP_ICONS: Readonly<Record<string, CrispIconComponent>> = Object.freeze({
  home: IconHome,
  file: IconFile,
  'file-text': IconFileText,
  'file-invoice': IconFileInvoice,
  files: IconFiles,
  folder: IconFolder,
  search: IconSearch,
  plus: IconPlus,
  minus: IconMinus,
  x: IconX,
  check: IconCheck,
  'arrow-left': IconArrowLeft,
  'arrow-right': IconArrowRight,
  'chevron-down': IconChevronDown,
  'chevron-up': IconChevronUp,
  'chevron-left': IconChevronLeft,
  'chevron-right': IconChevronRight,
  'chevrons-left': IconChevronsLeft,
  'chevrons-right': IconChevronsRight,
  selector: IconSelector,
  menu: IconMenu,
  'menu-2': IconMenu2,
  dots: IconDots,
  'dots-vertical': IconDotsVertical,
  filter: IconFilter,
  'adjustments-horizontal': IconAdjustmentsHorizontal,
  columns: IconColumns,
  'layout-dashboard': IconLayoutDashboard,
  'layout-sidebar': IconLayoutSidebar,
  table: IconTable,
  list: IconList,
  settings: IconSettings,
  user: IconUser,
  users: IconUsers,
  'user-circle': IconUserCircle,
  id: IconId,
  building: IconBuilding,
  'building-store': IconBuildingStore,
  briefcase: IconBriefcase,
  receipt: IconReceipt,
  'report-money': IconReportMoney,
  'shopping-cart': IconShoppingCart,
  package: IconPackage,
  truck: IconTruck,
  box: IconBox,
  archive: IconArchive,
  inbox: IconInbox,
  calendar: IconCalendar,
  clock: IconClock,
  history: IconHistory,
  mail: IconMail,
  bell: IconBell,
  message: IconMessage,
  notes: IconNotes,
  book: IconBook,
  bookmark: IconBookmark,
  paperclip: IconPaperclip,
  photo: IconPhoto,
  tag: IconTag,
  star: IconStar,
  'chart-bar': IconChartBar,
  'chart-line': IconChartLine,
  'chart-pie': IconChartPie,
  activity: IconActivity,
  database: IconDatabase,
  server: IconServer,
  key: IconKey,
  lock: IconLock,
  shield: IconShield,
  login: IconLogin,
  logout: IconLogout,
  sun: IconSun,
  moon: IconMoon,
  'device-desktop': IconDeviceDesktop,
  keyboard: IconKeyboard,
  help: IconHelp,
  'help-circle': IconHelpCircle,
  'info-circle': IconInfoCircle,
  'alert-triangle': IconAlertTriangle,
  'alert-circle': IconAlertCircle,
  'circle-check': IconCircleCheck,
  trash: IconTrash,
  pencil: IconPencil,
  eye: IconEye,
  'eye-off': IconEyeOff,
  copy: IconCopy,
  download: IconDownload,
  upload: IconUpload,
  'external-link': IconExternalLink,
  link: IconLink,
  refresh: IconRefresh,
  world: IconWorld,
  'credit-card': IconCreditCard,
  cash: IconCash,
  'currency-dollar': IconCurrencyDollar,
  'sort-ascending': IconSortAscending,
  'sort-descending': IconSortDescending,
  'arrows-sort': IconArrowsSort,
})

/**
 * The names of Crisp's built-in icons, sorted, for docs and for apps that check a name.
 *
 * @example
 * CRISP_ICON_NAMES.includes('truck') // true
 */
export const CRISP_ICON_NAMES: readonly string[] = Object.freeze(Object.keys(CRISP_ICONS).sort())
