'use client'

import { ReactNode, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import type { LenisLike } from '@/lib/hooks/use-scroll-progress'

declare global {
  interface Window {
    __lenis?: LenisLike
    ScrollTrigger?: {
      update: () => void
    }
  }
}

interface SmoothScrollProviderProps {
  children: ReactNode
}

/**
 * Smooth scroll provider using Lenis
 * Optimized for high refresh rate displays (60Hz, 90Hz, 120Hz, 144Hz+)
 * Provides buttery smooth, frame-rate independent scrolling
 * Respects user's motion preferences
 *
 * To disable smooth scrolling entirely, set NEXT_PUBLIC_DISABLE_SMOOTH_SCROLL=true
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)
  const rafIdRef = useRef<number | null>(null)

  useEffect(() => {
    // Check if smooth scrolling is disabled via environment variable
    if (process.env.NEXT_PUBLIC_DISABLE_SMOOTH_SCROLL === 'true') {
      return
    }

    // Check if user prefers reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) {
      return
    }

    // Disable smooth scrolling on mobile for better performance
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    if (isMobile) {
      return
    }

    // Initialize Lenis with fast, responsive settings
    const lenis = new Lenis({
      // Very fast duration for instant response
      duration: 0.3,

      // Smooth easing curve
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),

      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,

      // High multipliers for maximum responsiveness
      wheelMultiplier: 1.5,
      touchMultiplier: 2,

      infinite: false,

      // Auto-raf disabled - we'll handle RAF manually for better control
      autoRaf: false,
    })

    lenisRef.current = lenis

    // Expose Lenis instance globally for hooks to access
    if (typeof window !== 'undefined') {
      window.__lenis = lenis
    }

    // Simple, efficient animation loop
    function raf(time: number) {
      lenis.raf(time)
      rafIdRef.current = requestAnimationFrame(raf)
    }

    // Start the animation loop
    rafIdRef.current = requestAnimationFrame(raf)

    // Integrate with GSAP ScrollTrigger if available
    if (typeof window !== 'undefined') {
      const scrollTrigger = window.ScrollTrigger
      if (scrollTrigger) {
        lenis.on('scroll', scrollTrigger.update)
      }
    }

    // Cleanup
    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
      }
      lenis.destroy()
      lenisRef.current = null

      // Remove global reference
      if (typeof window !== 'undefined') {
        window.__lenis = undefined
      }
    }
  }, [])

  return <div style={{ position: 'relative' }}>{children}</div>
}
