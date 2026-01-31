import { Variants, Transition } from 'framer-motion'

/**
 * Default transition with smooth easing
 */
export const smoothTransition: Transition = {
  type: 'spring',
  stiffness: 100,
  damping: 20,
  mass: 1,
}

/**
 * Fast transition for micro-interactions
 */
export const fastTransition: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  mass: 0.8,
}

/**
 * Slow transition for page changes
 */
export const slowTransition: Transition = {
  duration: 0.8,
  ease: [0.23, 1, 0.32, 1],
}

/**
 * Bounce transition
 */
export const bounceTransition: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 15,
}

// ============================================================================
// PAGE TRANSITIONS
// ============================================================================

/**
 * Fade in/out page transition
 */
export const fadeVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.23, 1, 0.32, 1],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1],
    },
  },
}

/**
 * Fade and slide up page transition
 */
export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.23, 1, 0.32, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -30,
    transition: {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1],
    },
  },
}

/**
 * Fade and slide down page transition
 */
export const fadeDownVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.23, 1, 0.32, 1],
    },
  },
  exit: {
    opacity: 0,
    y: 30,
    transition: {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1],
    },
  },
}

/**
 * Scale and fade page transition
 */
export const scaleVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: [0.23, 1, 0.32, 1],
    },
  },
}

// ============================================================================
// SCROLL REVEAL ANIMATIONS
// ============================================================================

/**
 * Fade in from bottom on scroll
 */
export const scrollFadeIn: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.23, 1, 0.32, 1],
    },
  },
}

/**
 * Fade in from left on scroll
 */
export const scrollFadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.23, 1, 0.32, 1],
    },
  },
}

/**
 * Fade in from right on scroll
 */
export const scrollFadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.23, 1, 0.32, 1],
    },
  },
}

/**
 * Scale in on scroll
 */
export const scrollScaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1],
    },
  },
}

// ============================================================================
// STAGGER ANIMATIONS
// ============================================================================

/**
 * Container for staggered children
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

/**
 * Container with faster stagger
 */
export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0,
    },
  },
}

/**
 * Container with slower stagger
 */
export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
}

/**
 * Stagger item - fade and slide up
 */
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1],
    },
  },
}

/**
 * Stagger item - scale in
 */
export const staggerItemScale: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1],
    },
  },
}

// ============================================================================
// MICRO-INTERACTIONS
// ============================================================================

/**
 * Button hover and tap animations
 */
export const buttonVariants: Variants = {
  rest: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: fastTransition,
  },
  tap: {
    scale: 0.95,
    transition: fastTransition,
  },
}

/**
 * Card hover animation
 */
export const cardVariants: Variants = {
  rest: {
    y: 0,
    scale: 1,
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: smoothTransition,
  },
}

/**
 * Link underline animation
 */
export const linkUnderlineVariants: Variants = {
  rest: {
    scaleX: 0,
    originX: 0,
  },
  hover: {
    scaleX: 1,
    transition: {
      duration: 0.3,
      ease: [0.23, 1, 0.32, 1],
    },
  },
}

/**
 * Icon rotation on hover
 */
export const iconRotateVariants: Variants = {
  rest: {
    rotate: 0,
  },
  hover: {
    rotate: 180,
    transition: {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1],
    },
  },
}

/**
 * Icon bounce on hover
 */
export const iconBounceVariants: Variants = {
  rest: {
    y: 0,
  },
  hover: {
    y: -4,
    transition: bounceTransition,
  },
}

// ============================================================================
// MODAL/OVERLAY ANIMATIONS
// ============================================================================

/**
 * Modal backdrop fade in/out
 */
export const backdropVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
}

/**
 * Modal content scale and fade in/out
 */
export const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.3,
      ease: [0.23, 1, 0.32, 1],
    },
  },
}

/**
 * Slide in from right (drawer)
 */
export const drawerVariants: Variants = {
  hidden: {
    x: '100%',
  },
  visible: {
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1],
    },
  },
  exit: {
    x: '100%',
    transition: {
      duration: 0.3,
      ease: [0.23, 1, 0.32, 1],
    },
  },
}

// ============================================================================
// NAVIGATION ANIMATIONS
// ============================================================================

/**
 * Mobile menu slide in from top
 */
export const mobileMenuVariants: Variants = {
  closed: {
    y: '-100%',
    opacity: 0,
  },
  open: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1],
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
  exit: {
    y: '-100%',
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.23, 1, 0.32, 1],
    },
  },
}

/**
 * Mobile menu items
 */
export const mobileMenuItemVariants: Variants = {
  closed: {
    opacity: 0,
    x: -20,
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1],
    },
  },
}

/**
 * Nav link active indicator
 */
export const navIndicatorVariants: Variants = {
  hidden: {
    scaleX: 0,
    opacity: 0,
  },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.23, 1, 0.32, 1],
    },
  },
}

// ============================================================================
// TEXT ANIMATIONS
// ============================================================================

/**
 * Text reveal from bottom
 */
export const textRevealVariants: Variants = {
  hidden: {
    y: '100%',
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.23, 1, 0.32, 1],
    },
  },
}

/**
 * Text container for word-by-word reveal
 */
export const textContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.1,
    },
  },
}

/**
 * Individual word reveal
 */
export const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.23, 1, 0.32, 1],
    },
  },
}

// ============================================================================
// LOADING ANIMATIONS
// ============================================================================

/**
 * Pulse animation for loading states
 */
export const pulseVariants: Variants = {
  pulse: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

/**
 * Skeleton loading shimmer
 */
export const shimmerVariants: Variants = {
  loading: {
    x: ['-100%', '100%'],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'linear',
    },
  },
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get variants with reduced motion support
 * Returns static variants if user prefers reduced motion
 */
export function getAccessibleVariants(variants: Variants): Variants {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Return simplified variants without animation
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.01 } },
    }
  }
  return variants
}

/**
 * Create custom stagger container with configurable delay
 */
export function createStaggerContainer(
  staggerDelay: number = 0.1,
  delayChildren: number = 0.1
): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren,
      },
    },
  }
}

/**
 * Create custom viewport animation trigger options
 */
export const viewportOptions = {
  once: true,
  amount: 0.3,
  margin: '0px 0px -100px 0px',
}

/**
 * Viewport options for elements that should animate multiple times
 */
export const viewportOptionsRepeat = {
  once: false,
  amount: 0.3,
  margin: '0px 0px -100px 0px',
}
