#!/usr/bin/env node
// @ts-check
/**
 * Writes the CSS files of the package after `tsdown` has built `dist/index.mjs`:
 *   - dist/crisp.css  the full design stylesheet (tokens for light and dark, the public override
 *                     defaults, Crisp's rules), exactly what <DesignProvider> would inject. Apps
 *                     with a strict CSP and no nonce serve this file and pass injectStyles={false}.
 *   - dist/fonts.css  the @fontsource imports (copied from src/fonts.css).
 *   - dist/css.d.mts  the (empty) types of both CSS entries, so a side-effect import such as
 *                     `import '@strutvane/design-crisp/crisp.css'` type-checks and every export
 *                     path resolves in TypeScript (node16 and bundler; production readiness R5).
 *
 * It imports the BUILT design, so the file always matches what the package exports.
 */
import { copyFileSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { designStylesheet } from '@strutvane/ui/design'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const { crisp } = await import(pathToFileURL(join(dist, 'index.mjs')).href)

const CSS_TYPES = [
  '// A stylesheet entry: import it for its side effect; it exports nothing.',
  'export {}',
  '',
].join('\n')

mkdirSync(dist, { recursive: true })
writeFileSync(join(dist, 'crisp.css'), designStylesheet(crisp), 'utf8')
copyFileSync(join(root, 'src', 'fonts.css'), join(dist, 'fonts.css'))
writeFileSync(join(dist, 'css.d.mts'), CSS_TYPES, 'utf8')
process.stdout.write('Wrote dist/crisp.css, dist/fonts.css and dist/css.d.mts\n')
