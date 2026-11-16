## What & why
<!-- What does this change and why? Link the issue/RFC. -->

## Checklist
- [ ] Tests added or updated (conformance still passes: contrast at every hue, axe, overflow)
- [ ] Colours only in `src/tokens.ts`; the stylesheet uses `var(--sv-*)` only
- [ ] DESIGN.md and README updated for any visible change
- [ ] Changeset added (`npx changeset`)
- [ ] No secrets, `.env` or Docker files committed
- [ ] Respects package boundaries (`@strutvane/ui` and `react` as peers only)
