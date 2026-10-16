import Image from 'next/image'
import Link from 'next/link'
import { FilmIndex } from '@/components/work/film-index'
import { BillingBlock } from '@/components/work/billing-block'
import {
  bio,
  contactConfig,
  films,
  getCredits,
  getIndexFilms,
  intro,
  onSetPhotos,
  philosophy,
} from '@/lib/content'

export default function HomePage() {
  return (
    <>
      <FilmIndex
        films={getIndexFilms()}
        heading={
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <h1 className="max-w-[22ch] text-[1.625rem] font-medium leading-[1.2] sm:text-4xl">
              <span className="sr-only">George Kelly. </span>
              {intro}
            </h1>
            <Link href="/work" className="text-link shrink-0 text-screen/80 hover:text-screen">
              All {films.length} films
            </Link>
          </div>
        }
      />
      <BehindTheCamera />
      <Credits />
      <ContactPrompt />
    </>
  )
}

function BehindTheCamera() {
  return (
    <section aria-labelledby="behind-heading" className="frame py-24 sm:py-36">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5 lg:pt-10">
          <h2 id="behind-heading" className="title-card text-6xl sm:text-8xl">
            Behind the camera
          </h2>
          <p className="mt-8 max-w-measure text-lg text-screen/85">{bio[0]}</p>
          <blockquote className="mt-10 max-w-measure border-l border-screen/40 pl-6 font-display text-[1.75rem] font-medium leading-tight">
            {philosophy}
          </blockquote>
          <Link href="/about" className="text-link mt-10 inline-block">
            More about me
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:col-span-6 lg:col-start-7">
          {onSetPhotos.map((photo, index) => (
            <figure key={photo.src} className={index === 1 ? 'mt-16 sm:mt-28' : undefined}>
              <div className="relative aspect-[3/4] overflow-hidden bg-booth">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 24vw, 46vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-sm text-mute">{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

function Credits() {
  return (
    <section aria-labelledby="credits-heading" className="bg-screen text-ink">
      <div className="frame py-24 sm:py-32">
        <div className="mb-12 flex items-baseline justify-between gap-6 border-b border-ink/20 pb-4">
          <h2 id="credits-heading" className="text-lg font-semibold">
            Credits
          </h2>
          <Link href="/about" className="text-link text-smoke hover:text-ink">
            Full CV
          </Link>
        </div>
        <BillingBlock credits={getCredits()} />
      </div>
    </section>
  )
}

function ContactPrompt() {
  return (
    <section aria-labelledby="contact-heading" className="frame py-24 sm:py-36">
      <h2 id="contact-heading" className="text-2xl font-medium sm:text-3xl">
        Have a project that needs a producer, director or camera operator?
      </h2>
      <a
        href={`mailto:${contactConfig.email}`}
        className="title-card mt-8 block normal-case [overflow-wrap:anywhere] text-[clamp(2.5rem,9.5vw,9.5rem)] transition-opacity hover:opacity-70"
      >
        {contactConfig.email}
      </a>
      <p className="mt-8 text-mute">
        Or use the{' '}
        <Link href="/contact" className="text-link text-screen">
          contact form
        </Link>
        .
      </p>
    </section>
  )
}
