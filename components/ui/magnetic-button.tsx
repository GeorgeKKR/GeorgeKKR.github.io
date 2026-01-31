'use client'

import { useRef, type PointerEvent as ReactPointerEvent } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface MagneticButtonProps extends ButtonProps {
  strength?: number
  wrapperClassName?: string
}

/**
 * Wraps the primary button with a magnetic hover effect for delight-driven CTAs.
 */
export function MagneticButton({
  strength = 0.25,
  wrapperClassName,
  className,
  ...props
}: MagneticButtonProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 300, damping: 30, mass: 0.6 })
  const springY = useSpring(y, { stiffness: 300, damping: 30, mass: 0.6 })

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const rect = wrapper.getBoundingClientRect()
    const offsetX = event.clientX - (rect.left + rect.width / 2)
    const offsetY = event.clientY - (rect.top + rect.height / 2)

    x.set(offsetX * strength)
    y.set(offsetY * strength)
  }

  const resetPosition = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={wrapperRef}
      className={cn('inline-flex', wrapperClassName)}
      style={{ x: springX, y: springY }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPosition}
    >
      <Button className={cn('shadow-glow transition-shadow hover:shadow-glow-lg', className)} {...props} />
    </motion.div>
  )
}
