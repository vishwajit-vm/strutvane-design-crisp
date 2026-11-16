// @vitest-environment jsdom
/**
 * Crisp's shell slots and illustrations: they place exactly what the behaviour hands them (skip
 * link first, `<main>` as given, the title id on the `<h1>`, links through the behaviour's `Link`)
 * and the drawings stay decorative.
 */
import type { NavLinkProps, SidebarLinkView } from '@strutvane/ui/design'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { BrandMark, crisp, EmptyArt, ErrorArt, ForbiddenArt, NotFoundArt } from '../src/index.ts'

afterEach(cleanup)

const { Shell, Sidebar, TopBar, AuthLayout, PageHeader } = crisp.shell

function TestLink({ to, current, ...rest }: NavLinkProps): ReactElement {
  return <a href={to} aria-current={current ? 'page' : undefined} {...rest} />
}

const link = (
  path: string,
  label: string,
  current: boolean,
  badge?: number,
  icon = 'file',
): SidebarLinkView => ({
  entry: {
    name: path,
    label,
    path,
    icon,
    group: undefined,
    order: 0,
    permission: path,
    ...(badge === undefined ? {} : { badge }),
  },
  current,
  accessibleName: badge === undefined ? label : `${label}, ${badge}`,
})

describe('Shell', () => {
  it('renders the skip link first, then the sidebar, top bar and main inside the panel', () => {
    const { container } = render(
      <Shell
        skipLink={<a href="#main">Skip to content</a>}
        sidebar={<nav aria-label="Main" />}
        topBar={<header>bar</header>}
        main={<main id="main">page</main>}
        navOpen={false}
        onCloseNav={() => {}}
      />,
    )
    const shell = container.firstElementChild
    expect(shell?.firstElementChild?.textContent).toBe('Skip to content')
    expect(shell?.hasAttribute('data-nav-open')).toBe(false)
    expect(container.querySelector('.svc-scrim')).toBeNull()
    expect(container.querySelector('.svc-panel main')?.textContent).toBe('page')
  })

  it('shows a scrim while the drawer is open, and a click on it closes the drawer', () => {
    const onCloseNav = vi.fn()
    const { container } = render(
      <Shell
        skipLink={null}
        sidebar={null}
        topBar={null}
        main={<main />}
        navOpen
        onCloseNav={onCloseNav}
      />,
    )
    expect(container.firstElementChild?.getAttribute('data-nav-open')).toBe('true')
    const scrim = container.querySelector('.svc-scrim')
    expect(scrim).not.toBeNull()
    fireEvent.click(scrim as Element)
    expect(onCloseNav).toHaveBeenCalledOnce()
  })
})

describe('Sidebar', () => {
  it('renders the brand, group headings, icons, badges and the current page', () => {
    render(
      <Sidebar
        label="Main"
        brand={<a href="/">Acme</a>}
        Link={TestLink}
        Icon={crisp.skins.Icon}
        groups={[
          { label: undefined, links: [link('/', 'Home', false, undefined, 'home')] },
          {
            label: 'Sales',
            links: [link('/invoices', 'Invoices', true, 35), link('/x', 'Unknown', false)],
          },
        ]}
      />,
    )
    const nav = screen.getByRole('navigation', { name: 'Main' })
    expect(nav.querySelector('.svc-mark')?.getAttribute('aria-hidden')).toBe('true')
    expect(screen.getByText('Sales').className).toBe('svc-nav-heading')
    const current = screen.getByRole('link', { name: 'Invoices, 35' })
    expect(current.getAttribute('aria-current')).toBe('page')
    expect(current.querySelector('.svc-nav-badge')?.textContent).toBe('35')
    expect(current.querySelector('svg')).not.toBeNull()
    expect(screen.getByRole('link', { name: 'Home' }).querySelector('.svc-nav-badge')).toBeNull()
    expect(nav.querySelectorAll('.svc-nav-heading')).toHaveLength(1)
  })
})

describe('TopBar, AuthLayout and PageHeader', () => {
  it('TopBar places the menu button, search and actions', () => {
    render(
      <TopBar
        menuButton={<button type="button">Menu</button>}
        search={<button type="button">Search</button>}
        actions={<button type="button">Sign out</button>}
      />,
    )
    const bar = screen.getByRole('banner')
    expect(bar.querySelector('.svc-topbar-menu')?.textContent).toBe('Menu')
    expect(bar.querySelector('.svc-topbar-search')?.textContent).toBe('Search')
    expect(bar.querySelector('.svc-topbar-actions')?.textContent).toBe('Sign out')
  })

  it('AuthLayout shows the app name above the card, without a landmark of its own', () => {
    const { container } = render(
      <AuthLayout appName="Acme">
        <h1>Sign in</h1>
      </AuthLayout>,
    )
    expect(screen.getByText('Acme').className).toBe('svc-auth-app')
    expect(container.querySelector('.svc-auth-card h1')?.textContent).toBe('Sign in')
    expect(container.querySelector('main, header, nav')).toBeNull()
  })

  it('PageHeader puts the title id on the h1 and shows meta and actions', () => {
    render(
      <PageHeader
        title="Invoices"
        titleId="title"
        breadcrumbs={<nav aria-label="Breadcrumbs" />}
        back={<button type="button">Back</button>}
        actions={<button type="button">New</button>}
        meta="238"
      />,
    )
    expect(screen.getByRole('heading', { level: 1 }).id).toBe('title')
    expect(screen.getByText('238').className).toBe('svc-page-meta')
    expect(screen.getByRole('button', { name: 'New' }).parentElement?.className).toBe(
      'svc-page-actions',
    )
  })

  it('PageHeader without meta or actions renders neither', () => {
    const { container } = render(
      <PageHeader title="Home" titleId="h" breadcrumbs={null} back={null} actions={null} />,
    )
    expect(container.querySelector('.svc-page-meta')).toBeNull()
    expect(container.querySelector('.svc-page-actions')).toBeNull()
  })
})

describe('illustrations', () => {
  it('every drawing is a decorative, unfocusable svg that takes a class', () => {
    for (const Art of [EmptyArt, NotFoundArt, ForbiddenArt, ErrorArt]) {
      const { container } = render(<Art className="big" />)
      const svg = container.querySelector('svg')
      expect(svg?.getAttribute('aria-hidden')).toBe('true')
      expect(svg?.getAttribute('focusable')).toBe('false')
      expect(svg?.getAttribute('class')).toBe('svc-art big')
      expect(svg?.querySelector('.svc-art-accent, .svc-art-accent-line')).not.toBeNull()
      cleanup()
    }
  })

  it('a drawing without a class still has the base class, and the design maps all four', () => {
    const { container } = render(<EmptyArt />)
    expect(container.querySelector('svg')?.getAttribute('class')).toBe('svc-art')
    expect(crisp.illustrations).toEqual({
      Empty: EmptyArt,
      NotFound: NotFoundArt,
      Forbidden: ForbiddenArt,
      Error: ErrorArt,
    })
  })

  it('the brand mark is decorative', () => {
    const { container } = render(<BrandMark />)
    expect(container.querySelector('svg')?.getAttribute('aria-hidden')).toBe('true')
  })
})
