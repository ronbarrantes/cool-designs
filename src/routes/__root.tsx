import type { ReactNode } from 'react'
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'

import appCss from '../styles/app.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'description',
        content: 'A compact research browser for captured product flows.',
      },
      { title: 'Cool Designs' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  component: RootDocument,
})

function RootDocument() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <AppShell>
          <Outlet />
        </AppShell>
        <Scripts />
      </body>
    </html>
  )
}

function AppShell({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="site-header">
        <Link className="brand" to="/">
          Cool Designs
        </Link>
        <nav className="site-nav" aria-label="Main navigation">
          <Link to="/">Library</Link>
          <Link to="/captures">Captures</Link>
          <Link to="/recreations">Recreations</Link>
        </nav>
      </header>
      <main>{children}</main>
    </>
  )
}
