# @strutvane/design-crisp

## 0.2.0-next.1

### Patch Changes

- Requires `@strutvane/ui` `^0.2.0-next.1`, the first ui version on npm (`0.2.0-next.0` was never
  published), and is tested against exactly that version.

## 0.2.0-next.0

### Minor Changes

- Crisp, the default Strutvane admin design, on the `@strutvane/ui` v2 Design contract: light and
  dark tokens with an accent that follows `--brand-hue` (WCAG AA at every hue), Inter Variable and
  Geist Mono, the shell (sidebar, top bar, inset panel, drawer, auth layout, page header), all
  sixteen component skins, Tabler icons with `createCrisp({ icons })` for more, original
  illustrations and the chart palette. Ships `crisp.css` for strict CSPs and `fonts.css`. Passes
  `designConformance()` in full.
