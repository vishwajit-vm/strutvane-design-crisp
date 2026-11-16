/**
 * Crisp's sidebar: the brand tile, then one quiet list per group.
 *
 * It sits on the canvas colour while content lives in the inset panel. The current page is a
 * small raised chip (surface, hairline, 1 px shadow): the only "lifted" thing in the navigation,
 * so where you are is obvious without a loud fill (DESIGN.md §1). Counts are mono and muted.
 *
 * @module
 */
import type { SidebarProps } from '@strutvane/ui/design'
import type { ReactElement } from 'react'
import { BrandMark } from '../illustrations.tsx'

/**
 * The navigation column. Every link is rendered with the behaviour's `Link` (client-side
 * navigation and `aria-current`), and its icon with the behaviour's `Icon` (the design's own).
 *
 * @example
 * <Sidebar label="Main" brand={<a href="/">Acme</a>} groups={groups} Link={NavLink} Icon={Icon} />
 */
export function Sidebar({ label, brand, groups, Link, Icon }: SidebarProps): ReactElement {
  return (
    <nav aria-label={label} className="svc-sidebar" data-sv-part="sidebar">
      <div className="svc-brand">
        <BrandMark />
        <span className="svc-brand-name">{brand}</span>
      </div>
      {groups.map((group) => (
        <div key={group.label ?? '_top'} className="svc-nav-group">
          {group.label ? <p className="svc-nav-heading">{group.label}</p> : null}
          <ul>
            {group.links.map((link) => (
              <li key={link.entry.path}>
                <Link
                  to={link.entry.path}
                  current={link.current}
                  aria-label={link.accessibleName}
                  className="svc-nav-link"
                >
                  <Icon name={link.entry.icon} />
                  <span className="svc-nav-label">{link.entry.label}</span>
                  {link.entry.badge !== undefined ? (
                    <span className="svc-nav-badge" aria-hidden="true">
                      {link.entry.badge}
                    </span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}
