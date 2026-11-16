---
name: design-change
description: Playbook for changing Crisp's look (tokens, a slot, the stylesheet, an illustration or an icon). Use before touching src/tokens.ts, src/styles/, src/shell/, src/skins/ or src/illustrations.tsx.
---

# Changing Crisp

1. **Read DESIGN.md first.** A change that conflicts with the mood (§1) or a rule (§7) updates the spec in the same change.
2. **Colours:** add or change them only in `src/tokens.ts`, in BOTH themes. Accent roles stay `oklch(L C var(--brand-hue))`. `test/tokens.test.ts` checks contrast at all 24 hues.
3. **Stylesheet:** scope every rule with `R` (`[data-sv-design="crisp"]`); colours only `var(--sv-*)`; widths above 375 px only inside `min()`; no `!important`, `@import` or `url()`.
4. **Slots:** spread the prop bags, place the ids, keep native elements. Never add a `style` prop.
5. **Icons:** add the Tabler name and its deep import to `src/icons.ts`.
6. **Tests:** the unit test for the slot, then `npm run ci` (conformance renders every reference screen with axe). Look at the change in a browser at 1440 and 375 px, light and dark.
7. Add a changeset (`minor` for a visible change before 1.0) and update DESIGN.md or the README.
