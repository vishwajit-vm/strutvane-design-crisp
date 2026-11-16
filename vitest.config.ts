import { defineConfig, mergeConfig } from 'vitest/config'
import { sharedConfig } from './vitest.shared.ts'

// Repo-specific overrides. Shared defaults come from strutvane-tooling.
// - Token, stylesheet and package tests run in the default `node` environment; rendering tests
//   opt into jsdom with a `// @vitest-environment jsdom` comment at the top of the file.
// - jsdom (not happy-dom): axe-core needs the accessibility APIs jsdom implements more completely.
// - The conformance suite renders the whole reference app per screen, so allow more than 5 s.
export default mergeConfig(
  sharedConfig,
  defineConfig({
    test: {
      include: ['test/**/*.test.{ts,tsx}'],
      testTimeout: 30_000,
      coverage: {
        include: ['src/**/*.{ts,tsx}'],
        exclude: ['src/**/index.ts'],
      },
    },
  }),
)
