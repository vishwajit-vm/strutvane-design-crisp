# Crisp: clean, minimal, business-first

> **Crisp** is the **default design** of the Strutvane admin UI (`@strutvane/ui`), chosen on
> 2026-11-14 from design direction C, "Minimal Enterprise" (hub spike 19). It ships as
> `@strutvane/design-crisp`; `@strutvane/design-vivid` ships alongside it. Original design.
> Every value below is the one in [`src/tokens.ts`](src/tokens.ts) (the only file with colour
> literals) and [`src/styles/`](src/styles/); the rules marked **(tested)** are enforced by the
> package's tests and by `designConformance()`.

## 0. What a design package provides

`@strutvane/ui` owns the behaviour: data, routing, forms, tables, filters, the command palette,
shortcuts, focus and ARIA. A design owns the look, through the Design contract
(`defineDesign()`, the ui repo's `docs/design-contract.md`):

1. **Tokens, light and dark:** the 28 colour roles, two shadows, and the sizes (radii, control and
   row heights, spacing, sidebar width, type sizes). Nothing else may contain a colour **(tested)**.
2. **Fonts:** Inter Variable and Geist Mono, self-hosted through `@fontsource` (`fonts.css`).
3. **Shell:** sidebar, top bar, inset content panel, mobile navigation drawer, page header and the
   auth layout.
4. **Component skins:** button, input, textarea, select, checkbox, field, card, badge, alert,
   table, dialog, popover, toast, chip, skeleton and icon. Behaviour stays in `@strutvane/ui`.
5. **Chart palette:** four series per theme; series 1 is the accent.
6. **Illustrations:** original line drawings for empty, not-found, forbidden and error states, plus
   the brand tile, painted only through token classes so they follow the theme.

## 1. Mood

Calm precision. The interface should feel like a well-made instrument: quiet surfaces, crisp
hairlines, numbers that line up, and one confident colour that always means "this is the action"
or "this is where you are". Nothing decorates; everything aligns.

- **Near-monochrome.** Zinc-tinted neutrals do 95% of the work. Status uses small dots, not fills.
- **One accent: cobalt by default.** Primary button, focus ring, selection, current page in the
  pagination, links, the leading chart series. Never two accent buttons on screen. An app changes
  the hue with `--brand-hue`; the whole accent family follows.
- **Borders, not shadows.** Structure comes from 1 px hairlines. Only floating layers (popovers,
  dialogs, toasts, the drawer) cast a shadow; the inset panel and the current nav item carry a 1 px
  one.
- **Dense but breathable.** 13 px working text, 32 px controls, 40 px rows by default, a strict
  4 px grid.
- **Keyboard-first.** `Ctrl/⌘ K` reaches everything, and focus is always a visible 2 px ring.
- **Equal themes.** Dark is designed, not inverted: its own surfaces, borders, accent and status
  values, each contrast-tested.

## 2. Palette and tokens

Components name **roles** (`var(--sv-surface)`, `var(--sv-fg-muted)`), never colours. A role's CSS
property is `--sv-<role in kebab case>`.

### Surfaces and text

| Role | Light | Dark | Use |
|---|---|---|---|
| `bg` | `#f7f7f8` | `#09090b` | Canvas behind the sidebar and the inset panel |
| `surface` | `#ffffff` | `#111113` | Content panel, cards, tables, inputs, dialogs |
| `surfaceSubtle` | `#f4f4f5` | `#18181b` | Hover, table header, search trigger |
| `surfaceMuted` | `#ebebed` | `#222226` | Pressed, skeletons, nav hover |
| `fg` | `#0b0b0f` | `#ededef` | Primary text |
| `fgMuted` | `#52525b` | `#a1a1aa` | Labels, meta, placeholders (AA on every surface) |
| `border` | `#e6e6e9` | `#232327` | Hairlines everywhere (decorative) |
| `input` | `#8a8a93` | `#65656d` | Form control outline: **3:1 against the surface (tested)** |
| `overlay` | `rgb(9 9 11 / 0.32)` | `rgb(0 0 0 / 0.6)` | Modal scrim |
| `mark` / `markFg` | `#fdf0c4` / `#0b0b0f` | `#4a3b00` / `#fff6cc` | Search highlights |

### Accent (follows `--brand-hue`, default 272°, cobalt)

| Role | Light | Dark |
|---|---|---|
| `accent` | `oklch(0.51 0.195 h)` | `oklch(0.52 0.165 h)` |
| `accentHover` | `oklch(0.46 0.19 h)` | `oklch(0.48 0.16 h)` |
| `accentFg` | `#ffffff` | `#ffffff` |
| `accentSubtle` | `oklch(0.957 0.018 h)` | `oklch(0.248 0.053 h)` |
| `accentText` | `oklch(0.48 0.19 h)` | `oklch(0.75 0.13 h)` |
| `ring` | `oklch(0.51 0.195 h)` | `oklch(0.68 0.17 h)` |

`h` is `var(--brand-hue)`. Lightness and chroma were chosen so every pair stays WCAG AA at **every
hue from 0° to 345° in 15° steps (tested)**. Teal (195°) is the hardest hue, which is why the light
accent is a touch darker than the mockup's `#4353e8`.

### Status

| Family | Light (solid / subtle / text) | Dark |
|---|---|---|
| `success` | `#1f9d55` / `#e9f6ef` / `#157046` | `#30a46c` / `#0f2419` / `#4cc38a` |
| `warning` | `#d98b00` / `#fdf4e3` / `#8a5300` | `#e5a000` / `#2a1f0b` / `#f2b84b` |
| `danger` (+ `dangerHover`, `dangerFg`) | `#c9372c` / `#fdeceb` / `#b42318` (hover `#b22d23`) | `#d4392e` / `#2c1313` / `#ff8a80` (hover `#bd3128`) |

### Charts and elevation

- **Chart palette:** series 1 = the accent (3:1 on the surface at every hue, **tested**), series 2 a
  pale accent, then two quiet neutrals, so one series always leads.
- **`shadow.sm`:** two soft 1–2 px layers (light) / one deeper layer (dark). **`shadow.pop`:** a
  1 px ring plus two soft layers, for floating layers only.

**Contrast (tested, both themes, all hues):** every pair the behaviour renders (`CONTRAST_PAIRS` in
`@strutvane/ui/design`): 4.5:1 for text, 3:1 for the focus ring, the input outline, the accent and
the lead chart series.

### Changes from the mockup (spike 19)

1. The accent family is `oklch(… var(--brand-hue))`, no longer hex, so an app can rebrand it.
2. `input` went from `#d4d4d8` (1.5:1) to a mid grey that reaches 3:1 (WCAG 1.4.11).
3. The contract has no `fg-subtle`, `border-strong`, `inverse` or avatar roles; Crisp uses
   `fgMuted`, `border`/`input` and `fg`-on-`bg` instead (see the README's contract notes).

## 3. Typography

- **UI: Inter Variable** (OFL 1.1) with `cv11` and `ss03` (single-storey a, rounded quotes). It is
  the default of the public `--font-sans` token, so an app can swap it.
- **Numbers and code: Geist Mono** (OFL 1.1, weights 400 and 500) for ids, counts and code.
- **Titles:** semibold, −0.015 em tracking.

| Token | Size | Use |
|---|---|---|
| `fontSizeSm` | 12 px | Captions, table headers, badges, breadcrumbs, help |
| `fontSize` | 13 px | **Working size:** body, tables, controls, menus |
| (fixed) | 14 px | Dialog titles, the palette input |
| `fontSizeLg` | 20 px | Page titles (`h1`) |

Weights: 400 body, 500 labels/buttons/values, 600 headings. Never 700+.

## 4. Scales

- **Spacing:** a 4 px unit (`space` = `calc(4px * var(--density))`). Rhythm: 4 inside controls,
  8 between related controls, 12 between blocks, 16 card padding, 24 page padding.
- **Density:** controls `calc(32px * var(--density))`, rows `calc(40px * var(--density))`. The
  list's compact toggle multiplies both by 0.8 (≈ 26 / 32 px).
- **Radius:** `radiusSm` = ½ `--radius` (3 px: badges, chips, kbd), `radiusMd` = `--radius` (6 px:
  controls, nav items), `radiusLg` = 1.5 × (9 px: cards, tables, popovers, the panel); dialogs and
  the auth card use ≈ 12 px.
- **Shell:** sidebar 240 px; top bar 48 px.
- **Borders:** always 1 px; dashed only around the filter form.
- **Motion:** 140 ms pop-in (opacity + 2 px + 0.98 scale) for dialogs and popovers, 220 ms rise for
  toasts and slide for the drawer, all `cubic-bezier(0.2, 0.8, 0.2, 1)`.
  `prefers-reduced-motion` reduces everything to 1 ms.

## 5. Layout

- **Shell:** the sidebar sits on the canvas; content lives in an **inset panel** (8 px margin,
  hairline, `radiusLg`, `shadow.sm`). Below 1024 px the panel is full-bleed and the sidebar is a
  drawer over a scrim, opened by the top bar's menu button.
- **Top bar:** the search trigger (a quiet field with its `Ctrl K` hint), then theme, workspace and
  account on the right. Below 640 px the search moves to its own full-width row.
- **Page header:** breadcrumbs (12 px) → one row with back, title, count/status and actions. The
  title keeps a 16 rem basis, so on phones the actions wrap to their own row.
- **No horizontal scroll at 375 px (tested):** every content column has `min-width: 0`; tables
  scroll inside their own positioned box.

## 6. Components

| Component | Spec |
|---|---|
| Button | `primary` accent; `secondary` surface + hairline + 1 px shadow; `ghost` for toolbars and row actions; `danger` only inside confirmations. `type="button"` by default. A glyph label (`☰`, `×`) next to an `icon` is replaced by the icon. |
| Inputs | 32 px, `input` outline (3:1), focus = accent border + 2 px ring; `aria-invalid` turns it danger. Native select with a decorative chevron. |
| Field | Label (13/500), required `*` in danger text, control, one line of help or an inline error with an icon. |
| Badge | Neutral pill + 6 px dot + word. The word carries the status. |
| Alert | A quiet tint of the tone with its text colour. |
| Table | Positioned scroll box with a hairline and 9 px radius; sticky header on `surfaceSubtle`; 40 px rows; tabular figures; hover row tint; selected rows `accentSubtle`. |
| Chip | 26 px, subtle fill, hairline; the remove button inside. |
| Cards | Surface + hairline + 9 px radius, 16 px padding. No shadow. |
| Dialogs | Scrim + pop-in; 420 / 520 / 640 px; title, description, footer with the primary last. The 640 px size frames the command palette (input, grouped options, selected option in `accentSubtle`). |
| Popover | Surface, hairline, pop shadow, 4 px padding; rows are 32 px. |
| Toasts | Bottom-right (full width on phones), surface + hairline + pop shadow, a tone dot, optional Undo. |
| Empty states | Original line drawings in token colours with one accent detail, a one-line reason and the next action. |

## 7. Do and don't

**Do**
- Use one primary button per view; everything else secondary or ghost.
- Keep status quiet (dot + word); let danger be the only warm colour on a page.
- Give every icon-only button an `aria-label`.
- Add new colours as tokens in both themes, then extend the contrast test.

**Don't**
- Don't use shadows to separate content that sits on the page; use a hairline.
- Don't fill whole badges or rows with status colour.
- Don't write a colour outside `src/tokens.ts` (the test fails), or an inline `style` (a strict CSP
  blocks it).
- Don't hide information only in a tooltip, or convey state by colour alone.
- Don't animate longer than 220 ms or move things more than 16 px.

## 8. Assets and licences

Inter (OFL 1.1) and Geist Mono (OFL 1.1) via `@fontsource`; icons from Tabler Icons (MIT, decision
57) via `@tabler/icons-react`. The brand tile and the four illustrations are original SVGs drawn for
Strutvane. No CSS, markup, images or logos were copied from any product or template.
