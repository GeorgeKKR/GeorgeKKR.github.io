'use client'

import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

// ============================================================================
// TYPES
// ============================================================================

export interface LoadingProps {
  /**
   * Variant of the loading animation
   */
  variant?: 'spinner' | 'dots' | 'pulse' | 'bars' | 'ring'
  /**
   * Size of the loading indicator
   */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /**
   * Color theme
   */
  color?: 'primary' | 'accent' | 'white'
  /**
   * Show loading text
   */
  text?: string
  /**
   * Full screen overlay
   */
  fullScreen?: boolean
  /**
   * Custom class name
   */
  className?: string
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function Loading({
  variant = 'spinner',
  size = 'md',
  color = 'primary',
  text,
  fullScreen = false,
  className,
}: LoadingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  }

  const colorClasses = {
    primary: 'text-primary-500',
    accent: 'text-accent-500',
    white: 'text-white',
  }

  const content = (
    <div className={cn('flex flex-col items-center gap-3', className)}>
      <div className={cn(sizeClasses[size], colorClasses[color])}>
        {variant === 'spinner' && <SpinnerLoader />}
        {variant === 'dots' && <DotsLoader color={color} />}
        {variant === 'pulse' && <PulseLoader color={color} />}
        {variant === 'bars' && <BarsLoader color={color} />}
        {variant === 'ring' && <RingLoader color={color} />}
      </div>
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={cn('text-sm font-medium', colorClasses[color])}
        >
          {text}
        </motion.p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-dark-500/95 backdrop-blur-lg"
      >
        {content}
      </motion.div>
    )
  }

  return content
}

// ============================================================================
// SPINNER VARIANT
// ============================================================================

function SpinnerLoader() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className="h-full w-full"
    >
      <Loader2 className="h-full w-full" />
    </motion.div>
  )
}

// ============================================================================
// DOTS VARIANT
// ============================================================================

function DotsLoader({ color }: { color: LoadingProps['color'] }) {
  const colorClasses = {
    primary: 'bg-primary-500',
    accent: 'bg-accent-500',
    white: 'bg-white',
  }
  const resolvedColor = color ?? 'primary'

  const dotVariants = {
    initial: { y: 0 },
    animate: { y: -10 },
  }

  return (
    <div className="flex h-full items-center justify-center gap-2">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: index * 0.15,
          }}
          className={cn('h-2 w-2 rounded-full', colorClasses[resolvedColor])}
        />
      ))}
    </div>
  )
}

// ============================================================================
// PULSE VARIANT
// ============================================================================

function PulseLoader({ color }: { color: LoadingProps['color'] }) {
  const colorClasses = {
    primary: 'bg-primary-500',
    accent: 'bg-accent-500',
    white: 'bg-white',
  }
  const resolvedColor = color ?? 'primary'

  return (
    <div className="relative h-full w-full">
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [1, 0.5, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={cn('absolute inset-0 rounded-full', colorClasses[resolvedColor])}
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [1, 0.5, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
        className={cn('absolute inset-0 rounded-full', colorClasses[resolvedColor])}
      />
    </div>
  )
}

// ============================================================================
// BARS VARIANT
// ============================================================================

function BarsLoader({ color }: { color: LoadingProps['color'] }) {
  const colorClasses = {
    primary: 'bg-primary-500',
    accent: 'bg-accent-500',
    white: 'bg-white',
  }
  const resolvedColor = color ?? 'primary'

  return (
    <div className="flex h-full items-end justify-center gap-1">
      {[0, 1, 2, 3, 4].map((index) => (
        <motion.div
          key={index}
          animate={{
            scaleY: [1, 1.5, 1],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: index * 0.1,
          }}
          className={cn('h-full w-1 origin-bottom', colorClasses[resolvedColor])}
        />
      ))}
    </div>
  )
}

// ============================================================================
// RING VARIANT
// ============================================================================

function RingLoader({ color }: { color: LoadingProps['color'] }) {
  const colorValues = {
    primary: '#f97316',
    accent: '#39586a',
    white: '#ffffff',
  }
  const resolvedColor = color ?? 'primary'

  return (
    <svg className="h-full w-full" viewBox="0 0 50 50">
      <motion.circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke={colorValues[resolvedColor]}
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0, rotate: 0 }}
        animate={{
          pathLength: [0, 0.8, 0],
          rotate: 360,
        }}
        transition={{
          pathLength: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
        }}
        style={{
          strokeDasharray: '1, 150',
          strokeDashoffset: '0',
        }}
      />
    </svg>
  )
}

// ============================================================================
// PAGE LOADER (Full screen with logo)
// ============================================================================

export function PageLoader({ text = 'Loading...' }: { text?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-dark-500"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <motion.h1
          className="bg-gradient-to-r from-white to-accent-300 bg-clip-text text-6xl font-bold tracking-tighter text-transparent"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          GEORGE
        </motion.h1>
      </motion.div>

      <Loading variant="dots" size="lg" color="primary" />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-sm text-white/60"
      >
        {text}
      </motion.p>
    </motion.div>
  )
}

// ============================================================================
// SKELETON LOADER
// ============================================================================

export interface SkeletonProps {
  /**
   * Width of skeleton
   */
  width?: string | number
  /**
   * Height of skeleton
   */
  height?: string | number
  /**
   * Shape of skeleton
   */
  variant?: 'text' | 'circular' | 'rectangular'
  /**
   * Custom class name
   */
  className?: string
}

export function Skeleton({
  width = '100%',
  height = '1rem',
  variant = 'text',
  className,
}: SkeletonProps) {
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  }

  return (
    <motion.div
      animate={{
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={cn('bg-white/10', variantClasses[variant], className)}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
    />
  )
}
