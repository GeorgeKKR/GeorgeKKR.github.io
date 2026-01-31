'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

// ============================================================================
// TYPES
// ============================================================================

export interface ScrollProgressProps {
  /**
   * Color of the progress bar
   */
  color?: 'primary' | 'accent' | 'white'
  /**
   * Height of the progress bar
   */
  height?: number
  /**
   * Position of the progress bar
   */
  position?: 'top' | 'bottom'
  /**
   * Show only when scrolled past threshold
   */
  showAfter?: number
  /**
   * Custom class name
   */
  className?: string
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ScrollProgress({
  color = 'primary',
  height = 3,
  position = 'top',
  showAfter = 0,
  className,
}: ScrollProgressProps) {
  const { scrollYProgress, scrollY } = useScroll()
  const [isVisible, setIsVisible] = useState(showAfter === 0)

  useEffect(() => {
    if (showAfter === 0) {
      return
    }

    const unsubscribe = scrollY.on('change', (latest) => {
      setIsVisible(latest >= showAfter)
    })

    return () => {
      unsubscribe?.()
    }
  }, [scrollY, showAfter])

  // Add spring physics for smooth animation
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Color variants
  const colorClasses = {
    primary: 'bg-gradient-to-r from-primary-500 to-primary-600',
    accent: 'bg-gradient-to-r from-accent-500 to-accent-600',
    white: 'bg-white',
  }

  // Position styles
  const positionStyles = {
    top: 'top-0',
    bottom: 'bottom-0',
  }

  return (
    <motion.div
      className={cn(
        'fixed left-0 right-0 z-50 origin-left',
        positionStyles[position],
        className
      )}
      style={{ height: `${height}px` }}
      initial={{ opacity: showAfter === 0 ? 1 : 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={cn('h-full shadow-lg', colorClasses[color])}
        style={{ scaleX, transformOrigin: '0%' }}
      />
    </motion.div>
  )
}

// ============================================================================
// CIRCULAR PROGRESS VARIANT
// ============================================================================

export interface CircularScrollProgressProps {
  /**
   * Size of the circular indicator
   */
  size?: number
  /**
   * Stroke width
   */
  strokeWidth?: number
  /**
   * Color of the progress circle
   */
  color?: 'primary' | 'accent' | 'white'
  /**
   * Position on screen
   */
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  /**
   * Show percentage text
   */
  showPercentage?: boolean
  /**
   * Custom class name
   */
  className?: string
}

export function CircularScrollProgress({
  size = 60,
  strokeWidth = 4,
  color = 'primary',
  position = 'bottom-right',
  showPercentage = false,
  className,
}: CircularScrollProgressProps) {
  const { scrollYProgress } = useScroll()
  const scaleProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const radius = (size - strokeWidth) / 2

  // Color variants
  const colorValues = {
    primary: '#f97316',
    accent: '#39586a',
    white: '#ffffff',
  }

  // Position styles
  const positionStyles = {
    'bottom-right': 'bottom-8 right-8',
    'bottom-left': 'bottom-8 left-8',
    'top-right': 'top-24 right-8',
    'top-left': 'top-24 left-8',
  }

  return (
    <motion.div
      className={cn(
        'fixed z-40',
        positionStyles[position],
        className
      )}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.5 }}
    >
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background circle */}
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth={strokeWidth}
            fill="none"
          />
        </svg>

        {/* Progress circle */}
        <svg
          width={size}
          height={size}
          className="absolute top-0 left-0 transform -rotate-90"
        >
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colorValues[color]}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            style={{
              pathLength: scaleProgress,
            }}
            initial={{ pathLength: 0 }}
          />
        </svg>

        {/* Percentage text */}
        {showPercentage && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white"
            style={{
              opacity: scrollYProgress,
            }}
          >
            <motion.span>
              {Math.round(scrollYProgress.get() * 100)}%
            </motion.span>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
