'use client'

import React, { forwardRef } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

// ============================================================================
// TYPES
// ============================================================================

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  fullWidth?: boolean
  isLoading?: boolean
  iconBefore?: React.ReactNode
  iconAfter?: React.ReactNode
  disableAnimations?: boolean
}

// ============================================================================
// COMPONENT
// ============================================================================

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      isLoading = false,
      iconBefore,
      iconAfter,
      disableAnimations = false,
      disabled,
      className,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading

    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent-500 disabled:opacity-50 disabled:pointer-events-none'

    const variantStyles = {
      primary:
        'bg-white text-black hover:bg-gray-100 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] border border-transparent',
      secondary:
        'bg-white/10 text-white hover:bg-white/15 backdrop-blur-md border border-white/10 hover:border-white/20',
      outline:
        'border border-white/20 text-white hover:bg-white/5 hover:border-white/40 backdrop-blur-sm',
      ghost: 'text-white/80 hover:text-white hover:bg-white/5 backdrop-blur-sm',
      link: 'text-white/70 hover:text-white underline-offset-4 hover:underline p-0 h-auto',
    }

    const sizeStyles = {
      sm: 'text-xs px-4 py-2 rounded-full gap-1.5 tracking-wide uppercase',
      md: 'text-sm px-6 py-3 rounded-full gap-2 tracking-wide font-medium',
      lg: 'text-base px-8 py-4 rounded-full gap-2.5 tracking-wide font-medium',
      xl: 'text-lg px-10 py-5 rounded-full gap-3 tracking-wide font-semibold',
    }

    const iconSizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
      xl: 'w-7 h-7',
    }

    const combinedClassName = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      fullWidth && 'w-full',
      className
    )

    const content = (
      <>
        {isLoading && (
          <Loader2 className={cn('animate-spin', iconSizeClasses[size])} aria-hidden="true" />
        )}
        {!isLoading && iconBefore && (
          <span className={cn('inline-flex', iconSizeClasses[size])} aria-hidden="true">
            {iconBefore}
          </span>
        )}
        <span>{children}</span>
        {!isLoading && iconAfter && (
          <span className={cn('inline-flex', iconSizeClasses[size])} aria-hidden="true">
            {iconAfter}
          </span>
        )}
      </>
    )

    if (disableAnimations) {
      return (
        <button
          ref={ref}
          type={type}
          disabled={isDisabled}
          className={combinedClassName}
          {...props}
        >
          {content}
        </button>
      )
    }

    return (
      <motion.button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={combinedClassName}
        whileHover={!isDisabled ? { scale: 1.05 } : {}}
        whileTap={!isDisabled ? { scale: 0.95 } : {}}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        {...(props as unknown as HTMLMotionProps<'button'>)}
      >
        {content}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

// ============================================================================
// ICON BUTTON VARIANT
// ============================================================================

export interface IconButtonProps
  extends Omit<ButtonProps, 'iconBefore' | 'iconAfter' | 'children'> {
  icon: React.ReactNode
  'aria-label': string
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, variant = 'ghost', size = 'md', className, ...props }, ref) => {
    const sizeStyles = {
      sm: 'w-8 h-8 p-1.5',
      md: 'w-10 h-10 p-2',
      lg: 'w-12 h-12 p-2.5',
      xl: 'w-14 h-14 p-3',
    }

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn('!p-0', sizeStyles[size], className)}
        {...props}
      >
        {icon}
      </Button>
    )
  }
)

IconButton.displayName = 'IconButton'
