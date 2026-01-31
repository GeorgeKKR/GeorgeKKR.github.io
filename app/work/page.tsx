'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardDescription, CardImage, CardTitle } from '@/components/ui/card'
import { Section, SectionHeader, SectionTitle, SectionSubtitle } from '@/components/ui/section'
import { VideoModal } from '@/components/ui/video-modal'
import { PageWrapper } from '@/components/layout/page-transition'
import {
  portfolioItems,
  portfolioCategories,
  getWorkByCategory,
  type PortfolioItem,
} from '@/lib/content'
import { staggerContainer, staggerItem } from '@/lib/animations'
import { cn } from '@/lib/utils'

// ============================================================================
// WORK PAGE
// ============================================================================

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedWork, setSelectedWork] = useState<PortfolioItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredWork = getWorkByCategory(activeCategory)
  const totalProjects = portfolioItems.length
  const uniqueYears = Array.from(new Set(portfolioItems.map((item) => Number(item.year))))
  const minYear = uniqueYears.length ? Math.min(...uniqueYears) : null
  const maxYear = uniqueYears.length ? Math.max(...uniqueYears) : null
  const projectMetrics = [
    { label: 'Projects Produced', value: `${totalProjects}+` },
    { label: 'Categories', value: `${portfolioCategories.length - 1}` },
    {
      label: 'Release Span',
      value: minYear && maxYear ? `${minYear}–${maxYear}` : '—',
    },
  ]

  const openModal = (item: PortfolioItem) => {
    setSelectedWork(item)
    setIsModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setIsModalOpen(false)
    document.body.style.overflow = 'unset'
    // Delay clearing selected work to allow exit animation
    setTimeout(() => setSelectedWork(null), 300)
  }

  return (
    <>
      <PageWrapper>
        <Section spacing="sm">
          <SectionHeader centered>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <SectionTitle gradient>My Work</SectionTitle>
              <SectionSubtitle className="mx-auto mt-4">
                A collection of projects showcasing my work in film production, creative direction,
                and cinematography.
              </SectionSubtitle>
            </motion.div>
          </SectionHeader>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12 flex flex-wrap justify-center gap-3"
          >
            {portfolioCategories.map((category) => (
              <button
                key={category.value}
                onClick={() => setActiveCategory(category.value)}
                className={cn(
                  'rounded-xl px-6 py-2.5 text-sm font-medium transition-all duration-300',
                  activeCategory === category.value
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                    : 'border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                )}
              >
                {category.name}
              </button>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="mb-12 grid gap-4 sm:grid-cols-3"
          >
            {projectMetrics.map((metric) => (
              <motion.div
                key={metric.label}
                variants={staggerItem}
                whileHover={{ y: -6, scale: 1.02 }}
                className="rounded-3xl border border-white/10 bg-white/5 px-6 py-5 text-center backdrop-blur-md"
              >
                <div className="text-sm uppercase tracking-[0.3em] text-white/50">{metric.label}</div>
                <div className="text-3xl font-semibold text-white">{metric.value}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Work Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              variants={staggerContainer}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
            >
              {filteredWork.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="h-full cursor-pointer"
                  onClick={() => openModal(item)}
                >
                  <Card
                    className="group h-full overflow-hidden border-white/5 bg-white/5 transition-colors hover:border-white/10 hover:bg-white/10"
                    interactive
                  >
                    <div className="relative mb-4 overflow-hidden rounded-lg">
                      <CardImage
                        src={item.image}
                        alt={item.title}
                        aspectRatio="video"
                        className="mb-0 transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Enhanced play overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100">
                        <motion.div
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1.15 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                          className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-md"
                        >
                          <Play className="ml-1 h-8 w-8 fill-white text-white" />
                        </motion.div>
                      </div>
                    </div>

                    <CardContent>
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-xs font-medium uppercase tracking-wider text-accent-400">
                          {item.category}
                        </span>
                        <span className="text-xs text-white/40">{item.year}</span>
                      </div>
                      <CardTitle className="mb-2 text-xl pb-1">{item.title}</CardTitle>
                      <CardDescription className="line-clamp-2 text-sm pb-1">
                        {item.description}
                      </CardDescription>

                      <div className="mt-4 flex items-center gap-2 text-xs font-medium text-white/40 transition-colors group-hover:text-primary-400">
                        View Project <ArrowRight className="h-3 w-3" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredWork.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-20 text-center"
            >
              <p className="text-xl text-white/60">No projects found in this category.</p>
            </motion.div>
          )}
        </Section>
      </PageWrapper>

      <VideoModal
        isOpen={isModalOpen}
        onClose={closeModal}
        project={selectedWork}
      />
    </>
  )
}
