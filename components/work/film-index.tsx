'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import type { Film } from '@/lib/content'
import { VideoModal } from '@/components/ui/video-modal'
import { cn } from '@/lib/utils'

/** How long each film holds the monitor before the reel cuts to the next */
const HOLD_MS = 5000

interface FilmIndexProps {
  films: Film[]
  heading: React.ReactNode
}

/**
 * The hero, laid out like an edit suite: a bin of film titles on the left
 * and a program monitor on the right. Left alone, the monitor plays through
 * the films as a reel, with a rule under the current title marking time.
 * Pointing at or focusing a title cuts to it; selecting it plays the film.
 */
export function FilmIndex({ films, heading }: FilmIndexProps) {
  const [activeId, setActiveId] = useState(films[0]?.id)
  const [playing, setPlaying] = useState<Film | null>(null)
  // Off until we know motion is allowed, so reduced-motion visitors never get it
  const [canReel, setCanReel] = useState(false)
  const [reelOn, setReelOn] = useState(false)
  const [isInteracting, setIsInteracting] = useState(false)
  const [isInView, setIsInView] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!document.documentElement.classList.contains('motion')) return
    setCanReel(true)
    setReelOn(true)
  }, [])

  // Hold the reel while the hero is scrolled away
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), {
      threshold: 0.25,
    })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const activeIndex = Math.max(
    0,
    films.findIndex((film) => film.id === activeId)
  )
  const active = films[activeIndex]
  const isRolling = reelOn && !isInteracting && !playing
  const cutToNext = () => setActiveId(films[(activeIndex + 1) % films.length]?.id)

  // Pointer or keyboard inside the bin/monitor takes over from the reel
  const interactionHandlers = {
    onPointerEnter: (e: React.PointerEvent) => e.pointerType === 'mouse' && setIsInteracting(true),
    onPointerLeave: () => setIsInteracting(false),
    onFocus: () => setIsInteracting(true),
    onBlur: (e: React.FocusEvent) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setIsInteracting(false)
    },
  }

  if (!active) return null

  return (
    <section
      ref={sectionRef}
      aria-label="Selected films"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* Atmosphere: a soft projector beam drifting through film grain */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden bg-ink">
        <div className="projector-beam absolute -inset-[20%]" />
        <div className="film-grain absolute -inset-[50%]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#000_100%)]" />
      </div>

      <div className="frame relative z-10 flex flex-1 flex-col pb-10 pt-28 sm:pb-14 sm:pt-36">
        {heading}

        <div
          {...interactionHandlers}
          className="mt-auto grid gap-x-12 gap-y-10 pt-12 lg:grid-cols-12 lg:items-start lg:pt-16"
        >
          {/* Program monitor */}
          <div className="credit-in lg:order-2 lg:col-span-5" style={{ animationDelay: '300ms' }}>
            <button
              type="button"
              data-cursor="Play"
              onClick={() => setPlaying(active)}
              aria-label={`Play ${active.title}${active.subtitle ? `, ${active.subtitle}` : ''}`}
              className="group relative block aspect-video w-full overflow-hidden bg-booth"
            >
              {films.map((film, index) => (
                <Image
                  key={film.id}
                  src={film.image}
                  alt=""
                  fill
                  priority={index === 0}
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className={cn(
                    'object-cover transition-[opacity,transform] ease-cut',
                    film.id === active.id
                      ? 'scale-100 opacity-100 duration-[900ms,6000ms]'
                      : 'scale-110 opacity-0 duration-[900ms,900ms]'
                  )}
                />
              ))}
              {/* Grain and a soft vignette tie the stills to the room around them */}
              <span aria-hidden="true" className="film-grain absolute -inset-[50%]" />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgb(0_0_0/0.55)_100%)]"
              />
              {/* Viewfinder frame lines */}
              <span aria-hidden="true" className="viewfinder absolute inset-3 sm:inset-4" />
              <span className="absolute bottom-4 left-4 bg-ink px-3 py-1 text-sm font-semibold opacity-0 transition-opacity group-focus-visible:opacity-100 sm:bottom-5 sm:left-5">
                Play
              </span>
            </button>

            <div className="mt-4 flex items-start justify-between gap-6">
              <p key={active.id} className="credit-in min-w-0">
                <span className="block text-screen">
                  {active.role}
                  {active.subtitle && <span className="text-mute">, {active.subtitle}</span>}
                </span>
                <span className="mt-1 hidden text-mute sm:line-clamp-1">{active.description}</span>
              </p>
              {/* WCAG 2.2.2: anything that moves on its own can be paused */}
              {canReel && (
                <button
                  type="button"
                  onClick={() => setReelOn((on) => !on)}
                  className="text-link shrink-0 text-sm text-screen/70 hover:text-screen"
                >
                  {reelOn ? 'Pause reel' : 'Play reel'}
                </button>
              )}
            </div>
          </div>

          {/* Bin of titles */}
          <ul className="lg:order-1 lg:col-span-7">
            {films.map((film, index) => {
              const isActive = film.id === active.id
              return (
                <li
                  key={film.id}
                  className="credit-in border-t border-screen/15 last:border-b"
                  style={{ animationDelay: `${450 + index * 90}ms` }}
                >
                  <button
                    type="button"
                    data-cursor="Play"
                    onMouseEnter={() => setActiveId(film.id)}
                    onFocus={() => setActiveId(film.id)}
                    onClick={() => setPlaying(film)}
                    aria-label={`Play ${film.title}${film.subtitle ? `, ${film.subtitle}` : ''}`}
                    className="group relative grid w-full grid-cols-[1fr_auto] items-baseline gap-x-6 py-2.5 text-left sm:py-2"
                  >
                    {/* Under the current title: a timer while the reel rolls, a rule otherwise */}
                    {isActive && (
                      <span
                        key={`${film.id}-${isRolling}`}
                        aria-hidden="true"
                        onAnimationEnd={isRolling ? cutToNext : undefined}
                        style={
                          isRolling
                            ? {
                                ['--hold' as string]: `${HOLD_MS}ms`,
                                animationPlayState: isInView ? 'running' : 'paused',
                              }
                            : undefined
                        }
                        className={cn(
                          'absolute inset-x-0 -bottom-px h-px origin-left bg-screen',
                          isRolling && 'reel-timer'
                        )}
                      />
                    )}
                    <span
                      className={cn(
                        'title-card text-[2rem] transition-[color,transform] duration-500 ease-cut sm:text-5xl lg:text-[3.25rem] xl:text-[4.25rem]',
                        isActive ? 'text-screen md:translate-x-4' : 'text-screen/45'
                      )}
                    >
                      {film.title}
                    </span>
                    <span
                      className={cn(
                        'tabular-nums transition-colors duration-500',
                        isActive ? 'text-screen' : 'text-mute'
                      )}
                    >
                      {film.year}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <VideoModal film={playing} onClose={() => setPlaying(null)} />
    </section>
  )
}
