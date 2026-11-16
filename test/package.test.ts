/**
 * Package hygiene (production readiness R5): the manifest a user installs is the one the
 * blueprint asks for. ESM only, Node 24.3+, `@strutvane/ui` and React as peers, CSS shipped as
 * files beside the JS entry, no local or git dependencies, and the catalogue manifest block.
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

interface Manifest {
  readonly name: string
  readonly version: string
  readonly type: string
  readonly license: string
  readonly sideEffects: readonly string[]
  readonly engines: { readonly node: string }
  readonly exports: Record<string, unknown>
  readonly files: readonly string[]
  readonly dependencies: Record<string, string>
  readonly peerDependencies: Record<string, string>
  readonly devDependencies: Record<string, string>
  readonly publishConfig: { readonly access: string; readonly provenance: boolean }
  readonly strutvane: Record<string, unknown>
}

const ROOT = join(import.meta.dirname, '..')
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as Manifest

describe('package.json', () => {
  it('is the public, ESM-only @strutvane/design-crisp on the core train (0.2.0-next.N)', () => {
    expect(pkg.name).toBe('@strutvane/design-crisp')
    expect(pkg.version).toMatch(/^0\.2\.0-next\.\d+$/)
    expect(pkg.type).toBe('module')
    expect(pkg.license).toBe('MIT')
    expect(pkg.publishConfig).toEqual({ access: 'public', provenance: true })
  })

  it('needs Node 24.3 or later', () => {
    expect(pkg.engines.node).toBe('>=24.3')
  })

  it('has @strutvane/ui (the v2 Design contract) and React as peers, not dependencies', () => {
    expect(pkg.peerDependencies).toEqual({ '@strutvane/ui': '^0.2.0-next.0', react: '^19.2.0' })
    expect(pkg.dependencies['@strutvane/ui']).toBeUndefined()
    expect(pkg.dependencies['react']).toBeUndefined()
  })

  it('exports the JS entry with types first, plus the two CSS files', () => {
    expect(pkg.exports['.']).toEqual({ types: './dist/index.d.mts', default: './dist/index.mjs' })
    // The CSS entries carry empty types, so a side-effect import type-checks (attw, R5).
    expect(pkg.exports['./crisp.css']).toEqual({
      types: './dist/css.d.mts',
      default: './dist/crisp.css',
    })
    expect(pkg.exports['./fonts.css']).toEqual({
      types: './dist/css.d.mts',
      default: './dist/fonts.css',
    })
    expect(pkg.sideEffects).toEqual(['*.css'])
  })

  it('publishes only dist and the docs', () => {
    expect([...pkg.files].sort()).toEqual(
      ['CHANGELOG.md', 'DESIGN.md', 'LICENSE', 'README.md', 'dist'].sort(),
    )
  })

  it('every dependency comes from the registry, pinned (no file:, link:, git or ranges)', () => {
    const all = { ...pkg.dependencies, ...pkg.devDependencies }
    for (const [name, spec] of Object.entries(all))
      expect(spec, name).toMatch(/^\d+\.\d+\.\d+(?:-[\w.]+)?$/)
  })

  it('declares the catalogue block of a design package', () => {
    expect(pkg.strutvane).toMatchObject({ kind: 'design', id: 'crisp', displayName: 'Crisp' })
  })
})
