import Image from 'next/image'
import { TransitionLink as Link } from '@/components/motion/transition-link'
import { SplitText } from '@/components/motion/split-text'
import { FilmIndex } from '@/components/work/film-index'
import { BillingBlock } from '@/components/work/billing-block'
import { SetClip } from '@/components/work/set-clip'
import { ExternalLink } from '@/components/ui/external-link'
import {
  bio,
  contactConfig,
  films,
  getCredits,
  getIndexFilms,
  intro,
  philosophy,
  setClip,
  setStills,
  socialLinks,
} from '@/lib/content'

export default function HomePage() {
  return (
    <>
      <FilmIndex
        films={getIndexFilms()}
        heading={
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <h1
              style={{ ['--rise-step' as string]: '7ms' }}
              className="rise-now max-w-[22ch] text-[1.625rem] font-medium leading-[1.2] sm:text-4xl"
            >
              <span className="sr-only">George Kelly. </span>
              <SplitText text={intro} by="word" delay={40} />
            </h1>
            <Link
              href="/work"
              data-reveal="fade"
              style={{ ['--delay' as string]: '900ms' }}
              className="text-link shrink-0 self-start text-screen/80 hover:text-screen sm:self-auto"
            >
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
    <section aria-labelledby="behind-heading" className="py-24 sm:py-36">
      <div className="frame">
        <h2
          id="behind-heading"
          data-reveal="rise"
          className="title-card text-[clamp(3.75rem,10vw,9.5rem)]"
        >
          <SplitText text="Behind the camera" />
        </h2>
      </div>

      <div className="mt-10 sm:mt-14">
        <SetClip {...setClip} />
      </div>

      <div className="frame mt-16 grid gap-10 sm:mt-24 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <p data-reveal="fade" className="max-w-measure text-lg text-screen/85">
            {bio[0]}
          </p>
          <Link href="/about" className="text-link mt-8 inline-block">
            More about me
          </Link>
        </div>
        <blockquote
          data-reveal="fade"
          style={{ ['--delay' as string]: '150ms' }}
          className="max-w-measure border-l border-screen/40 pl-6 font-display text-[1.75rem] font-medium leading-tight sm:text-4xl lg:col-span-6 lg:col-start-7"
        >
          {philosophy}
        </blockquote>
      </div>

      {/* Unit stills: one row at a shared height on desktop, a swipeable strip below that */}
      <ul
        tabIndex={0}
        aria-label="Stills from set"
        className="frame mt-20 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto [scrollbar-width:none] sm:mt-28 sm:scroll-px-8 sm:gap-6 lg:overflow-visible"
      >
        {setStills.map((still, index) => (
          <li
            key={still.src}
            style={{ ['--ratio' as string]: still.ratio }}
            className="group w-[calc(20rem*var(--ratio))] flex-none snap-start lg:w-auto lg:flex-[var(--ratio)_1_0%]"
          >
            <figure>
              <div
                data-reveal="shutter"
                style={{ ['--delay' as string]: `${index * 120}ms`, aspectRatio: still.ratio }}
                className="relative overflow-hidden bg-booth"
              >
                <Image
                  src={still.src}
                  alt={still.alt}
                  fill
                  sizes="(min-width: 1024px) 34vw, 80vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-sm text-mute">{still.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Credits() {
  return (
    <section aria-labelledby="credits-heading" className="bg-screen text-ink">
      <div className="frame py-24 sm:py-32">
        <div className="relative mb-12 flex items-baseline justify-between gap-6 pb-4">
          <h2 id="credits-heading" className="text-lg font-semibold">
            Credits
          </h2>
          <div className="flex items-baseline gap-6">
            {socialLinks.imdb && (
              <ExternalLink href={socialLinks.imdb} className="text-link text-smoke hover:text-ink">
                IMDb
              </ExternalLink>
            )}
            <Link href="/about" className="text-link text-smoke hover:text-ink">
              Full CV
            </Link>
          </div>
          <span
            aria-hidden="true"
            data-reveal="wipe"
            className="absolute inset-x-0 bottom-0 h-px bg-ink/20"
          />
        </div>
        <BillingBlock credits={getCredits()} />
      </div>
    </section>
  )
}

function ContactPrompt() {
  return (
    <section aria-labelledby="contact-heading" className="frame py-24 sm:py-36">
      <h2 id="contact-heading" data-reveal="fade" className="text-2xl font-medium sm:text-3xl">
        Crewing up in New York? I’m looking for PA and AD department work.
      </h2>
      <a
        href={`mailto:${contactConfig.email}`}
        data-reveal="rise"
        // Sized to the column so the address always fits on one line (it renders at ~8.6x its font size)
        className="title-card mt-8 block text-[clamp(1.5rem,calc((100vw_-_2rem)/9.8),9.5rem)] normal-case transition-opacity hover:opacity-70"
      >
        <SplitText text={contactConfig.email} delay={200} />
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
