'use client'

import React, { forwardRef } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'
import { textRevealVariants } from '@/lib/animations'

// ============================================================================
// TYPES
// ============================================================================

export interface HeadingProps extends Omit<HTMLMotionProps<'h1'>, 'children'> {
  /**
   * Heading content
   */
  children: React.ReactNode
  /**
   * Semantic HTML heading level
   */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  /**
   * Visual size (independent of semantic level)
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl'
  /**
   * Font weight
   */
  weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'
  /**
   * Text alignment
   */
  align?: 'left' | 'center' | 'right'
  /**
   * Apply gradient effect
   */
  gradient?: boolean
  /**
   * Gradient color scheme
   */
  gradientFrom?: string
  gradientTo?: string
  /**
   * Enable reveal animation
   */
  animate?: boolean
  /**
   * Truncate text with ellipsis
   */
  truncate?: boolean
  /**
   * Max width constraint
   */
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'full' | 'none'
  /**
   * Custom class name
   */
  className?: string
}

// ============================================================================
// COMPONENT
// ============================================================================

export const Heading = forwardRef<HTMLElement, HeadingProps>(
  (
    {
      children,
      as: Component = 'h2',
      size,
      weight = 'bold',
      align = 'left',
      gradient = false,
      gradientFrom = 'from-white',
      gradientTo = 'to-accent-300',
      animate = false,
      truncate = false,
      maxWidth = 'none',
      className,
      ...props
    },
    ref
  ) => {
    // Default size based on semantic level if not specified
    const defaultSizes: Record<string, HeadingProps['size']> = {
      h1: '5xl',
      h2: '4xl',
      h3: '3xl',
      h4: '2xl',
      h5: 'xl',
      h6: 'lg',
      p: 'md',
      span: 'md',
    }

    const effectiveSize = size || defaultSizes[Component]

    // Size styles with responsive scaling
    const sizeStyles = {
      xs: 'text-xs sm:text-sm',
      sm: 'text-sm sm:text-base',
      md: 'text-base sm:text-lg',
      lg: 'text-lg sm:text-xl',
      xl: 'text-xl sm:text-2xl',
      '2xl': 'text-2xl sm:text-3xl md:text-4xl',
      '3xl': 'text-3xl sm:text-4xl md:text-5xl',
      '4xl': 'text-4xl sm:text-5xl md:text-6xl',
      '5xl': 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl',
      '6xl': 'text-6xl sm:text-7xl md:text-8xl lg:text-9xl',
    }

    // Weight styles
    const weightStyles = {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
    }

    // Alignment styles
    const alignStyles = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    }

    // Max width constraints
    const maxWidthStyles = {
      xs: 'max-w-xs',
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      '2xl': 'max-w-2xl',
      '3xl': 'max-w-3xl',
      '4xl': 'max-w-4xl',
      full: 'max-w-full',
      none: '',
    }

    // Base styles
    const baseStyles = 'font-display tracking-tight leading-tight'

    // Gradient styles
    const gradientStyles = gradient
      ? `bg-gradient-to-r ${gradientFrom} ${gradientTo} bg-clip-text text-transparent`
      : 'text-white'

    // Truncate styles
    const truncateStyles = truncate ? 'truncate' : ''

    const combinedClassName = cn(
      baseStyles,
      sizeStyles[effectiveSize],
      weightStyles[weight],
      alignStyles[align],
      maxWidthStyles[maxWidth],
      gradientStyles,
      truncateStyles,
      className
    )

    const HeadingComponent = Component as React.ElementType

    if (!animate) {
      return (
        <HeadingComponent ref={ref as React.Ref<HTMLElement>} className={combinedClassName} {...props}>
          {children}
        </HeadingComponent>
      )
    }

    return (
      <motion.div
        className="overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <HeadingComponent ref={ref as React.Ref<HTMLElement>} className={combinedClassName} {...props}>
          <motion.span variants={textRevealVariants} className="inline-block">
            {children}
          </motion.span>
        </HeadingComponent>
      </motion.div>
    )
  }
)

Heading.displayName = 'Heading'

// ============================================================================
// CONVENIENCE COMPONENTS
// ============================================================================

export const H1 = forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'as'>>(
  (props, ref) => <Heading ref={ref} as="h1" {...props} />
)
H1.displayName = 'H1'

export const H2 = forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'as'>>(
  (props, ref) => <Heading ref={ref} as="h2" {...props} />
)
H2.displayName = 'H2'

export const H3 = forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'as'>>(
  (props, ref) => <Heading ref={ref} as="h3" {...props} />
)
H3.displayName = 'H3'

export const H4 = forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'as'>>(
  (props, ref) => <Heading ref={ref} as="h4" {...props} />
)
H4.displayName = 'H4'

export const H5 = forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'as'>>(
  (props, ref) => <Heading ref={ref} as="h5" {...props} />
)
H5.displayName = 'H5'

export const H6 = forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'as'>>(
  (props, ref) => <Heading ref={ref} as="h6" {...props} />
)
H6.displayName = 'H6'
