'use client'

import { useState } from 'react'
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
  const active = films.find((film) => film.id === activeId) ?? films[0]

  return (
    <section
      aria-label="Selected films"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* Projected stills */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        {films.map((film, index) => (
          <Image
            key={film.id}
            src={film.image}
            alt=""
            fill
            priority={index === 0}
            sizes="100vw"
            className={cn(
              'object-cover transition-opacity duration-700 ease-cut',
              film.id === active?.id ? 'opacity-100' : 'opacity-0'
            )}
          />
        ))}
        <div className="absolute inset-0 bg-ink/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/60" />
      </div>

      <div className="frame flex flex-1 flex-col pb-10 pt-28 sm:pb-14 sm:pt-36">
        {heading}

        <ul
          className="mt-auto pt-16"
          onMouseLeave={() => setActiveId(films[0]?.id)}
        >
          {films.map((film, index) => {
            const isActive = film.id === active?.id
            return (
              <li
                key={film.id}
                className="credit-in border-t border-screen/15 last:border-b"
                style={{ animationDelay: `${150 + index * 90}ms` }}
              >
                <button
                  type="button"
                  onMouseEnter={() => setActiveId(film.id)}
                  onFocus={() => setActiveId(film.id)}
                  onClick={() => setPlaying(film)}
                  aria-label={`Play ${film.title}${film.subtitle ? `, ${film.subtitle}` : ''}`}
                  className="group grid w-full grid-cols-[6rem_1fr] items-center gap-x-4 py-3 text-left sm:py-2 md:grid-cols-[1fr_12rem_13rem_3rem] md:gap-x-8"
                >
                  {/* Small still on phones, where there is no hover */}
                  <span className="relative row-span-2 aspect-video w-24 overflow-hidden bg-booth md:hidden">
                    <Image src={film.image} alt="" fill sizes="6rem" className="object-cover" />
                  </span>
                  <span
                    className={cn(
                      'title-card text-[2rem] transition-colors duration-300 sm:text-5xl lg:text-[4.25rem]',
                      isActive ? 'text-screen' : 'text-screen md:text-screen/40'
                    )}
                  >
                    {film.title}
                  </span>
                  <span className="text-sm text-mute md:text-base md:text-screen/70">
                    <span className="md:hidden">{film.role}, {film.year}</span>
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
