import type { Metadata, Viewport } from 'next'
import { Sofia_Sans, Sofia_Sans_Extra_Condensed } from 'next/font/google'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { meta } from '@/lib/content'
import './globals.css'

// ============================================================================
// FONTS
// ============================================================================

// One superfamily: regular width for reading, extra condensed for title cards
const sofiaSans = Sofia_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const sofiaCondensed = Sofia_Sans_Extra_Condensed({
  subsets: ['latin'],
  weight: ['500', '800', '900'],
  variable: '--font-display',
  display: 'swap',
})

// ============================================================================
// METADATA
// ============================================================================

export const metadata: Metadata = {
  metadataBase: new URL(meta.siteUrl),
  title: {
    default: meta.title,
    template: `%s | ${meta.author}`,
  },
  description: meta.description,
  keywords: meta.keywords,
  authors: [{ name: meta.author }],
  creator: meta.author,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: meta.siteUrl,
    title: meta.title,
    description: meta.description,
    siteName: meta.author,
    images: [{ url: meta.image, alt: meta.author }],
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.title,
    description: meta.description,
    images: [meta.image],
  },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
}

// ============================================================================
// ROOT LAYOUT
// ============================================================================

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${sofiaSans.variable} ${sofiaCondensed.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
