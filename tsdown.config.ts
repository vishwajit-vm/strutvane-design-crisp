import { defineConfig } from 'tsdown'

// One entry: the design (`crisp`, `createCrisp`, the tokens). React, @strutvane/ui, the fonts and
// the Tabler icons stay external (peers and dependencies). The CSS files (`crisp.css`,
// `fonts.css`) are written after this build by scripts/build-css.mjs.
export default defineConfig({
  entry: { index: 'src/index.ts' },
  format: 'esm',
  platform: 'neutral',
  // .mjs / .d.mts like every other Strutvane package (platform 'neutral' would otherwise emit .js).
  fixedExtension: true,
  target: 'es2024',
  dts: true,
  sourcemap: true,
  clean: true,
})
