import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { bio, education, jobs, onSetPhotos, philosophy, portrait, skills } from '@/lib/content'

export const metadata: Metadata = {
  title: 'About',
}

export default function AboutPage() {
  return (
    <div className="frame pb-24 pt-28 sm:pb-32 sm:pt-36">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <div className="relative aspect-[3/4] max-w-sm overflow-hidden bg-booth">
              <Image
                src={portrait.src}
                alt={portrait.alt}
                fill
                priority
                sizes="(min-width: 1024px) 28vw, 90vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <h1 className="title-card text-[clamp(4.5rem,14vw,12rem)]">About</h1>
          <div className="mt-10 max-w-measure space-y-5 text-lg text-screen/85">
            {bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <blockquote className="mt-12 max-w-measure border-l border-screen/40 pl-6 font-display text-[1.75rem] font-medium leading-tight">
            {philosophy}
          </blockquote>

          <CvList title="Experience">
            {jobs.map((job) => (
              <CvRow
                key={job.company}
                period={job.period}
                heading={job.role}
                place={`${job.company}, ${job.location}`}
                text={job.description}
              />
            ))}
          </CvList>

          <CvList title="Education">
            {education.map((ed) => (
              <CvRow
                key={ed.institution}
                period={ed.period}
                heading={ed.degree}
                place={`${ed.institution}, ${ed.location}`}
                text={ed.description}
              />
            ))}
          </CvList>

          <section aria-labelledby="skills-heading" className="mt-20">
            <h2 id="skills-heading" className="border-b border-line pb-3 text-lg font-semibold">
              Skills and languages
            </h2>
            <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-screen/85">
              {skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </section>

          <div className="mt-20 grid grid-cols-2 gap-3 sm:gap-6">
            {onSetPhotos.map((photo) => (
              <figure key={photo.src}>
                <div className="relative aspect-[3/4] overflow-hidden bg-booth">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 28vw, 46vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-mute">{photo.caption}</figcaption>
              </figure>
            ))}
          </div>

          <p className="mt-20 text-2xl font-medium">
            Want to work together?{' '}
            <Link href="/contact" className="text-link">
              Get in touch
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

function CvList({ title, children }: { title: string; children: React.ReactNode }) {
  const id = `${title.toLowerCase()}-heading`
  return (
    <section aria-labelledby={id} className="mt-20">
      <h2 id={id} className="border-b border-line pb-3 text-lg font-semibold">
        {title}
      </h2>
      <ol>{children}</ol>
    </section>
  )
}

function CvRow({
  period,
  heading,
  place,
  text,
}: {
  period: string
  heading: string
  place: string
  text: string
}) {
  return (
    <li className="grid gap-x-8 gap-y-1 border-b border-line py-6 sm:grid-cols-[8rem_1fr]">
      <span className="tabular-nums text-mute">{period}</span>
      <div>
        <h3 className="title-card text-3xl sm:text-4xl">{heading}</h3>
        <p className="mt-2 text-screen/85">{place}</p>
        <p className="mt-2 max-w-measure text-mute">{text}</p>
      </div>
    </li>
  )
}
