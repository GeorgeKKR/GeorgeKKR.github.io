'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Instagram, Linkedin, Youtube, ExternalLink } from 'lucide-react'
import { logoText, socialLinks } from '@/lib/content'
import { cn } from '@/lib/utils'
import { scrollFadeIn, staggerItem } from '@/lib/animations'

// ============================================================================
// TYPES
// ============================================================================

interface FooterLink {
  label: string
  href: string
  external?: boolean
}

const footerLinks: FooterLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

// ============================================================================
// COMPONENT
// ============================================================================

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={scrollFadeIn}
      className="relative bg-dark-950 pt-1"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        {/* Main Footer Content */}
        <div className="py-16 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Brand Section */}
            <motion.div
              variants={staggerItem}
              className="lg:col-span-5 space-y-8"
            >
              <Link href="/" className="inline-block group">
                <motion.h3
                  whileHover={{ scale: 1.05 }}
                  className="text-3xl sm:text-4xl font-display font-bold tracking-tighter"
                >
                  <span className="text-white transition-colors group-hover:text-white/90">
                    {logoText}
                  </span>
                </motion.h3>
              </Link>
              <p className="text-white/60 leading-relaxed max-w-md text-lg">
                Film Producer & Creative Director specializing in compelling
                visual storytelling. Bringing cinematic visions to life across
                feature films, documentaries, and commercials.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {socialLinks.instagram && (
                  <SocialLink
                    href={socialLinks.instagram}
                    icon={<Instagram className="w-5 h-5" />}
                    label="Instagram"
                  />
                )}
                {socialLinks.linkedin && (
                  <SocialLink
                    href={socialLinks.linkedin}
                    icon={<Linkedin className="w-5 h-5" />}
                    label="LinkedIn"
                  />
                )}
                {socialLinks.youtube && (
                  <SocialLink
                    href={socialLinks.youtube}
                    icon={<Youtube className="w-5 h-5" />}
                    label="YouTube"
                  />
                )}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              variants={staggerItem}
              className="lg:col-span-3 lg:col-start-7"
            >
              <h4 className="text-sm font-semibold text-white/40 uppercase tracking-[0.2em] mb-6">
                Quick Links
              </h4>
              <nav className="space-y-4">
                {footerLinks.map((link) => (
                  <FooterNavLink key={link.href} {...link} />
                ))}
              </nav>
            </motion.div>

            {/* Services */}
            <motion.div
              variants={staggerItem}
              className="lg:col-span-4"
            >
              <h4 className="text-sm font-semibold text-white/40 uppercase tracking-[0.2em] mb-6">
                Services
              </h4>
              <ul className="space-y-4 text-white/60">
                <li>Film Production</li>
                <li>Creative Direction</li>
                <li>Cinematography</li>
                <li>Video Editing</li>
                <li>Content Development</li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-white/5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-sm text-white/40">
              © {currentYear} {logoText}. All rights reserved.
            </p>
            <div className="flex items-center gap-8 text-sm text-white/40">
              <Link
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>


    </motion.footer>
  )
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

interface SocialLinkProps {
  href: string
  icon: React.ReactNode
  label: string
}

function SocialLink({ href, icon, label }: SocialLinkProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'flex items-center justify-center w-10 h-10 rounded-xl',
        'bg-white/5 border border-white/10 text-white/70',
        'hover:bg-white/10 hover:text-white hover:border-white/20',
        'transition-colors duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500'
      )}
      aria-label={label}
    >
      {icon}
    </motion.a>
  )
}

function FooterNavLink({ label, href, external = false }: FooterLink) {
  const isExternal = external || href.startsWith('http')

  const linkContent = (
    <span className="flex items-center gap-1 group-hover:gap-2 transition-all">
      {label}
      {isExternal && <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />}
    </span>
  )

  const linkClasses = cn(
    'group inline-flex items-center text-white/60 hover:text-white transition-colors',
    'focus-visible:outline-none focus-visible:text-white'
  )

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClasses}
      >
        {linkContent}
      </a>
    )
  }

  return (
    <Link href={href} className={linkClasses}>
      {linkContent}
    </Link>
  )
}
