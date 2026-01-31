import { useEffect, useState, useRef } from 'react'

export type LenisLike = {
  on?: (event: 'scroll', handler: () => void) => void
  off?: (event: 'scroll', handler: () => void) => void
}

declare global {
  interface Window {
    __lenis?: LenisLike
  }
}

interface UseScrollProgressOptions {
  /**
   * Optional element to track scroll progress
   * If not provided, tracks window scroll
   */
  element?: HTMLElement | null
  /**
   * Smooth out scroll updates with interpolation
   */
  smooth?: boolean
  /**
   * Offset from top in pixels
   */
  offset?: number
  /**
   * Smoothing factor for interpolation (0-1)
   * Higher = smoother but more lag, lower = more responsive
   */
  smoothFactor?: number
}

interface ScrollProgressReturn {
  /**
   * Scroll progress from 0 to 1
   */
  progress: number
  /**
   * Current scroll position in pixels
   */
  scrollY: number
  /**
   * Total scrollable height
   */
  scrollHeight: number
}

/**
 * Hook to track scroll progress
 * Optimized for high refresh rate displays (60Hz, 90Hz, 120Hz, 144Hz+)
 * Returns a value from 0 to 1 representing scroll position
 *
 * @param options - Configuration options
 * @returns Object with progress (0-1), scrollY, and scrollHeight
 *
 * @example
 * const { progress, scrollY } = useScrollProgress({ smooth: true })
 *
 * <motion.div
 *   style={{
 *     scaleX: progress,
 *     transformOrigin: '0%',
 *   }}
 * />
 */
export function useScrollProgress(options: UseScrollProgressOptions = {}): ScrollProgressReturn {
  const { element, smooth = false, offset = 0, smoothFactor = 0.05 } = options

  const [progress, setProgress] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const [scrollHeight, setScrollHeight] = useState(0)

  const rafIdRef = useRef<number | null>(null)
  const currentProgressRef = useRef(0)
  const targetProgressRef = useRef(0)
  const lastUpdateTimeRef = useRef(0)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const calculateProgress = (): {
      progress: number
      scrollY: number
      scrollHeight: number
    } => {
      const scrollTop = element ? element.scrollTop : window.pageYOffset
      const height = element ? element.scrollHeight : document.documentElement.scrollHeight
      const clientHeight = element ? element.clientHeight : window.innerHeight

      const totalScroll = height - clientHeight - offset
      const calculatedProgress = totalScroll > 0 ? Math.min(scrollTop / totalScroll, 1) : 0

      return {
        progress: calculatedProgress,
        scrollY: scrollTop,
        scrollHeight: totalScroll,
      }
    }

    // High-precision smooth update loop for high refresh rate displays
    const smoothUpdate = (timestamp: number): void => {
      lastUpdateTimeRef.current = timestamp

      // Faster smoothing for more responsive feel
      const adaptiveFactor = Math.min(1, smoothFactor * 2)

      const diff = targetProgressRef.current - currentProgressRef.current

      // Threshold for stopping animation (sub-pixel precision)
      if (Math.abs(diff) > 0.0001) {
        currentProgressRef.current += diff * adaptiveFactor
        setProgress(currentProgressRef.current)

        // Continue animation loop
        rafIdRef.current = requestAnimationFrame(smoothUpdate)
      } else {
        // Snap to target and stop animation
        currentProgressRef.current = targetProgressRef.current
        setProgress(targetProgressRef.current)
        rafIdRef.current = null
      }
    }

    const handleScroll = (): void => {
      const {
        progress: newProgress,
        scrollY: newScrollY,
        scrollHeight: newHeight,
      } = calculateProgress()

      targetProgressRef.current = newProgress
      setScrollY(newScrollY)
      setScrollHeight(newHeight)

      if (smooth) {
        // Start smooth animation if not already running
        if (rafIdRef.current === null) {
          lastUpdateTimeRef.current = performance.now()
          rafIdRef.current = requestAnimationFrame(smoothUpdate)
        }
      } else {
        // Immediate update without smoothing
        currentProgressRef.current = newProgress
        setProgress(newProgress)
      }
    }

    const handleResize = (): void => {
      handleScroll()
    }

    // Initial calculation
    const initial = calculateProgress()
    currentProgressRef.current = initial.progress
    targetProgressRef.current = initial.progress
    setProgress(initial.progress)
    setScrollY(initial.scrollY)
    setScrollHeight(initial.scrollHeight)

    // Add event listeners
    const scrollTarget = element || window

    // Try to listen to Lenis scroll events if available (better for smooth scrolling)
    const lenisScroll = window.__lenis
    if (lenisScroll?.on) {
      lenisScroll.on('scroll', handleScroll)
    } else {
      scrollTarget.addEventListener('scroll', handleScroll, { passive: true })
    }

    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
      }

      const lenisInstance = window.__lenis
      if (lenisInstance?.off) {
        lenisInstance.off('scroll', handleScroll)
      } else {
        scrollTarget.removeEventListener('scroll', handleScroll)
      }

      window.removeEventListener('resize', handleResize)
    }
  }, [element, smooth, offset, smoothFactor])

  return { progress, scrollY, scrollHeight }
}

/**
 * Hook to track scroll direction
 * Optimized for high refresh rate displays
 */
export function useScrollDirection(threshold: number = 10): 'up' | 'down' | null {
  const [direction, setDirection] = useState<'up' | 'down' | null>(null)
  const lastScrollYRef = useRef(0)
  const rafIdRef = useRef<number | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScroll = (): void => {
      // Cancel any pending RAF
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
      }

      // Schedule update on next frame
      rafIdRef.current = requestAnimationFrame(() => {
        const currentScrollY = window.pageYOffset
        const diff = currentScrollY - lastScrollYRef.current

        // Only update if scrolled past threshold (reduces jitter)
        if (Math.abs(diff) > threshold) {
          if (diff > 0) {
            setDirection('down')
          } else if (diff < 0) {
            setDirection('up')
          }
          lastScrollYRef.current = currentScrollY
        }

        rafIdRef.current = null
      })
    }

    // Initial value
    lastScrollYRef.current = window.pageYOffset

    // Try to listen to Lenis scroll events if available
    const lenisScroll = window.__lenis
    if (lenisScroll?.on) {
      lenisScroll.on('scroll', handleScroll)
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true })
    }

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
      }

      const lenisScroll = window.__lenis
      if (lenisScroll?.off) {
        lenisScroll.off('scroll', handleScroll)
      } else {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [threshold])

  return direction
}

/**
 * Hook to track if scrolled past a certain threshold
 * Optimized for high refresh rate displays
 */
export function useScrollThreshold(threshold: number = 100): boolean {
  const [isPast, setIsPast] = useState(false)
  const rafIdRef = useRef<number | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScroll = (): void => {
      // Cancel any pending RAF
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
      }

      // Schedule update on next frame
      rafIdRef.current = requestAnimationFrame(() => {
        const scrollY = window.pageYOffset
        setIsPast(scrollY > threshold)
        rafIdRef.current = null
      })
    }

    // Initial check
    handleScroll()

    // Try to listen to Lenis scroll events if available
    const lenisScroll = window.__lenis
    if (lenisScroll?.on) {
      lenisScroll.on('scroll', handleScroll)
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true })
    }

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
      }

      const lenisScroll = window.__lenis
      if (lenisScroll?.off) {
        lenisScroll.off('scroll', handleScroll)
      } else {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [threshold])

  return isPast
}

/**
 * Hook for scroll-based velocity tracking
 * Useful for creating momentum-based animations
 */
export function useScrollVelocity(): number {
  const [velocity, setVelocity] = useState(0)
  const lastScrollYRef = useRef(0)
  const lastTimeRef = useRef(0)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScroll = (): void => {
      const currentTime = performance.now()
      const currentScrollY = window.pageYOffset

      const timeDelta = currentTime - lastTimeRef.current
      const scrollDelta = currentScrollY - lastScrollYRef.current

      // Calculate velocity in pixels per second
      const currentVelocity = timeDelta > 0 ? (scrollDelta / timeDelta) * 1000 : 0

      setVelocity(currentVelocity)

      lastScrollYRef.current = currentScrollY
      lastTimeRef.current = currentTime
    }

    // Initialize
    lastScrollYRef.current = window.pageYOffset
    lastTimeRef.current = performance.now()

    // Try to listen to Lenis scroll events if available
    const lenisScroll = window.__lenis
    if (lenisScroll?.on) {
      lenisScroll.on('scroll', handleScroll)
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true })
    }

    return () => {
      const lenisScroll = window.__lenis
      if (lenisScroll?.off) {
        lenisScroll.off('scroll', handleScroll)
      } else {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  return velocity
}
