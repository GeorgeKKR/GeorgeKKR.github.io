'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * A label that trails the pointer over anything marked [data-cursor="Play"].
 * Only runs for fine pointers with motion enabled.
 */
export function CursorLabel() {
  const ref = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const motion = document.documentElement.classList.contains('motion')
    if (!motion || !window.matchMedia('(pointer: fine)').matches) return

    const target = { x: -100, y: -100 }
    const current = { x: -100, y: -100 }
    let rafId = 0

    // Check what's under the pointer; also runs on scroll, when the page
    // moves beneath a still pointer
    const update = () => {
      const host = document
        .elementFromPoint(target.x, target.y)
        ?.closest<HTMLElement>('[data-cursor]')
      // Keep the last text while the label fades out
      if (host?.dataset.cursor) setLabel(host.dataset.cursor)
      setIsVisible(Boolean(host))
    }
    const onMove = (e: PointerEvent) => {
      target.x = e.clientX
      target.y = e.clientY
      update()
    }
    const onLeave = () => setIsVisible(false)

    const frame = () => {
      current.x += (target.x - current.x) * 0.18
      current.y += (target.y - current.y) * 0.18
      if (ref.current) {
        ref.current.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`
      }
      rafId = requestAnimationFrame(frame)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', update, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    rafId = requestAnimationFrame(frame)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', update)
      document.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden [@media(pointer:fine)]:block"
    >
      <div
        className={`-translate-x-1/2 -translate-y-1/2 transition-[opacity,transform] duration-300 ease-cut ${
          isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        }`}
      >
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-screen text-sm font-semibold text-ink">
          {label}
        </span>
      </div>
    </div>
  )
}
