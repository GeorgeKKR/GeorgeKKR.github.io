'use client'

import { useEffect, useRef, useState } from 'react'

interface SetClipProps {
  src: string
  poster: string
  production: string
  detail: string
  label: string
}

/**
 * A full-bleed, scope-shaped band of behind-the-scenes footage. The
 * letterbox opens as it scrolls in and the clip plays, muted and looping,
 * only while it's on screen. With reduced motion it waits on its poster
 * frame until the visitor presses Play.
 */
export function SetClip({ src, poster, production, detail, label }: SetClipProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const bandRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  // Once the visitor pauses (or never had autoplay), scrolling won't restart it
  const heldByVisitor = useRef(false)

  useEffect(() => {
    const video = videoRef.current
    const band = bandRef.current
    if (!video || !band) return
    if (!document.documentElement.classList.contains('motion')) heldByVisitor.current = true

    // Start fetching a little before it arrives
    const preload = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        video.preload = 'auto'
        preload.disconnect()
      },
      { rootMargin: '600px 0px' }
    )
    // Play while at least a third is visible, pause otherwise
    const playback = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !heldByVisitor.current) video.play().catch(() => {})
        else if (!entry.isIntersecting) video.pause()
      },
      { threshold: 0.35 }
    )
    preload.observe(band)
    playback.observe(band)
    return () => {
      preload.disconnect()
      playback.disconnect()
    }
  }, [])

  const toggle = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      heldByVisitor.current = false
      video.play().catch(() => {})
    } else {
      heldByVisitor.current = true
      video.pause()
    }
  }

  return (
    <figure>
      <div
        ref={bandRef}
        data-reveal="letterbox"
        className="relative aspect-[4/3] overflow-hidden bg-booth sm:aspect-[2.39/1]"
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          aria-label={label}
          muted
          loop
          playsInline
          preload="none"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="absolute inset-0 h-full w-full object-cover object-[62%_50%] sm:object-center"
        />
        <span aria-hidden="true" className="film-grain absolute -inset-[50%]" />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgb(0_0_0/0.5)_100%)]"
        />
      </div>
      <figcaption className="frame mt-4 flex items-baseline justify-between gap-6">
        <span>
          {production}
          <span className="text-mute">, {detail}</span>
        </span>
        {/* WCAG 2.2.2: anything that moves on its own can be paused */}
        <button
          type="button"
          onClick={toggle}
          className="text-link shrink-0 text-sm text-screen/70 hover:text-screen"
        >
          {isPlaying ? 'Pause clip' : 'Play clip'}
        </button>
      </figcaption>
    </figure>
  )
}
