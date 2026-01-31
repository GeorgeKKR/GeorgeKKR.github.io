'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { logoText } from '@/lib/content'
import {
  mobileMenuVariants,
  mobileMenuItemVariants,
  navIndicatorVariants,
} from '@/lib/animations'
import { useScrollThreshold } from '@/lib/hooks/use-scroll-progress'
import { IconButton } from '@/components/ui/button'

// ============================================================================
// TYPES
// ============================================================================

interface NavLink {
  label: string
  href: string
}

const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

// ============================================================================
// COMPONENT
// ============================================================================

export function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isScrolled = useScrollThreshold(50)

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Desktop & Mobile Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-[#09090b]/90 backdrop-blur-md border-b border-white/[0.02] shadow-sm'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="relative z-50 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-2xl sm:text-3xl font-display font-bold tracking-tighter"
              >
                <span className="text-white transition-colors group-hover:text-white/90">
                  {logoText}
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <motion.div
                    className="relative py-1 group"
                    whileHover={{ y: -1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <span
                      className={cn(
                        'text-sm font-medium tracking-wide transition-colors relative z-10',
                        isActive(link.href)
                          ? 'text-white'
                          : 'text-white/60 group-hover:text-white'
                      )}
                    >
                      {link.label}
                    </span>

                    {/* Active indicator - Small Dot */}
                    {isActive(link.href) && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                        variants={navIndicatorVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}

                    {/* Hover indicator - Subtle Glow */}
                    {!isActive(link.href) && (
                      <div className="absolute inset-0 bg-white/0 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300" />
                    )}
                  </motion.div>
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden relative z-50">
              <IconButton
                icon={isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                variant="ghost"
                size="lg"
                className="hover:bg-white/10"
              />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-dark-500/95 backdrop-blur-xl z-40"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.nav
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="exit"
              className="fixed inset-x-0 top-0 pt-24 pb-12 px-6 z-40 md:hidden"
            >
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <motion.div key={link.href} variants={mobileMenuItemVariants}>
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={cn(
                        'block text-3xl font-bold py-4 px-6 rounded-2xl transition-all',
                        isActive(link.href)
                          ? 'bg-white/10 text-white'
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                      )}
                    >
                      <motion.span
                        className="inline-block"
                        whileHover={{ x: 10 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      >
                        {link.label}
                      </motion.span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Menu Footer */}
              <motion.div
                variants={mobileMenuItemVariants}
                className="mt-12 pt-8 border-t border-white/10"
              >
                <p className="text-sm text-white/50 px-6">
                  © {new Date().getFullYear()} {logoText}
                </p>
              </motion.div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
