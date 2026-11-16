/**
 * Crisp's page frame: the shell, the top bar and the page header.
 *
 * The look (DESIGN.md §5): the sidebar sits on the canvas colour and the content lives in an
 * inset surface panel with an 8 px margin, a hairline and a small radius, which gives the whole
 * app a precise, instrument-like outline. Below 1024 px the panel is full-bleed and the sidebar
 * becomes a drawer that the behaviour opens and closes (`navOpen`).
 *
 * Every slot places exactly what the behaviour hands it (skip link first, `<main>` as given, the
 * title id on the `<h1>`), so the accessibility wiring arrives intact.
 *
 * @module
 */
import type { PageHeaderProps, ShellProps, TopBarProps } from '@strutvane/ui/design'
import type { ReactElement } from 'react'

/**
 * The page frame around every signed-in screen: skip link, sidebar column, then the inset panel
 * with the top bar and `<main>`. On narrow screens the sidebar is a drawer over a scrim.
 *
 * @example
 * <Shell skipLink={skip} sidebar={nav} topBar={bar} main={<main>…</main>} navOpen={false} onCloseNav={close} />
 */
export function Shell(props: ShellProps): ReactElement {
  return (
    <div className="svc-shell" data-sv-part="shell" data-nav-open={props.navOpen || undefined}>
      {props.skipLink}
      {props.navOpen ? (
        // biome-ignore lint/a11y/noStaticElementInteractions: the scrim only mirrors the menu button for pointer users.
        // biome-ignore lint/a11y/useKeyWithClickEvents: Escape and the menu button already close the drawer.
        <div className="svc-scrim" data-sv-part="scrim" onClick={props.onCloseNav} />
      ) : null}
      <div className="svc-shell-nav">{props.sidebar}</div>
      <div className="svc-shell-body">
        <div className="svc-panel">
          {props.topBar}
          {props.main}
        </div>
      </div>
    </div>
  )
}

/**
 * The 48 px top bar of the content panel: the drawer button (narrow screens only), the search
 * trigger styled as a quiet field, then the actions on the right.
 *
 * @example
 * <TopBar menuButton={menu} search={searchButton} actions={<>{theme}{account}</>} />
 */
export function TopBar(props: TopBarProps): ReactElement {
  return (
    <header className="svc-topbar" data-sv-part="topbar">
      <div className="svc-topbar-menu">{props.menuButton}</div>
      <div className="svc-topbar-search">{props.search}</div>
      <div className="svc-topbar-actions">{props.actions}</div>
    </header>
  )
}

/**
 * Breadcrumbs above one row of back button, title, meta and actions. The title keeps a 16 rem
 * basis, so on phones the actions wrap to their own row instead of squeezing the title.
 *
 * @example
 * <PageHeader title="Invoices" titleId="h" breadcrumbs={crumbs} back={null} actions={newButton} meta="238" />
 */
export function PageHeader(props: PageHeaderProps): ReactElement {
  return (
    <div className="svc-page-header" data-sv-part="page-header">
      {props.breadcrumbs}
      <div className="svc-page-header-row">
        {props.back}
        <div className="svc-page-title">
          <h1 id={props.titleId}>{props.title}</h1>
          {props.meta ? <span className="svc-page-meta">{props.meta}</span> : null}
        </div>
        {props.actions ? <div className="svc-page-actions">{props.actions}</div> : null}
      </div>
    </div>
  )
}
