'use client'

import { useState } from 'react'
import Image from 'next/image'
import { VideoModal } from '@/components/ui/video-modal'
import { films, getFilmRoles, type Film } from '@/lib/content'
import { cn } from '@/lib/utils'

const ALL = 'All'

export default function WorkPage() {
  const [role, setRole] = useState(ALL)
  const [playing, setPlaying] = useState<Film | null>(null)
  const roles = [ALL, ...getFilmRoles()]
  const visible = role === ALL ? films : films.filter((film) => film.role === role)

  return (
    <div className="frame pb-24 pt-28 sm:pb-32 sm:pt-36">
      <div className="flex flex-col gap-8 border-b border-line pb-6 lg:flex-row lg:items-end lg:justify-between">
        <h1 className="title-card text-[clamp(4.5rem,14vw,12rem)]">Work</h1>

        <div role="group" aria-label="Filter by role" className="flex flex-wrap gap-x-6 gap-y-2">
          {roles.map((r) => {
            const count = r === ALL ? films.length : films.filter((f) => f.role === r).length
            return (
              <button
                key={r}
                type="button"
                aria-pressed={role === r}
                onClick={() => setRole(r)}
                className={cn(
                  'py-1 transition-colors',
                  role === r
                    ? 'text-screen underline decoration-1 underline-offset-8'
                    : 'text-mute hover:text-screen'
                )}
              >
                {r} <span className="tabular-nums text-mute">{count}</span>
              </button>
            )
          })}
        </div>
      </div>

      <ul className="mt-12 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:gap-x-10 lg:gap-y-20">
        {visible.map((film) => (
          <li key={film.id} id={film.id}>
            <button
              type="button"
              onClick={() => setPlaying(film)}
              className="group block w-full text-left"
            >
              <span className="relative block aspect-video overflow-hidden bg-booth">
                <Image
                  src={film.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 48vw, 100vw"
                  className="object-cover opacity-85 transition duration-500 ease-cut group-hover:scale-[1.02] group-hover:opacity-100"
                />
                <span className="absolute bottom-4 left-4 bg-ink px-3 py-1 text-sm font-semibold opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  Play
                </span>
              </span>
              <span className="mt-5 grid grid-cols-[1fr_auto] items-baseline gap-x-6">
                <span className="title-card text-4xl sm:text-5xl">{film.title}</span>
                <span className="tabular-nums text-mute">{film.year}</span>
              </span>
              <span className="mt-2 block text-screen/80">
                {film.role}
                {film.subtitle && <span className="text-mute">, {film.subtitle}</span>}
              </span>
              <span className="mt-2 block max-w-measure text-mute">{film.description}</span>
            </button>
          </li>
        ))}
      </ul>

      <VideoModal film={playing} onClose={() => setPlaying(null)} />
    </div>
  )
}
