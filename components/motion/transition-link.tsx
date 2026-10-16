'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import type { ComponentProps, MouseEvent } from 'react'

/** How long the outgoing page takes to dip out, matching `.is-leaving` in globals.css */
const EXIT_MS = 380

/**
 * A Link that lets the current page dip out before navigating.
 * Falls back to a normal navigation for modified clicks, the current
 * page, or when motion is off.
 */
export function TransitionLink({ href, onClick, ...props }: ComponentProps<typeof Link>) {
  const router = useRouter()
  const pathname = usePathname()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    const root = document.documentElement
    const url = typeof href === 'string' ? href : (href.pathname ?? '/')
    const isSamePage = url.replace(/\/$/, '') === pathname.replace(/\/$/, '')
    if (
      e.defaultPrevented ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      e.button !== 0 ||
      isSamePage ||
      !root.classList.contains('motion')
    ) {
      return
    }
    e.preventDefault()
    root.classList.add('is-leaving')
    window.setTimeout(() => router.push(url), EXIT_MS)
  }

  return <Link href={href} onClick={handleClick} {...props} />
}
