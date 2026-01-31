'use client'

import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AmbientBackgroundProps {
  className?: string
}

/**
 * Animated background that projects layered gradients, grids, and parallax glows.
 * Keeps interactions purely visual (no pointer events) and respects reduced-motion preferences.
 */
export function AmbientBackground({ className }: AmbientBackgroundProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const smoothX = useSpring(x, { stiffness: 80, damping: 20, mass: 0.8 })
  const smoothY = useSpring(y, { stiffness: 80, damping: 20, mass: 0.8 })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const handlePointerMove = (event: PointerEvent) => {
      const { innerWidth, innerHeight } = window
      const offsetX = (event.clientX / innerWidth - 0.5) * 40
      const offsetY = (event.clientY / innerHeight - 0.5) * 40
      x.set(offsetX)
      y.set(offsetY)
    }

    window.addEventListener('pointermove', handlePointerMove)
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
    }
  }, [x, y])

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-dark-500',
        className
      )}
    >
      {/* Subtle color wash */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(57,88,106,0.35),transparent_65%)]" />

      {/* Moving glows */}
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        className="absolute -top-24 left-1/2 h-[60vw] w-[60vw] -translate-x-1/2 rounded-full bg-primary-500/20 blur-[140px]"
      />
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        className="absolute bottom-[-15%] right-[-5%] h-[50vw] w-[50vw] rounded-full bg-accent-500/15 blur-[140px]"
      />
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        className="absolute left-[-5%] top-1/3 h-[30vw] w-[30vw] rounded-full bg-white/5 blur-[120px]"
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-40 [mask-image:radial-gradient(circle_at_center,_black,_transparent_70%)]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_0),linear-gradient(0deg,rgba(255,255,255,0.04)_1px,transparent_0)] bg-[size:70px_70px]" />
      </div>

      {/* Noise/particles */}
      <div className="absolute inset-0 opacity-30 mix-blend-screen [background-image:radial-gradient(rgba(255,255,255,0.07)_1px,transparent_0);background-size:120px_120px]" />
    </div>
  )
}
