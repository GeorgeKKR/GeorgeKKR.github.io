import { useEffect, useRef, useState } from 'react'

interface UseInViewOptions extends IntersectionObserverInit {
  once?: boolean
  amount?: number | number[]
}

interface UseInViewReturn {
  ref: React.RefObject<HTMLElement>
  inView: boolean
}

/**
 * Hook to detect when an element is in the viewport
 * Useful for scroll-based animations
 *
 * @param options - Intersection Observer options
 * @returns Object with ref to attach to element and inView boolean
 *
 * @example
 * const { ref, inView } = useInView({ once: true, amount: 0.3 })
 *
 * <motion.div
 *   ref={ref}
 *   initial={{ opacity: 0, y: 50 }}
 *   animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
 * >
 *   Content
 * </motion.div>
 */
export function useInView(options: UseInViewOptions = {}): UseInViewReturn {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  const {
    once = true,
    amount = 0.3,
    threshold,
    root = null,
    rootMargin = '0px 0px -100px 0px',
  } = options

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // If already in view and once is true, don't observe again
    if (once && inView) return

    // Use amount as threshold if threshold is not provided
    const observerThreshold = threshold !== undefined ? threshold : amount

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isInView = entry.isIntersecting

        // Update state if entering view, or if not 'once' mode
        if (isInView) {
          setInView(true)
          // If 'once' mode, disconnect after first trigger
          if (once) {
            observer.disconnect()
          }
        } else if (!once) {
          // Only update when leaving view if not in 'once' mode
          setInView(false)
        }
      },
      {
        root,
        rootMargin,
        threshold: observerThreshold,
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [once, amount, threshold, root, rootMargin, inView])

  return { ref, inView }
}

/**
 * Hook variant that returns a callback ref instead
 * Useful when you need to use it with Framer Motion's ref
 */
export function useInViewCallback(
  options: UseInViewOptions = {}
): [(node: HTMLElement | null) => void, boolean] {
  const [element, setElement] = useState<HTMLElement | null>(null)
  const [inView, setInView] = useState(false)

  const {
    once = true,
    amount = 0.3,
    threshold,
    root = null,
    rootMargin = '0px 0px -100px 0px',
  } = options

  useEffect(() => {
    if (!element) return
    if (once && inView) return

    const observerThreshold = threshold !== undefined ? threshold : amount

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isInView = entry.isIntersecting

        if (isInView) {
          setInView(true)
          if (once) {
            observer.disconnect()
          }
        } else if (!once) {
          setInView(false)
        }
      },
      {
        root,
        rootMargin,
        threshold: observerThreshold,
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [element, once, amount, threshold, root, rootMargin, inView])

  return [setElement, inView]
}
