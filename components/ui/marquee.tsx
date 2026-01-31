'use client'

import { useMemo, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface MarqueeProps {
  items: ReactNode[]
  speed?: number
  direction?: 'left' | 'right'
  pauseOnHover?: boolean
  className?: string
  itemClassName?: string
}

/**
 * Simple marquee utility that duplicates the provided items and animates them horizontally.
 * Uses CSS-driven animation for performance and exposes direction/speed via data attributes.
 */
export function Marquee({
  items,
  speed = 28,
  direction = 'left',
  pauseOnHover = true,
  className,
  itemClassName,
}: MarqueeProps) {
  const [isPaused, setIsPaused] = useState(false)

  const duplicatedItems = useMemo(() => [...items, ...items], [items])

  return (
    <div
      className={cn('group relative overflow-hidden', className)}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div
        className="marquee-track flex w-max gap-6"
        data-direction={direction}
        data-paused={isPaused}
        style={
          {
            '--marquee-duration': `${speed}s`,
          } as React.CSSProperties
        }
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={index}
            className={cn(
              'flex items-center gap-3 rounded-2xl border border-white/5 bg-white/5 px-5 py-3 text-sm text-white/80 backdrop-blur-xl',
              itemClassName
            )}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
