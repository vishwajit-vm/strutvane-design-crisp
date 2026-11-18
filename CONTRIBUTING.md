# Contributing to Crisp

Thanks for your interest! Crisp (`@strutvane/design-crisp`) is the default design of
[Strutvane](https://github.com/vishwajit-vm/strutvane)'s admin UI.

## Ground rules
- Be kind and constructive. We follow the [Contributor Covenant](https://www.contributor-covenant.org/version/2/1/code_of_conduct/).
- Changes to the Design contract itself go to [`@strutvane/ui`](https://github.com/vishwajit-vm/strutvane-ui) (and an RFC) first.
- Every change ships with tests, docs (README or DESIGN.md) and a changeset.
- Colours live only in `src/tokens.ts`. Everything else names a role (`var(--sv-surface)`).
- Original assets only: no CSS, markup, images or icons copied from commercial templates.
- Sign off your commits (Developer Certificate of Origin): `git commit -s`.

## Development
Requirements: Node 24.3+ and npm 11.19+.

```bash
npm install
npm run ci          # biome → tsc → vitest with coverage (incl. designConformance) → build
```

`@strutvane/ui` is a peer dependency and also a pinned devDependency, so the tests run against
the exact published version the peer range starts at. To try an unreleased ui change, link a
local build into `node_modules/@strutvane/ui` (dev only; never commit a `file:` or `link:`
dependency).
