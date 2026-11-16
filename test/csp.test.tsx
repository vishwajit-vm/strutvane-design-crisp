// @vitest-environment jsdom
/**
 * Decision 119 (CSP): Crisp's styles reach the page only through the `<style nonce>` that
 * `<DesignProvider>` injects, or through the static `crisp.css` file. No source file writes an
 * inline `style` attribute, a `<style>` element of its own, or HTML strings.
 */
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { DesignProvider } from '@strutvane/ui/design'
import { cleanup, render } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { crisp } from '../src/index.ts'

afterEach(cleanup)

const SRC = join(import.meta.dirname, '..', 'src')

function sourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? sourceFiles(join(dir, entry.name))
      : /\.(?:ts|tsx)$/.test(entry.name)
        ? [join(dir, entry.name)]
        : [],
  )
}

describe('CSP', () => {
  it('no source file sets an inline style, renders a <style>, or injects HTML', () => {
    const offenders: string[] = []
    for (const file of sourceFiles(SRC)) {
      const text = readFileSync(file, 'utf8')
      if (/\bstyle=\{|\bstyle:\s*\{|<style\b|dangerouslySetInnerHTML|\.innerHTML\s*=/.test(text))
        offenders.push(file)
    }
    expect(offenders).toEqual([])
  })

  it('the provider injects Crisp’s stylesheet into one <style> carrying the request nonce', () => {
    const { container } = render(
      <DesignProvider design={crisp} theme="light" nonce="r4nd0m">
        <p>app</p>
      </DesignProvider>,
    )
    const styles = container.querySelectorAll('style')
    expect(styles).toHaveLength(1)
    const style = styles[0]
    expect(style?.getAttribute('nonce') ?? style?.nonce).toBe('r4nd0m')
    expect(style?.getAttribute('data-sv-design-styles')).toBe('crisp')
    expect(style?.textContent).toContain(crisp.stylesheet)
  })

  it('with injectStyles={false} nothing is injected (serve crisp.css as a file instead)', () => {
    const { container } = render(
      <DesignProvider design={crisp} theme="dark" injectStyles={false}>
        <p>app</p>
      </DesignProvider>,
    )
    expect(container.querySelector('style')).toBeNull()
    expect(container.querySelector('[data-sv-design="crisp"]')?.getAttribute('data-sv-theme')).toBe(
      'dark',
    )
  })
})
