# CLAUDE.md: Crisp (`@strutvane/design-crisp`)

Project memory for Claude Code in this repository. Keep this file short, accurate and current.

## Ecosystem memory (shared by every Strutvane repo)

The file below is synced from strutvane-tooling and is identical in every repo. It covers how the whole ecosystem fits together: repo map, decisions, connection rules, standards, workflow and current status. Read it before changing anything.

@.claude/ECOSYSTEM.md

## What this repo is

**Crisp: clean, minimal, business-first.** The default design of the Strutvane admin UI (hub `docs/18-v2-blueprint.md` §5.1, consistency decision 129). It implements the `@strutvane/ui` v2 Design contract (`defineDesign()`; the ui repo's `docs/design-contract.md`) and passes `designConformance()`. The look comes from spike 19 (`../../spikes/19-design-c-minimal`, DESIGN-C.md); the human-readable spec is `DESIGN.md` here.

## Status

- `0.2.0-next.0` (changesets pre mode `next`, core train decision 128), **not released**. The GitHub repo `vishwajit-vm/strutvane-design-crisp` and the tooling manifest entry are created by the coordinator.
- **TEMPORARY:** `@strutvane/ui@0.2.0-next.0` is not on npm yet. Locally its build is copied into `node_modules/@strutvane/ui` (never a `file:`/`link:` spec in package.json). Once it is published, run `npm install` once so the lockfile records it; then `npm ci` works in CI.

## Commands

```bash
npm install
npm run ci                                             # biome → tsc → vitest --coverage → tsdown → CSS files
node_modules/.bin/vitest run test/conformance.test.ts  # the Design contract's suite
node ../tooling/scripts/sync.mjs --repo design-crisp   # re-sync shared configs from tooling
```

## Structure

- `src/tokens.ts`: **the only file with colour literals** (light, dark, scale, chart palette, defaults).
- `src/fonts.ts` + `src/fonts.css`: Inter Variable and Geist Mono (OFL) via @fontsource.
- `src/icons.ts`: the curated Tabler icon map (decision 57), deep imports only.
- `src/shell/`: Shell, Sidebar, TopBar, AuthLayout, PageHeader. `src/skins/`: Button, Icon, form controls, surfaces, overlays.
- `src/illustrations.tsx`: original line drawings and the brand tile (CSS classes only, no colours).
- `src/styles/`: the stylesheet string (base, shell, controls, surfaces, behaviour parts), scoped to `[data-sv-design="crisp"]`.
- `src/design.ts`: `createCrisp({ icons })` and `crisp`.
- `scripts/build-css.mjs`: writes `dist/crisp.css` (= `designStylesheet(crisp)`) and `dist/fonts.css` after tsdown.

## Invariants (tests guard these)

- `designConformance(crisp)` passes: slots, AA contrast in both themes at all 24 brand hues, no hard-coded colours outside `src/tokens.ts`, overrides take effect, no 375 px overflow, axe 0 on every reference screen. `test/screens.test.tsx` repeats axe and overflow in dark and with every override.
- The accent family is `oklch(L C var(--brand-hue))`; `input` reaches 3:1 on `surface` and `bg`.
- No inline `style` attributes, `<style>` elements or HTML injection in `src/` (CSP, decision 119).
- Every stylesheet rule is scoped to the Crisp root; no `!important`, `@import` or `url()`.

## Boundaries

- Peers only: `@strutvane/ui` (`^0.2.0-next.0`) and `react`. Never import the framework, auth or another design.
- Slots never fetch, keep app state or read the manifest; they place what the behaviour hands them.
- A contract gap is fixed in `@strutvane/ui` (with an RFC), not worked around with private hooks here.

## Definition of done

Code, tests, docs (README or DESIGN.md) and a changeset ship together; `npm run ci` is green three times in a row.
