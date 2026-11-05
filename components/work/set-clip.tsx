'use client'

import { useEffect, useRef, useState } from 'react'

interface Setup {
  /** Seconds into the clip where this setup ends */
  until: number
  /** Slate details, e.g. "scene 12/5, take 1" */
  detail: string
  /** Horizontal framing when the band is cropped to 4:3 on phones */
  focus: string
}

interface SetClipProps {
  src: string
  /** Lighter file for screens narrower than 1024px */
  srcSmall: string
  poster: string
  production: string
  label: string
  setups: Setup[]
}

/**
 * A full-bleed, scope-shaped band of behind-the-scenes footage. The
 * letterbox opens as it scrolls in and the clip plays, muted and looping,
 * only while it's on screen. The caption and phone framing follow whichever
 * setup is playing. With reduced motion it waits on its poster frame until
 * the visitor presses Play.
 */
export function SetClip({ src, srcSmall, poster, production, label, setups }: SetClipProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const bandRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [setupIndex, setSetupIndex] = useState(0)
  // Once the visitor pauses (or never had autoplay), scrolling won't restart it
  const heldByVisitor = useRef(false)

  useEffect(() => {
    const video = videoRef.current
    const band = bandRef.current
    if (!video || !band) return
    if (!document.documentElement.classList.contains('motion')) heldByVisitor.current = true

    // Pick a file for this screen and start fetching just before it arrives. The
    // margin stays small because the band sits right under the hero, and a
    // bigger one would download the clip for visitors who never scroll.
    const preload = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        if (!video.getAttribute('src')) {
          video.src = window.matchMedia('(min-width: 1024px)').matches ? src : srcSmall
        }
        video.preload = 'auto'
        preload.disconnect()
      },
      { rootMargin: '150px 0px' }
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
  }, [src, srcSmall])

  const toggle = () => {
    const video = videoRef.current
    if (!video) return
    if (!video.getAttribute('src')) video.src = srcSmall
    if (video.paused) {
      heldByVisitor.current = false
      video.play().catch(() => {})
    } else {
      heldByVisitor.current = true
      video.pause()
    }
  }

  // Setups change during a dip to black, so the caption and reframe land unseen
  const onTimeUpdate = () => {
    const time = videoRef.current?.currentTime ?? 0
    const index = setups.findIndex((setup) => time < setup.until)
    setSetupIndex(index === -1 ? setups.length - 1 : index)
  }

  const setup = setups[setupIndex] ?? setups[0]

  return (
    <figure>
      <div
        ref={bandRef}
        data-reveal="letterbox"
        className="relative aspect-[4/3] overflow-hidden bg-booth sm:aspect-[2.39/1]"
      >
        <video
          ref={videoRef}
          poster={poster}
          aria-label={label}
          muted
          loop
          playsInline
          preload="none"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeUpdate={onTimeUpdate}
          style={{ ['--focus' as string]: setup?.focus ?? '50%' }}
          className="absolute inset-0 h-full w-full object-cover object-[var(--focus)_50%] sm:object-center"
        />
        <span aria-hidden="true" className="film-grain absolute -inset-[50%]" />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgb(0_0_0/0.5)_100%)]"
        />
      </div>
      <figcaption className="frame mt-4 flex items-baseline justify-between gap-6">
        <span key={setup?.detail} className="credit-in">
          {production}
          <span className="text-mute">, {setup?.detail}</span>
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
