---
description: Run the pre-PR checklist for this repo
---

Run the pre-PR checklist for Crisp:
1. `git status` and `git diff`: summarise the change.
2. Run `npm run ci`. Report the exact results, including the conformance suite and coverage.
3. Confirm there is a changeset, and that README or DESIGN.md is updated for any visible change.
4. Confirm colour literals appear only in `src/tokens.ts` and no inline styles were added.
5. Confirm no `.env`, secrets or Docker files are staged.
6. Invoke the `crisp-design-reviewer` subagent on the diff and include its findings.
End with: ready / not ready, and why.
