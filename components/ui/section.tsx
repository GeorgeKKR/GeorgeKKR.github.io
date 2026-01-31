'use client'

import React, { forwardRef } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'
import { scrollFadeIn } from '@/lib/animations'

// ============================================================================
// TYPES
// ============================================================================

export interface SectionProps extends Omit<HTMLMotionProps<'section'>, 'children'> {
  /**
   * Section content
   */
  children: React.ReactNode
  /**
   * Container width constraint
   */
  width?: 'full' | 'xl' | '2xl' | '4xl' | '6xl' | '7xl'
  /**
   * Vertical padding size
   */
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  /**
   * Background variant
   */
  background?: 'none' | 'default' | 'accent' | 'gradient' | 'dots'
  /**
   * Enable scroll-based fade-in animation
   */
  animate?: boolean
  /**
   * Center content horizontally
   */
  centered?: boolean
  /**
   * Custom class name
   */
  className?: string
  /**
   * ID for anchor linking
   */
  id?: string
}

// ============================================================================
// COMPONENT
// ============================================================================

export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      children,
      width = '7xl',
      spacing = 'xl',
      background = 'none',
      animate = true,
      centered = false,
      className,
      id,
      ...props
    },
    ref
  ) => {
    // Width constraints
    const widthStyles = {
      full: 'max-w-full px-4 sm:px-6 lg:px-8',
      xl: 'max-w-screen-xl px-4 sm:px-6 lg:px-8 mx-auto',
      '2xl': 'max-w-screen-2xl px-4 sm:px-6 lg:px-8 mx-auto',
      '4xl': 'max-w-[1440px] px-4 sm:px-6 lg:px-8 mx-auto',
      '6xl': 'max-w-[1600px] px-4 sm:px-6 lg:px-8 mx-auto',
      '7xl': 'max-w-[1800px] px-4 sm:px-6 lg:px-12 xl:px-16 mx-auto',
    }

    // Vertical spacing
    const spacingStyles = {
      none: 'py-0',
      sm: 'py-8 sm:py-12',
      md: 'py-12 sm:py-16',
      lg: 'py-16 sm:py-20 md:py-24',
      xl: 'py-20 sm:py-24 md:py-32',
      '2xl': 'py-24 sm:py-32 md:py-40 lg:py-48',
    }

    // Background styles
    const backgroundStyles = {
      none: '',
      default: 'bg-dark-950',
      accent: 'bg-dark-900',
      gradient:
        'bg-dark-950 relative overflow-hidden',
      dots: 'relative',
    }

    // Center content
    const centeredStyles = centered ? 'flex flex-col items-center text-center' : ''

    const combinedClassName = cn(
      'relative',
      backgroundStyles[background],
      className
    )

    const containerClassName = cn(
      widthStyles[width],
      spacingStyles[spacing],
      centeredStyles
    )

    const content = <div className={containerClassName}>{children}</div>

    // Background decorations
    const backgroundDecorations = (
      <>
        {background === 'dots' && (
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }}
          />
        )}
      </>
    )

    return (
      <motion.section
        ref={ref}
        id={id}
        className={combinedClassName}
        initial={animate ? 'hidden' : undefined}
        whileInView={animate ? 'visible' : undefined}
        viewport={animate ? { once: true, amount: 0.1 } : undefined}
        variants={animate ? scrollFadeIn : undefined}
        {...props}
      >
        {backgroundDecorations}
        {content}
      </motion.section>
    )
  }
)

Section.displayName = 'Section'

// ============================================================================
// SECTION HEADER
// ============================================================================

export interface SectionHeaderProps {
  children: React.ReactNode
  className?: string
  centered?: boolean
}

export const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ children, className, centered = false }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'mb-12 md:mb-16',
          centered && 'text-center mx-auto max-w-3xl',
          className
        )}
      >
        {children}
      </div>
    )
  }
)

SectionHeader.displayName = 'SectionHeader'

// ============================================================================
// SECTION TITLE
// ============================================================================

export interface SectionTitleProps {
  children: React.ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4'
  gradient?: boolean
}

export const SectionTitle = forwardRef<HTMLHeadingElement, SectionTitleProps>(
  ({ children, className, as: Component = 'h2', gradient = false }, ref) => {
    const gradientStyles = gradient
      ? 'bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent'
      : 'text-white'

    return (
      <Component
        ref={ref}
        className={cn(
          'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 pb-2',
          gradientStyles,
          className
        )}
      >
        {children}
      </Component>
    )
  }
)

SectionTitle.displayName = 'SectionTitle'

// ============================================================================
// SECTION SUBTITLE
// ============================================================================

export interface SectionSubtitleProps {
  children: React.ReactNode
  className?: string
}

export const SectionSubtitle = forwardRef<HTMLParagraphElement, SectionSubtitleProps>(
  ({ children, className }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(
          'text-lg sm:text-xl text-white/70 leading-relaxed max-w-2xl',
          className
        )}
      >
        {children}
      </p>
    )
  }
)

SectionSubtitle.displayName = 'SectionSubtitle'

// ============================================================================
// SECTION DIVIDER
// ============================================================================

export interface SectionDividerProps {
  className?: string
  gradient?: boolean
}

export const SectionDivider = forwardRef<HTMLDivElement, SectionDividerProps>(
  ({ className, gradient = false }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'h-px my-12 sm:my-16',
          gradient
            ? 'bg-gradient-to-r from-transparent via-accent-500/50 to-transparent'
            : 'bg-white/10',
          className
        )}
      />
    )
  }
)

SectionDivider.displayName = 'SectionDivider'
