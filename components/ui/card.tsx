'use client'

import React, { forwardRef } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { cardVariants } from '@/lib/animations'

// ============================================================================
// TYPES
// ============================================================================

export interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  /**
   * Card content
   */
  children: React.ReactNode
  /**
   * Visual variant
   */
  variant?: 'default' | 'glass' | 'bordered' | 'elevated' | 'flat'
  /**
   * Padding size
   */
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  /**
   * Enable hover effect
   */
  hoverable?: boolean
  /**
   * Make card clickable/interactive
   */
  interactive?: boolean
  /**
   * Disable animations
   */
  disableAnimations?: boolean
  /**
   * Custom class name
   */
  className?: string
  /**
   * As different HTML element or component
   */
  as?: React.ElementType
}

// ============================================================================
// COMPONENT
// ============================================================================

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      variant = 'default',
      padding = 'lg',
      hoverable = false,
      interactive = false,
      disableAnimations = false,
      className,
      as: Component = 'div',
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles = 'rounded-2xl transition-all duration-300'

    // Variant styles
    const variantStyles = {
      default:
        'bg-dark-900/40 border border-white/5 backdrop-blur-md hover:border-white/10 hover:bg-dark-900/60 shadow-soft',
      glass:
        'bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:bg-white/[0.06] hover:border-white/20 shadow-glow transition-all duration-500',
      bordered:
        'bg-transparent border border-white/10 hover:border-white/30 hover:bg-white/[0.02]',
      elevated:
        'bg-dark-800 border border-white/5 shadow-medium hover:shadow-hard hover:border-white/10 hover:-translate-y-1',
      flat: 'bg-dark-800/50 border-0 hover:bg-dark-700/50',
    }

    // Padding styles
    const paddingStyles = {
      none: 'p-0',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-10',
    }

    // Interactive styles
    const interactiveStyles = interactive
      ? 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-400'
      : ''

    const combinedClassName = cn(
      baseStyles,
      variantStyles[variant],
      paddingStyles[padding],
      interactiveStyles,
      className
    )

    if (disableAnimations || !hoverable) {
      return (
        <Component ref={ref} className={combinedClassName} {...props}>
          {children}
        </Component>
      )
    }

    return (
      <motion.div
        ref={ref}
        className={combinedClassName}
        variants={cardVariants}
        initial="rest"
        whileHover="hover"
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

Card.displayName = 'Card'

// ============================================================================
// CARD HEADER
// ============================================================================

export interface CardHeaderProps {
  children: React.ReactNode
  className?: string
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className }, ref) => {
    return (
      <div ref={ref} className={cn('mb-4', className)}>
        {children}
      </div>
    )
  }
)

CardHeader.displayName = 'CardHeader'

// ============================================================================
// CARD TITLE
// ============================================================================

export interface CardTitleProps {
  children: React.ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ children, className, as: Component = 'h3' }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          'text-xl font-semibold text-white tracking-tight',
          className
        )}
      >
        {children}
      </Component>
    )
  }
)

CardTitle.displayName = 'CardTitle'

// ============================================================================
// CARD DESCRIPTION
// ============================================================================

export interface CardDescriptionProps {
  children: React.ReactNode
  className?: string
}

export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ children, className }, ref) => {
    return (
      <p
        ref={ref}
        className={cn('text-sm text-white/70 leading-relaxed', className)}
      >
        {children}
      </p>
    )
  }
)

CardDescription.displayName = 'CardDescription'

// ============================================================================
// CARD CONTENT
// ============================================================================

export interface CardContentProps {
  children: React.ReactNode
  className?: string
}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, className }, ref) => {
    return (
      <div ref={ref} className={cn('', className)}>
        {children}
      </div>
    )
  }
)

CardContent.displayName = 'CardContent'

// ============================================================================
// CARD FOOTER
// ============================================================================

export interface CardFooterProps {
  children: React.ReactNode
  className?: string
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className }, ref) => {
    return (
      <div ref={ref} className={cn('mt-6 pt-4 border-t border-white/10', className)}>
        {children}
      </div>
    )
  }
)

CardFooter.displayName = 'CardFooter'

// ============================================================================
// CARD IMAGE
// ============================================================================

export interface CardImageProps {
  src: string
  alt: string
  className?: string
  aspectRatio?: 'square' | 'video' | 'wide' | 'portrait'
  priority?: boolean
  sizes?: string
}

export const CardImage = forwardRef<HTMLDivElement, CardImageProps>(
  ({ src, alt, className, aspectRatio = 'video', priority = false, sizes }, ref) => {
    const aspectRatioStyles = {
      square: 'aspect-square',
      video: 'aspect-video',
      wide: 'aspect-[21/9]',
      portrait: 'aspect-[3/4]',
    }

    return (
      <div
        ref={ref}
        className={cn(
          'relative overflow-hidden rounded-lg mb-4',
          aspectRatioStyles[aspectRatio],
          className
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={
            sizes ||
            '(min-width: 1280px) 400px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw'
          }
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    )
  }
)

CardImage.displayName = 'CardImage'
