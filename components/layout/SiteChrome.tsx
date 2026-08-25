'use client'

import { usePathname } from 'next/navigation'
import { MobileBookingBar } from '@/components/layout/MobileBookingBar'

/**
 * Wraps the page in the public site's furniture — nav, footer, centre seam and
 * smooth scrolling. The admin panel at /admin is a working tool, not part of
 * the storefront, so it renders bare.
 */
export function SiteChrome({
  chrome,
  navbar,
  footer,
  children,
}: {
  chrome: React.ReactNode
  navbar: React.ReactNode
  footer: React.ReactNode
  children: React.ReactNode
}) {
  const pathname = usePathname()

  if (pathname?.startsWith('/admin')) {
    return <main className="relative">{children}</main>
  }

  return (
    <>
      {chrome}
      {navbar}
      <main className="relative">{children}</main>
      {footer}
      <MobileBookingBar />
    </>
  )
}
