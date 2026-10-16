'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'
import { CursorLabel } from '@/components/motion/cursor-label'

declare global {
  interface Window {
    __lenis?: Lenis
  }
}

/**
 * Runs the site's motion system. Everything here is skipped when the
 * <html> element lacks the `motion` class, which an inline script only
 * adds when the visitor hasn't asked for reduced motion.
 *
 * - Lenis smooth scrolling
 * - Scroll reveals: elements with [data-reveal] get [data-inview] once seen
 * - Parallax: elements with [data-parallax="0.2"] drift against the scroll
 */
export function MotionProvider() {
  const pathname = usePathname()

  useEffect(() => {
    const root = document.documentElement
    if (!root.classList.contains('motion')) return

    const lenis = new Lenis({ duration: 1.15, anchors: true, autoRaf: false })
    window.__lenis = lenis

    // Parallax runs in the same frame loop as Lenis so they never disagree
    let rafId = 0
    const parallaxTargets = () =>
      Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'))

    const frame = (time: number) => {
      lenis.raf(time)
      const viewportCenter = window.innerHeight / 2
      for (const el of parallaxTargets()) {
        const factor = Number(el.dataset.parallax) || 0
        const box = (el.parentElement ?? el).getBoundingClientRect()
        if (box.bottom < -200 || box.top > window.innerHeight + 200) continue
        const offset = box.top + box.height / 2 - viewportCenter
        el.style.transform = `translate3d(0, ${(-offset * factor).toFixed(1)}px, 0)`
      }
      rafId = requestAnimationFrame(frame)
    }
    rafId = requestAnimationFrame(frame)

    // Reveal on scroll, once
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.setAttribute('data-inview', '')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -12% 0px' }
    )
    const observeAll = () =>
      document
        .querySelectorAll('[data-reveal]:not([data-inview])')
        .forEach((el) => observer.observe(el))
    observeAll()
    const mutations = new MutationObserver(observeAll)
    mutations.observe(document.body, { childList: true, subtree: true })

    return () => {
      cancelAnimationFrame(rafId)
      observer.disconnect()
      mutations.disconnect()
      lenis.destroy()
      window.__lenis = undefined
    }
  }, [])

  // New page: start at the top and clear the exit transition
  useEffect(() => {
    window.__lenis?.scrollTo(0, { immediate: true, force: true })
    document.documentElement.classList.remove('is-leaving')
  }, [pathname])

  return <CursorLabel />
}
