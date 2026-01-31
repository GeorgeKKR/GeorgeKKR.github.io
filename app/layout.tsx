import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { Outfit, Playfair_Display } from 'next/font/google'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll-provider'
import { AmbientBackground } from '@/components/layout/ambient-background'
import { meta } from '@/lib/content'
import './globals.css'

// ============================================================================
// FONTS
// ============================================================================

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

// ============================================================================
// METADATA
// ============================================================================

export const metadata: Metadata = {
  title: {
    default: meta.title,
    template: `%s | ${meta.author}`,
  },
  description: meta.description,
  keywords: meta.keywords,
  authors: [{ name: meta.author }],
  creator: meta.author,
  publisher: meta.author,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: meta.siteUrl,
    title: meta.title,
    description: meta.description,
    siteName: meta.title,
    images: [
      {
        url: meta.image,
        width: 1200,
        height: 630,
        alt: meta.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.title,
    description: meta.description,
    images: [meta.image],
    creator: '@georgekelly',
  },
  // Icons are auto-detected from app directory:
  // - app/favicon.ico
  // - app/icon.png (32x32)
  // - app/apple-icon.png
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0b1628' },
    { media: '(prefers-color-scheme: dark)', color: '#0b1628' },
  ],
}

// ============================================================================
// ROOT LAYOUT
// ============================================================================

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`scroll-smooth ${outfit.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
      </head>
      <body className="antialiased font-sans bg-dark-950 text-white selection:bg-primary-500/30 selection:text-white">
        <AmbientBackground />
        <SmoothScrollProvider>
          {/* Skip to main content link for accessibility */}
          <a href="#main-content" className="skip-to-content" tabIndex={0}>
            Skip to main content
          </a>

          {/* Site Header */}
          <Header />

          {/* Main Content */}
          <main id="main-content" className="min-h-screen pt-16 sm:pt-20">
            {children}
          </main>

          {/* Site Footer */}
          <Footer />

          {/* Vercel Analytics */}
          <Analytics />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
