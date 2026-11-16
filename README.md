# Crisp: `@strutvane/design-crisp`

**Clean, minimal, business-first.** Crisp is the default design of the
[Strutvane](https://github.com/vishwajit-vm/strutvane) admin UI: quiet zinc neutrals, one
confident accent that follows your brand hue, hairlines instead of shadows, dense readable tables,
and equal light and dark themes. Good for back office, ERP, finance and B2B SaaS admin.

It implements the [`@strutvane/ui`](https://github.com/vishwajit-vm/strutvane-ui) Design contract
(`defineDesign()`) and passes `designConformance()`: every slot, WCAG AA contrast in both themes at
every brand hue, no hard-coded colours, axe with 0 violations on the reference screens, and no
horizontal scroll at 375 px.

> **Status:** `0.2.0-next.0` pre-release on the core train (with `@strutvane/ui` 0.2). Not
> released on npm yet.

## Install

A new app picks Crisp by default (`npm create strutvane@latest`, or `--design crisp`). To add it
to an existing app:

```bash
npm install @strutvane/design-crisp
```

Peer dependencies: `@strutvane/ui@^0.2.0-next.0` and `react@^19.2.0`. Node 24.3 or later. ESM only.

## Use

```tsx
import '@strutvane/design-crisp/fonts.css' // Inter Variable + Geist Mono (optional; falls back to system fonts)
import { DesignProvider } from '@strutvane/ui/design'
import { StrutvaneApp } from '@strutvane/ui/react'
import { crisp } from '@strutvane/design-crisp'

export function Admin({ nonce }: { nonce: string }) {
  return (
    <DesignProvider design={crisp} nonce={nonce}>
      <StrutvaneApp apiUrl="/api" appName="Northwind Ops" />
    </DesignProvider>
  )
}
```

`<DesignProvider>` injects Crisp's stylesheet into one `<style nonce>` (pass your request's CSP
nonce). With a strict CSP and no nonce, serve the stylesheet as a file and turn injection off:

```tsx
import '@strutvane/design-crisp/crisp.css' // or <link rel="stylesheet" href="…/crisp.css">

<DesignProvider design={crisp} injectStyles={false}>…</DesignProvider>
```

Crisp's components never write inline `style` attributes, so `style-src 'self'` (plus the nonce,
if you inject) is enough. Add `THEME_SCRIPT` and its `THEME_SCRIPT_HASH` from
`@strutvane/ui/design` to avoid a light flash for dark-mode users.

### More icons

Crisp draws [Tabler](https://tabler.io/icons) icons by name. It bundles about 100 common ones
(`CRISP_ICON_NAMES`); an unknown name draws nothing (labels always carry the meaning). If your
resources name others in `ui.icon`, add them:

```ts
import IconTruckDelivery from '@tabler/icons-react/icons/IconTruckDelivery'
import { createCrisp } from '@strutvane/design-crisp'

export const design = createCrisp({ icons: { 'truck-delivery': IconTruckDelivery } })
```

`createCrisp` throws a `CrispOptionsError` listing every problem if a name or component is unusable.

## Brand it: the override tokens

Four public tokens rebrand Crisp (and any other Strutvane design). Set them in your own
`resources/ui/theme.css`, or pass them to `<DesignProvider overrides>`:

| Token | Crisp default | What it changes |
|---|---|---|
| `--brand-hue` | `272` (cobalt) | The whole accent family: primary buttons, focus ring, links, selection, chart series 1 and 2 |
| `--font-sans` | `'Inter Variable', …, system-ui, sans-serif` | The UI font |
| `--radius` | `6px` | Corners: 3 / 6 / 9 px for small, control and card radii |
| `--density` | `1` | Control height (32 px), row height (40 px) and spacing |

```css
/* resources/ui/theme.css */
:root {
  --brand-hue: 150;   /* green */
  --radius: 4px;
  --density: 0.9;
}
```

```tsx
<DesignProvider design={crisp} overrides={{ brandHue: 150, radius: '4px', density: 0.9 }}>
```

Crisp's defaults sit at zero specificity, so your values always win. Every hue keeps AA contrast:
the accent's lightness and chroma were chosen for the hardest hue (teal), and the tests check all
24 hues in 15° steps.

## Exports

| Export | What |
|---|---|
| `crisp` | The design, ready for `<DesignProvider design={crisp}>` |
| `createCrisp({ icons })`, `CrispOptions`, `CrispOptionsError` | The same design with extra icons |
| `crispLight`, `crispDark`, `crispScale`, `crispChartPalette`, `CRISP_DEFAULTS`, `CRISP_FONTS` | The tokens, for charts and custom screens |
| `CRISP_ICONS`, `CRISP_ICON_NAMES`, `CrispIconComponent`, `CrispIconProps` | The built-in icons |
| `EmptyArt`, `NotFoundArt`, `ForbiddenArt`, `ErrorArt`, `BrandMark` | The illustrations |
| `CRISP_STYLESHEET` | Crisp's rules (without the token blocks `@strutvane/ui` adds) |
| `@strutvane/design-crisp/crisp.css` | The full generated stylesheet as a file |
| `@strutvane/design-crisp/fonts.css` | The `@fontsource` imports |

## What it looks like

Checked in a browser (Chromium) at 1440 px and 375 px, light and dark:

- **Shell:** a 240 px sidebar on the pale canvas with the brand tile and the app name, grouped
  links with Tabler icons and muted counts; the current page is a small white chip with a hairline.
  Content sits in an inset white panel with an 8 px margin and a 9 px radius. The 48 px top bar
  holds a quiet search field with a `Ctrl K` hint and, on the right, the theme select and Sign out.
- **List:** breadcrumbs, a 20 px semibold title with the cobalt **New post** button on the same
  row, the search field, Columns and Compact rows, a dashed filter form, then a dense table in its
  own bordered box: grey sticky header, 40 px rows, hairlines between rows, ghost row actions.
- **Form:** 32 px fields with mid-grey outlines that are easy to find, red `*` for required fields,
  muted help lines, inline errors with an icon, and a sticky action bar with the primary button
  first.
- **Sign-in:** one centred card on the canvas over a faint dot grid, the brand tile and app name
  above it, a full-width primary button.
- **Dark:** near-black canvas, a slightly lighter panel, light text and a brighter accent ring; the
  command palette is a 640 px dialog 12 vh from the top with grouped results and the selected one
  tinted with the accent.
- **Phone (375 px):** no horizontal scroll; the sidebar becomes a drawer over a scrim, the search
  takes its own row, page actions wrap under the title, and tables scroll inside their box.

The full visual spec (mood, palette, scales, components, do and don't) is [DESIGN.md](DESIGN.md).

## Contract notes

Crisp fills the Design contract exactly. A few spike-19 details it can't express yet are listed in
the coordinator's report and tracked for `@strutvane/ui`: design-private colour roles (Crisp maps
`fg-subtle`, `border-strong` and `inverse` onto existing roles), an icon-only flag on `Button`
(Crisp replaces a glyph label like `☰` with the icon), and a dedicated palette slot.

## Development

```bash
npm install
npm run ci   # biome → tsc → vitest with coverage (designConformance included) → tsdown → CSS files
```

See [CONTRIBUTING.md](CONTRIBUTING.md). Security reports: [SECURITY.md](SECURITY.md).

## The Strutvane ecosystem

| Package | Role |
|---|---|
| [`@strutvane/framework`](https://github.com/vishwajit-vm/strutvane-framework) | Backend, ORM, migrations, CRUD API, `node strut` |
| [`@strutvane/auth`](https://github.com/vishwajit-vm/strutvane-auth) | Sign-in, tokens, 2FA, teams |
| [`@strutvane/ui`](https://github.com/vishwajit-vm/strutvane-ui) | Admin behaviour: auto CRUD screens, sidebar, palette, shortcuts |
| **`@strutvane/design-crisp`** | **The default look (this package)** |
| `@strutvane/design-vivid` | Colourful, roomier dashboards |
| [`create-strutvane`](https://github.com/vishwajit-vm/create-strutvane) | The installer |

Hub (blueprint, decisions, roadmap): https://github.com/vishwajit-vm/strutvane

## Licence

[MIT](LICENSE) © The Strutvane Authors. Fonts: SIL OFL 1.1. Icons: Tabler Icons, MIT.
