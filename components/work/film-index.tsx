'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import type { Film } from '@/lib/content'
import { VideoModal } from '@/components/ui/video-modal'
import { cn } from '@/lib/utils'

interface FilmIndexProps {
  films: Film[]
  heading: React.ReactNode
}

/**
 * Full-screen index of film titles. Hovering or focusing a title projects
 * its still behind the list; selecting it plays the film.
 */
export function FilmIndex({ films, heading }: FilmIndexProps) {
  const [activeId, setActiveId] = useState(films[0]?.id)
  const [playing, setPlaying] = useState<Film | null>(null)
  const [isHovering, setIsHovering] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)

  // The preview trails the pointer with a little lag, like a handheld frame
  useEffect(() => {
    const preview = previewRef.current
    if (!preview || !window.matchMedia('(hover: hover)').matches) return
    const target = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }
    let rafId = 0
    const onMove = (e: PointerEvent) => {
      target.x = e.clientX
      target.y = e.clientY
    }
    const frame = () => {
      current.x += (target.x - current.x) * 0.12
      current.y += (target.y - current.y) * 0.12
      preview.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`
      rafId = requestAnimationFrame(frame)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    rafId = requestAnimationFrame(frame)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])
  const active = films.find((film) => film.id === activeId) ?? films[0]

  return (
    <section
      aria-label="Selected films"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* Atmosphere: a soft projector beam drifting through film grain */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden bg-ink">
        <div className="projector-beam absolute -inset-[20%]" />
        <div className="film-grain absolute -inset-[50%]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#000_100%)]" />
      </div>

      {/* Still of the film you're on, trailing the pointer (hover devices) */}
      <div
        ref={previewRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-20 hidden [@media(hover:hover)]:md:block"
      >
        <div
          className={cn(
            'relative aspect-video w-[min(26vw,24rem)] -translate-y-1/2 translate-x-10 overflow-hidden bg-booth transition-[opacity,transform] duration-500 ease-cut',
            isHovering ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
          )}
        >
          {films.map((film, index) => (
            <Image
              key={film.id}
              src={film.image}
              alt=""
              fill
              priority={index === 0}
              sizes="24rem"
              className={cn(
                'object-cover transition-[opacity,transform] ease-cut',
                film.id === active?.id
                  ? 'scale-100 opacity-100 duration-[500ms,5000ms]'
                  : 'scale-110 opacity-0 duration-[500ms,800ms]'
              )}
            />
          ))}
          <span className="absolute bottom-3 left-3 bg-ink px-2 py-0.5 text-sm font-semibold">
            Play
          </span>
        </div>
      </div>

      <div className="frame relative z-10 flex flex-1 flex-col pb-10 pt-28 sm:pb-14 sm:pt-36">
        {heading}

        <ul
          className="mt-auto pt-16"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => {
            setIsHovering(false)
            setActiveId(films[0]?.id)
          }}
        >
          {films.map((film, index) => {
            const isActive = film.id === active?.id
            return (
              <li
                key={film.id}
                className="credit-in border-t border-screen/15 last:border-b"
                style={{ animationDelay: `${450 + index * 90}ms` }}
              >
                <button
                  type="button"
                  onMouseEnter={() => setActiveId(film.id)}
                  onFocus={() => setActiveId(film.id)}
                  onClick={() => setPlaying(film)}
                  aria-label={`Play ${film.title}${film.subtitle ? `, ${film.subtitle}` : ''}`}
                  className="group relative grid w-full grid-cols-[6rem_1fr] items-center gap-x-4 py-3 text-left sm:py-2 md:grid-cols-[1fr_12rem_13rem_3rem] md:gap-x-8"
                >
                  {/* A rule draws under the row you're on */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute inset-x-0 -bottom-px h-px origin-left bg-screen transition-transform duration-700 ease-cut',
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    )}
                  />
                  {/* Small still on phones, where there is no hover */}
                  <span className="relative row-span-2 aspect-video w-24 overflow-hidden bg-booth md:hidden">
                    <Image src={film.image} alt="" fill sizes="6rem" className="object-cover" />
                  </span>
                  <span
                    className={cn(
                      'title-card text-[2rem] transition-[color,transform] duration-500 ease-cut sm:text-5xl lg:text-[4.25rem]',
                      isActive ? 'text-screen md:translate-x-4' : 'text-screen md:text-screen/40'
                    )}
                  >
                    {film.title}
                  </span>
                  <span className="text-sm text-mute md:text-base md:text-screen/70">
                    <span className="md:hidden">
                      {film.role}, {film.year}
                    </span>
                    <span className="hidden md:inline">{film.subtitle}</span>
                  </span>
                  <span className="hidden text-screen/70 md:inline">{film.role}</span>
                  <span className="hidden text-right tabular-nums text-screen/70 md:inline">
                    {film.year}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <VideoModal film={playing} onClose={() => setPlaying(null)} />
    </section>
  )
}
