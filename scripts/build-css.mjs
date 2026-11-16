#!/usr/bin/env node
// @ts-check
/**
 * Writes the CSS files of the package after `tsdown` has built `dist/index.mjs`:
 *   - dist/crisp.css  the full design stylesheet (tokens for light and dark, the public override
 *                     defaults, Crisp's rules), exactly what <DesignProvider> would inject. Apps
 *                     with a strict CSP and no nonce serve this file and pass injectStyles={false}.
 *   - dist/fonts.css  the @fontsource imports (copied from src/fonts.css).
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

mkdirSync(dist, { recursive: true })
writeFileSync(join(dist, 'crisp.css'), designStylesheet(crisp), 'utf8')
copyFileSync(join(root, 'src', 'fonts.css'), join(dist, 'fonts.css'))
process.stdout.write('Wrote dist/crisp.css and dist/fonts.css\n')
