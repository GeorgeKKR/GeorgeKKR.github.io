'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { fadeUpVariants } from '@/lib/animations'

interface PageTransitionProps {
  children: ReactNode
  className?: string
}

/**
 * Page transition wrapper component
 * Handles smooth page transitions using Framer Motion
 * Works with Next.js App Router
 */
export function PageTransition({ children, className }: PageTransitionProps) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={fadeUpVariants}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

/**
 * Page wrapper with consistent layout
 * Use this to wrap page content for transitions
 */
export function PageWrapper({ children, className }: PageTransitionProps) {
  return (
    <motion.main
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeUpVariants}
      className={className}
    >
      {children}
    </motion.main>
  )
}
