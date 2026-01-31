'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { getYouTubeEmbedUrl, cn } from '@/lib/utils'

interface ReelCardProps {
  title: string
  description: string
  videoUrl: string
  thumbnail: string
  highlights?: {
    label: string
    value: string
  }[]
  className?: string
}

/**
 * Embeddable showreel card with a hover-to-play CTA and stat badges.
 */
export function ReelCard({
  title,
  description,
  videoUrl,
  thumbnail,
  highlights = [],
  className,
}: ReelCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const embedUrl = getYouTubeEmbedUrl(videoUrl, true)

  return (
    <div className={cn('relative overflow-hidden rounded-3xl border border-white/10 shadow-hard', className)}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary-500/40 to-dark-500/60 opacity-50 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1.2 }}
      />

      <div className="relative">
        <div className="aspect-video w-full overflow-hidden">
          {isPlaying && embedUrl ? (
            <iframe
              src={embedUrl}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          ) : (
            <button
              className="group relative h-full w-full"
              type="button"
              onClick={() => setIsPlaying(true)}
              aria-label={`Play ${title}`}
            >
              <Image
                src={thumbnail}
                alt={title}
                fill
                sizes="(min-width: 1280px) 640px, 90vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-500/90 via-dark-500/20 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ scale: 0.9, opacity: 0.8 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 12 }}
              >
                <span className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-lg">
                  <Play className="h-8 w-8 text-white" fill="white" />
                </span>
              </motion.div>
            </button>
          )}
        </div>

        <div className="space-y-4 border-t border-white/10 bg-dark-400/80 p-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold">{title}</h3>
            <p className="text-white/70">{description}</p>
          </div>
          {highlights.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-3">
              {highlights.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm uppercase tracking-wide text-white/60"
                >
                  <div className="text-2xl font-semibold text-white">{stat.value}</div>
                  <div>{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
