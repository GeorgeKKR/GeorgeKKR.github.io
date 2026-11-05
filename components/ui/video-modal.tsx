'use client'

import { useEffect, useRef } from 'react'
import type { Film } from '@/lib/content'
import { getYouTubeEmbedUrl } from '@/lib/utils'

/** The set clip's file for this screen: 1080p on wide screens, 720p below */
function clipSource(clip: NonNullable<Film['clip']>) {
  return window.matchMedia('(min-width: 1024px)').matches ? clip.src : clip.srcSmall
}

interface VideoModalProps {
  film: Film | null
  onClose: () => void
}

/**
 * Plays a film in a native <dialog>, which handles focus trapping,
 * Escape to close and returning focus to the trigger. Films without a
 * public link play their footage from set instead.
 */
export function VideoModal({ film, onClose }: VideoModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (film && !dialog.open) {
      dialog.showModal()
      window.__lenis?.stop()
    }
    if (!film && dialog.open) dialog.close()
    if (!film) window.__lenis?.start()
  }, [film])

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => e.target === dialogRef.current && onClose()}
      aria-label={
        film ? `${film.title}, ${film.videoUrl ? 'video' : 'footage from set'}` : undefined
      }
      className="m-auto w-[min(100vw-2rem,72rem)] max-w-none bg-transparent p-0 text-screen backdrop:bg-ink/90"
    >
      {film && (
        <div className="bg-ink">
          <div className="dialog-meta flex items-start justify-between gap-6 pb-4">
            <div>
              <h2 className="title-card text-4xl sm:text-5xl">{film.title}</h2>
              <p className="mt-2 text-mute">
                {[film.subtitle, film.role, film.year].filter(Boolean).join(', ')}
              </p>
              {!film.videoUrl && film.clip && <p className="mt-1 text-mute">Footage from set</p>}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 p-1 font-semibold text-mute hover:text-screen"
              autoFocus
            >
              Close
            </button>
          </div>
          <div className="letterbox relative aspect-video w-full bg-booth">
            {film.videoUrl ? (
              <iframe
                src={getYouTubeEmbedUrl(film.videoUrl, true) ?? undefined}
                className="absolute inset-0 h-full w-full"
                allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                allowFullScreen
                title={film.title}
              />
            ) : film.clip ? (
              <video
                src={clipSource(film.clip)}
                poster={film.image}
                aria-label={`Footage from the set of ${film.title}`}
                controls
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : null}
          </div>
        </div>
      )}
    </dialog>
  )
}
