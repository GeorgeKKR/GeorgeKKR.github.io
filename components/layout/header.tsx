'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!isMenuOpen) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [isMenuOpen])

  const isActive = (href: string) => pathname.startsWith(href)

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        isScrolled || isMenuOpen ? 'bg-ink' : 'bg-gradient-to-b from-ink/70 to-transparent'
      )}
    >
      <div className="frame flex h-16 items-center justify-between sm:h-20">
        <Link
          href="/"
          className="font-display text-2xl font-extrabold uppercase tracking-wide sm:text-[1.75rem]"
        >
          George Kelly
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={cn(
                    'text-base transition-colors',
                    isActive(link.href)
                      ? 'text-screen underline decoration-1 underline-offset-8'
                      : 'text-mute hover:text-screen'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="-mr-2 p-2 text-base font-semibold md:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {isMenuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Main"
          className="frame fixed inset-x-0 bottom-0 top-16 bg-ink pt-8 md:hidden"
        >
          <ul className="space-y-2">
            {[{ label: 'Home', href: '/' }, ...navLinks].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="title-card block py-2 text-7xl"
                  aria-current={
                    (link.href === '/' ? pathname === '/' : isActive(link.href)) ? 'page' : undefined
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
