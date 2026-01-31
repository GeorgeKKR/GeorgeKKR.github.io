'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Section, SectionHeader, SectionTitle, SectionSubtitle } from '@/components/ui/section'
import { IconButton } from '@/components/ui/button'
import { staggerContainer, staggerItem, scrollFadeIn } from '@/lib/animations'
import { cn } from '@/lib/utils'

// ============================================================================
// TYPES
// ============================================================================

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  rating?: number
  image?: string
  projectType?: string
}

export interface TestimonialsProps {
  testimonials: Testimonial[]
  variant?: 'carousel' | 'grid'
  showRatings?: boolean
  className?: string
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function Testimonials({
  testimonials,
  variant = 'carousel',
  showRatings = true,
  className,
}: TestimonialsProps) {
  return (
    <Section spacing="xl" background="accent" className={className} id="testimonials">
      <SectionHeader centered>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={scrollFadeIn}
        >
          <SectionTitle>What Clients Say</SectionTitle>
          <SectionSubtitle className="mx-auto mt-4">
            Trusted by clients and collaborators around the world
          </SectionSubtitle>
        </motion.div>
      </SectionHeader>

      {variant === 'carousel' ? (
        <TestimonialCarousel testimonials={testimonials} showRatings={showRatings} />
      ) : (
        <TestimonialGrid testimonials={testimonials} showRatings={showRatings} />
      )}
    </Section>
  )
}

// ============================================================================
// CAROUSEL VARIANT
// ============================================================================

function TestimonialCarousel({
  testimonials,
  showRatings,
}: {
  testimonials: Testimonial[]
  showRatings: boolean
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const paginate = (newDirection: number) => {
    const newIndex = currentIndex + newDirection
    if (newIndex >= 0 && newIndex < testimonials.length) {
      setDirection(newDirection)
      setCurrentIndex(newIndex)
    }
  }

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  return (
    <div className="relative">
      {/* Main carousel */}
      <div className="relative min-h-[400px] flex items-center justify-center overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x)

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1)
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1)
              }
            }}
            className="absolute w-full max-w-4xl px-4"
          >
            <TestimonialCard
              testimonial={testimonials[currentIndex]}
              showRating={showRatings}
              variant="large"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <IconButton
          icon={<ChevronLeft className="w-5 h-5" />}
          onClick={() => paginate(-1)}
          disabled={currentIndex === 0}
          variant="outline"
          aria-label="Previous testimonial"
        />

        {/* Dots indicator */}
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-300',
                index === currentIndex
                  ? 'w-8 bg-primary-500'
                  : 'bg-white/30 hover:bg-white/50'
              )}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <IconButton
          icon={<ChevronRight className="w-5 h-5" />}
          onClick={() => paginate(1)}
          disabled={currentIndex === testimonials.length - 1}
          variant="outline"
          aria-label="Next testimonial"
        />
      </div>
    </div>
  )
}

// ============================================================================
// GRID VARIANT
// ============================================================================

function TestimonialGrid({
  testimonials,
  showRatings,
}: {
  testimonials: Testimonial[]
  showRatings: boolean
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {testimonials.map((testimonial) => (
        <motion.div key={testimonial.id} variants={staggerItem}>
          <TestimonialCard
            testimonial={testimonial}
            showRating={showRatings}
            variant="compact"
          />
        </motion.div>
      ))}
    </motion.div>
  )
}

// ============================================================================
// TESTIMONIAL CARD
// ============================================================================

interface TestimonialCardProps {
  testimonial: Testimonial
  showRating: boolean
  variant: 'large' | 'compact'
}

function TestimonialCard({ testimonial, showRating, variant }: TestimonialCardProps) {
  const isLarge = variant === 'large'
  const hasRating = typeof testimonial.rating === 'number'
  const ratingValue = testimonial.rating ?? 0

  return (
    <Card variant="glass" hoverable className="h-full">
      <CardContent className={cn('space-y-6', isLarge ? 'p-10' : 'p-6')}>
        {/* Quote icon */}
        <div
          className={cn(
            'inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg',
            isLarge ? 'h-16 w-16' : 'h-12 w-12'
          )}
        >
          <Quote className={cn(isLarge ? 'h-8 w-8' : 'h-6 w-6')} />
        </div>

        {/* Rating */}
        {showRating && hasRating && (
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'h-4 w-4',
                  i < ratingValue
                    ? 'fill-primary-500 text-primary-500'
                    : 'text-white/20'
                )}
              />
            ))}
          </div>
        )}

        {/* Content */}
        <blockquote
          className={cn(
            'leading-relaxed text-white/90 italic',
            isLarge ? 'text-lg sm:text-xl' : 'text-base'
          )}
        >
          &ldquo;{testimonial.content}&rdquo;
        </blockquote>

        {/* Author info */}
        <div className="flex items-center gap-4 pt-4 border-t border-white/10">
          {testimonial.image && (
            <div
              className={cn(
                'rounded-full bg-gradient-to-br from-accent-500 to-accent-600 overflow-hidden flex-shrink-0',
                isLarge ? 'h-14 w-14' : 'h-12 w-12'
              )}
            >
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                width={isLarge ? 56 : 48}
                height={isLarge ? 56 : 48}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <p className={cn('font-semibold text-white', isLarge ? 'text-lg' : 'text-base')}>
              {testimonial.name}
            </p>
            <p className="text-sm text-white/60 truncate">
              {testimonial.role}
              {testimonial.company && ` at ${testimonial.company}`}
            </p>
            {testimonial.projectType && (
              <p className="text-xs text-accent-300 mt-1">{testimonial.projectType}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// ============================================================================
// COMPACT TESTIMONIAL (Alternative style)
// ============================================================================

export function CompactTestimonial({ testimonial }: { testimonial: Testimonial }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
    >
      <div className="flex items-start gap-4">
        {testimonial.image && (
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            width={48}
            height={48}
            className="h-12 w-12 rounded-full object-cover flex-shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm text-white/80 italic mb-3">&ldquo;{testimonial.content}&rdquo;</p>
          <div>
            <p className="text-sm font-semibold text-white">{testimonial.name}</p>
            <p className="text-xs text-white/60">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
